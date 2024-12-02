import React, { useState, useEffect } from "react";
import { MdOutlineNightlight } from "react-icons/md";
import Article from "./Article";

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const regions = [
    { name: "Europe" },
    { name: "Asia" },
    { name: "Africa" },
    { name: "Oceania" },
    { name: "Americas" },
    { name: "Antarctic" },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    document.title = `Showing All Countries`;
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch("https://restcountries.com/v3.1/all");
        const data = await res.json();
        setCountries(data);
      } catch (error) {
        console.error(error);
      }
    };
    getCountries();
  }, []);

  async function searchCountry() {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/name/${searchText}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function filterByRegion(region) {
    try {
      const res = await fetch(
        `https://restcountries.com/v3.1/region/${region}`
      );
      const data = await res.json();
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  function handleSearchCountry(e) {
    e.preventDefault();
    searchCountry();
  }

  function handleFilterByRegion(e) {
    e.preventDefault();
    filterByRegion();
  }

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="header flex justify-between items-center py-4 px-6 shadow">
        <h1 className="text-xl font-bold">Where in the world?</h1>
        <button
          onClick={toggleDarkMode}
          className="flex items-center gap-2 text-gray-900 dark:text-white"
        >
          <MdOutlineNightlight
            className={`text-xl ${darkMode ? "text-yellow-400" : "text-gray-800"}`}
          />
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {!countries ? (
        <h1 className="font-bold uppercase tracking-wide flex items-center justify-center text-center h-screen text-4xl">
          Loading...
        </h1>
      ) : (
        <section className="container mx-auto p-8">
          {/* Form */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">
            <form
              onSubmit={handleSearchCountry}
              autoComplete="off"
              className="max-w-4xl md:flex-1"
            >
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for a country by its name"
                required
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="py-3 px-4 w-full shadow rounded outline-none text-gray-600 placeholder-gray-600 dark:text-gray-400 dark:placeholder-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700 transition-all duration-200"
              />
            </form>

            <form onSubmit={handleFilterByRegion}>
              <select
                name="filter-by-region"
                id="filter-by-region"
                className="w-52 py-3 px-4 outline-none shadow rounded text-gray-600 dark:text-gray-400 dark:bg-gray-800 dark:focus:bg-gray-700"
                onChange={(e) => filterByRegion(e.target.value)}
              >
                {regions.map((region, index) => (
                  <option key={index} value={region.name}>
                    {region.name}
                  </option>
                ))}
              </select>
            </form>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {countries.map((country) => (
              <Article key={country.name.common} {...country} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
