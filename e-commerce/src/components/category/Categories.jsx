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
// import { GiTShirt, GiLargeDress} from "react-icons/gi"
// import { useNavigate } from "react-router-dom";


// const categories = [
//     { name: "Men", icon: <GiTShirt size={26} className="text-blue-600" /> },
//     { name: "Women ", icon: <GiLargeDress size={26} className="text-red-600" /> },
//   { name: "Mouse", icon: <FaMouse size={26} /> },
  
//   { name: "Camera", icon: <FaCamera size={26} /> },
//   { name: "Earphones", icon: <MdOutlineEarbuds size={26} /> },
//   { name: "Mobiles", icon: <FaMobileAlt size={26} /> },
//   // { name: "Printers", icon: <FaPrint size={26} /> },
//   // { name: "Processor", icon: <FaMicrochip size={26} /> },
//   // { name: "Refrigerator", icon: <MdOutlineKitchen size={26} /> },
//   { name: "Speakers", icon: <GiSpeaker size={26} /> },
//   { name: "Televisions", icon: <FaTv size={26} /> },
//   { name: "Trimmers", icon: <GiRazor size={26} /> },
//   { name: "Watches", icon: <FaRegClock size={26} /> },

// ];

// const Categories = () => {
//   const navigate=useNavigate()
//   const [selectedCategoryItem,setSelectedCategoryItem]=useState(null)
//  useEffect(()=>{
//    if(selectedCategoryItem==="Men"){
//      navigate('/men')
//   }
//  },[selectedCategoryItem])
//   return (
//     <div className="w-full bg-gray-100 py-2">
//       <div className="flex  justify-center gap-5 mx-5 lg:mx-10 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 bg-white py-4  ">
//         {categories.map((item, index) => (
//           <div onClick={()=>setSelectedCategoryItem(item.name)} key={index} className="flex flex-col items-center  text-center cursor-pointer ">
//             {/* Icon circle */}
//             <div className="bg-gray-200 hover:bg-gray-300 transition p-4 rounded-full flex items-center justify-center w-12 h-16 sm:w-18 sm:h-18">
//               <span className="text-gray-700">{item.icon}</span>
//             </div>
//             {/* Label */}
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
  FaPrint,
  FaMicrochip,
  FaTv,
  FaHeadphones,
  FaRegClock,
} from "react-icons/fa";
import { GiSpeaker, GiRazor } from "react-icons/gi";
import { MdOutlineEarbuds, MdOutlineKitchen } from "react-icons/md";
import { GiTShirt, GiLargeDress } from "react-icons/gi";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  { name: "Men", icon: <GiTShirt size={26} className="text-blue-600" /> },
  { name: "Women", icon: <GiLargeDress size={26} className="text-red-600" /> },
  { name: "Mouse", icon: <FaMouse size={26} /> },
  { name: "Camera", icon: <FaCamera size={26} /> },
  { name: "Earphones", icon: <MdOutlineEarbuds size={26} /> },
  { name: "Mobiles", icon: <FaMobileAlt size={26} /> },
  { name: "Speakers", icon: <GiSpeaker size={26} /> },
  { name: "Televisions", icon: <FaTv size={26} /> },
  { name: "Trimmers", icon: <GiRazor size={26} /> },
  { name: "Watches", icon: <FaRegClock size={26} /> },
];

const Categories = () => {
  
  const navigate = useNavigate();
  const [selectedCategoryItem, setSelectedCategoryItem] = useState(null);

  useEffect(() => {
    if (selectedCategoryItem === "Men") {
      navigate(`/Category/${selectedCategoryItem}`);
    }
    if(selectedCategoryItem === "Women"){
      console.log("Women selected")
      navigate(`/Category/${selectedCategoryItem}`)
    }
    if(selectedCategoryItem === "Mouse"){
      navigate(`/Category/${selectedCategoryItem}`) 
    }
    if(selectedCategoryItem === "Camera"){
      navigate(`/Category/${selectedCategoryItem}`) 
    }
    if(selectedCategoryItem === "Earphones"){ 
      navigate(`/Category/${selectedCategoryItem}`)
    }
    if(selectedCategoryItem === "Mobiles"){
      navigate(`/Category/${selectedCategoryItem}`)
    }
    if(selectedCategoryItem === "Speakers"){
      navigate(`/Category/${selectedCategoryItem}`)
    }
    if(selectedCategoryItem === "Televisions"){
      navigate(`/Category/${selectedCategoryItem}`)
    }
    if(selectedCategoryItem === "Trimmers"){
      navigate(`/Category/${selectedCategoryItem}`)
    }
  }, [selectedCategoryItem]);

  return (
    <div className="w-full bg-gray-100 py-2">
      {/* ✅ Horizontal scroll with hidden scrollbar */}
      <div className="flex justify-center gap-5 mx-5 lg:mx-10 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 bg-white py-4 overflow-x-auto flex-nowrap [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {categories.map((item, index) => (
          <div
            onClick={() => setSelectedCategoryItem(item.name)}
            key={index}
            className="flex flex-col items-center text-center cursor-pointer flex-shrink-0"
          >
            {/* Icon circle */}
            <div className="bg-gray-200 hover:bg-gray-300 transition p-4 rounded-full flex items-center justify-center w-12 h-16 sm:w-18 sm:h-18">
              <span className="text-gray-700">{item.icon}</span>
            </div>
            {/* Label */}
            <p className="text-base sm:text-base text-gray-800 mt-2 font-medium">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
