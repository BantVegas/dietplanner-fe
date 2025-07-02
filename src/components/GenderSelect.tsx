import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const reviews = [
  { name: "Emily, 29", text: "I lost 8 kg...", stars: 5, avatar: "👩‍🦰" },
  { name: "James, 41", text: "Finally have energy...", stars: 5, avatar: "🧔" },
  { name: "Anna, 34", text: "They customized my meal plan...", stars: 5, avatar: "👩" },
];

export default function GenderSelect() {
  const navigate = useNavigate();
  const [name, setName] = useState(() => localStorage.getItem("name") || "");
  const [nameError, setNameError] = useState("");

  useEffect(() => {
    document.title = "Personalized Diet Plan | dietplanner.eu";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "Get your personalized diet plan including a shopping list. 100% online, expert-approved.");
  }, []);

  const handleNavigate = (path: string) => {
    if (!name.trim()) {
      setNameError("Please enter your name.");
      return;
    }
    localStorage.setItem("name", name.trim());

    if (path.startsWith("/woman")) {
      localStorage.setItem("gender", "woman");
    } else if (path.startsWith("/man")) {
      localStorage.setItem("gender", "man");
    }

    navigate(path);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-teal-100 via-white to-teal-200">
      <main className="flex-1 w-full flex flex-col items-center px-2 pt-14 sm:pt-16">
        <section className="w-full max-w-3xl flex flex-col items-center pt-8 sm:pt-14">
          <h1 className="text-3xl sm:text-5xl font-extrabold text-teal-700 mb-3 text-center drop-shadow">
            Get your personalized diet plan that truly changes you
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 text-center mb-6 max-w-2xl">
            <b>Weekly meal plan + shopping list</b> online, tailored to your goals.
            Over <span className="text-teal-600 font-bold">300 clients</span> have reached results without starving or restriction!
          </p>
        </section>

        <section id="gender-select" className="w-full flex flex-col items-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 text-gray-900 text-center">
            Choose your gender
          </h2>
          <div className="flex flex-col sm:flex-row gap-8 sm:gap-12 w-full justify-center items-center">
            <div
              className="cursor-pointer rounded-xl bg-white shadow-lg p-4 max-w-xs w-full mx-auto transition-transform hover:scale-105 border-2 border-teal-100"
              onClick={() => handleNavigate("/woman/age")}
              tabIndex={0}
              aria-label="Select Woman"
              role="button"
              onKeyPress={e => { if (e.key === "Enter") handleNavigate("/woman/age"); }}
            >
              <img
                src="/images/woman.png"
                alt="Woman"
                className="rounded-xl w-44 sm:w-48 h-auto object-cover mx-auto"
                loading="lazy"
              />
              <p className="mt-3 text-center font-semibold text-lg text-gray-800">
                Woman &gt;
              </p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="rounded-xl bg-white shadow-lg border-2 border-teal-200 px-4 py-6 flex flex-col items-center min-w-[230px] max-w-xs">
                <label htmlFor="name" className="font-semibold text-teal-700 mb-2">
                  Your name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full p-3 rounded-lg border border-teal-300 text-lg text-center"
                  placeholder="Enter your name"
                  value={name}
                  onChange={e => {
                    setName(e.target.value);
                    setNameError("");
                  }}
                  required
                />
                {nameError && (
                  <div className="text-red-500 text-sm mt-1">{nameError}</div>
                )}
              </div>
            </div>

            <div
              className="cursor-pointer rounded-xl bg-white shadow-lg p-4 max-w-xs w-full mx-auto transition-transform hover:scale-105 border-2 border-teal-100"
              onClick={() => handleNavigate("/man/age")}
              tabIndex={0}
              aria-label="Select Man"
              role="button"
              onKeyPress={e => { if (e.key === "Enter") handleNavigate("/man/age"); }}
            >
              <img
                src="/images/man.png"
                alt="Man"
                className="rounded-xl w-44 sm:w-48 h-auto object-cover mx-auto"
                loading="lazy"
              />
              <p className="mt-3 text-center font-semibold text-lg text-gray-800">
                Man &gt;
              </p>
            </div>
          </div>
        </section>

        <section className="w-full flex flex-col items-center mt-0 mb-10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8 w-full max-w-2xl">
            <div className="flex flex-col items-center text-sm">
              <span className="text-2xl">💻</span>
              <span className="font-semibold text-gray-700 mt-1">100% online</span>
            </div>
            <div className="flex flex-col items-center text-sm">
              <span className="text-2xl">⏱️</span>
              <span className="font-semibold text-gray-700 mt-1">Fast delivery</span>
            </div>
            <div className="flex flex-col items-center text-sm">
              <span className="text-2xl">⭐</span>
              <span className="font-semibold text-gray-700 mt-1">300+ happy clients</span>
            </div>
            <div className="flex flex-col items-center text-sm">
              <span className="text-2xl">👨‍⚕️</span>
              <span className="font-semibold text-gray-700 mt-1">Expert guidance</span>
            </div>
          </div>
          <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white/90 rounded-xl shadow p-4 flex flex-col items-center min-h-[110px] border-t-4 border-teal-100">
                <span className="text-3xl mb-1">{r.avatar}</span>
                <span className="font-bold text-teal-700">{r.name}</span>
                <div className="flex flex-row my-1">
                  {Array(r.stars).fill(0).map((_, idx) => (
                    <span key={idx} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-xs text-gray-700 text-center italic">“{r.text}”</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

