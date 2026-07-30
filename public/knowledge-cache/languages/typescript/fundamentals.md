---
title: "Fundamentals of TypeScript"
description: "Core concepts, syntax, and first steps with TypeScript"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand TypeScript syntax and core constructs"
  - "Set up a development environment for TypeScript"
  - "Write and run your first TypeScript program"
  - "Master TypeScript's unique type system and paradigms"
knowledge_refs:
  - languages/typescript
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of TypeScript

## Getting Started

TypeScript is a language designed for static type checking, interface-based design, decorators, utility types. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install TypeScript on your system:

- **macOS**: `brew install typescript`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official TypeScript website
- **Package Manager**: npm (or yarn / pnpm)

Verify your installation:

```bash
typescript --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```typescript
console.log("Hello, 100X Systems!");

// With types:
const greeting: string = "Hello, 100X Systems!";
console.log(greeting);
```

Run it:

```bash
npx ts-node hello.ts
```

## Core Concepts

TypeScript is built around several fundamental concepts:

### 1. Core Paradigm

TypeScript supports a unique combination of paradigms tailored for static type checking, interface-based design, decorators, utility types.

### 2. Types & Variables

Understanding the type system is crucial:

- TypeScript is statically typed — all types are checked at compile time
- Key types include: integers, floats, strings, booleans, and native types specific to its domain

### 3. Key Language Features

Notable aspects of TypeScript:

- **structural typing** — A defining feature of the language
- **generics** — Core to idiomatic TypeScript
- **discriminated unions** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```typescript
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me TypeScript. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the structural typing concept in TypeScript with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this TypeScript code for me: [paste your code]. Act as a senior TypeScript developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- TypeScript is designed for static type checking, interface-based design, decorators, utility types
- The language uses a type system that helps catch errors early
- Key concepts to master: structural typing, generics, discriminated unions, declaration files
- Install via npm (or yarn / pnpm) and start with small programs

## Further Reading

- [TypeScript Official Documentation](https://typescript.org/)
- [TypeScript Community](https://github.com/topics/typescript)
- [Awesome TypeScript](https://github.com/sindresorhus/awesome)
