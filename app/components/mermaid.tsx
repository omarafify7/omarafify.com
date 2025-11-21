"use client";
import { useEffect, useRef, useState } from "react";

let mermaidInitialized = false;

export default function Mermaid({ chart }: { chart: string }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const modalContentRef = useRef<HTMLDivElement>(null);
	const [svg, setSvg] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [isExpanded, setIsExpanded] = useState(false);
	const [zoom, setZoom] = useState(1);
	const [defaultZoom, setDefaultZoom] = useState(1);

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

	// Calculate optimal zoom based on diagram and screen size
	useEffect(() => {
		if (isExpanded && svg && modalContentRef.current) {
			// Parse SVG to get dimensions
			const parser = new DOMParser();
			const svgDoc = parser.parseFromString(svg, "image/svg+xml");
			const svgElement = svgDoc.querySelector("svg");
			
			if (svgElement) {
				const viewBox = svgElement.getAttribute("viewBox");
				let svgWidth = parseFloat(svgElement.getAttribute("width") || "800");
				
				// If viewBox exists, use it for more accurate dimensions
				if (viewBox) {
					const [, , width] = viewBox.split(" ").map(Number);
					if (width) svgWidth = width;
				}
				
				// Get available width (95vw - padding)
				const availableWidth = window.innerWidth * 0.95 - 64; // 95vw minus padding
				
				// Calculate zoom to fill at least 100% of width
				// This ensures diagrams are at least as wide as the screen
				let calculatedZoom = availableWidth / svgWidth;
				
				// Ensure minimum zoom of 1.0 (100% of screen width)
				calculatedZoom = Math.max(1.0, calculatedZoom);
				
				// Double the initial zoom for better readability
				calculatedZoom = calculatedZoom * 2;
				
				setDefaultZoom(calculatedZoom);
				setZoom(calculatedZoom);
			}
		}
	}, [isExpanded, svg]);

	// Handle scroll-to-zoom
	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			if (isExpanded && modalContentRef.current) {
				e.preventDefault();
				// Scroll down (positive deltaY) = zoom in
				// Scroll up (negative deltaY) = zoom out
				const delta = -e.deltaY * 0.001; // Scale the delta for smooth zooming
				setZoom(prevZoom => Math.max(0.1, prevZoom + delta));
			}
		};

		const modalContent = modalContentRef.current;
		if (isExpanded && modalContent) {
			modalContent.addEventListener("wheel", handleWheel, { passive: false });
		}

		return () => {
			if (modalContent) {
				modalContent.removeEventListener("wheel", handleWheel);
			}
		};
	}, [isExpanded]);

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
		} else {
			// Reset zoom when closing
			setZoom(defaultZoom);
		}
		
		return () => {
			document.removeEventListener("keydown", handleEscape);
			document.body.style.overflow = "unset";
		};
	}, [isExpanded, defaultZoom]);

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
					<svg 
						xmlns="http://www.w3.org/2000/svg" 
						width="20" 
						height="20" 
						viewBox="0 0 24 24" 
						fill="none" 
						stroke="currentColor" 
						strokeWidth="2" 
						strokeLinecap="round" 
						strokeLinejoin="round"
						className="text-zinc-300"
					>
						<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
					</svg>
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
					{/* Zoom controls */}
					<div className="absolute top-4 left-4 flex gap-2 z-10">
						<button
							onClick={(e) => {
								e.stopPropagation();
								setZoom(z => z + 0.25);
							}}
							className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg shadow-xl border border-zinc-700 transition-colors"
							aria-label="Zoom in"
							title="Zoom in"
						>
							<svg 
								xmlns="http://www.w3.org/2000/svg" 
								width="20" 
								height="20" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								strokeWidth="2" 
								strokeLinecap="round" 
								strokeLinejoin="round"
								className="text-zinc-300"
							>
								<circle cx="11" cy="11" r="8"/>
								<path d="m21 21-4.35-4.35"/>
								<line x1="11" y1="8" x2="11" y2="14"/>
								<line x1="8" y1="11" x2="14" y2="11"/>
							</svg>
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setZoom(z => Math.max(z - 0.25, 0.5));
							}}
							className="p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg shadow-xl border border-zinc-700 transition-colors"
							aria-label="Zoom out"
							title="Zoom out"
						>
							<svg 
								xmlns="http://www.w3.org/2000/svg" 
								width="20" 
								height="20" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								strokeWidth="2" 
								strokeLinecap="round" 
								strokeLinejoin="round"
								className="text-zinc-300"
							>
								<circle cx="11" cy="11" r="8"/>
								<path d="m21 21-4.35-4.35"/>
								<line x1="8" y1="11" x2="14" y2="11"/>
							</svg>
						</button>
						<button
							onClick={(e) => {
								e.stopPropagation();
								setZoom(defaultZoom);
							}}
							className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg shadow-xl border border-zinc-700 transition-colors text-zinc-300 text-sm font-medium"
							aria-label="Reset zoom"
							title={`Reset zoom to ${Math.round(defaultZoom * 100)}%`}
						>
							{Math.round(zoom * 100)}%
						</button>
					</div>

					{/* Close button */}
					<button
						onClick={() => setIsExpanded(false)}
						className="absolute top-4 right-4 p-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg z-10 shadow-xl border border-zinc-700 transition-colors"
						aria-label="Close expanded view"
						title="Close (ESC)"
					>
						<svg 
							xmlns="http://www.w3.org/2000/svg" 
							width="24" 
							height="24" 
							viewBox="0 0 24 24" 
							fill="none" 
							stroke="currentColor" 
							strokeWidth="2" 
							strokeLinecap="round" 
							strokeLinejoin="round"
							className="text-zinc-300"
						>
							<line x1="18" y1="6" x2="6" y2="18"/>
							<line x1="6" y1="6" x2="18" y2="18"/>
						</svg>
					</button>

					{/* Expanded diagram */}
					<div 
						ref={modalContentRef}
						className="w-full h-full max-w-[95vw] max-h-[85vh] overflow-auto bg-zinc-900 rounded-lg shadow-2xl border border-zinc-800"
						onClick={(e) => e.stopPropagation()}
					>
						<div 
							className="min-h-full w-fit mx-auto p-8"
							style={{ 
								transform: `scale(${zoom})`,
								transformOrigin: 'top center',
								transition: 'transform 0.2s ease-out',
							}}
							dangerouslySetInnerHTML={{ __html: svg }}
						/>
					</div>

					{/* Help text */}
					<div className="absolute bottom-4 text-sm text-zinc-400 flex flex-col items-center gap-1">
						<p>Scroll to zoom • Press <kbd className="px-2 py-1 bg-zinc-300 rounded border border-zinc-200">ESC</kbd> to close</p>
					</div>
				</div>
			)}
		</>
	);
}

