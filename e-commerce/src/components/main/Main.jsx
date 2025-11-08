import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";

function Main() {
    const [newlyProduct,setNewlyProduct]=useState([])
    // const [page,setPage]
    useEffect(()=>{
         fetch("http://localhost:8000/api/newlyAddedProducts")
         .then(res=>res.json())
         .then(data=>{
            console.log(data.newlyAddedProducts)
             setNewlyProduct(data.newlyAddedProducts)
        })
         .catch(err=>console.log(err))
         
    },[])
  return (
   <>
      <div className='bg-gray-100 p-3 px-10'>
        {/* <h1 className='text-3xl bg-white text-center px-10'>Newly Added Products</h1> */}
           <div className=' flex flex-col  bg-white'>
       <div className='flex justify-center gap-10 items-center p-5'>
         <h1 className=' font-bold text-2xl '>Newly Added Products</h1>
         <Link to="/newlyAddedProducts" className='bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center' ><IoIosArrowForward className='text-2xl text-white'/></Link>
       </div>
     <div className='flex gap-5 flex-wrap justify-center  bg-white  pb-4'>
        
        {
            newlyProduct.slice(0,4).map((item)=>(
                <Link to={`/product/${item.product_id}`} key={item.product_id}
                     className='  w-80 h-100 p-2  bg-gray-100 cursor-pointer '
                >
                    <div className='w-full h-[75%]'><img className=' w-full h-full' src={item.main_image} alt="jacket image" /></div>
                    <div className='w-full h-[25%] flex flex-col justify-center px-5  flex flex-col justify-center'>
                        <h2 className='text-gray-600 text-[15px]'>{item.name}</h2> 
                        {/* <p>{item.description}</p> */}
                        <p>{item.description.length > 38 ? item.description.substring(0, 38) + "..." : item.description}</p>

                        <p className='font-bold text-[15px]'>₹{item.price}</p>
                       
                        <p>sfdgdfdfg</p>
                    </div>
                </Link>
            ))
        }
     </div>
   
    </div>
      </div>
   </>

  )
}

export default Main


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { IoIosArrowForward } from "react-icons/io";

// function Main() {
//   const [newlyProduct, setNewlyProduct] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:8000/api/newlyAddedProducts")
//       .then((res) => res.json())
//       .then((data) => setNewlyProduct(data.newlyAddedProducts || []))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="bg-gray-100 p-4 px-6 md:px-10">
//       <div className="flex flex-col bg-white rounded-md shadow-sm">
//         {/* Header */}
//         <div className="flex justify-between items-center py-5 px-6 md:px-12">
//           <h1 className="font-bold text-2xl">Newly Added Products</h1>
//           <Link
//             to="/newly-added"
//             className="bg-blue-500 hover:bg-blue-600 rounded-full w-8 h-8 flex items-center justify-center"
//           >
//             <IoIosArrowForward className="text-2xl text-white" />
//           </Link>
//         </div>

//         {/* Products Grid */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 px-5 pb-6">
//           {newlyProduct.slice(0, 4).map((item) => (
//             <Link
//               to={`/product/${item.product_id}`}
//               key={item.product_id}
//               className="bg-gray-100 rounded-lg hover:shadow-md transition cursor-pointer"
//             >
//               <div className="w-full h-[200px] sm:h-[250px] md:h-[280px] overflow-hidden rounded-t-lg">
//                 <img
//                   className="w-full h-full object-cover"
//                   src={item.main_image}
//                   alt={item.name}
//                 />
//               </div>

//               <div className="p-3">
//                 <h2 className="text-gray-700 font-medium text-lg truncate">
//                   {item.name}
//                 </h2>
//                 <p className="text-gray-500 text-sm mt-1">
//                   {item.description.length > 40
//                     ? item.description.substring(0, 40) + "..."
//                     : item.description}
//                 </p>
//                 <p className="font-semibold text-lg mt-2 text-gray-800">
//                   ₹{item.price}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Main;

