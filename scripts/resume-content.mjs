import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { featuredProjects } from "../src/content/projects.ts";
import { siteUrl } from "../src/lib/site-url.mjs";

export const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(new URL(path, `file://${root}`), "utf8");
const career = JSON.parse(read("src/content/career.json"));
const { profile, experiences, education, certification, resumeSkills } = career;
const currentRoles = experiences.filter((item) => item.current);
if (currentRoles.length !== 1) throw new Error("Career content must have exactly one current role.");
const role = `${currentRoles[0].title} at ${currentRoles[0].company}`;
const canonical = siteUrl(process.env.NEXT_PUBLIC_SITE_URL ?? profile.siteUrl);

const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);
const link = (url, label) => `<a href="${escape(url)}">${escape(label)}</a>`;
const bullets = (items) => `<ul>${items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`;
const template = read("resume/template.html");
const fields = {
  title: escape(`${profile.name} - ${role}`),
  identity: `<h1>${escape(profile.name)}</h1><p class="role">${escape(role)}</p>
    <div class="contact" aria-label="Contact details">
      <span>${escape(profile.location)}</span>
      ${link(`tel:${profile.phone.replace(/\s/g, "")}`, profile.phone)}
      ${link(`mailto:${profile.email}`, profile.email)}
      ${link(canonical, "Portfolio")}
      ${link(profile.links.linkedin, "LinkedIn")}
      ${link(profile.links.github, "GitHub")}
    </div>`,
  summary: escape(profile.summary),
  experience: experiences.map((item) => `<article class="entry">
    <div class="entry-heading"><h3>${escape(item.company)}</h3><span class="meta">${escape(item.period)}</span></div>
    <div class="subheading"><span>${escape(item.title)}</span><span>${escape(item.location)}</span></div>
    ${bullets(item.highlights)}
  </article>`).join("\n"),
  projects: featuredProjects.map((project) => `<article class="entry">
    <h3>${escape(project.title)}</h3>
    <p class="project-link">${link(project.links.repository, new URL(project.links.repository).host + new URL(project.links.repository).pathname)}</p>
    ${bullets(project.highlights.slice(0, 2))}
  </article>`).join("\n"),
  skills: resumeSkills.map((group) => `<div class="skill-group"><strong>${escape(group.title)}</strong>${escape(group.items)}</div>`).join("\n"),
  education: `<div class="compact-row"><p><strong>${escape(education.institution)}</strong> - ${escape(education.degree)}</p><span class="meta">${escape(education.period)}</span></div>
    <div class="compact-row"><p>${link(certification.url, `${certification.issuer} ${certification.title}`)}</p><span class="meta">${escape(certification.issued)}</span></div>`,
};

export const html = template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
  if (!(key in fields)) throw new Error(`Unknown resume template field: ${key}`);
  return fields[key];
});
export const hash = (data) => createHash("sha256").update(data).digest("hex");
export const sourceHash = hash(html);
