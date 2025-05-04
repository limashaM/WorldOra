import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "./Assests/background.jpg";
import { FiArrowRight } from "react-icons/fi";
import Sigiriya from "./Assests/sigiriya.jpg";
import Eiffel from "./Assests/eiffel.jpg";
import Cappadocia from "./Assests/cappadocia.jpg";
import TajMahal from "./Assests/taj mahal.jpg";
import sampleVideo from "./Assests/video.mp4";
import logo from "./Assests/logo.png";

function App() {
  const navigate = useNavigate();
  const [countryData] = useState([
    { name: "Sri Lanka", image: Sigiriya, code: "LKA" },
    { name: "France", image: Eiffel, code: "FR" },
    { name: "Turkey", image: Cappadocia, code: "TR" },
    { name: "India", image: TajMahal, code: "IN" },
  ]);
  const userDate = sessionStorage.getItem("userEmail");

  const handleCountryClick = (code) => {
    navigate(`/details/${code}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Background Image Section with Text */}
      <section
        className="w-full h-[621px] bg-cover bg-no-repeat flex items-center justify-start px-12 relative"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPositionY: "20%",
          backgroundSize: "130%",
        }}
      >
        {/* Logo and Buttons */}
        <div className="absolute top-[-30px] left-0 w-full p-6 flex items-center justify-between">
          <img
            src={logo}
            alt="Worldora Logo"
            className="h-20 md:h-32 lg:h-40 w-auto ml-16 "
          />

          {userDate ? (
            <div className="space-x-4">
              <button
                onClick={() => navigate("/profile")}
                className="px-4 py-2 bg-cyan-500 text-white font-bold rounded hover:bg-cyan-600 transition"
              >
                Profile
              </button>
              <button
                onClick={() => {
                  sessionStorage.clear();
                  navigate("/");
                }}
                className="px-4 py-2 bg-cyan-500 text-white font-bold rounded hover:bg-cyan-600 transition"
              >
                Logout
              </button>
            </div>
          ) : 
          <div className="space-x-4">
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-cyan-500 text-white font-bold rounded hover:bg-cyan-600 transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/signup")}
              className="px-4 py-2 bg-cyan-500 text-white font-bold rounded hover:bg-cyan-600 transition"
            >
              Sign Up
            </button>
          </div>}
          
        </div>

        <div className="p-6 rounded-lg text-white max-w-xl z-10">
          <h6 className="text-7xl font-bold mb-9 relative before:content-['“'] after:content-['”'] before:absolute before:left-[-50px] after:absolute after:right-[40px] before:text-[180%] after:text-[180%] translate-y-[-30px]">
            Join a Global Journey of Discovery and Connection.
          </h6>
          <p className="text-lg text-gray-600 font-serif font-light translate-y-[-30px]">
            Unlock insights, explore cultures, and connect with a world of
            knowledge—one click at a time.
          </p>
          <div className="mt-8">
            <a
              href="/countries"
              className="px-6 py-3 bg-cyan-500 font-bold text-white rounded hover:bg-cyan-600 transition inline-flex items-center gap-2 translate-y-[-40px]"
            >
              View All <FiArrowRight className="text-xl" />
            </a>
          </div>
        </div>
      </section>

      {/* New Section with 4 Mini Boxes */}
      <section className="w-full h-[690px] py-20 px-12 bg-white">
        <h2 className="text-7xl font-bold text-gray-800 mb-6 translate-y-[-20px]">
          What is Next ?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {countryData.map((country, index) => (
            <div
              key={index}
              className="group relative shadow-lg rounded-lg overflow-hidden h-[400px]"
            >
              <img
                src={country.image}
                alt={country.name}
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                <button
                  onClick={() => handleCountryClick(country.code)}
                  className="text-white text-2xl font-bold py-3 px-6 bg-gray-400 rounded-full shadow-lg transform transition-all duration-300 hover:bg-grey-600 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-300"
                >
                  {country.name}
                </button>
              </div>
            </div>
          ))}
          <div className="absolute right-0 mt-[440px] mr-[35px]">
            <a
              href="/countries"
              className="px-6 py-3 bg-cyan-500 font-bold text-white rounded hover:bg-cyan-600 transition inline-flex items-center gap-2"
            >
              View All Countries <FiArrowRight className="text-xl" />
            </a>
          </div>
        </div>
      </section>

      {/* Background Video Section with Text */}
      <section className="relative w-full h-[630px] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={sampleVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <main className="flex flex-col items-center justify-center mt-0">
        {/* Additional content goes here */}
      </main>
    </div>
  );
}

export default App;
