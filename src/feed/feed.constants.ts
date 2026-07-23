import type { FeedSource } from './feed.types';

/**
 * Registry of engineering blogs we track.
 *
 * ETHICAL NOTE: We store only the metadata about each blog (name, RSS URL,
 * tags). We NEVER store the actual article content. When a user browses the
 * feed, we fetch RSS data on-the-fly and return it ephemerally.
 *
 * To add a new feed: submit a PR adding an entry here.
 */
export const FEED_REGISTRY: FeedSource[] = [
  {
    id: 'netflix-tech-blog',
    name: 'Netflix Tech Blog',
    rssUrl: 'https://netflixtechblog.com/feed',
    siteUrl: 'https://netflixtechblog.com',
    tags: ['distributed-systems', 'infrastructure', 'streaming'],
    description:
      'Engineering insights from Netflix — performance, CDN, chaos engineering, and large-scale distributed systems.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'stripe-engineering',
    name: 'Stripe Engineering',
    rssUrl: 'https://stripe.com/blog/feed.rss',
    siteUrl: 'https://stripe.com/blog',
    tags: ['payments', 'architecture', 'api-design'],
    description:
      'How Stripe builds payment infrastructure at global scale — API design, reliability, and developer experience.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'cloudflare-blog',
    name: 'Cloudflare Blog',
    rssUrl: 'https://blog.cloudflare.com/rss',
    siteUrl: 'https://blog.cloudflare.com',
    tags: ['networking', 'security', 'performance', 'edge-computing'],
    description:
      'Deep technical posts on CDN, DDoS protection, edge computing, and internet infrastructure from Cloudflare.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'discord-engineering',
    name: 'Discord Engineering',
    rssUrl: 'https://discord.com/category/engineering/rss.xml',
    siteUrl: 'https://discord.com/category/engineering',
    tags: ['backend', 'infrastructure', 'real-time'],
    description:
      'How Discord scales real-time communication for 150M+ monthly users — from Go to Rust, from Cassandra to ScyllaDB.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'uber-engineering',
    name: 'Uber Engineering',
    rssUrl: 'https://www.uber.com/en-IN/blog/engineering/feed',
    siteUrl: 'https://www.uber.com/blog/engineering',
    tags: ['distributed-systems', 'infrastructure', 'mobile'],
    description:
      'Scalable systems, microservices, data platform, and mobile engineering at Uber scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'meta-engineering',
    name: 'Engineering at Meta',
    rssUrl: 'https://engineering.fb.com/feed',
    siteUrl: 'https://engineering.fb.com',
    tags: ['infrastructure', 'ai', 'performance', 'distributed-systems'],
    description:
      'Technical deep-dives from Meta engineers working on infrastructure, AI/ML, and systems at planetary scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'martin-fowler',
    name: 'Martin Fowler',
    rssUrl: 'https://martinfowler.com/feed.atom',
    siteUrl: 'https://martinfowler.com',
    tags: ['architecture', 'patterns', 'refactoring', 'design'],
    description:
      'Thought leader in software architecture — microservices, refactoring, and enterprise patterns.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'aws-architecture',
    name: 'AWS Architecture Blog',
    rssUrl: 'https://aws.amazon.com/blogs/architecture/feed',
    siteUrl: 'https://aws.amazon.com/blogs/architecture',
    tags: ['cloud', 'architecture', 'aws'],
    description:
      'Reference architectures, best practices, and design patterns from the AWS solutions architecture team.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'grafana-labs',
    name: 'Grafana Labs',
    rssUrl: 'https://grafana.com/blog/index.xml',
    siteUrl: 'https://grafana.com/blog',
    tags: ['observability', 'monitoring', 'data-visualization'],
    description:
      'Observability, monitoring, and visualization — Grafana, Prometheus, Loki, and Tempo engineering.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'slack-engineering',
    name: 'Slack Engineering',
    rssUrl: 'https://slack.engineering/feed',
    siteUrl: 'https://slack.engineering',
    tags: ['backend', 'infrastructure', 'real-time'],
    description:
      'How Slack builds reliable real-time messaging at enterprise scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'figma-engineering',
    name: 'Figma Engineering',
    rssUrl: 'https://www.figma.com/blog/feed',
    siteUrl: 'https://www.figma.com/blog',
    tags: ['frontend', 'systems', 'webassembly', 'collaboration'],
    description:
      'Building a real-time collaborative design tool in the browser — WebAssembly, CRDTs, and performance.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'tailscale-blog',
    name: 'Tailscale Blog',
    rssUrl: 'https://tailscale.com/blog/index.xml',
    siteUrl: 'https://tailscale.com/blog',
    tags: ['networking', 'security', 'vpn', 'wireguard'],
    description:
      'Building modern VPN and networking infrastructure — WireGuard, NAT traversal, and mesh networking.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'cockroachdb',
    name: 'CockroachDB',
    rssUrl: 'https://www.cockroachlabs.com/blog/index.xml',
    siteUrl: 'https://www.cockroachlabs.com/blog',
    tags: ['databases', 'distributed-systems', 'sql'],
    description:
      'Building a distributed, survivable SQL database — consensus, replication, and transactions at scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'apple-ml-research',
    name: 'Apple Machine Learning Research',
    rssUrl: 'https://machinelearning.apple.com/rss.xml',
    siteUrl: 'https://machinelearning.apple.com',
    tags: ['machine-learning', 'ai', 'research'],
    description:
      'Apple ML research publications — on-device AI, computer vision, NLP, and privacy-preserving machine learning.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'svelte-blog',
    name: 'Svelte Blog',
    rssUrl: 'https://svelte.dev/blog/rss.xml',
    siteUrl: 'https://svelte.dev/blog',
    tags: ['frontend', 'javascript', 'compiler'],
    description:
      'Updates and deep-dives on the Svelte compiler and framework from the core team.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'vercel-blog',
    name: 'Vercel Blog',
    rssUrl: 'https://vercel.com/blog/rss.xml',
    siteUrl: 'https://vercel.com/blog',
    tags: ['frontend', 'infrastructure', 'edge-computing', 'nextjs'],
    description:
      'Frontend infrastructure, edge computing, and the Next.js ecosystem from the Vercel team.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'github-engineering',
    name: 'GitHub Engineering',
    rssUrl: 'https://github.blog/engineering/feed',
    siteUrl: 'https://github.blog/engineering',
    tags: ['infrastructure', 'developer-tools', 'platform'],
    description:
      'How GitHub builds and scales the world\'s largest code hosting platform.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'datadog-engineering',
    name: 'Datadog Engineering',
    rssUrl: 'https://www.datadoghq.com/blog/engineering/feed',
    siteUrl: 'https://www.datadoghq.com/blog/engineering',
    tags: ['observability', 'monitoring', 'infrastructure'],
    description:
      'Building observability and monitoring infrastructure at global scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'clickhouse',
    name: 'ClickHouse Blog',
    rssUrl: 'https://clickhouse.com/blog/rss',
    siteUrl: 'https://clickhouse.com/blog',
    tags: ['databases', 'analytics', 'performance'],
    description:
      'Engineering blog for the fastest open-source column-oriented database management system.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'pinecone-engineering',
    name: 'Pinecone Engineering',
    rssUrl: 'https://www.pinecone.io/blog/rss.xml',
    siteUrl: 'https://www.pinecone.io/blog',
    tags: ['ai', 'vector-databases', 'infrastructure'],
    description:
      'Building vector database infrastructure for production AI applications.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'cloudflare-workers',
    name: 'Cloudflare Workers Blog',
    rssUrl: 'https://blog.cloudflare.com/tag/workers/rss',
    siteUrl: 'https://blog.cloudflare.com/tag/workers',
    tags: ['serverless', 'edge-computing', 'javascript'],
    description:
      'Deep dives into serverless computing at the edge using Cloudflare Workers.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL Blog',
    rssUrl: 'https://www.postgresql.org/community/feeds/blogs.rss',
    siteUrl: 'https://www.postgresql.org/blog',
    tags: ['databases', 'sql', 'open-source'],
    description:
      'Community blog from the PostgreSQL Global Development Group.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'redis-blog',
    name: 'Redis Engineering',
    rssUrl: 'https://redis.io/blog/rss',
    siteUrl: 'https://redis.io/blog',
    tags: ['databases', 'caching', 'performance'],
    description:
      'Engineering insights from the Redis team on caching, data structures, and performance.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'nasa-software',
    name: 'NASA Software Engineering',
    rssUrl: 'https://www.nasa.gov/feeds/technology',
    siteUrl: 'https://www.nasa.gov/technology',
    tags: ['software-engineering', 'research', 'systems'],
    description:
      'Software engineering practices and research from NASA - from mission-critical systems to robotics.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'traefik',
    name: 'Traefik Labs',
    rssUrl: 'https://traefik.io/blog/rss',
    siteUrl: 'https://traefik.io/blog',
    tags: ['networking', 'cloud-native', 'infrastructure'],
    description:
      'Cloud-native networking, API gateways, and service mesh from the Traefik team.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'istio',
    name: 'Istio Blog',
    rssUrl: 'https://istio.io/latest/blog/feed.xml',
    siteUrl: 'https://istio.io/latest/blog',
    tags: ['networking', 'cloud-native', 'service-mesh'],
    description:
      'Service mesh, traffic management, and security patterns from the Istio project.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'deno-blog',
    name: 'Deno Blog',
    rssUrl: 'https://deno.com/blog/feed.xml',
    siteUrl: 'https://deno.com/blog',
    tags: ['javascript', 'runtime', 'security'],
    description:
      'Building a secure JavaScript/TypeScript runtime - from V8 integration to web platform APIs.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'bun-blog',
    name: 'Bun Blog',
    rssUrl: 'https://bun.sh/blog/rss.xml',
    siteUrl: 'https://bun.sh/blog',
    tags: ['javascript', 'performance', 'runtime'],
    description:
      'Building the fastest JavaScript runtime - bundler, transpiler, and package manager all in one.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'rust-blog',
    name: 'Rust Blog',
    rssUrl: 'https://blog.rust-lang.org/feed.xml',
    siteUrl: 'https://blog.rust-lang.org',
    tags: ['systems-programming', 'compiler', 'performance'],
    description:
      'Official blog of the Rust programming language - language design, compiler updates, and ecosystem.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'airbnb-engineering',
    name: 'Airbnb Engineering',
    rssUrl: 'https://medium.com/feed/airbnb-engineering',
    siteUrl: 'https://medium.com/airbnb-engineering',
    tags: ['infrastructure', 'platform', 'mobile'],
    description:
      'How Airbnb builds and scales infrastructure for millions of travelers worldwide.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'dropbox-engineering',
    name: 'Dropbox Engineering',
    rssUrl: 'https://dropbox.tech/feed',
    siteUrl: 'https://dropbox.tech',
    tags: ['distributed-systems', 'storage', 'infrastructure'],
    description:
      'Engineering deep-dives from Dropbox — distributed storage, sync, and collaboration at scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'spotify-engineering',
    name: 'Spotify Engineering',
    rssUrl: 'https://engineering.atspotify.com/feed/',
    siteUrl: 'https://engineering.atspotify.com',
    tags: ['backend', 'infrastructure', 'platform'],
    description:
      'How Spotify builds and operates its global music streaming platform.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'linkedin-engineering',
    name: 'LinkedIn Engineering',
    rssUrl: 'https://engineering.linkedin.com/blog.rss',
    siteUrl: 'https://engineering.linkedin.com/blog',
    tags: ['infrastructure', 'ai', 'distributed-systems'],
    description:
      'Engineering insights from LinkedIn — AI, data infrastructure, and social platform at scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'hashicorp',
    name: 'HashiCorp Blog',
    rssUrl: 'https://www.hashicorp.com/blog/feed.xml',
    siteUrl: 'https://www.hashicorp.com/blog',
    tags: ['cloud-native', 'infrastructure', 'devops'],
    description:
      'Cloud infrastructure automation — Terraform, Vault, Consul, and Nomad engineering.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'mongodb',
    name: 'MongoDB Blog',
    rssUrl: 'https://www.mongodb.com/blog/rss',
    siteUrl: 'https://www.mongodb.com/blog',
    tags: ['databases', 'performance', 'cloud'],
    description:
      'Building the most popular document database — distributed systems and data platform engineering.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'elastic',
    name: 'Elastic Blog',
    rssUrl: 'https://www.elastic.co/blog/feed',
    siteUrl: 'https://www.elastic.co/blog',
    tags: ['search', 'observability', 'security'],
    description:
      'Building Elasticsearch, Kibana, and the Elastic Stack for search, observability, and security.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'julia-evans',
    name: 'Julia Evans',
    rssUrl: 'https://jvns.ca/atom.xml',
    siteUrl: 'https://jvns.ca',
    tags: ['systems-programming', 'networking', 'debugging'],
    description:
      'Zines and deep-dives on systems, networking, debugging — making complex topics accessible.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'dan-luu',
    name: 'Dan Luu',
    rssUrl: 'https://danluu.com/atom.xml',
    siteUrl: 'https://danluu.com',
    tags: ['systems-programming', 'performance', 'software-engineering'],
    description:
      'Hard-hitting analysis on systems performance, software quality, and engineering culture.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'sentry',
    name: 'Sentry Blog',
    rssUrl: 'https://blog.sentry.io/feed',
    siteUrl: 'https://blog.sentry.io',
    tags: ['observability', 'debugging', 'performance'],
    description:
      'Error monitoring and application performance engineering from the Sentry team.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'posthog',
    name: 'PostHog Blog',
    rssUrl: 'https://posthog.com/blog/rss.xml',
    siteUrl: 'https://posthog.com/blog',
    tags: ['startups', 'open-source', 'product-engineering'],
    description:
      'Building an open-source product analytics platform — from startup to scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'sourcegraph',
    name: 'Sourcegraph Blog',
    rssUrl: 'https://about.sourcegraph.com/blog/rss.xml',
    siteUrl: 'https://about.sourcegraph.com/blog',
    tags: ['developer-tools', 'code-search', 'platform'],
    description:
      'Building universal code search and AI-powered code intelligence.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'stack-overflow',
    name: 'Stack Overflow Blog',
    rssUrl: 'https://stackoverflow.blog/feed',
    siteUrl: 'https://stackoverflow.blog',
    tags: ['developer-tools', 'community', 'platform'],
    description:
      'Engineering and community insights from the world\'s largest developer Q&A platform.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'jetbrains',
    name: 'JetBrains Blog',
    rssUrl: 'https://blog.jetbrains.com/feed',
    siteUrl: 'https://blog.jetbrains.com',
    tags: ['developer-tools', 'ide', 'programming-languages'],
    description:
      'Engineering and product updates from the team behind IntelliJ, PyCharm, and Kotlin.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'docker',
    name: 'Docker Blog',
    rssUrl: 'https://www.docker.com/blog/feed/',
    siteUrl: 'https://www.docker.com/blog',
    tags: ['containers', 'devops', 'cloud-native'],
    description:
      'Containerization, Docker Engine, and cloud-native application development.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'digitalocean',
    name: 'DigitalOcean Blog',
    rssUrl: 'https://www.digitalocean.com/blog/feed',
    siteUrl: 'https://www.digitalocean.com/blog',
    tags: ['cloud', 'infrastructure', 'devops'],
    description:
      'Cloud infrastructure, tutorials, and engineering insights from DigitalOcean.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'confluent',
    name: 'Confluent Blog',
    rssUrl: 'https://www.confluent.io/blog/feed',
    siteUrl: 'https://www.confluent.io/blog',
    tags: ['distributed-systems', 'streaming', 'kafka'],
    description:
      'Apache Kafka and event streaming platform — distributed systems engineering at scale.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'databricks',
    name: 'Databricks Blog',
    rssUrl: 'https://www.databricks.com/blog/feed',
    siteUrl: 'https://www.databricks.com/blog',
    tags: ['ai', 'data-platform', 'spark'],
    description:
      'Building the lakehouse platform — data engineering, ML, and AI infrastructure.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'nginx',
    name: 'NGINX Blog',
    rssUrl: 'https://www.nginx.com/blog/feed/',
    siteUrl: 'https://www.nginx.com/blog',
    tags: ['networking', 'web-server', 'performance'],
    description:
      'Web server, reverse proxy, API gateway, and performance engineering from NGINX.',
    addedBy: 'curator',
    language: 'en',
  },
  {
    id: 'redhat',
    name: 'Red Hat Blog',
    rssUrl: 'https://www.redhat.com/en/blog/feed',
    siteUrl: 'https://www.redhat.com/en/blog',
    tags: ['open-source', 'linux', 'cloud-native'],
    description:
      'Open-source infrastructure — Linux, Kubernetes, and enterprise open-source engineering.',
    addedBy: 'curator',
    language: 'en',
  },
];

/** All unique tags across all feeds, sorted alphabetically. */
export const ALL_TAGS = Array.from(
  new Set(FEED_REGISTRY.flatMap((f) => f.tags))
).sort();

/** Look up a feed by its ID. */
export function getFeedById(id: string): FeedSource | undefined {
  return FEED_REGISTRY.find((f) => f.id === id);
}
