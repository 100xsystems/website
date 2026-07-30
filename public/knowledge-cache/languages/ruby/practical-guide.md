---
title: "Practical Ruby Guide"
description: "Real-world usage, tooling, and ecosystem"
type: lesson
order: 2
duration: "60 min"
difficulty: intermediate
learning_objectives:
  - "Set up a production-ready Ruby development environment"
  - "Use package management (gem (or Bundler)) effectively"
  - "Work with Ruby on Rails for real projects"
  - "Apply best practices and common patterns"
knowledge_refs:
  - languages/ruby
prerequisites:
  - "Fundamentals of Ruby (Lesson 1)"
  - "Basic understanding of software development workflows"
---

# Practical Ruby Guide

## Development Environment

A professional Ruby setup requires more than just the compiler/interpreter:

### Essential Tools

| Tool | Purpose | Recommendation |
|------|---------|---------------|
| Editor/IDE | Code editing | VS Code with Ruby extensions / VS Code |
| Package Manager | Dependency management | gem (or Bundler) |
| Linter | Code quality | ruby linter |
| Formatter | Consistent style | ruby formatter |

## Package Management with gem (or Bundler)

Managing dependencies is a core skill. Here's how to start a new project:

```bash
# Create a new project
ruby new my_project

# Add a dependency
gem install rails
```

## Key Frameworks & Libraries

The Ruby ecosystem is rich with production-grade frameworks:

### Ruby on Rails

This is the most popular framework in the Ruby ecosystem. It provides:

- **High productivity** — Convention-over-configuration approach
- **Strong community** — Extensive packages and plugins
- **Production-ready** — Battle-tested at scale

```ruby
# Example: basic setup with Ruby on Rails
# See official docs for full tutorial
```

### Testing

Testing is non-negotiable in production Ruby:

```ruby
# Example test skeleton
# Replace with actual Ruby test code
```

### Additional Ecosystem

Other notable tools:

- **Sinatra** — For specialized use cases
- **Hanami** — Extends functionality

## Best Practices

### Code Organization

```
project/
├── src/           # Source code
├── tests/         # Test files
├── docs/          # Documentation
├── Gemfile
└── README.md
```

### Common Patterns

1. **Error Handling** — Use try/catch for robust error management
2. **Configuration** — Use environment variables and config files
3. **Logging** — Structured logging for observability
4. **Concurrency** — Threads for concurrent operations

## Real-World Exercise

Build a simple CLI tool that:

1. Accepts a name as an argument
2. Greets the user
3. Handles errors gracefully
4. Exits with proper status codes

```ruby
# Write your CLI tool implementation here
```

## LLM Prompts

> **Prompt 1 (Architecture Review):** "I'm building a production Ruby service using Ruby on Rails. What architectural patterns should I follow? Consider error handling, logging, testing, and deployment as separate dimensions. Give me a checklist."

> **Prompt 2 (Ecosystem Deep Dive):** "Compare Ruby on Rails with Sinatra in the Ruby ecosystem. When should I choose one over the other? Give me decision criteria with tradeoffs."

> **Prompt 3 (Debugging Session):** "I'm debugging a production issue in my Ruby application. Walk me through your debugging process step by step. Start with 'what logs would you check first?' and let me respond."

## Key Takeaways

- Use gem (or Bundler) for dependency management
- Ruby on Rails is the go-to framework for most projects
- Follow standard project structure conventions
- Write tests early and often
- Leverage the Ruby community and ecosystem

## Further Reading

- [Ruby Production Best Practices](https://docs.ruby.org/)
- [Ruby Style Guide](https://github.com/topics/ruby-styleguide)
- [Open Source Ruby Projects](https://github.com/topics/ruby)
