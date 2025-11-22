"use client";
import { ArrowLeft, ArrowUp } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

export const Navigation: React.FC = () => {
	const ref = useRef<HTMLElement>(null);
	const [isIntersecting, setIntersecting] = useState(true);
	const [showBackToTop, setShowBackToTop] = useState(false);

	useEffect(() => {
		if (!ref.current) return;
		const observer = new IntersectionObserver(([entry]) =>
			setIntersecting(entry.isIntersecting),
		);

		observer.observe(ref.current);
		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 200) {
				setShowBackToTop(true);
			} else {
				setShowBackToTop(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<header ref={ref}>
			<div
				className={`fixed inset-x-0 top-0 z-50 backdrop-blur duration-200 border-b ${isIntersecting
						? "bg-zinc-900/0 border-transparent"
						: "bg-zinc-900/500 border-zinc-800"
					}`}
			>
				<div className="container flex flex-row-reverse items-center justify-between p-6 mx-auto">
					<div className="flex justify-between gap-8">
						<Link
							href="/projects"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Projects
						</Link>
						<Link
							href="/education"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Education
						</Link>
						<Link
							href="/contact"
							className="duration-200 text-zinc-400 hover:text-zinc-100"
						>
							Contact
						</Link>
					</div>

					<div className="flex gap-4">
						<Link
							href="/"
							className={`duration-200 text-zinc-300 hover:text-zinc-100 ${!isIntersecting ? "opacity-0 pointer-events-none" : "opacity-100"
								}`}
						>
							<ArrowLeft className="w-6 h-6" />
						</Link>
					</div>
				</div>
			</div>

			{/* Back to Top Button */}
			<button
				onClick={scrollToTop}
				className={`fixed bottom-8 right-8 z-50 p-3 bg-zinc-800 text-zinc-200 rounded-full shadow-lg hover:bg-zinc-700 transition-all duration-300 ${showBackToTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
					}`}
				aria-label="Back to top"
			>
				<ArrowUp className="w-6 h-6" />
			</button>
		</header>
	);
};
