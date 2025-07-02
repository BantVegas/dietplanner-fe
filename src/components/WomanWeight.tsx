import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function WomanWeight() {
  const [weight, setWeight] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Enter your weight | dietplanner.eu";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      "Enter your current weight and get a personalized diet plan tailored to your goals. Safe, anonymous, effective – dietplanner.eu."
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setWeight(value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numWeight = Number(weight);

    if (!weight || isNaN(numWeight) || numWeight < 66 || numWeight > 440) {
      setError("Please enter a valid weight between 66 and 440 lbs.");
      return;
    }
    // Save weight to localStorage (in lbs)
    localStorage.setItem("weight", weight);
    navigate("/woman/height");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-teal-100 via-white to-teal-200">
      <Navbar />
      <main className="flex-1 flex flex-col md:flex-row justify-center items-center gap-12 w-full max-w-6xl mx-auto px-4 py-10 pt-14 sm:pt-16">
        {/* Motivation and image left */}
        <section className="flex-1 max-w-xl flex flex-col items-center md:items-start justify-center gap-8">
          <img
            src="/images/individual-approach.png"
            alt="Individual approach"
            className="w-60 md:w-72 rounded-2xl shadow-lg mb-4"
            loading="lazy"
          />
          <h2 className="text-2xl sm:text-3xl font-extrabold text-teal-700 mb-1 text-center md:text-left">
            Individual approach for your transformation
          </h2>
          <p className="text-gray-800 text-lg text-center md:text-left">
            Every woman is unique. Our team of experts will create a plan tailored to your needs and goals – taking into account your age, health, and lifestyle. All discreet and safe.
          </p>
        </section>
        {/* Form on the right */}
        <section className="flex-1 flex flex-col items-center justify-center gap-5 w-full">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-teal-700 mb-2 text-center">
            Enter your weight
          </h1>
          <img
            src="/images/woman-weight.png"
            alt="Weighing"
            className="w-36 sm:w-44 md:w-48 rounded-xl mb-3"
            loading="lazy"
          />
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center gap-4 w-full max-w-xs"
            autoComplete="off"
          >
            <label htmlFor="weight" className="sr-only">
              Weight in pounds
            </label>
            <input
              id="weight"
              type="number"
              inputMode="numeric"
              pattern="[0-9]*"
              min={66}
              max={440}
              step={1}
              value={weight}
              onChange={handleChange}
              className="w-full px-5 py-4 rounded-xl border border-teal-300 text-2xl font-bold text-center focus:ring-2 focus:ring-teal-400 outline-none bg-white shadow"
              placeholder="Your weight in lbs"
              required
            />
            {error && (
              <div className="text-red-600 text-base font-semibold">{error}</div>
            )}
            <button
              type="submit"
              className={`w-full px-8 py-4 rounded-lg font-bold text-lg transition ${
                !weight || Number(weight) < 66 || Number(weight) > 440
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-teal-600 text-white hover:bg-teal-700"
              }`}
              disabled={!weight || Number(weight) < 66 || Number(weight) > 440}
            >
              Continue
            </button>
          </form>
          <span className="text-gray-400 text-xs text-center mt-2">
            Safety and anonymity guaranteed.
          </span>
        </section>
      </main>
      <Footer />
    </div>
  );
}


