import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080/api";

const samplePlan = {
  calories: 1800,
  meals: [
    {
      name: "Breakfast: Egg omelette with vegetables",
      kcal: 400,
      amount: "3 eggs, 3.5 oz bell pepper, 1.75 oz spinach"
    },
    {
      name: "Snack: Quark with nuts",
      kcal: 250,
      amount: "5.3 oz quark (or Greek yogurt), 1 oz nuts"
    },
    {
      name: "Lunch: Chicken breast with rice and broccoli",
      kcal: 600,
      amount: "5.3 oz chicken, 7 oz cooked rice, 3.5 oz broccoli"
    },
    {
      name: "Snack: Banana",
      kcal: 90,
      amount: "1 medium banana (~4.2 oz)"
    },
    {
      name: "Dinner: Salmon with roasted vegetables",
      kcal: 460,
      amount: "5.3 oz salmon, 7 oz assorted vegetables"
    }
  ],
  shoppingList:
    "18 eggs, 25 oz bell pepper, 12 oz spinach, 37 oz quark (or Greek yogurt), 7.5 oz nuts, 37 oz chicken breast, 49 oz cooked rice, 25 oz broccoli, 7 bananas, 37 oz salmon, 49 oz assorted vegetables"
};

export default function ManResult() {
  // Pull everything in US units (lbs, inches)
  const age = localStorage.getItem("age") || "";
  const gender = "man";
  const weight = localStorage.getItem("weight") || ""; // lbs
  const height = localStorage.getItem("height") || ""; // inches
  const goal = localStorage.getItem("goal") || "";
  const preferences = localStorage.getItem("preferences") || "";
  const allergies = localStorage.getItem("allergies") || "";

  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");

  const handleDownload = async () => {
    setError("");
    setDownloading(true);
    try {
      const requestData = {
        gender,
        age: Number(age),
        height: Number(height),
        weight: Number(weight),
        goal,
        preferences: preferences ? preferences.split(",") : [],
        allergies: allergies ? allergies.split(",") : []
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
      a.download = "diet-plan-man.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);

    } catch (e) {
      setError("An error occurred while downloading your PDF. Please try again or contact support.");
    } finally {
      setDownloading(false);
    }
  };

  const totalCalories = samplePlan.meals
    .map(m => m.kcal)
    .reduce((sum, c) => sum + c, 0);

  const weeklyShopping = samplePlan.shoppingList.split(", ");

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-teal-50">
      {/* Sample Plan Preview */}
      <div className="mt-16 mb-6 w-full max-w-3xl bg-white rounded-2xl shadow p-8 border-4 border-teal-300">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-3xl">🥩</span>
          <h2 className="text-2xl font-extrabold text-teal-800 flex-1">
            Sample Personalized Diet Plan{" "}
            <span className="text-base font-semibold text-teal-700">(US units)</span>
          </h2>
        </div>
        <div className="overflow-x-auto rounded-xl border border-teal-100 bg-teal-50/30">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white border-b border-teal-200">
                <th className="py-2 px-3 font-bold text-teal-900">Meal</th>
                <th className="py-2 px-3 font-bold text-teal-900">Calories</th>
                <th className="py-2 px-3 font-bold text-teal-900">
                  Amount <span className="text-xs text-teal-700">(US units)</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {samplePlan.meals.map((meal, idx) => (
                <tr key={idx} className={idx % 2 === 1 ? "bg-teal-50" : "bg-white"}>
                  <td className="py-1 px-3">{meal.name}</td>
                  <td className="py-1 px-3 text-center">{meal.kcal} kcal</td>
                  <td className="py-1 px-3">{meal.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-right mt-2 text-sm text-gray-600">
          Total daily intake: <span className="font-bold text-teal-700">{totalCalories} kcal</span>
        </div>
        <div className="mt-5 bg-teal-100/60 rounded-lg p-4 border border-teal-300">
          <div className="font-semibold text-teal-900 mb-1">
            Weekly shopping list <span className="text-xs text-teal-700">(US units):</span>
          </div>
          <div className="text-gray-700">
            {weeklyShopping.join(", ")}
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 flex flex-col gap-4 mb-12">
        <h1 className="text-2xl font-bold text-teal-700 text-center">
          Your personalized plan is ready!
        </h1>
        <p className="text-center text-sm text-gray-600">
          It may take <strong>1–5 minutes</strong> to generate your PDF. Please do not refresh or leave the page.
        </p>
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold hover:bg-teal-700 transition"
        >
          {downloading ? "Generating PDF..." : "Download your plan (PDF)"}
        </button>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <p className="text-xs text-gray-500 text-center">
          If you encounter any issues, please contact our support team at{" "}
          <a href="mailto:info@webappmaster.sk" className="underline">
            info@webappmaster.sk
          </a>.
        </p>
      </div>
    </div>
  );
}


