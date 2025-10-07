import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <>
    <footer className='py-10 bg-green-200'>
       <div className='flex gap-5 flex-col md:flex-row justify-evenly  px-5 mx-auto container '>
         {/* Section one */}
         <div className='flex flex-col gap-3  bg-yellow-300 p-5 rounded-2xl'>
            <h1 className='text-2xl font-bold text-center '>Contact Us</h1>
            <p className='  flex gap-2 text-base p-2'><span className='flex justify-center items-center'><FaPhoneAlt/></span>Phone :- 8755306869</p>
            <p className='flex gap-2 text-base p-2'><span className='flex justify-center items-center'><MdEmail /></span>Email :- rawatmayur0703@gmail.com</p>
         </div>
         {/* Section two */}
          <div className='flex flex-col gap-3  bg-yellow-300 p-5 rounded-2xl'>
            <h1 className='text-2xl font-bold text-center'>Follow me</h1>
            <div className='flex gap-2 justify-center items-center   h-full '>
              <p className='text-2xl'><FaGithub/></p>
              <p className='text-2xl'><IoLogoLinkedin/></p>
              <p className='text-2xl'><FaInstagramSquare/></p>
            </div>
          </div>
          {/* Section three */}
          <div className='flex flex-col gap-3 bg-yellow-300 rounded-2xl p-5'>
            <h1 className='text-2xl font-bold text-center'>About</h1>
            <p>Lorem ipsumesores m ea iure distinctio quibusdam Lorem ipsum dolor sit amet. soluta et?</p>
          </div>
         
       </div>
        {/* Footer bottom */}
          <div className="text-center mt-8 text-gray-700 text-sm">
        © 2025 Mayur Rawat | All Rights Reserved
      </div> 
    </footer>

    

</>

  )
}

export default Footer
