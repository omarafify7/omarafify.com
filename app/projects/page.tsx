import Link from "next/link";
import React from "react";
import { allProjects } from "contentlayer/generated";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import { Redis } from "@upstash/redis";
import { Eye, Star } from "lucide-react";

const redis = Redis.fromEnv();

// Configuration: Manually specify the order of top 3 projects by title
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

  // Identify Top Projects
  const topProjects = [];
  for (const title of TOP_PROJECTS_ORDER) {
    const project = publishedProjects.find((p) => p.title === title);
    if (project) {
      topProjects.push(project);
    }
  }

  // Group projects by category
  const projectsByCategory: Record<string, typeof publishedProjects> = {};

  // Sort by date first
  const sortedProjects = [...publishedProjects].sort(
    (a, b) =>
      new Date(b.date ?? Number.POSITIVE_INFINITY).getTime() -
      new Date(a.date ?? Number.POSITIVE_INFINITY).getTime(),
  );

  sortedProjects.forEach((project) => {
    const categories = project.category || ["Other"];
    const primaryCategory = categories[0] || "Other";

    if (!projectsByCategory[primaryCategory]) {
      projectsByCategory[primaryCategory] = [];
    }
    projectsByCategory[primaryCategory].push(project);
  });

  // Sort categories to put "Other" last
  const categories = Object.keys(projectsByCategory).sort((a, b) => {
    if (a === "Other") return 1;
    if (b === "Other") return -1;
    return a.localeCompare(b);
  });

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

        {/* Featured / Top Projects Section */}
        {topProjects.length > 0 && (
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-zinc-200 flex items-center gap-2">
              <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
              Highlighted Projects
            </h3>
            <div className="grid grid-cols-1 gap-8 mx-auto lg:grid-cols-2">
              <Card>
                <Link href={`/projects/${topProjects[0].slug}`}>
                  <article className="relative w-full h-full p-4 md:p-8">
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs text-zinc-100">
                        {topProjects[0].date ? (
                          <time dateTime={new Date(topProjects[0].date).toISOString()}>
                            {Intl.DateTimeFormat(undefined, {
                              dateStyle: "medium",
                            }).format(new Date(topProjects[0].date))}
                          </time>
                        ) : (
                          <span>SOON</span>
                        )}
                      </div>
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Eye className="w-4 h-4" />{" "}
                        {Intl.NumberFormat("en-US", { notation: "compact" }).format(
                          views[topProjects[0].slug] ?? 0,
                        )}
                      </span>
                    </div>

                    <h2 className="mt-4 text-3xl font-bold text-zinc-100 group-hover:text-white sm:text-4xl font-display">
                      {topProjects[0].title}
                    </h2>
                    <p className="mt-4 leading-8 duration-150 text-zinc-400 group-hover:text-zinc-300">
                      {topProjects[0].description}
                    </p>
                    <div className="absolute bottom-4 md:bottom-8">
                      <p className="hidden text-zinc-200 hover:text-zinc-50 lg:block">
                        Read more <span aria-hidden="true">&rarr;</span>
                      </p>
                    </div>
                  </article>
                </Link>
              </Card>

              <div className="flex flex-col w-full gap-8 mx-auto border-t border-gray-900/10 lg:mx-0 lg:border-t-0">
                {topProjects.slice(1, 3).map((project) => (
                  <Card key={project.slug}>
                    <Article project={project} views={views[project.slug] ?? 0} />
                  </Card>
                ))}
              </div>
            </div>
            <div className="w-full h-px bg-zinc-800" />
          </div>
        )}

        {/* Categorized Projects */}
        {categories.map((category) => (
          <div key={category} className="space-y-6">
            <h3 className="text-xl font-bold text-zinc-200 sticky top-20 bg-zinc-900/80 backdrop-blur-sm py-2 z-10">
              {category}
            </h3>
            <div className="grid grid-cols-1 gap-4 mx-auto lg:mx-0 md:grid-cols-3">
              {projectsByCategory[category].map((project) => (
                <Card key={project.slug}>
                  <Article project={project} views={views[project.slug] ?? 0} />
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
