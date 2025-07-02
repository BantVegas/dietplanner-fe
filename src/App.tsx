// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

// Main entry: select gender
import GenderSelect from "./components/GenderSelect";

// Woman flow
import SelectAgeWoman from "./components/SelectAgeWoman";
import WomanWeight from "./components/WomanWeight";
import WomanHeight from "./components/WomanHeight";
import WomanGoal from "./components/WomanGoal";
import WomanPreferences from "./components/WomanPreferences";
import WomanAllergies from "./components/WomanAllergies";
import WomanResult from "./components/WomanResult"; // premenované z WomanVysledok

// Man flow
import SelectAgeMan from "./components/SelectAgeMan";
import ManWeight from "./components/ManWeight";
import ManHeight from "./components/ManHeight";
import ManGoal from "./components/ManGoal";
import ManPreferences from "./components/ManPreferences";
import ManAllergies from "./components/ManAllergies";
import ManResult from "./components/ManResult"; // premenované z ManVysledok

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<GenderSelect />} />

        {/* Woman flow */}
        <Route path="/woman/age" element={<SelectAgeWoman />} />
        <Route path="/woman/weight" element={<WomanWeight />} />
        <Route path="/woman/height" element={<WomanHeight />} />
        <Route path="/woman/goal" element={<WomanGoal />} />
        <Route path="/woman/preferences" element={<WomanPreferences />} />
        <Route path="/woman/allergies" element={<WomanAllergies />} />
        <Route path="/woman/result" element={<WomanResult />} />

        {/* Man flow */}
        <Route path="/man/age" element={<SelectAgeMan />} />
        <Route path="/man/weight" element={<ManWeight />} />
        <Route path="/man/height" element={<ManHeight />} />
        <Route path="/man/goal" element={<ManGoal />} />
        <Route path="/man/preferences" element={<ManPreferences />} />
        <Route path="/man/allergies" element={<ManAllergies />} />
        <Route path="/man/result" element={<ManResult />} />
      </Routes>
    </BrowserRouter>
  );
}
