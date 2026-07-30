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
          title: 'You Don\'t Know JS Yet',
          url: 'https://github.com/getify/you-dont-know-js',
          description:
            'An in-depth series exploring the core mechanisms and deep nuances of JavaScript — closures, prototypes, async, and more.',
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
            'Official repository tracking all ECMAScript proposals through the standardization pipeline. See what\'s coming next.',
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
            'freeCodeCamp\'s curated playlist covering the full stack — HTML, CSS, JavaScript, Node.js, React, and databases.',
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
            'The umbrella organization for community-driven JavaScript conferences worldwide. Watch talks from past events.',
        },
      ],
    },
  ],
};

// ─── Registry — all languages with curated resources ────────────────

const RESOURCE_REGISTRY: Record<string, LanguageResources> = {
  javascript: javascriptResources,
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
