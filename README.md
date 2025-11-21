# omarafify.com
A modern, high-performance portfolio engine built with Next.js 13, utilizing a custom MDX pipeline and edge-based analytics.

## Overview
This project is a personal portfolio and technical blog platform designed to showcase engineering projects and technical skills. Built on the Next.js 13 App Router, it features a custom content management system using MDX and Contentlayer. It includes a bespoke analytics system that leverages Redis on the Edge for privacy-preserving view tracking, ensuring high performance without relying on heavy third-party scripts.

## Features
- **Next.js 13 App Router:** Full utilization of React Server Components for optimal initial load performance.
- **Custom MDX Engine:** Semantic content processing with `remark` and `rehype` plugins for syntax highlighting, auto-linked headings, and interactive components.
- **Edge Analytics:** Custom view counting system using Upstash Redis with IP hashing for privacy-compliant deduplication.
- **Interactive Diagrams:** Integrated Mermaid.js support that renders code blocks into zoomable, interactive architecture diagrams.
- **Dynamic UI:** Canvas-based particle animations with mouse magnetism and Framer Motion transitions.
- **Type Safety:** End-to-end type safety for content schemas via Contentlayer and TypeScript.

## Architecture
The application is structured around the Next.js App Router, separating server-side data fetching from client-side interactivity.



### Core Pipelines
1.  **Content Pipeline:**
    * **Input:** MDX files with Frontmatter (YAML).
    * **Processing:** Contentlayer validates data against schemas. Remark/Rehype plugins transform Markdown ASTs (e.g., converting `mermaid` code blocks to React components).
    * **Output:** Statically generated JSON/Types ready for React hydration.

2.  **Analytics Pipeline:**
    * **Trigger:** Client-side `ReportView` component mounts on project pages.
    * **Edge API:** A `POST` request is sent to `/api/incr`.
    * **Deduplication:** The server hashes the user IP (SHA-256). A Redis `SET` command with `NX` (Only set if Not Exists) checks if this hash has been seen in the last 24 hours.
    * **Storage:** If unique, the view counter in Redis is incremented atomically.

## Tech Stack
- **Core:** TypeScript, Next.js 13 (App Router), React 18.
- **Content:** MDX, Contentlayer, Remark/Rehype ecosystem.
- **Data & Edge:** Upstash Redis (REST API), Vercel Edge Runtime.
- **Styling & UI:** Tailwind CSS, Framer Motion, Lucide React.
- **Visualization:** Mermaid.js, HTML5 Canvas (Particles).

## Setup & Usage

### Prerequisites
- Node.js 18+
- pnpm

### Installation
1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/omarafify/omarafify.com.git](https://github.com/omarafify/omarafify.com.git)
    cd omarafify.com
    ```

2.  **Install dependencies:**
    ```bash
    pnpm install
    ```

3.  **Configure Environment:**
    Create a `.env` file in the root directory:
    ```bash
    UPSTASH_REDIS_REST_URL=<your-upstash-url>
    UPSTASH_REDIS_REST_TOKEN=<your-upstash-token>
    NEXT_PUBLIC_BEAM_TOKEN=<optional-analytics-token>
    ```

4.  **Run Development Server:**
    ```bash
    pnpm dev
    ```
    The site will be available at `http://localhost:3000`.

5.  **Build for Production:**
    ```bash
    pnpm build
    pnpm start
    ```

## What I Learned
- **Edge Computing constraints:** Adapting API routes to the Vercel Edge Runtime required utilizing the `fetch` API and Redis REST client instead of standard Node.js TCP connections.
- **AST Transformations:** Gained deep insight into how compilers work by writing custom Rehype plugins to intercept HTML generation for Mermaid diagrams.
- **React Server Components:** Learned to effectively balance server-side rendering for SEO/Performance with client-side islands for interactivity (like the particle system).

## Future Improvements
- **Migration from Contentlayer:** Transition to Next.js Content Collections as Contentlayer is currently deprecated.
- **Search Functionality:** Implement a fuzzy-search algorithm to filter projects by tech stack or title.
- **Testing:** Add Playwright end-to-end tests to validate the analytics pipeline and diagram rendering.