import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { GraduationCap, Award } from "lucide-react";

const degrees = [
  {
    title: "BASc in Computer Engineering w/ Professional Internship",
    institution: "Queen's University",
    location: "Kingston, ON, Canada",
    period: "Sep 2021 - Apr 2026",
    status: "in-progress",
    description: "Focused on Big Data, ML / AI, and Cloud Computing.",
  },
  {
    title: "Professional Certificate in Artificial Intelligence",
    institution: "University of Toronto School of Continuing Studies",
    location: "Toronto, ON, Canada",
    period: "May 2025 - Dec 2025",
    status: "in-progress",
    description: "Focused on Machine Learning, Deep Learning, and Intelligent Agents.",
  },
  {
    title: "Professional Certificate in Data Science",
    institution: "University of Waterloo WatSPEED",
    location: "Waterloo, ON, Canada",
    period: "Sep 2023 - Dec 2024",
    status: "completed",
    description: "Focused on Data Engineering, Statistics, and Big Data Management Systems.",
  },
  // Add more degrees as needed
];

const certificates = [
  {
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    period: "Dec 2024",
    status: "completed",
    description: "Demonstrates expertise in designing distributed systems on AWS.",
  },
  {
    title: "Azure Certified AI Engineer Associate",
    issuer: "Microsoft Azure",
    period: "Expected: Dec 2025",
    status: "in-progress",
    description: "Working towards certification in ML engineering on Azure.",
  },
  {
    title: "Professional Scrum Master I",
    issuer: "Scrum.org",
    period: "Aug 2025",
    status: "completed",
    description: "Demonstrates expertise in Agile project management and Scrum methodology.",
  },
  {
    title: "Certified in Cybersecurity",
    issuer: "ISC2",
    period: "Oct 2024",
    status: "completed",
    description: "Demonstrates expertise in cybersecurity principles and practices.",
  },
  // Add more certificates as needed
];

export default function EducationPage() {
  return (
    <div className="relative pb-16 bg-gradient-to-tl from-zinc-900/0 via-zinc-900 to-zinc-900/0">
      <Navigation />
      <div className="px-6 pt-20 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
            Education
          </h2>
          <p className="mt-4 text-zinc-400">
            My academic background and technical certifications.
          </p>
        </div>
        <div className="w-full h-px bg-zinc-800" />

        {/* Degrees Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-6 h-6 text-zinc-400" />
            <h3 className="text-2xl font-bold text-zinc-100">Degrees</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {degrees.map((degree, index) => (
              <Card key={index}>
                <article className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-zinc-100 mb-2">
                        {degree.title}
                      </h4>
                      <p className="text-sm text-zinc-400 mb-1">
                        {degree.institution}
                      </p>
                      <p className="text-xs text-zinc-500">{degree.location}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${degree.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {degree.status === "completed" ? "Completed" : "In Progress"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-3">{degree.period}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {degree.description}
                  </p>
                </article>
              </Card>
            ))}
          </div>
        </div>

        <div className="w-full h-px bg-zinc-800" />

        {/* Certificates Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <Award className="w-6 h-6 text-zinc-400" />
            <h3 className="text-2xl font-bold text-zinc-100">Certifications</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, index) => (
              <Card key={index}>
                <article className="p-6 md:p-8">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold text-zinc-100 mb-2">
                        {cert.title}
                      </h4>
                      <p className="text-sm text-zinc-400">{cert.issuer}</p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap ${cert.status === "completed"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {cert.status === "completed" ? "Earned" : "In Progress"}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-3">{cert.period}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {cert.description}
                  </p>
                </article>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

