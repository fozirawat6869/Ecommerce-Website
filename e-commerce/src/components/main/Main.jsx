
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";

function Main() {
  const [newlyProduct, setNewlyProduct] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/api/newlyAddedProducts")
      .then(res => res.json())
      .then(data => {
        console.log("newly home data",data.newlyAddedProducts)
        setNewlyProduct(data.newlyAddedProducts)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <>
      <div className='bg-gray-100 p-3 sm:px-5 md:px-10'>
        <div className='flex flex-col bg-white'>
          {/* Header Section */}
          <div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 items-center p-4 sm:p-5'>
            <h1 className='font-bold text-xl sm:text-2xl text-center'>Newly Added Products</h1>
            <Link to="/newlyAddedProducts" className='bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center'>
              <IoIosArrowForward className='text-2xl text-white' />
            </Link>
          </div>

          {/* Products Section */}
          <div className='flex flex-wrap gap-4 sm:gap-5 justify-center bg-white pb-5'>
            {
              newlyProduct.slice(0, 4).map((item) => (
                <Link
                  to={`/product/${item.product_id}`}
                  key={item.product_id}
                  className='w-[90%] sm:w-64 md:w-80 h-auto p-2 bg-gray-100 cursor-pointer rounded-lg shadow-sm hover:shadow-md transition'
                >
                  <div className=' h-56 sm:h-64 md:h-72'>
                    <img className='w-full h-full  rounded-md' src={item.main_image} alt="product" />
                  </div>
                  <div className='mt-3 px-3 flex flex-col justify-center'>
                    <h2 className='text-gray-700 text-[15px] font-medium truncate'>{item.name}</h2>
                    <p className='text-gray-600 text-sm'>
                      {item.description.length > 38 ? item.description.substring(0, 38) + "..." : item.description}
                    </p>
                    <p className='font-bold text-[15px] mt-1'>₹{item.price}</p>
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


