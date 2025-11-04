// import React from "react";
// import {
//   FaMouse,
//   FaCamera,
//   FaMobileAlt,
//   FaPrint,
//   FaMicrochip,
//   FaTv,
//   FaRegClock,
//   FaHeadphones,
// } from "react-icons/fa";
// import { GiSpeaker, GiRazor, GiTShirt, GiLargeDress } from "react-icons/gi";
// import { MdOutlineEarbuds, MdOutlineKitchen } from "react-icons/md";

// const categories = [
//   { name: "Mouse", icon: <FaMouse size={26} className="text-blue-500" /> },
//   { name: "Camera", icon: <FaCamera size={26} className="text-red-500" /> },
//   { name: "Earphones", icon: <MdOutlineEarbuds size={26} className="text-purple-500" /> },
//   { name: "Mobiles", icon: <FaMobileAlt size={26} className="text-green-500" /> },
//   { name: "Printers", icon: <FaPrint size={26} className="text-yellow-500" /> },
//   { name: "Processor", icon: <FaMicrochip size={26} className="text-pink-500" /> },
//   { name: "Refrigerator", icon: <MdOutlineKitchen size={26} className="text-orange-500" /> },
//   { name: "Speakers", icon: <GiSpeaker size={26} className="text-indigo-500" /> },
//   { name: "Televisions", icon: <FaTv size={26} className="text-teal-500" /> },
//   { name: "Trimmers", icon: <GiRazor size={26} className="text-gray-700" /> },
//   { name: "Watches", icon: <FaRegClock size={26} className="text-pink-600" /> },
//   { name: "Men Clothes", icon: <GiTShirt size={26} className="text-blue-600" /> },
//   { name: "Women Clothes", icon: <GiLargeDress size={26} className="text-red-600" /> },
// ];

// const products = [
//   { name: "Wireless Mouse", price: "$25", img: "https://via.placeholder.com/200x200?text=Mouse" },
//   { name: "DSLR Camera", price: "$450", img: "https://via.placeholder.com/200x200?text=Camera" },
//   { name: "Smartphone", price: "$299", img: "https://via.placeholder.com/200x200?text=Mobile" },
//   { name: "Headphones", price: "$99", img: "https://via.placeholder.com/200x200?text=Headphones" },
//   { name: "T-Shirt", price: "$19", img: "https://via.placeholder.com/200x200?text=T-Shirt" },
//   { name: "Dress", price: "$45", img: "https://via.placeholder.com/200x200?text=Dress" },
// ];

// const EcommerceDemo = () => {
//   return (
//     <div className="bg-gray-50 min-h-screen">
//       {/* Header */}
//       <header className="bg-white shadow p-4 flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-indigo-600">ShopEasy</h1>
//         <div className="space-x-4">
//           <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Login</button>
//           <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">Sign Up</button>
//         </div>
//       </header>

//       {/* Categories */}
//       <section className="py-8 px-4">
//         <h2 className="text-xl font-semibold mb-4">Categories</h2>
//         <div className="flex flex-wrap gap-5 justify-center">
//           {categories.map((cat, index) => (
//             <div key={index} className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transform transition">
//               <div className="bg-white shadow p-4 rounded-full flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
//                 {cat.icon}
//               </div>
//               <p className="mt-2 text-gray-700 font-medium">{cat.name}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Products */}
//       <section className="py-8 px-4">
//         <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
//           {products.map((prod, index) => (
//             <div key={index} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
//               <img src={prod.img} alt={prod.name} className="w-full h-48 object-cover" />
//               <div className="p-4">
//                 <h3 className="font-semibold text-gray-800">{prod.name}</h3>
//                 <p className="text-indigo-600 font-bold mt-2">{prod.price}</p>
//                 <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Add to Cart</button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-gray-800 text-white text-center py-6 mt-8">
//         <p>© 2025 ShopEasy. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// };

// export default EcommerceDemo;



// MenProducts.jsx
import React, { useState } from "react";

const subCategories = [
  "T-Shirts",
  "Shirts",
  "Jackets",
  "Pants",
  "Shoes",
  "Hoodies",
  "Accessories",
  "Watches",
];

const products = [
  { name: "Product 1", price: "$20", image: "https://via.placeholder.com/150" },
  { name: "Product 2", price: "$25", image: "https://via.placeholder.com/150" },
  { name: "Product 3", price: "$30", image: "https://via.placeholder.com/150" },
  { name: "Product 4", price: "$40", image: "https://via.placeholder.com/150" },
  { name: "Product 5", price: "$50", image: "https://via.placeholder.com/150" },
  { name: "Product 6", price: "$35", image: "https://via.placeholder.com/150" },
  { name: "Product 7", price: "$45", image: "https://via.placeholder.com/150" },
  { name: "Product 8", price: "$60", image: "https://via.placeholder.com/150" },
   { name: "Product 1", price: "$20", image: "https://via.placeholder.com/150" },
  { name: "Product 2", price: "$25", image: "https://via.placeholder.com/150" },
  { name: "Product 3", price: "$30", image: "https://via.placeholder.com/150" },
  { name: "Product 4", price: "$40", image: "https://via.placeholder.com/150" },
  { name: "Product 5", price: "$50", image: "https://via.placeholder.com/150" },
  { name: "Product 6", price: "$35", image: "https://via.placeholder.com/150" },
  { name: "Product 7", price: "$45", image: "https://via.placeholder.com/150" },
  { name: "Product 8", price: "$60", image: "https://via.placeholder.com/150" },
];

const MenProducts = () => {
  const [selectedSubCategory, setSelectedSubCategory] = useState("T-Shirts");

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-gray-50 min-h-screen">
      {/* Left Sidebar */}
      <div className="w-full lg:w-1/4 bg-white p-4 rounded-md shadow-md">
        <h2 className="font-bold text-lg mb-4">Men Categories</h2>
        <ul className="flex flex-col gap-2">
          {subCategories.map((subCat, index) => (
            <li
              key={index}
              onClick={() => setSelectedSubCategory(subCat)}
              className={`cursor-pointer p-2 rounded-md hover:bg-blue-100 transition ${
                selectedSubCategory === subCat ? "bg-blue-200 font-semibold" : ""
              }`}
            >
              {subCat}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Products Grid */}
      <div className="w-full lg:w-3/4">
        <h2 className="font-bold text-lg mb-4">Showing: {selectedSubCategory}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-md shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <img src={product.image} alt={product.name} className="mb-2 w-full h-40 object-cover rounded-md" />
              <h3 className="font-medium text-gray-800">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenProducts;

// 1️⃣ Identify the entities

// From your Product Detail page and MenProducts page, we have:

// Products

// Name, description, price, main image, multiple images, category, subcategory, rating

// Categories

// Men, Women, Electronics, etc.

// Reviews

// Review text, user, product, date, rating

// Users (optional if login is needed)

// Name, email, password, etc.


// 2️⃣ Define tables and their columns
// A) Categories Table
// CREATE TABLE Categories (
//     category_id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(50) NOT NULL
// );

// B) Subcategories Table
// CREATE TABLE Subcategories (
//     subcategory_id INT PRIMARY KEY AUTO_INCREMENT,
//     category_id INT NOT NULL,
//     name VARCHAR(50) NOT NULL,
//     FOREIGN KEY (category_id) REFERENCES Categories(category_id)
// );


// This allows Men → T-Shirts, Pants, Jackets

// Makes your DB normalized (avoids repeated category names in products)

// C) Products Table
// CREATE TABLE Products (
//     product_id INT PRIMARY KEY AUTO_INCREMENT,
//     subcategory_id INT NOT NULL,
//     name VARCHAR(100) NOT NULL,
//     description TEXT,
//     price DECIMAL(10,2) NOT NULL,
//     main_image VARCHAR(255),
//     rating DECIMAL(2,1) DEFAULT 0,
//     stock INT DEFAULT 0,
//     FOREIGN KEY (subcategory_id) REFERENCES Subcategories(subcategory_id)
// );


// price → decimal

// rating → average rating

// stock → how many items available

// D) Product Images Table
// CREATE TABLE ProductImages (
//     image_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT NOT NULL,
//     image_url VARCHAR(255) NOT NULL,
//     FOREIGN KEY (product_id) REFERENCES Products(product_id)
// );


// Stores multiple images for each product

// E) Reviews Table
// CREATE TABLE Reviews (
//     review_id INT PRIMARY KEY AUTO_INCREMENT,
//     product_id INT NOT NULL,
//     user_name VARCHAR(50),
//     review_text TEXT,
//     rating DECIMAL(2,1),
//     review_date DATETIME DEFAULT CURRENT_TIMESTAMP,
//     FOREIGN KEY (product_id) REFERENCES Products(product_id)
// );

// F) Optional: Users Table
// CREATE TABLE Users (
//     user_id INT PRIMARY KEY AUTO_INCREMENT,
//     name VARCHAR(50),
//     email VARCHAR(100) UNIQUE,
//     password VARCHAR(255)
// );


// Later you can link reviews to user_id instead of user_name.