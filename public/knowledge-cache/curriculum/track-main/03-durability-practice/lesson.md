---
title: "Durability & Production Patterns"
order: 3
difficulty: "Intermediate"
estimated_time: "60 min"
learning_objectives:
  - "Explain how WAL and fsync guarantee durability"
  - "Understand the trade-offs between synchronous and asynchronous commits"
  - "Implement durable patterns for write-heavy workloads"
  - "Design backup and replication strategies for disaster recovery"
prerequisites:
  - "principles/acid"
  - "patterns/replication"
  - "databases/postgresql"
knowledge_refs:
  - "principles/acid"
  - "patterns/replication"
  - "patterns/circuit-breaker-pattern"
---
# Durability & Production Patterns

Durability guarantees that once a transaction commits, its changes persist **even if the system crashes immediately afterward**. The data must survive power loss, OS crashes, disk failures, and (in distributed systems) network partitions and node failures.

## The Durability Stack

Durability is not a single mechanism — it is a **stack of guarantees**, each layer depending on the one below:

```
Application           ─ writes data
    ↓
Database              ─ manages transactions, buffer pool, WAL
    ↓
Operating System      ─ buffers writes, manages page cache
    ↓
Filesystem            ─ journaling, metadata updates
    ↓
Storage Driver        ─ disk scheduling, write caching
    ↓
Hardware              ─ disk platters / flash cells, battery-backed cache
```

**The weakest link at any layer can destroy durability.**

## The Write-Ahead Log (WAL) — Deep Dive

PostgreSQL's WAL is a write-ahead, append-only log stored at `pg_wal/`. Every change to the database is first recorded in the WAL before it is written to the actual data files (the "heap").

### WAL Record Structure

Each WAL record contains:

```
+------------------+------------------+------------------+------------------+
|  WAL Record Header (24 bytes):                               |
|  - Log Sequence Number (LSN)   | Transaction ID               |
|  - Previous LSN                | Resource Manager ID          |
|  - Record Length               | Flags                        |
+------------------+------------------+------------------+------------------+
|  Payload: Full page image or incremental change               |
|  - Page ID      | Offset       | Old Data      | New Data     |
+------------------+------------------+------------------+------------------+
|  Checksum (CRC-32C or CRC-64)                                |
+---------------------------------------------------------------+
```

### The Commit Protocol

When you issue `COMMIT`, PostgreSQL does the following — **synchronously**:

1. Flush all remaining WAL records for this transaction to the WAL file
2. Call `fsync()` on the WAL file — this forces the OS to write to physical disk
3. Write a COMMIT record to the WAL
4. Call `fsync()` again
5. Mark the transaction as committed in `pg_xact/`

**Only then does `COMMIT` return success to the client.**

### What Happens During Crash Recovery

```
PostgreSQL starts after crash:
  1. Read the WAL from the last checkpoint
  2. REDO phase: Reapply all committed transactions from WAL
  3. UNDO phase: Roll back any transactions without a COMMIT record
  4. Cleanup: Remove temporary files, release locks
  5. Ready for connections
```

This is why recovery time depends on how much WAL has accumulated since the last checkpoint. Tuning checkpoint frequency is a critical operational skill.

## Practice: Measure the Cost of fsync

### Setup

```sql
CREATE TABLE durability_test (
    id SERIAL PRIMARY KEY,
    data TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Benchmark: synchronous_commit = on (default)

```python
import psycopg2
import time

conn = psycopg2.connect(dbname='postgres', ...)
cur = conn.cursor()

start = time.time()
for i in range(1000):
    cur.execute("INSERT INTO durability_test (data) VALUES (%s)", (f"row_{i}",))
    conn.commit()
elapsed = time.time() - start

print(f"Synchronous commit: 1000 inserts in {elapsed:.2f}s ({1000/elapsed:.0f} tps)")
cur.close()
conn.close()
```

### Benchmark: synchronous_commit = off

Add this before your test:

```sql
SET synchronous_commit = off;
```

Run the same benchmark. What's the speed difference? 2x? 5x? 10x?

**The trade-off:** With `synchronous_commit = off`, the COMMIT returns before the WAL is flushed to disk. If the server crashes within the next ~100ms, the transaction is **lost**. But you get dramatically higher throughput.

### Your Challenge: Design a Disaster Recovery Strategy

Given:
- A PostgreSQL database powering an e-commerce platform
- 50,000 transactions per hour
- Maximum acceptable data loss: 1 second of transactions
- Recovery time objective (RTO): 30 minutes

**Task 1:** Choose the correct `synchronous_commit` setting and WAL archiving strategy.

**Task 2:** Configure continuous archiving (WAL shipping):

```bash
# In postgresql.conf:
wal_level = replica                   # Write enough WAL for replication
archive_mode = on                     # Enable WAL archiving
archive_command = 'cp %p /wal_archive/%f'  # Archive each WAL segment
archive_timeout = 60                  # Force archive every 60 seconds
```

**Task 3:** Configure point-in-time recovery (PITR):

```bash
# recovery.conf:
restore_command = 'cp /wal_archive/%f %p'
recovery_target_time = '2026-07-29 14:30:00 UTC'
```

**Task 4:** Recover from a simulated disaster:

```bash
# 1. Simulate a crash
pg_ctl -D /data/postgres stop -m immediate

# 2. Restore from base backup
cp -r /backups/base/2026-07-29 /data/postgres

# 3. Apply WAL archives up to the target time
pg_ctl -D /data/postgres start

# 4. Verify data integrity
psql -c "SELECT COUNT(*) FROM orders;"
psql -c "SELECT pg_is_in_recovery();"
```

### Advanced: Replication and Durability

In a primary-replica setup, durability requires the transaction to be durable on **both** the primary AND at least one replica:

```sql
-- PostgreSQL synchronous replication
SYNCHRONOUS_COMMIT = 'remote_write'
-- COMMIT waits for WAL to be written to at least one synchronous replica
```

**The paradox:** Synchronous replication improves durability but reduces availability — if the synchronous replica goes down, the primary cannot commit.

## Guided LLM Prompts

**Prompt 1 — Socratic:**
> Act as a PostgreSQL kernel developer. Ask me questions to help me trace exactly what happens in the storage engine when `COMMIT` is called. Start with the buffer pool, then the WAL, then fsync, then the transaction status file. Guide me step by step.

**Prompt 2 — Disaster Recovery Scenario:**
> I'm a Site Reliability Engineer. My primary PostgreSQL server just lost power. I have: (1) a base backup from 6 hours ago, (2) continuous WAL archives, (3) a streaming replica. Walk me through the complete recovery procedure. Ask me questions to test my understanding at each step.

**Prompt 3 — Trade-off Analysis:**
> Compare synchronous_commit = on vs. off for these workloads: (a) financial ledger, (b) social media comments, (c) IoT sensor data ingestion, (d) session storage. For each, tell me the maximum data loss window and whether it's acceptable.

**Prompt 4 — Architecture Design:**
> I need to design a durability strategy for a global e-commerce platform with PostgreSQL. Consider: (a) multi-region replication, (b) backup frequency, (c) point-in-time recovery requirements, (d) failover automation. Give me an annotated architecture diagram in text.

## Key Takeaways

- **Durability is a stack** — every layer from application to hardware must be reliable
- The **WAL** is the foundation — redo committed transactions, undo uncommitted ones
- **fsync()** is the system call that makes durability real — without it, OS caching can lose data
- **synchronous_commit = off** trades durability for speed — use only when you understand the risk
- **Replication** adds another layer of durability but introduces consistency trade-offs
- Always test your disaster recovery procedure — untested backups are not backups

## Further Reading

- PostgreSQL: [WAL Configuration](https://www.postgresql.org/docs/current/wal-configuration.html)
- PostgreSQL: [Continuous Archiving & PITR](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [All About fsync()](https://wiki.postgresql.org/wiki/Fsync)
- [PostgreSQL Reliability: The Dark Side of fsync](https://www.postgresql.org/docs/current/disk-full.html)
