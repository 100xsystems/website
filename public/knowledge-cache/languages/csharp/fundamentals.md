---
title: "Fundamentals of C#"
description: "Core concepts, syntax, and first steps with C#"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand C# syntax and core constructs"
  - "Set up a development environment for C#"
  - "Write and run your first C# program"
  - "Master C#'s unique type system and paradigms"
knowledge_refs:
  - languages/csharp
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of C#

## Getting Started

C# is a language designed for type-safe, cross-platform (.net core), linq, rich ide support. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install C# on your system:

- **macOS**: `brew install csharp`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official C# website
- **Package Manager**: NuGet (via dotnet CLI)

Verify your installation:

```bash
csharp --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```csharp
Console.WriteLine("Hello, 100X Systems!");
```

Run it:

```bash
dotnet run
```

## Core Concepts

C# is built around several fundamental concepts:

### 1. Core Paradigm

C# supports multiple paradigms including object-oriented, functional, and procedural programming.

### 2. Types & Variables

Understanding the type system is crucial:

- C# is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and complex data structures such as arrays, maps, and structs

### 3. Key Language Features

Notable aspects of C#:

- **LINQ** — A defining feature of the language
- **async/await** — Core to idiomatic C#
- **generics** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```csharp
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me C#. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the LINQ concept in C# with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this C# code for me: [paste your code]. Act as a senior C# developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- C# is designed for type-safe, cross-platform (.net core), linq, rich ide support
- The language uses a type system that helps catch errors early
- Key concepts to master: LINQ, async/await, generics, delegates, properties, garbage collection
- Install via NuGet (via dotnet CLI) and start with small programs

## Further Reading

- [C# Official Documentation](https://csharp.org/)
- [C# Community](https://github.com/topics/csharp)
- [Awesome C#](https://github.com/sindresorhus/awesome)
