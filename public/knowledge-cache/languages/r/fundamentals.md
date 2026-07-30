---
title: "Fundamentals of R"
description: "Core concepts, syntax, and first steps with R"
type: lesson
order: 1
duration: "45 min"
difficulty: beginner
learning_objectives:
  - "Understand R syntax and core constructs"
  - "Set up a development environment for R"
  - "Write and run your first R program"
  - "Master R's unique type system and paradigms"
knowledge_refs:
  - languages/r
prerequisites:
  - "Basic programming concepts (variables, functions, control flow)"
---

# Fundamentals of R

## Getting Started

R is a language designed for statistical computing, data visualization, cran package ecosystem. This lesson covers everything you need to write your first program and understand the core concepts.

### Installation & Setup

Install R on your system:

- **macOS**: `brew install r`
- **Linux**: Use your distribution's package manager
- **Windows**: Download from the official R website
- **Package Manager**: install.packages()

Verify your installation:

```bash
r --version
```

### Hello, 100X Systems!

Every journey begins with a single program:

```r
cat("Hello, 100X Systems!\n")
```

Run it:

```bash
Rscript hello.R
```

## Core Concepts

R is built around several fundamental concepts:

### 1. Core Paradigm

R supports a unique combination of paradigms tailored for statistical computing, data visualization, cran package ecosystem.

### 2. Types & Variables

Understanding the type system is crucial:

- R is progressively typed — you can add types where you need them
- Key types include: integers, floats, strings, booleans, and native types specific to its domain

### 3. Key Language Features

Notable aspects of R:

- **vectorized operations** — A defining feature of the language
- **data frames** — Core to idiomatic R
- **statistical modeling** — Enables productive development

## Practice Exercise

Write a program that:

1. Declares a variable with your name
2. Prints a greeting using that variable
3. Uses a function to transform the greeting

Example structure:

```r
// Your code here
// 1. Declare a variable
// 2. Define a greeting function
// 3. Call it and print the result
```

## LLM Prompts for Deeper Learning

Copy these prompts into your AI assistant to deepen your understanding:

> **Prompt 1 (Socratic Tutor):** "Act as a Socratic tutor teaching me R. Ask me one question at a time about the type system and core syntax. Do not give me the answer — guide me to discover it through contradictions and edge cases."

> **Prompt 2 (Concept Explorer):** "Explain the vectorized operations concept in R with 3 different real-world analogies. Then show me a code example that demonstrates it poorly (anti-pattern) and one that demonstrates it well."

> **Prompt 3 (Code Reviewer):** "Review this R code for me: [paste your code]. Act as a senior R developer. Point out any issues with idiomatic style, performance, or correctness. Be harsh — I want to learn."

## Key Takeaways

- R is designed for statistical computing, data visualization, cran package ecosystem
- The language uses dynamic typing for rapid prototyping and flexibility
- Key concepts to master: vectorized operations, data frames, statistical modeling, S3/S4 classes
- Install via install.packages() and start with small programs

## Further Reading

- [R Official Documentation](https://r.org/)
- [R Community](https://github.com/topics/r)
- [Awesome R](https://github.com/sindresorhus/awesome)
