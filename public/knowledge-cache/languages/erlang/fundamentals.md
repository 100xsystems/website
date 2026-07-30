---
title: "Fundamentals of Erlang"
description: "Core concepts, syntax, and first steps with Erlang"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand Erlang syntax and core constructs"
  - "Set up a development environment for Erlang"
  - "Write and run your first Erlang program"
  - "Master Erlang's unique type system and paradigms"
knowledge_refs:
  - languages/erlang
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of Erlang

## Getting Started

Erlang is a language designed for fault-tolerant, hot code reloading, soft real-time, battle-tested telecom-grade. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install Erlang on your system:

- **macOS**: `brew install erlang`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official Erlang website
- **Package Manager**: rebar3

Verify your installation:

```bash
erlang --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```erlang
-module(hello).
-export([hello/0]).
hello() -> io:format("Hello, 100X Systems!~n").
```

Run it:

```bash
erlc hello.erl && erl -noshell -eval 'hello:hello()' -s init stop
```

## Core Concepts

Erlang is built around several fundamental concepts:

### 1. Core Paradigm

Erlang supports a unique combination of paradigms tailored for fault-tolerant, hot code reloading, soft real-time, battle-tested telecom-grade.

### 2. Types & Variables

Understanding the type system is crucial:

- Erlang is progressively typed — you can add types where you need them
- Key types include: integers, floats, strings, booleans, and lists, tuples, and atoms

### 3. Key Language Features

Notable aspects of Erlang:

- **actor model** — A defining feature of the language
- **pattern matching** — Core to idiomatic Erlang
- **recursion** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```erlang
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me Erlang. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the actor model concept in Erlang with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this Erlang code for me: [paste your code]. Act as a senior Erlang developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- Erlang is designed for fault-tolerant, hot code reloading, soft real-time, battle-tested telecom-grade
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: actor model, pattern matching, recursion, OTP behaviors (gen_server, supervisor)
- Install via rebar3 and start with small programs

## Further Reading

- [Erlang Official Documentation](https://erlang.org/)
- [Erlang Community](https://github.com/topics/erlang)
- [Awesome Erlang](https://github.com/sindresorhus/awesome)
