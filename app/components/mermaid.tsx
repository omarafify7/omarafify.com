"use client";
import { useEffect, useRef, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { X, ZoomIn, ZoomOut, RotateCcw, Maximize2 } from "lucide-react";

let mermaidInitialized = false;

export default function Mermaid({ chart }: { chart: string }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isExpanded, setIsExpanded] = useState(false);

	useEffect(() => {
		const renderDiagram = async () => {
			if (!chart) {
				console.error("No chart provided to Mermaid component");
				setError("No chart data provided");
				return;
			}

			try {
				const mermaidModule = await import("mermaid");
				const mermaid = mermaidModule.default;

				// Initialize mermaid once
				if (!mermaidInitialized) {
					mermaid.initialize({
						startOnLoad: false,
						theme: "dark",
						securityLevel: "loose",
						fontSize: 16,
					});
					mermaidInitialized = true;
				}

				// Generate unique ID for this diagram
				const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

				// Render the diagram
				const { svg: renderedSvg } = await mermaid.render(id, chart.trim());
				setSvg(renderedSvg);
			} catch (err: any) {
				console.error("Mermaid rendering error:", err);
				setError(err.message || "Failed to render diagram");
			}
		};

		renderDiagram();
	}, [chart]);

	// Handle escape key to close modal
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isExpanded) {
				setIsExpanded(false);
			}
		};

		if (isExpanded) {
			document.addEventListener("keydown", handleEscape);
			// Prevent body scroll when modal is open
			document.body.style.overflow = "hidden";
		}

		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isExpanded]);

	if (error) {
		return (
			<div className="my-8 p-4 bg-red-900/20 border border-red-500 rounded-lg">
				<p className="text-red-400 text-sm">Failed to render diagram: {error}</p>
				<pre className="mt-2 text-xs text-red-300 overflow-x-auto">{chart}</pre>
			</div>
		);
	}

	if (!svg) {
		return (
			<div className="my-8 p-4 bg-zinc-800 rounded-lg animate-pulse">
				<p className="text-zinc-400 text-sm">Loading diagram...</p>
			</div>
		);
	}

	return (
		<>
			{/* Normal view with expand button */}
			<div className="relative my-8 group">
				<div
					ref={containerRef}
					className="overflow-x-auto bg-zinc-900 p-6 rounded-lg cursor-pointer hover:bg-zinc-800 transition-colors border border-zinc-800 hover:border-zinc-700"
					onClick={() => setIsExpanded(true)}
					dangerouslySetInnerHTML={{ __html: svg }}
				/>
				<button
					onClick={(e) => {
						e.stopPropagation();
						setIsExpanded(true);
					}}
					className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg border border-zinc-700"
					aria-label="Expand diagram"
					title="Click to expand"
				>
					<Maximize2 className="w-5 h-5 text-zinc-300" />
				</button>
				<p className="text-center text-xs text-zinc-500 mt-2">
					Click diagram to expand
				</p>
			</div>

			{/* Fullscreen modal */}
			{isExpanded && (
				<div
					className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
					onClick={() => setIsExpanded(false)}
				>
					<div
						className="w-full h-full max-w-[95vw] max-h-[90vh] bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800 relative overflow-hidden flex flex-col"
						onClick={(e) => e.stopPropagation()}
					>
						<TransformWrapper
							initialScale={1}
							minScale={0.5}
							maxScale={4}
							centerOnInit
							limitToBounds={false}
							pinch={{ step: 5 }}
						>
							{({ zoomIn, zoomOut, resetTransform }: { zoomIn: () => void; zoomOut: () => void; resetTransform: () => void }) => (
								<>
									{/* Controls */}
									<div className="absolute top-4 left-4 flex gap-2 z-10">
										<button
											onClick={() => zoomIn()}
											className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg shadow-xl border border-zinc-700 transition-colors"
											title="Zoom in"
										>
											<ZoomIn className="w-5 h-5 text-zinc-300" />
										</button>
										<button
											onClick={() => zoomOut()}
											className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg shadow-xl border border-zinc-700 transition-colors"
											title="Zoom out"
										>
											<ZoomOut className="w-5 h-5 text-zinc-300" />
										</button>
										<button
											onClick={() => resetTransform()}
											className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg shadow-xl border border-zinc-700 transition-colors"
											title="Reset"
										>
											<RotateCcw className="w-5 h-5 text-zinc-300" />
										</button>
									</div>

									{/* Close button */}
									<button
										onClick={() => setIsExpanded(false)}
										className="absolute top-4 right-4 p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg z-10 shadow-xl border border-zinc-700 transition-colors"
										title="Close (ESC)"
									>
										<X className="w-6 h-6 text-zinc-300" />
									</button>

									{/* Diagram */}
									<div className="flex-1 w-full h-full cursor-grab active:cursor-grabbing">
										<TransformComponent
											wrapperStyle={{ width: "100%", height: "100%" }}
											contentStyle={{ width: "100%", height: "100%" }}
										>
											<div
												className="w-full h-full flex items-center justify-center p-8"
												dangerouslySetInnerHTML={{ __html: svg }}
											/>
										</TransformComponent>
									</div>
								</>
							)}
						</TransformWrapper>

						<div className="absolute bottom-4 left-0 right-0 text-center pointer-events-none">
							<p className="text-sm text-zinc-400 bg-zinc-900/80 inline-block px-3 py-1 rounded-full border border-zinc-800">
								Scroll to zoom • Drag to pan • Press <kbd className="px-2 py-1 bg-zinc-300 rounded border border-zinc-200">ESC</kbd> to close
							</p>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

