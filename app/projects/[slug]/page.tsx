import { notFound } from "next/navigation";
import { allProjects } from "contentlayer/generated";
import { Mdx } from "@/app/components/mdx";
import { TableOfContents } from "@/app/components/table-of-contents";
import { Header } from "./header";
import "./mdx.css";
import { ReportView } from "./view";
import { Redis } from "@upstash/redis";

export const revalidate = 60;

type Props = {
  params: {
    slug: string;
  };
};

const redis = Redis.fromEnv();

export async function generateStaticParams(): Promise<Props["params"][]> {
  return allProjects
    .filter((p) => p.published)
    .map((p) => ({
      slug: p.slug,
    }));
}

export default async function PostPage({ params }: Props) {
  const slug = params?.slug;
  const project = allProjects.find((project) => project.slug === slug);

  if (!project) {
    notFound();
  }

  const views =
    (await redis.get<number>(["pageviews", "projects", slug].join(":"))) ?? 0;

  return (
    <div className="bg-zinc-50 min-h-screen">
      <Header project={project} views={views} />
      <ReportView slug={project.slug} />

      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-8 relative">
          {/* Main content */}
          <article className="flex-1 min-w-0 prose prose-zinc prose-quoteless">
            <Mdx code={project.body.code} />
          </article>

          {/* Table of Contents - sticky on the right */}
          <aside className="hidden xl:block w-64 flex-shrink-0">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </div>
  );
}
