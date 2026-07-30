---
title: "Fundamentals of Dart"
description: "Core concepts, syntax, and first steps with Dart"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Dart syntax and core constructs"
  - "Set up a development environment for Dart"
  - "Write and run your first Dart program"
  - "Master Dart's unique type system and paradigms"
knowledge_refs:
  - languages/dart
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Dart

## Getting Started

Dart is a language designed for cross-platform ui (flutter), jit + aot compilation, type-safe. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Dart on your system:

- **macOS**: `brew install dart`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Dart website
- **Package Manager**: pub (Dart Pub)

Verify your installation:

```bash
dart --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```dart
void main() {
    print("Hello, 100X Systems!");
}
```

Run it:

```bash
dart run hello.dart
```

## Core Concepts

Dart is built around several fundamental concepts:

### 1. Core Paradigm

Dart supports multiple paradigms including object-oriented, functional, and procedural programming.

### 2. Types & Variables

Understanding the type system is crucial:

- Dart is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and native types specific to its domain

### 3. Key Language Features

Notable aspects of Dart:

- **sound null safety** — A defining feature of the language
- **streams** — Core to idiomatic Dart
- **futures** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```dart
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Dart. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the sound null safety concept in Dart with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Dart code for me: [paste your code]. Act as a senior Dart developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Dart is designed for cross-platform ui (flutter), jit + aot compilation, type-safe
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: sound null safety, streams, futures, isolates, mixins
- Install via pub (Dart Pub) and start with small programs

## Further Reading

- [Dart Official Documentation](https://dart.org/)
- [Dart Community](https://github.com/topics/dart)
- [Awesome Dart](https://github.com/sindresorhus/awesome)
