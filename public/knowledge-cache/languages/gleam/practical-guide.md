---
title: "Practical Gleam Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready Gleam development environment"
  - "Use package management (gleam's package manager) effectively"
  - "Work with Gleam ecosystem frameworks for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/gleam
prerequisites:
  - "Fundamentals of Gleam (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical Gleam Guide

## Development Environment

A professional Gleam setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with Gleam extensions / VS Code |
| Package Manager | Dependency management | gleam's package manager |
| Linter | Code quality | gleam linter |
| Formatter | Consistent style | gleam formatter |

## Package Management with gleam's package manager

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
gleam new my_project

# Add a dependency
add dependency
```

## Key Frameworks & Libraries

The Gleam ecosystem is rich with production-grade frameworks:

### Gleam ecosystem frameworks

This is the most popular framework in the Gleam ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```gleam
# Example: basic setup with Gleam ecosystem frameworks
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production Gleam:

```gleam
# Example test skeleton
# Replace with actual Gleam test code
```

### Additional Ecosystem

Other notable tools:

- **Standard Library** — For specialized use cases
- **Community tools** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── gleam-config
└── README.md
```

### Common Patterns

1. **Error Handling** — Use pattern matching for robust error management
2. **Configuration** — Use environment variables and config files
3. **Logging** — Structured logging for observability
4. **Concurrency** — Threads for concurrent operations

## Real-World Exercise

Build a simple CLI tool that:

1. Accepts a name as an argument
2. Greets the user
3. Handles errors gracefully
4. Exits with proper status codes

```gleam
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production Gleam service using Gleam ecosystem frameworks. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare Gleam ecosystem frameworks with alternatives in the Gleam ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my Gleam application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use gleam's package manager for dependency management
- Gleam ecosystem frameworks is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the Gleam community and ecosystem

## Further Reading

- [Gleam Production Best Practices](https://docs.gleam.org/)
- [Gleam Style Guide](https://github.com/topics/gleam-styleguide)
- [Open Source Gleam Projects](https://github.com/topics/gleam)
