---
title: "Practical Perl Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready Perl development environment"
  - "Use package management (cpan (or cpanm)) effectively"
  - "Work with Mojolicious for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/perl
prerequisites:
  - "Fundamentals of Perl (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical Perl Guide

## Development Environment

A professional Perl setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with Perl extensions / VS Code |
| Package Manager | Dependency management | cpan (or cpanm) |
| Linter | Code quality | perl linter |
| Formatter | Consistent style | perl formatter |

## Package Management with cpan (or cpanm)

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
perl new my_project

# Add a dependency
add dependency
```

## Key Frameworks & Libraries

The Perl ecosystem is rich with production-grade frameworks:

### Mojolicious

This is the most popular framework in the Perl ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```perl
# Example: basic setup with Mojolicious
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production Perl:

```perl
# Example test skeleton
# Replace with actual Perl test code
```

### Additional Ecosystem

Other notable tools:

- **Dancer2** — For specialized use cases
- **Catalyst** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── perl-config
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

```perl
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production Perl service using Mojolicious. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare Mojolicious with Dancer2 in the Perl ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my Perl application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use cpan (or cpanm) for dependency management
- Mojolicious is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the Perl community and ecosystem

## Further Reading

- [Perl Production Best Practices](https://docs.perl.org/)
- [Perl Style Guide](https://github.com/topics/perl-styleguide)
- [Open Source Perl Projects](https://github.com/topics/perl)
