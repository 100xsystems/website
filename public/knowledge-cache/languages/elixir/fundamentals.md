---
title: "Fundamentals of Elixir"
description: "Core concepts, syntax, and first steps with Elixir"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Elixir syntax and core constructs"
  - "Set up a development environment for Elixir"
  - "Write and run your first Elixir program"
  - "Master Elixir's unique type system and paradigms"
knowledge_refs:
  - languages/elixir
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Elixir

## Getting Started

Elixir is a language designed for fault-tolerant, erlang vm (beam), actor model, hot code swapping. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Elixir on your system:

- **macOS**: `brew install elixir`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Elixir website
- **Package Manager**: mix (Hex)

Verify your installation:

```bash
elixir --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```elixir
IO.puts("Hello, 100X Systems!")
```

Run it:

```bash
elixir hello.exs
```

## Core Concepts

Elixir is built around several fundamental concepts:

### 1. Core Paradigm

Elixir supports functional programming with immutable data and pure functions.

### 2. Types & Variables

Understanding the type system is crucial:

- Elixir is dynamically typed — variable types are inferred at runtime
- Key types include: integers, floats, strings, booleans, and lists, tuples, and atoms

### 3. Key Language Features

Notable aspects of Elixir:

- **functional purity** — A defining feature of the language
- **immutability** — Core to idiomatic Elixir
- **pattern matching** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```elixir
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Elixir. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the functional purity concept in Elixir with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Elixir code for me: [paste your code]. Act as a senior Elixir developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Elixir is designed for fault-tolerant, erlang vm (beam), actor model, hot code swapping
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: functional purity, immutability, pattern matching, pipes, OTP (GenServer, Supervisors)
- Install via mix (Hex) and start with small programs

## Further Reading

- [Elixir Official Documentation](https://elixir.org/)
- [Elixir Community](https://github.com/topics/elixir)
- [Awesome Elixir](https://github.com/sindresorhus/awesome)
