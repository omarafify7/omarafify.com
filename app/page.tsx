"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Particles from "./components/particles";
import { SkillIcon } from "./components/skill-icon";
import { techSkills } from "./data/tech-skills";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SpotlightButton } from "./components/spotlight-button";

const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  const [showSkills, setShowSkills] = useState(false);
  const [isReturnVisit, setIsReturnVisit] = useState(false);

  useEffect(() => {
    const visited = sessionStorage.getItem("visited");
    if (visited) {
      setIsReturnVisit(true);
    } else {
      sessionStorage.setItem("visited", "true");
    }
  }, []);

  const animationDuration = isReturnVisit ? 0.5 : 1.5; // Faster animation on return

  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-y-auto bg-gradient-to-tl from-black via-zinc-600/20 to-black">

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="mb-3 z-10 animate-fade-in" style={{ animationDuration: `${animationDuration}s` }}>
        <Image
          src="/profile_picture.jpg"
          alt="Omar Afify"
          width={200}
          height={200}
          className="rounded-full object-cover"
        />
      </div>
      <h1 className="py-2 px-0.5 z-10 text-4xl text-transparent duration-1000 bg-white cursor-default text-edge-outline animate-title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text ">
        Omar Afify
      </h1>

      <div className="hidden w-screen h-px animate-glow md:block animate-fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <div className="my-5 text-center animate-fade-in" style={{ animationDuration: `${animationDuration}s` }}>
        <h2 className="text-sm text-zinc-500 ">
          Cloud & ML-focused Computer Engineer building data intensive systems.
        </h2>
      </div>

      <nav className="my-5 animate-fade-in" style={{ animationDuration: `${animationDuration}s` }}>
        <ul className="flex flex-wrap items-center justify-center gap-4">
          {navigation.map((item) => (
            <SpotlightButton key={item.href} href={item.href}>
              {item.name}
            </SpotlightButton>
          ))}
        </ul>
        <div className="flex justify-center mt-4">
          <SpotlightButton onClick={() => setShowSkills(!showSkills)}>
            <span className="flex items-center gap-2">
              Technical Skills
              {showSkills ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </span>
          </SpotlightButton>
        </div>
      </nav>

      {/* Technical Skills Section */}
      <AnimatePresence>
        {showSkills && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-6xl px-4 overflow-hidden"
          >
            <div className="py-8 flex flex-col gap-6 bg-zinc-900/30 rounded-2xl border border-zinc-800/50 backdrop-blur-sm mt-4">
              {Object.entries(techSkills).map(([category, skills]) => (
                <div key={category} className="flex flex-col gap-2">
                  <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider text-center">
                    {category}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    {skills.map((skill) => (
                      <SkillIcon
                        key={skill.name}
                        name={skill.name}
                        icon={skill.icon}
                        iconType={skill.iconType}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <SpeedInsights />
      <Analytics />
    </div>
  );
}

