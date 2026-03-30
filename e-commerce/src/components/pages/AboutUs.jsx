
import React from "react";

function AboutUs() {
  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-10 px-4 sm:px-6 lg:px-8">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800">
            About Me
          </h1>

          <p className="text-gray-600 mt-3 sm:mt-4 text-base sm:text-lg">
            Full Stack Web Developer | React | Node.js | MySQL | MongoDB
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl p-6 sm:p-8 lg:p-10">

          {/* Name + Summary */}
          <div className="mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-800 mb-4 font-bold">
              Mayur Rawat
            </h2>

            <p className="text-gray-600 leading-7 sm:leading-8 text-base sm:text-lg">
              I am a motivated and detail-oriented Full Stack Web Developer with
              a strong foundation in both front-end and back-end technologies. I
              enjoy building modern, responsive, and user-friendly web
              applications using React.js, Node.js, Express.js, and MySQL.
            </p>

            <p className="text-gray-600 leading-7 sm:leading-8 text-base sm:text-lg mt-4">
              I am passionate about learning new technologies and improving my
              development skills every day. I love working on real-world
              projects like e-commerce websites, portfolio websites, and full
              stack applications. My goal is to become a professional full stack
              developer and contribute to large-scale projects.
            </p>
          </div>

          {/* Skills Section */}
          <div className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Skills
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-10 sm:mb-12">

            {/* Frontend */}
            <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Frontend Development
              </h3>

              <ul className="list-disc list-inside text-gray-600 leading-7">
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
                <li>TypeScript</li>
                <li>React.js</li>
                <li>Next.js</li>
                <li>Tailwind CSS</li>
                <li>Responsive Design</li>
                <li>UI/UX Basics</li>
              </ul>
            </div>

            {/* Backend */}
            <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Backend Development
              </h3>

              <ul className="list-disc list-inside text-gray-600 leading-7">
                <li>Node.js</li>
                <li>Express.js</li>
                <li>REST API Development</li>
                <li>Authentication</li>
                <li>Routing</li>
                <li>Middleware</li>
                <li>Server-Side Logic</li>
              </ul>
            </div>

            {/* Database */}
            <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Database
              </h3>

              <ul className="list-disc list-inside text-gray-600 leading-7">
                <li>MySQL</li>
                <li>MongoDB</li>
                <li>Database Design</li>
                <li>CRUD Operations</li>
                <li>Data Management</li>
              </ul>
            </div>

            {/* Tools */}
            <div className="bg-gray-50 p-5 sm:p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3">
                Tools & Platforms
              </h3>

              <ul className="list-disc list-inside text-gray-600 leading-7">
                <li>GitHub</li>
                <li>Git</li>
                <li>Vercel</li>
                <li>AWS (Basic)</li>
                <li>VS Code</li>
                <li>Postman</li>
                <li>Deployment</li>
              </ul>
            </div>

          </div>

          {/* Projects Section */}
          <div className="text-center text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            Projects
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Project 1 */}
            <div className="bg-gray-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">
                E-Commerce Website
              </h4>

              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Built a complete e-commerce platform using React.js, Node.js,
                Express.js, and MySQL with authentication, product listing,
                cart system, and admin panel.
              </p>

              <a
                href="https://github.com/fozirawat6869/Ecommerce-Website"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center"
              >
                View Code on GitHub
              </a>
            </div>

            {/* Project 2 */}
            <div className="bg-gray-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">
                Portfolio Website
              </h4>

              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Designed and developed a modern portfolio website using React
                and Tailwind CSS to showcase skills and projects.
              </p>

              <a
                href="https://github.com/fozirawat6869/Portfolio-Website"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center"
              >
                View Code on GitHub
              </a>
            </div>

            {/* Project 3 */}
            <div className="bg-gray-100 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col">
              <h4 className="text-lg sm:text-xl font-semibold mb-2">
                Library Management System
              </h4>

              <p className="text-gray-600 mb-4 text-sm sm:text-base">
                Developed a full-stack library management application using
                Node.js, Express.js, and MySQL with user authentication and
                admin approval system.
              </p>

              <a
                href="https://github.com/fozirawat6869/Library-Management-System"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-center"
              >
                View Code on GitHub
              </a>
            </div>

          </div>

          {/* Contact Section */}
          <div className="bg-gray-900 text-white mt-10 p-6 sm:p-8 rounded-2xl">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
              Contact Me
            </h3>

            <p className="text-base sm:text-lg mb-2">
              <span className="font-bold">Email :</span> rawatmayur0703@gmail.com
            </p>

            <p className="text-base sm:text-lg mb-2">
              <span className="font-bold">Phone :</span> 8755306869
            </p>

            <p className="text-base sm:text-lg mb-2">
              <span className="font-bold">Location :</span> Uttarakhand, India
            </p>

            <p className="text-base sm:text-lg">
              <span className="font-bold">GitHub :</span> github.com/fozirawat6869
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AboutUs;