import React from 'react'
import Skeleton,{SkeletonTheme} from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'





function ForAddToCart() {
   return (
     <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
       <div className="bg-gray-100 p-4 sm:p-6 ">
         
         {/* Title */}
         <h1 className="text-2xl sm:text-3xl text-center font-bold mb-6">
           <Skeleton width={180} />
         </h1>
 
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
           
           {/* LEFT SIDE */}
           <div className="lg:col-span-2 space-y-4">
             
             {[1, 2, 3, 4].map((_, index) => (
               <div
                 key={index}
                 className="bg-blue-400 p-4 sm:p-5 rounded-2xl shadow-sm flex flex-col sm:flex-row justify-between gap-4"
               >
                 
                 {/* LEFT CONTENT */}
                 <div className="flex gap-4 sm:gap-5 items-center">
                   
                   {/* Image */}
                   <Skeleton
                     width={80}
                     height={80}
                     className="sm:w-[110px] sm:h-[110px] rounded-xl"
                   />
 
                   <div className="w-full">
                     
                     {/* Product Name */}
                     <Skeleton height={18} width="70%" />
 
                     {/* Price */}
                     <Skeleton height={18} width="40%" className="mt-2" />
 
                     {/* Attributes */}
                     <div className="flex gap-2 mt-2">
                       <Skeleton height={20} width={50} borderRadius={20} />
                       <Skeleton height={20} width={60} borderRadius={20} />
                       <Skeleton height={20} width={40} borderRadius={20} />
                     </div>
 
                     {/* Quantity */}
                     <Skeleton height={18} width={90} className="mt-3" />
                   </div>
                 </div>
 
                 {/* RIGHT SIDE */}
                 <div className="flex sm:flex-col justify-between items-center">
                   
                   {/* Total */}
                   <Skeleton height={20} width={60} />
 
                   {/* Remove */}
                   <Skeleton height={15} width={50} />
                 </div>
               </div>
             ))}
 
           </div>
 
           {/* RIGHT SIDE (ORDER SUMMARY) */}
           <div className="bg-blue-400 p-4 sm:p-6 rounded-2xl shadow h-fit">
             
             <Skeleton height={22} width="60%" />
 
             <Skeleton height={18} width="80%" className="mt-4" />
             <Skeleton height={18} width="60%" className="mt-2" />
 
             <Skeleton height={45} className="mt-4 rounded-xl" />
           </div>
 
         </div>
       </div>
     </SkeletonTheme>
   );
}

export default ForAddToCart