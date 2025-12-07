"use client";

import { motion } from "framer-motion";

export default function Skills() {
  const skillGroups = [
    {
      title: "Frontend",
      skills: ["JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
    },
    {
      title: "Backend",
      skills: ["Java", "Spring Boot", "C#", "ASP.NET Core", "Node.js"],
    },
    {
      title: "Databases",
      skills: ["PostgreSQL", "SQL Server", "EF Core", "Hibernate / JPA"],
    },
    {
      title: "DevOps & Tools",
      skills: [
        "Docker",
        "Git & GitHub",
        "Azure App Service",
        "REST APIs",
        "JWT Authentication",
      ],
    },
  ];

  return (
    <section id="skills" className="py-20 bg-[#121212] text-[#E0D7CF]">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {skillGroups.map((group, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-6 shadow-lg"
            >
              <h3 className="text-2xl font-semibold mb-5 text-[#E0D7CF]">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-3 justify-center">
                {group.skills.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full text-white text-sm font-medium 
                    bg-[#5C3D2E] hover:bg-[#4A2F23] transition shadow-md"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-14 w-24 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </section>
  );
}
