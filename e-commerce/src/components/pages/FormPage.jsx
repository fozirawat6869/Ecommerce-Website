import React from 'react'

function FormPage() {
  return (
    <>
     {/* Contact Form */}
      <div className="flex justify-center mt-3 px-4 bg-gray-100">
        <form 
          action="https://formspree.io/f/xqawlrao" 
          method="POST" 
          className="flex flex-col gap-4 w-full max-w-2xl p-6 sm:p-10 bg-white rounded-2xl shadow-md"
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
      </>
  )
}

export default FormPage