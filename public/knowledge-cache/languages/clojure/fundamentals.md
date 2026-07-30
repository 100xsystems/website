---
title: "Fundamentals of Clojure"
description: "Core concepts, syntax, and first steps with Clojure"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Clojure syntax and core constructs"
  - "Set up a development environment for Clojure"
  - "Write and run your first Clojure program"
  - "Master Clojure's unique type system and paradigms"
knowledge_refs:
  - languages/clojure
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Clojure

## Getting Started

Clojure is a language designed for lisp on jvm, immutable-by-default, concurrency with stm, code-as-data. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Clojure on your system:

- **macOS**: `brew install clojure`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Clojure website
- **Package Manager**: Leiningen (or tools.deps)

Verify your installation:

```bash
clojure --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```clojure
(println "Hello, 100X Systems!")
```

Run it:

```bash
clj -M -e '(println "Hello")"
```

## Core Concepts

Clojure is built around several fundamental concepts:

### 1. Core Paradigm

Clojure supports functional programming with immutable data and pure functions.

### 2. Types & Variables

Understanding the type system is crucial:

- Clojure is dynamically typed — variable types are inferred at runtime
- Key types include: integers, floats, strings, booleans, and lists, tuples, and atoms

### 3. Key Language Features

Notable aspects of Clojure:

- **persistent data structures** — A defining feature of the language
- **pure functions** — Core to idiomatic Clojure
- **macros** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```clojure
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Clojure. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the persistent data structures concept in Clojure with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Clojure code for me: [paste your code]. Act as a senior Clojure developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Clojure is designed for lisp on jvm, immutable-by-default, concurrency with stm, code-as-data
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: persistent data structures, pure functions, macros, REPL-driven development
- Install via Leiningen (or tools.deps) and start with small programs

## Further Reading

- [Clojure Official Documentation](https://clojure.org/)
- [Clojure Community](https://github.com/topics/clojure)
- [Awesome Clojure](https://github.com/sindresorhus/awesome)
