
import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch, IoCart } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from "react-loading-skeleton";

import debounce from "../reuseCode/debouncingFunc";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

// ✅ add this
import api from "../../utils/api";

function Nav() {
  const [InputValue, setInputValue] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

   const handleInput=(e)=>{
     e.preventDefault();
     setInputValue(e.target.value)
     debounceSearch(e.target.value)
   }

 const handleSearch=useCallback((value)=>{
    console.log("searching for",value)
   },[])
   
   const debounceSearch=useMemo(()=>
      debounce(handleSearch,5000)
   ,[handleSearch])

   const handleKeyDown=(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      handleSearch(InputValue)
    }
   }

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleCartCount=async()=>{
    try{
      // ✅ changed axios → api
      const res= await api.get("/api/cartCount",{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
     
      console.log("cart count res",res.data.cartCount)
      return res.data.cartCount
    }catch(err){
      console.log("error in fetching cart count",err)
      return 0
    }
  }

  const{data,isLoading}=useQuery({
    queryKey:["cartCount"],
    queryFn: handleCartCount
  })

if (isLoading) {
  return (
    <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
      <nav className="flex items-center justify-between px-3 md:px-20 py-3 bg-white sticky top-0 border-b border-gray-200 z-50">

        {/* Logo */}
        <Skeleton width={120} height={30} borderRadius={6} />

        {/* Nav links - desktop only */}
        <div className="hidden lg:flex gap-8">
          <Skeleton width={50} height={16} borderRadius={4} />
          <Skeleton width={65} height={16} borderRadius={4} />
          <Skeleton width={60} height={16} borderRadius={4} />
          <Skeleton width={75} height={16} borderRadius={4} />
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">

          {/* Search - desktop only */}
          <div className="hidden lg:block">
            <Skeleton width={280} height={38} borderRadius={12} />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-1">
            <Skeleton circle width={28} height={28} />
            <div className="hidden lg:block">
              <Skeleton width={40} height={14} borderRadius={4} />
            </div>
          </div>

          {/* Cart */}
          <div className="flex items-center gap-1">
            <Skeleton circle width={28} height={28} />
            <div className="hidden lg:block">
              <Skeleton width={30} height={14} borderRadius={4} />
            </div>
          </div>

          {/* Hamburger - mobile only */}
          <div className="lg:hidden">
            <Skeleton width={28} height={28} borderRadius={4} />
          </div>

        </div>
      </nav>
    </SkeletonTheme>
  )
}



  return (
    <>
      <nav className="flex items-center justify-between px-3 md:px-20 py-3 bg-white sticky top-0 border-b border-gray-200 z-50">
        
        <Link
          to="/"
          className="text-2xl md:text-3xl font-bold text-blue-500 whitespace-nowrap"
        >
          ShopEasy
        </Link>

        <ul
          className={`${
            isMenuOpen
              ? "flex flex-col absolute top-16 left-0 w-full bg-white border-t border-gray-200 py-4 shadow-md z-40"
              : "hidden"
          } lg:flex lg:flex-row lg:static lg:w-auto lg:shadow-none lg:gap-8 items-center transition-all duration-300`}
        >
          <li>
            <Link to="/" className="block px-4 py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/AllProducts" className="block px-4 py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              Products
            </Link>
          </li>

          <li>
            <Link to="/about" className="block px-4 py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              About Us
            </Link>
          </li>

          <li>
            <Link to="/contact" className="block px-4 py-2 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
        </ul>

        <div className="flex items-center gap-4">

          <div className="hidden lg:block">
            <form className="relative">
              <input
                  onChange={handleInput}
                  onKeyDown={handleKeyDown}
                type="text"
                placeholder="Search ..."
                className="bg-gray-100 px-8 py-2 rounded-xl outline-none w-52 lg:w-72"
              />
              <IoSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-gray-500 text-xl" />
            </form>
          </div>

          <div className="relative group">
            <div
              onClick={() => {
                if (!token) navigate("/login");
              }}
              className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded-lg cursor-pointer"
            >
              {token ? (
                <CgProfile className="text-2xl" />
              ) : (
                <IoMdPersonAdd className="text-2xl" />
              )}
              <p className="hidden lg:block">
                {token ? "Profile" : "Login"}
              </p>
            </div>

            {token && (
              <ul className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow-md opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50">
                
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => navigate("/orders")}
                >
                  Orders
                </li>

                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.reload();
                  }}
                >
                  Logout
                </li>

              </ul>
            )}
          </div>

          <Link to="/cart" className="relative flex items-center gap-1">
            <IoCart className="text-2xl" />

            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {data}
            </span>

            <p className="hidden lg:block">Cart</p>
          </Link>

          <div className="lg:hidden cursor-pointer" onClick={toggleMenu}>
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
