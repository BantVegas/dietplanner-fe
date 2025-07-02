import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ManHeight() {
  const [feet, setFeet] = useState<string>("");
  const [inches, setInches] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Enter your height | dietplanner.eu";
    let desc = document.querySelector('meta[name="description"]');
    if (!desc) {
      desc = document.createElement("meta");
      desc.setAttribute("name", "description");
      document.head.appendChild(desc);
    }
    desc.setAttribute(
      "content",
      "Enter your height for an accurate personalized diet plan. Our calculator considers every detail for effective weight loss or muscle gain – fast, anonymous, no registration needed."
    );
    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement("meta");
      keywords.setAttribute("name", "keywords");
      document.head.appendChild(keywords);
    }
    keywords.setAttribute(
      "content",
      "height, feet, inches, diet, calculator, diet plan, BMI, health, nutrition, weight loss, muscle gain, man, men's diet, height in ft, height in inches"
    );
  }, []);

  const totalInches =
    feet && inches ? Number(feet) * 12 + Number(inches) : 0;
  const cm = totalInches ? Math.round(totalInches * 2.54) : "";

  const handleFeetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setFeet(value);
    setError(null);
  };

  const handleInchesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (Number(value) > 11) value = "11";
    setInches(value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !feet ||
      !inches ||
      isNaN(totalInches) ||
      totalInches < 58 || // 4'10"
      totalInches > 83    // 6'11"
    ) {
      setError("Please enter a valid height between 4'10\" and 6'11\".");
      return;
    }
    localStorage.setItem("height", totalInches.toString()); // <-- inches, jednotný formát
    navigate("/man/goal");
  };

  const isValid =
    feet !== "" &&
    inches !== "" &&
    totalInches >= 58 &&
    totalInches <= 83;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-teal-100 via-white to-teal-200">
      <Navbar />
      <main className="flex-1 flex flex-col items-center pt-14 sm:pt-16 px-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-12 text-gray-900 text-center">
          Enter your height
        </h1>
        <div className="hidden sm:grid sm:grid-cols-3 items-start justify-center gap-8 mb-8 w-full max-w-7xl">
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg text-gray-800 text-center leading-relaxed">
              Your height is key for the right calorie and nutrition setup. The more precise your height, the more accurate your personalized plan – for both weight loss and muscle gain.
              <br /><br />
              Every inch affects BMI, metabolism calculation, and food recommendations. Our expert plan always counts with your real height – it influences both energy and physiological needs.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/images/man-height.png"
              alt="Man measuring height"
              className="w-56 h-80 object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center">
            <p className="text-lg text-gray-800 text-center leading-relaxed">
              All information you enter is anonymous and used only to create your personal plan – never for comparison with others.
              <br /><br />
              The right plan takes your height, age, lifestyle, and goals into account. Don’t be afraid to enter your true height – the more precise the data, the more precise your plan. Healthy results always start with accurate inputs. We’re here to help you reach your goals effectively and safely!
            </p>
          </div>
        </div>
        <div className="sm:hidden flex flex-col gap-6 mt-2 w-full max-w-2xl mx-auto">
          <img
            src="/images/man-height.png"
            alt="Man measuring height"
            className="w-44 h-64 object-cover mx-auto"
          />
          <p className="text-base text-gray-800 text-center leading-relaxed">
            Height is important for setting up your calories and nutrients. Entering your real height is key to an accurate personalized plan.
          </p>
          <p className="text-base text-gray-800 text-center leading-relaxed">
            All your information is anonymous and only used for your plan. Accurate info = accurate results!
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full max-w-xs mt-12"
        >
          <label htmlFor="height" className="block text-lg font-semibold text-gray-700 mb-2">
            Your height (ft & inches)
          </label>
          <div className="flex gap-2 w-full justify-center">
            <input
              id="feet"
              type="number"
              min={4}
              max={6}
              value={feet}
              onChange={handleFeetChange}
              className="w-16 px-2 py-3 rounded-xl border border-teal-300 text-xl font-bold text-center focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="ft"
              required
            />
            <span className="text-lg self-center font-semibold">ft</span>
            <input
              id="inches"
              type="number"
              min={0}
              max={11}
              value={inches}
              onChange={handleInchesChange}
              className="w-16 px-2 py-3 rounded-xl border border-teal-300 text-xl font-bold text-center focus:ring-2 focus:ring-teal-400 outline-none"
              placeholder="in"
              required
            />
            <span className="text-lg self-center font-semibold">in</span>
          </div>
          <div className="text-gray-600 text-sm">
            {feet && inches
              ? `= ${totalInches} in (${cm} cm)`
              : ""}
          </div>
          {error && (
            <div className="text-red-600 text-base font-semibold">{error}</div>
          )}
          <button
            type="submit"
            className="w-full px-8 py-4 rounded-lg bg-teal-600 text-white font-bold text-lg hover:bg-teal-700 transition"
            disabled={!isValid}
          >
            Continue
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}


