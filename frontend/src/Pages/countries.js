import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaSlidersH,
  FaSearch,
  FaHome,
  FaFilter,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  getAllCountries,
  searchCountryByName,
  searchByCurrency,
  searchByRegion,
} from "../Services/api";
import logo from "../Assests/logo.png";
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";


const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [allCountries, setAllCountries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [currency, setCurrency] = useState("");
  const [region, setRegion] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showCurrencySearch, setShowCurrencySearch] = useState(false);
  const [showRegionFilter, setShowRegionFilter] = useState(false);

  const navigate = useNavigate();

  const fetchAll = async () => {
    try {
      const data = await getAllCountries();
      setCountries(data);
      setAllCountries(data);
      setSelectedLetter("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const handleSearch = async (e) => {
    try {
      const searchValue = e.target.value;
      setSearchName(searchValue);
      if (searchValue) {
        const data = await searchCountryByName(searchValue);
        setCountries(data);
        setSelectedLetter("");
      } else {
        fetchAll();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCurrencySearch = async (e) => {
    try {
      const currencyValue = e.target.value;
      setCurrency(currencyValue);
      if (currencyValue) {
        const data = await searchByCurrency(currencyValue);
        setCountries(data);
        setSelectedLetter("");
      } else {
        fetchAll();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRegionFilter = async (regionValue) => {
    try {
      setRegion(regionValue);
      if (regionValue) {
        const data = await searchByRegion(regionValue);
        setCountries(data);
        setSelectedLetter("");
      } else {
        fetchAll();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleLetterClick = (letter) => {
    setSelectedLetter(letter);
    const filtered = allCountries.filter((c) =>
      c.name?.common?.toLowerCase().startsWith(letter.toLowerCase())
    );
    setCountries(filtered);
  };

  const toggleFavorite = (e, countryCode) => {

    e.stopPropagation();

    if (favorites.includes(countryCode)) {
      setFavorites(favorites.filter((code) => code !== countryCode));
    } else {
      setFavorites([...favorites, countryCode]);
    }
  };

  const navigateToCountry = (countryCode) => {
    navigate(`/details/${countryCode}`);
  };

  const navigateToHome = () => {
    navigate("/countries");
  };

  const handleLogout = () => {
    // Implement logout functionality here
    // For example: clear local storage, cookies, etc.
    Toastify({
      text: "Logging out...",
      duration: 3000,  // Show for 3 seconds
      close: true,     // Enable close button
      gravity: "top",  // Position at the top of the page
      position: "right",  // Position on the right side
      backgroundColor: "#FF5733",  // Custom background color
    }).showToast();
    // After logout logic, navigate to login page
    navigate("/login");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full bg-white shadow-lg z-50 transition-all duration-300 ${
          showSidebar ? "w-64" : "w-0 overflow-hidden"
        }`}
      >
        {/* Header with Logo */}
        <div className="flex items-center justify-center p-4">
          <img
            src={logo}
            alt="Worldora Logo"
            className="h-20 w-auto object-contain" // Increased height to h-20
          />
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-4">
          <button
            onClick={navigateToHome}
            className="flex items-center w-full px-6 py-3 hover:bg-blue-50 transition-colors"
          >
            <FaHome className="text-blue-700 text-xl mr-3" />
            <span className="text-gray-700 font-medium">Home</span>
          </button>

          <div className="px-4 py-2">
            <div
              onClick={() => setShowCurrencySearch(!showCurrencySearch)}
              className="flex items-center w-full px-2 py-3 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <FaSearch className="text-blue-700 text-xl mr-3" />
              <span className="text-gray-700 font-medium">
                Search by Currency
              </span>
            </div>

            {showCurrencySearch && (
              <div className="pl-8 pr-4 py-2">
                <input
                  type="text"
                  placeholder="Enter currency code (e.g. USD)"
                  className="p-2 border rounded w-full"
                  value={currency}
                  onChange={handleCurrencySearch}
                />
              </div>
            )}
          </div>

          <div className="px-4 py-2">
            <div
              onClick={() => setShowRegionFilter(!showRegionFilter)}
              className="flex items-center w-full px-2 py-3 hover:bg-blue-50 transition-colors cursor-pointer"
            >
              <FaFilter className="text-blue-700 text-xl mr-3" />
              <span className="text-gray-700 font-medium">
                Filter by Region
              </span>
            </div>

            {showRegionFilter && (
              <div className="pl-8 pr-4 py-2">
                <select
                  className="p-2 border rounded w-full"
                  value={region}
                  onChange={(e) => handleRegionFilter(e.target.value)}
                >
                  <option value="">All Regions</option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="Americas">Americas</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Antarctica">Antarctica</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Logout Button at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full p-3 bg-red-50 hover:bg-red-100 text-red-600 rounded transition-colors"
          >
            <FaSignOutAlt className="mr-2" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <div className="fixed top-5 left-5 z-50">
        <FaSlidersH
          onClick={() => setShowSidebar(!showSidebar)}
          className="text-3xl text-blue-700 cursor-pointer"
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 p-4 transition-all duration-300 ${
          showSidebar ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-screen-xl mx-auto">
          {/* Title */}
          <h1 className="mt-8 text-5xl font-extrabold text-center text-blue-700 tracking-wide uppercase font-serif">
            Journey Through Nations
          </h1>

          {/* Search by country name */}
          <div className="mt-10 mb-6 flex justify-end w-full">
            {showSearch ? (
              <div className="flex items-center max-w-md bg-white border border-blue-300 rounded-full shadow-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition-all duration-300">
                <FaSearch
                  className="text-blue-600 mr-3 text-lg cursor-pointer"
                  onClick={() => setShowSearch(false)}
                />
                <input
                  type="text"
                  placeholder="Search by country name"
                  className="flex-grow outline-none text-gray-700 placeholder-gray-400"
                  value={searchName}
                  onChange={handleSearch}
                  autoFocus
                />
              </div>
            ) : (
              <FaSearch
                className="text-blue-600 text-2xl cursor-pointer"
                onClick={() => setShowSearch(true)}
              />
            )}
          </div>

          {/* A–Z Alphabet Filter */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
            {"ABCDEFGHIJKLMNOPQRSTUVWXYZ"
              .split("")
              .map((letter, index, array) => (
                <div key={letter} className="flex items-center space-x-4">
                  <button
                    onClick={() => handleLetterClick(letter)}
                    className={`text-xl font-semibold transition duration-200 ${
                      selectedLetter === letter
                        ? "text-blue-700 font-bold underline underline-offset-8"
                        : "text-gray-700 hover:text-blue-500"
                    }`}
                  >
                    {letter}
                  </button>
                  {index !== array.length - 1 && (
                    <span className="text-gray-400 text-xl font-semibold">
                      |
                    </span>
                  )}
                </div>
              ))}

            <button
              onClick={fetchAll}
              className="ml-6 text-base text-gray-500 hover:text-black underline underline-offset-4"
            >
              Reset
            </button>
          </div>

          {/* Country Cards */}
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {countries.map((country) => (
              <div
                key={country.cca3}
                onClick={() => navigateToCountry(country.cca3)}
                className="group relative rounded-md overflow-hidden cursor-pointer bg-white shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                role="button"
                aria-label={`View details for ${country.name?.common}`}
                tabIndex="0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    navigateToCountry(country.cca3);
                  }
                }}
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={country.flags?.png}
                    alt={`Flag of ${country.name?.common}`}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                  />
                </div>

                <div className="flex justify-between items-center px-3 py-3 bg-white group-hover:bg-blue-50 transition-all duration-300">
                  <div className="text-2xl font-bold font-serif text-gray-800 text-center w-full">
                    {country.name?.common}
                  </div>

                  <div
                    className="text-xl ml-2 cursor-pointer"
                    onClick={(e) => toggleFavorite(e, country.cca3)}
                    aria-label={
                      favorites.includes(country.cca3)
                        ? "Remove from favorites"
                        : "Add to favorites"
                    }
                  >
                    {favorites.includes(country.cca3) ? (
                      <FaHeart className="text-red-500 hover:scale-110 transition-transform duration-200" />
                    ) : (
                      <FaRegHeart className="text-gray-500 hover:text-red-400 hover:scale-110 transition-all duration-200" />
                    )}
                  </div>
                </div>

                <div className="absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Countries;
