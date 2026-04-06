// import React, { useEffect,useState } from 'react'
// import axios from 'axios'
// import { Link } from 'react-router-dom'
// import { IoIosArrowDown } from "react-icons/io";
// import { IoIosArrowUp } from "react-icons/io";
// import { useQuery } from '@tanstack/react-query';
// import { use } from 'react';


// function AllProducts() {
//    const [showSection,setShowSection]=useState({
//      category:false,
//      price:false,
//      size:false,
//      color:false
//    })

//    const [page,setPage]=useState(1)


//   const [categoryValue,setCategoryValue]=useState("")
//   const [price,setPrice]=useState("")

    
//     const fetchProducts=async()=>{
//       console.log("flo")
//         try{
//             const res=await axios.get(`http://localhost:8000/api/products?category=${categoryValue}&price=${price}&page=${page}&limit=${10}`)
//             // setData(res.data.allProduct)

//             console.log("response",res)
//             // console.log(res.data.allProduct)
//             const data=res.data.allProduct
//             return data || []
//         }
//         catch{
//             console.log("error in fetching products")
//         }
//     }
  
// // useQuery hook  to fetch and cache data
//     const{data}=useQuery({
//         queryKey:['products',page,categoryValue,price],
//         queryFn:fetchProducts,  
//         cacheTime:1000*60*5,
//         staleTime:1000*60*5
//     })

//    console.log(data)

//     const handleCategory = (e) => {
//   if (categoryValue === e.target.value) {
//     setCategoryValue(""); // uncheck
//   } else {
//     setCategoryValue(e.target.value); // check
//   }
//   setPage(1);
// };

// const handlePrice = (e) => {
//   if (price === e.target.value) {
//     setPrice(""); // uncheck
//   } else {
//     setPrice(e.target.value); // check
//   }
//   setPage(1);
// };



//   return (
//     <>
//     <main className='flex  gap-5 bg-gray-100 px-10 py-2'>

//     {/* left part customize */}
//     <div className='flex flex-col bg-white h-auto w-1/4  '>

//        <h1 className='text-center text-xl py-4 '>Filter</h1>


//       {/* Left Category section */}
//        <div className=' border-t-1 border-gray-300 px-5 py-4'>
//           <div className='flex justify-between items-center  cursor-pointer  '
//            onClick={()=>setShowSection(prev=>({...prev,category:!prev.category}))}>
//           <h2>CATEGORY</h2>
//            {showSection.category===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
         
//            </div>
//            {showSection.category && (
//             <div className='flex flex-col pt-3 '>
//                 <div className='flex gap-3'>
//                  <input
//                   type="checkbox"
//                   value="Men" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Men"}
                  
//                   />

//                  <label htmlFor="">Men</label>
//                 </div>
//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Women" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Women"}
//                   />
//                  <label htmlFor="">Women</label>
//                 </div>
                
//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Mouse" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Mouse"}
//                   />
//                  <label htmlFor="">Mouse</label>
//                 </div>

//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Camera" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Camera"}
//                   />
//                  <label htmlFor="">Camera</label>
//                 </div>

//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Earphones" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Earphones"}
//                   />
//                  <label htmlFor="">Earphones</label>
//                 </div>

//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Mobiles" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Mobiles"}
//                   />
//                  <label htmlFor="">Mobiles</label>
//                 </div>

//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Speakers" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Speakers"}
//                   />
//                  <label htmlFor="">Speakers</label>
//                 </div>

//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Televisions" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Televisions"}
//                   />
//                  <label htmlFor="">Televisions</label>
//                 </div>

//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Trimmers" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Trimmers"}
//                   />
//                  <label htmlFor="">Trimmers</label>
//                 </div>

//                 <div className='flex gap-3'>
//                  <input 
//                  type="checkbox"
//                   value="Watches" 
//                   onChange={handleCategory} 
//                   checked={categoryValue==="Watches"}
//                   />
//                  <label htmlFor="">Watches</label>
//                 </div>
//             </div>
//         )}
//        </div>

//         {/* Left Price Section */}

   
//         <div className='border-b-1 border-t-1 border-gray-300 px-5 py-4'>
//           <div className='flex justify-between items-center  cursor-pointer  ' 
//           onClick={()=>setShowSection(prev=>({...prev,price:!prev.price}))}>
//           <h2>PRICE</h2>
//            {showSection.price===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
         
//            </div>
//            {showSection.price && (
//             <div className='flex flex-col pt-3 '>
//                 <div className='flex gap-3'>
//                  <input type="checkbox" name="" id="" value="100"
//                  checked={price==="100"}
//                     onChange={handlePrice} 
//                     />
//                  <label htmlFor="">₹100</label>
//                 </div>
//                 <div className='flex gap-3'>
//                  <input type="checkbox" name="" id="" value="200" 
//                  checked={price==="200"}
//                     onChange={handlePrice} 
                   
//                  />
//                  <label htmlFor="">₹200</label>
//                 </div>
//                 <div className='flex gap-3'>
//                  <input type="checkbox" name="" id="" value="300"
//                     onChange={handlePrice} 
//                     checked={price==="300"}
//                  />
//                  <label htmlFor="">₹300</label>
//                 </div>
//                  <div className='flex gap-3'>
//                  <input type="checkbox" name="" id="" value="400"
//                     onChange={handlePrice} 
//                    checked={price==="400"}
//                  />

//                  <label htmlFor="">₹400</label>
//                 </div>
//                  <div className='flex gap-3'>
//                  <input type="checkbox" name="" id="" value="500" 
//                  checked={price==="500"}
//                    onChange={handlePrice} 
//                  />
//                  <label htmlFor="">₹500</label>
//                 </div>
//                  <div className='flex gap-3'>
//                  <input type="checkbox" name="" id="" value="1000" 
//                  checked={price==="1000"}              
//                     onChange={handlePrice}
//                   />
//                  <label htmlFor="">₹1000</label>
//                 </div>
//                  <div className='flex gap-3'>
//                  <input type="checkbox" name="" id="" value="1000plus"
//                     onChange={handlePrice} 
//                      checked={price==="1000plus"}
//                   />
//                  <label htmlFor="">₹1000+</label>
//                 </div>
//             </div>
//         )}
//        </div>
      
//     </div>

//     {/* right part  products */}
//     <div className=' flex flex-col w-full  bg-white'>
//     <h1 className='text-center font-bold text-2xl py-5 '>All Products</h1>
//      <div className='flex gap-5 flex-wrap justify-center  pb-4'>
        
//         {
//             data?.map((item)=>(
//                 <Link to={`/product/${item.product_id}`} key={item.product_id}
//                      className='  w-90 h-120 p-2  bg-gray-100 cursor-pointer '
//                 > 
//                     <div className='w-full h-[75%]'>
//                       <img className=' w-full h-full' 
//                       src={`http://localhost:8000/${item.image}`}  
//                       alt="jacket image" /></div>
//                     <div className='w-full h-[25%] flex flex-col justify-center px-5  flex flex-col justify-center'>
//                         <h2 className='text-gray-600 text-[18px]'>{item.product_name}</h2> 
//                         {/* <p>{item.description}</p> */}
//                         <p>{item.product_description.length > 38 ? item.description.substring(0, 38) + "..." : item.description}</p>


//                         <p className='font-bold text-[18px]'>₹{item.product_price}</p>
                       
//                         <p>sfdgdfdfg</p>
//                     </div>
//                 </Link>
//             ))
//         }
//      </div>
//      {/* Pagination */}
//      <div className='pt-3 bg-gray-100 '>
//        <div className='flex justify-center bg-white gap-5 p-5 '>
//            <button
//            disabled={page===1}
//             onClick={()=>setPage(page-1)}
//             className=' bg-red-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Previous</button>
//             <button 
//             disabled={data?.length<page*10}
//             onClick={()=>setPage(page+1)}
//             className=' bg-green-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Next</button>
//         </div>
//      </div>
//     </div>
//     </main>
//     </>
//   )
// }

// export default AllProducts




import React, { useEffect,useState } from 'react'


import { Link } from 'react-router-dom'
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useQuery } from '@tanstack/react-query';
import { use } from 'react';

// ✅ added this
import api, { BASE_URL } from '../../utils/api';

function AllProducts() {
   const [showSection,setShowSection]=useState({
     category:false,
     price:false,
     size:false,
     color:false
   })

   const [page,setPage]=useState(1)

  const [categoryValue,setCategoryValue]=useState("")
  const [price,setPrice]=useState("")

    
    const fetchProducts=async()=>{
      console.log("flo")
        try{
            // ✅ changed axios → api
            const res=await api.get(`/api/products?category=${categoryValue}&price=${price}&page=${page}&limit=${10}`)

            console.log("response",res)
            const data=res.data.allProduct
            return data || []
        }
        catch{
            console.log("error in fetching products")
        }
    }
  
    const{data}=useQuery({
        queryKey:['products',page,categoryValue,price],
        queryFn:fetchProducts,  
        cacheTime:1000*60*5,
        staleTime:1000*60*5
    })

   console.log(data)

    const handleCategory = (e) => {
  if (categoryValue === e.target.value) {
    setCategoryValue("");
  } else {
    setCategoryValue(e.target.value);
  }
  setPage(1);
};

const handlePrice = (e) => {
  if (price === e.target.value) {
    setPrice("");
  } else {
    setPrice(e.target.value);
  }
  setPage(1);
};

  return (
    <>
    <main className='flex  gap-5 bg-gray-100 px-10 py-2'>

    <div className='flex flex-col bg-white h-auto w-1/4  '>

       <h1 className='text-center text-xl py-4 '>Filter</h1>

       <div className=' border-t-1 border-gray-300 px-5 py-4'>
          <div className='flex justify-between items-center  cursor-pointer  '
           onClick={()=>setShowSection(prev=>({...prev,category:!prev.category}))}>
          <h2>CATEGORY</h2>
           {showSection.category===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
           </div>

           {showSection.category && (
            <div className='flex flex-col pt-3 '>
                {/* unchanged */}
            </div>
        )}
       </div>

        <div className='border-b-1 border-t-1 border-gray-300 px-5 py-4'>
          <div className='flex justify-between items-center  cursor-pointer  ' 
          onClick={()=>setShowSection(prev=>({...prev,price:!prev.price}))}>
          <h2>PRICE</h2>
           {showSection.price===true?<IoIosArrowUp/>:<IoIosArrowDown/>}
           </div>

           {showSection.price && (
            <div className='flex flex-col pt-3 '>
                {/* unchanged */}
            </div>
        )}
       </div>
      
    </div>

    <div className=' flex flex-col w-full  bg-white'>
    <h1 className='text-center font-bold text-2xl py-5 '>All Products</h1>
     <div className='flex gap-5 flex-wrap justify-center  pb-4'>
        
        {
            data?.map((item)=>(
                <Link to={`/product/${item.product_id}`} key={item.product_id}
                     className='  w-90 h-120 p-2  bg-gray-100 cursor-pointer '
                > 
                    <div className='w-full h-[75%]'>
                      <img className=' w-full h-full' 
                      // ✅ changed here
                      src={`${BASE_URL}/${item.image}`}  
                      alt="jacket image" />
                    </div>

                    <div className='w-full h-[25%] flex flex-col justify-center px-5  flex flex-col justify-center'>
                        <h2 className='text-gray-600 text-[18px]'>{item.product_name}</h2> 

                        <p>{item.product_description.length > 38 ? item.description.substring(0, 38) + "..." : item.description}</p>

                        <p className='font-bold text-[18px]'>₹{item.product_price}</p>
                       
                        <p>sfdgdfdfg</p>
                    </div>
                </Link>
            ))
        }
     </div>

     <div className='pt-3 bg-gray-100 '>
       <div className='flex justify-center bg-white gap-5 p-5 '>
           <button
           disabled={page===1}
            onClick={()=>setPage(page-1)}
            className=' bg-red-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Previous</button>

            <button 
            disabled={data?.length<page*10}
            onClick={()=>setPage(page+1)}
            className=' bg-green-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Next</button>
        </div>
     </div>
    </div>
    </main>
    </>
  )
}

export default AllProducts