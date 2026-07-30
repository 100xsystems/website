---
title: "Consistency & Isolation Levels"
order: 2
difficulty: "Intermediate"
duration: "75 min"
learning_objectives:
  - "Distinguish database consistency from application-level consistency"
  - "Identify and reproduce dirty reads, non-repeatable reads, and phantom reads"
  - "Choose the correct isolation level for a given scenario"
  - "Implement optimistic and pessimistic concurrency control"
prerequisites:
  - "principles/consistency-pattern"
  - "principles/optimistic-locking"
  - "principles/pessimistic-locking"
knowledge_refs:
  - "principles/acid"
  - "patterns/optimistic-locking"
  - "patterns/pessimistic-locking"
  - "patterns/mvcc-pattern"
---

# Consistency & Isolation Levels

Consistency and Isolation are often confused — they operate at different levels of the stack:

- **Consistency** ensures that any transaction brings the database from one valid state to another
- **Isolation** ensures that concurrent execution of transactions produces the same result as if they ran sequentially

## Database-Level vs Application-Level Consistency

**Database-level** constraints: primary keys, foreign keys, CHECK constraints, NOT NULL, UNIQUE.

```sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    balance NUMERIC(10,2) CHECK (balance >= 0)
);
INSERT INTO accounts (email, balance) VALUES ('alice@example.com', -100);
-- ERROR: check constraint violation
```

**Application-level** invariants — the database CANNOT enforce these automatically:
- "The total quantity in stock equals the sum of all inventory records"
- "A published article must have at least one author"

```sql
-- Double-entry bookkeeping: total balance must equal zero
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 500 WHERE name = 'Bob';
COMMIT;
-- The database sees two valid rows. YOUR CODE maintains the invariant.
```

## The Four Isolation Phenomena

| Phenomenon | Description |
|-----------|-------------|
| **Dirty Read** | Reading data written by an uncommitted concurrent transaction |
| **Non-Repeatable Read** | A row changes between two reads in the same transaction |
| **Phantom Read** | New rows matching a WHERE clause appear between two reads |
| **Serialization Anomaly** | Concurrent execution produces results inconsistent with any serial order |

## The Four Isolation Levels

| Level | Dirty Read | Non-Repeatable | Phantom | Serialization |
|-------|:----------:|:--------------:|:-------:|:-------------:|
| READ UNCOMMITTED | ❌ | ❌ | ❌ | ❌ |
| READ COMMITTED | ✅ | ❌ | ❌ | ❌ |
| REPEATABLE READ | ✅ | ✅ | ❌ | ❌ |
| SERIALIZABLE | ✅ | ✅ | ✅ | ✅ |

## Behind the Scenes: MVCC

PostgreSQL implements isolation using **Multi-Version Concurrency Control (MVCC)**. Instead of locking rows, MVCC creates a **snapshot** at the start of each transaction:

```
Transaction A: BEGIN (snapshot at time 5)
  → Reads row 1 → sees version at time 5
Transaction B: UPDATE row 1 → version at time 7, commits
Transaction A: Reads row 1 again → still sees version at time 5
  → COMMIT
```

This is why REPEATABLE READ prevents non-repeatable reads without blocking writes.

## Practice: The Booking Race Condition

```python
def book_ticket(user_id, event_id):
    conn = psycopg2.connect(dbname='tickets', ...)
    cur = conn.cursor()
    cur.execute("SELECT available FROM events WHERE id = %s", (event_id,))
    available = cur.fetchone()[0]
    if available > 0:
        cur.execute("UPDATE events SET available = available - 1 WHERE id = %s", (event_id,))
        cur.execute("INSERT INTO bookings (user_id, event_id) VALUES (%s, %s)", (user_id, event_id))
        conn.commit()
    cur.close()
    conn.close()
```

What happens when 10 threads call this simultaneously for the last ticket?

Fix it using: (a) `SELECT ... FOR UPDATE`, (b) `UPDATE ... RETURNING`, or (c) SERIALIZABLE isolation.

## Guided LLM Prompts

**Prompt 1:** Act as a database internals professor. Ask me questions to help me discover why MVCC is more performant than locking for read-heavy workloads.

**Prompt 2:** I need to choose between REPEATABLE READ and SERIALIZABLE for a financial trading system. Walk me through the trade-offs.

**Prompt 3:** Challenge me: What happens with SERIALIZABLE isolation when two concurrent transactions both read the same COUNT(*) and then insert based on it?

**Prompt 4:** Compare these approaches for preventing overbooking: (a) SELECT FOR UPDATE, (b) optimistic locking with version numbers, (c) atomic UPDATE ... RETURNING.

## Key Takeaways

- **Consistency** is about invariants — both database constraints AND application logic
- **Isolation** is about concurrency — higher levels prevent more phenomena but reduce throughput
- Start with **READ COMMITTED**, escalate only when you understand the specific phenomenon

## Further Reading

- PostgreSQL: [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [MVCC Unmasked](https://www.postgresql.org/docs/current/mvcc-intro.html)
- Jepsen: [Consistency Models](https://jepsen.io/consistency)
