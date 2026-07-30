---
title: "Fundamentals of Java"
description: "Core concepts, syntax, and first steps with Java"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Java syntax and core constructs"
  - "Set up a development environment for Java"
  - "Write and run your first Java program"
  - "Master Java's unique type system and paradigms"
knowledge_refs:
  - languages/java
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Java

## Getting Started

Java is a language designed for statically-typed, jvm-based, write-once-run-anywhere, strong ecosystem. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Java on your system:

- **macOS**: `brew install java`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Java website
- **Package Manager**: Maven (or Gradle)

Verify your installation:

```bash
java --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```java
public class Hello {
    public static void main(String[] args) {
        System.out.println("Hello, 100X Systems!");
    }
}
```

Run it:

```bash
javac Hello.java && java Hello
```

## Core Concepts

Java is built around several fundamental concepts:

### 1. Core Paradigm

Java supports a unique combination of paradigms tailored for statically-typed, jvm-based, write-once-run-anywhere, strong ecosystem.

### 2. Types & Variables

Understanding the type system is crucial:

- Java is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and complex data structures such as arrays, maps, and structs

### 3. Key Language Features

Notable aspects of Java:

- **OOP (inheritance** — A defining feature of the language
- **polymorphism** — Core to idiomatic Java
- **encapsulation)** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```java
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Java. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the OOP (inheritance concept in Java with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Java code for me: [paste your code]. Act as a senior Java developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Java is designed for statically-typed, jvm-based, write-once-run-anywhere, strong ecosystem
- The language uses a type system that helps catch errors early
- Key concepts to master: OOP (inheritance, polymorphism, encapsulation), JVM, garbage collection, threading
- Install via Maven (or Gradle) and start with small programs

## Further Reading

- [Java Official Documentation](https://java.org/)
- [Java Community](https://github.com/topics/java)
- [Awesome Java](https://github.com/sindresorhus/awesome)
