---
title: "Fundamentals of Ruby"
description: "Core concepts, syntax, and first steps with Ruby"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Ruby syntax and core constructs"
  - "Set up a development environment for Ruby"
  - "Write and run your first Ruby program"
  - "Master Ruby's unique type system and paradigms"
knowledge_refs:
  - languages/ruby
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Ruby

## Getting Started

Ruby is a language designed for elegant syntax, convention-over-configuration, metaprogramming, mature web ecosystem. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Ruby on your system:

- **macOS**: `brew install ruby`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Ruby website
- **Package Manager**: gem (or Bundler)

Verify your installation:

```bash
ruby --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```ruby
puts "Hello, 100X Systems!"
```

Run it:

```bash
ruby hello.rb
```

## Core Concepts

Ruby is built around several fundamental concepts:

### 1. Core Paradigm

Ruby supports multiple paradigms including object-oriented, functional, and procedural programming.

### 2. Types & Variables

Understanding the type system is crucial:

- Ruby is dynamically typed — variable types are inferred at runtime
- Key types include: integers, floats, strings, booleans, and complex data structures such as arrays, maps, and structs

### 3. Key Language Features

Notable aspects of Ruby:

- **everything-is-an-object** — A defining feature of the language
- **blocks/procs/lambdas** — Core to idiomatic Ruby
- **mixins** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```ruby
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Ruby. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the everything-is-an-object concept in Ruby with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Ruby code for me: [paste your code]. Act as a senior Ruby developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Ruby is designed for elegant syntax, convention-over-configuration, metaprogramming, mature web ecosystem
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: everything-is-an-object, blocks/procs/lambdas, mixins, duck typing
- Install via gem (or Bundler) and start with small programs

## Further Reading

- [Ruby Official Documentation](https://ruby.org/)
- [Ruby Community](https://github.com/topics/ruby)
- [Awesome Ruby](https://github.com/sindresorhus/awesome)
