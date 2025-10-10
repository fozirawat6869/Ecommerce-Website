import React from "react";
import {
  FaMouse,
  FaCamera,
  FaMobileAlt,
  FaPrint,
  FaMicrochip,
  FaTv,
  FaRegClock,
  FaHeadphones,
} from "react-icons/fa";
import { GiSpeaker, GiRazor, GiTShirt, GiLargeDress } from "react-icons/gi";
import { MdOutlineEarbuds, MdOutlineKitchen } from "react-icons/md";

const categories = [
  { name: "Mouse", icon: <FaMouse size={26} className="text-blue-500" /> },
  { name: "Camera", icon: <FaCamera size={26} className="text-red-500" /> },
  { name: "Earphones", icon: <MdOutlineEarbuds size={26} className="text-purple-500" /> },
  { name: "Mobiles", icon: <FaMobileAlt size={26} className="text-green-500" /> },
  { name: "Printers", icon: <FaPrint size={26} className="text-yellow-500" /> },
  { name: "Processor", icon: <FaMicrochip size={26} className="text-pink-500" /> },
  { name: "Refrigerator", icon: <MdOutlineKitchen size={26} className="text-orange-500" /> },
  { name: "Speakers", icon: <GiSpeaker size={26} className="text-indigo-500" /> },
  { name: "Televisions", icon: <FaTv size={26} className="text-teal-500" /> },
  { name: "Trimmers", icon: <GiRazor size={26} className="text-gray-700" /> },
  { name: "Watches", icon: <FaRegClock size={26} className="text-pink-600" /> },
  { name: "Men Clothes", icon: <GiTShirt size={26} className="text-blue-600" /> },
  { name: "Women Clothes", icon: <GiLargeDress size={26} className="text-red-600" /> },
];

const products = [
  { name: "Wireless Mouse", price: "$25", img: "https://via.placeholder.com/200x200?text=Mouse" },
  { name: "DSLR Camera", price: "$450", img: "https://via.placeholder.com/200x200?text=Camera" },
  { name: "Smartphone", price: "$299", img: "https://via.placeholder.com/200x200?text=Mobile" },
  { name: "Headphones", price: "$99", img: "https://via.placeholder.com/200x200?text=Headphones" },
  { name: "T-Shirt", price: "$19", img: "https://via.placeholder.com/200x200?text=T-Shirt" },
  { name: "Dress", price: "$45", img: "https://via.placeholder.com/200x200?text=Dress" },
];

const EcommerceDemo = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">ShopEasy</h1>
        <div className="space-x-4">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">Login</button>
          <button className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition">Sign Up</button>
        </div>
      </header>

      {/* Categories */}
      <section className="py-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <div className="flex flex-wrap gap-5 justify-center">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transform transition">
              <div className="bg-white shadow p-4 rounded-full flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20">
                {cat.icon}
              </div>
              <p className="mt-2 text-gray-700 font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="py-8 px-4">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((prod, index) => (
            <div key={index} className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition">
              <img src={prod.img} alt={prod.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-gray-800">{prod.name}</h3>
                <p className="text-indigo-600 font-bold mt-2">{prod.price}</p>
                <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6 mt-8">
        <p>© 2025 ShopEasy. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default EcommerceDemo;
