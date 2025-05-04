import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCountryByCode, getAllCountries } from "../Services/api";
import loadingAnimation from "../Assests/loading.gif";
import { FaArrowLeft } from "react-icons/fa";

const Details = () => {
  const { countryCode } = useParams();
  const [country, setCountry] = useState(null);
  const [countriesList, setCountriesList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryByCode(countryCode);
        setCountry(data[0]);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchAllCountries = async () => {
      try {
        const data = await getAllCountries();
        setCountriesList(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchCountry();
    fetchAllCountries();
  }, [countryCode]);

  // Filter countries based on search term - moved inside the component body
  const filteredCountries = countriesList.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group filtered countries by first letter
  const grouped = filteredCountries.reduce((acc, country) => {
    const firstLetter = country.name.common[0].toUpperCase();
    if (!acc[firstLetter]) acc[firstLetter] = [];
    acc[firstLetter].push({
      name: country.name.common,
      code: country.cca3
    });
    return acc;
  }, {});

  // Sort countries alphabetically within each letter group
  Object.keys(grouped).forEach((letter) => {
    grouped[letter].sort((a, b) => a.name.localeCompare(b.name));
  });

  if (!country) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-100 to-purple-100">
        <img src={loadingAnimation} alt="Loading..." className="w-16 h-16" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-12 px-4 font-sans">
      <button
        onClick={() => navigate(-1)}
        className="fixed top-6 left-6 p-3 bg-white rounded-full shadow-lg hover:bg-blue-100 transition-all duration-300 transform hover:scale-110 z-50"
        aria-label="Go back"
      >
        <FaArrowLeft className="text-xl text-blue-600" />
      </button>

      <div className="max-w-7xl mx-auto relative">
        {/* Country Name */}
        <h1
          className="text-5xl md:text-6xl text-center mb-16 text-gray-900 font-extrabold tracking-tight animate-fade-in"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {country.name?.common}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - Adjusted to take 8 columns */}
          <div className="lg:col-span-8 space-y-8">
            {/* Flag and Info Cards */}
            <div className="flex flex-col md:flex-row gap-10 w-full mb-12">
              <div className="md:w-1/2 lg:w-2/5">
                <img
                  src={country.flags?.svg || country.flags?.png}
                  alt={`Flag of ${country.name?.common}`}
                  className="w-full h-auto rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  style={{ maxHeight: "320px" }}
                />
                
                {country.coatOfArms?.svg && (
                  <div className="mt-4 flex justify-center">
                    <img 
                      src={country.coatOfArms?.svg}
                      alt={`Coat of arms of ${country.name?.common}`}
                      className="h-24 w-auto transition-all duration-300 hover:scale-110" 
                    />
                  </div>
                )}
              </div>
              
              <div className="md:w-1/2 lg:w-3/5 flex flex-col gap-6 justify-center">
                <div
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-103 hover:-translate-y-1 cursor-pointer border-l-4 border-blue-500 relative overflow-hidden group"
                  aria-label="Official Name card"
                >
                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 2a1 1 0 00-1 1v1.323l-3.954 1.582a1 1 0 00-.62.919V9a1 1 0 001 1h1.82l-.824 2.316a1 1 0 001.187 1.368L10 12.92l3.391.764a1 1 0 001.187-1.368L13.754 10h1.82a1 1 0 001-1V5.824a1 1 0 00-.62-.919L12 3.323V3a1 1 0 00-1-1h-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="font-semibold text-xl text-gray-800">
                      Official Name
                    </p>
                  </div>
                  <p className="text-lg text-gray-600 mt-4 pl-8">
                    {country.name?.official}
                  </p>
                </div>

                <div
                  className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-103 hover:-translate-y-1 cursor-pointer border-l-4 border-blue-500 relative overflow-hidden group"
                  aria-label="Capital card"
                >
                  <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div className="flex items-center space-x-3">
                    <div className="bg-blue-500 text-white p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <p className="font-semibold text-xl text-gray-800">
                      Capital
                    </p>
                  </div>
                  <p className="text-lg text-gray-600 mt-4 pl-8">
                    {country.capital?.[0] || "N/A"}
                  </p>
                </div>
              </div>
            </div>

            {/* Combined Country Details Box */}
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b-2 border-blue-200 pb-2">Country Details</h2>
              
              <div
                className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-103 hover:-translate-y-1 cursor-pointer border-l-4 border-blue-500 relative overflow-hidden group"
                aria-label="Country details box"
              >
                <div className="absolute inset-0 bg-blue-500 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Region */}
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-blue-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold text-xl text-gray-800">Region</p>
                    </div>
                    <p className="text-lg text-gray-600 ml-8">{country.region}</p>
                    <p className="text-md text-gray-500 ml-8">{country.subregion}</p>
                  </div>

                  {/* Population */}
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-blue-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                        </svg>
                      </div>
                      <p className="font-semibold text-xl text-gray-800">Population</p>
                    </div>
                    <p className="text-lg text-gray-600 ml-8">{country.population.toLocaleString()}</p>
                  </div>

                  {/* Area */}
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-blue-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold text-xl text-gray-800">Area</p>
                    </div>
                    <p className="text-lg text-gray-600 ml-8">{country.area.toLocaleString()} km²</p>
                  </div>

                  {/* Timezone */}
                  <div className="flex flex-col">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-blue-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold text-xl text-gray-800">Timezones</p>
                    </div>
                    <p className="text-lg text-gray-600 ml-8 line-clamp-2">{country.timezones?.join(", ")}</p>
                  </div>
                
                  {/* Languages */}
                  <div className="flex flex-col md:col-span-2">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-blue-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold text-xl text-gray-800">Languages</p>
                    </div>
                    <p className="text-lg text-gray-600 ml-8">
                      {country.languages
                        ? Object.values(country.languages).join(", ")
                        : "N/A"}
                    </p>
                  </div>

                  {/* Currencies */}
                  <div className="flex flex-col md:col-span-2">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="bg-blue-500 text-white p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="font-semibold text-xl text-gray-800">Currencies</p>
                    </div>
                    <p className="text-lg text-gray-600 ml-8">
                      {country.currencies
                        ? Object.values(country.currencies)
                            .map((c) => `${c.name} (${c.symbol})`)
                            .join(", ")
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Adjusted to take 4 columns and move slightly right with pl-2 */}
          <div className="lg:col-span-4 lg:pl-2">
            <div className="sticky top-20 w-full bg-white bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-xl p-6 max-h-[80vh] overflow-y-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9" />
                </svg>
                Explore Countries
              </h2>
              <div className="rounded-lg bg-blue-50 px-4 py-3 mb-4">
                <input 
                  type="text" 
                  className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                  placeholder="Filter countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Filter countries" 
                />
              </div>
              <div className="space-y-4">
                {Object.keys(grouped).sort().length > 0 ? (
                  Object.keys(grouped)
                    .sort()
                    .map((letter) => (
                      <div key={letter} className="mb-4">
                        <h3 className="text-lg font-semibold text-blue-700 bg-blue-50 px-4 py-2 rounded-lg">
                          {letter}
                        </h3>
                        <ul className="mt-2 space-y-1">
                          {grouped[letter].map((countryItem) => (
                            <li
                              key={countryItem.code}
                              className={`cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-blue-100 px-4 py-2 rounded-lg transition-all duration-200 ${
                                country.name.common === countryItem.name ? "bg-blue-100 text-blue-700 font-medium" : ""
                              }`}
                              onClick={() => navigate(`/details/${countryItem.code}`)}
                            >
                              {countryItem.name}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))
                ) : (
                  <div className="text-center py-4 text-gray-600">
                    No countries match your search
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Details;