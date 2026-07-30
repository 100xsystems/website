---
title: "Review & Mastery Quiz"
order: 4
difficulty: "Intermediate"
duration: "30 min"
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

This quiz tests your understanding across all four ACID properties.

## Multiple Choice

**1.** A transaction debits Account A, crashes before crediting Account B, and upon recovery Account A's balance is unchanged. Which ACID property was maintained? (a) Atomicity (b) Consistency (c) Isolation (d) Durability

**2.** Which PostgreSQL isolation level prevents dirty reads, non-repeatable reads, AND phantom reads? (a) READ UNCOMMITTED (b) READ COMMITTED (c) REPEATABLE READ (d) SERIALIZABLE

**3.** The Write-Ahead Log (WAL) is primarily responsible for which ACID property? (a) Atomicity and Durability (b) Only Consistency (c) Only Isolation (d) Only Atomicity

**4.** Which phenomenon occurs when a transaction reads a row twice and sees different data because another transaction modified and committed that row? (a) Dirty read (b) Non-repeatable read (c) Phantom read (d) Lost update

**5.** What system call guarantees that committed data has been physically written to persistent storage? (a) write() (b) flush() (c) fsync() (d) sync()

## Scenario Analysis

**Scenario A — Double-Charge:** During a network partition, the API gateway retries a ride payment. What happens? Which ACID property is violated? How would you fix it?

**Scenario B — Phantom Report:** A nightly reporting query runs at 11:59 PM and gets different counts for the same query 5 seconds apart. Which isolation phenomenon is this? What isolation level fixes it?

**Scenario C — The fsync Trade-off:** A social media startup uses synchronous_commit=off to handle 100k likes/second. The server loses power. What data is lost? Is this acceptable?

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

## Course Complete!

You have completed the ACID Properties course. Explore the [ACID resource hub](/knowledge/principles/acid) for additional videos, books, and community resources.
