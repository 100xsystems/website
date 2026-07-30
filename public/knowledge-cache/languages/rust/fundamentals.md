---
title: "Fundamentals of Rust"
description: "Core concepts, syntax, and first steps with Rust"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Rust syntax and core constructs"
  - "Set up a development environment for Rust"
  - "Write and run your first Rust program"
  - "Master Rust's unique type system and paradigms"
knowledge_refs:
  - languages/rust
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Rust

## Getting Started

Rust is a language designed for memory safety without gc, zero-cost abstractions, fearless concurrency. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Rust on your system:

- **macOS**: `brew install rust`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Rust website
- **Package Manager**: cargo

Verify your installation:

```bash
rust --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```rust
fn main() {
    println!("Hello, 100X Systems!");
}
```

Run it:

```bash
cargo run
```

## Core Concepts

Rust is built around several fundamental concepts:

### 1. Core Paradigm

Rust supports systems programming with manual memory control and zero-cost abstractions.

### 2. Types & Variables

Understanding the type system is crucial:

- Rust is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and complex data structures such as arrays, maps, and structs

### 3. Key Language Features

Notable aspects of Rust:

- **ownership** — A defining feature of the language
- **borrowing** — Core to idiomatic Rust
- **lifetimes** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```rust
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Rust. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the ownership concept in Rust with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Rust code for me: [paste your code]. Act as a senior Rust developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Rust is designed for memory safety without gc, zero-cost abstractions, fearless concurrency
- The language uses a type system that helps catch errors early
- Key concepts to master: ownership, borrowing, lifetimes, pattern matching, traits
- Install via cargo and start with small programs

## Further Reading

- [Rust Official Documentation](https://rust.org/)
- [Rust Community](https://github.com/topics/rust)
- [Awesome Rust](https://github.com/sindresorhus/awesome)
