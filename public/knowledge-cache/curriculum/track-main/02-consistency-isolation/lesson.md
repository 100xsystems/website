---
title: "Consistency & Isolation Levels"
order: 2
difficulty: "Intermediate"
estimated_time: "75 min"
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

- **Consistency** ensures that any transaction brings the database from one valid state to another, respecting all defined rules (constraints, cascades, triggers).
- **Isolation** ensures that concurrent execution of transactions produces the same result as if they ran sequentially.

## Consistency: Beyond Constraints

### Database-Level Consistency

The database guarantees that every transaction respects:
- **Primary key uniqueness**
- **Foreign key constraints**
- **CHECK constraints** (e.g., `balance >= 0`)
- **NOT NULL constraints**
- **UNIQUE constraints**

```sql
CREATE TABLE accounts (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    balance NUMERIC(10,2) CHECK (balance >= 0)
);

-- This will fail: CHECK constraint violation
INSERT INTO accounts (email, balance) VALUES ('alice@example.com', -100);
-- ERROR:  new row for relation "accounts" violates check constraint "accounts_balance_check"
```

### Application-Level Consistency

The most subtle form of consistency is **application-level** — invariants that the database cannot enforce alone:

- "A user cannot have more tasks than their plan allows"
- "The total quantity of items in stock equals the sum of all inventory records"
- "A published article must have at least one author"

```sql
-- Application invariant: Total balance across all accounts = 0 (double-entry bookkeeping)
-- The database cannot enforce this automatically — YOUR CODE must!
BEGIN;
UPDATE accounts SET balance = balance - 500 WHERE name = 'Alice';
UPDATE accounts SET balance = balance + 500 WHERE name = 'Bob';
-- The database sees two valid rows, but YOUR BUSINESS says the invariant is maintained
COMMIT;
```

## Isolation: The Four Phenomena

The SQL standard defines four isolation levels, each preventing a different set of **read phenomena**:

| Phenomenon | Description |
|-----------|-------------|
| **Dirty Read** | Reading data written by a concurrent uncommitted transaction |
| **Non-Repeatable Read** | A row changes between two reads in the same transaction |
| **Phantom Read** | New rows matching a WHERE condition appear between two reads |
| **Serialization Anomaly** | The result of concurrent transactions is inconsistent with any serial execution |

### The Four Isolation Levels

| Level | Dirty Read | Non-Repeatable Read | Phantom Read | Serialization Anomaly |
|-------|:----------:|:-------------------:|:------------:|:--------------------:|
| READ UNCOMMITTED | ❌ Possible | ❌ Possible | ❌ Possible | ❌ Possible |
| READ COMMITTED | ✅ Prevented | ❌ Possible | ❌ Possible | ❌ Possible |
| REPEATABLE READ | ✅ Prevented | ✅ Prevented | ❌ Possible | ❌ Possible |
| SERIALIZABLE | ✅ Prevented | ✅ Prevented | ✅ Prevented | ✅ Prevented |

### Behind the Scenes: MVCC

PostgreSQL (and most modern databases) implement isolation using **Multi-Version Concurrency Control (MVCC)**. Instead of locking rows when a transaction reads them, MVCC creates a **snapshot** of the data at the start of each transaction or query.

```
Transaction A: BEGIN (snapshot at time 5)
  → Reads row 1 → sees version at time 5
Transaction B: UPDATE row 1 → creates version at time 7, commits
Transaction A: Reads row 1 again → still sees version at time 5 (snapshot unchanged)
  → COMMIT
```

This is why REPEATABLE READ can prevent non-repeatable reads without blocking writes — each transaction sees its own frozen snapshot.

## Practice: Reproduce Read Phenomena

### Setup

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    stock INTEGER NOT NULL CHECK (stock >= 0),
    price NUMERIC(10,2) NOT NULL
);

INSERT INTO products (name, stock, price) VALUES ('Widget', 100, 9.99);
```

### Open TWO terminal sessions

**Session 1:**
```sql
BEGIN TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;
SELECT stock FROM products WHERE name = 'Widget';
-- Expect: 100
```

**Session 2 (in another terminal):**
```sql
BEGIN;
UPDATE products SET stock = 50 WHERE name = 'Widget';
-- Do NOT commit yet!
```

**Session 1 (back to the first terminal):**
```sql
SELECT stock FROM products WHERE name = 'Widget';
-- What do you see? Is it 100, 50, or something else?
```

In PostgreSQL, READ UNCOMMITTED behaves like READ COMMITTED (PostgreSQL doesn't allow dirty reads). Change to MySQL or use a lower-level driver to see the actual dirty read.

### Your Challenge: Fix the Booking System

The following code has a **race condition** that causes overbooking. Identify it and fix it using the appropriate isolation level:

```python
import psycopg2
import threading

def book_ticket(user_id, event_id):
    conn = psycopg2.connect(dbname='tickets', ...)
    cur = conn.cursor()
    
    # Check available seats
    cur.execute("SELECT available FROM events WHERE id = %s", (event_id,))
    available = cur.fetchone()[0]
    
    if available > 0:
        # Book the ticket
        cur.execute("UPDATE events SET available = available - 1 WHERE id = %s", (event_id,))
        cur.execute("INSERT INTO bookings (user_id, event_id) VALUES (%s, %s)", (user_id, event_id))
        conn.commit()
        print(f"User {user_id}: Booked!")
    else:
        print(f"User {user_id}: Sold out!")
    
    cur.close()
    conn.close()

# Simulate 10 concurrent booking attempts
threads = []
for i in range(10):
    t = threading.Thread(target=book_ticket, args=(i, 1))
    threads.append(t)
    t.start()

for t in threads:
    t.join()
```

**Questions:**
1. What happens when 10 users try to book the last ticket?
2. What isolation level would fix this? Why?
3. Rewrite the query to be atomic using `UPDATE ... RETURNING` or `SELECT ... FOR UPDATE`

### Advanced Challenge: Lost Update

```sql
-- Two concurrent sessions both increment a counter
-- Session 1:
BEGIN;
UPDATE counters SET value = value + 1 WHERE id = 1;
-- Session 2 (concurrent):
BEGIN;
UPDATE counters SET value = value + 1 WHERE id = 1;
```

Under READ COMMITTED, what is the final value? Is it correct? What about under SERIALIZABLE?

## Guided LLM Prompts

**Prompt 1 — Socratic:**
> Act as a database internals professor. Ask me questions to help me discover why MVCC is more performant than locking for read-heavy workloads. Start with: "Transaction A reads row X while Transaction B is writing to row X. What happens in a locking system vs. MVCC?"

**Prompt 2 — Trade-off Analysis:**
> I need to choose between REPEATABLE READ and SERIALIZABLE for a financial trading system. Walk me through the trade-offs: performance impact, phantom reads, serialization failures, and deadlock probability. Give me a decision framework.

**Prompt 3 — Edge Cases:**
> I understand basic isolation levels. Now challenge me: What happens with SERIALIZABLE isolation when two concurrent transactions both read the same COUNT(*) and then insert based on it? How does PostgreSQL detect serialization anomalies and what error should I handle?

**Prompt 4 — Architecture Design:**
> I'm designing a booking system that must never overbook. Compare these approaches: (a) SELECT FOR UPDATE, (b) optimistic locking with version numbers, (c) atomic UPDATE ... RETURNING, (d) application-level queue with a single writer. Which is best for a high-traffic concert ticketing system?

## Key Takeaways

- **Consistency** is about invariants — both database constraints AND application logic
- **Isolation** is about concurrency — higher levels prevent more read phenomena but reduce throughput
- **SERIALIZABLE** is the gold standard, but comes with a performance cost and serialization failures
- **MVCC** is how modern databases achieve high concurrency without read locks
- Always start with **READ COMMITTED** (PostgreSQL default), escalate only when you understand the specific phenomenon you need to prevent

## Further Reading

- PostgreSQL: [Transaction Isolation](https://www.postgresql.org/docs/current/transaction-iso.html)
- [MVCC Unmasked](https://www.postgresql.org/docs/current/mvcc-intro.html)
- Martin Kleppmann: [Hermitage — Testing Isolation Levels](https://martin.kleppmann.com/2014/11/15/hermitage-testing-isolation-levels.html)
- Jepsen: [Consistency Models](https://jepsen.io/consistency)
