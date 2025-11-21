"use client";

import React from "react";
import * as SimpleIcons from "@icons-pack/react-simple-icons";

interface SkillIconProps {
  name: string;
  icon: string;
  iconType?: string;
  customIcon?: React.ComponentType<any>;
}

// Helper function to convert icon slug to component name
// e.g., 'python' -> 'SiPython', 'apache-spark' -> 'SiApacheSpark', 'csharp' -> 'SiCsharp'
// Handles kebab-case, snake_case, and camelCase
const getIconComponentName = (iconSlug: string): string => {
  // Split by dashes, underscores, or camelCase boundaries
  const parts = iconSlug
    .replace(/([a-z])([A-Z])/g, "$1-$2") // Handle camelCase
    .split(/[-_]/)
    .filter(Boolean);
  
  const capitalized = parts.map(
    (part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
  );
  return `Si${capitalized.join("")}`;
};

// Helper function to get icon URL for fallback
const getIconUrl = (iconName: string, iconType: string = "simpleicons") => {
  if (iconType === "devicon") {
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconName}/${iconName}-original.svg`;
  }
  return `https://cdn.simpleicons.org/${iconName.toLowerCase()}/ffffff`;
};

export function SkillIcon({
  name,
  icon,
  iconType = "simpleicons",
  customIcon: CustomIcon,
}: SkillIconProps) {
  const [iconSrc, setIconSrc] = React.useState(getIconUrl(icon, iconType));

  // Special handling for AWS with LobeHub dark mode support
  if (name === "AWS") {
    return (
      <div className="group relative">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-zinc-600/50">
          {/* Always use dark variant */}
          <img
            height={24}
            width={24}
            src="https://unpkg.com/@lobehub/icons-static-webp@latest/dark/aws.webp"
            alt={name}
            className="w-6 h-6 object-contain"
            loading="lazy"
          />
          
          {/* Previous implementation with theme-based switching (commented for potential future use)
          <picture>
            <source
              media="(prefers-color-scheme: dark)"
              srcSet="https://unpkg.com/@lobehub/icons-static-webp@latest/dark/aws.webp"
            />
            <img
              height={24}
              width={24}
              src="https://unpkg.com/@lobehub/icons-static-webp@latest/light/aws.webp"
              alt={name}
              className="w-6 h-6 object-contain"
              loading="lazy"
            />
          </picture>
          */}
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-zinc-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border border-zinc-700">
          {name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-700"></div>
        </div>
      </div>
    );
  }

  // Special handling for Java - use local image from public folder
  if (name === "Java") {
    return (
      <div className="group relative">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-zinc-600/50">
          <img
            height={31}
            width={31}
            src="/java_icon.jpg"
            alt={name}
            className="w-6 h-6 object-contain"
            loading="lazy"
          />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-zinc-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border border-zinc-700">
          {name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-700"></div>
        </div>
      </div>
    );
  }

  // If custom icon is provided, use it
  if (CustomIcon) {
    return (
      <div className="group relative">
        <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-zinc-600/50">
          <CustomIcon size={24} className="w-6 h-6" />
        </div>
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-zinc-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border border-zinc-700">
          {name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-700"></div>
        </div>
      </div>
    );
  }

  // Try to use React component from @icons-pack/react-simple-icons
  if (iconType === "simpleicons") {
    const iconComponentName = getIconComponentName(icon);
    const IconComponent = (SimpleIcons as any)[iconComponentName];

    if (IconComponent) {
      return (
        <div className="group relative">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-zinc-600/50">
            <IconComponent size={24} color="#ffffff" />
          </div>
          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-zinc-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border border-zinc-700">
            {name}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-700"></div>
          </div>
        </div>
      );
    }
  }

  // Fallback to CDN image with multiple fallback sources
  const [imageError, setImageError] = React.useState(false);
  const [fallbackIndex, setFallbackIndex] = React.useState(0);
  
  // Multiple fallback sources for better reliability
  const fallbackSources = [
    getIconUrl(icon, iconType), // Primary: Simple Icons CDN
    getIconUrl(icon, "devicon"), // Fallback 1: Devicon
    `https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/${icon.toLowerCase()}.svg`, // Fallback 2: jsDelivr
  ];

  const handleError = () => {
    if (fallbackIndex < fallbackSources.length - 1) {
      setFallbackIndex(fallbackIndex + 1);
      setImageError(false);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="group relative">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 transition-all duration-300 hover:scale-110 border border-zinc-700/50 hover:border-zinc-600/50">
        {!imageError ? (
          <img
            key={fallbackIndex} // Force re-render when fallback changes
            src={fallbackSources[fallbackIndex]}
            alt={name}
            className="w-6 h-6 object-contain"
            loading="lazy"
            onError={handleError}
            onLoad={() => setImageError(false)}
          />
        ) : (
          // Final fallback: show a placeholder
          <div className="w-6 h-6 bg-zinc-600 rounded flex items-center justify-center text-xs text-zinc-400">
            {name.charAt(0)}
          </div>
        )}
      </div>
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs text-white bg-zinc-900 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-20 border border-zinc-700">
        {name}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1 w-2 h-2 bg-zinc-900 rotate-45 border-r border-b border-zinc-700"></div>
      </div>
    </div>
  );
}

