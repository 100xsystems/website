---
title: "Practical Rust Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready Rust development environment"
  - "Use package management (cargo) effectively"
  - "Work with Axum for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/rust
prerequisites:
  - "Fundamentals of Rust (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical Rust Guide

## Development Environment

A professional Rust setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with Rust extensions / RustRover |
| Package Manager | Dependency management | cargo |
| Linter | Code quality | Clippy |
| Formatter | Consistent style | rustfmt |

## Package Management with cargo

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
cargo new my_project

# Add a dependency
cargo add serde
```

## Key Frameworks & Libraries

The Rust ecosystem is rich with production-grade frameworks:

### Axum

This is the most popular framework in the Rust ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```rust
# Example: basic setup with Axum
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production Rust:

```rust
# Example test skeleton
# Replace with actual Rust test code
```

### Additional Ecosystem

Other notable tools:

- **Actix-Web** — For specialized use cases
- **Rocket** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── Cargo.toml
└── README.md
```

### Common Patterns

1. **Error Handling** — Use Result types for robust error management
2. **Configuration** — Use environment variables and config files
3. **Logging** — Structured logging for observability
4. **Concurrency** — Async/await for concurrent operations

## Real-World Exercise

Build a simple CLI tool that:

1. Accepts a name as an argument
2. Greets the user
3. Handles errors gracefully
4. Exits with proper status codes

```rust
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production Rust service using Axum. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare Axum with Actix-Web in the Rust ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my Rust application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use cargo for dependency management
- Axum is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the Rust community and ecosystem

## Further Reading

- [Rust Production Best Practices](https://docs.rust.org/)
- [Rust Style Guide](https://github.com/topics/rust-styleguide)
- [Open Source Rust Projects](https://github.com/topics/rust)
