
import React from "react";
import { FaPhoneAlt, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { IoLogoLinkedin } from "react-icons/io";
import { FaInstagramSquare } from "react-icons/fa";

function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Top Heading Section */}
      <div className="bg-gray-800 text-white py-12 sm:py-16 text-center px-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Contact Us</h1>
        <p className="mt-3 text-gray-300 text-sm sm:text-base">
          Have any questions? We would love to hear from you.
        </p>
      </div>

      {/* Contact Cards */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">

        {/* Phone Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow hover:shadow-xl transition">
          <div className="text-3xl sm:text-4xl text-blue-600 mb-5">
            <FaPhoneAlt />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Call Us</h2>
          <p className="text-gray-600 mb-3 text-sm sm:text-base">We are available 24/7</p>

          <p className="text-base sm:text-lg font-medium">+91 8755306869</p>
        </div>

        {/* Email Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow hover:shadow-xl transition">
          <div className="text-3xl sm:text-4xl text-red-500 mb-5">
            <MdEmail />
          </div>

          <h2 className="text-xl sm:text-2xl font-semibold mb-2">Email Us</h2>
          <p className="text-gray-600 mb-3 text-sm sm:text-base">Send us your query anytime</p>

          <p className="text-base sm:text-lg font-medium break-words">
            rawatmayur0703@gmail.com
          </p>
        </div>

        {/* Social Card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow hover:shadow-xl transition">
          <h2 className="text-xl sm:text-2xl font-semibold mb-5 text-center sm:text-left">
            Follow Me
          </h2>

          <div className="flex justify-center sm:justify-start gap-5 sm:gap-6 text-2xl sm:text-3xl">

            <a
              href="https://github.com/fozirawat6869"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-700"
            >
              <FaGithub />
            </a>

            <a
              href="https://www.linkedin.com/in/mayur-rawat-967831361"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600"
            >
              <IoLogoLinkedin />
            </a>

            <a
              href="https://www.instagram.com/mayur_rawat__"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600"
            >
              <FaInstagramSquare />
            </a>

          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="px-4 sm:px-10">
        <div className="bg-white py-8 sm:py-10 text-center rounded-2xl shadow">
          <h2 className="text-xl sm:text-2xl font-semibold">
            We usually reply within 24 hours
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base">
            Feel free to contact us anytime — we are here to help you.
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <div className="flex justify-center mt-10 px-4">
        <form 
          action="https://formspree.io/f/xqawlrao" 
          method="POST" 
          className="flex flex-col gap-4 w-full max-w-lg p-6 sm:p-10 bg-white rounded-2xl shadow-md"
        >
          <h1 className="text-center text-2xl sm:text-3xl font-bold">Form</h1>

          <input 
            type="text" 
            name="name" 
            placeholder="Your Name" 
            className="p-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base" 
            required 
          />

          <input 
            type="email" 
            name="email" 
            placeholder="Your Email" 
            className="p-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base" 
            required 
          />

          <textarea 
            name="message" 
            placeholder="Your Message" 
            className="p-3 rounded-lg bg-gray-800 text-white text-sm sm:text-base" 
            rows="5" 
            required
          ></textarea>

          <button 
            type="submit" 
            className="bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg transition-colors cursor-pointer text-sm sm:text-base"
          >
            Send Message
          </button>
        </form>
      </div>

    </div>
  );
}

export default ContactPage;