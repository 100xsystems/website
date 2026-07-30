---
title: "Practical PureScript Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready PureScript development environment"
  - "Use package management (purescript's package manager) effectively"
  - "Work with PureScript ecosystem frameworks for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/purescript
prerequisites:
  - "Fundamentals of PureScript (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical PureScript Guide

## Development Environment

A professional PureScript setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with PureScript extensions / VS Code |
| Package Manager | Dependency management | purescript's package manager |
| Linter | Code quality | purescript linter |
| Formatter | Consistent style | purescript formatter |

## Package Management with purescript's package manager

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
purescript new my_project

# Add a dependency
add dependency
```

## Key Frameworks & Libraries

The PureScript ecosystem is rich with production-grade frameworks:

### PureScript ecosystem frameworks

This is the most popular framework in the PureScript ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```purescript
# Example: basic setup with PureScript ecosystem frameworks
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production PureScript:

```purescript
# Example test skeleton
# Replace with actual PureScript test code
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
├── purescript-config
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

```purescript
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production PureScript service using PureScript ecosystem frameworks. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare PureScript ecosystem frameworks with alternatives in the PureScript ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my PureScript application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use purescript's package manager for dependency management
- PureScript ecosystem frameworks is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the PureScript community and ecosystem

## Further Reading

- [PureScript Production Best Practices](https://docs.purescript.org/)
- [PureScript Style Guide](https://github.com/topics/purescript-styleguide)
- [Open Source PureScript Projects](https://github.com/topics/purescript)
