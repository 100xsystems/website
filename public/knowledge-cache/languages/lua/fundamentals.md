---
title: "Fundamentals of Lua"
description: "Core concepts, syntax, and first steps with Lua"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Lua syntax and core constructs"
  - "Set up a development environment for Lua"
  - "Write and run your first Lua program"
  - "Master Lua's unique type system and paradigms"
knowledge_refs:
  - languages/lua
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Lua

## Getting Started

Lua is a language designed for embeddable, lightweight, fast, ideal for game scripting and configuration. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Lua on your system:

- **macOS**: `brew install lua`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Lua website
- **Package Manager**: luarocks

Verify your installation:

```bash
lua --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```lua
print("Hello, 100X Systems!")
```

Run it:

```bash
lua hello.lua
```

## Core Concepts

Lua is built around several fundamental concepts:

### 1. Core Paradigm

Lua supports a unique combination of paradigms tailored for embeddable, lightweight, fast, ideal for game scripting and configuration.

### 2. Types & Variables

Understanding the type system is crucial:

- Lua is dynamically typed — variable types are inferred at runtime
- Key types include: integers, floats, strings, booleans, and native types specific to its domain

### 3. Key Language Features

Notable aspects of Lua:

- **tables-as-everything** — A defining feature of the language
- **first-class functions** — Core to idiomatic Lua
- **metatables** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```lua
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Lua. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the tables-as-everything concept in Lua with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Lua code for me: [paste your code]. Act as a senior Lua developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Lua is designed for embeddable, lightweight, fast, ideal for game scripting and configuration
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: tables-as-everything, first-class functions, metatables, coroutines
- Install via luarocks and start with small programs

## Further Reading

- [Lua Official Documentation](https://lua.org/)
- [Lua Community](https://github.com/topics/lua)
- [Awesome Lua](https://github.com/sindresorhus/awesome)
