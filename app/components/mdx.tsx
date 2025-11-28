// @ts-nocheck
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { getMDXComponent } from "next-contentlayer/hooks";
import Mermaid from "./mermaid";

function clsx(...args: (string | undefined | null | false)[]) {
	return args.filter(Boolean).join(" ");
}
const components = {
	h1: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h1
			className={clsx(
				"mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h2: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h2
			className={clsx(
				"mt-10 scroll-m-20 border-b border-b-zinc-800 pb-1 text-3xl font-semibold tracking-tight first:mt-0",
				className,
			)}
			{...props}
		/>
	),
	h3: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h3
			className={clsx(
				"mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h4: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h4
			className={clsx(
				"mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h5: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h5
			className={clsx(
				"mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	h6: ({ className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
		<h6
			className={clsx(
				"mt-8 scroll-m-20 text-base font-semibold tracking-tight",
				className,
			)}
			{...props}
		/>
	),
	a: ({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
		<Link
			className={clsx(
				"font-medium text-zinc-900 underline underline-offset-4",
				className,
			)}
			// rome-ignore lint/suspicious/noExplicitAny: Props spreading
			{...props as any}
		/>
	),
	p: ({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
		<p
			className={clsx("leading-7 [&:not(:first-child)]:mt-6", className)}
			{...props}
		/>
	),
	ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
		<ul className={clsx("my-6 ml-6 list-disc", className)} {...props} />
	),
	ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
		<ol className={clsx("my-6 ml-6 list-decimal", className)} {...props} />
	),
	li: ({ className, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
		<li className={clsx("mt-2", className)} {...props} />
	),
	blockquote: ({ className, ...props }: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
		<blockquote
			className={clsx(
				"mt-6 border-l-2 border-zinc-300 pl-6 italic text-zinc-800 [&>*]:text-zinc-600",
				className,
			)}
			{...props}
		/>
	),
	img: ({
		className,
		alt,
		...props
	}: React.ImgHTMLAttributes<HTMLImageElement> & { alt: string }) => (
		// eslint-disable-next-line @next/next/no-img-element
		// rome-ignore lint/a11y/useAltText: Alt text is provided via props
		<img
			className={clsx("rounded-md border border-zinc-200", className)}
			alt={alt}
			{...props}
		/>
	),
	hr: ({ ...props }: React.HTMLAttributes<HTMLHRElement>) => (
		<hr className="my-4 border-zinc-200 md:my-8" {...props} />
	),
	table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
		<div className="w-full my-6 overflow-y-auto">
			<table className={clsx("w-full", className)} {...props} />
		</div>
	),
	tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
		<tr
			className={clsx(
				"m-0 border-t border-zinc-300 p-0 even:bg-zinc-100",
				className,
			)}
			{...props}
		/>
	),
	th: ({ className, ...props }: React.ThHTMLAttributes<HTMLTableCellElement>) => (
		<th
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	td: ({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) => (
		<td
			className={clsx(
				"border border-zinc-200 px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
				className,
			)}
			{...props}
		/>
	),
	pre: ({ className, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
		<pre
			className={clsx(
				"mt-6 mb-4 overflow-x-auto rounded-lg bg-zinc-900 py-4",
				className,
			)}
			{...props}
		/>
	),
	code: ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => (
		<code
			className={clsx(
				"relative rounded border bg-zinc-300 bg-opacity-25 py-[0.2rem] px-[0.3rem] font-mono text-sm text-zinc-600",
				className,
			)}
			{...props}
		/>
	),
	div: ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
		// Check if this is a mermaid diagram div
		if (className?.includes("mermaid-diagram")) {
			// rome-ignore lint/suspicious/noExplicitAny: Dynamic access to props
			const chartData = (props as any)["data-mermaid"] || (props as any)["dataMermaid"];
			// console.log("Detected mermaid-diagram div:", {
			// 	className,
			// 	hasDataMermaid: !!props["data-mermaid"],
			// 	hasDataMermaidCamelCase: !!props["dataMermaid"],
			// 	chartDataLength: chartData?.length,
			// 	allProps: Object.keys(props),
			// });
			if (chartData) {
				return <Mermaid chart={chartData} />;
			}
		}
		return <div className={className} {...props} />;
	},
	Image,
	// rome-ignore lint/suspicious/noExplicitAny: Mermaid component type mismatch
	Mermaid: Mermaid as any,
};

interface MdxProps {
	code: string;
}

export function Mdx({ code }: MdxProps) {
	const Component = getMDXComponent(code);

	return (
		<div className="mdx">
			<Component components={components} />
		</div>
	);
}
