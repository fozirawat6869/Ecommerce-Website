import React from 'react'
import { Link } from "react-router-dom";
import { useState,useEffect } from 'react';

function NewlyAddedProduct() {
     
    const [page,setPage]=useState(1)
     let limit =8;

      const [newlyProduct,setNewlyProduct]=useState([])
        // const [page,setPage]
        useEffect(()=>{
             fetch(`http://localhost:8000/api/newlyAddedProducts?page=${page}&limit=8`)
             .then(res=>res.json())
             .then(data=>{
                console.log(data.newlyAddedProducts)
                 setNewlyProduct(data.newlyAddedProducts)
            })
             .catch(err=>console.log(err))
             
        },[page])
  return (
  <>
     <div className='bg-gray-100 p-3 px-10'>
        {/* <h1 className='text-3xl bg-white text-center px-10'>Newly Added Products</h1> */}
           <div className=' flex flex-col  bg-white'>
       
         <h1 className='text-center p-5 font-bold text-2xl '>Newly Added Products</h1>
        
     <div className='flex gap-5 flex-wrap justify-center  bg-white  pb-4'>
        
        {
            newlyProduct.map((item)=>(
                <Link to={`/product/${item.product_id}`} key={item.product_id}
                     className='  w-90 h-120 p-2  bg-gray-100 cursor-pointer '
                >
                    <div className='w-full h-[75%]'><img className=' w-full h-full' src={item.main_image} alt="jacket image" /></div>
                    <div className='w-full h-[25%] flex flex-col justify-center px-5  flex flex-col justify-center'>
                        <h2 className='text-gray-600 text-[18px]'>{item.name}</h2> 
                        {/* <p>{item.description}</p> */}
                        <p>{item.description.length > 38 ? item.description.substring(0, 38) + "..." : item.description}</p>

                        <p className='font-bold text-[18px]'>₹{item.price}</p>
                       
                        <p>sfdgdfdfg</p>
                    </div>
                </Link>
            ))
        }
     </div>
        {/* Pagination */}
     <div className='pt-3 bg-gray-100 '>
       <div className='flex justify-center bg-white gap-5 p-5 '>
           <button
           disabled={page===1}
            onClick={()=>setPage(page-1)}
            className=' bg-red-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Previous</button>
            <button 
            disabled={newlyProduct.length<limit}
            onClick={()=>setPage(page+1)}
            className=' bg-green-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'>Next</button>
        </div>
     </div>
    </div>
      </div>
  </>
  )
}

export default NewlyAddedProduct