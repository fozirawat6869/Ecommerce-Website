import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
// import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

function Nav() {
    const[isMenuOpen,setIsMenuOpen]=useState(false)
    const toggleMenu=()=>setIsMenuOpen(!isMenuOpen)
  return (
    <>
  
        <nav className='flex gap-2 lg:gap-0 items-center md:px-15 lg:px-25 px-2 bg-white py-3 justify-between mx-auto bg-white sticky top-0 border-b-1 border-gray-200 '>
          <div className='flex gap-15 items-center '>
            {/* <div className=''>
            <Link className='text-3xl font-bold text-blue-500 ' to="/">ShopEasy</Link>
          
            </div> */}
            <Link className='text-3xl font-bold text-blue-500 ' to="/">ShopEasy</Link>
          
             <ul className={`${isMenuOpen?` flex flex-col   absolute top-18 gap-5 items-center bg-blue-300 left-0 w-full px-5 py-5 `:'hidden'}  md:hidden lg:static lg:flex lg:flex-row md:gap-5  flex-wrap lg:bg-transparent lg:gap-10   `}>
                {/* So lg:static is just overriding absolute from mobile for large screens. */}
                <li className=''><Link to="/">Home</Link></li>
                <li><Link to="/AllProducts">Products</Link></li>
                <li><Link to='/about'>About Us</Link></li>
                <li><Link to='/contact'>Contact Us</Link></li>

             </ul>
          
          </div>
           <div className='search-container hidden sm:block md:block lg:block'>
                <form action="" className='flex gap-2 relative '>
                    <input type="text" name="" id="" placeholder='Search ...' className='outline-none sm:w-auto md:w-auto lg:w-130 bg-gray-100  px-10 py-2  rounded-xl' />
                    <button className='text-gray-500 px-2 absolute top-1/2 text-xl  left-1 -translate-y-1/2 cursor-pointer'><IoSearch focusable="false" /></button>
                </form>
            </div>
            
            {/* Right side of nav */}
           <div className='icon-container flex gap-3 lg:gap-5 items-center '>

               <div className='flex gap-4 hover:bg-gray-200 rounded-xl cursor-pointer lg:px-3 lg:py-2'>
              <Link >
              <IoMdPersonAdd className='text-2xl '/>
              </Link>
              <p className='sm:hidden hidden lg:block md:block'>Login</p>
            </div>

            <div className='cart-container  flex gap-3  cursor-pointer '>
                <Link  to="/cart" className='relative'>
                 <IoCart className='text-2xl  text-black  ' />
                 <span className='text-xs absolute -top-2 -right-2 bg-red-500 text-white flex items-center justify-center  w-5 h-5 rounded-full items-center'>36</span>
                </Link>
                <p className='sm:hidden hidden lg:block md:block'>Cart</p>
            </div>
         
            <div onClick={toggleMenu} className='lg:hidden '>
                {isMenuOpen?<RxCross2 className='text-2xl'/>:<GiHamburgerMenu className='text-2xl'/>}
            </div>
            <div>

            </div>
           </div>
        </nav>
     
    </>
  )
}

export default Nav