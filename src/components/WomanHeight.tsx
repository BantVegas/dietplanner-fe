import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function WomanHeight() {
  const [height, setHeight] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // SEO meta tags
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
      "Enter your height to get a personalized diet plan for women. Every detail matters for effective and healthy weight management. Discreet, fast and expert — dietplanner.eu."
    );

    let keywords = document.querySelector('meta[name="keywords"]');
    if (!keywords) {
      keywords = document.createElement("meta");
      keywords.setAttribute("name", "keywords");
      document.head.appendChild(keywords);
    }
    keywords.setAttribute(
      "content",
      "height, women's diet, diet plan, healthy weight loss, health, BMI, women, nutrition counseling, height in inches, female nutrition"
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setHeight(value);
    setError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numHeight = Number(height);

    if (!height || isNaN(numHeight) || numHeight < 51 || numHeight > 79) {
      setError("Please enter a valid height between 51 and 79 inches.");
      return;
    }
    // Save height to localStorage (in inches)
    localStorage.setItem("height", height);
    navigate("/woman/goal");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-teal-100 via-white to-teal-200">
      <Navbar />
      <main className="flex-1 flex flex-col items-center pt-32 px-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-12 text-gray-900 text-center">
          Enter your height
        </h1>

        {/* Desktop: Wide texts next to image */}
        <div className="hidden sm:flex flex-row items-start justify-between gap-8 mb-2 w-full max-w-7xl">
          {/* Left info text */}
          <div className="flex-1 flex items-center justify-end">
            <p className="text-xl text-gray-800 text-right leading-relaxed max-w-2xl">
              Height is a key factor for setting the right calorie intake, protein, and other nutrients. The more accurately you enter your height, the more precise your individual nutrition plan will be.
              <br /><br />
              Even a few inches up or down can affect recommended food quantities, BMI, or basal metabolic rate. An expert plan for women always considers height as one of the most important parameters, since it affects both your energy and physiological needs.
            </p>
          </div>
          {/* Image */}
          <img
            src="/images/woman-height.png"
            alt="Woman measuring height"
            className="w-56 h-80 object-cover mx-4"
          />
          {/* Right motivation text */}
          <div className="flex-1 flex items-center justify-start">
            <p className="text-xl text-gray-800 text-left leading-relaxed max-w-2xl">
              Every detail you enter is anonymous and used only to calculate your personal plan — never for comparison with others.
              <br /><br />
              A well-designed plan takes your height, age, lifestyle and goals into account. Don’t be afraid — the more precise your data, the more tailored your plan will be. Healthy weight management starts with a proper analysis. We’re here to help you on your journey to better health and confidence!
            </p>
          </div>
        </div>

        {/* Mobile: texts below image */}
        <div className="sm:hidden flex flex-col gap-6 mt-4 w-full max-w-2xl mx-auto">
          <img
            src="/images/woman-height.png"
            alt="Woman measuring height"
            className="w-44 h-64 object-cover mx-auto"
          />
          <p className="text-base text-gray-800 text-center leading-relaxed">
            Height is an important factor for setting your calorie and nutrient needs. The more precisely you enter your height, the more accurate your custom plan will be.
          </p>
          <p className="text-base text-gray-800 text-center leading-relaxed">
            Every detail you provide is anonymous and only used to generate your personal plan. Accurate info = the best results for you!
          </p>
        </div>

        {/* Google AdSense position */}
        <div className="w-full flex justify-center my-8">
          {/* 
          <ins className="adsbygoogle"
            style={{ display: "block", width: "100%", minHeight: "90px" }}
            data-ad-client="ca-pub-XXXXXXXXXXXXXXX"
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          ></ins>
          */}
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4 w-full max-w-xs mt-8"
        >
          <input
            type="number"
            min={51}
            max={79}
            step={1}
            value={height}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl border border-teal-300 text-2xl font-bold text-center focus:ring-2 focus:ring-teal-400 outline-none"
            placeholder="Your height in inches"
            required
          />
          {error && (
            <div className="text-red-600 text-base font-semibold">{error}</div>
          )}
          <button
            type="submit"
            className="w-full px-8 py-4 rounded-lg bg-teal-600 text-white font-bold text-lg hover:bg-teal-700 transition"
            disabled={!height || Number(height) < 51 || Number(height) > 79}
          >
            Continue
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
}

