"use client";

import { useEffect, useRef } from "react";

export const ReportView: React.FC<{ slug: string }> = ({ slug }) => {
	const hasReported = useRef(false);

	useEffect(() => {
		// Prevent double-incrementing in React Strict Mode
		if (hasReported.current) {
			return;
		}
		hasReported.current = true;

		fetch("/api/incr", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ slug }),
		});
	}, [slug]);

	return null;
};
