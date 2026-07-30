/**
 * ## Language Resources
 *
 * Curated, hand-picked resources for learning programming languages.
 * We do NOT host content — we point to the absolute best free resources
 * on the internet so learners find the right path through the noise.
 *
 * Format inspired by awesome-lists but opinionated: only the best,
 * most comprehensive resources make the cut.
 *
 * Add more languages over time. Each language gets a ResourcesList
 * exported from this file.
 */

// ─── Types ──────────────────────────────────────────────────────────

export interface ResourceLink {
  title: string;
  url: string;
  description: string;
}

export interface ResourceCategory {
  label: string;
  icon: string;
  items: ResourceLink[];
}

export interface LanguageResources {
  /** ISO / common slug for the language (e.g. "javascript", "python") */
  slug: string;
  /** Display name */
  name: string;
  /** Short description for the hero */
  description: string;
  /** Sorted array of resource categories */
  categories: ResourceCategory[];
}

// ═══════════════════════════════════════════════════════════════════════
// JAVASCRIPT
// ═══════════════════════════════════════════════════════════════════════

export const javascriptResources: LanguageResources = {
  slug: 'javascript',
  name: 'JavaScript',
  description:
    'The language of the web. JavaScript powers browsers, servers (Node.js), desktop apps (Electron), and increasingly the edge. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    {
      label: 'Free Books',
      icon: 'book',
      items: [
        {
          title: 'Eloquent JavaScript (4th Edition)',
          url: 'https://eloquentjavascript.net/',
          description:
            'A modern introduction covering core language features, the browser environment, and Node.js. Widely considered the best free JS book.',
        },
        {
          title: "You Don't Know JS Yet",
          url: 'https://github.com/getify/you-dont-know-js',
          description:
            'An in-depth series exploring the core mechanisms of JavaScript — closures, prototypes, async, and more.',
        },
        {
          title: 'The Modern JavaScript Tutorial',
          url: 'https://javascript.info/',
          description:
            'A massive, detailed guide covering everything from fundamentals to advanced async programming, DOM manipulation, and browser APIs.',
        },
        {
          title: 'Exploring JS: JavaScript for Programmers',
          url: 'https://exploringjs.com/',
          description:
            'A comprehensive reference by Dr. Axel Rauschmayer covering ES6+ features, modules, async patterns, and TypeScript.',
        },
      ],
    },
    {
      label: 'Official Documentation',
      icon: 'docs',
      items: [
        {
          title: 'MDN Web Docs — JavaScript Guide',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
          description:
            'The definitive manual for the JavaScript language. Covers grammar, control flow, functions, objects, classes, promises, and iterators.',
        },
        {
          title: 'MDN — JavaScript Reference',
          url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference',
          description:
            'Complete reference for all built-in objects, statements, operators, and expressions. The language dictionary.',
        },
        {
          title: 'TC39 ECMAScript Proposals',
          url: 'https://github.com/tc39/proposals',
          description:
            "Official repository tracking all ECMAScript proposals through the standardization pipeline. See what's coming next.",
        },
      ],
    },
    {
      label: 'Interactive Courses',
      icon: 'code',
      items: [
        {
          title: 'The Odin Project — Full Stack JavaScript',
          url: 'https://www.theodinproject.com/paths/full-stack-javascript',
          description:
            'A world-class, rigorous open-source curriculum from absolute beginner to building full-stack applications.',
        },
        {
          title: 'freeCodeCamp — JavaScript Algorithms & Data Structures',
          url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8',
          description:
            'Hands-on interactive coding challenges teaching syntax, functional programming, and algorithmic problem-solving.',
        },
      ],
    },
    {
      label: 'Video Courses',
      icon: 'video',
      items: [
        {
          title: 'JavaScript Programming — Full Course (freeCodeCamp)',
          url: 'https://www.youtube.com/watch?v=jS4aFq5-91M',
          description:
            'A comprehensive multi-hour video masterclass covering JavaScript from scratch to professional proficiency.',
        },
        {
          title: 'Full-Stack Web Development Playlist',
          url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbleDe3_ZA8h3AO2rXar-q2V',
          description:
            "freeCodeCamp's curated playlist covering the full stack — HTML, CSS, JavaScript, Node.js, React, and databases.",
        },
      ],
    },
    {
      label: 'Practice & Challenges',
      icon: 'terminal',
      items: [
        {
          title: 'Exercism — JavaScript Track',
          url: 'https://exercism.org/tracks/javascript',
          description:
            'Over 150 structured coding exercises with optional community mentoring. Teaches idiomatic JavaScript patterns.',
        },
        {
          title: 'Codewars',
          url: 'https://www.codewars.com/',
          description:
            'Gamified coding platform with community-authored kata across hundreds of difficulty levels.',
        },
        {
          title: 'Edabit',
          url: 'https://edabit.com/',
          description:
            'Bite-sized interactive challenges from very easy to expert. Builds fast muscle memory for syntax and logic.',
        },
      ],
    },
    {
      label: 'Reference & Cheatsheets',
      icon: 'reference',
      items: [
        {
          title: 'Devhints — ES2015+ Cheatsheet',
          url: 'https://devhints.io/es6',
          description:
            'A concise one-page reference covering modern ES6+ syntax: destructuring, arrow functions, promises, and modules.',
        },
        {
          title: 'JS: The Right Way',
          url: 'https://jstherightway.org/',
          description:
            'A curated guide to the best practices, tools, and resources for modern JavaScript development.',
        },
      ],
    },
    {
      label: 'News & Updates',
      icon: 'news',
      items: [
        {
          title: 'JavaScript Weekly',
          url: 'https://javascriptweekly.com/',
          description:
            'A free weekly email roundup of the latest JavaScript articles, tutorials, tools, and releases.',
        },
        {
          title: 'Proposals.es — ECMAScript Proposals Browser',
          url: 'https://www.proposals.es/',
          description:
            'A community browser for tracking ECMAScript proposals through their standardization stages.',
        },
      ],
    },
    {
      label: 'Community',
      icon: 'community',
      items: [
        {
          title: 'Reddit r/javascript',
          url: 'https://www.reddit.com/r/javascript/',
          description:
            'The largest JavaScript community on Reddit — news, discussions, show & tell, and career advice.',
        },
        {
          title: 'Stack Overflow — JavaScript Tag',
          url: 'https://stackoverflow.com/questions/tagged/javascript',
          description:
            'The definitive Q&A forum for troubleshooting errors, evaluating patterns, and resolving language bugs.',
        },
        {
          title: 'JSConf',
          url: 'https://jsconf.com/',
          description:
            'The umbrella organization for community-driven JavaScript conferences worldwide.',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PYTHON
// ═══════════════════════════════════════════════════════════════════════

export const pythonResources: LanguageResources = {
  slug: 'python',
  name: 'Python',
  description:
    'The most versatile language in the ecosystem. Python powers data science, machine learning, backend systems, automation, and scripting. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    {
      label: 'Free Books',
      icon: 'book',
      items: [
        {
          title: 'Automate the Boring Stuff with Python (3rd Ed.)',
          url: 'https://automatetheboringstuff.com/',
          description:
            'The premier beginner resource for learning practical scripting to automate everyday tasks — Excel, web scraping, file manipulation. Full text free online.',
        },
        {
          title: 'Think Python (3rd Edition)',
          url: 'https://allendowney.github.io/ThinkPython/',
          description:
            'Completely redesigned for modern learning. Runs in Jupyter notebooks — read, execute code, and work through exercises directly in the browser.',
        },
        {
          title: 'Dive Into Python 3',
          url: 'https://diveintopython3.netlify.app/',
          description:
            'A free book for experienced programmers to learn Python 3 quickly. Covers native datatypes, comprehensions, closures, generators, and testing.',
        },
      ],
    },
    {
      label: 'Official Documentation',
      icon: 'docs',
      items: [
        {
          title: 'The Python Tutorial',
          url: 'https://docs.python.org/3/tutorial/index.html',
          description:
            'Curated by the core developers and PSF. The definitive resource for understanding the language syntax, standard library, and data structures.',
        },
        {
          title: 'Python Language Reference',
          url: 'https://docs.python.org/3/reference/index.html',
          description:
            'The complete reference for Python syntax, lexical analysis, data model, execution model, and import system.',
        },
        {
          title: 'Python Standard Library',
          url: 'https://docs.python.org/3/library/index.html',
          description:
            'The built-in library reference — everything from string operations and data types to networking, threading, and web frameworks.',
        },
      ],
    },
    {
      label: 'Interactive Courses',
      icon: 'code',
      items: [
        {
          title: "Google's Python Class",
          url: 'https://developers.google.com/edu/python/',
          description:
            'Free class from Google engineers. Features lecture videos, written materials, and lots of code exercises covering regex, utilities, and more.',
        },
        {
          title: 'freeCodeCamp — Python Curriculum',
          url: 'https://www.freecodecamp.org/',
          description:
            'Completely free, project-based curriculum with browser-based coding environments and certifications for Python.',
        },
      ],
    },
    {
      label: 'Video Courses',
      icon: 'video',
      items: [
        {
          title: 'Python for Beginners — Full Course (freeCodeCamp)',
          url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
          description:
            'A multi-hour comprehensive video tutorial covering core concepts, loops, dictionaries, classes, and mini-projects.',
        },
        {
          title: 'PyCon US Talks (YouTube)',
          url: 'https://www.youtube.com/@PyConUS',
          description:
            'Hundreds of free conference talks from Python core contributors, software architects, and library maintainers. Intermediate to advanced.',
        },
      ],
    },
    {
      label: 'Practice & Challenges',
      icon: 'terminal',
      items: [
        {
          title: 'Exercism — Python Track',
          url: 'https://exercism.org/tracks/python',
          description:
            '100% free platform with 146 coding exercises across 17 concepts. Includes automated code analysis and human mentor feedback.',
        },
        {
          title: 'Codewars',
          url: 'https://www.codewars.com/',
          description:
            'Master Python by solving bite-sized community-crafted challenges and comparing solutions with other developers.',
        },
        {
          title: 'HackerRank — Python Track',
          url: 'https://www.hackerrank.com/domains/python',
          description:
            'Domain-specific challenges from basic I/O to advanced data structures and interview preparation.',
        },
      ],
    },
    {
      label: 'Reference & Cheatsheets',
      icon: 'reference',
      items: [
        {
          title: 'Real Python Cheat Sheet',
          url: 'https://realpython.com/cheatsheets/python/',
          description:
            'Compact, exhaustive reference covering syntax, data types, collections, control flow, functions, file I/O, and virtual environments.',
        },
        {
          title: 'Python Cheatsheet (devhints)',
          url: 'https://devhints.io/python',
          description:
            'A concise one-page reference for Python 3 syntax, built-in functions, comprehensions, and common patterns.',
        },
      ],
    },
    {
      label: 'News & Updates',
      icon: 'news',
      items: [
        {
          title: "PyCoder's Weekly",
          url: 'https://pycoders.com/',
          description:
            'A premier weekly email newsletter highlighting the best Python articles, tutorials, open-source projects, and community news.',
        },
        {
          title: 'Python.org — Latest News',
          url: 'https://www.python.org/blogs/',
          description:
            'Official Python Software Foundation blog covering release announcements, PEP summaries, and community updates.',
        },
      ],
    },
    {
      label: 'Community',
      icon: 'community',
      items: [
        {
          title: 'Reddit r/learnpython',
          url: 'https://www.reddit.com/r/learnpython/',
          description:
            'The largest community of Python learners and educators. Perfect for troubleshooting, finding recommendations, and curated resources.',
        },
        {
          title: 'Stack Overflow — Python Tag',
          url: 'https://stackoverflow.com/questions/tagged/python',
          description:
            'The definitive Q&A forum for Python questions — from beginner syntax to advanced metaprogramming patterns.',
        },
        {
          title: 'Python Discord',
          url: 'https://pythondiscord.com/',
          description:
            'A large, active Python community on Discord with channels for learning, projects, and career advice.',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TYPESCRIPT
// ═══════════════════════════════════════════════════════════════════════

export const typescriptResources: LanguageResources = {
  slug: 'typescript',
  name: 'TypeScript',
  description:
    'TypeScript is JavaScript with static types. It catches errors at compile time, enables fearless refactoring, and powers the largest codebases in the world. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    {
      label: 'Free Books',
      icon: 'book',
      items: [
        {
          title: 'TypeScript Handbook (Official)',
          url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
          description:
            'The official handbook by Microsoft. Covers every feature of the language from basic types to advanced inference, generics, and modules.',
        },
        {
          title: 'TypeScript Deep Dive',
          url: 'https://basarat.gitbook.io/typescript/',
          description:
            'A comprehensive open-source book by Basarat Ali Syed. Covers real-world patterns, project setup, and migration strategies.',
        },
        {
          title: 'Type Challenges — Solutions Book',
          url: 'https://ghaiklor.github.io/type-challenges-solutions/en/',
          description:
            'Companion guide to type-challenges with detailed explanations of over 100 advanced type puzzles from easy to extreme.',
        },
      ],
    },
    {
      label: 'Official Documentation',
      icon: 'docs',
      items: [
        {
          title: 'TypeScript Official Docs',
          url: 'https://www.typescriptlang.org/docs/',
          description:
            'The complete official documentation: handbook, reference, tutorials, release notes, and the TSConfig reference.',
        },
        {
          title: 'TypeScript Playground',
          url: 'https://www.typescriptlang.org/play/',
          description:
            'Interactive sandbox with instant type evaluation, TSConfig toggles, and shareable code snippets. The best way to experiment with types.',
        },
        {
          title: 'TypeScript Wiki (GitHub)',
          url: 'https://github.com/Microsoft/TypeScript/wiki',
          description:
            'Community-maintained wiki covering design decisions, breaking changes, and advanced topics not in the handbook.',
        },
      ],
    },
    {
      label: 'Interactive Courses',
      icon: 'code',
      items: [
        {
          title: 'Total TypeScript — Free Tutorials',
          url: 'https://www.totaltypescript.com/tutorials',
          description:
            'A collection of interactive, high-quality free tutorials by Matt Pocock covering generics, patterns, and real-world TypeScript.',
        },
        {
          title: 'freeCodeCamp — TypeScript Course',
          url: 'https://www.freecodecamp.org/news/typescript-course/',
          description:
            'A structured, project-based interactive course that walks through type annotations, interfaces, generics, and building real applications.',
        },
      ],
    },
    {
      label: 'Video Courses',
      icon: 'video',
      items: [
        {
          title: 'TypeScript — The Complete Course (freeCodeCamp)',
          url: 'https://www.youtube.com/watch?v=30LWjhZzg50',
          description:
            'A comprehensive multi-hour video course covering everything from basic types to advanced patterns like discriminated unions and mapped types.',
        },
        {
          title: 'TypeScript for Beginners (Academind)',
          url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs',
          description:
            'A beginner-friendly walkthrough of TypeScript essentials with practical code-along examples and real-world use cases.',
        },
      ],
    },
    {
      label: 'Practice & Challenges',
      icon: 'terminal',
      items: [
        {
          title: 'Type Challenges — TypeScript Type Puzzles',
          url: 'https://github.com/type-challenges/type-challenges',
          description:
            'A collection of over 200 community-sourced type-level challenges ranging from easy (Pick<T, K>) to extreme (deep immutable). The gold standard for mastering advanced types.',
        },
        {
          title: 'Exercism — TypeScript Track',
          url: 'https://exercism.org/tracks/typescript',
          description:
            '100+ coding exercises with automated analysis and optional human mentoring. Teaches idiomatic TypeScript patterns and type safety.',
        },
        {
          title: 'Codewars — TypeScript Kata',
          url: 'https://www.codewars.com/?language=typescript',
          description:
            'Solve community-created challenges while getting typed feedback. Filter by difficulty and type-system focus.',
        },
      ],
    },
    {
      label: 'Reference & Cheatsheets',
      icon: 'reference',
      items: [
        {
          title: 'TypeScript Cheatsheets (Official)',
          url: 'https://www.typescriptlang.org/cheatsheets/',
          description:
            'Official one-page reference sheets for controls, interfaces, types, classes, and utility types. Printer-friendly and up-to-date.',
        },
        {
          title: 'TypeScript Utility Types',
          url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
          description:
            'The complete reference for all built-in utility types: Partial, Pick, Omit, Record, ReturnType, and more.',
        },
      ],
    },
    {
      label: 'News & Updates',
      icon: 'news',
      items: [
        {
          title: 'TypeScript Blog (Official)',
          url: 'https://devblogs.microsoft.com/typescript/',
          description:
            'Official Microsoft blog with deep-dive release notes, roadmap posts, and feature previews from the core team.',
        },
        {
          title: 'TypeScript Weekly',
          url: 'https://typescript-weekly.com/',
          description:
            'A curated weekly newsletter covering TypeScript articles, type challenges, open-source tools, and community highlights.',
        },
      ],
    },
    {
      label: 'Community',
      icon: 'community',
      items: [
        {
          title: 'Reddit r/typescript',
          url: 'https://www.reddit.com/r/typescript/',
          description:
            'The largest TypeScript community on Reddit — discussions, articles, type challenges, and ecosystem news.',
        },
        {
          title: 'TypeScript Discord (Official)',
          url: 'https://discord.gg/typescript',
          description:
            'The official TypeScript Discord server. Direct Q&A with the community — from beginners to core contributors.',
        },
        {
          title: 'TypeScript GitHub Discussions',
          url: 'https://github.com/microsoft/TypeScript/discussions',
          description:
            'The official GitHub discussions board for feature requests, design proposals, and community-driven RFCs.',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GO
// ═══════════════════════════════════════════════════════════════════════

export const goResources: LanguageResources = {
  slug: 'go',
  name: 'Go',
  description:
    'Go is a statically typed, compiled language designed at Google for building simple, reliable, and efficient software at scale. It excels at backend services, microservices, APIs, and concurrent systems. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    {
      label: 'Free Books',
      icon: 'book',
      items: [
        {
          title: 'Learn Go with Tests',
          url: 'https://quii.gitbook.io/learn-go-with-tests',
          description:
            'An exceptional open-source book by Chris James that teaches Go fundamentals through Test-Driven Development. Available on GitHub. The gold standard for learning idiomatic Go.',
        },
        {
          title: 'Go by Example',
          url: 'https://gobyexample.com/',
          description:
            'A hands-on introduction using annotated example programs. The fastest way to grasp syntax, goroutines, channels, and the standard library.',
        },
        {
          title: 'The Little Go Book',
          url: 'https://www.openmymind.net/The-Little-Go-Book/',
          description:
            'A concise, conceptual overview by Karl Seguin covering Go types, interfaces, concurrency, and tooling. Perfect for experienced programmers.',
        },
      ],
    },
    {
      label: 'Official Documentation',
      icon: 'docs',
      items: [
        {
          title: 'Go Documentation Hub',
          url: 'https://go.dev/doc/',
          description:
            'Central home for all official tutorials, guides, references, and release notes maintained by the Go core team.',
        },
        {
          title: 'Effective Go',
          url: 'https://go.dev/doc/effective_go',
          description:
            'Essential reading for writing clear, idiomatic Go code. Covers formatting, naming conventions, concurrency patterns, and standard library usage.',
        },
        {
          title: 'Go Language Specification',
          url: 'https://go.dev/ref/spec',
          description:
            'The ultimate source of truth detailing the exact syntax, types, and operational behavior of the Go programming language.',
        },
      ],
    },
    {
      label: 'Interactive Courses',
      icon: 'code',
      items: [
        {
          title: 'A Tour of Go',
          url: 'https://go.dev/tour/',
          description:
            'The official interactive tutorial by the Go team. Learn by doing — run code directly in your browser covering basics, methods, interfaces, and concurrency.',
        },
        {
          title: 'freeCodeCamp — Learn Golang Handbook',
          url: 'https://www.freecodecamp.org/news/learn-golang-handbook/',
          description:
            'A comprehensive free handbook that takes you from total beginner to building real-world backend applications with practical examples.',
        },
      ],
    },
    {
      label: 'Video Courses',
      icon: 'video',
      items: [
        {
          title: 'Golang Tutorial for Beginners (Tech With Tim)',
          url: 'https://www.youtube.com/watch?v=jFfo2mHPpeY',
          description:
            'A clean, structured video deep-dive into writing production-ready Go scripts covering syntax, packages, and build tools.',
        },
        {
          title: 'Anthony GG — Go Tutorials',
          url: 'https://www.youtube.com/@anthonygg',
          description:
            'An exceptional channel with practical Go tutorials focusing on building web servers, REST APIs, and microservices idiomatically.',
        },
      ],
    },
    {
      label: 'Practice & Challenges',
      icon: 'terminal',
      items: [
        {
          title: 'Exercism — Go Track',
          url: 'https://exercism.org/tracks/go',
          description:
            '100% free with 165+ coding exercises across 34 concepts. Includes automated code analysis and optional human mentorship.',
        },
        {
          title: 'Codewars — Go Kata',
          url: 'https://www.codewars.com/',
          description:
            'Gamified platform to sharpen problem-solving skills by solving community-created kata in Go across hundreds of difficulty levels.',
        },
        {
          title: 'LeetCode — Go Support',
          url: 'https://leetcode.com/',
          description:
            'Excellent for practicing algorithms and data structures in Go, particularly for technical interview preparation.',
        },
      ],
    },
    {
      label: 'Reference & Cheatsheets',
      icon: 'reference',
      items: [
        {
          title: 'Go Cheat Sheet',
          url: 'https://golang.ch/cheatsheet/',
          description:
            'A quick visual reference covering basic syntax, built-in types, error handling, pointers, interfaces, goroutines, and channels.',
        },
        {
          title: 'Go Playground',
          url: 'https://go.dev/play/',
          description:
            'Official online snippet runner. Write, test, and share Go code directly in your browser without installing a local toolchain.',
        },
      ],
    },
    {
      label: 'News & Updates',
      icon: 'news',
      items: [
        {
          title: 'Go Weekly',
          url: 'https://golangweekly.com/',
          description:
            'A legendary free weekly email newsletter tracking language updates, libraries, architecture discussions, and best practices.',
        },
        {
          title: 'Go Blog (Official)',
          url: 'https://go.dev/blog/',
          description:
            'The official engineering blog maintained by the Go core team detailing language releases, performance enhancements, and ecosystem tooling.',
        },
      ],
    },
    {
      label: 'Community',
      icon: 'community',
      items: [
        {
          title: 'Reddit r/golang',
          url: 'https://www.reddit.com/r/golang/',
          description:
            'The premier community for sharing news, asking technical questions, discussing project architectures, and reading Go release notes.',
        },
        {
          title: 'Go Forum',
          url: 'https://forum.golangbridge.org/',
          description:
            'The official structured discussion board for Gophers to find learning help, project advice, and community announcements.',
        },
        {
          title: 'Gophers Slack',
          url: 'https://go.dev/help',
          description:
            'Real-time chat community with thousands of active Go developers. Dedicated help channels and local user groups.',
        },
      ],
    },
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// RUST
// ═══════════════════════════════════════════════════════════════════════

export const rustResources: LanguageResources = {
  slug: 'rust',
  name: 'Rust',
  description:
    'Rust is a systems programming language focused on safety, speed, and concurrency without a garbage collector. It powers everything from embedded devices to web browsers (Servo) to cloud infrastructure. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    {
      label: 'Free Books',
      icon: 'book',
      items: [
        {
          title: 'The Rust Programming Language (The Book)',
          url: 'https://doc.rust-lang.org/book/',
          description:
            'The official introductory bible by Steve Klabnik and Carol Nichols. Covers ownership, borrowing, lifetimes, traits, concurrency, and more. Also available with interactive quizzes at Brown University edition.',
        },
        {
          title: 'Rust by Example',
          url: 'https://doc.rust-lang.org/rust-by-example/',
          description:
            'A collection of runnable code snippets that illustrate various Rust concepts and standard library features. Learn by reading and modifying working code.',
        },
        {
          title: 'Comprehensive Rust (Google)',
          url: 'https://google.github.io/comprehensive-rust/',
          description:
            'A multi-day course by Googles Android team covering deep Rust fundamentals, Android development, bare-metal embedded systems, and concurrency.',
        },
      ],
    },
    {
      label: 'Official Documentation',
      icon: 'docs',
      items: [
        {
          title: 'Rust Documentation Hub',
          url: 'https://doc.rust-lang.org/',
          description:
            'The main landing page for all official language docs, library specs, compiler guides, and edition migration notes.',
        },
        {
          title: 'The Rust Reference',
          url: 'https://doc.rust-lang.org/reference/',
          description:
            'The formal specification of Rust syntax, grammar, semantics, and memory model. For when you need the exact definition.',
        },
        {
          title: 'The Rustonomicon',
          url: 'https://doc.rust-lang.org/nomicon/',
          description:
            'The advanced guide exploring unsafe Rust, low-level memory layout, FFI, and dark arts. For intermediate to advanced Rustaceans.',
        },
        {
          title: 'Rust Standard Library Docs',
          url: 'https://doc.rust-lang.org/std/',
          description:
            'Deep API documentation for all built-in primitives, traits, modules, and macros. The language dictionary for Rust.',
        },
      ],
    },
    {
      label: 'Interactive Courses',
      icon: 'code',
      items: [
        {
          title: 'Rustlings',
          url: 'https://github.com/rust-lang/rustlings',
          description:
            'Official small CLI exercises by the Rust team. Fix broken programs to get used to reading and writing Rust code. The canonical interactive intro.',
        },
        {
          title: 'Tour of Rust',
          url: 'https://tourofrust.com/',
          description:
            'An interactive community-driven visual tour introducing basic to advanced Rust syntax side-by-side with explanations.',
        },
        {
          title: 'freeCodeCamp — Rust Course',
          url: 'https://www.freecodecamp.org/news/learn-rust-for-beginners/',
          description:
            'A full-length project-based interactive course covering foundational and intermediate Rust concepts with practical examples.',
        },
      ],
    },
    {
      label: 'Video Courses',
      icon: 'video',
      items: [
        {
          title: "Let's Get Rusty",
          url: 'https://www.youtube.com/@LetsGetRusty',
          description:
            'The premier Rust education channel featuring deep dives into The Book, popular crates, web frameworks (Axum, Actix), and advanced patterns.',
        },
        {
          title: 'No Boilerplate',
          url: 'https://www.youtube.com/@NoBoilerplate',
          description:
            'High-production, crisp video essays analyzing why Rust matters, software reliability, and modern systems engineering with beautiful visuals.',
        },
      ],
    },
    {
      label: 'Practice & Challenges',
      icon: 'terminal',
      items: [
        {
          title: 'Exercism — Rust Track',
          url: 'https://exercism.org/tracks/rust',
          description:
            '99 free coding exercises designed to teach idiomatic Rust, backed by automated test runner and community peer mentoring.',
        },
        {
          title: 'Codewars — Rust Kata',
          url: 'https://www.codewars.com/collections/rust-collection',
          description:
            'Community-created programming challenges categorized by difficulty. Solve data structures, algorithms, and lifetime puzzles.',
        },
        {
          title: 'LeetCode — Rust Support',
          url: 'https://leetcode.com/tag/rust/',
          description:
            'Solve hundreds of standard data-structure and algorithm challenges using Rusters memory model and type system.',
        },
      ],
    },
    {
      label: 'Reference & Cheatsheets',
      icon: 'reference',
      items: [
        {
          title: 'Rust Language Cheat Sheet',
          url: 'https://cheats.rs/',
          description:
            'An exhaustive, single-page reference matrix linking syntax symbols directly to the Book, Reference, and Standard Library. The definitive cheatsheet.',
        },
        {
          title: 'Rust Playground',
          url: 'https://play.rust-lang.org/',
          description:
            'Official browser-based sandbox compiler. Test code snippets, toggle optimization profiles, and inspect assembly or MIR output.',
        },
      ],
    },
    {
      label: 'News & Updates',
      icon: 'news',
      items: [
        {
          title: 'This Week in Rust',
          url: 'https://this-week-in-rust.org/',
          description:
            'The gold standard weekly community newsletter tracking core changes, crate updates, blog posts, and job openings. Essential reading.',
        },
        {
          title: 'Official Rust Blog',
          url: 'https://blog.rust-lang.org/',
          description:
            'Official announcements from the Rust Core Team regarding new stable releases, edition changes, and security updates.',
        },
      ],
    },
    {
      label: 'Community',
      icon: 'community',
      items: [
        {
          title: 'Reddit r/rust',
          url: 'https://www.reddit.com/r/rust/',
          description:
            'The largest Rust community on Reddit for project showcases, compiler questions, ecosystem news, and language evolution discussions.',
        },
        {
          title: 'Rust Users Forum',
          url: 'https://users.rust-lang.org/',
          description:
            'The official structured discussion board for learning help, idiom reviews, crate usage support, and community Q&A.',
        },
        {
          title: 'Rust Discord Server',
          url: 'https://discord.com/invite/rust-lang',
          description:
            'Live chat with channels for beginners, embedded systems, async frameworks, and language contributors. Thousands of active Rustaceans.',
        },
      ],
    },
  ],
};

// ─── Registry — all languages with curated resources ────────────────

const RESOURCE_REGISTRY: Record<string, LanguageResources> = {
  javascript: javascriptResources,
  python: pythonResources,
  typescript: typescriptResources,
  go: goResources,
  rust: rustResources,
};

/**
 * Get curated resources for a given language slug.
 * Returns null if no resources are curated for this language yet.
 */
export function getLanguageResources(slug: string): LanguageResources | null {
  return RESOURCE_REGISTRY[slug] || null;
}

/**
 * Get all language slugs that have curated resources.
 */
export function getLanguagesWithResources(): string[] {
  return Object.keys(RESOURCE_REGISTRY);
}
