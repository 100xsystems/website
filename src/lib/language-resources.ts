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
};

export function getLanguageResources(slug: string): LanguageResources | null {
  return RESOURCE_REGISTRY[slug] || null;
}

export function getLanguagesWithResources(): string[] {
  return Object.keys(RESOURCE_REGISTRY);
}
