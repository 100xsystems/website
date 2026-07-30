---
title: "Fundamentals of PHP"
description: "Core concepts, syntax, and first steps with PHP"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand PHP syntax and core constructs"
  - "Set up a development environment for PHP"
  - "Write and run your first PHP program"
  - "Master PHP's unique type system and paradigms"
knowledge_refs:
  - languages/php
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of PHP

## Getting Started

PHP is a language designed for server-side scripting, massive hosting support, rich cms ecosystem. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install PHP on your system:

- **macOS**: `brew install php`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official PHP website
- **Package Manager**: Composer

Verify your installation:

```bash
php --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```php
<?php
echo "Hello, 100X Systems!" . PHP_EOL;
```

Run it:

```bash
php hello.php
```

## Core Concepts

PHP is built around several fundamental concepts:

### 1. Core Paradigm

PHP supports a unique combination of paradigms tailored for server-side scripting, massive hosting support, rich cms ecosystem.

### 2. Types & Variables

Understanding the type system is crucial:

- PHP is dynamically typed — variable types are inferred at runtime
- Key types include: integers, floats, strings, booleans, and native types specific to its domain

### 3. Key Language Features

Notable aspects of PHP:

- **loose typing** — A defining feature of the language
- **traits** — Core to idiomatic PHP
- **namespaces** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```php
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me PHP. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the loose typing concept in PHP with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this PHP code for me: [paste your code]. Act as a senior PHP developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- PHP is designed for server-side scripting, massive hosting support, rich cms ecosystem
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: loose typing, traits, namespaces, PSR standards, autoloading
- Install via Composer and start with small programs

## Further Reading

- [PHP Official Documentation](https://php.org/)
- [PHP Community](https://github.com/topics/php)
- [Awesome PHP](https://github.com/sindresorhus/awesome)
