import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

// ---------------------- NAVBAR ----------------------
function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-white/50 backdrop-blur-lg border-b border-white/30 py-4 px-4 sm:px-8 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="text-2xl font-extrabold text-teal-700 tracking-tight select-none hover:text-teal-900 transition-colors"
        >
          dietplanner.eu
        </Link>
        <Link
          to="/"
          className="text-lg font-medium text-gray-700 hover:text-teal-700 transition-colors hidden md:inline"
        >
          Home
        </Link>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {/* Add EN navigation if needed */}
      </div>
      <button
        className="md:hidden p-2 rounded-lg hover:bg-teal-100 transition"
        aria-label="Open menu"
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        <svg
          className="w-7 h-7 text-teal-700"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
          )}
        </svg>
      </button>
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md border-b border-white/30 md:hidden flex flex-col items-center gap-2 py-4 z-50 shadow-md animate-fade-in">
          <Link
            to="/"
            className="text-lg font-medium text-gray-700 hover:text-teal-700 py-1 w-full text-center"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          {/* Add EN navigation if needed */}
        </div>
      )}
    </nav>
  );
}

// ---------------------- FOOTER ----------------------
function Footer() {
  return (
    <footer className="w-full bg-white/60 backdrop-blur-md border-t border-white/30 py-6 px-4 sm:px-8 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
      <div className="text-gray-600 text-base font-medium">
        © {new Date().getFullYear()} dietplanner.eu &middot; All rights reserved
      </div>
      <div className="flex flex-wrap gap-6 justify-center text-gray-600 text-sm">
        <a href="#gdpr" className="hover:text-teal-700 transition">
          GDPR
        </a>
        <a href="#contact" className="hover:text-teal-700 transition">
          Contact
        </a>
        <a href="#terms" className="hover:text-teal-700 transition">
          Terms
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-pink-600 transition flex items-center gap-1"
        >
          <span className="sr-only">Instagram</span>
          <svg
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="inline align-middle"
          >
            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm4.25 2.75a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
          </svg>
        </a>
        <a
          href="https://www.tiktok.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-black transition flex items-center gap-1"
        >
          <span className="sr-only">TikTok</span>
          <svg
            width="22"
            height="22"
            fill="currentColor"
            viewBox="0 0 48 48"
            className="inline align-middle"
          >
            <path d="M34 6a1 1 0 0 1 1 1c0 4.418 3.582 8 8 8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1c-2.294 0-4.486-.627-6.363-1.714V33A9 9 0 1 1 23 24a1 1 0 1 1 2 0 7 7 0 1 0 7 7V6a1 1 0 0 1 1-1z" />
          </svg>
        </a>
      </div>
    </footer>
  );
}

// ---------------------- AGE SELECTION WOMAN ----------------------
const ageOptions = [
  { label: "18–26", img: "/images/woman18-26.png" },
  { label: "27–38", img: "/images/woman27-38.png" },
  { label: "39–50", img: "/images/woman39-50.png" },
  { label: "51+", img: "/images/woman51+.png" },
];

const ageMapping: Record<string, number> = {
  "18–26": 22,
  "27–38": 32,
  "39–50": 44,
  "51+": 55,
};

export default function SelectAgeWoman() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Select woman's age | dietplanner.eu";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Select your age and get a diet plan tailored to women's needs at every stage of life. Every phase comes with its specifics and deserves an individual approach."
    );
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-teal-100 via-white to-teal-200">
      <Navbar />
      <main className="flex-1 flex flex-col items-center pt-28 px-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-3 text-teal-700 text-center">
          Select your age group
        </h1>
        <p className="max-w-xl text-center text-gray-700 text-base sm:text-lg mb-8">
          Each stage of a woman's life comes with specifics – from metabolism and hormonal changes to life tempo.
          <br />
          Selecting the right age helps us create a <b>personalized diet plan just for you</b> – whether you’re focused on your career, motherhood, or menopause.
          <br />
          Our care is <span className="text-teal-600 font-bold">individual</span> and respects the differences at every age.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-5xl">
          {ageOptions.map(({ label, img }) => (
            <div
              key={label}
              className="flex flex-col items-center rounded-xl bg-white/80 backdrop-blur-md shadow-md p-6 transition-transform hover:scale-105"
            >
              <img
                src={img}
                alt={`Age group ${label} years`}
                className="rounded-xl w-40 h-56 object-cover mb-4 shadow"
                loading="lazy"
              />
              <button
                className="mt-5 px-8 py-3 rounded-lg bg-teal-600 text-white font-bold text-lg hover:bg-teal-700 transition w-full"
                onClick={() => {
                  const numericAge = ageMapping[label];
                  localStorage.setItem("age", numericAge.toString());
                  navigate("/woman/weight");
                }}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

