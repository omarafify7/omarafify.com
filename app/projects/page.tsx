import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye } from "lucide-react";

const redis = Redis.fromEnv();

// Configuration: Manually specify the order of top 3 projects by title
// Projects will be matched by their title attribute from the MDX frontmatter
const TOP_PROJECTS_ORDER = [
  "Serverless Legal RAG Chatbot for Ontario Real Estate",
  "GraphRAG Clinical Guideline Assistant",
  "Knowledge Distillation for Semantic Segmentation",
];

export const revalidate = 60;
export default async function ProjectsPage() {
  const views = (
    await redis.mget<number[]>(
      ...allProjects.map((p) => ["pageviews", "projects", p.slug].join(":")),
    )
  ).reduce((acc, v, i) => {
    acc[allProjects[i].slug] = v ?? 0;
    return acc;
  }, {} as Record<string, number>);

  const publishedProjects = allProjects.filter((p) => p.published);
  
  if (publishedProjects.length === 0) {
    return (
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
              Projects
            </h2>
            <p className="mt-4 text-zinc-400">No projects available yet.</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Find projects matching the configured top 3 titles, in order
  const topProjects: typeof publishedProjects = [];
  for (const title of TOP_PROJECTS_ORDER) {
    const project = publishedProjects.find((p) => p.title === title);
    if (project) {
      topProjects.push(project);
    }
  }
  
  // Fallback: if we don't have 3 projects from the config, fill with featured projects
  // sorted by date (newest first), excluding those already in topProjects
  if (topProjects.length < 3) {
    const remainingFeatured = publishedProjects
      .filter((p) => p.featured && !topProjects.some((top) => top.slug === p.slug))
      .sort(
        (a, b) =>
          new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
          new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
      );
    
    // Fill remaining slots with featured projects
    const needed = 3 - topProjects.length;
    topProjects.push(...remainingFeatured.slice(0, needed));
  }
  
  // Final fallback: if still less than 3, fill with any published projects
  // sorted by date (newest first), excluding those already in topProjects
  if (topProjects.length < 3) {
    const remainingPublished = publishedProjects
      .filter((p) => !topProjects.some((top) => top.slug === p.slug))
      .sort(
        (a, b) =>
          new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
          new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
      );
    
    const needed = 3 - topProjects.length;
    topProjects.push(...remainingPublished.slice(0, needed));
  }
  
  const featured = topProjects[0]!;
  const top2 = topProjects[1] ?? topProjects[0]!;
  const top3 = topProjects[2] ?? topProjects[0]!;
  
  // All other published projects, excluding the top 3
  const sorted = publishedProjects
    .filter(
      (project) =>
        topProjects.every((top) => top.slug !== project.slug),
    )
    .sort(
      (a, b) =>
        new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
        new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
    );

  return (
    <div className="relative pb-16">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Projects
          </h2>
          <p className="mt-4 text-zinc-400">
            Some of the projects are from work and some are on my own time.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2 ">
          <Card>
            <Link href={`/projects/${featured.slug}`}>
              <article className="relative w-full h-full p-4 md:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="text-xs text-zinc-100">
                    {featured.date ? (
                      <time dateTime={new Date(featured.date).toISOString()}>
                        {Intl.DateTimeFormat(undefined, {
                          dateStyle: "medium",
                        }).format(new Date(featured.date))}
                      </time>
                    ) : (
                      <span>SOON</span>
                    )}
                  </div>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <Eye className="w-4 h-4" />{" "}
                    {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                      views[featured.slug] ?? 0,
                    )}
                  </span>
                </div>

                <h2
                  id="featured-post"
                  className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display"
                >
                  {featured.title}
                </h2>
                <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                  {featured.description}
                </p>
                <div className="absolute bottom-4 md:bottom-8">
                  <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                    Read more <span aria-hidden="true">&rarr;</span>
                  </p>
                </div>
              </article>
            </Link>
          </Card>

          <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0 ">
            {[top2, top3].map((project) => (
              <Card key={project.slug}>
                <Article project={project} views={views[project.slug] ?? 0} />
              </Card>
            ))}
          </div>
        </div>
        <div className="hidden w-full h-px md:block bg-zinc-800" />

        <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 0)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 1)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
          <div className="grid grid-cols-1 gap-4">
            {sorted
              .filter((_, i) => i % 3 === 2)
              .map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
