---
title: "Fundamentals of Kotlin"
description: "Core concepts, syntax, and first steps with Kotlin"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Kotlin syntax and core constructs"
  - "Set up a development environment for Kotlin"
  - "Write and run your first Kotlin program"
  - "Master Kotlin's unique type system and paradigms"
knowledge_refs:
  - languages/kotlin
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Kotlin

## Getting Started

Kotlin is a language designed for concise syntax, java-interoperable, first-class android support, coroutines. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Kotlin on your system:

- **macOS**: `brew install kotlin`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Kotlin website
- **Package Manager**: Gradle (or Maven)

Verify your installation:

```bash
kotlin --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```kotlin
fun main() {
    println("Hello, 100X Systems!")
}
```

Run it:

```bash
kotlinc hello.kt -include-runtime -d hello.jar && java -jar hello.jar
```

## Core Concepts

Kotlin is built around several fundamental concepts:

### 1. Core Paradigm

Kotlin supports a unique combination of paradigms tailored for concise syntax, java-interoperable, first-class android support, coroutines.

### 2. Types & Variables

Understanding the type system is crucial:

- Kotlin is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and native types specific to its domain

### 3. Key Language Features

Notable aspects of Kotlin:

- **null safety** — A defining feature of the language
- **coroutines** — Core to idiomatic Kotlin
- **extension functions** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```kotlin
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Kotlin. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the null safety concept in Kotlin with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Kotlin code for me: [paste your code]. Act as a senior Kotlin developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Kotlin is designed for concise syntax, java-interoperable, first-class android support, coroutines
- The language uses a type system that helps catch errors early
- Key concepts to master: null safety, coroutines, extension functions, data classes, sealed classes
- Install via Gradle (or Maven) and start with small programs

## Further Reading

- [Kotlin Official Documentation](https://kotlin.org/)
- [Kotlin Community](https://github.com/topics/kotlin)
- [Awesome Kotlin](https://github.com/sindresorhus/awesome)
