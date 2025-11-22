"use client";

import React, { useRef, useEffect } from "react";
import Link from "next/link";

interface SpotlightButtonProps {
    children: React.ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
}

export const SpotlightButton: React.FC<SpotlightButtonProps> = ({
    children,
    href,
    onClick,
    className = "",
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!divRef.current) return;

            const div = divRef.current;
            const rect = div.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            div.style.setProperty("--x", `${x}px`);
            div.style.setProperty("--y", `${y}px`);
            div.style.setProperty("--opacity", "1");
        };

        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const Content = () => (
        <div
            ref={divRef}
            className={`relative rounded-full overflow-hidden group ${className}`}
            style={{
                padding: '1px',
                // @ts-ignore
                '--x': '0px',
                // @ts-ignore
                '--y': '0px',
                // @ts-ignore
                '--opacity': '0',
            }}
        >
            {/* Spotlight Border */}
            <div
                className="absolute inset-0 rounded-full transition-opacity duration-300"
                style={{
                    opacity: 'var(--opacity)',
                    background: "radial-gradient(120px circle at var(--x) var(--y), rgba(255, 255, 255, 0.8), transparent 60%)",
                }}
            />

            {/* Button Background & Content */}
            <div className="relative flex items-center justify-center rounded-full bg-zinc-950/90 backdrop-blur-sm px-6 py-2 transition-all duration-300 hover:bg-zinc-900/80">
                <span className="relative z-20 text-sm font-medium text-zinc-300 transition-colors duration-300 group-hover:text-white">
                    {children}
                </span>
            </div>
        </div>
    );

    if (href) {
        return (
            <Link href={href} className="inline-block">
                <Content />
            </Link>
        );
    }

    return (
        <button onClick={onClick} className="inline-block" type="button">
            <Content />
        </button>
    );
};
