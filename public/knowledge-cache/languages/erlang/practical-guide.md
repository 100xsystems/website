---
title: "Practical Erlang Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready Erlang development environment"
  - "Use package management (rebar3) effectively"
  - "Work with OTP for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/erlang
prerequisites:
  - "Fundamentals of Erlang (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical Erlang Guide

## Development Environment

A professional Erlang setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with Erlang extensions / VS Code |
| Package Manager | Dependency management | rebar3 |
| Linter | Code quality | erlang linter |
| Formatter | Consistent style | erlang formatter |

## Package Management with rebar3

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
erlang new my_project

# Add a dependency
rebar3 deps
```

## Key Frameworks & Libraries

The Erlang ecosystem is rich with production-grade frameworks:

### OTP

This is the most popular framework in the Erlang ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```erlang
# Example: basic setup with OTP
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production Erlang:

```erlang
# Example test skeleton
# Replace with actual Erlang test code
```

### Additional Ecosystem

Other notable tools:

- **Cowboy** — For specialized use cases
- **Mnesia** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── erlang-config
└── README.md
```

### Common Patterns

1. **Error Handling** — Use pattern matching for robust error management
2. **Configuration** — Use environment variables and config files
3. **Logging** — Structured logging for observability
4. **Concurrency** — Actor model for concurrent operations

## Real-World Exercise

Build a simple CLI tool that:

1. Accepts a name as an argument
2. Greets the user
3. Handles errors gracefully
4. Exits with proper status codes

```erlang
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production Erlang service using OTP. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare OTP with Cowboy in the Erlang ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my Erlang application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use rebar3 for dependency management
- OTP is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the Erlang community and ecosystem

## Further Reading

- [Erlang Production Best Practices](https://docs.erlang.org/)
- [Erlang Style Guide](https://github.com/topics/erlang-styleguide)
- [Open Source Erlang Projects](https://github.com/topics/erlang)
