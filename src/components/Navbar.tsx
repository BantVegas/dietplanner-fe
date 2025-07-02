import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50
      bg-white/50 backdrop-blur-lg border-b border-white/30
      py-4 px-4 sm:px-8 flex items-center justify-between shadow-md">
      <div className="flex items-center">
        <span className="text-2xl font-extrabold text-teal-700 tracking-tight select-none">
          dietplanner.eu
        </span>
      </div>
      {/* Desktop menu */}
      <div className="hidden md:flex items-center gap-8">
        <Link to="/" className="text-lg font-medium text-gray-700 hover:text-teal-700 transition-colors">Home</Link>
        {/* Uncomment or add more as needed */}
        {/* <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-teal-700 transition-colors">About</Link> */}
        {/* <Link to="/recipes" className="text-lg font-medium text-gray-700 hover:text-teal-700 transition-colors">Recipes</Link> */}
        {/* <Link to="/bmi" className="text-lg font-medium text-gray-700 hover:text-teal-700 transition-colors">BMI Calculator</Link> */}
        {/* <Link to="/blog" className="text-lg font-medium text-gray-700 hover:text-teal-700 transition-colors">Blog</Link> */}
      </div>
      {/* Mobile hamburger */}
      <button
        className="md:hidden p-2 rounded-lg hover:bg-teal-100 transition"
        aria-label="Open menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <svg className="w-7 h-7 text-teal-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md border-b border-white/30 md:hidden flex flex-col items-center gap-2 py-4 z-50 shadow-md animate-fade-in">
          <Link to="/" className="text-lg font-medium text-gray-700 hover:text-teal-700 py-1 w-full text-center" onClick={() => setMenuOpen(false)}>Home</Link>
          {/* Uncomment or add more as needed */}
          {/* <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-teal-700 py-1 w-full text-center" onClick={() => setMenuOpen(false)}>About</Link> */}
          {/* <Link to="/recipes" className="text-lg font-medium text-gray-700 hover:text-teal-700 py-1 w-full text-center" onClick={() => setMenuOpen(false)}>Recipes</Link> */}
          {/* <Link to="/bmi" className="text-lg font-medium text-gray-700 hover:text-teal-700 py-1 w-full text-center" onClick={() => setMenuOpen(false)}>BMI Calculator</Link> */}
          {/* <Link to="/blog" className="text-lg font-medium text-gray-700 hover:text-teal-700 py-1 w-full text-center" onClick={() => setMenuOpen(false)}>Blog</Link> */}
        </div>
      )}
    </nav>
  );
}


