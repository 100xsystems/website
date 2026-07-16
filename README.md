# 100xSystems Website

The public-facing website for 100xSystems — browse systems, view curriculum, track progress, and verify certificates.

Built with [Next.js](https://nextjs.org/) and deployed as a static site.

## How It Works

During build, the website:
1. Reads the [100xSystems Registry](https://github.com/100xsystems/registry) to discover all systems
2. Shallow-clones each system repository
3. Generates static pages for systems, tracks, modules, and lessons
4. Builds the site with the generated content

This means the website auto-discovers new systems as they're added to the registry.

## Development

```bash
npm install
npm run dev
```

Point `NEXT_PUBLIC_CURRICULUM_PATH` to a local clone of system repositories for offline development.

## Deployment

The site is deployed via [GitHub Pages](https://pages.github.com/) (or your preferred static host).
