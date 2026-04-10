

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdPersonAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

function AdminNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // 🔹 Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 🔹 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-16 py-3 bg-white  shadow-sm sticky top-0 z-50">

      {/* 🔹 Logo */}
      <Link
        to="/adminHome"
        className="text-2xl md:text-3xl font-bold text-blue-600 hover:scale-105 transition"
      >
        ShopEasy 
      </Link>

      {/* 🔹 Menu */}
      <ul
        className={`
          ${isMenuOpen ? "flex animate-slideDown" : "hidden"}
          flex-col absolute top-16 left-0 w-full bg-white shadow-md border-t
          lg:flex lg:flex-row lg:static lg:w-auto lg:shadow-none lg:border-none
          gap-2 lg:gap-6 items-center py-4 lg:py-0 transition-all
        `}
      >
        {[
          { name: "Dashboard", path: "/adminHome" },
          { name: "All Products", path: "/AllProducts" },
          { name: "Create Product", path: "/CreateProduct" },
          { name: "Contact", path: "/contact" },
          {name:"About Us",path:"/about"}
        ].map((item, i) => (
          <li key={i}>
            <Link
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* 🔹 Right Section */}
      <div className="flex items-center gap-3 sm:gap-4">

        {/* 🔹 Profile */}
        <div className="relative group">
          <div
            onClick={() => {
              if (!token) navigate("/login");
            }}
            className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            {token && (
              <CgProfile className="text-2xl" />
            )}
            <p className="hidden md:block text-lg font-medium">
              {token ? "Admin" : "Login"}
            </p>
          </div>

          {/* 🔹 Dropdown */}
          {token && (
            <ul className="absolute right-0 mt-0 w-36 bg-white border rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition">

              <li
                onClick={() => navigate("/adminHome")}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              >
                Dashboard
              </li>

              <li
                onClick={handleLogout}
                className="px-4 py-2 hover:bg-red-100 text-red-500 cursor-pointer"
              >
                Logout
              </li>

            </ul>
          )}
        </div>

        {/* 🔹 Mobile Menu Button */}
        <div
          className="lg:hidden cursor-pointer p-1 rounded hover:bg-gray-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? (
            <RxCross2 className="text-2xl" />
          ) : (
            <GiHamburgerMenu className="text-2xl" />
          )}
        </div>
      </div>

      {/* 🔥 Animation */}
      <style>
        {`
          .animate-slideDown {
            animation: slideDown 0.3s ease forwards;
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </nav>
  );
}

export default AdminNav;