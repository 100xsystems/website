---
title: "Practical Strangler Fig Guide"
description: "Real-world usage, best practices, and common patterns"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Apply Strangler Fig effectively in real-world projects"
  - "Recognize anti-patterns and common mistakes"
  - "Evaluate trade-offs in different contexts"
  - "Communicate about Strangler Fig with your team"
knowledge_refs:
  - patterns/strangler-fig
prerequisites:
  - "Fundamentals of Strangler Fig (Lesson 1)"
---

# Practical Strangler Fig Guide

## Implementation Approaches

There are several ways to apply Strangler Fig depending on your context:

### Approach 1: Direct Application

The most straightforward approach — identify the problem and apply Strangler Fig directly.

**When to use:** When the problem matches the classic use case exactly.

### Approach 2: Adapted Application

Modify the standard approach to fit your specific constraints.

**When to use:** When your context differs from the textbook example.

### Approach 3: Combined Patterns

Use Strangler Fig alongside other related concepts for a more complete solution.

**When to use:** When a single approach isn't sufficient for complex requirements.

## Best Practices

### Do's

- **Start simple** — Apply the minimum viable version first, then iterate
- **Document decisions** — Record why you chose Strangler Fig and what alternatives you considered
- **Review regularly** — Revisit your decision as the system evolves

### Don'ts

- **Over-engineer** — Don't apply Strangler Fig where a simpler solution works
- **Dogma** — No approach is universally correct; context matters
- **Ignore trade-offs** — Every decision comes with costs

## Common Anti-Patterns

1. **Silver Bullet Syndrome** — Assuming Strangler Fig is the answer to every problem
2. **Premature Optimization** — Applying Strangler Fig before you understand the actual requirements
3. **Copy-Paste Implementation** — Blindly following a pattern without understanding the rationale

## Real-World Exercise

Think about a system you work with or know well:

1. Identify where Strangler Fig could be applied
2. What problem would it solve?
3. What would be the trade-offs?
4. How would you measure success?

Write a brief analysis:

```
System: [Name of system]
Current approach: [How it works now]
Proposed change: [How you'd apply Strangler Fig]
Expected benefits: [What would improve]
Potential costs: [What would be harder]
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm designing a system and considering using Strangler Fig. Walk me through your decision framework. What questions should I ask myself? What alternatives should I evaluate? Start with 'what problem are you trying to solve?' and let me respond."

> **Prompt 2 (Trade-off Analysis):** "Compare Strangler Fig with alternative approaches in terms of: maintainability, performance, team cognitive load, and scalability. Create a decision matrix with scores for each dimension."

> **Prompt 3 (Code Review):** "Here's my implementation of Strangler Fig: [paste pseudocode or description]. Review it as a senior engineer. Is my approach correct? What edge cases am I missing? What would you change?"

## Key Takeaways

- Always consider the trade-offs before applying Strangler Fig
- Start simple and iterate — complexity should be earned
- Document your rationale for future maintainers
- Review your decision as the system evolves

## Further Reading

- [Strangler Fig — Advanced Topics](https://github.com/topics/strangler-fig)
- [Case Studies Using Strangler Fig](https://github.com/topics/strangler-fig-examples)
- [Patterns in Production](https://github.com/topics/patterns-patterns)
