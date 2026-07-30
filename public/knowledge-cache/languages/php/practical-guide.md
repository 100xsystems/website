---
title: "Practical PHP Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready PHP development environment"
  - "Use package management (Composer) effectively"
  - "Work with Laravel for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/php
prerequisites:
  - "Fundamentals of PHP (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical PHP Guide

## Development Environment

A professional PHP setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with PHP extensions / VS Code |
| Package Manager | Dependency management | Composer |
| Linter | Code quality | php linter |
| Formatter | Consistent style | php formatter |

## Package Management with Composer

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
php new my_project

# Add a dependency
composer require laravel/laravel
```

## Key Frameworks & Libraries

The PHP ecosystem is rich with production-grade frameworks:

### Laravel

This is the most popular framework in the PHP ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```php
# Example: basic setup with Laravel
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production PHP:

```php
# Example test skeleton
# Replace with actual PHP test code
```

### Additional Ecosystem

Other notable tools:

- **Symfony** — For specialized use cases
- **WordPress** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── composer.json
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

```php
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production PHP service using Laravel. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare Laravel with Symfony in the PHP ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my PHP application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use Composer for dependency management
- Laravel is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the PHP community and ecosystem

## Further Reading

- [PHP Production Best Practices](https://docs.php.org/)
- [PHP Style Guide](https://github.com/topics/php-styleguide)
- [Open Source PHP Projects](https://github.com/topics/php)
