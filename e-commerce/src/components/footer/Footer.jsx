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

    
{/*  */}

    <footer className="bg-yellow-200 py-10 mt-20">
       <div className="container mx-auto flex flex-col md:flex-row justify-evenly gap-8 px-5 bg-red-300">
     
         {/* Section one */}
         <div className="flex flex-col gap-3 bg-yellow-300 p-5 rounded-2xl shadow">
           <h1 className="text-2xl font-bold text-center">Contact Us</h1>
           <p className="bg-red-300 flex gap-2 text-base p-2 rounded">
             <span className="flex justify-center items-center"><FaPhoneAlt /></span>
             Phone: 8755306869
           </p>
           <p className="bg-red-300 flex gap-2 text-base p-2 rounded">
             <span className="flex justify-center items-center"><MdEmail /></span>
             Email: rawatmayur0703@gmail.com
           </p>
         </div>
         {/* Section two */}
         <div className="flex flex-col gap-3 bg-yellow-300 p-5 rounded-2xl shadow">
           <h1 className="text-2xl font-bold text-center">Follow Me</h1>
           <div className="flex gap-4 justify-center items-center bg-red-200 p-3 rounded">
             <a href="#" className="text-2xl hover:text-gray-700"><FaGithub /></a>
             <a href="#" className="text-2xl hover:text-blue-700"><IoLogoLinkedin /></a>
             <a href="#" className="text-2xl hover:text-pink-600"><FaInstagramSquare /></a>
           </div>
         </div>
         {/* Section three */}
         <div className="flex flex-col gap-3 bg-yellow-300 p-5 rounded-2xl shadow">
           <h1 className="text-2xl font-bold text-center">About</h1>
           <p className="text-base text-gray-700 text-justify">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
             Deleniti consequatur veritatis ex, doloribus, architecto ipsam laudantium ea iure distinctio quibusdam soluta et?
           </p>
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

// import React from 'react'
// import { FaPhoneAlt } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import { FaGithub } from "react-icons/fa";
// import { IoLogoLinkedin } from "react-icons/io";
// import { FaInstagramSquare } from "react-icons/fa";

// function Footer() {
//   return (
//     <footer className="bg-yellow-200 py-10">
//       <div className="container mx-auto flex flex-col md:flex-row justify-evenly gap-8 px-5">
        
//         {/* Section one */}
//         <div className="flex flex-col gap-3 bg-yellow-300 p-5 rounded-2xl shadow">
//           <h1 className="text-2xl font-bold text-center">Contact Us</h1>
//           <p className="bg-red-300 flex gap-2 text-base p-2 rounded">
//             <span className="flex justify-center items-center"><FaPhoneAlt /></span>
//             Phone: 8755306869
//           </p>
//           <p className="bg-red-300 flex gap-2 text-base p-2 rounded">
//             <span className="flex justify-center items-center"><MdEmail /></span>
//             Email: rawatmayur0703@gmail.com
//           </p>
//         </div>

//         {/* Section two */}
//         <div className="flex flex-col gap-3 bg-yellow-300 p-5 rounded-2xl shadow">
//           <h1 className="text-2xl font-bold text-center">Follow Me</h1>
//           <div className="flex gap-4 justify-center items-center bg-red-200 p-3 rounded">
//             <a href="#" className="text-2xl hover:text-gray-700"><FaGithub /></a>
//             <a href="#" className="text-2xl hover:text-blue-700"><IoLogoLinkedin /></a>
//             <a href="#" className="text-2xl hover:text-pink-600"><FaInstagramSquare /></a>
//           </div>
//         </div>

//         {/* Section three */}
//         <div className="flex flex-col gap-3 bg-yellow-300 p-5 rounded-2xl shadow">
//           <h1 className="text-2xl font-bold text-center">About</h1>
//           <p className="text-base text-gray-700 text-justify">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. 
//             Deleniti consequatur veritatis ex, doloribus, architecto ipsam laudantium ea iure distinctio quibusdam soluta et?
//           </p>
//         </div>
//       </div>

//       {/* Footer bottom */}
//       <div className="text-center mt-8 text-gray-700 text-sm">
//         © 2025 Mayur Rawat | All Rights Reserved
//       </div>
//     </footer>
//   )
// }

// export default Footer
