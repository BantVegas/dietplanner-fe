import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const goals = [
  {
    label: "Lose weight",
    img: "/images/goal-schudnut.png",
    desc: "I want to reduce my body weight.",
  },
  {
    label: "Maintain weight",
    img: "/images/goal-udrzat.png",
    desc: "I want to keep my current weight.",
  },
  {
    label: "Gain weight",
    img: "/images/goal-pribrat.png",
    desc: "I want to gain weight in a healthy way.",
  },
  {
    label: "Body shaping",
    img: "/images/goal-formovat.png",
    desc: "I want to tone and shape my body.",
  },
];


export default function ManGoal() {
  const navigate = useNavigate();

  const handleSelect = (idx: number) => {
    localStorage.setItem("goal", goals[idx].label);
    navigate("/man/preferences");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-teal-100 via-white to-teal-200">
      <Navbar />
      <main className="flex-1 flex flex-col items-center pt-32 px-2">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 text-center mb-3">
            What is your goal?
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full max-w-2xl mb-10">
          {goals.map((goal, idx) => (
            <button
              key={goal.label}
              className="relative flex flex-col items-center justify-end h-64 rounded-2xl shadow-md border-2 overflow-hidden transition-all hover:scale-105 group border-transparent"
              onClick={() => handleSelect(idx)}
              type="button"
            >
              {/* Background image */}
              <img
                src={goal.img}
                alt={goal.label}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/40 transition group-hover:bg-black/30"></div>
              {/* Foreground texts */}
              <div className="relative z-10 flex flex-col items-center px-4 py-6">
                <span className="text-2xl sm:text-3xl font-extrabold text-white mb-2 drop-shadow-md">
                  {goal.label}
                </span>
                <span className="text-base sm:text-lg font-medium text-white drop-shadow-md text-center">
                  {goal.desc}
                </span>
              </div>
            </button>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
