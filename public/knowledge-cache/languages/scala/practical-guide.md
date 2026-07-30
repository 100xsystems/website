---
title: "Practical Scala Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready Scala development environment"
  - "Use package management (sbt (or Mill)) effectively"
  - "Work with Akka for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/scala
prerequisites:
  - "Fundamentals of Scala (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical Scala Guide

## Development Environment

A professional Scala setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with Scala extensions / VS Code |
| Package Manager | Dependency management | sbt (or Mill) |
| Linter | Code quality | scala linter |
| Formatter | Consistent style | scala formatter |

## Package Management with sbt (or Mill)

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
scala new my_project

# Add a dependency
add dependency
```

## Key Frameworks & Libraries

The Scala ecosystem is rich with production-grade frameworks:

### Akka

This is the most popular framework in the Scala ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```scala
# Example: basic setup with Akka
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production Scala:

```scala
# Example test skeleton
# Replace with actual Scala test code
```

### Additional Ecosystem

Other notable tools:

- **http4s** — For specialized use cases
- **Play Framework** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── scala-config
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

```scala
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production Scala service using Akka. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare Akka with http4s in the Scala ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my Scala application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use sbt (or Mill) for dependency management
- Akka is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the Scala community and ecosystem

## Further Reading

- [Scala Production Best Practices](https://docs.scala.org/)
- [Scala Style Guide](https://github.com/topics/scala-styleguide)
- [Open Source Scala Projects](https://github.com/topics/scala)
