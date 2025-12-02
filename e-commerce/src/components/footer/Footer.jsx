



import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="py-10 bg-gray-100">

        <div className="container mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Contact Section */}
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-center">Contact Us</h1>

            <div className="mt-4 space-y-3">
              <p className="flex gap-2 items-center text-base">
                <FaPhoneAlt /> 8755306869
              </p>
              <p className="flex gap-2 items-center text-base">
                <MdEmail /> rawatmayur0703@gmail.com
              </p>
            </div>
          </div>

       
<div className="flex flex-col gap-3 bg-white p-5 rounded-2xl">
  <h1 className="text-2xl font-bold text-center">Follow Me</h1>

  <div className="flex gap-4 justify-center items-center mt-4 text-3xl">

    {/* GitHub */}
    <a 
      href="https://github.com/fozirawat6869" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-gray-700"
    >
      <FaGithub />
    </a>

    {/* LinkedIn */}
    <a 
      href="https://www.linkedin.com/in/mayur-rawat-967831361" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-blue-600  "
    >
      <IoLogoLinkedin />
    </a>

    {/* Facebook */}
    <a 
      href="https://www.facebook.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="hover:text-blue-700"
    >
      <FaInstagramSquare />
    </a>

  </div>
</div>


          {/* About Section */}
          <div className="bg-white p-6 rounded-2xl shadow flex flex-col justify-between">
            <h1 className="text-2xl font-bold text-center">About</h1>
            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
              Assumenda molestias ducimus doloremque suscipit illum 
              eius distinctio quibusdam soluta et.
            </p>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="text-center mt-8 text-gray-600 text-sm">
          © 2025 Mayur Rawat | All Rights Reserved
        </div>
      </footer>
    </>
  )
}

export default Footer
