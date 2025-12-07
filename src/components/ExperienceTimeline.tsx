"use client";

import { motion } from "framer-motion";

export default function ExperienceTimeline() {
  const timeline = [
    {
      year: "2021 – 2024",
      title: "BSc Computer Science & Software Engineering",
      place: "Maynooth University",
      description:
        "Completed a full-time undergraduate degree focused on software engineering, algorithms, distributed systems, databases, and web development.",
    },
    {
      year: "2023 – 2024",
      title: "Software Engineering Intern",
      place: "General Motors",
      description:
        "Worked on enterprise-level software using Java/Spring Boot and .NET technologies, contributing to backend services, APIs, and production systems.",
    },
    {
      year: "2024 – 2025",
      title: "International Judo Athlete",
      place: "Irish National Team",
      description:
        "Competed internationally representing Ireland, developing elite discipline, resilience under pressure, and high-performance execution.",
    },
    {
      year: "2025 – Present",
      title: "Full-Stack Software Engineer (Projects)",
      place: "Personal & Open-Source Projects",
      description:
        "Building production-ready full-stack systems including a crypto portfolio tracking platform and a property management system using Java, Spring Boot, .NET, SQL, Docker, and Next.js.",
    },
  ];

  return (
    <section id="timeline" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-16">
          Experience Timeline
        </h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[#2A2A2A]" />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Content Card */}
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 shadow-lg w-full md:w-5/12">
                  <span className="text-sm text-[#5C3D2E] font-semibold">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-bold mt-2 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#D4C9C1] mb-3">
                    {item.place}
                  </p>
                  <p className="text-[#D4C9C1] text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Timeline Dot */}
                <div className="w-6 h-6 bg-[#5C3D2E] rounded-full border-4 border-[#121212] z-10 my-6 md:my-0" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Accent Divider */}
        <div className="mt-16 w-24 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
