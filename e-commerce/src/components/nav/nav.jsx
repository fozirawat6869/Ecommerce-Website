

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch, IoCart } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav className="flex items-center justify-between px-3 md:px-20 py-3 bg-white sticky top-0 border-b border-gray-200 z-50">
        {/* Left: Logo */}
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-blue-500 whitespace-nowrap"
        >
          ShopEasy
        </Link>

        {/* Center: Links */}
        <ul
          className={`${
            isMenuOpen
              ? "flex flex-col absolute top-16 left-0 w-full bg-white border-t border-gray-200 py-4 shadow-md z-40"
              : "hidden"
          } md:flex md:flex-row md:static md:w-auto md:shadow-none md:gap-8 items-center transition-all duration-300`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 hover:text-blue-600 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/AllProducts"
              className="block px-4 py-2 hover:text-blue-600 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className="block px-4 py-2 hover:text-blue-600 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="block px-4 py-2 hover:text-blue-600 text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right: Search + Icons */}
        <div className="flex items-center gap-4">
          {/* Search (hidden on small) */}
          <div className="hidden md:block">
            <form className="relative">
              <input
                type="text"
                placeholder="Search ..."
                className="bg-gray-100 px-8 py-2 rounded-xl outline-none w-52 lg:w-72"
              />
              <IoSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 text-xl" />
            </form>
          </div>

          {/* Login */}
          <div className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer">
            <IoMdPersonAdd className="text-2xl" />
            <p className="hidden md:block">Login</p>
          </div>

          {/* Cart */}
          <Link to="/cart" className="relative flex items-center gap-1">
            <IoCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              36
            </span>
            <p className="hidden md:block">Cart</p>
          </Link>

          {/* Hamburger for Mobile */}
          <div className="md:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? (
              <RxCross2 className="text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-2xl" />
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
