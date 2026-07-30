---
title: "Command-Query Separation: Practical Guide"
order: 2
difficulty: "Intermediate"
duration: "45 min"
learning_objectives:
  - "Apply Command-Query Separation in real-world production systems"
  - "Identify and fix common violations"
  - "Design systems that follow Command-Query Separation"
prerequisites:
  - "principles/cqs"
knowledge_refs:
  - "principles/cqs"
---

# Command-Query Separation: Practical Guide

## Real-World Applications

Command-Query Separation appears in many real-world scenarios. Understanding when and how to apply it separates experienced engineers from beginners.

## Common Anti-Patterns

1. **Over-application:** Applying Command-Query Separation where it adds unnecessary complexity
2. **Ignoring context:** Following the principle blindly without understanding trade-offs
3. **Premature optimization:** Enforcing Command-Query Separation before understanding the actual requirements

## Practice: Code Review

Review the following design choices and determine if Command-Query Separation is correctly applied.

1. A function that does validation, logging, AND database queries
2. A class hierarchy where a Square extends Rectangle
3. A module that depends directly on a specific cloud provider SDK

## Guided LLM Prompts

**Prompt 1:** Show me three code snippets — one that applies Command-Query Separation well, one that violates it, and one where violating it is the right choice.

**Prompt 2:** Explain how Command-Query Separation relates to other design principles and patterns.

## Key Takeaways

- Apply principles contextually, not dogmatically
- Understand the trade-offs before enforcing any principle
- Code review is the best place to discuss principle application

## Further Reading

- Knowledge base resources for Command-Query Separation
