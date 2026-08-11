# Kevinas Ramoska – Software Engineering Portfolio

This repository contains the source code for my personal software engineering portfolio website.

The portfolio showcases my projects, technical experience, and engineering focus areas. It is designed to present my work clearly to recruiters and hiring managers while demonstrating my frontend and full-stack development capabilities.

Live site  
https://kevinasramoska-portfolio.vercel.app

---

# Overview

This portfolio was built to provide a clean, modern interface highlighting:

• Full-stack engineering projects  
• Technical skills and technologies  
• Professional experience  
• Contact information for collaboration or opportunities  

The goal of the project is to demonstrate both software engineering ability and an understanding of building performant modern web applications.

---

# Tech Stack

Frontend  
React  
TypeScript  
Tailwind CSS  

Framework / Tooling  
Next.js App Router

Deployment  
Vercel  

Version Control  
Git + GitHub

---

# Key Features

• Responsive modern UI  
• Project showcase section  
• Professional experience timeline  
• Technical skills overview  
• Downloadable résumé  
• Contact links to GitHub and LinkedIn  

---

# Project Structure

```text
src
├── app — routing, metadata, and global styles
├── components — reusable portfolio sections
└── content — canonical profile and project data

public — résumé and social assets
docs — audit, roadmap, and implementation backlog
```

The application is organized into reusable React components for maintainability and scalability.

---

# Architecture

The portfolio follows a component-based architecture typical of modern React applications.

Each section of the site is implemented as an isolated component which improves:

• readability  
• reusability  
• scalability  

Styling is handled through Tailwind CSS utility classes.

---

# Local Development

Clone the repository

Navigate to the project directory

```bash
cd my-portfolio
```

Install dependencies and start the development server

```bash
npm ci
npm run dev
```

Quality checks:

```bash
npm run lint
npm run typecheck
npm run build
```

Production bundle measurements and methodology are recorded in
[`docs/PERFORMANCE.md`](docs/PERFORMANCE.md).

## Updating the Resume

Edit `resume/kevinas-ramoska-resume.html`, then generate the tagged PDF served by the portfolio:

```bash
npm run resume:build
```

The script uses Google Chrome or Chromium. Set `CHROME_PATH` if the executable is not installed in a standard location.


---

# Deployment

The site is deployed using **Vercel**.

Deployment workflow:

1. Push changes to GitHub
2. Vercel automatically builds the project
3. The new version is deployed to the live domain

---

# Future Improvements

Planned improvements include:

• additional engineering project case studies  
• architecture diagrams for major projects  
• improved project filtering and navigation  
• blog posts or technical write-ups  
• performance optimization and accessibility improvements  

---

# Author

Kevinas Ramoska  
Software Engineer

Portfolio  
https://kevinasramoska-portfolio.vercel.app

GitHub  
https://github.com/kevinasramoska

LinkedIn  
https://linkedin.com/in/kevinasramoska

---

# License

This project is open source and available under the MIT License.
