export default function Footer() {
    return (
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Your Name. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="https://github.com/yourusername" className="hover:text-gray-300">GitHub</a>
            <a href="https://linkedin.com/in/yourusername" className="hover:text-gray-300">LinkedIn</a>
          </div>
        </div>
      </footer>
    );
  }