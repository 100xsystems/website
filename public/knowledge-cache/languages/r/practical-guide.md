---
title: "Practical R Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready R development environment"
  - "Use package management (install.packages()) effectively"
  - "Work with tidyverse (dplyr for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/r
prerequisites:
  - "Fundamentals of R (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical R Guide

## Development Environment

A professional R setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with R extensions / VS Code |
| Package Manager | Dependency management | install.packages() |
| Linter | Code quality | r linter |
| Formatter | Consistent style | r formatter |

## Package Management with install.packages()

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
r new my_project

# Add a dependency
add dependency
```

## Key Frameworks & Libraries

The R ecosystem is rich with production-grade frameworks:

### tidyverse (dplyr

This is the most popular framework in the R ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```r
# Example: basic setup with tidyverse (dplyr
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production R:

```r
# Example test skeleton
# Replace with actual R test code
```

### Additional Ecosystem

Other notable tools:

- **ggplot2** — For specialized use cases
- **tidyr)** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── r-config
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

```r
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production R service using tidyverse (dplyr. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare tidyverse (dplyr with ggplot2 in the R ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my R application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use install.packages() for dependency management
- tidyverse (dplyr is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the R community and ecosystem

## Further Reading

- [R Production Best Practices](https://docs.r.org/)
- [R Style Guide](https://github.com/topics/r-styleguide)
- [Open Source R Projects](https://github.com/topics/r)
