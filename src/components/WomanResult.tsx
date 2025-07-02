import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

const sampleMeals = [
  {
    meal: "Breakfast: Greek yogurt parfait",
    calories: "350 kcal",
    amount: "6 oz Greek yogurt, 1/2 cup blueberries, 1 oz granola, 1 tsp honey"
  },
  {
    meal: "Snack: Almonds & apple",
    calories: "180 kcal",
    amount: "1 small apple, 0.75 oz almonds"
  },
  {
    meal: "Lunch: Turkey & veggie wrap",
    calories: "540 kcal",
    amount: "2.5 oz turkey breast, 1 whole wheat tortilla, 1 cup mixed greens, 2 slices tomato, 1 tbsp hummus"
  },
  {
    meal: "Snack: Baby carrots & hummus",
    calories: "110 kcal",
    amount: "1 cup baby carrots, 2 tbsp hummus"
  },
  {
    meal: "Dinner: Shrimp stir-fry with brown rice",
    calories: "480 kcal",
    amount: "4 oz shrimp, 1 cup broccoli, 1 cup bell pepper, 1 cup brown rice, 1 tbsp soy sauce"
  }
];

const totalCalories = sampleMeals
  .map(m => parseInt(m.calories))
  .reduce((a, b) => a + b, 0);

const weeklyShopping = [
  "32 oz Greek yogurt", "3 cups blueberries", "7 oz granola", "7 tsp honey",
  "7 apples", "5.25 oz almonds", "17.5 oz turkey breast", "7 whole wheat tortillas",
  "7 cups mixed greens", "14 slices tomato", "7 tbsp hummus", "7 cups baby carrots",
  "28 tbsp hummus", "28 oz shrimp", "7 cups broccoli", "7 cups bell pepper",
  "7 cups brown rice", "7 tbsp soy sauce"
];

export default function WomanResult() {
  // Načítanie údajov z localStorage (prispôsob podľa svojho backendu)
  const gender = "woman";
  const age = localStorage.getItem("age") || "";
  const weight = localStorage.getItem("weight") || "";
  const height = localStorage.getItem("height") || "";
  const goal = localStorage.getItem("goal") || "";
  const preferences = (localStorage.getItem("preferences") || "").split(",");
  const allergies = (localStorage.getItem("allergies") || "").split(",");

  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  // DOWNLOAD HANDLER
  const handleDownload = async () => {
    setError("");
    setDownloading(true);
    try {
      const requestData = {
        gender,
        age: Number(age),
        weight: Number(weight),
        height: Number(height),
        goal,
        preferences,
        allergies
      };

      const response = await fetch(`${BACKEND_URL}/plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData)
      });
      if (!response.ok) throw new Error("Unable to generate PDF plan.");
      const result = await response.json();

      const pdfBase64 = result.pdf;
      if (!pdfBase64) throw new Error("No PDF in response.");

      const binary = atob(pdfBase64);
      const array = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i);
      const blob = new Blob([array], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "diet-plan-woman.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      setError("An error occurred while downloading your PDF. Please try again or contact support.");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-x-hidden bg-teal-50">
      {/* Sample table */}
      <div className="mt-16 mb-6 w-full max-w-3xl mx-auto bg-white rounded-2xl shadow p-8 border-4 border-teal-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">🥩</span>
          <h2 className="text-2xl font-extrabold text-teal-800 flex-1">
            Sample Personalized Diet Plan{" "}
            <span className="text-base font-semibold text-teal-700">(All amounts in US units)</span>
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-teal-100 bg-teal-50/30">
          <table className="w-full text-left rounded-xl">
            <thead>
              <tr className="bg-white border-b border-teal-200">
                <th className="py-2 px-3 text-lg font-bold text-teal-900">Meal</th>
                <th className="py-2 px-3 text-lg font-bold text-teal-900">Calories</th>
                <th className="py-2 px-3 text-lg font-bold text-teal-900">
                  Amount <span className="text-xs text-teal-700 font-semibold">(US units)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {sampleMeals.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? "bg-teal-50" : "bg-white"}>
                  <td className="py-2 px-3 text-[16px] font-medium text-gray-800">{row.meal}</td>
                  <td className="py-2 px-3 text-[15px] font-semibold text-green-700">{row.calories}</td>
                  <td className="py-2 px-3 text-[15px] text-gray-700">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-2 text-sm text-gray-600">
          <span className="font-semibold">
            Total daily intake: <span className="text-teal-900 font-bold">{totalCalories} kcal</span>
          </span>
          <span className="ml-2 text-gray-400">| Personalized for your input (US units)</span>
        </div>
        <div className="mt-5 bg-teal-100/60 rounded-lg p-4 border border-teal-300">
          <div className="font-semibold text-teal-900 mb-2">
            Weekly shopping list{" "}
            <span className="text-xs text-teal-700 font-semibold">(US units):</span>
          </div>
          <div className="text-gray-700 text-[15px]">{weeklyShopping.join(", ")}</div>
        </div>
      </div>

      {/* Download section */}
      <div className="z-20 bg-white shadow-lg rounded-xl p-8 max-w-md w-full mx-auto flex flex-col gap-4 mb-12 items-center">
        <h1 className="text-2xl font-bold text-teal-700 mb-2 text-center">
          Your personalized plan is ready!
        </h1>
        <p className="text-center text-sm text-gray-600 mb-2">
          It may take <strong>1–5 minutes</strong> to generate your PDF. Please do not refresh or leave the page.
        </p>
        <button
          onClick={handleDownload}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition text-lg"
          disabled={downloading}
        >
          {downloading ? "Generating PDF..." : "Download your plan (PDF)"}
        </button>
        {error && <div className="text-red-500 mt-2 text-center">{error}</div>}
        <p className="text-xs text-gray-500 mt-3 text-center">
          If you encounter any issues, please contact our support team at{" "}
          <a href="mailto:info@webappmaster.sk" className="underline">
            info@webappmaster.sk
          </a>.
        </p>
      </div>
    </div>
  );
}





