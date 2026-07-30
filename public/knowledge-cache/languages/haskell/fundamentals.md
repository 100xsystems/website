---
title: "Fundamentals of Haskell"
description: "Core concepts, syntax, and first steps with Haskell"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Haskell syntax and core constructs"
  - "Set up a development environment for Haskell"
  - "Write and run your first Haskell program"
  - "Master Haskell's unique type system and paradigms"
knowledge_refs:
  - languages/haskell
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Haskell

## Getting Started

Haskell is a language designed for statically-typed, lazy-by-default, referential transparency, strong type inference. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Haskell on your system:

- **macOS**: `brew install haskell`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Haskell website
- **Package Manager**: cabal (or Stack)

Verify your installation:

```bash
haskell --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```haskell
main = putStrLn "Hello, 100X Systems!"
```

Run it:

```bash
runghc hello.hs
```

## Core Concepts

Haskell is built around several fundamental concepts:

### 1. Core Paradigm

Haskell supports functional programming with immutable data and pure functions.

### 2. Types & Variables

Understanding the type system is crucial:

- Haskell is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and algebraic data types and pattern matching

### 3. Key Language Features

Notable aspects of Haskell:

- **pure functions** — A defining feature of the language
- **lazy evaluation** — Core to idiomatic Haskell
- **monads** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```haskell
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Haskell. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the pure functions concept in Haskell with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Haskell code for me: [paste your code]. Act as a senior Haskell developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Haskell is designed for statically-typed, lazy-by-default, referential transparency, strong type inference
- The language uses a type system that helps catch errors early
- Key concepts to master: pure functions, lazy evaluation, monads, type classes, algebraic data types
- Install via cabal (or Stack) and start with small programs

## Further Reading

- [Haskell Official Documentation](https://haskell.org/)
- [Haskell Community](https://github.com/topics/haskell)
- [Awesome Haskell](https://github.com/sindresorhus/awesome)
