import { visit } from "unist-util-visit";

/**
 * Rehype plugin to handle mermaid code blocks.
 * This must run BEFORE rehype-pretty-code to prevent syntax highlighting.
 * 
 * Transforms mermaid code blocks into a custom div with data attribute
 * that React components can detect and render.
 */
export default function rehypeMermaid() {
	return (tree) => {
		visit(tree, "element", (node, index, parent) => {
			// Look for <pre><code class="language-mermaid">...</code></pre>
			if (
				node.tagName === "pre" &&
				node.children &&
				node.children.length > 0
			) {
				const codeNode = node.children[0];
				
				if (
					codeNode.type === "element" &&
					codeNode.tagName === "code" &&
					codeNode.properties &&
					Array.isArray(codeNode.properties.className)
				) {
					const classes = codeNode.properties.className;
					const isMermaid = classes.some(
						(cls) => cls === "language-mermaid" || cls === "mermaid"
					);

					if (isMermaid && index !== null && parent) {
						// Extract the mermaid chart text
						let chartText = "";
						if (codeNode.children && codeNode.children.length > 0) {
							chartText = codeNode.children
								.map((child) => {
									if (child.type === "text") {
										return child.value;
									}
									return "";
								})
								.join("");
						}

						// Replace the <pre> node with a custom div element
						// that has a data attribute containing the mermaid chart
						const mermaidNode = {
							type: "element",
							tagName: "div",
							properties: {
								className: ["mermaid-diagram"],
								"data-mermaid": chartText.trim(),
							},
							children: [],
						};

						parent.children[index] = mermaidNode;
					}
				}
			}
		});
	};
}

