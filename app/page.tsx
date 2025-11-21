import Link from "next/link";
import Image from "next/image";
import React from "react";
import Particles from "./components/particles";
import { SkillIcon } from "./components/skill-icon";
import { techSkills } from "./data/tech-skills";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from "@vercel/analytics/next"


const navigation = [
  { name: "Projects", href: "/projects" },
  { name: "Education", href: "/education" },
  { name: "Contact", href: "/contact" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-screen min-h-screen overflow-y-auto bg-gradient-to-tl from-black via-zinc-600/20 to-black">
      
      <div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
      <Particles
        className="fixed inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <div className="mb-3 z-10 animate-fade-in">
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
      <div className="my-5 text-center animate-fade-in">
        <h2 className="text-sm text-zinc-500 ">
          Cloud & ML-focused Computer Engineer building data intensive systems.
        </h2>
      </div>
      <nav className="my-5 animate-fade-in">
        <ul className="flex items-center justify-center gap-4">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-lg font-semibold duration-500 text-zinc-400 hover:text-zinc-200"
            >
              {item.name}
            </Link>
          ))}
        </ul>
      </nav>

      {/* Technical Skills Section */}
      <div className="mt-10 mb-4 w-full max-w-6xl px-4 animate-fade-in">
        <div className="flex flex-col gap-6">
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
      </div>
      <SpeedInsights />
      <Analytics/>
    </div>
  );
}

