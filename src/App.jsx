
import { useState } from "react";
import Random from "./components/Random";
import Tags from "./components/Tags";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-r from-cyan-200 to-violet-300"} w-full min-h-screen`}>
      {/* Navbar */}
      <nav className="flex justify-between items-center px-6 py-4 bg-white/70 backdrop-blur-md shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-violet-700">GIF Generator</h1>
      
          <button
    onClick={() => setDarkMode(!darkMode)}
    className={`w-20 h-10 flex items-center rounded-full p-1 transition-colors duration-300 ${
      darkMode ? "bg-gray-500" : "bg-yellow-400"
    }`}
  >
    {/* Sliding circle */}
    <div
      className={`bg-white w-8 h-8 rounded-full shadow-md transform transition-transform duration-300 ${
        darkMode ? "translate-x-10" : "translate-x-0"
      }`}
    ></div>
  </button>
      </nav>

      {/* Hero Section */}
      <section className="text-center my-8">
        <h2 className="text-3xl font-semibold">Search & Discover GIFs</h2>
        <p className="text-lg text-gray-600">Find trending memes, reactions, and fun GIFs instantly</p>
      </section>

      {/* Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6">
        <Tags />
        <Random />
        
      </div>

      {/* Footer */}
      <footer className="mt-10 py-4 text-center bg-white/70 backdrop-blur-md shadow-inner">
        <p className="text-sm text-gray-700">
          🚀 Built with React + Tailwind | Powered by Divyanshu Sharma
        </p>
      </footer>
    </div>
  );
}
