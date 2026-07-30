---
title: "Atomicity — All or Nothing"
order: 1
difficulty: "Intermediate"
duration: "60 min"
learning_objectives:
  - "Explain why atomicity is essential for data integrity"
  - "Implement atomic transactions with BEGIN/COMMIT/ROLLBACK"
  - "Handle partial failures with proper error recovery"
  - "Identify scenarios where atomicity is violated"
prerequisites:
  - "principles/acid"
  - "databases/postgresql"
knowledge_refs:
  - "principles/acid"
  - "principles/optimistic-locking"
  - "databases/postgresql"
---

# Atomicity — All or Nothing

Atomicity guarantees that a transaction is treated as a single, indivisible unit of work. Either **all** of its operations complete successfully (commit), or **none** of them take effect (rollback). There is no partial execution, no half-written state, no corrupted data.

## Why Atomicity Matters

Imagine transferring $100 from Account A to Account B:

```
1. DEBIT $100 FROM Account A    ← succeeds
2. CREDIT $100 TO Account B     ← CRASH — server fails!
```

Without atomicity, the money disappears from Account A but never arrives at Account B. The bank loses $100, and the universe is slightly less fair.

With atomicity, the database ensures that if step 2 fails, **step 1 is automatically undone** — the $100 returns to Account A, and neither the bank nor the customer loses anything.

## How Databases Implement Atomicity

### The Write-Ahead Log (WAL)

Most databases implement atomicity through a **Write-Ahead Log** (WAL). Before any data is written to disk, the changes are first recorded in the WAL:

```
Transaction BEGIN
  → Write "DEBIT $100 FROM A"    to WAL
  → Write "CREDIT $100 TO B"    to WAL  
  → Write "COMMIT"                to WAL
  → Apply changes to data pages
```

If a crash occurs during step 2-3, the database recovery process (crash recovery) inspects the WAL. Since no "COMMIT" record was written, it **undoes** any partial changes. If a crash occurs after COMMIT but before data pages are written, the database **reapplies** the changes from the WAL on restart.

### The Two-Phase Commit Protocol

For distributed transactions spanning multiple databases, atomicity requires a **coordinator** and a **two-phase commit (2PC)** protocol:

```
Phase 1 — Prepare:
  Coordinator → All Participants: "Can you commit?"
  Each participant writes prepare record to WAL, responds "Ready" or "Abort"

Phase 2 — Commit:
  If all say "Ready": Coordinator logs COMMIT, tells everyone to commit
  If any says "Abort": Coordinator logs ABORT, tells everyone to roll back
```

This ensures all participants reach the same outcome, even if the coordinator crashes mid-protocol.

## Practice: The Faulty Bank Transfer

You are given a banking application that transfers money between accounts. The current implementation has a **deliberate crash** injected mid-transfer.

Start PostgreSQL:

```bash
docker run --name acid-lab -e POSTGRES_PASSWORD=acid -d postgres:16 -p 5432:5432
```

Create the accounts table:

```sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    balance NUMERIC(10,2) NOT NULL CHECK (balance >= 0)
);

INSERT INTO accounts (name, balance) VALUES ('Alice', 1000.00), ('Bob', 500.00);
```

Now run this **broken** transfer:

```python
import psycopg2
conn = psycopg2.connect(dbname='postgres', user='postgres', password='acid', host='localhost')
cur = conn.cursor()
cur.execute("UPDATE accounts SET balance = balance - 200 WHERE name = 'Alice'")
# Simulate a crash — power failure mid-transfer!
import os
os._exit(1)  # Force kill — no cleanup, no ROLLBACK
```

**Task 1:** After the crash, check the state of both accounts. Did the money disappear?

**Task 2:** Rewrite the transfer with a proper transaction that guarantees atomicity.

**Task 3:** Add a deliberate crash AFTER the debit but BEFORE checking the balance. What happens with your transaction wrapper?

## Guided LLM Prompts

**Prompt 1 — Socratic Tutor:**
> Act as a rigorous Socratic tutor on database atomicity. Do NOT give me answers — ask me one question at a time to help me reason through this scenario: "A banking transaction debits $500 from Account A, then the server loses power before crediting Account B." Start with the WAL structure.

**Prompt 2 — Compare & Contrast:**
> I need to understand the difference between atomicity in a single-node PostgreSQL instance vs. atomicity in a distributed system like Cassandra (which is eventually consistent). Give me concrete examples of operations that are atomic in PostgreSQL but not in Cassandra.

**Prompt 3 — Boundary Testing:**
> Challenge me with edge cases: What happens when a transaction modifies 1 million rows and the transaction log fills up? What happens when the COMMIT log write succeeds but the filesystem reports success before flushing to disk?

**Prompt 4 — Implementation Design:**
> I want to implement a simple version of the WAL for an in-memory key-value store. Design the WAL format, the commit protocol, and the recovery algorithm. Show me the minimal code needed for atomicity guarantees.

## Key Takeaways

- Atomicity means **all-or-nothing** — no partial transactions
- The **Write-Ahead Log (WAL)** is the primary mechanism for atomicity
- **Two-Phase Commit (2PC)** extends atomicity to distributed systems
- Always wrap multi-step operations in explicit `BEGIN`/`COMMIT`/`ROLLBACK` blocks

## Further Reading

- PostgreSQL Documentation: [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [ACID Properties](https://en.wikipedia.org/wiki/ACID) — Wikipedia
- [Designing Data-Intensive Applications](https://dataintensive.net/) — Chapters 7 & 8
