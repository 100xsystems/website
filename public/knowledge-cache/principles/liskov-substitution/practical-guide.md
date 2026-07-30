---
title: "Liskov Substitution: Practical Guide"
order: 2
difficulty: "Intermediate"
duration: "45 min"
learning_objectives:
  - "Apply Liskov Substitution in real-world production systems"
  - "Identify and fix common violations"
  - "Design systems that follow Liskov Substitution"
prerequisites:
  - "principles/liskov-substitution"
knowledge_refs:
  - "principles/liskov-substitution"
---

# Liskov Substitution: Practical Guide

## Real-World Applications

Liskov Substitution appears in many real-world scenarios. Understanding when and how to apply it separates experienced engineers from beginners.

## Common Anti-Patterns

1. **Over-application:** Applying Liskov Substitution where it adds unnecessary complexity
2. **Ignoring context:** Following the principle blindly without understanding trade-offs
3. **Premature optimization:** Enforcing Liskov Substitution before understanding the actual requirements

## Practice: Code Review

Review the following design choices and determine if Liskov Substitution is correctly applied.

1. A function that does validation, logging, AND database queries
2. A class hierarchy where a Square extends Rectangle
3. A module that depends directly on a specific cloud provider SDK

## Guided LLM Prompts

**Prompt 1:** Show me three code snippets — one that applies Liskov Substitution well, one that violates it, and one where violating it is the right choice.

**Prompt 2:** Explain how Liskov Substitution relates to other design principles and patterns.

## Key Takeaways

- Apply principles contextually, not dogmatically
- Understand the trade-offs before enforcing any principle
- Code review is the best place to discuss principle application

## Further Reading

- Knowledge base resources for Liskov Substitution
