


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch, IoCart } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";

function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

 


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
          } lg:flex lg:flex-row lg:static lg:w-auto lg:shadow-none lg:gap-8 items-center transition-all duration-300`}
        >
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-blue-600 text-center" onClick={() => setIsMenuOpen(false)}>Home</Link>
          </li>
          <li>
            <Link to="/AllProducts" className="block px-4 py-2 hover:text-blue-600 text-center" onClick={() => setIsMenuOpen(false)}>Products</Link>
          </li>
          <li>
            <Link to="/about" className="block px-4 py-2 hover:text-blue-600 text-center" onClick={() => setIsMenuOpen(false)}>About Us</Link>
          </li>
          <li>
            <Link to="/contact" className="block px-4 py-2 hover:text-blue-600 text-center" onClick={() => setIsMenuOpen(false)}>Contact Us</Link>
          </li>
        </ul>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Search */}
          <div className="hidden lg:block">
            <form className="relative">
              <input
                type="text"
                placeholder="Search ..."
                className="bg-gray-100 px-8 py-2 rounded-xl outline-none w-52 lg:w-72"
              />
              <IoSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 text-xl" />
            </form>
          </div>




{/* Login / Profile */}
<div className="relative group">
  <div
    onClick={() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // go to login if not logged in
      }
    }}
    className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
  >
    {localStorage.getItem("token") ? (
      <CgProfile className="text-2xl" />
    ) : (
      <IoMdPersonAdd className="text-2xl" />
    )}
    <p className="hidden lg:block">
      {localStorage.getItem("token") ? "Profile" : "Login"}
    </p>
  </div>

  {/* Hover Dropdown */}
  {localStorage.getItem("token") && (
    <ul className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate("/profile")}
      >
        Profile
      </li>
      <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {()=>navigate("/orders")
        }}
      >
        Orders
      </li>
       <li
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          localStorage.removeItem("token"); // remove token
          // don't navigate, user clicks login manually
          window.location.reload(); // optional: to update the icon
        }}
      >
        Logout
      </li>
    </ul>
  )}
</div>





          {/* Cart */}
          <Link to="/cart" className="relative flex items-center gap-1">
            <IoCart className="text-2xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              36
            </span>
            <p className="hidden lg:block">Cart</p>
          </Link>

          {/* Hamburger */}
          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
            {isMenuOpen ? <RxCross2 className="text-2xl" /> : <GiHamburgerMenu className="text-2xl" />}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;


