---
title: "Fundamentals of JavaScript"
description: "Core concepts, syntax, and first steps with JavaScript"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand JavaScript syntax and core constructs"
  - "Set up a development environment for JavaScript"
  - "Write and run your first JavaScript program"
  - "Master JavaScript's unique type system and paradigms"
knowledge_refs:
  - languages/javascript
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of JavaScript

## Getting Started

JavaScript is a language designed for first-class functions, jit-compiled, dynamic typing, garbage-collected. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install JavaScript on your system:

- **macOS**: `brew install javascript`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official JavaScript website
- **Package Manager**: npm (or yarn / pnpm)

Verify your installation:

```bash
javascript --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```javascript
console.log("Hello, 100X Systems!");
```

Run it:

```bash
node hello.js
```

## Core Concepts

JavaScript is built around several fundamental concepts:

### 1. Core Paradigm

JavaScript supports multiple paradigms including object-oriented, functional, and procedural programming.

### 2. Types & Variables

Understanding the type system is crucial:

- JavaScript is dynamically typed — variable types are inferred at runtime
- Key types include: integers, floats, strings, booleans, and complex data structures such as arrays, maps, and structs

### 3. Key Language Features

Notable aspects of JavaScript:

- **prototypal inheritance** — A defining feature of the language
- **closures** — Core to idiomatic JavaScript
- **event loop** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```javascript
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me JavaScript. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the prototypal inheritance concept in JavaScript with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this JavaScript code for me: [paste your code]. Act as a senior JavaScript developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- JavaScript is designed for first-class functions, jit-compiled, dynamic typing, garbage-collected
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: prototypal inheritance, closures, event loop, async/await
- Install via npm (or yarn / pnpm) and start with small programs

## Further Reading

- [JavaScript Official Documentation](https://javascript.org/)
- [JavaScript Community](https://github.com/topics/javascript)
- [Awesome JavaScript](https://github.com/sindresorhus/awesome)
