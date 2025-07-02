// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full bg-white/60 backdrop-blur-md border-t border-white/30 py-6 px-4 sm:px-8 mt-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center">
      <div className="text-gray-600 text-base font-medium">
        © {new Date().getFullYear()} dietplanner.eu &middot; All rights reserved
      </div>
      <div className="flex flex-wrap gap-6 justify-center text-gray-600 text-sm">
        <a href="#gdpr" className="hover:text-teal-700 transition">GDPR</a>
        <a href="#contact" className="hover:text-teal-700 transition">Contact</a>
        <a href="#terms" className="hover:text-teal-700 transition">Terms & Conditions</a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-600 transition flex items-center gap-1">
          <span className="sr-only">Instagram</span>
          {/* Instagram icon */}
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24" className="inline align-middle">
            <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm4.25 2.75a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0 1.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm6 1a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
          </svg>
        </a>
        <a href="https://www.tiktok.com/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition flex items-center gap-1">
          <span className="sr-only">TikTok</span>
          {/* TikTok icon */}
          <svg width="22" height="22" fill="currentColor" viewBox="0 0 48 48" className="inline align-middle">
            <path d="M34 6a1 1 0 0 1 1 1c0 4.418 3.582 8 8 8a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1c-2.294 0-4.486-.627-6.363-1.714V33A9 9 0 1 1 23 24a1 1 0 1 1 2 0 7 7 0 1 0 7 7V6a1 1 0 0 1 1-1z"/>
          </svg>
        </a>
      </div>
    </footer>
  );
}
