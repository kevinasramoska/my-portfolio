import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="bg-[#121212] text-[#E0D7CF] py-6 border-t border-[#2A2A2A]">
      <div className="container mx-auto px-4 text-center">

        <p className="text-sm mb-3">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>

        <div className="flex justify-center space-x-6 text-lg flex-wrap gap-y-2">
          <a
            href={profile.links.github}
            target="_blank"
            className="hover:text-[#5C3D2E] transition"
            rel="noreferrer"
          >
            GitHub
          </a>

          <a
            href={profile.links.linkedin}
            target="_blank"
            className="hover:text-[#5C3D2E] transition"
            rel="noreferrer"
          >
            LinkedIn
          </a>

          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#5C3D2E] transition"
          >
            View Resume
          </a>
        </div>

        {/* Accent bar */}
        <div className="mt-6 w-20 h-1 bg-[#5C3D2E] mx-auto rounded-full"></div>
      </div>
    </footer>
  );
}
