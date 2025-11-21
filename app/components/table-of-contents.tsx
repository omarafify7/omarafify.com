"use client";
import { useEffect, useState } from "react";

interface Heading {
	id: string;
	text: string;
	level: number;
}

export function TableOfContents() {
	const [headings, setHeadings] = useState<Heading[]>([]);
	const [activeId, setActiveId] = useState<string>("");

	useEffect(() => {
		// Extract all h2 and h3 headings from the article
		const article = document.querySelector("article");
		if (!article) return;

		const headingElements = article.querySelectorAll("h2, h3");
		const headingData: Heading[] = [];

		headingElements.forEach((heading) => {
			const id = heading.id || heading.textContent?.toLowerCase().replace(/\s+/g, "-") || "";
			if (!heading.id) {
				heading.id = id;
			}

			headingData.push({
				id,
				text: heading.textContent || "",
				level: parseInt(heading.tagName.charAt(1)),
			});
		});

		setHeadings(headingData);
	}, []);

	useEffect(() => {
		// Track which heading is currently in view
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				});
			},
			{
				rootMargin: "-100px 0px -66% 0px",
			}
		);

		headings.forEach((heading) => {
			const element = document.getElementById(heading.id);
			if (element) {
				observer.observe(element);
			}
		});

		return () => {
			headings.forEach((heading) => {
				const element = document.getElementById(heading.id);
				if (element) {
					observer.unobserve(element);
				}
			});
		};
	}, [headings]);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			const yOffset = -80; // Offset for fixed header
			const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
			window.scrollTo({ top: y, behavior: "smooth" });
		}
	};

	if (headings.length === 0) {
		return null;
	}

	return (
		<nav className="hidden xl:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto">
			<div className="mb-4 text-sm font-semibold text-zinc-900">
				On this page
			</div>
			<ul className="space-y-2 text-sm">
				{headings.map((heading) => (
					<li
						key={heading.id}
						className={`${
							heading.level === 3 ? "pl-4" : ""
						}`}
					>
						<a
							href={`#${heading.id}`}
							onClick={(e) => handleClick(e, heading.id)}
							className={`block py-1 transition-colors hover:text-zinc-900 ${
								activeId === heading.id
									? "text-zinc-900 font-medium border-l-2 border-zinc-900 pl-3 -ml-3"
									: "text-zinc-600 hover:border-l-2 hover:border-zinc-400 pl-3 -ml-3"
							}`}
						>
							{heading.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

