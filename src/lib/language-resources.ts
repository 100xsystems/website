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
};

export function getLanguageResources(slug: string): LanguageResources | null {
  return RESOURCE_REGISTRY[slug] || null;
}

export function getLanguagesWithResources(): string[] {
  return Object.keys(RESOURCE_REGISTRY);
}
