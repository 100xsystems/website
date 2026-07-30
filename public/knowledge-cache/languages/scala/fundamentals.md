---
title: "Fundamentals of Scala"
description: "Core concepts, syntax, and first steps with Scala"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Scala syntax and core constructs"
  - "Set up a development environment for Scala"
  - "Write and run your first Scala program"
  - "Master Scala's unique type system and paradigms"
knowledge_refs:
  - languages/scala
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Scala

## Getting Started

Scala is a language designed for hybrid oop/fp, runs on jvm, strong type inference, scala 3 improvements. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Scala on your system:

- **macOS**: `brew install scala`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Scala website
- **Package Manager**: sbt (or Mill)

Verify your installation:

```bash
scala --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```scala
@main def hello() = println("Hello, 100X Systems!")
```

Run it:

```bash
scala-cli run hello.scala
```

## Core Concepts

Scala is built around several fundamental concepts:

### 1. Core Paradigm

Scala supports multiple paradigms including object-oriented, functional, and procedural programming.

### 2. Types & Variables

Understanding the type system is crucial:

- Scala is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and algebraic data types and pattern matching

### 3. Key Language Features

Notable aspects of Scala:

- **functional programming** — A defining feature of the language
- **immutability** — Core to idiomatic Scala
- **pattern matching** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```scala
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Scala. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the functional programming concept in Scala with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Scala code for me: [paste your code]. Act as a senior Scala developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Scala is designed for hybrid oop/fp, runs on jvm, strong type inference, scala 3 improvements
- The language uses a type system that helps catch errors early
- Key concepts to master: functional programming, immutability, pattern matching, for-comprehensions, type classes
- Install via sbt (or Mill) and start with small programs

## Further Reading

- [Scala Official Documentation](https://scala.org/)
- [Scala Community](https://github.com/topics/scala)
- [Awesome Scala](https://github.com/sindresorhus/awesome)
