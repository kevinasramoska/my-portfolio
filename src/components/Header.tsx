export default function Header() {
  return (
    <nav className="bg-[#121212]/90 backdrop-blur-md text-[#E0D7CF] p-4 fixed w-full top-0 z-20 border-b border-[#2A2A2A]">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-wide">Kevinas Ramoska</h1>

        <ul className="flex space-x-8 text-lg">
          <li>
            <a
              href="#about"
              className="hover:text-[#5C3D2E] transition"
            >
              About
            </a>
          </li>

          <li>
            <a
              href="#projects"
              className="hover:text-[#5C3D2E] transition"
            >
              Projects
            </a>
          </li>

          <li>
            <a
              href="#skills"
              className="hover:text-[#5C3D2E] transition"
            >
              Skills
            </a>
          </li>

          <li>
            <a
              href="#contact"
              className="hover:text-[#5C3D2E] transition"
            >
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
