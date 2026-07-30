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
        { title: 'Eloquent JavaScript (4th Edition)', url: 'https://eloquentjavascript.net/', description: 'A modern introduction covering core language features, the browser environment, and Node.js. Widely considered the best free JS book.' },
        { title: "You Don't Know JS Yet", url: 'https://github.com/getify/you-dont-know-js', description: 'An in-depth series exploring the core mechanisms of JavaScript — closures, prototypes, async, and more.' },
        { title: 'The Modern JavaScript Tutorial', url: 'https://javascript.info/', description: 'A massive, detailed guide covering everything from fundamentals to advanced async programming, DOM manipulation, and browser APIs.' },
        { title: 'Exploring JS: JavaScript for Programmers', url: 'https://exploringjs.com/', description: 'A comprehensive reference by Dr. Axel Rauschmayer covering ES6+ features, modules, async patterns, and TypeScript.' },
      ],
    },
    {
      label: 'Official Documentation', icon: 'docs', items: [
        { title: 'MDN Web Docs — JavaScript Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide', description: 'The definitive manual for the JavaScript language. Covers grammar, control flow, functions, objects, classes, promises, and iterators.' },
        { title: 'MDN — JavaScript Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference', description: 'Complete reference for all built-in objects, statements, operators, and expressions.' },
        { title: 'TC39 ECMAScript Proposals', url: 'https://github.com/tc39/proposals', description: 'Official repository tracking all ECMAScript proposals through the standardization pipeline.' },
      ],
    },
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'The Odin Project — Full Stack JavaScript', url: 'https://www.theodinproject.com/paths/full-stack-javascript', description: 'A world-class open-source curriculum from absolute beginner to building full-stack applications.' },
      { title: 'freeCodeCamp — JavaScript Algorithms & Data Structures', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures-v8', description: 'Hands-on interactive coding challenges teaching syntax, functional programming, and algorithmic problem-solving.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'JavaScript Programming — Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=jS4aFq5-91M', description: 'A comprehensive multi-hour video masterclass covering JavaScript from scratch to professional proficiency.' },
      { title: 'Full-Stack Web Development Playlist', url: 'https://www.youtube.com/playlist?list=PLWKjhJtqVAbleDe3_ZA8h3AO2rXar-q2V', description: 'freeCodeCamp curated playlist covering HTML, CSS, JavaScript, Node.js, React, and databases.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — JavaScript Track', url: 'https://exercism.org/tracks/javascript', description: 'Over 150 structured coding exercises with optional community mentoring.' },
      { title: 'Codewars', url: 'https://www.codewars.com/', description: 'Gamified coding platform with community-authored kata across hundreds of difficulty levels.' },
      { title: 'Edabit', url: 'https://edabit.com/', description: 'Bite-sized interactive challenges from very easy to expert. Builds fast muscle memory.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Devhints — ES2015+ Cheatsheet', url: 'https://devhints.io/es6', description: 'A concise one-page reference covering modern ES6+ syntax: destructuring, arrow functions, promises, and modules.' },
      { title: 'JS: The Right Way', url: 'https://jstherightway.org/', description: 'A curated guide to the best practices, tools, and resources for modern JavaScript development.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'JavaScript Weekly', url: 'https://javascriptweekly.com/', description: 'A free weekly email roundup of the latest JavaScript articles, tutorials, tools, and releases.' },
      { title: 'Proposals.es', url: 'https://www.proposals.es/', description: 'A community browser for tracking ECMAScript proposals through their standardization stages.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/javascript', url: 'https://www.reddit.com/r/javascript/', description: 'The largest JavaScript community on Reddit — news, discussions, show & tell, and career advice.' },
      { title: 'Stack Overflow — JavaScript Tag', url: 'https://stackoverflow.com/questions/tagged/javascript', description: 'The definitive Q&A forum for troubleshooting errors and resolving language bugs.' },
      { title: 'JSConf', url: 'https://jsconf.com/', description: 'The umbrella organization for community-driven JavaScript conferences worldwide.' },
    ]},
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
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Automate the Boring Stuff with Python (3rd Ed.)', url: 'https://automatetheboringstuff.com/', description: 'The premier beginner resource for learning practical scripting to automate everyday tasks.' },
      { title: 'Think Python (3rd Edition)', url: 'https://allendowney.github.io/ThinkPython/', description: 'Completely redesigned for modern learning. Runs in Jupyter notebooks — read, execute code, and work through exercises directly in the browser.' },
      { title: 'Dive Into Python 3', url: 'https://diveintopython3.netlify.app/', description: 'A free book for experienced programmers to learn Python 3 quickly. Covers native datatypes, comprehensions, closures, generators, and testing.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'The Python Tutorial', url: 'https://docs.python.org/3/tutorial/index.html', description: 'Curated by the core developers and PSF. The definitive resource for understanding the language syntax, standard library, and data structures.' },
      { title: 'Python Language Reference', url: 'https://docs.python.org/3/reference/index.html', description: 'The complete reference for Python syntax, lexical analysis, data model, execution model, and import system.' },
      { title: 'Python Standard Library', url: 'https://docs.python.org/3/library/index.html', description: 'The built-in library reference covering everything from string operations to networking, threading, and web frameworks.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: "Google's Python Class", url: 'https://developers.google.com/edu/python/', description: 'Free class from Google engineers with lecture videos, written materials, and code exercises covering regex, utilities, and more.' },
      { title: 'freeCodeCamp — Python Curriculum', url: 'https://www.freecodecamp.org/', description: 'Completely free, project-based curriculum with browser-based coding environments and certifications for Python.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Python for Beginners — Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=rfscVS0vtbw', description: 'A multi-hour comprehensive video tutorial covering core concepts, loops, dictionaries, classes, and mini-projects.' },
      { title: 'PyCon US Talks (YouTube)', url: 'https://www.youtube.com/@PyConUS', description: 'Hundreds of free conference talks from Python core contributors, software architects, and library maintainers.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Python Track', url: 'https://exercism.org/tracks/python', description: '100% free platform with 146 coding exercises across 17 concepts. Includes automated code analysis and human mentor feedback.' },
      { title: 'Codewars', url: 'https://www.codewars.com/', description: 'Master Python by solving bite-sized community-crafted challenges and comparing solutions with other developers.' },
      { title: 'HackerRank — Python Track', url: 'https://www.hackerrank.com/domains/python', description: 'Domain-specific challenges from basic I/O to advanced data structures and interview preparation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Real Python Cheat Sheet', url: 'https://realpython.com/cheatsheets/python/', description: 'Compact, exhaustive reference covering syntax, data types, collections, control flow, functions, and file I/O.' },
      { title: 'Python Cheatsheet (devhints)', url: 'https://devhints.io/python', description: 'A concise one-page reference for Python 3 syntax, built-in functions, comprehensions, and common patterns.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: "PyCoder's Weekly", url: 'https://pycoders.com/', description: 'A premier weekly email newsletter highlighting the best Python articles, tutorials, open-source projects, and community news.' },
      { title: 'Python.org — Latest News', url: 'https://www.python.org/blogs/', description: 'Official Python Software Foundation blog covering release announcements, PEP summaries, and community updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/learnpython', url: 'https://www.reddit.com/r/learnpython/', description: 'The largest community of Python learners and educators.' },
      { title: 'Stack Overflow — Python Tag', url: 'https://stackoverflow.com/questions/tagged/python', description: 'The definitive Q&A forum for Python questions — from beginner syntax to advanced metaprogramming patterns.' },
      { title: 'Python Discord', url: 'https://pythondiscord.com/', description: 'A large, active Python community on Discord with channels for learning, projects, and career advice.' },
    ]},
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
    { label: 'Free Books', icon: 'book', items: [
      { title: 'TypeScript Handbook (Official)', url: 'https://www.typescriptlang.org/docs/handbook/intro.html', description: 'The official handbook by Microsoft. Covers every feature from basic types to advanced inference, generics, and modules.' },
      { title: 'TypeScript Deep Dive', url: 'https://basarat.gitbook.io/typescript/', description: 'A comprehensive open-source book by Basarat Ali Syed covering real-world patterns, project setup, and migration strategies.' },
      { title: 'Type Challenges — Solutions Book', url: 'https://ghaiklor.github.io/type-challenges-solutions/en/', description: 'Companion guide to type-challenges with detailed explanations of over 100 advanced type puzzles.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'TypeScript Official Docs', url: 'https://www.typescriptlang.org/docs/', description: 'The complete official documentation: handbook, reference, tutorials, release notes, and TSConfig reference.' },
      { title: 'TypeScript Playground', url: 'https://www.typescriptlang.org/play/', description: 'Interactive sandbox with instant type evaluation, TSConfig toggles, and shareable code snippets.' },
      { title: 'TypeScript Wiki (GitHub)', url: 'https://github.com/Microsoft/TypeScript/wiki', description: 'Community-maintained wiki covering design decisions, breaking changes, and advanced topics.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Total TypeScript — Free Tutorials', url: 'https://www.totaltypescript.com/tutorials', description: 'High-quality interactive tutorials by Matt Pocock covering generics, patterns, and real-world TypeScript.' },
      { title: 'freeCodeCamp — TypeScript Course', url: 'https://www.freecodecamp.org/news/typescript-course/', description: 'A structured project-based course walking through type annotations, interfaces, generics, and building applications.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'TypeScript — The Complete Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=30LWjhZzg50', description: 'Comprehensive multi-hour course covering everything from basic types to advanced patterns.' },
      { title: 'TypeScript for Beginners (Academind)', url: 'https://www.youtube.com/watch?v=BwuLxPH8IDs', description: 'A beginner-friendly walkthrough of TypeScript essentials with practical code-along examples.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Type Challenges — TypeScript Type Puzzles', url: 'https://github.com/type-challenges/type-challenges', description: 'Over 200 community-sourced type-level challenges from easy to extreme. The gold standard for mastering advanced types.' },
      { title: 'Exercism — TypeScript Track', url: 'https://exercism.org/tracks/typescript', description: '100+ coding exercises with automated analysis and optional human mentoring.' },
      { title: 'Codewars — TypeScript Kata', url: 'https://www.codewars.com/?language=typescript', description: 'Solve community-created challenges while getting typed feedback.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'TypeScript Cheatsheets (Official)', url: 'https://www.typescriptlang.org/cheatsheets/', description: 'Official one-page reference sheets for controls, interfaces, types, classes, and utility types.' },
      { title: 'TypeScript Utility Types', url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html', description: 'Complete reference for all built-in utility types: Partial, Pick, Omit, Record, ReturnType, and more.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'TypeScript Blog (Official)', url: 'https://devblogs.microsoft.com/typescript/', description: 'Official Microsoft blog with deep-dive release notes, roadmap posts, and feature previews.' },
      { title: 'TypeScript Weekly', url: 'https://typescript-weekly.com/', description: 'A curated weekly newsletter covering TypeScript articles, type challenges, and open-source tools.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/typescript', url: 'https://www.reddit.com/r/typescript/', description: 'The largest TypeScript community on Reddit for discussions, articles, and ecosystem news.' },
      { title: 'TypeScript Discord (Official)', url: 'https://discord.gg/typescript', description: 'The official TypeScript Discord server for community Q&A.' },
      { title: 'TypeScript GitHub Discussions', url: 'https://github.com/microsoft/TypeScript/discussions', description: 'Official GitHub discussions for feature requests, design proposals, and RFCs.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// JAVA
// ═══════════════════════════════════════════════════════════════════════

export const javaResources: LanguageResources = {
  slug: 'java',
  name: 'Java',
  description: 'Java is the bedrock of enterprise software. It powers Android apps, backend systems, big data pipelines (Apache Hadoop, Spark), and financial infrastructure worldwide. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Introduction to Programming Using Java (Javanotes)', url: 'https://math.hws.edu/javanotes/', description: 'A free comprehensive online textbook covering OOP, GUI applications, and data structures.' },
      { title: 'Java Language Specification (JLS)', url: 'https://docs.oracle.com/javase/specs/jls/se23/html/index.html', description: 'The definitive technical definition of Java from Oracle detailing syntax, types, and execution rules.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Dev.java — Official Oracle Learning Platform', url: 'https://dev.java/learn/', description: 'The definitive destination for modern Java developers with hundreds of tutorials covering everything from your first app to Virtual Threads.' },
      { title: 'The Java Tutorials (Oracle)', url: 'https://docs.oracle.com/javase/tutorial/', description: 'Practical guides covering language basics, collections, concurrency, I/O, networking, and GUI programming.' },
      { title: 'Java SE Documentation', url: 'https://docs.oracle.com/en/java/javase/', description: 'Complete API documentation, release notes, and migration guides for all Java SE versions.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Java Programming — University of Helsinki (MOOC.fi)', url: 'https://java-programming.mooc.fi/', description: 'Widely regarded as the best free Java course with rigorous auto-graded projects covering OOP, algorithms, and data structures.' },
      { title: 'freeCodeCamp — Java Course', url: 'https://www.freecodecamp.org/news/learn-java-programming/', description: 'A comprehensive free course covering Java fundamentals, OOP principles, exception handling, and generics.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Java Full Course for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=GoXwIVyNvX0', description: 'A multi-hour video tutorial covering Java from scratch: syntax, OOP, collections, file I/O, and multithreading.' },
      { title: 'Java Programming — Bro Code Full Course', url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo', description: 'A massive full-length course with clear, beginner-friendly explanations and hands-on coding examples.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Java Track', url: 'https://exercism.org/tracks/java', description: '100% free with 158+ coding exercises across 24 concepts. Includes automated code analysis and human mentorship.' },
      { title: 'HackerRank — Java Domain', url: 'https://www.hackerrank.com/domains/java', description: 'Practice Java-specific syntax, data structures, and algorithms tailored for coding interviews.' },
      { title: 'Codewars — Java Kata', url: 'https://www.codewars.com/', description: 'Solve community-created kata in Java across hundreds of difficulty levels.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Java Cheatsheet (devhints)', url: 'https://devhints.io/java', description: 'A concise one-page reference covering Java syntax, data types, control flow, OOP, and standard library classes.' },
      { title: 'Baeldung Java Guides', url: 'https://www.baeldung.com/', description: 'Extensive collection of practical Java tutorials covering Spring, Hibernate, core Java, and testing.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Java Weekly (Baeldung)', url: 'https://www.baeldung.com/tag/java-weekly/', description: 'A highly curated weekly roundup of technical deep dives, performance best practices, and release updates.' },
      { title: 'Inside Java (Oracle)', url: 'https://inside.java/', description: 'Direct updates and articles from the engineers building Java covering JDK enhancements and JEPs.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/java', url: 'https://www.reddit.com/r/java/', description: 'The primary discussion hub for enterprise Java news and ecosystem discussions.' },
      { title: 'Reddit r/learnjava', url: 'https://www.reddit.com/r/learnjava/', description: 'Dedicated beginner community for Java learners with Q&A and resource recommendations.' },
      { title: 'Java Discord Community', url: 'https://discord.com/invite/java-community-help-code-learn-648956210850299986', description: 'One of the largest active real-time Java communities for troubleshooting and peer learning.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// C++
// ═══════════════════════════════════════════════════════════════════════

export const cppResources: LanguageResources = {
  slug: 'cpp',
  name: 'C++',
  description: 'C++ is a systems programming language that gives you complete control over memory and hardware. It powers game engines, browsers (Chrome), operating systems, embedded devices, and high-frequency trading. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'LearnCpp.com', url: 'https://www.learncpp.com/', description: 'Universally recommended as the gold standard for learning modern C++ from scratch with step-by-step tutorials and quizzes.' },
      { title: 'C++ Core Guidelines', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines', description: 'Authored by Bjarne Stroustrup and Herb Sutter. The ultimate best-practices guide for modern C++.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'cppreference.com', url: 'https://cppreference.com/', description: 'The definitive exhaustive technical reference for the C++ language and Standard Library, updated for C++20/23/26.' },
      { title: 'isocpp.org', url: 'https://isocpp.org/', description: 'The central hub for standard C++ with FAQ, committee updates, and ISO standard announcements.' },
      { title: 'C++ Standard Proposals', url: 'https://isocpp.org/std/the-standard', description: 'Track the evolution of C++ through ISO committee papers and feature proposals.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'freeCodeCamp — 31-Hour C++ Course', url: 'https://www.freecodecamp.org/news/learn-c-with-free-31-hour-course/', description: 'A massive comprehensive deep-dive course covering everything from beginner through memory management, OOP, and C++20 features.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'C++ Programming Course (freeCodeCamp)', url: 'https://www.youtube.com/c/Freecodecamp', description: 'The 31-hour course on YouTube alongside focused crash courses on STL and templates.' },
      { title: 'C++ Weekly (Jason Turner)', url: 'https://www.youtube.com/@Lefticus1', description: 'Short bite-sized episodes focusing on modern C++ best practices and new features.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — C++ Track', url: 'https://exercism.org/tracks/cpp', description: '100 structured coding exercises across 19 concepts designed to teach idiomatic C++ with free human mentoring.' },
      { title: 'HackerRank — C++ Domain', url: 'https://www.hackerrank.com/domains/cpp', description: 'Drill specific subdomains like classes, inheritance, strings, and the STL.' },
      { title: 'Codewars — C++ Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges across hundreds of difficulty levels.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'C++ Core Guidelines', url: 'https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines', description: 'The ultimate cheatsheet for modern C++ best practices covering interfaces, resources, and concurrency.' },
      { title: 'C++ Cheatsheet (devhints)', url: 'https://devhints.io/cpp', description: 'A concise reference covering C++ syntax, data types, STL containers, and algorithms.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Standard C++ Blog (isocpp.org)', url: 'https://isocpp.org/blog', description: 'Official news tracking ISO committee trip reports, compiler releases, and standard proposals.' },
      { title: 'C++ Compiler Support', url: 'https://en.cppreference.com/w/cpp/compiler_support', description: 'Track compiler support for C++20/23/26 features across GCC, Clang, MSVC, and others.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/cpp', url: 'https://www.reddit.com/r/cpp/', description: 'The main global forum for C++ news, library announcements, and technical discussions.' },
      { title: 'Reddit r/cpp_questions', url: 'https://www.reddit.com/r/cpp_questions/', description: 'Dedicated to learners asking questions and seeking debugging help.' },
      { title: 'Stack Overflow — C++ Tag', url: 'https://stackoverflow.com/questions/tagged/c%2b%2b', description: 'The definitive Q&A forum for C++ from template metaprogramming to optimization.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// KOTLIN
// ═══════════════════════════════════════════════════════════════════════

export const kotlinResources: LanguageResources = {
  slug: 'kotlin',
  name: 'Kotlin',
  description: 'Kotlin is the modern JVM language that is now the primary language for Android development. It is concise, expressive, and fully interoperable with Java. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Kotlin in Action (Chapters Free)', url: 'https://livebook.manning.com/book/kotlin-in-action-second-edition/', description: 'The authoritative book on Kotlin by the language designers. Full text available via Manning liveBook with free preview chapters covering core language features.' },
      { title: 'Atomic Kotlin (Free Chapters)', url: 'https://www.atomickotlin.com/', description: 'A modern approach to learning Kotlin by Bruce Eckel and Svetlana Isakova. Free sample chapters with hands-on exercises.' },
      { title: 'Kotlin Docs - Idioms', url: 'https://kotlinlang.org/docs/idioms.html', description: 'A collection of idiomatic Kotlin patterns that teach the language through common use cases and best practices.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Kotlin Language Docs', url: 'https://kotlinlang.org/docs/home.html', description: 'The complete official documentation covering syntax, coroutines, multiplatform, and tooling.' },
      { title: 'Kotlin Playground', url: 'https://play.kotlinlang.org/', description: 'Interactive browser-based Kotlin sandbox. Write, compile, and share Kotlin code instantly.' },
      { title: 'Kotlin Standard Library Reference', url: 'https://kotlinlang.org/api/latest/jvm/stdlib/', description: 'Complete API reference for the Kotlin standard library with detailed documentation for every function and extension.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'JetBrains — Kotlin Basics Track', url: 'https://hyperskill.org/tracks/1', description: 'The official JetBrains interactive course covering Kotlin fundamentals, OOP, functional programming, and coroutines with hands-on exercises.' },
      { title: 'freeCodeCamp — Kotlin Course', url: 'https://www.freecodecamp.org/news/search/?query=kotlin', description: 'Free comprehensive Kotlin tutorials and courses covering Android development and backend programming.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Kotlin Course for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=F9UC9DY-vIU', description: 'A comprehensive multi-hour video course covering Kotlin from scratch to building real applications.' },
      { title: 'Android Basics with Compose (Google)', url: 'https://developer.android.com/courses/android-basics-compose/course', description: "Google's official free course teaching Kotlin and Jetpack Compose for Android app development." },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Kotlin Track', url: 'https://exercism.org/tracks/kotlin', description: '100+ free coding exercises with automated analysis and optional human mentoring.' },
      { title: 'Codewars — Kotlin Kata', url: 'https://www.codewars.com/?language=kotlin', description: 'Solve community-created challenges in Kotlin across hundreds of difficulty levels.' },
      { title: 'LeetCode — Kotlin Support', url: 'https://leetcode.com/', description: 'Practice data structures and algorithms using Kotlin for interview preparation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Kotlin Cheatsheet (devhints)', url: 'https://devhints.io/kotlin', description: 'A concise one-page reference covering Kotlin syntax, collections, lambdas, and coroutines.' },
      { title: 'Kotlin Style Guide', url: 'https://kotlinlang.org/docs/coding-conventions.html', description: 'Official coding conventions and style guide for writing idiomatic Kotlin code.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Kotlin Weekly', url: 'https://kotlinweekly.net/', description: 'A curated weekly newsletter covering Kotlin language updates, libraries, Android development, and community highlights.' },
      { title: 'Kotlin Blog (JetBrains)', url: 'https://blog.jetbrains.com/kotlin/', description: 'Official JetBrains blog with release announcements, feature previews, and deep dives into Kotlin language features.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/kotlin', url: 'https://www.reddit.com/r/kotlin/', description: 'The largest Kotlin community on Reddit for news, discussions, and showcase projects.' },
      { title: 'Kotlin Slack (Official)', url: 'https://slack.kotlinlang.org/', description: 'The official Kotlin Slack community with channels for beginners, multiplatform, coroutines, and library authors.' },
      { title: 'Kotlin Discord', url: 'https://discord.gg/kotlin', description: 'A real-time chat community of Kotlin developers for Q&A, code review, and project collaboration.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SWIFT
// ═══════════════════════════════════════════════════════════════════════

export const swiftResources: LanguageResources = {
  slug: 'swift',
  name: 'Swift',
  description: 'Swift is the modern language for Apple platforms — iOS, macOS, watchOS, and tvOS. It is fast, safe, and expressive, powering everything from the iPhone apps you love to server-side systems. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'The Swift Programming Language (Official)', url: 'https://docs.swift.org/swift-book/', description: 'The official Swift book by Apple covering the complete language from basics to advanced features like generics, protocols, and memory safety.' },
      { title: 'Hacking with Swift (Free Edition)', url: 'https://www.hackingwithswift.com/', description: 'A massive free collection of Swift tutorials, projects, and challenges by Paul Hudson. Covers SwiftUI, UIKit, and Swift itself.' },
      { title: 'Swift Apprentice (Kodeco)', url: 'https://www.kodeco.com/books', description: 'A free book for beginners learning Swift step-by-step with practical exercises and real-world examples.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'swift.org', url: 'https://www.swift.org/', description: 'The home of the Swift project — compiler, standard library, package manager, and community resources.' },
      { title: 'Apple Developer Documentation', url: 'https://developer.apple.com/swift/', description: "Apple's official Swift documentation with guides, API references, and Xcode integration resources." },
      { title: 'Swift Package Index', url: 'https://swiftpackageindex.com/', description: 'A searchable catalog of open-source Swift packages with documentation, code coverage, and compatibility badges.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Stanford CS193p — SwiftUI Course', url: 'https://cs193p.sites.stanford.edu/', description: "Stanford's famous iOS development course using SwiftUI. Available for free on YouTube with assignments and lecture slides." },
      { title: 'freeCodeCamp — iOS & Swift Course', url: 'https://www.freecodecamp.org/news/search/?query=swift', description: 'Comprehensive free Swift tutorials and iOS development courses ranging from basics to advanced SwiftUI.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Stanford CS193p — Developing Apps for iOS (YouTube)', url: 'https://www.youtube.com/playlist?list=PLpGHT1n4-mAsxuTxVPxb3S3WJpNjmhgFJ', description: 'Stanfords official iOS development course recorded live. The gold standard for learning Swift and SwiftUI.' },
      { title: 'Paul Hudson — Hacking with Swift Playlist', url: 'https://www.youtube.com/@twostraws', description: 'Over 1,000 free Swift tutorials on YouTubecovering Swift basics, SwiftUI, and practical iOS app development.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Swift Track', url: 'https://exercism.org/tracks/swift', description: '100+ free coding exercises designed to teach idiomatic Swift with automated analysis and optional mentoring.' },
      { title: 'Codewars — Swift Kata', url: 'https://www.codewars.com/?language=swift', description: 'Solve community-created challenges in Swift across hundreds of difficulty levels.' },
      { title: 'LeetCode — Swift Support', url: 'https://leetcode.com/', description: 'Practice algorithms and data structures using Swift for technical interview preparation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Swift Cheatsheet (devhints)', url: 'https://devhints.io/swift', description: 'A concise one-page reference covering Swift syntax, optionals, closures, and collection types.' },
      { title: 'Swift Evolution', url: 'https://apple.github.io/swift-evolution/', description: 'Track the evolution of Swift through accepted proposals, from initial pitch to final implementation.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Swift Weekly Brief', url: 'https://swiftweeklybrief.com/', description: 'A weekly newsletter summarizing Swift evolution updates, open-source contributions, and community discussions.' },
      { title: 'Swift.org Blog', url: 'https://www.swift.org/blog/', description: 'Official Swift.org blog with release announcements, community highlights, and language evolution updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/swift', url: 'https://www.reddit.com/r/swift/', description: 'The largest Swift community on Reddit for discussions, app showcases, and technical questions.' },
      { title: 'Swift Forums (Official)', url: 'https://forums.swift.org/', description: 'The official Swift server for language design discussions, evolution proposals, and community support.' },
      { title: 'Swift Discord', url: 'https://discord.gg/swift', description: 'Active real-time chat community for Swift developers with channels for iOS, server-side, and package development.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// RUBY
// ═══════════════════════════════════════════════════════════════════════

export const rubyResources: LanguageResources = {
  slug: 'ruby',
  name: 'Ruby',
  description: 'Ruby is a language of simplicity and productivity, famous for the Rails web framework. It prioritizes developer happiness and elegant code with a philosophy of convention over configuration. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: "Why's (Poignant) Guide to Ruby", url: 'https://poignant.guide/', description: 'A wildly creative comic-illustrated cult classic that introduces Ruby through storytelling and humor.' },
      { title: 'Learn Ruby the Hard Way', url: 'https://learnrubythehardway.org/book/', description: 'A classic problem-driven book taking beginners from absolute zero to writing basic Ruby through repetition and explicit exercises.' },
      { title: 'Ruby Essentials', url: 'https://www.techotopia.com/index.php/Ruby_Essentials', description: 'A concise step-by-step guide covering everything from installation to fundamentals of the Ruby language.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'ruby-lang.org Documentation', url: 'https://www.ruby-lang.org/en/documentation/', description: 'The central portal for official language guides, API references, and getting-started resources.' },
      { title: 'Ruby-Doc.org', url: 'https://ruby-doc.org/', description: 'The long-standing community-hosted API documentation for core classes and standard libraries.' },
      { title: 'RubyAPI.org', url: 'https://rubyapi.org/', description: 'A blazing-fast modern mobile-friendly interface for browsing Ruby classes, modules, and methods.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'The Odin Project — Full Stack Ruby on Rails', url: 'https://www.theodinproject.com/paths/full-stack-ruby-on-rails', description: "A world-class rigorous 100% free curriculum starting with Ruby fundamentals through OOP and into Rails." },
      { title: 'freeCodeCamp — Ruby Course', url: 'https://www.freecodecamp.org/news/search/?query=ruby', description: 'Free comprehensive Ruby tutorials and full courses covering everything from basics to Ruby on Rails.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Ruby Programming Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=R-PfZC3dugk', description: 'A multi-hour comprehensive video tutorial covering Ruby from scratch to professional proficiency.' },
      { title: 'Ruby on Rails Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=fZy2a3jfSsQ', description: 'Full Rails course covering MVC architecture, Active Record, routing, and deploying real applications.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Ruby Track', url: 'https://exercism.org/tracks/ruby', description: '121 community-sourced exercises with 100% free personal code mentoring from volunteer experts.' },
      { title: 'Codewars', url: 'https://www.codewars.com/', description: 'Solve community-crafted algorithmic challenges filtered by Ruby across hundreds of kata.' },
      { title: 'HackerRank — Ruby Domain', url: 'https://www.hackerrank.com/domains/ruby', description: 'Practice Ruby-specific challenges from basic control structures to advanced language paradigms.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'DevDocs Ruby Reference', url: 'https://devdocs.io/ruby/', description: 'A lightning-fast searchable aggregator containing comprehensive offline-friendly Ruby documentation.' },
      { title: 'Ruby Style Guide', url: 'https://rubystyle.guide/', description: 'The definitive community-agreed style guide enforced by RuboCop for writing idiomatic Ruby code.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Ruby Weekly', url: 'https://rubyweekly.com/', description: 'A free popular weekly email newsletter curating the best Ruby articles, updates, and tutorials since 2010.' },
      { title: 'Short Ruby Newsletter', url: 'https://newsletter.shortruby.com/', description: 'A concise Monday morning summary of community discussions, news, and releases from the Ruby world.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/ruby', url: 'https://www.reddit.com/r/ruby/', description: 'The primary community hub for Ruby discussions, troubleshooting, and news.' },
      { title: 'Ruby Discord', url: 'https://www.ruby-lang.org/en/community/', description: 'Real-time chat community to connect with fellow Ruby developers and get immediate help.' },
      { title: 'Ruby-Lang Community Page', url: 'https://www.ruby-lang.org/en/community/', description: 'The official listing of Ruby community resources including mailing lists, IRC channels, and user groups.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PHP
// ═══════════════════════════════════════════════════════════════════════

export const phpResources: LanguageResources = {
  slug: 'php',
  name: 'PHP',
  description: 'PHP powers over 75% of all websites, including WordPress, Laravel applications, and massive platforms like Facebook. It is the most accessible backend language with an unmatched ecosystem. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'PHP: The Right Way', url: 'https://phptherightway.com/', description: 'The de facto standard reference for modern PHP best practices, coding standards, and ecosystem recommendations.' },
      { title: 'PHP Manual', url: 'https://www.php.net/manual/en/', description: 'The complete PHP language reference and tutorial. The definitive source of truth for syntax, functions, and features.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'PHP.net Documentation', url: 'https://www.php.net/docs.php', description: 'The official PHP documentation with language reference, function listing, and getting-started guides.' },
      { title: 'PHP The Right Way Reference', url: 'https://phptherightway.com/', description: 'A community-driven reference covering modern PHP patterns, dependency management, testing, and security.' },
      { title: 'Laravel Documentation', url: 'https://laravel.com/docs', description: 'The comprehensive documentation for the Laravel framework — the most popular PHP web framework.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'freeCodeCamp — PHP Course', url: 'https://www.freecodecamp.org/news/search/?query=php', description: 'Free PHP tutorials and courses covering everything from basic syntax to building full web applications.' },
      { title: 'Laracasts — PHP Free Lessons', url: 'https://laracasts.com/', description: 'High-quality screencasts for PHP and Laravel development. Hundreds of free lessons available for beginners.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'PHP Programming Language Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=OK_JCtrrv-c', description: 'A multi-hour comprehensive video course covering PHP from fundamentals to database-driven web applications.' },
      { title: 'Laravel Tutorial for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=ImtZ5yENzgE', description: 'A full Laravel framework course covering MVC architecture, Eloquent ORM, blade templating, and deployment.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — PHP Track', url: 'https://exercism.org/tracks/php', description: '100+ free coding exercises with automated analysis and optional human mentoring for personalized feedback.' },
      { title: 'Codewars — PHP Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in PHP across hundreds of difficulty levels and topics.' },
      { title: 'HackerRank — PHP Domain', url: 'https://www.hackerrank.com/domains/php', description: 'Practice PHP-specific challenges covering basic syntax, functions, arrays, and advanced features.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'PHP Cheatsheet (devhints)', url: 'https://devhints.io/php', description: 'A concise one-page reference covering PHP syntax, arrays, functions, classes, and PDO database access.' },
      { title: 'PHP Type Comparison Table', url: 'https://www.php.net/manual/en/types.comparisons.php', description: 'Essential reference for understanding PHP type juggling, comparison behavior, and strict typing.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'PHP Weekly', url: 'https://www.phpweekly.com/', description: 'A free weekly newsletter covering PHP articles, frameworks, tools, and community news.' },
      { title: 'PHP.net Announcements', url: 'https://www.php.net/archive/', description: 'Official PHP.net release announcements, security advisories, and version update information.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/php', url: 'https://www.reddit.com/r/php/', description: 'The main community for PHP discussions, news, and project showcases.' },
      { title: 'PHP Discord', url: 'https://discord.com/invite/php', description: 'Active real-time chat community for PHP developers with channels for help, code review, and job discussions.' },
      { title: 'Stack Overflow — PHP Tag', url: 'https://stackoverflow.com/questions/tagged/php', description: 'The definitive Q&A forum for PHP troubleshooting, best practices, and debugging help.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// C#
// ═══════════════════════════════════════════════════════════════════════

export const csharpResources: LanguageResources = {
  slug: 'csharp',
  name: 'C#',
  description: 'C# is Microsofts flagship language for the .NET ecosystem. It powers Windows applications, game development (Unity), cloud services on Azure, and cross-platform apps. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Official C# Documentation Guide', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/', description: 'The modern living reference book built into the Microsoft ecosystem covering everything from basics to advanced features like records and pattern matching.' },
      { title: 'C# Programming Yellow Book (Rob Miles)', url: 'https://www.robmiles.com/c-yellow-book', description: 'A legendary friendly introductory textbook used in university CS courses. Free PDF download covering programming from first principles.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'C# Language Reference', url: 'https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/', description: 'The definitive source for C# syntax rules, compiler options, and language specifications from Microsoft.' },
      { title: '.NET API Browser', url: 'https://learn.microsoft.com/en-us/dotnet/api/', description: 'The complete reference library for all managed Microsoft namespaces, classes, methods, and structures.' },
      { title: 'Microsoft Learn C# Path', url: 'https://learn.microsoft.com/en-us/training/paths/get-started-c-sharp-part-1/', description: 'Interactive step-by-step browser modules taking you from absolute beginner to building functional apps.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Foundational C# with Microsoft (freeCodeCamp)', url: 'https://www.freecodecamp.org/learn/foundational-c-sharp-with-microsoft', description: 'A guided path in collaboration with Microsoft that culminates in foundational certification.' },
      { title: 'freeCodeCamp — C# Course', url: 'https://www.freecodecamp.org/news/search/?query=c%23', description: 'Free comprehensive C# tutorials and .NET courses covering everything from basics to ASP.NET Core.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'C# Full Course for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=GhQdlIFylQ8', description: 'A comprehensive multi-hour video tutorial covering core programming principles to advanced features like LINQ and async/await.' },
      { title: 'C# for Beginners (Microsoft Developer)', url: 'https://learn.microsoft.com/en-us/shows/csharp-for-beginners/', description: 'Hosted by Scott Hanselman and experts from the .NET team. The official Microsoft beginner series.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — C# Track', url: 'https://exercism.org/tracks/csharp', description: '178 free hands-on exercises with automated CLI tests and human mentors who review your idiomatic C# code.' },
      { title: 'Codewars — C# Katas', url: 'https://www.codewars.com/kata/search/csharp', description: 'Community-driven code challenges ranging from beginner to advanced in C#.' },
      { title: 'LeetCode — C# Support', url: 'https://leetcode.com/', description: 'Practice algorithms and data structures using C# for interview preparation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Modern C# Cheatsheet (GitHub)', url: 'https://github.com/milanm/csharp-cheatsheet', description: 'An exhaustive GitHub repository tracking modern syntax updates including LINQ, pattern matching, and records.' },
      { title: 'Zero to Mastery C# Cheat Sheet', url: 'https://zerotomastery.io/cheatsheets/csharp-cheat-sheet/', description: 'Quick-reference syntax reminders for variables, control flow, and OOP in C#.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'C# Digest', url: 'https://csharpdigest.net/', description: 'A weekly curated newsletter featuring handpicked .NET articles, libraries, tutorials, and community highlights.' },
      { title: 'Official .NET Blog', url: 'https://devblogs.microsoft.com/dotnet/', description: 'The primary source for new runtime announcements, preview releases, and performance deep dives from Microsoft.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/csharp', url: 'https://www.reddit.com/r/csharp/', description: 'The premier active community for .NET and C# discussions, career advice, and project showcases.' },
      { title: 'C# Discord Server', url: 'https://discord.com/invite/csharp', description: 'A massive real-time chat community for troubleshooting code and discussing software design.' },
      { title: 'Stack Overflow — C# Tag', url: 'https://stackoverflow.com/questions/tagged/c%23', description: 'The ultimate archive for troubleshooting bugs, syntax errors, and best practices in C#.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GO
// ═══════════════════════════════════════════════════════════════════════

export const goResources: LanguageResources = {
  slug: 'go',
  name: 'Go',
  description: 'Go is a statically typed, compiled language designed at Google for building simple, reliable, and efficient software at scale. It excels at backend services, microservices, APIs, and concurrent systems.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Learn Go with Tests', url: 'https://quii.gitbook.io/learn-go-with-tests', description: 'An exceptional open-source book that teaches Go fundamentals through Test-Driven Development.' },
      { title: 'Go by Example', url: 'https://gobyexample.com/', description: 'A hands-on introduction using annotated example programs. The fastest way to grasp Go syntax.' },
      { title: 'The Little Go Book', url: 'https://www.openmymind.net/The-Little-Go-Book/', description: 'A concise conceptual overview covering Go types, interfaces, concurrency, and tooling.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Go Documentation Hub', url: 'https://go.dev/doc/', description: 'Central home for all official tutorials, guides, references, and release notes.' },
      { title: 'Effective Go', url: 'https://go.dev/doc/effective_go', description: 'Essential reading for writing clear idiomatic Go code covering formatting, naming, and concurrency patterns.' },
      { title: 'Go Language Specification', url: 'https://go.dev/ref/spec', description: 'The ultimate source of truth detailing Go syntax, types, and operational behavior.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'A Tour of Go', url: 'https://go.dev/tour/', description: 'The official interactive tutorial by the Go team. Run code directly in your browser.' },
      { title: 'freeCodeCamp — Learn Golang Handbook', url: 'https://www.freecodecamp.org/news/learn-golang-handbook/', description: 'A comprehensive free handbook from beginner to building real-world backend applications.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Golang Tutorial for Beginners (Tech With Tim)', url: 'https://www.youtube.com/watch?v=jFfo2mHPpeY', description: 'A clean structured video deep-dive into writing production-ready Go scripts.' },
      { title: 'Anthony GG — Go Tutorials', url: 'https://www.youtube.com/@anthonygg', description: 'Practical Go tutorials focusing on web servers, REST APIs, and microservices.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Go Track', url: 'https://exercism.org/tracks/go', description: '100% free with 165+ coding exercises across 34 concepts with automated analysis.' },
      { title: 'Codewars — Go Kata', url: 'https://www.codewars.com/', description: 'Solve community-created kata in Go across hundreds of difficulty levels.' },
      { title: 'LeetCode — Go Support', url: 'https://leetcode.com/', description: 'Practice algorithms and data structures in Go for interview preparation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Go Cheat Sheet', url: 'https://golang.ch/cheatsheet/', description: 'Quick reference covering syntax, built-in types, error handling, goroutines, and channels.' },
      { title: 'Go Playground', url: 'https://go.dev/play/', description: 'Official online snippet runner to write, test, and share Go code in your browser.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Go Weekly', url: 'https://golangweekly.com/', description: 'A legendary free weekly newsletter tracking Go updates, libraries, and best practices.' },
      { title: 'Go Blog (Official)', url: 'https://go.dev/blog/', description: 'Official engineering blog detailing language releases and ecosystem tooling.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/golang', url: 'https://www.reddit.com/r/golang/', description: 'The premier community for Go news, discussions, and project architectures.' },
      { title: 'Go Forum', url: 'https://forum.golangbridge.org/', description: 'The official discussion board for learning help and project advice.' },
      { title: 'Gophers Slack', url: 'https://go.dev/help', description: 'Real-time chat with thousands of active Go developers.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// RUST
// ═══════════════════════════════════════════════════════════════════════

export const rustResources: LanguageResources = {
  slug: 'rust',
  name: 'Rust',
  description: 'Rust is a systems programming language focused on safety, speed, and concurrency without a garbage collector. It powers everything from embedded devices to cloud infrastructure.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'The Rust Programming Language (The Book)', url: 'https://doc.rust-lang.org/book/', description: 'The official introductory bible covering ownership, borrowing, lifetimes, traits, and concurrency.' },
      { title: 'Rust by Example', url: 'https://doc.rust-lang.org/rust-by-example/', description: 'Runnable code snippets illustrating Rust concepts and standard library features.' },
      { title: 'Comprehensive Rust (Google)', url: 'https://google.github.io/comprehensive-rust/', description: 'A multi-day course by Google covering Rust fundamentals, Android, and embedded systems.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Rust Documentation Hub', url: 'https://doc.rust-lang.org/', description: 'All official language docs, library specs, compiler guides, and edition notes.' },
      { title: 'The Rust Reference', url: 'https://doc.rust-lang.org/reference/', description: 'The formal specification of Rust syntax, grammar, semantics, and memory model.' },
      { title: 'The Rustonomicon', url: 'https://doc.rust-lang.org/nomicon/', description: 'The advanced guide exploring unsafe Rust, low-level memory, and FFI.' },
      { title: 'Rust Standard Library Docs', url: 'https://doc.rust-lang.org/std/', description: 'Deep API documentation for all built-in primitives, traits, and modules.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Rustlings', url: 'https://github.com/rust-lang/rustlings', description: 'Official CLI exercises by the Rust team. Fix broken programs to learn Rust.' },
      { title: 'Tour of Rust', url: 'https://tourofrust.com/', description: 'An interactive visual tour introducing basic to advanced Rust syntax.' },
      { title: 'freeCodeCamp — Rust Course', url: 'https://www.freecodecamp.org/news/learn-rust-for-beginners/', description: 'A project-based course covering foundational and intermediate Rust concepts.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: "Let's Get Rusty", url: 'https://www.youtube.com/@LetsGetRusty', description: 'The premier Rust education channel with deep dives into The Book and advanced patterns.' },
      { title: 'No Boilerplate', url: 'https://www.youtube.com/@NoBoilerplate', description: 'Crisp video essays on Rust, software reliability, and modern systems engineering.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Rust Track', url: 'https://exercism.org/tracks/rust', description: '99 free coding exercises designed to teach idiomatic Rust with mentoring.' },
      { title: 'Codewars — Rust Kata', url: 'https://www.codewars.com/collections/rust-collection', description: 'Community-created challenges solving data structures, algorithms, and lifetimes.' },
      { title: 'LeetCode — Rust Support', url: 'https://leetcode.com/tag/rust/', description: 'Solve algorithm challenges using Rusts memory model and type system.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Rust Language Cheat Sheet', url: 'https://cheats.rs/', description: 'An exhaustive single-page reference linking syntax symbols to the Book and Reference.' },
      { title: 'Rust Playground', url: 'https://play.rust-lang.org/', description: 'Official browser-based sandbox compiler to test code snippets and inspect assembly.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'This Week in Rust', url: 'https://this-week-in-rust.org/', description: 'The gold standard weekly newsletter tracking core changes, crate updates, and blog posts.' },
      { title: 'Official Rust Blog', url: 'https://blog.rust-lang.org/', description: 'Official announcements on new stable releases, edition changes, and security updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/rust', url: 'https://www.reddit.com/r/rust/', description: 'The largest Rust community for project showcases and ecosystem discussions.' },
      { title: 'Rust Users Forum', url: 'https://users.rust-lang.org/', description: 'Official discussion board for learning help and crate usage support.' },
      { title: 'Rust Discord Server', url: 'https://discord.com/invite/rust-lang', description: 'Live chat with channels for beginners, embedded systems, and async frameworks.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SCALA
// ═══════════════════════════════════════════════════════════════════════

export const scalaResources: LanguageResources = {
  slug: 'scala',
  name: 'Scala',
  description: 'Scala combines object-oriented and functional programming on the JVM. It powers high-performance data pipelines (Apache Spark), distributed systems (Akka), and type-safe web applications. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Creative Scala', url: 'https://creativescala.org/', description: 'A fantastic free beginner book by Dave Gurnell and Noel Welsh teaching functional programming through computer graphics and visual exercises.' },
      { title: 'Scala 3 Book (Official)', url: 'https://docs.scala-lang.org/scala3/book/introduction.html', description: 'The official Scala 3 book covering everything from the Tour of Scala to advanced functional patterns in the new syntax.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Official Scala Documentation Hub', url: 'https://docs.scala-lang.org/', description: 'Central entry point for all Scala guides — Scala 3 references, migration guides, and best practices.' },
      { title: 'Tour of Scala', url: 'https://docs.scala-lang.org/tour.html', description: 'Official interactive tour covering OOP, functional programming, pattern matching, and type system features.' },
      { title: 'Scala 3 Reference', url: 'https://docs.scala-lang.org/scala3/reference/overview.html', description: 'Technical specification for Scala 3 context parameters, match types, enums, and metaprogramming.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Scala Exercises', url: 'https://www.scala-exercises.org/', description: 'Interactive platform to practice standard library features, functional programming, and libraries like Cats directly in the browser.' },
      { title: 'LearnScala.org', url: 'https://www.learnscala.org/', description: 'A completely free browser-based interactive tutorial covering variables, types, functions, and collections.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Rock the JVM — Scala at Light Speed', url: 'https://rockthejvm.com/', description: 'A fast-track free video course covering modern Scala 3 for experienced programmers by Daniel Ciocîrlan.' },
      { title: 'DevInsideYou YouTube Channel', url: 'https://www.youtube.com/@DevInsideYou', description: 'Hundreds of free Scala screencasts, live coding sessions, and architecture tutorials covering Scala 3.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Scala Track', url: 'https://exercism.org/tracks/scala', description: 'Mentor-backed code reviews with structured exercises using standard build tools.' },
      { title: 'Codewars — Scala Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in Scala across hundreds of difficulty levels.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Visual Scala Reference', url: 'https://www.visual-scala.cs.illinois.edu/', description: 'A phenomenal visual guide mapping out common methods of the Scala Collections API.' },
      { title: 'Scala 3 Cheatsheet (devhints)', url: 'https://devhints.io/scala', description: 'A concise reference covering Scala 3 syntax, types, collections, and functional patterns.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Scala Times', url: 'https://scalatimes.com/', description: 'A free weekly newsletter curated by SoftwareMill covering Scala news, libraries, and conferences.' },
      { title: 'This Week in Scala', url: 'https://thisweekinscala.substack.com/', description: 'A regular digest tracking new tutorials, GitHub releases, and community proposals.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Scala Users Discourse', url: 'https://users.scala-lang.org/', description: 'Official forum where language designers, maintainers, and learners discuss features and troubleshooting.' },
      { title: 'Scala Discord', url: 'https://discord.gg/scala', description: 'Active real-time chat for getting help with compiler errors, sbt configs, and idiomatic Scala.' },
      { title: 'Reddit r/scala', url: 'https://www.reddit.com/r/scala/', description: 'Community hub for discussions, library announcements, and Scala news.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// R
// ═══════════════════════════════════════════════════════════════════════

export const rResources: LanguageResources = {
  slug: 'r',
  name: 'R',
  description: 'R is the definitive language for statistical computing, data analysis, and visualization. It powers academic research, data science, and machine learning workflows worldwide. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'R for Data Science (2nd Edition)', url: 'https://r4ds.hadley.nz/', description: 'The gold standard for starting R. Teaches importing, tidying, transforming, visualizing, and modeling data using modern tidyverse workflows.' },
      { title: 'Advanced R (2nd Edition)', url: 'https://adv-r.hadley.nz/', description: 'The definitive text for intermediate-to-advanced R — functional programming, metaprogramming, and performance optimization.' },
      { title: 'An Introduction to Statistical Learning (ISLR)', url: 'https://www.statlearning.com/', description: 'A classic machine learning textbook available as free PDF with practical R labs in every chapter.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'CRAN R Manuals', url: 'https://cran.r-project.org/manuals.html', description: 'The official reference library maintained by the R Core Team covering language specs, data import/export, and extensions.' },
      { title: 'Tidyverse Documentation', url: 'https://tidyverse.org/', description: 'Comprehensive docs for dplyr, ggplot2, tidyr, readr, and more with practical vignettes.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Swirl Stats', url: 'https://swirlstats.com/', description: 'An interactive R package that teaches R syntax from inside the R console with immediate feedback.' },
      { title: 'Kaggle Learn — R Micro-Course', url: 'https://www.kaggle.com/learn/r', description: 'Interactive in-browser course teaching basic data manipulation and visualization with instant code execution.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Stanford — Statistical Learning with R', url: 'https://www.statlearning.com/', description: 'Taught by Hastie and Tibshirani, this free video companion walks through ML theory with applied R coding labs.' },
      { title: 'StatQuest with Josh Starmer (YouTube)', url: 'https://www.youtube.com/@statquest', description: 'Builds intuitive mathematical frameworks for statistics and ML concepts needed for effective R analysis code.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — R Track', url: 'https://exercism.org/tracks/r', description: 'Progressive coding exercises with human mentor feedback from experienced R programmers.' },
      { title: 'TidyTuesday (GitHub)', url: 'https://github.com/rfordatascience/tidytuesday', description: 'Weekly social data project with new datasets for analysis, visualization, and building a public portfolio.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Posit Cheatsheets', url: 'https://posit.co/resources/cheatsheets/', description: 'Beautiful visual quick-reference guides for ggplot2, dplyr, tidyr, R Markdown, and Quarto.' },
      { title: 'R Reference Card', url: 'https://cran.r-project.org/doc/contrib/Short-refcard.pdf', description: 'A compact two-page reference for base R syntax, data types, and common functions.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'R-bloggers', url: 'https://www.r-bloggers.com/', description: 'The premier aggregator for R tutorials, package releases, and workflow tips.' },
      { title: 'R Weekly', url: 'https://rweekly.org/', description: 'A community-curated weekly newsletter delivering the best new R tutorials, packages, and events.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/rstats', url: 'https://www.reddit.com/r/rstats/', description: 'The most active forum for discussing R programming, updates, and career advice.' },
      { title: 'Stack Overflow — R Tag', url: 'https://stackoverflow.com/questions/tagged/r', description: 'Definitive Q&A for R troubleshooting, data wrangling, and statistical analysis.' },
      { title: 'RStudio Community', url: 'https://community.rstudio.com/', description: 'Official Posit community forum for tidyverse questions, Shiny apps, and best practices.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// DART
// ═══════════════════════════════════════════════════════════════════════

export const dartResources: LanguageResources = {
  slug: 'dart',
  name: 'Dart',
  description: 'Dart is the language behind Flutter, Googles cross-platform UI framework. It is optimized for building fast mobile, web, and desktop apps with a single codebase. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Dart Language Tour (Official)', url: 'https://dart.dev/language', description: 'The official introduction to Dart covering variables, types, functions, collections, async, and modern Dart 3 features.' },
      { title: 'Flutter Learn Pathway', url: 'https://docs.flutter.dev/learn', description: 'Google official starting point teaching Dart and Flutter from setup to building functional cross-platform apps.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Dart Documentation', url: 'https://dart.dev/guides', description: 'Complete official Dart documentation covering library tour, language evolution, and tooling.' },
      { title: 'Flutter Codelabs', url: 'https://docs.flutter.dev/codelabs', description: 'Hands-on step-by-step tutorials by Google engineers teaching UI, state management, and clean architecture.' },
      { title: 'DartPad', url: 'https://dartpad.dev/', description: 'Google official zero-setup online sandbox to write and execute Dart and Flutter code in-browser.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Hello Dart (Code Makery)', url: 'https://code.makery.ch/', description: 'A playful interactive tutorial teaching Dart fundamentals through visual quests and coding challenges.' },
      { title: 'Google Codelab — Dart Patterns & Records', url: 'https://codelabs.developers.google.com/codelabs/dart-patterns-records', description: 'Official hands-on guide teaching Dart 3 features — records, pattern matching, destructuring, and switch expressions.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Flutter Course for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=V3cFlraeiVI', description: 'Massive full-length video taking beginners from zero to publishing on Google Play and App Store.' },
      { title: 'Flutter & Firebase Full Stack Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=2kjp9yAKpT4', description: 'Project-based course covering responsive UI, authentication, database management, and social features.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Dart Track', url: 'https://exercism.org/tracks/dart', description: '100+ coding exercises with automated analysis and human mentor feedback for writing idiomatic Dart.' },
      { title: 'Codewars — Dart Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in Dart across hundreds of difficulty levels.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Dart Quick Reference (QuickRef)', url: 'https://quickref.me/dart.html', description: 'Clean comprehensive cheat sheet covering variables, types, collections, OOP, futures, and async/await.' },
      { title: 'Dart API Reference', url: 'https://api.dart.dev/', description: 'Complete API documentation for the Dart SDK with all core libraries and packages.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Flutter & Dart Announcements', url: 'https://medium.com/flutter', description: 'Official Flutter blog covering releases, breaking changes, and ecosystem news.' },
      { title: 'This Week in Flutter', url: 'https://thisweekinflutter.com/', description: 'Weekly curated roundup of Flutter and Dart news, packages, and community highlights.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/FlutterDev', url: 'https://www.reddit.com/r/FlutterDev/', description: 'The largest Flutter and Dart community for architecture advice, troubleshooting, and package showcases.' },
      { title: 'Flutter Discord', url: 'https://discord.gg/rflutterdev', description: 'Active real-time chat with 70k+ members for help channels, project feedback, and job discussions.' },
      { title: 'Dart & Flutter Dev (Official)', url: 'https://dart.dev/community', description: 'Official Dart community page listing groups, events, and contribution guidelines.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ELIXIR
// ═══════════════════════════════════════════════════════════════════════

export const elixirResources: LanguageResources = {
  slug: 'elixir',
  name: 'Elixir',
  description: 'Elixir is a functional, concurrent language built on the Erlang VM (BEAM). It excels at building fault-tolerant, distributed systems with the Phoenix web framework and LiveView for real-time apps. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Elixir School', url: 'https://elixirschool.com/', description: 'The unofficial community guide with lessons from basic syntax to advanced topics like Ecto, Phoenix, OTP, and LiveView. Translated in 25+ languages.' },
      { title: 'Learn Elixir (dwyl GitHub)', url: 'https://github.com/dwyl/learn-elixir', description: 'An open-source bootcamp-style repository teaching why Elixir matters, setup, syntax, and building production web apps.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Elixir Getting Started Guide', url: 'https://elixir-lang.org/getting-started/introduction.html', description: 'The definitive introduction by language creators covering syntax, pattern matching, mix, and OTP.' },
      { title: 'Elixir Official Learning Page', url: 'https://elixir-lang.org/learning.html', description: 'The centralized portal listing approved community books, courses, screencasts, and learning pathways.' },
      { title: 'HexDocs — Elixir Standard Library', url: 'https://hexdocs.pm/elixir/', description: 'Complete API documentation for the Elixir standard library with detailed module references.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — Elixir Track', url: 'https://exercism.org/tracks/elixir', description: '58 concepts and 168 exercises with community mentoring for writing idiomatic Elixir.' },
      { title: 'Learn Elixir with Livebook', url: 'https://github.com/dwyl/learn-elixir-with-livebook', description: 'Hands-on guide using Livebook, Elixirs interactive notebook ecosystem, for interactive learning.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Elixir & Phoenix Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=Rwwz5M5w3Is', description: 'A comprehensive video course covering Elixir fundamentals through building real applications with Phoenix.' },
      { title: 'ElixirConf Talks (YouTube)', url: 'https://www.youtube.com/@elixirconf', description: 'Conference talks from Elixir core contributors and industry leaders on distributed systems and LiveView.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Elixir Track', url: 'https://exercism.org/tracks/elixir', description: '100% free coding exercises with community mentoring and automated analysis.' },
      { title: 'Codewars — Elixir Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in Elixir across hundreds of difficulty levels.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Elixir Cheatsheet (devhints)', url: 'https://devhints.io/elixir', description: 'A concise one-page reference covering Elixir syntax, types, pipes, and pattern matching.' },
      { title: 'Elixir ExDoc Cheatsheets', url: 'https://elixir-lang.org/blog/2022/12/22/cheatsheets-and-8-other-features-in-exdoc/', description: 'Integrated cheat sheet features across Elixir library documentation for quick function lookups.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Elixir Radar Newsletter', url: 'https://elixir-radar.com/', description: 'Weekly curated newsletter with ecosystem news, community packages, tutorials, and job opportunities.' },
      { title: 'Elixir Lang Blog', url: 'https://elixir-lang.org/blog/', description: 'Official blog with release announcements, community stories, and language evolution updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Elixir Forum', url: 'https://elixirforum.com/', description: 'The official community forum with Q&A, Phoenix/LiveView release notes, and event discussions.' },
      { title: 'Reddit r/elixir', url: 'https://www.reddit.com/r/elixir/', description: 'Active community for career questions, blog posts, code reviews, and ecosystem trend discussions.' },
      { title: 'Elixir Slack', url: 'https://elixir-slack.com/', description: 'Real-time chat with dedicated channels for beginners, Phoenix, and OTP.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// HASKELL
// ═══════════════════════════════════════════════════════════════════════

export const haskellResources: LanguageResources = {
  slug: 'haskell',
  name: 'Haskell',
  description: 'Haskell is a purely functional programming language with strong static typing and lazy evaluation. It provides an unparalleled foundation for writing correct, composable, and concurrent software. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Learn You a Haskell for Great Good!', url: 'https://learnyouahaskell.github.io/introduction.html', description: 'The iconic beginner-friendly classic teaching functional programming from basic syntax to monads with a humorous, illustrated approach.' },
      { title: 'Haskell Programming from First Principles', url: 'https://haskellbook.com/', description: 'The most thorough book for mastering Haskell from scratch. Free chapters and community solutions available via GitHub.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Haskell.org Documentation Hub', url: 'https://www.haskell.org/documentation/', description: 'Central hub for official guides, the Haskell Report, language standards, and library documentation via Hackage.' },
      { title: 'Hackage — Haskell Package Repository', url: 'https://hackage.haskell.org/', description: 'Central package repository with complete API documentation for thousands of Haskell libraries.' },
      { title: 'GHC Users Guide', url: 'https://downloads.haskell.org/ghc/latest/docs/users_guide/', description: 'Complete documentation for the Glasgow Haskell Compiler covering language extensions, optimization, and profiling.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Haskell MOOC (University of Helsinki)', url: 'https://haskell.mooc.fi/', description: 'A premier free interactive course split into two parts covering from basics to algebraic data types and monads.' },
      { title: 'Type Classes Free Crash Courses', url: 'https://typeclasses.com/', description: 'Professional-grade visual courses and free introductory tracks tailored for programmers entering the Haskell ecosystem.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Haskell for Imperative Programmers (YouTube)', url: 'https://www.youtube.com/playlist?list=PLe7Ei6viL6jGp1Rfu0dCS1KeEZLSS8rsn', description: 'A comprehensive video series teaching Haskell from an imperative programming background with clear explanations.' },
      { title: 'Tsoding — Haskell Live Coding', url: 'https://www.youtube.com/@Tsoding', description: 'Live coding sessions exploring Haskell, functional design patterns, and real-world applications.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Haskell Track', url: 'https://exercism.org/tracks/haskell', description: '107 free exercises with community volunteer mentors who review your code for idiomatic functional style.' },
      { title: 'Codewars — Haskell Kata', url: 'https://www.codewars.com/kata/search/haskell', description: 'Over 2,100 community-driven coding katas from beginner to advanced algorithms.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Haskell Cheatsheet (GitHub)', url: 'https://github.com/alhassy/HaskellCheatSheet', description: 'Comprehensive reference sheet with syntax, keywords, operators, pattern matching, and type declarations.' },
      { title: 'Hoogle — Haskell API Search', url: 'https://hoogle.haskell.org/', description: 'Search Haskell functions by name or type signature. Find standard library and package functions instantly.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Haskell Weekly', url: 'https://haskellweekly.news/', description: 'Weekly curated newsletter and podcast covering library releases, blog posts, tutorials, and success stories.' },
      { title: 'GHC Release Notes', url: 'https://www.haskell.org/ghc/', description: 'Track GHC compiler releases, language extension proposals, and performance improvements.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Haskell Discourse', url: 'https://discourse.haskell.org/', description: 'Official community forum with a dedicated learning category for beginners to ask questions and get help.' },
      { title: 'Reddit r/haskell', url: 'https://www.reddit.com/r/haskell/', description: 'Vibrant community sharing announcements, blog posts, project showcases, and deep FP discussions.' },
      { title: 'Haskell.org Community', url: 'https://www.haskell.org/community/', description: 'Official community page listing user groups, IRC channels, mailing lists, and global Haskell events.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// LUA
// ═══════════════════════════════════════════════════════════════════════

export const luaResources: LanguageResources = {
  slug: 'lua',
  name: 'Lua',
  description: 'Lua is a lightweight, embeddable scripting language prized for its speed, simplicity, and tiny footprint. It powers game engines (Roblox, Love2D), embedded systems, and configuration in Neovim and Redis. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Programming in Lua (First Edition)', url: 'https://www.lua.org/pil/contents.html', description: 'Written by Lua architect Roberto Ierusalimschy. The authoritative free introduction covering core data structures, syntax, and fundamentals.' },
      { title: 'Lua Reference Manual', url: 'https://www.lua.org/manual/', description: 'The canonical definition of the Lua language, syntax, standard libraries, and C API for all versions.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Lua.org Documentation Hub', url: 'https://www.lua.org/docs.html', description: 'Central landing page with installation instructions, technical papers, and VM/garbage collector explanations.' },
      { title: 'Lua News', url: 'https://www.lua.org/news.html', description: 'Official project announcements tracking major milestones, foundation changes, and release updates.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — Lua Track', url: 'https://exercism.org/tracks/lua', description: '117 coding exercises with automatic analysis and optional mentoring from volunteer Lua developers.' },
      { title: 'Codédex Lua Course', url: 'https://www.codedex.io/lua', description: 'Modern interactive course with emphasis on game development and scripting in Roblox Studio.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Lua Programming Crash Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=zi-svfdcUc8', description: 'A comprehensive zero-to-hero video walkthrough for absolute beginners covering variables, control structures, and embedding.' },
      { title: 'Love2D Game Development (YouTube)', url: 'https://www.youtube.com/watch?v=EchBsCedz6k', description: 'Intermediate-level projects building 2D games from scratch using the LÖVE framework and Lua.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Lua Track', url: 'https://exercism.org/tracks/lua', description: '100% free coding exercises from simple string manipulation to complex table-based algorithms.' },
      { title: 'Codewars — Lua Kata', url: 'https://www.codewars.com/', description: 'Solve community-created coding challenges in Lua across hundreds of difficulty levels.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'DevHints Lua Cheatsheet', url: 'https://devhints.io/lua', description: 'A clean single-page reference covering syntax, loops, tables, metatables, closures, and standard API.' },
      { title: 'Lua 5.4 Reference Manual', url: 'https://www.lua.org/manual/5.4/', description: 'The complete language and standard library reference for the latest Lua version.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Lua.org News Page', url: 'https://www.lua.org/news.html', description: 'Official announcements from the Lua team on release updates, security patches, and version changes.' },
      { title: 'r/lua on Reddit', url: 'https://www.reddit.com/r/lua/', description: 'Community hub for news, project demos, and tooling discussions including Neovim configs and game engines.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/lua', url: 'https://www.reddit.com/r/lua/', description: 'The premier community for Lua developers to share news, projects, and troubleshooting help.' },
      { title: 'Lua Mailing List (lua-l)', url: 'https://groups.google.com/g/lua-l/', description: 'Official mailing list where language creators discuss compiler updates, performance, and proposals.' },
      { title: 'Stack Overflow — Lua Tag', url: 'https://stackoverflow.com/questions/tagged/lua', description: 'Definitive Q&A for Lua troubleshooting, table operations, and C API integration.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SHELL / BASH
// ═══════════════════════════════════════════════════════════════════════

export const shellResources: LanguageResources = {
  slug: 'shell',
  name: 'Shell',
  description: 'Shell scripting (Bash) is the universal glue of software engineering. It automates deployments, manages infrastructure, processes data pipelines, and controls the entire development toolchain. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'The Linux Command Line (William Shotts)', url: 'https://linuxcommand.org/tlcl.php', description: 'A comprehensive guide from basic keystrokes through advanced multi-file Bash shell scripts. Free PDF download.' },
      { title: 'Gregs Wiki — BashGuide', url: 'https://mywiki.wooledge.org/BashGuide', description: 'Considered the gold standard for learning proper Bash scripting with modern syntax, best practices, and anti-pattern avoidance.' },
      { title: 'Advanced Bash-Scripting Guide (TLDP)', url: 'https://tldp.org/LDP/abs/html/', description: 'The definitive deep-dive textbook for intermediate-to-advanced scripters covering complex data manipulation and system administration.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'GNU Bash Reference Manual', url: 'https://www.gnu.org/software/bash/manual/bash.html', description: 'The ultimate source of truth for Bash syntax, expansions, redirections, builtins, and parameter transformations.' },
      { title: 'ShellCheck — Static Analysis Tool', url: 'https://www.shellcheck.net/', description: 'Indispensable real-time linter identifying syntax errors, quoting mistakes, and subtle bugs in Bash scripts.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn Shell (Interactive)', url: 'https://www.learnshell.org/', description: 'Free browser-based tutorial covering basic string operations, arrays, loops, conditionals, sed, and awk.' },
      { title: 'Codecademy — Linux & Bash Scripting', url: 'https://www.codecademy.com/catalog/language/bash', description: 'Free interactive tracks teaching file system navigation and automated workflows using shell scripts.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Complete Bash Scripting Course (YouTube)', url: 'https://www.youtube.com/watch?v=Sx9zG7wa4FA', description: 'A comprehensive full-length guide from beginner concepts to advanced production-grade Bash programming.' },
      { title: 'Bash Scripting Tutorials (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=e7BufAVwDiM', description: 'Hands-on video tutorials covering Bash fundamentals, automation scripts, and system administration tasks.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Bash Track', url: 'https://exercism.org/tracks/bash', description: 'Coding exercises with automated analysis and human mentor feedback for writing robust shell scripts.' },
      { title: 'Cmdchallenge', url: 'https://cmdchallenge.com/', description: 'A collection of shell challenges that test your ability to navigate and manipulate filesystems using CLI commands.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Devhints Bash Cheatsheet', url: 'https://devhints.io/bash', description: 'The ultimate one-page reference for variables, strict modes, parameter expansions, string manipulation, and arrays.' },
      { title: 'ExplainShell.com', url: 'https://explainshell.com/', description: 'Write any shell command and get an instant breakdown of every flag, argument, and operator in plain english.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'GNU Bash News', url: 'https://lists.gnu.org/archive/html/bug-bash/', description: 'Official Bash mailing list tracking development, patches, and new feature announcements.' },
      { title: 'Reddit r/bash', url: 'https://www.reddit.com/r/bash/', description: 'Active community for scripting discussions, best-practice sharing, and troubleshooting.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/bash', url: 'https://www.reddit.com/r/bash/', description: 'Active technical community focused on Bash scripting, troubleshooting, and code reviews.' },
      { title: 'Unix & Linux Stack Exchange', url: 'https://unix.stackexchange.com/', description: 'Premier Q&A for deep architectural inquiries, complex pipeline problems, and shell-specific nuances.' },
      { title: 'Stack Overflow — Bash Tag', url: 'https://stackoverflow.com/questions/tagged/bash', description: 'Definitive forum for debugging shell scripts, quoting issues, and scripting best practices.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// C
// ═══════════════════════════════════════════════════════════════════════

export const cResources: LanguageResources = {
  slug: 'c',
  name: 'C',
  description: 'C is the foundational systems programming language that powers operating systems, embedded devices, databases, and virtually every major software infrastructure. These are the definitive free resources — vetted, current, and complete.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: "Beej's Guide to C Programming", url: 'https://beej.us/guide/bgc/', description: 'One of the most praised free guides — walks through basic syntax to memory management, pointers, and structs with clear modern examples.' },
      { title: 'Modern C (Jens Gustedt)', url: 'https://inria.hal.science/hal-02383654v2/file/modernC.pdf', description: 'Teaches C as written today — incorporating C11/C17/C23 modern standards rather than outdated 1980s styles. Free PDF.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'cppreference C Documentation', url: 'https://en.cppreference.com/w/c', description: 'The best technical reference for C language and standard library, documenting features across C89, C99, C11, C17, and C23.' },
      { title: 'C23 Working Draft (N3220)', url: 'https://www.open-std.org/jtc1/sc22/wg14/www/docs/n3220.pdf', description: 'The official WG14 working draft representing the C23 standard with new features like nullptr and #embed.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn-C.org', url: 'https://www.learn-c.org/', description: 'Free interactive tutorial covering everything from basic loops to advanced pointers and binary trees — no compiler needed.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'C Programming Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', description: 'Massively popular multi-hour beginner-friendly walkthrough covering all core C concepts step-by-step.' },
      { title: 'C Programming & OOP (Dr. Chuck)', url: 'https://www.youtube.com/watch?v=PaPN51Mm5qQ', description: 'Deep-dive covering computer architecture, low-level mechanics, and classic K&R C teachings.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — C Track', url: 'https://exercism.org/tracks/c', description: '84 free coding exercises with 100% free human mentoring from volunteer experts.' },
      { title: 'Codewars — C Collection', url: 'https://www.codewars.com/collections/c-programming-language', description: 'Gamified community-filtered kata for C problem-solving and bit manipulation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Cppreference C Reference', url: 'https://en.cppreference.com/w/c', description: 'The definitive up-to-date language and standard library reference for all C versions.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'ISO C Standards Updates', url: 'https://www.iso-9899.info/wiki/The_Standard', description: 'Community hub tracking all C standard iterations with latest working drafts.' },
      { title: 'Reddit r/C_Programming', url: 'https://www.reddit.com/r/C_Programming/', description: 'Premier community for C news, discussions, and modern C development topics.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/C_Programming', url: 'https://www.reddit.com/r/C_Programming/', description: 'Active community for debugging help, tutorials, and modern C development discussions.' },
      { title: 'Stack Overflow — C Tag', url: 'https://stackoverflow.com/questions/tagged/c', description: 'Definitive Q&A for C troubleshooting, pointer issues, and low-level debugging.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// MATLAB
// ═══════════════════════════════════════════════════════════════════════

export const matlabResources: LanguageResources = {
  slug: 'matlab',
  name: 'MATLAB',
  description: 'MATLAB is the premier platform for numerical computing, data analysis, and algorithm development. It is widely used in engineering, science, and research for matrix operations, signal processing, and control systems.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'MATLAB Programming Fundamentals (MathWorks)', url: 'https://www.mathworks.com/help/pdf_doc/matlab/matlab_prog.pdf', description: 'Official MathWorks tutorial covering MATLAB fundamentals, data types, matrix operations, and scripting.' },
      { title: 'MATLAB: An Introduction (Free E-Book)', url: 'https://en.wikibooks.org/wiki/MATLAB_Programming', description: 'A comprehensive open WikiBook covering MATLAB from basics to advanced programming concepts.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'MathWorks Documentation Center', url: 'https://www.mathworks.com/help/matlab/', description: 'Complete official documentation for MATLAB functions, toolboxes, and language features.' },
      { title: 'MATLAB Getting Started Guide', url: 'https://www.mathworks.com/help/pdf_doc/matlab/getstart.pdf', description: 'Official MathWorks guide for new users covering the MATLAB environment.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'MATLAB Onramp (MathWorks)', url: 'https://matlabacademy.mathworks.com/', description: 'Free interactive self-paced course from MathWorks teaching MATLAB fundamentals in-browser.' },
      { title: 'MATLAB Cody', url: 'https://www.mathworks.com/matlabcentral/cody/', description: 'Community-driven problem-solving platform to practice MATLAB by solving challenges.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'MATLAB Tutorial for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=KJgsSFOSQv0', description: 'Comprehensive video introduction to MATLAB programming for scientific computing.' },
      { title: 'MIT 18.S997 MATLAB Course', url: 'https://ocw.mit.edu/', description: 'MIT OpenCourseWare offers MATLAB-based computational science courses.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'MATLAB Cody', url: 'https://www.mathworks.com/matlabcentral/cody/', description: 'Solve community-created challenges and earn reputation points.' },
      { title: 'Project Euler (MATLAB)', url: 'https://projecteuler.net/', description: 'Solve mathematical problems using MATLAB — great for practicing array operations.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'MATLAB Cheatsheet', url: 'https://www.mathworks.com/help/pdf_doc/matlab/matlab_cheatsheet.pdf', description: 'Official MathWorks reference sheet for common commands and syntax.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'MATLAB Central Blog', url: 'https://blogs.mathworks.com/', description: 'Official MathWorks blog covering new features, tips, and community highlights.' },
      { title: 'MATLAB Digest', url: 'https://www.mathworks.com/company/newsletters.html', description: 'Technical articles and application case studies from MathWorks.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'MATLAB Central', url: 'https://www.mathworks.com/matlabcentral/', description: 'Official community with file exchange, answers forum, and code sharing.' },
      { title: 'Reddit r/matlab', url: 'https://www.reddit.com/r/matlab/', description: 'Active community for MATLAB questions, tips, and project showcases.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// JULIA
// ═══════════════════════════════════════════════════════════════════════

export const juliaResources: LanguageResources = {
  slug: 'julia',
  name: 'Julia',
  description: 'Julia is a high-performance, dynamically typed language designed for scientific computing, numerical analysis, and machine learning. It combines the speed of C with the ease of Python.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Think Julia', url: 'https://benlauwens.github.io/ThinkJulia.jl/latest/book.html', description: 'An exceptional beginner-friendly book adapted from the famous Think Python series for learning Julia.' },
      { title: 'Julia Data Science', url: 'https://juliadatascience.io/', description: 'A free online book teaching data manipulation, DataFrames.jl, and visualization with Makie.jl.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Julia Documentation & Getting Started', url: 'https://docs.julialang.org/', description: 'The definitive manual covering syntax, standard library, and advanced features.' },
      { title: 'Julia Learning Portal', url: 'https://julialang.org/learning/', description: 'Official curated portal with video courses, books, interactive notebooks, and classroom resources.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'MIT 18.S191 — Computational Thinking', url: 'https://computationalthinking.mit.edu/', description: 'Famous free course by Julia co-creator Prof. Alan Edelman and Grant Sanderson using Pluto.jl notebooks.' },
      { title: 'Exercism — Julia Track', url: 'https://exercism.org/tracks/julia', description: '34 concept modules and 120+ practice exercises with automated analysis and mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Julia for Absolute Beginners (doggo.jl)', url: 'https://www.youtube.com/@doggodotjl', description: 'YouTube series taking beginners from setup to advanced topics like multiple dispatch.' },
      { title: 'Stanford Julia Bootcamp', url: 'https://www.youtube.com/', description: 'Practical video course using Jupyter notebooks covering fundamentals, parallelization, and performance.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Julia Track', url: 'https://exercism.org/tracks/julia', description: '100% free coding exercises with community mentorship.' },
      { title: 'Project Euler (Julia)', url: 'https://projecteuler.net/', description: 'Classic mathematical programming problems for practicing Julia.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Fast Track to Julia Cheatsheet', url: 'https://cheatsheet.juliadocs.org/', description: 'Quick reference covering core syntax, array operations, linear algebra, and macros.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Julia Community Newsletter', url: 'https://discourse.julialang.org/c/community/news/66', description: 'Monthly roundups of package releases, ecosystem updates, and community news.' },
      { title: 'Julia Blog (Official)', url: 'https://julialang.org/blog/', description: 'Official Julia blog with release announcements and technical deep-dives.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Julia Discourse Forum', url: 'https://discourse.julialang.org/', description: 'Official forum for Q&A, performance help, and domain-specific discussions.' },
      { title: 'Reddit r/Julia', url: 'https://www.reddit.com/r/Julia/', description: 'Community hub for project updates and ecosystem discussions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PERL
// ═══════════════════════════════════════════════════════════════════════

export const perlResources: LanguageResources = {
  slug: 'perl',
  name: 'Perl',
  description: 'Perl is a highly capable, feature-rich programming language known for its text processing power, CPAN module ecosystem, and versatility in system administration, web development, and bioinformatics.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Modern Perl (4th Edition)', url: 'https://www.modernperlbooks.com/', description: 'The premier guide to writing idiomatic Perl 5 for contemporary development — free to read online.' },
      { title: 'Perl Books Directory', url: 'https://www.perl.org/books/', description: 'Official portal hosting free downloadable guides, beginner tutorials, and reference texts.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Perl.org Learn Section', url: 'https://www.perl.org/learn.html', description: 'Official entry point for beginners with links to core tutorials, FAQ, and recommended modules.' },
      { title: 'MetaCPAN', url: 'https://metacpan.org/', description: 'Modern fast search and primary repository for all CPAN distributions, modules, and perldoc references.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn-Perl.org', url: 'https://www.learn-perl.org/', description: 'Zero-setup interactive tutorial covering variables, loops, subroutines, and regex in your browser.' },
      { title: 'Exercism — Perl Track', url: 'https://exercism.org/tracks/perl5', description: '84 structured exercises with automated analysis and human peer mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Perl Programming Tutorials (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=WWE_EHjmP6w', description: 'Comprehensive video walkthrough of Perl fundamentals.' },
      { title: 'Perl Maven Tutorials', url: 'https://perlmaven.com/', description: 'Free video and text tutorials covering Perl basics, OOP, and CGI programming.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Perl Track', url: 'https://exercism.org/tracks/perl5', description: 'Free practice with mentorship across arrays, hashes, references, and packages.' },
      { title: 'Codewars — Perl Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in Perl.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Perl Cheat Sheet', url: 'https://perldoc.perl.org/perlcheat', description: 'Official Perl cheat sheet covering syntax, operators, and built-in functions.' },
      { title: 'Perl Reference (devhints)', url: 'https://devhints.io/perl', description: 'Concise one-page reference for Perl syntax and common idioms.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Perl Weekly', url: 'https://perlweekly.com/', description: 'Curated weekly newsletter covering CPAN updates, blog posts, and community happenings.' },
      { title: 'Perl.org News', url: 'https://www.perl.org/news/', description: 'Official Perl announcements and community news.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/perl', url: 'https://www.reddit.com/r/perl/', description: 'Active community for coding questions and CPAN module discussions.' },
      { title: 'Perl Monks', url: 'https://www.perlmonks.org/', description: 'Classic Q&A community focused on Perl development and deep technical discussions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// FORTRAN
// ═══════════════════════════════════════════════════════════════════════

export const fortranResources: LanguageResources = {
  slug: 'fortran',
  name: 'Fortran',
  description: 'Fortran is the original high-performance computing language, still dominant in scientific computing, weather simulation, computational physics, and numerical weather prediction. Modern Fortran (2008/2018) brings coarrays and OOP.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Fortran 90/95 Explained (Free Chapters)', url: 'https://www.fortran90.org/', description: 'Comprehensive free guide covering modern Fortran fundamentals.' },
      { title: 'Professional Fortran Programming', url: 'https://www.fortran90.org/', description: 'Free online book covering Fortran 90/95 through 2018 standards with practical examples.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Fortran Standard Documents', url: 'https://www.iso.org/standard/79467.html', description: 'Official ISO Fortran standards (2018, 2023 updates). Free working drafts available.' },
      { title: 'Fortran Wiki', url: 'https://fortranwiki.org/', description: 'Community maintained wiki with tutorials, code examples, and compiler information.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Fortran Tutorial (TutorialsPoint)', url: 'https://www.tutorialspoint.com/fortran/index.htm', description: 'Step-by-step Fortran tutorial with online compiler for interactive learning.' },
      { title: 'Exercism — Fortran Track', url: 'https://exercism.org/tracks/fortran', description: 'Free coding exercises with automated testing and mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Modern Fortran Tutorial (YouTube)', url: 'https://www.youtube.com/watch?v=L5kM3QZx1So', description: 'Comprehensive video series covering modern Fortran programming.' },
      { title: 'Fortran for Scientific Computing', url: 'https://www.youtube.com/', description: 'Video tutorials focused on HPC and numerical computing with Fortran.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Fortran Track', url: 'https://exercism.org/tracks/fortran', description: 'Structured exercises for learning modern Fortran programming.' },
      { title: 'Fortran Code Repository', url: 'https://github.com/topics/fortran', description: 'Browse open-source Fortran projects for real-world code examples.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Fortran Cheatsheet (devhints)', url: 'https://devhints.io/fortran', description: 'Quick reference for Fortran syntax, arrays, control flow, and I/O.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Fortran-lang.org Blog', url: 'https://fortran-lang.org/news/', description: 'Community news and updates on the Fortran language and ecosystem.' },
      { title: 'Fortran Discourse', url: 'https://fortran-lang.discourse.group/', description: 'Discussion group for Fortran development and community.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Fortran Discourse', url: 'https://fortran-lang.discourse.group/', description: 'Official community forum for Q&A and discussions.' },
      { title: 'Stack Overflow — Fortran Tag', url: 'https://stackoverflow.com/questions/tagged/fortran', description: 'Q&A for Fortran programming questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GROOVY
// ═══════════════════════════════════════════════════════════════════════

export const groovyResources: LanguageResources = {
  slug: 'groovy',
  name: 'Groovy',
  description: 'Apache Groovy is a powerful, optionally typed, dynamic language for the JVM. It integrates seamlessly with Java and powers Gradle builds, Jenkins pipelines, and modern DSLs with concise syntax and metaprogramming capabilities.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Groovy Succinctly (Syncfusion)', url: 'https://www.syncfusion.com/succinctly-free-ebooks', description: 'A free 104-page introductory book covering Groovy basics and practical application development.' },
      { title: 'Groovy in Action (Free Chapters)', url: 'https://livebook.manning.com/book/groovy-in-action-second-edition/', description: 'Free preview chapters from the definitive Groovy handbook covering control structures and builders.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Apache Groovy Documentation', url: 'https://groovy-lang.org/documentation.html', description: 'Complete reference manual, language spec, user guides, and API documentation.' },
      { title: 'Groovy Development Kit (GDK)', url: 'https://groovy-lang.org/groovy-dev-kit.html', description: 'Essential guide to Groovy enhancements over Java — I/O helpers, collection methods, and file management.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — Groovy Track', url: 'https://exercism.org/tracks/groovy', description: '66 coding exercises from simple strings to advanced logic puzzles with mentoring.' },
      { title: 'Groovy Online Compiler (JDoodle)', url: 'https://www.jdoodle.com/execute-groovy-online', description: 'Zero-setup in-browser Groovy execution environment for testing snippets.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Groovy Tutorial (TutorialsPoint)', url: 'https://www.tutorialspoint.com/groovy/index.htm', description: 'Step-by-step video and text tutorials covering closures, XML/JSON parsing, and testing.' },
      { title: 'Groovy for Jenkins Pipelines', url: 'https://www.youtube.com/', description: 'Practical tutorials focused on using Groovy for CI/CD pipeline development.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Groovy Track', url: 'https://exercism.org/tracks/groovy', description: 'Free practice with automated analysis and peer mentoring.' },
      { title: 'Codewars — Groovy Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in Groovy.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Groovy Cheatsheet', url: 'https://devhints.io/groovy', description: 'Concise reference for Groovy syntax, closures, and collections.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Apache Groovy Blog', url: 'https://groovy-lang.org/news.html', description: 'Official Apache Groovy announcements and release notes.' },
      { title: 'Reddit r/groovy', url: 'https://www.reddit.com/r/groovy/', description: 'Community for Jenkins, Gradle, and Groovy discussions.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Apache Groovy Mailing List', url: 'https://groovy-lang.org/support.html', description: 'Official mailing lists and developer Slack channels.' },
      { title: 'Stack Overflow — Groovy Tag', url: 'https://stackoverflow.com/questions/tagged/groovy', description: 'Q&A for Groovy, Gradle, and Jenkins pipeline questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CLOJURE
// ═══════════════════════════════════════════════════════════════════════

export const clojureResources: LanguageResources = {
  slug: 'clojure',
  name: 'Clojure',
  description: 'Clojure is a modern, functional Lisp dialect on the JVM. It emphasizes immutability, persistent data structures, and concurrency, with powerful macro capabilities for metaprogramming.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Clojure for the Brave and True', url: 'https://www.braveclojure.com/', description: 'A wildly popular, offbeat book covering everything from Lisp basics to building full applications — completely free online.' },
      { title: 'Clojure from the Ground Up', url: 'https://aphyr.com/posts/301-clojure-from-the-ground-up-welcome', description: 'An acclaimed series by Kyle Kingsbury breaking down FP, state, macros, and the REPL from the ground up.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Clojure.org Getting Started', url: 'https://clojure.org/guides/getting_started', description: 'Official hub for environment setup, REPL workflows, and Leiningen build tools.' },
      { title: 'Clojure API Reference', url: 'https://clojure.org/api/api', description: 'Complete API documentation for Clojure core functions and macros.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Clojure Koans', url: 'https://github.com/functional-koans/clojure-koans', description: 'Interactive exercises teaching Clojure syntax through failing tests — fill in the blanks to learn.' },
      { title: 'Exercism — Clojure Track', url: 'https://exercism.org/tracks/clojure', description: '12 concept modules and 105 exercises with free peer mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'ClojureTV (Official YouTube)', url: 'https://www.youtube.com/user/ClojureTV', description: 'Official Clojure conference talks including keynotes by Rich Hickey and dev calls.' },
      { title: 'Learn Clojure (freeCodeCamp)', url: 'https://www.classcentral.com/report/best-clojure-courses/', description: 'Community-recommended video series guiding beginners through advanced tooling.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Clojure Track', url: 'https://exercism.org/tracks/clojure', description: 'Free exercises with automated analysis and human code reviews.' },
      { title: '4Clojure', url: 'https://www.4clojure.com/', description: 'Bite-sized programming problems testing mastery of core functions and data structures.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Clojure Cheatsheet', url: 'http://jafingerhut.github.io/cheatsheet/clojuredocs/cheatsheet-tiptip-cdocs-summary.html', description: 'Definitive interactive cheat sheet categorizing all core functions by usage.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Clojure Gazette', url: 'https://ericnormand.me/newsletter', description: 'Weekly newsletter on functional programming patterns and Clojure ecosystem updates.' },
      { title: 'Clojure.org Resources', url: 'https://clojure.org/community/resources', description: 'Official listing of community newsletters and development journals.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Ask Clojure', url: 'https://ask.clojure.org/', description: 'Official Q&A forum run by the core team.' },
      { title: 'ClojureVerse', url: 'https://clojureverse.org/', description: 'Friendly community forum for project discussions and beginner advice.' },
      { title: 'Clojurians Slack', url: 'https://clojure-doc.org/articles/ecosystem/community/', description: 'Active Slack with #beginners, #jobs, and library channels.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ERLANG
// ═══════════════════════════════════════════════════════════════════════

export const erlangResources: LanguageResources = {
  slug: 'erlang',
  name: 'Erlang',
  description: 'Erlang is a functional, concurrent language designed for building massively scalable, fault-tolerant systems with soft real-time properties. It powers telecommunications, messaging platforms (WhatsApp), and distributed databases.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Learn You Some Erlang for Great Good!', url: 'https://learnyousomeerlang.com/', description: 'The definitive beginner-friendly guide transitioning from sequential concepts to concurrency and OTP. Free to read online.' },
      { title: 'Erlang in Anger', url: 'https://www.erlang-in-anger.com/', description: 'Practical guide by Fred Hébert for debugging, monitoring, and handling production issues in high-uptime BEAM systems.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Erlang/OTP Documentation', url: 'https://www.erlang.org/doc/', description: 'Complete system documentation, reference manuals for stdlib, kernel, and module references.' },
      { title: 'Erlang Course (erlang.org)', url: 'https://www.erlang.org/course/', description: 'Official Ericsson 4-day course material covering sequential, concurrency, OTP, and design principles.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Erlang Master Classes (Kent)', url: 'https://www.futurelearn.com/courses/functional-programming-erlang', description: 'Legendary course taught by Joe Armstrong, Francesco Cesarini, and Simon Thompson.' },
      { title: 'Exercism — Erlang Track', url: 'https://exercism.org/tracks/erlang', description: '80+ hands-on exercises with automated tests and personalized mentor feedback.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Erlang Tutorial (8-Hour Course)', url: 'https://www.youtube.com/', description: 'Comprehensive video walkthrough covering syntax, pattern matching, processes, maps, and OTP.' },
      { title: 'Erlang Solutions Webinars', url: 'https://www.erlang-solutions.com/', description: 'Free webinars covering Erlang, Elixir, and BEAM ecosystem topics.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Erlang Track', url: 'https://exercism.org/tracks/erlang', description: 'Free programming exercises with mentor feedback from the Erlang community.' },
      { title: 'Codewars — Erlang Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in Erlang.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Adopting Erlang Cheat Sheets', url: 'https://adoptingerlang.org/docs/cheat_sheets/', description: 'Extensive reference for data types, guards, processes, OTP behaviors, and ETS tables.' },
      { title: 'Erlang ETS Cheatsheet', url: 'https://devhints.io/ets', description: 'Quick reference for Erlang Term Storage tables and commands.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Erlang Forums', url: 'https://erlangforums.com/', description: 'Official discussion board for OTP releases, debugging, and design proposals.' },
      { title: 'Reddit r/erlang', url: 'https://www.reddit.com/r/erlang/', description: 'Community for Erlang articles, concurrency patterns, and ecosystem news.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Erlang Forums', url: 'https://erlangforums.com/', description: 'Active community board for core developers and learners.' },
      { title: 'Stack Overflow — Erlang Tag', url: 'https://stackoverflow.com/questions/tagged/erlang', description: 'Q&A for Erlang OTP, debugging, and functional design.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ASSEMBLY (x86/ARM)
// ═══════════════════════════════════════════════════════════════════════

export const assemblyResources: LanguageResources = {
  slug: 'assembly',
  name: 'Assembly',
  description: 'Assembly language provides direct control over CPU instructions, memory, and registers. Essential for understanding computer architecture, reverse engineering, embedded systems, and performance-critical code optimization.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Programming from the Ground Up', url: 'https://download-mirror.savannah.gnu.org/releases/pgubook/ProgrammingGroundUp-1-0-booksize.pdf', description: 'Classic textbook teaching core programming concepts using x86 assembly and GNU/Linux.' },
      { title: 'PC Assembly Language (Paul Carter)', url: 'https://www.scs.stanford.edu/05au-cs240c/lab/pcasm-book.pdf', description: 'Widely recommended intro covering x86 assembly, data representation, memory layout, and C interop.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Intel SDM Manuals', url: 'https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html', description: 'Official Intel software developer manuals for IA-32 and x86-64 architecture.' },
      { title: 'ARM Architecture Reference', url: 'https://developer.arm.com/documentation/ddi0487/gb/', description: 'Official ARM architectural specifications covering instruction sets and features.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Compiler Explorer (Godbolt)', url: 'https://godbolt.org/', description: 'Write C/C++/Rust and see the generated assembly output instantly — essential for learning how compilers translate code.' },
      { title: 'Azeria Labs ARM Assembly', url: 'https://azeria-labs.com/', description: 'Acclaimed text-based course on ARM 32-bit assembly for security research and exploit development.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'ARM Assembly Course (freeCodeCamp)', url: 'https://www.classcentral.com/report/best-assembly-courses/', description: 'Practical video covering ARMv7 architecture, registers, instructions, and Linux syscalls.' },
      { title: 'Modern x64 Assembly (Creel)', url: 'https://www.classcentral.com/report/best-assembly-courses/', description: 'Video series on modern x64 assembly, hardware interactions, and performance optimization.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Compiler Explorer (Godbolt)', url: 'https://godbolt.org/', description: 'Best tool for practicing assembly — compare your output with compiler-generated code.' },
      { title: 'TIS-100 (Programming Game)', url: 'https://store.steampowered.com/app/370360/TIS100/', description: 'Retro puzzle game requiring custom assembly code to solve spatial and arithmetic problems.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'X86 Instruction Reference', url: 'https://www.felixcloutier.com/x86/', description: 'Searchable web reference for x86/x64 instructions, flags, and opcodes.' },
      { title: 'Devhints Assembly Reference', url: 'https://devhints.io/assembly', description: 'Quick reference for common assembly instructions and registers.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Intel Developer Zone', url: 'https://www.intel.com/content/www/us/en/developer/overview.html', description: 'Intel developer news on architecture updates and instruction set extensions.' },
      { title: 'Reddit r/Assembly_language', url: 'https://www.reddit.com/r/Assembly_language/', description: 'Community for assembly news, questions, and low-level discussions.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/Assembly_language', url: 'https://www.reddit.com/r/Assembly_language/', description: 'Dedicated community for assembly language questions and code discussions.' },
      { title: 'Stack Overflow — Assembly Tag', url: 'https://stackoverflow.com/questions/tagged/assembly', description: 'Q&A for assembly syntax, debugging, and low-level code optimization.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// COBOL
// ═══════════════════════════════════════════════════════════════════════

export const cobolResources: LanguageResources = {
  slug: 'cobol',
  name: 'COBOL',
  description: 'COBOL (Common Business-Oriented Language) powers the worlds business infrastructure — banking systems, insurance claims, government systems, and enterprise transaction processing. Billions of lines of COBOL still run in production today.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'COBOL Programming (TutorialsPoint)', url: 'https://www.tutorialspoint.com/cobol/index.htm', description: 'Comprehensive free tutorial covering COBOL basics, file handling, and report generation.' },
      { title: 'Mainframe COBOL Programming', url: 'https://www.ibm.com/docs/en/cobol-zos/', description: 'IBM COBOL documentation covering enterprise COBOL for z/OS mainframes.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'IBM COBOL for z/OS Docs', url: 'https://www.ibm.com/docs/en/cobol-zos/', description: 'Complete IBM COBOL compiler documentation and language reference.' },
      { title: 'GnuCOBOL (Open-COBOL) Guide', url: 'https://sourceforge.net/projects/open-cobol/', description: 'Free open-source COBOL compiler with documentation and examples.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'COBOL Online Tutorial', url: 'https://www.mainframestechhelp.com/tutorials/cobol/', description: 'Free interactive COBOL tutorial covering data division, procedures, and file processing.' },
      { title: 'GnuCOBOL Examples', url: 'https://github.com/open-cobol/gnucobol/tree/main/tests', description: 'Open-source COBOL examples and test cases for hands-on learning.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'COBOL Programming Course (YouTube)', url: 'https://www.youtube.com/watch?v=RctR3v8l7iA', description: 'Introduction to COBOL programming for mainframe application development.' },
      { title: 'IBM COBOL Fundamentals', url: 'https://www.youtube.com/', description: 'IBM training videos covering COBOL basics and enterprise programming.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'GnuCOBOL Compiler', url: 'https://gnucobol.sourceforge.io/', description: 'Free open-source COBOL compiler to practice coding locally.' },
      { title: 'Exercism — COBOL Track', url: 'https://exercism.org/tracks/cobol', description: 'Structured COBOL exercises for modern business application programming.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'COBOL Reference Card', url: 'https://www.ibm.com/docs/en/cobol-zos/6.3', description: 'IBM COBOL language reference and syntax summary.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'IBM COBOL Community', url: 'https://community.ibm.com/community/user/ibmz-and-linuxone/cobol', description: 'IBM COBOL community for developers and mainframe professionals.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/cobol', url: 'https://www.reddit.com/r/cobol/', description: 'Community for COBOL developers and mainframe enthusiasts.' },
      { title: 'Stack Overflow — COBOL Tag', url: 'https://stackoverflow.com/questions/tagged/cobol', description: 'Q&A for COBOL programming and mainframe topics.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// OCaml
// ═══════════════════════════════════════════════════════════════════════

export const ocamlResources: LanguageResources = {
  slug: 'ocaml', name: 'OCaml',
  description: 'OCaml is a functional, imperative, and object-oriented language from the ML family. It excels at type-safe systems programming, formal verification, and high-assurance software with a powerful module system and type inference.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'OCaml from the Very Beginning', url: 'https://johnwhitington.net/ocamlbook/', description: 'A zero-prerequisites beginner book backed by the OCaml Software Foundation — free to read online or download as PDF.' },
      { title: 'Real World OCaml (2nd Edition)', url: 'https://dev.realworldocaml.org/', description: 'The definitive intermediate-to-advanced resource covering real-world apps, platform toolchain, and ecosystem libraries.' },
      { title: 'OCaml Programming: Correct + Efficient + Beautiful', url: 'https://cs3110.github.io/textbook/', description: 'Cornell CS 3110 open textbook emphasizing semantics, data structures, and testing in OCaml.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'OCaml.org Learn & Manual', url: 'https://ocaml.org/docs', description: 'Official portal with tutorials, exercises, language manuals, and guides from the core community.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — OCaml Track', url: 'https://exercism.org/tracks/ocaml', description: '60 tailored exercises with automated test analysis and free human mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Cornell CS 3110 Video Lectures', url: 'https://www.youtube.com/playlist?list=PLre5AT9JnKShBOPeuiD9b-I4XROIJhkIU', description: 'Bite-sized lecture series covering FP design, algorithmic complexity, and testing.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — OCaml Track', url: 'https://exercism.org/tracks/ocaml', description: 'Pattern matching, algebraic data types, and functional programming exercises.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'OCamlPro Cheat Sheets', url: 'https://ocamlpro.github.io/ocaml-cheat-sheets/', description: 'Downloadable one-page PDF references for language, stdlib, OPAM, and tools.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'OCaml Discuss', url: 'https://discuss.ocaml.org/', description: 'Primary community forum with announcements, library releases, and updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'OCaml Discuss', url: 'https://discuss.ocaml.org/', description: 'Official forum for questions, announcements, and community support.' },
      { title: 'Reddit r/ocaml', url: 'https://www.reddit.com/r/ocaml/', description: 'Community hub for projects, questions, and OCaml discussions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// F#
// ═══════════════════════════════════════════════════════════════════════

export const fsharpResources: LanguageResources = {
  slug: 'fsharp', name: 'F#',
  description: 'F# is a functional-first, cross-platform .NET language. It excels at data science, financial modeling, and concurrent systems with type providers, computation expressions, and seamless .NET interop.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'F# for Fun and Profit', url: 'https://fsharpforfunandprofit.com/', description: 'Universally regarded as the best introduction to FP and F# — covers types, design, and railway-oriented programming.' },
      { title: 'F# Programming Wikibook', url: 'https://en.wikibooks.org/wiki/F_Sharp_Programming', description: 'Community-edited textbook covering basics, immutable data, OOP, and computation expressions.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Microsoft Learn F# Docs', url: 'https://learn.microsoft.com/en-us/dotnet/fsharp/', description: 'Primary reference hub with language guide, syntax specs, and concepts tutorials.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — F# Track', url: 'https://exercism.org/tracks/fsharp', description: '146 exercises across 17 concepts with automated analysis and optional mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Beginning F# Series (Microsoft)', url: 'https://learn.microsoft.com/en-us/shows/beginners-series-to-fsharp/introduction-1-of-12--beginners-series-to-f', description: 'Official 12-part beginner video series from Microsoft Learn.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — F# Track', url: 'https://exercism.org/tracks/fsharp', description: 'Structured exercises with community mentorship and automated analysis.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'F# Cheatsheet (devhints)', url: 'https://devhints.io/fsharp', description: 'Quick reference for F# syntax, types, and functional patterns.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'F# Weekly', url: 'https://sergeytihon.com/category/f-weekly/', description: 'Definitive weekly newsletter covering ecosystem, libraries, and compiler updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'F# Software Foundation Forums', url: 'https://forums.fsharp.org/', description: 'Official Discourse forum for F# development questions and best practices.' },
      { title: 'F# Slack/Discord', url: 'https://fsharp.org/guides/slack/', description: 'Real-time chat for F# developers with global community channels.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// CRYSTAL
// ═══════════════════════════════════════════════════════════════════════

export const crystalResources: LanguageResources = {
  slug: 'crystal', name: 'Crystal',
  description: 'Crystal is a statically typed, compiled language with Ruby-like syntax but blazing performance via LLVM. It excels at web applications, backend services, and systems programming with type inference and nil safety.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Crystal Language Reference', url: 'https://crystal-lang.org/reference/', description: 'Official language reference covering syntax, types, concurrency, and macros.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Crystal API Docs', url: 'https://crystal-lang.org/api/', description: 'Complete API documentation for the Crystal standard library and shards.' },
      { title: 'Crystal Playground', url: 'https://play.crystal-lang.org/', description: 'Interactive browser-based Crystal sandbox for testing code snippets.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn Crystal (Tutorials)', url: 'https://crystal-lang.org/reference/getting_started/', description: 'Official getting started guide with step-by-step examples.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Crystal Language Tutorials (YouTube)', url: 'https://www.youtube.com/@CrystalLanguage', description: 'Official Crystal YouTube channel with tutorials and conference talks.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Crystal Track', url: 'https://exercism.org/tracks/crystal', description: 'Free coding exercises for learning Crystal with mentoring.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Crystal Cheatsheet', url: 'https://devhints.io/crystal', description: 'Quick reference for Crystal syntax and standard library.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Crystal Blog', url: 'https://crystal-lang.org/blog/', description: 'Official Crystal blog with release announcements and features.' },
      { title: 'Reddit r/crystal_programming', url: 'https://www.reddit.com/r/crystal_programming/', description: 'Community for Crystal news and discussions.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Crystal Forum', url: 'https://forum.crystal-lang.org/', description: 'Official community forum for Q&A and discussions.' },
      { title: 'Reddit r/crystal_programming', url: 'https://www.reddit.com/r/crystal_programming/', description: 'Community hub for Crystal programming.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// NIM
// ═══════════════════════════════════════════════════════════════════════

export const nimResources: LanguageResources = {
  slug: 'nim', name: 'Nim',
  description: 'Nim is an efficient, statically typed systems programming language with Python-like syntax. It compiles to C via its compiler, offering C-level performance with high-level expressiveness and metaprogramming.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Nim Basics Tutorial', url: 'https://narimiran.github.io/nim-basics/', description: 'An excellent free introduction to Nim covering basics, OOP, and metaprogramming.' },
      { title: 'Nim in Action (Free Chapters)', url: 'https://www.manning.com/books/nim-in-action', description: 'Free preview chapters from the comprehensive Nim book covering real-world development.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Nim Language Manual', url: 'https://nim-lang.org/documentation.html', description: 'Complete official documentation covering syntax, types, metaprogramming, and standard library.' },
      { title: 'Nim Playground', url: 'https://play.nim-lang.org/', description: 'Interactive browser-based Nim compiler for testing code snippets.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — Nim Track', url: 'https://exercism.org/tracks/nim', description: 'Free coding exercises with automated analysis and optional human mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Nim Programming Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=nim+programming+tutorial', description: 'Community video tutorials covering Nim basics to advanced metaprogramming.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Nim Track', url: 'https://exercism.org/tracks/nim', description: 'Structured exercises for mastering Nim syntax and patterns.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Nim Cheatsheet', url: 'https://devhints.io/nim', description: 'Quick reference for Nim syntax, types, and metaprogramming.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Nim News', url: 'https://nim-lang.org/blog/', description: 'Official Nim blog with release notes and community updates.' },
      { title: 'Nim Weekly', url: 'https://nimweekly.com/', description: 'Curated weekly newsletter covering Nim ecosystem and updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Nim Forum', url: 'https://forum.nim-lang.org/', description: 'Official community forum for discussions and Q&A.' },
      { title: 'Reddit r/nim', url: 'https://www.reddit.com/r/nim/', description: 'Community hub for Nim programming and projects.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ZIG
// ═══════════════════════════════════════════════════════════════════════

export const zigResources: LanguageResources = {
  slug: 'zig', name: 'Zig',
  description: 'Zig is a modern systems programming language focused on robustness, optimality, and maintainability. It offers manual memory management, compile-time computation, seamless C interop, and a first-class cross-compilation toolchain.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Introduction to Zig (Project-Based)', url: 'https://pedropark99.github.io/zig-book/', description: 'Open-access book teaching Zig through building a Base64 encoder, HTTP server, and image filter.' },
      { title: 'zig.guide', url: 'https://zig.guide/', description: 'Highly structured community introduction walking through core language features step-by-step.' },
      { title: 'Learning Zig', url: 'https://www.openmymind.net/learning_zig/', description: 'Concise intro guide making developers comfortable with Zig memory philosophy and syntax.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Zig Language Reference', url: 'https://ziglang.org/documentation/master/', description: 'Definitive technical specification for syntax, builtins, and language semantics.' },
      { title: 'Zig Standard Library Docs', url: 'https://ziglang.org/documentation/master/std/', description: 'Official API reference for allocators, data structures, I/O, and OS integration.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Ziglings', url: 'https://codeberg.org/ziglings/exercises/', description: 'Most popular hands-on tool — fix tiny broken programs to learn Zig incrementally.' },
      { title: 'Exercism Zig Track', url: 'https://exercism.org/tracks/zig', description: 'Structured coding exercises with community support.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Zig Programming Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=zig+programming+language', description: 'Community video tutorials covering Zig fundamentals and systems programming.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Ziglings', url: 'https://codeberg.org/ziglings/exercises/', description: 'Incremental broken-program exercises — the best way to learn Zig hands-on.' },
      { title: 'Exercism Zig Track', url: 'https://exercism.org/tracks/zig', description: 'Free practice with community support.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'DevDocs Zig Reference', url: 'https://devdocs.io/zig/', description: 'Fast, searchable, offline-capable interface for the Zig language reference.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Ziggit Forums', url: 'https://ziggit.dev/', description: 'Official community forum for questions, showcases, and technical discussions.' },
      { title: 'Ziglang News', url: 'https://ziglang.org/news/', description: 'Official news portal tracking compiler releases and core team updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Ziggit Forums', url: 'https://ziggit.dev/', description: 'Official forum for Q&A, showcases, and technical brainstorming.' },
      { title: 'Reddit r/Zig', url: 'https://www.reddit.com/r/Zig/', description: 'Community for Zig projects, discussions, and announcements.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// V
// ═══════════════════════════════════════════════════════════════════════

export const vResources: LanguageResources = {
  slug: 'v', name: 'V',
  description: 'V is a simple, fast, safe, compiled language for developing maintainable software. It offers C interop, a built-in GUI library, cross-platform compilation, and a focus on simplicity with a small language specification.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'V Documentation & Guides', url: 'https://github.com/vlang/v/blob/master/doc/docs.md', description: 'Official V documentation covering syntax, types, memory management, and standard library.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'V Language Docs', url: 'https://github.com/vlang/v/blob/master/doc/docs.md', description: 'Complete official documentation and language reference.' },
      { title: 'V Playground', url: 'https://play.vlang.io/', description: 'Interactive browser-based V sandbox for testing code snippets.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn V (Tutorial)', url: 'https://github.com/vlang/v/blob/master/doc/tutorial.md', description: 'Official V tutorial covering basics through advanced features.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'V Language Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=v+programming+language', description: 'Community video tutorials on V programming fundamentals.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — V Track', url: 'https://exercism.org/tracks/v', description: 'Coding exercises for learning V with community support.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'V Cheatsheet', url: 'https://devhints.io/v', description: 'Quick reference for V syntax and built-in features.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'V Blog', url: 'https://vlang.io/blog', description: 'Official V blog with release announcements and ecosystem updates.' },
      { title: 'Reddit r/vlang', url: 'https://www.reddit.com/r/vlang/', description: 'Community for V news and discussions.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'V Discord', url: 'https://discord.gg/vlang', description: 'Official V Discord server for real-time community support.' },
      { title: 'Reddit r/vlang', url: 'https://www.reddit.com/r/vlang/', description: 'Community for V programming discussions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// D
// ═══════════════════════════════════════════════════════════════════════

export const dResources: LanguageResources = {
  slug: 'd', name: 'D',
  description: 'D is a systems programming language combining C-level performance with modern convenience. It offers garbage collection, manual memory management, compile-time function execution, and a powerful template system.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'D Programming Language (Book by Andrei Alexandrescu)', url: 'https://www.amazon.com/D-Programming-Language-Andrei-Alexandrescu/dp/0321635361', description: 'The definitive book by D co-designer. Free online access available via Internet Archive.' },
      { title: 'Dlang Tour', url: 'https://tour.dlang.org/', description: 'Interactive guided tour covering D language features with runnable examples.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'D Language Reference', url: 'https://dlang.org/spec/spec.html', description: 'Complete official language specification and reference manual.' },
      { title: 'D Standard Library Docs', url: 'https://dlang.org/phobos/', description: 'Comprehensive API documentation for D standard library (Phobos).' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Dlang Tour', url: 'https://tour.dlang.org/', description: 'Official interactive browser-based tour of D language features.' },
      { title: 'Exercism — D Track', url: 'https://exercism.org/tracks/d', description: 'Free coding exercises for learning D with community mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'D Language Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=d+programming+language+tutorial', description: 'Community tutorials covering D from basics to advanced metaprogramming.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — D Track', url: 'https://exercism.org/tracks/d', description: 'Coding exercises with automated analysis and human mentoring.' },
      { title: 'Codewars — D Kata', url: 'https://www.codewars.com/', description: 'Solve community-created challenges in D.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'D Language Reference', url: 'https://dlang.org/spec/spec.html', description: 'Complete language specification.' },
      { title: 'D Cheatsheet', url: 'https://devhints.io/d', description: 'Quick reference for D syntax and features.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'D Blog', url: 'https://dlang.org/blog/', description: 'Official D blog with release notes, case studies, and community updates.' },
      { title: 'D Announcements (Forum)', url: 'https://forum.dlang.org/', description: 'D language announcements and discussions.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'D Forum', url: 'https://forum.dlang.org/', description: 'Official D community forum for discussions and Q&A.' },
      { title: 'Reddit r/d_language', url: 'https://www.reddit.com/r/d_language/', description: 'Community for D programming news and projects.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// RACKET
// ═══════════════════════════════════════════════════════════════════════

export const racketResources: LanguageResources = {
  slug: 'racket', name: 'Racket',
  description: 'Racket is a modern functional and general-purpose programming language in the Lisp/Scheme family. It excels at language-oriented programming, creating domain-specific languages, and teaching computer science fundamentals.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'How to Design Programs (HTDP)', url: 'https://htdp.org/', description: 'The definitive introductory CS textbook using Racket — teaches systematic program design from first principles.' },
      { title: 'Realm of Racket', url: 'https://www.realmofracket.com/', description: 'A fun project-based book teaching Racket through game development — free to read online.' },
      { title: 'Beautiful Racket', url: 'https://beautifulracket.com/', description: 'An in-depth guide to understanding and creating languages with Racket macros and syntax.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Racket Documentation', url: 'https://docs.racket-lang.org/', description: 'Complete official reference with guides, manuals, and API documentation.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Racket Programming (Exercism)', url: 'https://exercism.org/tracks/racket', description: 'Free coding exercises for Racket with community support.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Racket Programming (YouTube)', url: 'https://www.youtube.com/results?search_query=racket+programming+tutorial', description: 'Community tutorials covering Racket fundamentals and practical applications.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Racket Track', url: 'https://exercism.org/tracks/racket', description: 'Structured exercises for learning Racket programming.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Racket Quick Reference', url: 'https://docs.racket-lang.org/guide/quick.html', description: 'Official quick reference guide for Racket syntax and standard library.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Racket Blog', url: 'https://blog.racket-lang.org/', description: 'Official Racket blog with release announcements and community news.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Racket Discourse', url: 'https://racket.discourse.group/', description: 'Official community forum for Q&A and discussions.' },
      { title: 'Reddit r/Racket', url: 'https://www.reddit.com/r/Racket/', description: 'Community for Racket discussions and showcase projects.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SCHEME
// ═══════════════════════════════════════════════════════════════════════

export const schemeResources: LanguageResources = {
  slug: 'scheme', name: 'Scheme',
  description: 'Scheme is a minimalist, elegant dialect of Lisp renowned for its simplicity and use in computer science education. It features lexical scoping, first-class procedures, and a unified syntax that makes it ideal for teaching programming fundamentals.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Structure and Interpretation of Computer Programs (SICP)', url: 'https://mitpress.mit.edu/sites/default/files/sicp/full-text/book/book.html', description: 'The legendary MIT textbook using Scheme to teach fundamental principles of computer programming.' },
      { title: 'The Little Schemer (Free Edition)', url: 'https://www.thelittleprover.com/', description: 'A classic dialogue-style book teaching recursive thinking and Scheme fundamentals.' },
      { title: 'Teach Yourself Scheme in Fixnum Days', url: 'https://www.angelfire.com/ma/Scheme/tsifd.html', description: 'A gentle free introduction of Scheme programming.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Scheme Reports (RnRS)', url: 'https://www.scheme-reports.org/', description: 'Official Revised Reports on the Algorithmic Language Scheme — the standards documents.' },
      { title: 'The Scheme Programming Language (4th Ed)', url: 'https://www.scheme.com/tspl4/', description: 'The authoritative reference book by Scheme standard editors — free to read online.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — Scheme Track', url: 'https://exercism.org/tracks/scheme', description: 'Free coding exercises for Scheme with community mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'SICP Video Lectures (Brian Harvey)', url: 'https://www.youtube.com/playlist?list=PLhMnuBfGeCDNgVzLPxF9o5UNKG1x-LR9B', description: 'UC Berkeley SICP lectures using Scheme — legendary CS course.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Scheme Track', url: 'https://exercism.org/tracks/scheme', description: 'Structured exercises for mastering Scheme functional programming.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Scheme Cheatsheet', url: 'https://devhints.io/scheme', description: 'Quick reference for Scheme syntax and standard procedures.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Scheme Community', url: 'https://www.scheme.com/', description: 'Scheme standards updates and community resources.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/scheme', url: 'https://www.reddit.com/r/scheme/', description: 'Community for Scheme discussions and projects.' },
      { title: 'Stack Overflow — Scheme Tag', url: 'https://stackoverflow.com/questions/tagged/scheme', description: 'Q&A for Scheme programming questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PROLOG
// ═══════════════════════════════════════════════════════════════════════

export const prologResources: LanguageResources = {
  slug: 'prolog', name: 'Prolog',
  description: 'Prolog is a logic programming language associated with artificial intelligence, computational linguistics, and symbolic reasoning. It uses declarative programming where you describe problem constraints and let the engine find solutions.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Learn Prolog Now!', url: 'https://www.learnprolognow.org/', description: 'The best free introductory Prolog textbook — covers facts, rules, recursion, lists, and DCGs with interactive exercises.' },
      { title: 'Adventure in Prolog', url: 'https://www.amzi.com/AdventureInProlog/', description: 'A free online book teaching Prolog through building a text adventure game.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'SWI-Prolog Documentation', url: 'https://www.swi-prolog.org/pldoc/', description: 'Complete documentation for the most popular Prolog implementation — SWI-Prolog.' },
      { title: 'SWI-Prolog Online', url: 'https://swish.swi-prolog.org/', description: 'Online SWI-Prolog sandbox for testing Prolog programs directly in the browser.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn Prolog Now (Interactive)', url: 'https://www.learnprolognow.org/', description: 'Free interactive online textbook with exercises for each chapter.' },
      { title: 'Exercism — Prolog Track', url: 'https://exercism.org/tracks/prolog', description: 'Coding exercises for learning Prolog with community support.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Prolog Programming Course (YouTube)', url: 'https://www.youtube.com/results?search_query=prolog+programming+tutorial', description: 'Video tutorials covering Prolog fundamentals and logic programming concepts.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Prolog Track', url: 'https://exercism.org/tracks/prolog', description: 'Free structured exercises for Prolog with community mentoring.' },
      { title: 'Codewars — Prolog Kata', url: 'https://www.codewars.com/', description: 'Solve logic puzzles using Prolog.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'SWI-Prolog Reference', url: 'https://www.swi-prolog.org/pldoc/man?section=predsummary', description: 'Quick reference for SWI-Prolog built-in predicates.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'SWI-Prolog News', url: 'https://www.swi-prolog.org/News.html', description: 'SWI-Prolog release notes and updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/prolog', url: 'https://www.reddit.com/r/prolog/', description: 'Community for Prolog discussions and logic programming.' },
      { title: 'Stack Overflow — Prolog Tag', url: 'https://stackoverflow.com/questions/tagged/prolog', description: 'Q&A for Prolog programming questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SQL
// ═══════════════════════════════════════════════════════════════════════

export const sqlResources: LanguageResources = {
  slug: 'sql', name: 'SQL',
  description: 'SQL (Structured Query Language) is the universal language for managing and querying relational databases. It powers everything from small applications to massive data warehouses, and is an essential skill for any developer.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Use The Index, Luke', url: 'https://use-the-index-luke.com/', description: 'The definitive free book on SQL indexing and query performance. A must-read for writing fast SQL.' },
      { title: 'SQL Tutorial', url: 'https://www.sqltutorial.org/', description: 'A comprehensive SQL tutorial covering everything from basic queries to advanced window functions and CTEs.' },
      { title: 'SQL for Web Nerds', url: 'https://philip.greenspun.com/sql/', description: 'A practical hands-on SQL book from MIT covering database design, queries, and web integration.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'PostgreSQL Documentation', url: 'https://www.postgresql.org/docs/', description: 'The gold standard for SQL documentation — comprehensive, well-written, and free.' },
      { title: 'SQLite Documentation', url: 'https://www.sqlite.org/docs.html', description: 'Lightweight SQL implementation with excellent documentation and tutorials.' },
      { title: 'MySQL Documentation', url: 'https://dev.mysql.com/doc/', description: 'Complete reference for the most popular open-source database.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'SQLZoo', url: 'https://sqlzoo.net/', description: 'An award-winning interactive SQL tutorial with real-time database exercises — learn by doing.' },
      { title: 'SQLBolt', url: 'https://sqlbolt.com/', description: 'A series of interactive SQL lessons with hands-on exercises to practice database queries.' },
      { title: 'freeCodeCamp — SQL Course', url: 'https://www.freecodecamp.org/news/learn-sql-free-course/', description: 'A comprehensive free SQL course covering CRUD, joins, aggregations, and advanced querying.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'SQL Tutorial for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=HXV3zeQKqGY', description: 'A multi-hour comprehensive SQL course covering everything from basics to advanced queries.' },
      { title: 'SQL & PostgreSQL Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=BLH3s5eTL0s', description: 'In-depth PostgreSQL-focused SQL course with real-world database design examples.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — SQL Track', url: 'https://exercism.org/tracks/sql', description: 'Free coding exercises for SQL with automated analysis and optional mentoring.' },
      { title: 'LeetCode — SQL Problems', url: 'https://leetcode.com/problemset/database/', description: 'Real interview SQL questions from top tech companies — practice joins, aggregations, and advanced queries.' },
      { title: 'HackerRank — SQL Domain', url: 'https://www.hackerrank.com/domains/sql', description: 'SQL challenges from basic queries to advanced join and set operations.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'SQL Cheatsheet', url: 'https://devhints.io/sql', description: 'A concise one-page reference covering SQL syntax, joins, aggregations, and window functions.' },
      { title: 'PostgreSQL Cheatsheet', url: 'https://postgrescheatsheet.com/', description: 'Quick reference for PostgreSQL-specific SQL syntax and commands.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'DB Weekly', url: 'https://dbweekly.com/', description: 'A weekly roundup of database news, articles, and tools — SQL, NoSQL, and everything in between.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/SQL', url: 'https://www.reddit.com/r/SQL/', description: 'The largest SQL community on Reddit for help, discussions, and news.' },
      { title: 'Stack Overflow — SQL Tag', url: 'https://stackoverflow.com/questions/tagged/sql', description: 'The definitive Q&A forum for SQL queries, optimization, and database design.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ELM
// ═══════════════════════════════════════════════════════════════════════

export const elmResources: LanguageResources = {
  slug: 'elm', name: 'Elm',
  description: 'Elm is a delightful functional language for building reliable web applications. It offers zero runtime exceptions, an advanced type system, and a practical approach to frontend development with its signature architecture.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Elm Guide (Official)', url: 'https://guide.elm-lang.org/', description: 'The official Elm guide — the best place to start. Covers everything from installation to building real apps.' },
      { title: 'Elm in Action (Manning Free Chapters)', url: 'https://livebook.manning.com/book/elm-in-action/', description: 'Free preview chapters of the best-selling Elm book covering architecture, JSON decoders, and interop.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Elm Language Docs', url: 'https://elm-lang.org/docs', description: 'Official Elm documentation covering syntax, types, the Elm Architecture, and tooling.' },
      { title: 'Elm Package Catalog', url: 'https://package.elm-lang.org/', description: 'Searchable catalog of all Elm packages with automatically generated API documentation.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Elm Workshop', url: 'https://elm-workshop.com/', description: 'Interactive Elm exercises covering the basics through advanced patterns — learn by building.' },
      { title: 'Exercism — Elm Track', url: 'https://exercism.org/tracks/elm', description: 'Free coding exercises for Elm with automated analysis and community mentoring.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Elm for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=-u-Fw1UWYes', description: 'A comprehensive introduction to Elm with practical app-building examples.' },
      { title: 'Elm Tutorials (Richard Feldman)', url: 'https://www.youtube.com/@richardfeldman', description: 'Talks and tutorials by the author of Elm in Action covering architecture patterns and advanced topics.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Elm Track', url: 'https://exercism.org/tracks/elm', description: 'Free hands-on coding exercises for learning idiomatic Elm.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Elm Syntax Cheatsheet', url: 'https://elm-lang.org/docs/syntax', description: 'Official syntax reference covering all Elm language constructs at a glance.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Elm News', url: 'https://elm-news.com/', description: 'A curated news aggregator for the Elm ecosystem covering releases, libraries, and articles.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Elm Discourse', url: 'https://discourse.elm-lang.org/', description: 'The official Elm community forum for discussions, help, and project showcases.' },
      { title: 'Reddit r/elm', url: 'https://www.reddit.com/r/elm/', description: 'Community for Elm programming language news and discussions.' },
      { title: 'Elm Slack', url: 'https://elmlang.herokuapp.com/', description: 'Active real-time chat community for Elm developers.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GRAPHQL
// ═══════════════════════════════════════════════════════════════════════

export const graphqlResources: LanguageResources = {
  slug: 'graphql', name: 'GraphQL',
  description: 'GraphQL is a query language and runtime for APIs, developed by Meta. It lets clients request exactly the data they need, eliminating over-fetching and under-fetching common with REST APIs.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'How to GraphQL', url: 'https://www.howtographql.com/', description: 'A comprehensive community resource covering everything from GraphQL fundamentals to full-stack implementations.' },
      { title: 'GraphQL Guide', url: 'https://graphql.guide/', description: 'A free online book covering the complete GraphQL specification with practical examples.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'GraphQL Specification', url: 'https://spec.graphql.org/', description: 'The official GraphQL specification — the definitive source for understanding the language.' },
      { title: 'GraphQL Foundation Docs', url: 'https://graphql.org/learn/', description: 'Official learning guides covering queries, mutations, schemas, validation, and execution.' },
      { title: 'Apollo GraphQL Docs', url: 'https://www.apollographql.com/docs/', description: 'Production-ready documentation for the most popular GraphQL ecosystem.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'How to GraphQL (Interactive)', url: 'https://www.howtographql.com/', description: 'Full-stack interactive tutorials for building GraphQL APIs with various backend technologies.' },
      { title: 'Apollo Odyssey', url: 'https://www.apollographql.com/tutorials/', description: 'Free interactive learning platform with courses on GraphQL fundamentals and advanced patterns.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'GraphQL Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=ed8SzALbx1Q', description: 'A comprehensive video course covering GraphQL from basics to production deployments.' },
      { title: 'GraphQL Crash Course (Net Ninja)', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9gUxtblNUHcsAtVk0MVo5nG', description: 'A beginner-friendly playlist covering GraphQL schemas, resolvers, mutations, and Apollo integration.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'GraphQL Playground', url: 'https://www.graphqlbin.com/', description: 'Online sandbox for testing and exploring GraphQL queries against real APIs.' },
      { title: 'Exercism — GraphQL Track', url: 'https://exercism.org/tracks/graphql', description: 'Free coding exercises for GraphQL schema design and query writing.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'GraphQL Cheat Sheet', url: 'https://graphql.org/cheat-sheet/', description: 'Official quick reference covering all GraphQL query syntax and schema definition language.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'GraphQL Weekly', url: 'https://www.graphqlweekly.com/', description: 'A weekly newsletter covering GraphQL articles, releases, tools, and community projects.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/graphql', url: 'https://www.reddit.com/r/graphql/', description: 'Community for GraphQL discussions, news, and showcase projects.' },
      { title: 'GraphQL Foundation Slack', url: 'https://graphql.org/community/', description: 'Official GraphQL Foundation community channels for real-time discussions.' },
      { title: 'Stack Overflow — GraphQL Tag', url: 'https://stackoverflow.com/questions/tagged/graphql', description: 'Q&A for GraphQL schema design and troubleshooting.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GLEAM
// ═══════════════════════════════════════════════════════════════════════

export const gleamResources: LanguageResources = {
  slug: 'gleam', name: 'Gleam',
  description: 'Gleam is a friendly, statically-typed functional language that compiles to Erlang (BEAM). It offers a modern Rust-inspired type system, actor-based concurrency, and seamless interop with the BEAM ecosystem.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Gleam Language Tour', url: 'https://tour.gleam.run/', description: 'An interactive tour of Gleam covering syntax, types, and patterns — the best place to start.' },
      { title: 'Gleam Documentation', url: 'https://gleam.run/documentation/', description: 'Official documentation covering getting started, language features, and tooling.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Gleam Language Reference', url: 'https://gleam.run/documentation/', description: 'Official Gleam language documentation with syntax guides and best practices.' },
      { title: 'Gleam Standard Library Docs', url: 'https://hexdocs.pm/gleam_stdlib/', description: 'Complete API reference for the Gleam standard library.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Gleam Exercism Track', url: 'https://exercism.org/tracks/gleam', description: 'Free structured coding exercises for learning Gleam with community mentoring.' },
      { title: 'Gleam Language Tour', url: 'https://tour.gleam.run/', description: 'Interactive browser-based tour of the Gleam language.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Gleam Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=gleam+programming', description: 'Community video tutorials covering Gleam fundamentals, Web development with Lustre, and BEAM wisdom.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Gleam Track', url: 'https://exercism.org/tracks/gleam', description: 'Structured exercises for mastering Gleam functional programming.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Gleam Syntax Reference', url: 'https://gleam.run/documentation/', description: 'Official syntax and type system reference.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Gleam News', url: 'https://gleam.run/news/', description: 'Official Gleam news and release announcements.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Gleam Discord', url: 'https://discord.gg/gleam', description: 'Official Gleam Discord server with active community and core team presence.' },
      { title: 'Reddit r/gleam', url: 'https://www.reddit.com/r/gleam/', description: 'Community for Gleam discussions and project showcases.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SOLIDITY
// ═══════════════════════════════════════════════════════════════════════

export const solidityResources: LanguageResources = {
  slug: 'solidity', name: 'Solidity',
  description: 'Solidity is the primary programming language for writing smart contracts on Ethereum and EVM-compatible blockchains. It enables decentralized applications, DeFi protocols, and NFTs — the backbone of Web3.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Solidity Documentation (Official)', url: 'https://docs.soliditylang.org/', description: 'The complete official documentation — language reference, by-example tutorials, and security best practices.' },
      { title: 'Solidity by Example', url: 'https://docs.soliditylang.org/en/latest/solidity-by-example.html', description: 'Official walkthroughs of common smart contract patterns — voting, auctions, payment channels, and more.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Solidity Language Reference', url: 'https://docs.soliditylang.org/en/latest/', description: 'The definitive reference for Solidity syntax, types, storage layout, and compiler settings.' },
      { title: 'Ethereum Developer Docs', url: 'https://ethereum.org/en/developers/docs/', description: 'Comprehensive Ethereum development guides covering smart contracts, EVM, and dApp architecture.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'CryptoZombies', url: 'https://cryptozombies.io/', description: 'The most popular gamified Solidity course — build a zombie battle game while learning smart contracts.' },
      { title: 'RareSkills Solidity Course', url: 'https://rareskills.io/learn-solidity', description: 'A rigorous free Solidity curriculum covering gas optimization, storage layout, and DeFi protocol patterns.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Solidity Course for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=gyMwXuJrbJQ', description: 'A comprehensive video course covering Solidity from scratch to deploying smart contracts.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Ethernaut (OpenZeppelin)', url: 'https://ethernaut.openzeppelin.com/', description: 'An interactive wargame where you exploit smart contract vulnerabilities to learn security.' },
      { title: 'Capture the Ether', url: 'https://capturetheether.com/', description: 'A classic Solidity security CTF with challenges covering math bugs, access controls, and more.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Solidity Cheatsheet', url: 'https://docs.soliditylang.org/en/latest/cheatsheet.html', description: 'Official Solidity syntax and global variable quick reference.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Solidity Blog', url: 'https://www.soliditylang.org/blog/', description: 'Official Solidity release announcements, security advisories, and development updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Ethereum Stack Exchange', url: 'https://ethereum.stackexchange.com/', description: 'Q&A for Ethereum and Solidity development — the definitive help resource.' },
      { title: 'Reddit r/ethdev', url: 'https://www.reddit.com/r/ethdev/', description: 'Community for Ethereum developers sharing projects, ideas, and troubleshooting.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// WEBASSEMBLY
// ═══════════════════════════════════════════════════════════════════════

export const webassemblyResources: LanguageResources = {
  slug: 'webassembly', name: 'WebAssembly',
  description: 'WebAssembly (Wasm) is a low-level binary instruction format that runs at near-native speed in browsers and beyond. It enables compiling C/C++, Rust, Go, and other languages to run on the web and in edge runtimes.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'MDN WebAssembly Guide', url: 'https://developer.mozilla.org/en-US/docs/WebAssembly', description: 'The premier WebAssembly guide from Mozilla — covers concepts, compilation, JavaScript API, and text format.' },
      { title: 'Wasm By Example', url: 'https://wasmbyexample.dev/', description: 'A hands-on guide with annotated code snippets in Rust, AssemblyScript, and Go showing practical Wasm patterns.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'WebAssembly.org Docs', url: 'https://webassembly.org/', description: 'The official home of the WebAssembly standard with developer guides and architecture details.' },
      { title: 'W3C WebAssembly Core Specification', url: 'https://www.w3.org/TR/wasm-core-2/', description: 'The official W3C specification for the WebAssembly virtual machine.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'WebAssembly for Beginners (Linux Foundation)', url: 'https://www.edx.org/learn/computer-programming/the-linux-foundation-introduction-to-webassembly', description: 'A free course on WebAssembly design, architecture, security, and real-world use cases.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'WebAssembly Course (Frontend Masters)', url: 'https://frontendmasters.com/courses/web-assembly/', description: 'An intermediate course covering Wasm compilation, memory, and browser integration.' },
      { title: 'WebAssembly Talks (YouTube)', url: 'https://www.youtube.com/results?search_query=webassembly+conference+talk', description: 'Conference talks from Wasm community covering production use cases and ecosystem updates.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'WasmFiddle++', url: 'https://anonyco.github.io/WasmFiddlePlusPlus/', description: 'Online sandbox for writing C/C++, compiling to Wasm, and testing in the browser.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'MDN Wasm Reference', url: 'https://developer.mozilla.org/en-US/docs/WebAssembly/Reference', description: 'Complete reference for WebAssembly instructions, types, and module definitions.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Wasm Weekly', url: 'https://wasmweekly.news/', description: 'A curated weekly newsletter covering Wasm articles, projects, and ecosystem updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/WebAssembly', url: 'https://www.reddit.com/r/WebAssembly/', description: 'Community for Wasm discussions, project showcases, and technical Q&A.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ADA
// ═══════════════════════════════════════════════════════════════════════

export const adaResources: LanguageResources = {
  slug: 'ada', name: 'Ada',
  description: 'Ada is a high-integrity, statically-typed programming language designed for safety-critical and real-time systems. It is used extensively in aerospace, defense, railway, and medical systems where reliability is paramount.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Ada Programming Wikibook', url: 'https://en.wikibooks.org/wiki/Ada_Programming', description: 'A comprehensive free textbook covering Ada from basics to advanced concurrency and real-time programming.' },
      { title: 'Ada Distilled', url: 'https://www.adacore.com/books/ada-distilled', description: 'A concise Ada reference guide by AdaCore covering language fundamentals and best practices — free PDF.' },
      { title: 'Ada 2022 Reference Manual', url: 'https://www.adaic.org/resources/add_content/standards/22/rm/ARM-22.pdf', description: 'The official Ada language reference manual (free PDF) — the definitive specification.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Ada Resource Association', url: 'https://www.adaic.org/', description: 'The central hub for Ada resources, standards, compilers, and community tools.' },
      { title: 'AdaCore Learn', url: 'https://learn.adacore.com/', description: 'Interactive Ada tutorials from the makers of the GNAT compiler covering fundamentals to advanced topics.' },
      { title: 'Ada Information Clearinghouse', url: 'https://www.adaic.org/learn/', description: 'Official learning resources, tutorials, and curriculum materials for Ada education.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'AdaCore Learn Platform', url: 'https://learn.adacore.com/', description: 'Free interactive Ada courses covering introduction, embedded systems, and high-integrity development.' },
      { title: 'Exercism — Ada Track', url: 'https://exercism.org/tracks/ada', description: 'Free coding exercises for Ada with automated analysis and community support.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Ada Programming Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=ada+programming+tutorial', description: 'Community tutorials covering Ada fundamentals, real-time systems, and embedded programming.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Ada Track', url: 'https://exercism.org/tracks/ada', description: 'Structured coding exercises for mastering Ada systems programming.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Ada Reference Manual', url: 'https://www.adaic.org/resources/add_content/standards/22/rm/ARM-22.pdf', description: 'Complete Ada 2022 language reference manual.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'AdaCore Blog', url: 'https://www.adacore.com/blog', description: 'AdaCore development updates, industry case studies, and technical articles.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/ada', url: 'https://www.reddit.com/r/ada/', description: 'Community for Ada programming language news, discussions, and projects.' },
      { title: 'Stack Overflow — Ada Tag', url: 'https://stackoverflow.com/questions/tagged/ada', description: 'Q&A for Ada programming and safety-critical systems questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// HAXE
// ═══════════════════════════════════════════════════════════════════════

export const haxeResources: LanguageResources = {
  slug: 'haxe', name: 'Haxe',
  description: 'Haxe is a cross-platform language and toolkit that compiles to JavaScript, C++, Python, Lua, PHP, Java, and more. It is ideal for building applications that need to run on multiple platforms from a single codebase.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Haxe Manual (Official)', url: 'https://haxe.org/manual/', description: 'The definitive guide covering Haxe syntax, types, macros, and target-specific behaviors.' },
      { title: 'Haxe Programming Wikibook', url: 'https://en.wikibooks.org/wiki/Haxe_Programming', description: 'A community-edited open textbook introducing Haxe and its cross-platform approach.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Haxe Docs Portal', url: 'https://haxe.org/documentation/', description: 'Central entry point for all official Haxe tutorials, API docs, and guides.' },
      { title: 'Haxe Standard Library API', url: 'https://haxe.org/api/', description: 'Complete API reference for Haxe standard library across all target platforms.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Try Haxe Online', url: 'https://try.haxe.org/', description: 'Official browser-based playground to write Haxe and see compiled outputs for all targets.' },
      { title: 'Haxe Code Cookbook', url: 'https://code.haxe.org/', description: 'Community-driven code snippets and recipes categorized by skill level and topic.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Official Haxe Tutorials', url: 'https://haxe.org/videos/tutorials/', description: 'Official video walkthroughs covering installation, setup, and framework integration.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Haxe Track', url: 'https://exercism.org/tracks/haxe', description: 'Free coding exercises for Haxe with community mentoring.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Haxe Language Introduction', url: 'https://haxe.org/documentation/introduction/language-introduction.html', description: 'Quick syntax reference for developers coming from Java, C++, or C#.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Haxe Blog', url: 'https://haxe.org/blog/', description: 'Official Haxe blog with release notes, community updates, and ecosystem news.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Haxe Community Forum', url: 'https://community.haxe.org/', description: 'Official discussion board for Q&A, RFCs, and project sharing.' },
      { title: 'Haxe Discord', url: 'https://discord.com/invite/haxe', description: 'Real-time chat with core developers and active community members.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TERRAFORM / HCL
// ═══════════════════════════════════════════════════════════════════════

export const terraformResources: LanguageResources = {
  slug: 'terraform', name: 'Terraform',
  description: 'Terraform by HashiCorp is the industry standard Infrastructure as Code (IaC) tool. Using the HCL (HashiCorp Configuration Language), it lets you define, provision, and manage cloud infrastructure across all major providers.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Terraform: Up & Running (Free Chapters)', url: 'https://www.terraformupandrunning.com/', description: 'The gold-standard book for learning Terraform — free chapter samples cover HCL, state, and modules.' },
      { title: 'HashiCorp Learn Terraform', url: 'https://developer.hashicorp.com/terraform/tutorials', description: 'Official hands-on tutorials with browser-hosted terminal sessions from basics to advanced.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Terraform Documentation', url: 'https://developer.hashicorp.com/terraform/docs', description: 'Complete Terraform reference covering CLI, configuration, providers, and state management.' },
      { title: 'Terraform Registry', url: 'https://registry.terraform.io/', description: 'Searchable catalog of thousands of providers and modules for cloud infrastructure.' },
      { title: 'HCL Specification', url: 'https://github.com/hashicorp/hcl', description: 'The HCL syntax specification and language design guide.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'HashiCorp Learn (Interactive)', url: 'https://developer.hashicorp.com/terraform/tutorials', description: 'Free interactive browser-based Terraform tutorials from HashiCorp.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Terraform Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=7xngnjfIlK4', description: 'A comprehensive video course covering IaC principles, HCL syntax, modules, and multi-cloud deployments.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Terraform Exercises (HashiCorp)', url: 'https://developer.hashicorp.com/terraform/tutorials', description: 'Browser-based Terraform terminal exercises for hands-on practice.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Terraform Commands Cheatsheet', url: 'https://spacelift.io/blog/terraform-commands-cheat-sheet', description: '28+ essential CLI commands with code snippets and best practices — downloadable PDF.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Terraform Weekly', url: 'https://www.weekly.tf/', description: 'Curated weekly newsletter tracking Terraform, OpenTofu, and IaC ecosystem updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/Terraform', url: 'https://www.reddit.com/r/Terraform/', description: 'The primary community for Terraform discussions, troubleshooting, and best practices.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// MARKDOWN
// ═══════════════════════════════════════════════════════════════════════

export const markdownResources: LanguageResources = {
  slug: 'markdown', name: 'Markdown',
  description: 'Markdown is the most widely used lightweight markup language in software development. It powers documentation, READMEs, wikis, forums, note-taking, and static site generation across the entire tech industry.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'The Markdown Guide', url: 'https://www.markdownguide.org/', description: 'The definitive free reference guide covering everything from basic syntax to advanced extensions.' },
      { title: 'CommonMark Specification', url: 'https://spec.commonmark.org/', description: 'The official strongly-defined specification that resolves Markdown ambiguities.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'CommonMark Spec', url: 'https://spec.commonmark.org/', description: 'The official CommonMark specification — the gold standard for Markdown parsing.' },
      { title: 'GitHub Flavored Markdown Spec', url: 'https://github.github.com/gfm/', description: 'The GFM specification covering task lists, tables, strikethrough, and autolinks.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'CommonMark Tutorial', url: 'https://commonmark.org/help/tutorial/', description: 'A 10-minute interactive browser tutorial with embedded coding exercises.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Markdown Crash Course (YouTube)', url: 'https://www.youtube.com/results?search_query=markdown+crash+course', description: 'FreeCodeCamp and other channels offer comprehensive overviews in under an hour.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'StackEdit', url: 'https://stackedit.io/', description: 'The best free in-browser Markdown editor with live preview, sync, and export features.' },
      { title: 'Dillinger', url: 'https://dillinger.io/', description: 'A cloud-based Markdown editor with live HTML preview and export to multiple formats.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Markdown Guide Cheat Sheet', url: 'https://www.markdownguide.org/cheat-sheet/', description: 'A clean downloadable reference table for basic and extended Markdown syntax.' },
      { title: 'adam-p Markdown Cheatsheet', url: 'https://github.com/adam-p/markdown-here/wiki/markdown-cheatsheet', description: 'The most widely bookmarked developer cheatsheet on GitHub for all Markdown flavors.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'CommonMark Discourse', url: 'https://talk.commonmark.org/', description: 'Official discussions on Markdown evolution, syntax additions, and spec changes.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/Markdown', url: 'https://www.reddit.com/r/Markdown/', description: 'Community for Markdown tips, tools, editors, and workflow discussions.' },
      { title: 'CommonMark Discourse', url: 'https://talk.commonmark.org/', description: 'Official Markdown community for spec discussions and syntax proposals.' },
    ]},
  ],
};


// ═══════════════════════════════════════════════════════════════════════
// LATEX
// ═══════════════════════════════════════════════════════════════════════

export const latexResources: LanguageResources = {
  slug: 'latex', name: 'LaTeX',
  description: 'LaTeX is the gold standard for technical and scientific document preparation. It is essential for academic papers, theses, and any document requiring precise mathematical typesetting, cross-references, and bibliographies.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'LaTeX Wikibook', url: 'https://en.wikibooks.org/wiki/LaTeX', description: 'A comprehensive free textbook covering everything from installation to advanced packages, math typesetting, and bibliography management.' },
      { title: 'Learn LaTeX in 30 Minutes (Overleaf)', url: 'https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes', description: 'A beginner-friendly quick start guide that gets you writing LaTeX in under an hour.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'LaTeX Project Documentation', url: 'https://www.latex-project.org/help/documentation/', description: 'Official LaTeX documentation including guides, manuals, and beginner tutorials.' },
      { title: 'Overleaf Documentation', url: 'https://www.overleaf.com/learn', description: 'Extensive documentation and tutorials by Overleaf covering LaTeX basics and advanced topics.' },
      { title: 'CTAN (Comprehensive TeX Archive)', url: 'https://ctan.org/', description: 'The definitive archive of all LaTeX packages and documentation.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Overleaf Tutorials', url: 'https://www.overleaf.com/learn/latex/Tutorials', description: 'Interactive tutorials that teach LaTeX through hands-on document editing in the browser.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'LaTeX Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=latex+tutorial+beginner', description: 'Thousands of free video tutorials covering LaTeX from basics to advanced document design.' },
      { title: 'LaTeX Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=VhmkLrOjLsw', description: 'A comprehensive multi-hour LaTeX course covering math, figures, bibliographies, and presentations.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Overleaf', url: 'https://www.overleaf.com/', description: 'The most popular online LaTeX editor with collaborative editing, templates, and instant preview.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'LaTeX Cheatsheet', url: 'https://wch.github.io/latexsheet/', description: 'A concise one-page reference for common LaTeX commands, math symbols, and environments.' },
      { title: 'LaTeX Math Symbols', url: 'https://www.caam.rice.edu/~heinken/latex/symbols.pdf', description: 'Complete reference of all LaTeX math mode symbols.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'LaTeX Project Blog', url: 'https://www.latex-project.org/news/', description: 'Official LaTeX project news and release announcements.' },
      { title: 'TeX StackExchange', url: 'https://tex.stackexchange.com/', description: 'Q&A platform for LaTeX and TeX related questions.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/LaTeX', url: 'https://www.reddit.com/r/LaTeX/', description: 'Community for LaTeX discussions, templates, and troubleshooting.' },
      { title: 'TeX StackExchange', url: 'https://tex.stackexchange.com/', description: 'The definitive Q&A platform for LaTeX typesetting problems.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// COMMON LISP
// ═══════════════════════════════════════════════════════════════════════

export const commonlispResources: LanguageResources = {
  slug: 'common-lisp', name: 'Common Lisp',
  description: 'Common Lisp is a multi-paradigm programming language known for its powerful macro system, dynamic typing, and interactive development cycle. It excels at AI, symbolic computing, and meta-programming.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Practical Common Lisp', url: 'https://gigamonkeys.com/book/', description: 'The premier modern introduction to Common Lisp with hands-on projects like building a web server.' },
      { title: 'Common Lisp the Language (CLtL2)', url: 'https://www.cs.cmu.edu/Groups/AI/html/cltl/cltl2.html', description: 'The definitive language reference by Guy L. Steele covering ANSI Common Lisp standards.' },
      { title: 'Common Lisp Cookbook', url: 'https://lispcookbook.github.io/cl-cookbook/', description: 'A practical community guide covering real-world usage from databases to web development.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Common Lisp HyperSpec', url: 'https://www.lispworks.com/documentation/HyperSpec/Front/', description: 'The definitive hyperlinked ANSI Common Lisp standard reference.' },
      { title: 'Lisp-Lang.org', url: 'https://lisp-lang.org/', description: 'Central community portal with tutorials, success stories, and style guides.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism — Common Lisp Track', url: 'https://exercism.org/tracks/common-lisp', description: '92 coding exercises across 27 key concepts with automated analysis and mentoring.' },
      { title: 'Lisp Koans', url: 'https://github.com/google/lisp-koans', description: 'Test-driven interactive exercises teaching core Common Lisp features.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Common Lisp Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=common+lisp+tutorial', description: 'Community video tutorials covering REPL workflows, SLIME, and practical Lisp programming.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism — Common Lisp Track', url: 'https://exercism.org/tracks/common-lisp', description: 'Free structured exercises for mastering Common Lisp.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Common Lisp Quick Reference', url: 'https://www.quickreference.com/common-lisp/', description: 'Compact reference summarizing syntax, data structures, and macros.' },
      { title: 'Learn Lisp in Y Minutes', url: 'https://learnxinyminutes.com/docs/common-lisp/', description: 'A rapid syntax overview for experienced programmers.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Lisp Weekly', url: 'https://lispweekly.com/', description: 'Weekly newsletter highlighting Lisp projects, blog posts, and library releases.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/Common_Lisp', url: 'https://www.reddit.com/r/Common_Lisp/', description: 'Active community for Lisp discussions and project showcases.' },
      { title: 'Stack Overflow — Common Lisp Tag', url: 'https://stackoverflow.com/questions/tagged/common-lisp', description: 'Q&A for Common Lisp programming questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PROCESSING
// ═══════════════════════════════════════════════════════════════════════

export const processingResources: LanguageResources = {
  slug: 'processing', name: 'Processing',
  description: 'Processing is a flexible software sketchbook and language for learning how to code within the context of the visual arts. It is the premier tool for creative coding, generative art, and data visualization.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Processing Tutorials (Official)', url: 'https://processing.org/tutorials/', description: 'Official tutorials covering everything from coordinate systems to 2D/3D transformations and hardware integration.' },
      { title: 'Getting Started with Processing', url: 'https://processing.org/tutorials/gettingstarted', description: 'Official guide by the co-founders walking through syntax, concepts, and basics.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Processing Reference', url: 'https://processing.org/reference/', description: 'Definitive cheatsheet and documentation for every built-in function and data type.' },
      { title: 'Processing Foundation', url: 'https://processingfoundation.org/', description: 'The non-profit organization supporting the Processing project and community.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Hello Processing', url: 'https://hello.processing.org/', description: 'An interactive video introduction teaching fundamentals in about an hour.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'The Coding Train (Daniel Shiffman)', url: 'https://thecodingtrain.com/processing', description: 'The gold standard for creative coding instruction with hundreds of video tutorials and coding challenges.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'OpenProcessing', url: 'https://openprocessing.org/', description: 'Creative coding community to browse, fork, run, and share sketches in the browser.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Processing Reference', url: 'https://processing.org/reference/', description: 'Complete reference for all built-in functions, constants, and data structures.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Processing Blog', url: 'https://processing.org/blog/', description: 'Official Processing release notes and community updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Processing Discourse', url: 'https://discourse.processing.org/', description: 'Official community forum for help, galleries, and event organization.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SCRATCH
// ═══════════════════════════════════════════════════════════════════════

export const scratchResources: LanguageResources = {
  slug: 'scratch', name: 'Scratch',
  description: 'Scratch is the worlds largest coding community for children and the best way to start programming. It teaches computational thinking through a visual block-based interface used by millions worldwide.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Scratch Wiki', url: 'https://en.scratch-wiki.info/', description: 'The collaboratively-written official encyclopedia with deep concept explanations and block documentation.' },
      { title: 'Harvard ScratchEd Guides', url: 'https://scratched.gse.harvard.edu/', description: 'Free PDF lesson plans, activity guides, and creative coding prompts from Harvard.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Scratch Ideas Page', url: 'https://scratch.mit.edu/ideas', description: 'Official project ideas, interactive tutorials, and starter templates.' },
      { title: 'Scratch Foundation Learning Library', url: 'https://scratchfoundation.org/learn/learning-library', description: 'Curated activities, printable coding cards, and lesson plans.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'CS50 Introduction to Scratch (Harvard)', url: 'https://cs50.harvard.edu/scratch', description: 'World-class free course teaching computational thinking through Scratch by Professor David Malan.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Scratch Official Video Tutorials', url: 'https://scratch.mit.edu/help/videos/', description: 'Official short video walkthroughs covering sprites, sound, events, and paint editor.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Scratch Online Editor', url: 'https://scratch.mit.edu/', description: 'The primary browser-based coding environment with drag-and-drop blocks and instant preview.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'All Blocks of Scratch PDF', url: 'https://scratched.gse.harvard.edu/sites/default/files/a.all_blocks_of_scratch_0.pdf', description: 'Color-coded visual guide mapping all 100+ blocks across 9 categories.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Scratch Foundation News', url: 'https://www.scratchfoundation.org/', description: 'Official announcements, platform updates, and educational research.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Scratch Discussion Forums', url: 'https://scratch.mit.edu/discuss/', description: 'Official massive discussion board for help, collaboration, and project feedback.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// WOLFRAM LANGUAGE
// ═══════════════════════════════════════════════════════════════════════

export const wolframResources: LanguageResources = {
  slug: 'wolfram-language', name: 'Wolfram Language',
  description: 'Wolfram Language is a multi-paradigm computational language developed by Wolfram Research. It powers Mathematica and excels at symbolic mathematics, data science, machine learning, and knowledge-based computing.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Wolfram Language Fast Introduction', url: 'https://www.wolfram.com/language/fast-introduction/', description: 'The official quick-start guide covering programming fundamentals in the Wolfram Language.' },
      { title: 'Wolfram Language Documentation', url: 'https://reference.wolfram.com/language/', description: 'The definitive reference with guides, tutorials, and function documentation.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Wolfram Language & System', url: 'https://reference.wolfram.com/language/', description: 'Complete reference documentation for all Wolfram Language functions and features.' },
      { title: 'Function Repository', url: 'https://resources.wolframcloud.com/FunctionRepository/', description: 'Thousands of contributed functions for the Wolfram Language.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Wolfram U: Free Courses', url: 'https://www.wolfram.com/wolfram-u/', description: 'Free interactive courses covering Wolfram Language fundamentals, data science, and machine learning.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Wolfram Training Videos', url: 'https://www.wolfram.com/training/courses/', description: 'Free training videos from Wolfram covering language basics to specialized topics.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Wolfram Cloud', url: 'https://www.wolframcloud.com/', description: 'Free Wolfram Language environment in the cloud to write and run code.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Wolfram Language Syntax', url: 'https://reference.wolfram.com/language/guide/Syntax.html', description: 'Official syntax reference for Wolfram Language.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Wolfram Blog', url: 'https://blog.wolfram.com/', description: 'Official Wolfram blog with language updates and computational thinking articles.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Wolfram Community', url: 'https://community.wolfram.com/', description: 'Official forum for Wolfram Language discussions and technical Q&A.' },
      { title: 'Stack Overflow — Wolfram Language Tag', url: 'https://stackoverflow.com/questions/tagged/wolfram-language', description: 'Q&A for Wolfram Language programming.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// GDSCRIPT (GODOT)
// ═══════════════════════════════════════════════════════════════════════

export const gdscriptResources: LanguageResources = {
  slug: 'gdscript', name: 'GDScript',
  description: 'GDScript is the primary scripting language for the Godot Engine. It has a Python-like syntax but is optimized for game development with built-in types like vectors, colors, and nodes.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Godot Engine Documentation', url: 'https://docs.godotengine.org/', description: 'The definitive source of truth for the engine and GDScript with deep architectural guides.' },
      { title: 'GDScript Reference', url: 'https://docs.godotengine.org/en/stable/tutorials/scripting/gdscript/gdscript_basics.html', description: 'Official language reference covering syntax, data types, operators, and annotations.' },
      { title: 'Learn GDScript From Zero (GDQuest)', url: 'https://www.gdquest.com/tutorial/godot/learning-paths/learn-gdscript-from-zero/', description: 'A premier interactive browser-based app for programming beginners.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Godot Docs', url: 'https://docs.godotengine.org/', description: 'Complete engine and GDScript documentation maintained by core developers.' },
      { title: 'Learn to Code with GDScript', url: 'https://docs.godotengine.org/en/stable/getting_started/introduction/learn_to_code_with_gdscript.html', description: 'Official step-by-step landing page for learning GDScript.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn GDScript From Zero', url: 'https://www.gdquest.com/tutorial/godot/learning-paths/learn-gdscript-from-zero/', description: 'Browser-based gamified lessons teaching programming concepts and GDScript syntax.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'GDQuest YouTube Channel', url: 'https://www.youtube.com/@GDQuest', description: 'High-quality free video tutorials covering GDScript, design patterns, and game feel.' },
      { title: 'Brackeys Godot GDScript Tutorial', url: 'https://www.youtube.com/watch?v=e1zJS31tr88', description: 'Comprehensive 1-hour crash course on GDScript programming in Godot.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Godot Game Jam', url: 'https://itch.io/jams/tag-godot', description: 'Participate in game jams to practice GDScript through real game development.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'GDQuest GDScript Cheatsheet', url: 'https://school.gdquest.com/cheatsheets/gdscript', description: 'Clean reference card covering all major GDScript syntax for Godot 4.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Godot News', url: 'https://godotengine.org/blog/', description: 'Official Godot blog with release announcements and community showcases.' },
      { title: 'Godot Weekly', url: 'https://godot-weekly.curated.co/', description: 'Weekly curated tutorials, plugins, and community resources.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/godot', url: 'https://www.reddit.com/r/godot/', description: 'The largest Godot community for discussions and project showcases.' },
      { title: 'Godot Forum', url: 'https://forum.godotengine.org/', description: 'Official forum for help, showcases, and tutorials.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// LABVIEW
// ═══════════════════════════════════════════════════════════════════════

export const labviewResources: LanguageResources = {
  slug: 'labview', name: 'LabVIEW',
  description: 'LabVIEW (Laboratory Virtual Instrument Engineering Workbench) is a graphical programming platform from NI used extensively in test, measurement, and control applications across engineering and science.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'NI Learning Center', url: 'https://learn.ni.com/', description: 'Official hub with hundreds of on-demand self-paced lessons, video modules, and structured paths.' },
      { title: 'LabVIEW Wiki', url: 'https://labviewwiki.org/', description: 'Community knowledge base with over 6,000 articles covering basics to design patterns.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'NI LabVIEW Tutorial', url: 'https://learn.ni.com/learn/article/labview-tutorial', description: 'Official step-by-step introduction to LabVIEW from initial setup to first project.' },
      { title: 'LabVIEW Community Edition', url: 'https://www.ni.com/en/shop/labview/select-edition/labview-community-edition.html', description: 'Free LabVIEW edition for non-commercial use with full capabilities.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'NI Learning Center Courses', url: 'https://learn.ni.com/', description: 'Self-paced interactive courses from absolute beginner to advanced LabVIEW architectures.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'NI LabVIEW Video Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=labview+tutorial', description: 'Free video walkthroughs of dataflow, loops, error handling, and front panel design.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'NI Community Examples', url: 'https://forums.ni.com/', description: 'Thousands of sample projects and templates for data acquisition and instrument control.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'LabVIEW Keyboard Shortcuts', url: 'https://labviewwiki.org/wiki/LabVIEW_Keyboard_Shortcuts', description: 'Exhaustive reference of keyboard shortcuts for faster block diagram navigation.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'NI Community Blog', url: 'https://forums.ni.com/', description: 'Official NI updates, feature rollouts, and community discussions.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'NI Community Forums', url: 'https://forums.ni.com/', description: 'Primary forum for LabVIEW questions, snippets, and user groups.' },
      { title: 'Reddit r/LabVIEW', url: 'https://www.reddit.com/r/LabVIEW/', description: 'Community for troubleshooting and architectural discussions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// AUTOHOTKEY
// ═══════════════════════════════════════════════════════════════════════

export const ahkResources: LanguageResources = {
  slug: 'autohotkey', name: 'AutoHotkey',
  description: 'AutoHotkey is a free, open-source scripting language for Windows desktop automation. It enables creating hotkeys, macros, form fillers, and custom UI tools to automate repetitive tasks.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'AutoHotkey v2 Tutorial (Official)', url: 'https://www.autohotkey.com/docs/v2/Tutorial.htm', description: 'The definitive beginner tutorial covering installation, hotkeys, hotstrings, and scripting basics.' },
      { title: 'Learn AutoHotkey by Stealing Scripts', url: 'https://www.hillelwayne.com/post/ahk-scripts-project/', description: '14 heavily annotated production scripts teaching practical real-world automation.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'AutoHotkey v2 Quick Reference', url: 'https://www.autohotkey.com/docs/v2/', description: 'Complete manual covering every built-in function, script concepts, and keyboard remapping.' },
      { title: 'AutoHotkey v2 Changes', url: 'https://www.autohotkey.com/docs/v2/v2-changes.htm', description: 'Migration guide and changes from v1 to v2.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'AutoHotkey Community Forums', url: 'https://www.autohotkey.com/boards/', description: 'Official forums with user-contributed libraries and code examples for learning.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'AHK v2 Tutorial (YouTube)', url: 'https://www.youtube.com/watch?v=XH4O0qlAuCY', description: 'Video introduction to AutoHotkey v2 covering hotstrings, hotkeys, and mouse clicks.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'AHK Script Repository', url: 'https://www.autohotkey.com/boards/', description: 'Browse and learn from thousands of community-contributed automation scripts.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'AHK v2 Quick Reference', url: 'https://www.autohotkey.com/docs/v2/', description: 'Key name references, modifier symbols, and syntax at a glance.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'The-Automator Newsletter', url: 'https://www.the-automator.com/category/autohotkey-newsletter/', description: 'Weekly newsletter with tips, snippets, and automation advice.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Official AHK Forums', url: 'https://www.autohotkey.com/boards/', description: 'Primary discussion hub for help, libraries, and script sharing.' },
      { title: 'Reddit r/AutoHotkey', url: 'https://www.reddit.com/r/AutoHotkey/', description: 'Active community for troubleshooting and sharing automation scripts.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// JSON
// ═══════════════════════════════════════════════════════════════════════

export const jsonResources: LanguageResources = {
  slug: 'json', name: 'JSON',
  description: 'JSON (JavaScript Object Notation) is the most widely used data interchange format on the web. It is lightweight, language-independent, and used everywhere from APIs to configuration files to databases.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'JSON.org', url: 'https://www.json.org/', description: 'The official JSON specification and introduction by Douglas Crockford, the creator of JSON.' },
      { title: 'MDN — Working with JSON', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON', description: 'Comprehensive guide on JSON syntax, parsing, and serialization.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'ECMA-404 JSON Standard', url: 'https://ecma-international.org/publications-and-standards/standards/ecma-404/', description: 'The official ECMA standard defining the JSON data interchange syntax.' },
      { title: 'JSON.org Specification', url: 'https://www.json.org/json-en.html', description: 'The definitive specification with railroad diagrams for JSON syntax.' },
      { title: 'IETF RFC 8259', url: 'https://datatracker.ietf.org/doc/html/rfc8259', description: 'The IETF standard for JSON data interchange format.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Learn JSON in Y Minutes', url: 'https://learnxinyminutes.com/docs/json/', description: 'A rapid syntax overview of JSON with annotated examples.' },
      { title: 'JSON Crack', url: 'https://jsoncrack.com/', description: 'Interactive JSON visualizer to explore and understand complex JSON structures.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'JSON Crash Course (YouTube)', url: 'https://www.youtube.com/results?search_query=json+tutorial+beginner', description: 'Multiple free video tutorials covering JSON syntax, parsing, and API integration.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'JSON Placeholder', url: 'https://jsonplaceholder.typicode.com/', description: 'Free fake API for testing and prototyping with sample JSON data.' },
      { title: 'JSON Schema Validator', url: 'https://www.jsonschemavalidator.net/', description: 'Online tool to validate JSON against JSON Schema definitions.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'JSON Cheatsheet', url: 'https://devhints.io/json', description: 'A concise one-page reference for JSON syntax and common patterns.' },
      { title: 'JSON Schema Reference', url: 'https://json-schema.org/learn/getting-started-step-by-step', description: 'Complete reference for JSON Schema validation syntax.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'JSON Schema Blog', url: 'https://json-schema.org/blog/', description: 'Updates and articles about the JSON Schema specification.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'JSON Schema GitHub Discussions', url: 'https://github.com/json-schema-org/json-schema-spec/discussions', description: 'Community discussions around JSON Schema specification.' },
      { title: 'Stack Overflow — JSON Tag', url: 'https://stackoverflow.com/questions/tagged/json', description: 'Definitive Q&A platform for JSON questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// TOML
// ═══════════════════════════════════════════════════════════════════════

export const tomlResources: LanguageResources = {
  slug: 'toml', name: 'TOML',
  description: 'TOML (Tom\'s Obvious, Minimal Language) is a human-friendly configuration file format designed for clarity and minimalism. It is the standard for Rust (Cargo.toml), Python (pyproject.toml), and many modern tools.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'TOML Documentation (Official)', url: 'https://toml.io/en/', description: 'The definitive landing page with a complete overview of syntax, types, and tables.' },
      { title: 'TOML GitHub Specification', url: 'https://github.com/toml-lang/toml', description: 'Official repository with the standard specification, edge cases, and formal grammar.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'TOML Spec (toml.io)', url: 'https://toml.io/en/', description: 'Clean overview of TOML syntax: key/value pairs, tables, arrays, and data types.' },
      { title: 'Learn TOML in Y Minutes', url: 'https://learnxinyminutes.com/toml/', description: 'A rapid code-commentary walkthrough demonstrating every TOML feature.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'TOML to JSON Converter', url: 'https://pseitz.github.io/toml-to-json-online-converter/', description: 'Interactive playground to write TOML and instantly see how it resolves.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'TOML Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=toml+configuration+file', description: 'Free video tutorials covering TOML syntax and usage in real projects.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Python pyproject.toml Guide', url: 'https://packaging.python.org/en/latest/guides/writing-pyproject-toml/', description: 'Practical deep-dive into real-world TOML configuration files.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'TOML Cheat Sheet (QuickRef)', url: 'https://quickref.me/toml.html', description: 'Clean syntax-focused reference with TOML elements and JSON equivalents.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'TOML GitHub Releases', url: 'https://github.com/toml-lang/toml/releases', description: 'TOML specification releases and version updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'TOML GitHub Discussions', url: 'https://github.com/toml-lang/toml/discussions', description: 'Forum for TOML design discussions and parser questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PURESCRIPT
// ═══════════════════════════════════════════════════════════════════════

export const purescriptResources: LanguageResources = {
  slug: 'purescript', name: 'PureScript',
  description: 'PureScript is a strongly-typed, purely functional programming language that compiles to JavaScript. It features algebraic data types, type classes, and a sophisticated type system inspired by Haskell, making it ideal for building reliable web applications.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'PureScript by Example', url: 'https://book.purescript.org/', description: 'The official free book by language creator Phil Freeman covering everything from basics to advanced functional patterns.' },
      { title: 'Learn PureScript in Y Minutes', url: 'https://learnxinyminutes.com/purescript/', description: 'A quick single-page syntax and language reference guide.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'PureScript Official Site', url: 'https://www.purescript.org/', description: 'Central hub with quick start guides, compiler installation, and tool recommendations.' },
      { title: 'Pursuit Package Database', url: 'https://pursuit.purescript.org/', description: 'Official searchable repository of all PureScript packages and library documentation.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Exercism - PureScript Track', url: 'https://exercism.org/tracks/purescript', description: '31 hands-on coding exercises with mentor feedback.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'PureScript Community YouTube', url: 'https://www.youtube.com/c/PureScriptCommunity', description: 'Conference talks, walkthroughs, and introductory functional programming content.' },
      { title: 'LambdaConf PureScript Workshop', url: 'https://www.youtube.com/watch?v=LqYfdmb0eUU', description: 'Workshop recording by Phil Freeman providing intuitive introduction to PureScript.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Exercism - PureScript Track', url: 'https://exercism.org/tracks/purescript', description: 'Free structured exercises for learning PureScript.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'PureScript Docs (GitHub)', url: 'https://github.com/purescript/documentation', description: 'Community-maintained documentation and compiler guides.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'PureScript Discourse', url: 'https://discourse.purescript.org/', description: 'Community forum for updates, proposals, and announcements.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'PureScript Discourse', url: 'https://discourse.purescript.org/', description: 'Primary forum for technical discussions and community announcements.' },
      { title: 'Reddit r/purescript', url: 'https://www.reddit.com/r/purescript/', description: 'Community for PureScript news and discussions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SASS
// ═══════════════════════════════════════════════════════════════════════

export const sassResources: LanguageResources = {
  slug: 'sass', name: 'Sass',
  description: 'Sass (Syntactically Awesome Style Sheets) is a mature, stable CSS extension language that adds variables, nesting, mixins, functions, and modularity to CSS. It is the most popular CSS preprocessor in the world.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Sass Guide (Official)', url: 'https://sass-lang.com/guide/', description: 'The official guide covering variables, nesting, partials, modules, mixins, and inheritance.' },
      { title: 'Sass Basics (CSS-Tricks)', url: 'https://css-tricks.com/sass-guide/', description: 'A comprehensive beginner-friendly guide to Sass from the community experts at CSS-Tricks.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Sass Language Docs', url: 'https://sass-lang.com/documentation/', description: 'Complete official documentation covering syntax, at-rules, built-in modules, and configuration.' },
      { title: 'Sass Playground', url: 'https://www.sassmeister.com/', description: 'Online editor to write Sass and see compiled CSS instantly.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'freeCodeCamp - Sass Course', url: 'https://www.freecodecamp.org/news/learn-sass-now/', description: 'Free comprehensive Sass tutorial from freeCodeCamp covering all key features.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Sass Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=_a5j7KbN0qA', description: 'Multi-hour Sass course covering fundamentals through advanced patterns.' },
      { title: 'Sass Tutorial (The Net Ninja)', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9iGYgmEd2dm3zH0F1D4o1Yb', description: 'Beginner-friendly playlist covering Sass from scratch.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'SassMeister', url: 'https://www.sassmeister.com/', description: 'Online Sass playground with real-time compilation to CSS.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Sass Cheatsheet (devhints)', url: 'https://devhints.io/sass', description: 'A concise one-page reference for Sass syntax and features.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Sass Blog', url: 'https://sass-lang.com/blog/', description: 'Official Sass blog with release notes and community updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Sass GitHub Discussions', url: 'https://github.com/sass/sass/discussions', description: 'Community discussions on Sass language design.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// LESS
// ═══════════════════════════════════════════════════════════════════════

export const lessResources: LanguageResources = {
  slug: 'less', name: 'Less',
  description: 'Less is a CSS pre-processor that extends CSS with dynamic behavior such as variables, mixins, operations, and functions. It runs on both client and server side, making CSS more maintainable and extensible.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Less Documentation (Official)', url: 'https://lesscss.org/', description: 'The official Less documentation with features overview, usage guide, and language reference.' },
      { title: 'Less CSS Guide (freeCodeCamp)', url: 'https://www.freecodecamp.org/news/less-css-tutorial/', description: 'A beginner-friendly tutorial covering Less CSS variables, mixins, nesting, and operations.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Less CSS Docs', url: 'https://lesscss.org/features/', description: 'Complete official features documentation covering all Less language constructs.' },
      { title: 'Less Functions Reference', url: 'https://lesscss.org/functions/', description: 'Complete reference of all built-in Less functions for colors, math, strings, and more.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Less CSS Tutorial (TutorialsPoint)', url: 'https://www.tutorialspoint.com/less/index.htm', description: 'Free interactive Less CSS tutorial with hands-on examples.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Less CSS Tutorial (YouTube)', url: 'https://www.youtube.com/results?search_query=less+css+tutorial', description: 'Free video tutorials covering Less CSS from basics to advanced patterns.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Less2CSS Playground', url: 'https://lesscss.org/less-preview/', description: 'Official Less preview editor to test Less code in the browser.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Less Cheatsheet', url: 'https://devhints.io/less', description: 'A concise one-page reference for Less CSS syntax.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Less GitHub Releases', url: 'https://github.com/less/less.js/releases', description: 'Less.js release notes and changelog.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Less GitHub', url: 'https://github.com/less/less.js', description: 'Official Less.js repository for issues and discussions.' },
      { title: 'Stack Overflow - Less Tag', url: 'https://stackoverflow.com/questions/tagged/less', description: 'Q&A for Less CSS questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// PUG
// ═══════════════════════════════════════════════════════════════════════

export const pugResources: LanguageResources = {
  slug: 'pug', name: 'Pug',
  description: 'Pug is a high-performance template engine heavily influenced by Haml, implemented in JavaScript for Node.js and browsers. Its clean, whitespace-sensitive syntax dramatically reduces HTML boilerplate and supports powerful features like mixins, includes, and template inheritance.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Official Pug Documentation', url: 'https://pugjs.org/', description: 'The primary source for syntax, language features, and runtime API documentation.' },
      { title: 'Getting Started with Pug', url: 'https://pugjs.org/api/getting-started.html', description: 'Official getting started guide covering installation and compilation.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Pug Tags Reference', url: 'https://pugjs.org/language/tags.html', description: 'Complete reference for Pug tags, indentation, block expansion, and self-closing elements.' },
      { title: 'Pug Attributes & Code', url: 'https://pugjs.org/language/attributes.html', description: 'Reference for attributes, JavaScript expressions, and class literals.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'CodePen (Pug Mode)', url: 'https://codepen.io/', description: 'Interactive playground with Pug as the HTML preprocessor for testing templates.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Pug Template Engine Tutorial (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=kt3cEjjkCZA', description: 'Comprehensive beginner course covering Express integration, templates, and mixins.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'HTML to Pug Converter', url: 'https://html-to-pug.com/', description: 'Online converter to understand how HTML translates to Pug syntax.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Pug Cheatsheet (Devhints)', url: 'https://devhints.io/pug', description: 'Ultra-concise one-page reference for Pug syntax, attributes, and mixins.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Pug GitHub', url: 'https://github.com/pugjs/pug', description: 'Official repository tracking bug fixes, features, and releases.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Pug GitHub Discussions', url: 'https://github.com/pugjs/pug/discussions', description: 'Community forum for troubleshooting and feature discussions.' },
      { title: 'Stack Overflow - Pug Tag', url: 'https://stackoverflow.com/questions/tagged/pug', description: 'Q&A for Pug template engine questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// JINJA
// ═══════════════════════════════════════════════════════════════════════

export const jinjaResources: LanguageResources = {
  slug: 'jinja', name: 'Jinja',
  description: 'Jinja is a modern, designer-friendly templating language for Python, inspired by Django templates. It is the standard for Flask web development, Ansible automation, and widely used for configuration generation and documentation.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Jinja Official Documentation', url: 'https://jinja.palletsprojects.com/', description: 'The central hub for Jinja with template designer docs, API reference, and FAQ.' },
      { title: 'Primer on Jinja Templating (Real Python)', url: 'https://realpython.com/primer-on-jinja-templating/', description: 'Extensive step-by-step tutorial covering standalone usage, loops, and Flask integration.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Jinja Template Designer Docs', url: 'https://jinja.palletsprojects.com/en/stable/templates/', description: 'Definitive syntax reference covering control structures, filters, and inheritance.' },
      { title: 'Jinja API Reference', url: 'https://jinja.palletsprojects.com/en/stable/api/', description: 'For developers embedding Jinja into Python applications.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Real Python Jinja Video Course', url: 'https://realpython.com/courses/jinja-templating/', description: '11-lesson, 1-hour video course covering template basics, tags, and inheritance.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Jinja Templating Intro (YouTube)', url: 'https://www.youtube.com/watch?v=OraYXEr0Irg', description: 'Popular video walkthrough demonstrating Jinja text processing and web routing.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Codecademy Learn Flask: Jinja2', url: 'https://www.codecademy.com/learn/learn-flask-jinja2-templates-and-forms', description: 'Hands-on Flask + Jinja2 course with guided project.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Jinja Cheatsheet (Devhints)', url: 'https://devhints.io/jinja', description: 'Fast one-page reference for Jinja syntax, filters, and template tags.' },
      { title: 'Jinja2 Cheat Sheet (OpenSource)', url: 'https://opensource.com/downloads/jinja2-cheat-sheet', description: 'Downloadable PDF reference for common Jinja operations.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Pallets Project Blog', url: 'https://palletsprojects.com/blog/', description: 'Jinja and Pallets ecosystem release announcements.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/learnpython', url: 'https://www.reddit.com/r/learnpython/', description: 'Community for Jinja and Python templating questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// NIX
// ═══════════════════════════════════════════════════════════════════════

export const nixResources: LanguageResources = {
  slug: 'nix', name: 'Nix',
  description: 'Nix is a purely functional package management language that powers NixOS and the Nix package manager. It enables reproducible builds, declarative system configuration, and portable development environments.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Nix Pills', url: 'https://nixos.org/guides/nix-pills/', description: 'The definitive step-by-step tutorial series teaching Nix from the ground up.' },
      { title: 'nix.dev', url: 'https://nix.dev/', description: 'Official Nix documentation hub with tutorials, guides, and best practices.' },
      { title: 'NixOS Manual', url: 'https://nixos.org/manual/nixos/stable/', description: 'Official NixOS manual covering installation, configuration, and package management.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Nix Reference Manual', url: 'https://nixos.org/manual/nix/stable/', description: 'Complete reference manual for the Nix package manager and language.' },
      { title: 'Nixpkgs Manual', url: 'https://nixos.org/manual/nixpkgs/stable/', description: 'Reference for using and contributing to the Nixpkgs collection.' },
      { title: 'Nix Language Tour', url: 'https://nix.dev/tutorials/nix-language/', description: 'Interactive tour of the Nix expression language.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Zero to Nix', url: 'https://zero-to-nix.com/', description: 'Interactive guide to learning Nix from absolute beginner to productive user.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Nix Tutorials (YouTube)', url: 'https://www.youtube.com/results?search_query=nix+package+manager+tutorial', description: 'Community video tutorials covering Nix language, flakes, and NixOS configuration.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Nix Playground', url: 'https://nix-playground.com/', description: 'Online Nix expression playground for testing and experimentation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Nix Cheatsheet', url: 'https://nixos.wiki/wiki/Cheatsheet', description: 'NixOS wiki cheatsheet for Nix commands and expressions.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'NixOS Weekly', url: 'https://weekly.nixos.org/', description: 'Weekly newsletter tracking Nix ecosystem updates and community news.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/NixOS', url: 'https://www.reddit.com/r/NixOS/', description: 'Large community for NixOS and Nix discussions.' },
      { title: 'NixOS Discourse', url: 'https://discourse.nixos.org/', description: 'Official community forum for support and technical discussions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// DOCKER
// ═══════════════════════════════════════════════════════════════════════

export const dockerResources: LanguageResources = {
  slug: 'docker', name: 'Docker',
  description: 'Docker is the industry standard for containerized application development. It enables developers to package applications with all dependencies into standardized units for seamless deployment across any environment.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Docker Developer Guide', url: 'https://docs.docker.com/guides/', description: 'Official Docker developer guides covering containerization from basics to production.' },
      { title: 'Docker Curriculum', url: 'https://docker-curriculum.com/', description: 'A free comprehensive tutorial teaching Docker fundamentals through practical examples.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Docker Docs', url: 'https://docs.docker.com/', description: 'Complete official documentation covering CLI, compose, Dockerfile, and deployment.' },
      { title: 'Dockerfile Reference', url: 'https://docs.docker.com/reference/dockerfile/', description: 'Complete Dockerfile instruction reference with best practices.' },
      { title: 'Docker Compose Reference', url: 'https://docs.docker.com/compose/compose-file/', description: 'Complete Compose file specification for multi-container applications.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Play with Docker', url: 'https://labs.play-with-docker.com/', description: 'Free interactive browser-based Docker playground with pre-configured environments.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Docker Course for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=fqMOX6JJhGo', description: 'Comprehensive multi-hour Docker course covering containers, images, and Docker Compose.' },
      { title: 'Docker Tutorial (TechWorld with Nana)', url: 'https://www.youtube.com/watch?v=3c-iBn73dDE', description: 'Popular Docker crash course for beginners covering all essential concepts.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Docker Playground', url: 'https://labs.play-with-docker.com/', description: 'Free Docker environment in the browser for hands-on practice.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Docker Cheatsheet (devhints)', url: 'https://devhints.io/docker', description: 'A concise one-page reference for Docker CLI commands and Dockerfile syntax.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Docker Blog', url: 'https://www.docker.com/blog/', description: 'Official Docker blog with product updates, best practices, and community stories.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Docker Community Forums', url: 'https://forums.docker.com/', description: 'Official Docker community discussion forum.' },
      { title: 'Stack Overflow - Docker Tag', url: 'https://stackoverflow.com/questions/tagged/docker', description: 'Q&A for Docker troubleshooting and best practices.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// KUBERNETES
// ═══════════════════════════════════════════════════════════════════════

export const kubernetesResources: LanguageResources = {
  slug: 'kubernetes', name: 'Kubernetes',
  description: 'Kubernetes (K8s) is the industry standard for container orchestration, automating deployment, scaling, and management of containerized applications across clusters. It is the backbone of modern cloud-native infrastructure.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Official Kubernetes Docs', url: 'https://kubernetes.io/docs/home/', description: 'The primary reference manual for concepts, tutorials, tasks, and API references.' },
      { title: 'Kubernetes: Up & Running (Free Chapters)', url: 'https://github.com/piyush1146115/Kubernetes-Up-and-Running', description: 'Free companion code and excerpts from the O\'Reilly book by Burns, Beda, and Hightower.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Kubernetes Concepts', url: 'https://kubernetes.io/docs/concepts/', description: 'Core concepts: pods, services, deployments, configmaps, and volumes.' },
      { title: 'Kubernetes Tasks', url: 'https://kubernetes.io/docs/tasks/', description: 'Step-by-step guides for common Kubernetes operations and administration.' },
      { title: 'kubectl Quick Reference', url: 'https://kubernetes.io/docs/reference/kubectl/quick-reference/', description: 'Official kubectl command index with verbs, flags, and shorthand aliases.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Kubernetes Basics Tutorial', url: 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', description: 'Official browser-based interactive kubernetes basic tutorials.' },
      { title: 'Play with Kubernetes', url: 'https://labs.play-with-k8s.com/', description: 'Free browser-based playground to spin up multi-node Kubernetes clusters.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Complete Kubernetes Course (YouTube)', url: 'https://www.youtube.com/watch?v=2T86xAtR6Fo', description: 'Comprehensive free Kubernetes course for beginners.' },
      { title: 'CNCF YouTube Channel', url: 'https://www.youtube.com/@cncf', description: 'KubeCon talks, Cloud Native Live sessions, and architectural explainers.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Killercoda K8s Scenarios', url: 'https://killercoda.com/playgrounds/scenario/kubernetes', description: 'Free browser-based K8s scenarios and sandboxes for exam-aligned practice.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'kubectl Cheat Sheet', url: 'https://kubernetes.io/docs/reference/kubectl/cheatsheet/', description: 'Official kubectl cheatsheet with common commands and examples.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Kubernetes Podcast', url: 'https://kubernetespodcast.com/', description: 'Weekly interview and news program from the Google K8s team.' },
      { title: 'CNCF Blog', url: 'https://www.cncf.io/blog/', description: 'Cloud Native Computing Foundation updates and ecosystem news.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/kubernetes', url: 'https://www.reddit.com/r/kubernetes/', description: 'The premier discussion hub for architecture debates and troubleshooting.' },
      { title: 'K8s Community Hub', url: 'https://kubernetes.io/community/', description: 'Official community resources including Slack, meetups, and KCDs.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ANSIBLE
// ═══════════════════════════════════════════════════════════════════════

export const ansibleResources: LanguageResources = {
  slug: 'ansible', name: 'Ansible',
  description: 'Ansible is a radically simple IT automation engine that automates cloud provisioning, configuration management, application deployment, and task automation. It uses a simple YAML-based language that is human-readable.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Ansible Community Documentation', url: 'https://docs.ansible.com/projects/ansible/latest/index.html', description: 'Official Ansible docs with syntax, architecture, and comprehensive guides.' },
      { title: 'Ansible: Up & Running (Code Samples)', url: 'https://github.com/ansiblebook/ansiblebook', description: 'Free companion code and configuration samples from the O\'Reilly book.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Ansible Collection Index', url: 'https://docs.ansible.com/projects/ansible/latest/collections/index.html', description: 'Complete index of all core modules, plugins, and command references.' },
      { title: 'Ansible Playbook Docs', url: 'https://docs.ansible.com/projects/ansible/latest/playbook_guide/playbooks_intro.html', description: 'Official playbook guide covering variables, roles, and templating.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Ansible Workshops (Red Hat)', url: 'https://github.com/ansible/workshops', description: 'Complete curriculum with structured scenarios covering infrastructure and cloud.' },
      { title: 'Red Hat DO007 Free Course', url: 'https://www.redhat.com/en/blog/new-free-ansible-course', description: 'Official Red Hat free Ansible Automation Platform introduction course.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Ansible Full Course (YouTube)', url: 'https://www.youtube.com/results?search_query=ansible+full+course', description: 'Zero-to-hero video series covering playbooks, inventory, and automation.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Red Hat Interactive Labs', url: 'https://www.redhat.com/en/blog/new-free-ansible-course', description: 'Free self-paced interactive environments for testing Ansible playbooks.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Ansible CLI Cheatsheet', url: 'https://docs.ansible.com/projects/ansible/latest/command_guide/cheatsheet.html', description: 'Official Ansible CLI cheatsheet for quick syntax lookups.' },
      { title: 'Ansible Cheat Sheet (Spacelift)', url: 'https://spacelift.io/blog/ansible-cheat-sheet', description: 'Comprehensive reference for ad-hoc commands, playbooks, and roles.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'The Bullhorn Newsletter', url: 'https://forum.ansible.com/', description: 'Official weekly Ansible community newsletter.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Ansible Community Forum', url: 'https://forum.ansible.com/', description: 'Main hub for troubleshooting, discussions, and project announcements.' },
      { title: 'Reddit r/ansible', url: 'https://www.reddit.com/r/ansible/', description: 'Active community for peer troubleshooting and real-world advice.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// LLVM
// ═══════════════════════════════════════════════════════════════════════

export const llvmResources: LanguageResources = {
  slug: 'llvm', name: 'LLVM',
  description: 'LLVM is a collection of modular and reusable compiler and toolchain technologies. It provides the intermediate representation (LLVM IR) and backend infrastructure used by Clang, Rust, Swift, and many other compilers.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Official LLVM Tutorial: Kaleidoscope', url: 'https://llvm.org/docs/tutorial/', description: 'Step-by-step tutorial building a complete language frontend with LLVM API.' },
      { title: 'LLVM Guide (GitHub)', url: 'https://github.com/mikeroyal/LLVM-Guide', description: 'Curated community resource cataloging tools and applications for LLVM development.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Getting Started with LLVM', url: 'https://llvm.org/docs/GettingStarted.html', description: 'Covers checking out sources, requirements, and building LLVM from scratch.' },
      { title: 'LLVM Language Reference Manual', url: 'https://llvm.org/docs/LangRef.html', description: 'The ultimate specification for LLVM IR: instruction set, types, and semantics.' },
      { title: 'LLVM Programmer\'s Manual', url: 'https://llvm.org/docs/ProgrammersManual.html', description: 'Crucial classes, patterns, and interfaces in the LLVM source base.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Compiler Explorer (Godbolt)', url: 'https://godbolt.org/', description: 'Industry-standard platform to compile C/C++/Rust into LLVM IR side-by-side.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Official LLVM YouTube Channel', url: 'https://www.youtube.com/@LLVMPROJ', description: 'Deep-dive engineering talks from LLVM Developers\' Meetings.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Alive2 Compiler Explorer', url: 'https://alive2.llvm.org/ce/', description: 'Interactive verification environment for LLVM IR optimizations.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'LLVM IR Quick Reference', url: 'https://simplifycpp.org/books/Assembly/LLVM_IR_Quick_Reference.pdf', description: 'Condensed reference for LLVM IR syntax, assembly, and intrinsics.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'LLVM Weekly', url: 'https://llvmweekly.org/', description: 'Weekly newsletter summarizing code commits, RFCs, and release notes.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'LLVM Discourse Forum', url: 'https://discourse.llvm.org/', description: 'Official home for community support, RFCs, and design discussions.' },
      { title: 'Reddit r/LLVM', url: 'https://www.reddit.com/r/LLVM/', description: 'Active community for compiler development questions and projects.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// REACT
// ═══════════════════════════════════════════════════════════════════════

export const reactResources: LanguageResources = {
  slug: 'react', name: 'React',
  description: 'React is the most popular frontend library for building user interfaces, developed by Meta. It uses a component-based architecture with a virtual DOM to build fast, interactive web applications at scale.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'React Docs (Beta)', url: 'https://react.dev/', description: 'The official React documentation with interactive tutorials, API references, and best practices.' },
      { title: 'React Handbook (freeCodeCamp)', url: 'https://www.freecodecamp.org/news/the-react-handbook/', description: 'A comprehensive free handbook covering React hooks, components, state, and patterns.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'React.dev', url: 'https://react.dev/learn', description: 'The official learning guide covering React from basics to advanced patterns with interactive examples.' },
      { title: 'React API Reference', url: 'https://react.dev/reference/react', description: 'Complete API reference for all React hooks, components, and built-in functions.' },
      { title: 'React GitHub', url: 'https://github.com/facebook/react', description: 'The open-source React repository with RFCs and changelogs.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Scrimba Learn React', url: 'https://scrimba.com/learn-react-c0jrrpaasr', description: 'Free interactive React course with hands-on coding in the browser.' },
      { title: 'The Odin Project React', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/react', description: 'Free open-source React curriculum with project-based learning.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'React Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=w7ejDZ8SWv8', description: 'Multi-hour React course covering hooks, state management, and real-world projects.' },
      { title: 'React Tutorial (Net Ninja)', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9g0ELT6R4w5s5N7tFJhjmKQ', description: 'Beginner-friendly React playlist with practical examples.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'React Playground', url: 'https://playcode.io/react/', description: 'Online React playground for testing components and ideas instantly.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'React Cheatsheet (devhints)', url: 'https://devhints.io/react', description: 'A concise one-page reference for React hooks, lifecycle, and JSX.' },
      { title: 'React TypeScript Cheatsheet', url: 'https://react-typescript-cheatsheet.netlify.app/', description: 'Comprehensive reference for using React with TypeScript.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'React Blog', url: 'https://react.dev/blog', description: 'Official React blog with release announcements, RFCs, and community updates.' },
      { title: 'React Newsletter', url: 'https://reactnewsletter.com/', description: 'Weekly curated React news, articles, and libraries.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/reactjs', url: 'https://www.reddit.com/r/reactjs/', description: 'The largest React community for news, discussions, and project showcases.' },
      { title: 'React Discord', url: 'https://discord.gg/react', description: 'Official React Discord server for real-time community Q&A.' },
      { title: 'React DevTools', url: 'https://react.dev/learn/react-developer-tools', description: 'Official browser extension for debugging React applications.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// VUE.JS
// ═══════════════════════════════════════════════════════════════════════

export const vueResources: LanguageResources = {
  slug: 'vue', name: 'Vue.js',
  description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UIs on the web. Its core library focuses on the view layer only, making it easy to integrate with other libraries or existing projects.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Vue.js Official Guide', url: 'https://vuejs.org/guide/introduction.html', description: 'The definitive official guide covering Vue 3, Composition API, and advanced patterns.' },
      { title: 'LearnVue Guides', url: 'https://learnvue.co/', description: 'Detailed written tutorials covering state management, routing, and component architecture.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Vue.js Docs', url: 'https://vuejs.org/', description: 'Complete official documentation with interactive tutorial, API reference, and migration guides.' },
      { title: 'Vue Router Docs', url: 'https://router.vuejs.org/', description: 'Official routing solution for Vue.js with dynamic route matching and navigation guards.' },
      { title: 'Pinia State Management', url: 'https://pinia.vuejs.org/', description: 'Official Vue state management library with full TypeScript support.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Scrimba Learn Vue', url: 'https://scrimba.com/learn-vue-c0jrrpaasr', description: 'Free interactive intro course with browser-based code editing.' },
      { title: 'Vue.js Tutorial (freeCodeCamp)', url: 'https://www.freecodecamp.org/news/search/?query=vue', description: 'Free project-based Vue.js tutorials and full courses.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Vue.js 3 Playlist (Net Ninja)', url: 'https://www.youtube.com/playlist?list=PL4cUxeGkcC9hYYGbV60Vq3IXYNfDk8At1', description: 'Structured YouTube series covering Options API, Router, and Composition API.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Vue SFC Playground', url: 'https://play.vuejs.org/', description: 'Official Vue single-file component playground for testing in the browser.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Vue Cheatsheets (Vue School)', url: 'https://vueschool.io/cheatsheets', description: 'Free downloadable quick-reference guides for Vue 3, Pinia, and Composition API.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Vue.js Blog', url: 'https://vuejs.org/', description: 'Official release notes, RFCs, and ecosystem updates from the core team.' },
      { title: 'Awesome Vue', url: 'https://github.com/vuejs/awesome-vue', description: 'Curated list of Vue ecosystem libraries, plugins, and tools.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/vuejs', url: 'https://www.reddit.com/r/vuejs/', description: 'Active community for Vue discussions, projects, and debugging.' },
      { title: 'Vue Land Discord', url: 'https://discord.gg/vue', description: 'Official Discord community for real-time Vue help.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// ANGULAR
// ═══════════════════════════════════════════════════════════════════════

export const angularResources: LanguageResources = {
  slug: 'angular', name: 'Angular',
  description: 'Angular is a platform for building mobile and desktop web applications, developed by Google. It provides a complete solution with routing, forms, HTTP client, and testing utilities built in.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Angular Documentation', url: 'https://angular.dev/', description: 'The official Angular documentation with interactive guides, tutorials, and API reference.' },
      { title: 'Angular Handbook (freeCodeCamp)', url: 'https://www.freecodecamp.org/news/search/?query=angular', description: 'Free Angular tutorials and courses covering components, services, and routing.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Angular Tutorial (Tour of Heroes)', url: 'https://angular.dev/tutorials/learn-angular', description: 'The official step-by-step tutorial teaching Angular fundamentals through building an app.' },
      { title: 'Angular CLI Reference', url: 'https://angular.dev/cli', description: 'Complete Angular CLI command reference for generating and building projects.' },
      { title: 'Angular API Reference', url: 'https://angular.dev/api', description: 'Complete API documentation for all Angular packages.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Angular.dev Tutorials', url: 'https://angular.dev/tutorials', description: 'Official interactive tutorials teaching Angular through hands-on exercises.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Angular Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=3dHNOWTI7H8', description: 'Comprehensive Angular course covering components, services, and reactive forms.' },
      { title: 'Angular Tutorial for Beginners', url: 'https://www.youtube.com/playlist?list=PLIjdNHWULhPSZf6iP5_WMBNuGZZLYk5pz', description: 'Step-by-step Angular tutorial series for beginners.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Angular Playground', url: 'https://stackblitz.com/', description: 'Online editor with Angular templates for rapid prototyping.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Angular Cheatsheet', url: 'https://angular.dev/cheatsheet', description: 'Official Angular quick reference for syntax, directives, and decorators.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Angular Blog', url: 'https://blog.angular.dev/', description: 'Official Angular blog with version releases and feature updates.' },
      { title: 'Angular Weekly', url: 'https://angularexperts.io/', description: 'Weekly Angular news and ecosystem updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/Angular', url: 'https://www.reddit.com/r/Angular2/', description: 'Community for Angular discussions, project showcases, and troubleshooting.' },
      { title: 'Angular Discord', url: 'https://discord.gg/angular', description: 'Official Angular Discord server for community Q&A.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// SVELTE
// ═══════════════════════════════════════════════════════════════════════

export const svelteResources: LanguageResources = {
  slug: 'svelte', name: 'Svelte',
  description: 'Svelte is a revolutionary frontend compiler that shifts the work from the browser to the build step. It produces highly optimized vanilla JavaScript, resulting in smaller bundles and better performance.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Svelte Tutorial (Official)', url: 'https://svelte.dev/tutorial/', description: 'The official interactive Svelte tutorial covering everything from basics to advanced patterns.' },
      { title: 'Svelte Docs', url: 'https://svelte.dev/docs/', description: 'Complete Svelte documentation with guides and API references.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Svelte.dev', url: 'https://svelte.dev/', description: 'Official Svelte site with interactive tutorial, docs, and examples.' },
      { title: 'SvelteKit Docs', url: 'https://kit.svelte.dev/docs/', description: 'Official SvelteKit documentation for building full-stack applications.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Svelte Tutorial', url: 'https://svelte.dev/tutorial/', description: 'Free interactive browser-based tutorial teaching Svelte from scratch.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Svelte Course (freeCodeCamp)', url: 'https://www.youtube.com/results?search_query=svelte+full+course', description: 'Free multi-hour Svelte video course for beginners.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Svelte Playground', url: 'https://svelte.dev/playground/', description: 'Official Svelte playground for testing components in the browser.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Svelte Cheatsheet', url: 'https://devhints.io/svelte', description: 'Quick reference for Svelte syntax, reactivity, and component patterns.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Svelte Blog', url: 'https://svelte.dev/blog/', description: 'Official Svelte blog with release notes and community highlights.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/sveltejs', url: 'https://www.reddit.com/r/sveltejs/', description: 'Community for Svelte discussions and project showcases.' },
      { title: 'Svelte Discord', url: 'https://discord.gg/svelte', description: 'Official Svelte Discord server.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// NODE.JS
// ═══════════════════════════════════════════════════════════════════════

export const nodejsResources: LanguageResources = {
  slug: 'nodejs', name: 'Node.js',
  description: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine that enables server-side JavaScript. It powers millions of backends, APIs, and microservices with its event-driven, non-blocking I/O model.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Node.js Learn Guides', url: 'https://nodejs.org/learn', description: 'Official Node.js tutorial hub covering HTTP servers, file system, async patterns, and more.' },
      { title: 'Node.js Best Practices', url: 'https://github.com/goldbergyoni/nodebestpractices', description: 'The largest compilation of production-grade Node.js best practices and architecture tips.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Node.js API Reference', url: 'https://nodejs.org/api/', description: 'Complete API documentation for all core modules: fs, http, crypto, stream, and path.' },
      { title: 'Node.js Release Schedule', url: 'https://nodejs.org/en/about/previous-releases', description: 'LTS release cycle information for production deployment planning.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'The Odin Project Node.js', url: 'https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs', description: 'Free open-source Node.js curriculum with real-world projects.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Node.js Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=Oe421EPjeBE', description: 'Multi-hour Node.js and Express.js course covering backend development.' },
      { title: 'Node.js Crash Course (Traversy Media)', url: 'https://www.youtube.com/watch?v=fBNz5xF-Kx4', description: 'Popular Node.js crash course covering essential concepts.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Node.js Playground', url: 'https://runkit.com/', description: 'Online Node.js playground for testing code snippets in the browser.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Node.js Cheatsheet', url: 'https://devhints.io/nodejs', description: 'A concise one-page reference for Node.js modules and patterns.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Node.js Blog', url: 'https://nodejs.org/en/blog/', description: 'Official Node.js blog with release notes and security announcements.' },
      { title: 'Node Weekly', url: 'https://nodeweekly.com/', description: 'Weekly newsletter covering Node.js articles, tutorials, and tools.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Node.js GitHub', url: 'https://github.com/nodejs/node', description: 'Official Node.js repository with issues and discussions.' },
      { title: 'Reddit r/node', url: 'https://www.reddit.com/r/node/', description: 'Largest Node.js community for discussions and project showcases.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// EXPRESS.JS
// ═══════════════════════════════════════════════════════════════════════

export const expressResources: LanguageResources = {
  slug: 'express', name: 'Express.js',
  description: 'Express is the most popular web framework for Node.js, providing a robust set of features for web and mobile applications. It is minimal, flexible, and the foundation for many Node.js frameworks.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Express Official Docs', url: 'https://expressjs.com/', description: 'The official Express documentation with getting started guide, API reference, and advanced topics.' },
      { title: 'Express Guide (MDN)', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs', description: 'MDN comprehensive tutorial on building Express applications with Node.js.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Express API Reference', url: 'https://expressjs.com/en/api.html', description: 'Complete API documentation for Express: routing, middleware, request/response, and error handling.' },
      { title: 'Express Middleware List', url: 'https://expressjs.com/en/resources/middleware.html', description: 'Official list of Express middleware modules for sessions, cookies, CORS, and more.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'MDN Express Tutorial', url: 'https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs', description: 'Free interactive tutorial creating a complete Express application.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Express.js Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=SccSCuHhOw0', description: 'Comprehensive Express.js course covering REST APIs, middleware, and databases.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Express Todo App Tutorial', url: 'https://expressjs.com/en/starter/hello-world.html', description: 'Start with the official hello world example and build from there.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Express Cheatsheet', url: 'https://devhints.io/express', description: 'Quick reference for Express routes, middleware, and response methods.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Express GitHub Releases', url: 'https://github.com/expressjs/express/releases', description: 'Express.js release notes and changelog.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Express GitHub', url: 'https://github.com/expressjs/express', description: 'Official Express repository with issues and community discussions.' },
      { title: 'Stack Overflow - Express Tag', url: 'https://stackoverflow.com/questions/tagged/express', description: 'Q&A for Express.js questions and troubleshooting.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// FLUTTER
// ═══════════════════════════════════════════════════════════════════════

export const flutterResources: LanguageResources = {
  slug: 'flutter', name: 'Flutter',
  description: 'Flutter is Google\'s UI toolkit for building beautiful, natively compiled applications for mobile, web, and desktop from a single codebase. It uses the Dart language and provides a rich set of built-in widgets.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Flutter Learn Docs', url: 'https://docs.flutter.dev/learn', description: 'Official Flutter learning hub covering setup, building apps, and writing Dart code.' },
      { title: 'Flutter Codelabs', url: 'https://docs.flutter.dev/reference/learning-resources', description: 'Guided hands-on tutorials covering everything from first app to advanced animations.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Flutter.dev', url: 'https://flutter.dev/', description: 'Official Flutter website with docs, API reference, and widget catalog.' },
      { title: 'Flutter Widget Catalog', url: 'https://docs.flutter.dev/ui/widgets', description: 'Complete catalog of Flutter widgets organized by category.' },
      { title: 'Flutter API Reference', url: 'https://api.flutter.dev/', description: 'Complete Dart API reference for Flutter framework and engine.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Google Codelabs (Flutter)', url: 'https://codelabs.developers.google.com/', description: 'Free interactive Flutter coding labs from Google covering various topics.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Flutter Full Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=pTJJsmejUOQ', description: 'Multi-hour Flutter crash course covering architecture, widgets, and state management.' },
      { title: 'Flutter 37-Hour Course (Vandad)', url: 'https://www.freecodecamp.org/news/learn-flutter-full-course/', description: 'Massive zero-to-hero Flutter course covering Dart, state management, Firebase, and deployment.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'DartPad', url: 'https://dartpad.dev/', description: 'Official browser-based Dart and Flutter playground for testing code online.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Flutter Cheatsheet', url: 'https://www.docuwriter.ai/flutter-cheat-sheet', description: 'Quick reference for Flutter widgets, layout patterns, and state management.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Flutter Blog', url: 'https://flutter.dev/blog', description: 'Official Flutter blog with release notes and engineering updates.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/FlutterDev', url: 'https://www.reddit.com/r/FlutterDev/', description: 'Large Flutter community for package updates and technical discussions.' },
      { title: 'Flutter Discord', url: 'https://discord.gg/flutter', description: 'Official Flutter Discord community.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// LINUX
// ═══════════════════════════════════════════════════════════════════════

export const linuxResources: LanguageResources = {
  slug: 'linux', name: 'Linux',
  description: 'Linux is the most widely used operating system for servers, cloud infrastructure, embedded systems, and increasingly desktops. It powers everything from Android phones to supercomputers worldwide.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Linux Journey', url: 'https://linuxjourney.com/', description: 'The best free interactive guide to learning Linux from basics to advanced system administration.' },
      { title: 'The Linux Command Line (PDF)', url: 'https://linuxcommand.org/tlcl.php', description: 'A free book by William Shotts covering Linux command line basics and shell scripting.' },
      { title: 'Arch Linux Wiki', url: 'https://wiki.archlinux.org/', description: 'The most comprehensive Linux documentation resource covering almost every Linux topic.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Linux Kernel Documentation', url: 'https://www.kernel.org/doc/html/latest/', description: 'Official Linux kernel documentation covering architecture, drivers, and subsystems.' },
      { title: 'Linux Foundation Training', url: 'https://training.linuxfoundation.org/resources/', description: 'Free Linux training materials, courses, and certifications from the Linux Foundation.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Linux Journey', url: 'https://linuxjourney.com/', description: 'Interactive browser-based Linux learning with hands-on exercises.' },
      { title: 'Linux Survival', url: 'https://linuxsurvival.com/', description: 'Free interactive Linux tutorial for absolute beginners.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Linux Course for Beginners (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=HbgzrKJvKPw', description: 'Multi-hour Linux course covering command line, file system, and administration.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Linux Playground', url: 'https://bellard.org/jslinux/', description: 'Browser-based Linux terminal for practicing commands without installation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Linux Command Cheatsheet', url: 'https://devhints.io/linux', description: 'A concise one-page reference for essential Linux commands and bash scripting.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Linux Foundation Blog', url: 'https://www.linuxfoundation.org/blog/', description: 'Linux Foundation news and open-source community updates.' },
      { title: 'Phoronix', url: 'https://www.phoronix.com/', description: 'Leading Linux hardware reviews, benchmarks, and kernel development news.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/linux', url: 'https://www.reddit.com/r/linux/', description: 'The largest Linux community on Reddit for news and discussions.' },
      { title: 'Stack Overflow - Linux Tag', url: 'https://stackoverflow.com/questions/tagged/linux', description: 'Q&A for Linux command line and administration questions.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// POSTGRESQL
// ═══════════════════════════════════════════════════════════════════════

export const postgresqlResources: LanguageResources = {
  slug: 'postgresql', name: 'PostgreSQL',
  description: 'PostgreSQL is the worlds most advanced open-source relational database. It features ACID transactions, extensible data types, full-text search, and powerful indexing capabilities for production workloads.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'PostgreSQL Official Docs', url: 'https://www.postgresql.org/docs/', description: 'The definitive manual covering everything from installation to server internals and optimization.' },
      { title: 'PostgreSQL Tutorial (TutorialsPoint)', url: 'https://www.tutorialspoint.com/postgresql/index.htm', description: 'Comprehensive online guide covering fundamentals, database design, and advanced features.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'PostgreSQL Manual', url: 'https://www.postgresql.org/docs/current/', description: 'Complete reference for SQL syntax, server configuration, and PL/pgSQL.' },
      { title: 'Awesome Postgres (GitHub)', url: 'https://github.com/dhamaniasad/awesome-postgres', description: 'Curated list of PostgreSQL software, tools, and resources.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'PG Exercises', url: 'https://www.pgexercises.com/', description: 'Free interactive PostgreSQL exercises from basic SELECT to complex joins.' },
      { title: 'Crunchy Data Tutorials', url: 'https://www.crunchydata.com/developers/tutorials', description: 'Interactive Postgres playground with sample datasets and structured guides.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'PostgreSQL Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=qw--VYLpxG4', description: 'Comprehensive PostgreSQL course covering SQL, indexes, and optimization.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'PG Exercises', url: 'https://www.pgexercises.com/', description: 'Hands-on SQL practice with real-time query evaluation.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'PostgreSQL Cheatsheet', url: 'https://devhints.io/postgresql', description: 'A concise one-page reference for PostgreSQL SQL commands and psql meta-commands.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Planet PostgreSQL', url: 'https://planet.postgresql.org/', description: 'Official blog aggregator with articles from core developers and experts.' },
      { title: 'PostgreSQL Weekly', url: 'https://postgresweekly.com/', description: 'Weekly newsletter covering PostgreSQL news, tools, and tutorials.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Reddit r/PostgreSQL', url: 'https://www.reddit.com/r/PostgreSQL/', description: 'Active community for troubleshooting and architecture advice.' },
      { title: 'PostgreSQL Community Hub', url: 'https://www.postgresql.org/community/', description: 'Official community resources including mailing lists and user groups.' },
    ]},
  ],
};

// ═══════════════════════════════════════════════════════════════════════
// REDIS
// ═══════════════════════════════════════════════════════════════════════

export const redisResources: LanguageResources = {
  slug: 'redis', name: 'Redis',
  description: 'Redis is an open-source, in-memory data structure store used as a database, cache, message broker, and streaming engine. It supports strings, hashes, lists, sets, sorted sets, and more with sub-millisecond latency.',
  categories: [
    { label: 'Free Books', icon: 'book', items: [
      { title: 'Redis Official Docs', url: 'https://redis.io/docs/', description: 'Complete Redis documentation covering commands, data types, and client libraries.' },
      { title: 'Redis Crash Course', url: 'https://redis.io/docs/getting-started/', description: 'Official getting started guide for Redis fundamentals.' },
    ]},
    { label: 'Official Documentation', icon: 'docs', items: [
      { title: 'Redis Commands Reference', url: 'https://redis.io/commands/', description: 'Complete reference for all Redis commands organized by data type.' },
      { title: 'Redis Data Types', url: 'https://redis.io/docs/data-types/', description: 'Documentation for Redis data structures: strings, lists, sets, hashes, sorted sets, and streams.' },
    ]},
    { label: 'Interactive Courses', icon: 'code', items: [
      { title: 'Try Redis', url: 'https://try.redis.io/', description: 'Interactive browser-based Redis tutorial with hands-on command exercises.' },
    ]},
    { label: 'Video Courses', icon: 'video', items: [
      { title: 'Redis Course (freeCodeCamp)', url: 'https://www.youtube.com/watch?v=G1rOthIU-uo', description: 'Free Redis course covering caching, pub/sub, and data persistence.' },
    ]},
    { label: 'Practice & Challenges', icon: 'terminal', items: [
      { title: 'Redis Playground', url: 'https://try.redis.io/', description: 'Online Redis playground to practice commands in the browser.' },
    ]},
    { label: 'Reference & Cheatsheets', icon: 'reference', items: [
      { title: 'Redis Commands Cheatsheet', url: 'https://devhints.io/redis', description: 'A concise one-page reference for common Redis commands.' },
    ]},
    { label: 'News & Updates', icon: 'news', items: [
      { title: 'Redis Blog', url: 'https://redis.io/blog/', description: 'Official Redis blog with release notes and technical articles.' },
    ]},
    { label: 'Community', icon: 'community', items: [
      { title: 'Redis Discord', url: 'https://discord.gg/redis', description: 'Official Redis community Discord server.' },
      { title: 'Stack Overflow - Redis Tag', url: 'https://stackoverflow.com/questions/tagged/redis', description: 'Q&A for Redis command and architecture questions.' },
    ]},
  ],
};
// ─── Registry — all languages with curated resources ────────────────

const RESOURCE_REGISTRY: Record<string, LanguageResources> = {
  javascript: javascriptResources,
  python: pythonResources,
  typescript: typescriptResources,
  java: javaResources,
  cpp: cppResources,
  kotlin: kotlinResources,
  swift: swiftResources,
  ruby: rubyResources,
  php: phpResources,
  csharp: csharpResources,
  go: goResources,
  rust: rustResources,
  scala: scalaResources,
  r: rResources,
  dart: dartResources,
  elixir: elixirResources,
  haskell: haskellResources,
  lua: luaResources,
  shell: shellResources,
  c: cResources,
  matlab: matlabResources,
  julia: juliaResources,
  perl: perlResources,
  fortran: fortranResources,
  groovy: groovyResources,
  clojure: clojureResources,
  erlang: erlangResources,
  assembly: assemblyResources,
  cobol: cobolResources,
  ocaml: ocamlResources,
  fsharp: fsharpResources,
  crystal: crystalResources,
  nim: nimResources,
  zig: zigResources,
  v: vResources,
  d: dResources,
  racket: racketResources,
  scheme: schemeResources,
  prolog: prologResources,
  sql: sqlResources,
  elm: elmResources,
  graphql: graphqlResources,
  gleam: gleamResources,
  solidity: solidityResources,
  webassembly: webassemblyResources,
  ada: adaResources,
  haxe: haxeResources,
  terraform: terraformResources,
  markdown: markdownResources,
  latex: latexResources,
  'common-lisp': commonlispResources,
  processing: processingResources,
  scratch: scratchResources,
  'wolfram-language': wolframResources,
  gdscript: gdscriptResources,
  labview: labviewResources,
  autohotkey: ahkResources,
  json: jsonResources,
  toml: tomlResources,
  purescript: purescriptResources,
  sass: sassResources,
  less: lessResources,
  pug: pugResources,
  jinja: jinjaResources,
  nix: nixResources,
  docker: dockerResources,
  kubernetes: kubernetesResources,
  ansible: ansibleResources,
  llvm: llvmResources,
  react: reactResources,
  vue: vueResources,
  angular: angularResources,
  svelte: svelteResources,
  nodejs: nodejsResources,
  express: expressResources,
  flutter: flutterResources,
  linux: linuxResources,
  postgresql: postgresqlResources,
  redis: redisResources,
};

export function getLanguageResources(slug: string): LanguageResources | null {
  return RESOURCE_REGISTRY[slug] || null;
}

export function getLanguagesWithResources(): string[] {
  return Object.keys(RESOURCE_REGISTRY);
}
