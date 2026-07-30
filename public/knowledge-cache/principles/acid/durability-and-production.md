---
title: "Durability & Production Patterns"
order: 3
difficulty: "Intermediate"
duration: "60 min"
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

Durability guarantees that once a transaction commits, its changes persist **even if the system crashes immediately afterward**.

## The Durability Stack

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

## The Commit Protocol

When you issue `COMMIT`, PostgreSQL does the following:

1. Flush all remaining WAL records for this transaction to the WAL file
2. Call `fsync()` on the WAL file — forces OS to write to physical disk
3. Write a COMMIT record to the WAL
4. Call `fsync()` again
5. Mark the transaction as committed in `pg_xact/`

**Only then does `COMMIT` return success to the client.**

## Practice: fsync Benchmark

```sql
CREATE TABLE durability_test (
    id SERIAL PRIMARY KEY,
    data TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

```python
import psycopg2, time
conn = psycopg2.connect(dbname='postgres', user='postgres', password='acid', host='localhost')
cur = conn.cursor()

start = time.time()
for i in range(1000):
    cur.execute("INSERT INTO durability_test (data) VALUES (%s)", (f"row_{i}",))
    conn.commit()
print(f"Synchronous: {1000/(time.time()-start):.0f} tps")

# Now test with synchronous_commit = off
cur.execute("SET synchronous_commit = off")
start = time.time()
for i in range(1000):
    cur.execute("INSERT INTO durability_test (data) VALUES (%s)", (f"row_{i}",))
    conn.commit()
print(f"Async: {1000/(time.time()-start):.0f} tps")
```

**The trade-off:** With `synchronous_commit = off`, COMMIT returns before the WAL is flushed. If the server crashes within ~100ms, the transaction is **lost**. But throughput is dramatically higher.

## Guided LLM Prompts

**Prompt 1:** Act as a PostgreSQL kernel developer. Ask me questions to trace exactly what happens in the storage engine when COMMIT is called — buffer pool, WAL, fsync, transaction status file. Guide me step by step.

**Prompt 2:** I'm an SRE. My primary PostgreSQL server just lost power. I have: (1) a base backup from 6 hours ago, (2) continuous WAL archives, (3) a streaming replica. Walk me through recovery.

**Prompt 3:** Compare synchronous_commit = on vs. off for: (a) financial ledger, (b) social media comments, (c) IoT sensor data ingestion, (d) session storage.

**Prompt 4:** Design a durability strategy for a global e-commerce platform with PostgreSQL. Consider multi-region replication, backup frequency, PITR requirements, and failover automation.

## Key Takeaways

- **Durability is a stack** — every layer must be reliable
- **fsync()** is the system call that makes durability real
- **synchronous_commit** trades durability for speed
- **Untested backups are not backups**

## Further Reading

- PostgreSQL: [WAL Configuration](https://www.postgresql.org/docs/current/wal-configuration.html)
- PostgreSQL: [Continuous Archiving & PITR](https://www.postgresql.org/docs/current/continuous-archiving.html)
