import React, { useState } from "react";

function NavBar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleClick = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-black p-4 fixed top-0 left-0 right-0 z-10">
      <div className="lg:container mx-auto flex items-center justify-between">
        {}
        <a href="#home" onClick={() => handleClick("home")}>
          <h1 className="text-4xl text-white font-bold lg:text-xl bungee-regular w-min">
            TORNADO SOUND PERFECTION
          </h1>
        </a>

        <a
          href="#book"
          onClick={() => handleClick("book")}
          className="block px-4 py-2 rounded-md bungee-regular text-6xl text-white bg-green-500 hover:bg-green-700 lg:hidden"
        >
          Book Now
        </a>

        {}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16m-7 6h7"
              }
            />
          </svg>
        </button>

        {}
        <div className="hidden lg:flex space-x-8">
          <a
            href="#home"
            className="text-white hover:text-blue-400 bungee-regular
              "
            onClick={() => handleClick("home")}
          >
            Home
          </a>
          <a
            href="#services"
            className="text-white hover:text-blue-400 bungee-regular"
            onClick={() => handleClick("services")}
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-white hover:text-blue-400 bungee-regular"
            onClick={() => handleClick("contact")}
          >
            Contact
          </a>
        </div>

        {}
        <div className="hidden lg:flex items-center space-x-4">
          <a
            className="px-4 py-2 rounded-md bungee-regular text-white bg-green-500 hover:bg-green-700"
            href="#book"
          >
            Book Now
          </a>
        </div>
      </div>
      {}
      {isMobileMenuOpen && (
        <div className="text-4xl space-y-4 lg:hidden mt-2">
          <a
            href="#home"
            onClick={() => handleClick("home")}
            className="block text-white hover:text-blue-400 bungee-regular"
          >
            Home
          </a>
          <a
            href="#services"
            onClick={() => handleClick("services")}
            className="block text-white hover:text-blue-400 bungee-regular"
          >
            Services
          </a>
          <a
            href="#contact"
            onClick={() => handleClick("contact")}
            className="block text-white hover:text-blue-400 bungee-regular"
          >
            Contact
          </a>
          <a
            href="#book"
            onClick={() => handleClick("book")}
            className="block px-4 py-2 rounded-md bungee-regular text-white bg-green-500 hover:bg-green-700"
          >
            Book Now
          </a>
        </div>
      )}
    </nav>
  );
}

export default NavBar;
