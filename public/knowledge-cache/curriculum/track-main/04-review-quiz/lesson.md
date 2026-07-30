---
title: "Review & Mastery Quiz"
order: 4
difficulty: "Intermediate"
estimated_time: "30 min"
lesson_type: "quiz"
learning_objectives:
  - "Consolidate understanding of all four ACID properties"
  - "Identify ACID violations in real-world scenarios"
  - "Apply recovery strategies to production incidents"
prerequisites:
  - "All previous lessons in this course"
knowledge_refs:
  - "principles/acid"
  - "patterns/pessimistic-locking"
  - "patterns/mvcc-pattern"
---
# Review & Mastery Quiz

This quiz tests your understanding across all four ACID properties. You need **90% to pass**.

## Section 1: Multiple Choice

**1. A transaction debits Account A, crashes before crediting Account B, and upon recovery Account A's balance is unchanged. Which ACID property was maintained?**

a) Atomicity
b) Consistency
c) Isolation
d) Durability

**2. Which PostgreSQL isolation level prevents dirty reads, non-repeatable reads, AND phantom reads?**

a) READ UNCOMMITTED
b) READ COMMITTED
c) REPEATABLE READ
d) SERIALIZABLE

**3. The Write-Ahead Log (WAL) is primarily responsible for which ACID property?**

a) Atomicity and Durability
b) Only Consistency
c) Only Isolation
d) Only Atomicity

**4. Which read phenomenon occurs when a transaction reads a row twice and sees different data because another transaction modified and committed that row?**

a) Dirty read
b) Non-repeatable read
c) Phantom read
d) Lost update

**5. What PostgreSQL system call guarantees that committed data has been physically written to persistent storage?**

a) `write()`
b) `flush()`
c) `fsync()`
d) `sync()`

## Section 2: Scenario Analysis

**Scenario A — The Double-Charge Problem**

A ride-sharing app charges passengers when a trip ends. The code runs:

```python
cur.execute("UPDATE wallets SET balance = balance - %s WHERE user_id = %s", (fare, passenger_id))
cur.execute("UPDATE wallets SET balance = balance + %s WHERE user_id = %s", (fare, driver_id))
conn.commit()
```

During a network partition, the API gateway retries the request. What happens? Which ACID property is violated? How would you fix it?

**Scenario B — The Phantom Report**

A nightly reporting query runs at 11:59 PM:

```sql
BEGIN;
SELECT COUNT(*) FROM orders WHERE created_at >= '2026-07-29';
-- Wait 5 seconds (orders are being inserted concurrently)
SELECT COUNT(*) FROM orders WHERE created_at >= '2026-07-29';
COMMIT;
```

The two counts differ. Which isolation phenomenon is this? What isolation level would fix it? What's the performance cost?

**Scenario C — The fsync Trade-off**

A social media startup uses `synchronous_commit = off` to handle 100,000 likes/second. The server loses power. What data is lost? Is this acceptable for a likes counter? Would it be acceptable for a payments system? Justify your answer.

## Section 3: Open-Ended

**Question 1:** Design a transaction protocol for a multi-currency exchange that guarantees ACID across two different PostgreSQL databases. Describe the protocol steps, failure scenarios, and recovery procedures.

**Question 2:** You're debugging a production issue where two concurrent transactions deadlock under SERIALIZABLE isolation. The application retries once and gives up. How would you: (a) detect the deadlock, (b) diagnose the root cause, (c) implement a retry strategy with exponential backoff?

**Question 3:** Compare how PostgreSQL and a NoSQL database like MongoDB handle durability. What guarantees does each provide? Under what conditions would you choose one over the other?

## Key Concept Map

```
                      ACID
                        │
        ┌───────────────┼───────────────┐
        │               │               │
    Atomicity       Consistency     Isolation    Durability
        │               │               │             │
    ┌───┴───┐     ┌─────┴─────┐   ┌─────┴─────┐   ┌───┴───┐
    │  WAL  │     │CHECK/FK/  │   │   MVCC    │   │  WAL  │
    │  2PC  │     │  UNIQUE   │   │ Isolation │   │ fsync │
    │ROLLBACK│    │   Triggers│   │  Levels   │   │ PITR  │
    └───────┘     │ App Logic │   └───────────┘   │Replic.│
                  └───────────┘                    └───────┘
```

## Further Reading

- [ACID properties on Wikipedia](https://en.wikipedia.org/wiki/ACID)
- [PostgreSQL Transaction Processing](https://www.postgresql.org/docs/current/transaction-processing.html)
- Kleppmann, M. — *Designing Data-Intensive Applications*, Chapters 7-9
- [Jepsen Consistency Models](https://jepsen.io/consistency)

## Course Complete! 🎉

You have completed the ACID Properties course. You should now:
1. Understand how each ACID property guarantees data integrity
2. Implement atomic transactions with proper error handling
3. Choose isolation levels and understand their trade-offs
4. Design durable storage strategies for production

**Next steps:** Explore the [ACID Principles](/knowledge/principles/acid) resource hub for additional videos, books, and community resources. Consider taking the [CAP Theorem](/knowledge/principles/cap-theorem) course next.
