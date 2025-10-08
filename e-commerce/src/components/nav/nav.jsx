import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoSearch } from "react-icons/io5";
import { IoCart } from "react-icons/io5";
import { IoMdPersonAdd } from "react-icons/io";
// import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";

function nav() {
    const[isMenuOpen,setIsMenuOpen]=useState(false)
    const toggleMenu=()=>setIsMenuOpen(!isMenuOpen)
  return (
    <>
     <nav className=''>
        <div className='flex gap-2 lg:gap-10 items-center md:px-20 lg:px-25 px-5 bg-green-300 py-5 justify-between mx-auto'>
          <div className='flex gap-10 items-center'>
            <div className=''>
            <Link className='text-2xl font-bold' to="/">ShopEasy</Link>
           </div>
           {/* <div className={` `}> */}
             <ul className={`${isMenuOpen?` flex flex-col   absolute top-18 gap-5 items-center bg-blue-300 left-0 w-full px-5 py-5 `:'hidden'}  md:hidden lg:static lg:flex lg:flex-row md:gap-5  flex-wrap lg:bg-transparent lg:gap-10   `}>
                {/* So lg:static is just overriding absolute from mobile for large screens. */}
                <li className='text-base'><Link to="/">Home</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to='/about'>About Us</Link></li>
                <li><Link to='/contact'>Contact Us</Link></li>
             </ul>
           {/* </div> */}
          </div>

           <div className='icon-container flex gap-2 lg:gap-5 items-center'>
            <div className='search-container '>
                <form action="" className='flex gap-2'>
                    <input type="text" name="" id="" placeholder='Search ...' className='border border-gray-500 px-3 py-1 rounded-2xl' />
                    <button className='border border-r-gray-500 px-2'><IoSearch focusable="false" /></button>
                </form>
            </div>
            <div className='cart-container  flex gap-5 relative '>
                <Link  to="/cart">
                 <IoCart className='text-2xl text-white ' />
                 <span className='text-xs absolute -top-2 -right-2 bg-gray-500 txt-white flex items-center justify-center  w-5 h-5 rounded-full items-center'>6</span>
                </Link>
            </div>
            <Link ><IoMdPersonAdd className='text-2xl text-white'/></Link>
            <div onClick={toggleMenu} className='lg:hidden '>
                {isMenuOpen?<RxCross2 className='text-2xl'/>:<GiHamburgerMenu className='text-2xl'/>}
            </div>
            <div>

            </div>
           </div>
        </div>
     </nav>
    </>
  )
}

export default nav