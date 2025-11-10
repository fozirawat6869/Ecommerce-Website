// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { IoSearch } from "react-icons/io5";
// import { IoCart } from "react-icons/io5";
// import { IoMdPersonAdd } from "react-icons/io";
// // import { ImCross } from "react-icons/im";
// import { RxCross2 } from "react-icons/rx";
// import { GiHamburgerMenu } from "react-icons/gi";

// function Nav() {
//     const[isMenuOpen,setIsMenuOpen]=useState(false)
//     const toggleMenu=()=>setIsMenuOpen(!isMenuOpen)
//   return (
//     <>
  
//         <nav className='flex gap-2 lg:gap-0 items-center md:px-15 lg:px-25 px-2 bg-white py-3 justify-between mx-auto bg-white sticky top-0 border-b-1 border-gray-200 '>
       
//           <div className='flex gap-15 items-center '>
//             {/* <div className=''>
//             <Link className='text-3xl font-bold text-blue-500 ' to="/">ShopEasy</Link>
          
//             </div> */}
//             <Link className='text-3xl font-bold text-blue-500 ' to="/">ShopEasy</Link>
          
//              <ul className={`${isMenuOpen?` flex flex-col   absolute top-18 gap-5 items-center bg-blue-300 left-0 w-full px-5 py-5 `:'hidden'}  md:hidden lg:static lg:flex lg:flex-row md:gap-5  flex-wrap lg:bg-transparent lg:gap-10   `}>
//                 {/* So lg:static is just overriding absolute from mobile for large screens. */}
//                 <li className=''><Link to="/">Home</Link></li>
//                 <li><Link to="/AllProducts">Products</Link></li>
//                 <li><Link to='/about'>About Us</Link></li>
//                 <li><Link to='/contact'>Contact Us</Link></li>

//              </ul>
          
//           </div>
//            <div className='search-container hidden sm:block md:block lg:block'>
//                 <form action="" className='flex gap-2 relative '>
//                     <input type="text" name="" id="" placeholder='Search ...' className='outline-none sm:w-auto md:w-auto lg:w-130 bg-gray-100  px-10 py-2  rounded-xl' />
//                     <button className='text-gray-500 px-2 absolute top-1/2 text-xl  left-1 -translate-y-1/2 cursor-pointer'><IoSearch focusable="false" /></button>
//                 </form>
//             </div>
            
//             {/* Right side of nav */}
//            <div className='icon-container flex gap-3 lg:gap-5 items-center '>

//                <div className='flex gap-4 hover:bg-gray-200 rounded-xl cursor-pointer lg:px-3 lg:py-2'>
//               <Link >
//               <IoMdPersonAdd className='text-2xl '/>
//               </Link>
//               <p className='sm:hidden hidden lg:block md:block'>Login</p>
//             </div>

//             <div className='cart-container  flex gap-3  cursor-pointer '>
//                 <Link  to="/cart" className='relative'>
//                  <IoCart className='text-2xl  text-black  ' />
//                  <span className='text-xs absolute -top-2 -right-2 bg-red-500 text-white flex items-center justify-center  w-5 h-5 rounded-full items-center'>36</span>
//                 </Link>
//                 <p className='sm:hidden hidden lg:block md:block'>Cart</p>
//             </div>
         
//             <div onClick={toggleMenu} className='lg:hidden '>
//                 {isMenuOpen?<RxCross2 className='text-2xl'/>:<GiHamburgerMenu className='text-2xl'/>}
//             </div>
//             <div>

//             </div>
//            </div>
//         </nav>
     
//     </>
//   )
// }

// export default Nav





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
