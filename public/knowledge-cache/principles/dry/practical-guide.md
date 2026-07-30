---
title: "DRY (Don't Repeat Yourself): Practical Guide"
order: 2
difficulty: "Intermediate"
duration: "45 min"
learning_objectives:
  - "Apply DRY (Don't Repeat Yourself) in real-world production systems"
  - "Identify and fix common violations"
  - "Design systems that follow DRY (Don't Repeat Yourself)"
prerequisites:
  - "principles/dry"
knowledge_refs:
  - "principles/dry"
---

# DRY (Don't Repeat Yourself): Practical Guide

## Real-World Applications

DRY (Don't Repeat Yourself) appears in many real-world scenarios. Understanding when and how to apply it separates experienced engineers from beginners.

## Common Anti-Patterns

1. **Over-application:** Applying DRY (Don't Repeat Yourself) where it adds unnecessary complexity
2. **Ignoring context:** Following the principle blindly without understanding trade-offs
3. **Premature optimization:** Enforcing DRY (Don't Repeat Yourself) before understanding the actual requirements

## Practice: Code Review

Review the following design choices and determine if DRY (Don't Repeat Yourself) is correctly applied.

1. A function that does validation, logging, AND database queries
2. A class hierarchy where a Square extends Rectangle
3. A module that depends directly on a specific cloud provider SDK

## Guided LLM Prompts

**Prompt 1:** Show me three code snippets — one that applies DRY (Don't Repeat Yourself) well, one that violates it, and one where violating it is the right choice.

**Prompt 2:** Explain how DRY (Don't Repeat Yourself) relates to other design principles and patterns.

## Key Takeaways

- Apply principles contextually, not dogmatically
- Understand the trade-offs before enforcing any principle
- Code review is the best place to discuss principle application

## Further Reading

- Knowledge base resources for DRY (Don't Repeat Yourself)
