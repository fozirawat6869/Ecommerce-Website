

// import React, { useEffect, useState } from "react";
// import {
//   FaMouse,
//   FaCamera,
//   FaMobileAlt,
//   FaPrint,
//   FaMicrochip,
//   FaTv,
//   FaHeadphones,
//   FaRegClock,
// } from "react-icons/fa";
// import { GiSpeaker, GiRazor } from "react-icons/gi";
// import { MdOutlineEarbuds, MdOutlineKitchen } from "react-icons/md";
// import { GiTShirt, GiLargeDress } from "react-icons/gi";
// import { useNavigate, useParams } from "react-router-dom";

// const categories = [
//   { name: "Men", icon: <GiTShirt size={26} className="text-blue-600" /> },
//   { name: "Women", icon: <GiLargeDress size={26} className="text-red-600" /> },
//   { name: "Mouse", icon: <FaMouse size={26} /> },
//   { name: "Camera", icon: <FaCamera size={26} /> },
//   { name: "Earphones", icon: <MdOutlineEarbuds size={26} /> },
//   { name: "Mobiles", icon: <FaMobileAlt size={26} /> },
//   { name: "Speakers", icon: <GiSpeaker size={26} /> },
//   { name: "Televisions", icon: <FaTv size={26} /> },
//   { name: "Trimmers", icon: <GiRazor size={26} /> },
//   { name: "Watches", icon: <FaRegClock size={26} /> },
// ];

// const Categories = () => {
  
//   const navigate = useNavigate();
//   const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);

//   useEffect(() => {
//     if (selectedCategoryItem) {
//       // ✅ only small fix (recommended route style)
//       navigate(`/category/${selectedCategoryItem}`);
//     }
//   }, [selectedCategoryItem, navigate]);

//   return (
//     <div className="w-full bg-gray-100 py-2">
//       <div className="flex justify-center gap-5 mx-5 lg:mx-10 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 bg-white py-4 overflow-x-auto flex-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
//         {categories.map((item, index) => (
//           <div
//             onClick={() => setSelectedCategoryItem(item.name)}
//             key={index}
//             className="flex flex-col items-center text-center cursor-pointer flex-shrink-0"
//           >
//             <div className="bg-gray-200 hover:bg-gray-300 transition p-4 rounded-full flex items-center justify-center w-12 h-16 sm:w-18 sm:h-18">
//               <span className="text-gray-700">{item.icon}</span>
//             </div>

//             <p className="text-base sm:text-base text-gray-800 mt-2 font-medium">
//               {item.name}
//             </p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Categories;


import React, { useEffect, useState } from "react";
import {
  FaMouse,
  FaCamera,
  FaMobileAlt,
  FaTv,
  FaRegClock,
} from "react-icons/fa";
import { GiSpeaker, GiRazor, GiTShirt, GiLargeDress } from "react-icons/gi";
import { MdOutlineEarbuds } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const categories = [
  { name: "Men", icon: <GiTShirt className="text-blue-600" /> },
  { name: "Women", icon: <GiLargeDress className="text-red-600" /> },
  { name: "Mouse", icon: <FaMouse /> },
  { name: "Camera", icon: <FaCamera /> },
  { name: "Earphones", icon: <MdOutlineEarbuds /> },
  { name: "Mobiles", icon: <FaMobileAlt /> },
  { name: "Speakers", icon: <GiSpeaker /> },
  { name: "Televisions", icon: <FaTv /> },
  { name: "Trimmers", icon: <GiRazor /> },
  { name: "Watches", icon: <FaRegClock /> },
];

const Categories = () => {
  const navigate = useNavigate();
  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);

  useEffect(() => {
    if (selectedCategoryItem) {
      navigate(`/category/${selectedCategoryItem}`);
    }
  }, [selectedCategoryItem, navigate]);

  return (
  <div className="w-full bg-gray-100 py-2">

    {/* CENTER WRAPPER (IMPORTANT) */}
    <div className="max-w-6xl mx-auto">

      {/* SCROLL CONTAINER */}
      <div className="flex gap-4 px-3 sm:px-6 bg-white py-3 
                      overflow-x-auto scroll-smooth whitespace-nowrap">

        {categories.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedCategoryItem(item.name)}
            className="flex flex-col items-center cursor-pointer flex-shrink-0 min-w-[70px] sm:min-w-[90px]"
          >

            <div className="bg-gray-200 hover:bg-gray-300 transition 
                            rounded-full flex items-center justify-center
                            w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">

              <span className="text-gray-700 text-lg sm:text-xl md:text-2xl">
                {item.icon}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-800 mt-2 text-center font-medium">
              {item.name}
            </p>

          </div>
        ))}

      </div>

    </div>
  </div>
)
};

export default Categories;
