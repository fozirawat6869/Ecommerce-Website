import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from '@tanstack/react-query'
import api, { BASE_URL } from '../../utils/api'

function Main() {

  const fetchNewProducts = async () => {
    const res = await api.get("/api/newlyAddedProducts")
    return res.data.newlyAddedProducts
  }

  const { data: newlyProduct = [], isLoading, isError } = useQuery({
    queryKey: ['newProducts'],
    queryFn: fetchNewProducts,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
  })

  if (isLoading) return <h1>Loading...</h1>
  if (isError) return <h1>Error fetching products</h1>

  return (
    <div className='bg-gray-100 p-3 sm:px-5 md:px-10'>
      <div className='flex flex-col bg-white'>

        <div className='flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 items-center p-4 sm:p-5'>
          <h1 className='font-bold text-xl sm:text-2xl text-center'>Newly Added Products</h1>
          <Link to="/newlyAddedProducts" className='bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center'>
            <IoIosArrowForward className='text-2xl text-white' />
          </Link>
        </div>

        <div className='flex flex-wrap gap-4 sm:gap-5 justify-center bg-white pb-5'>
          {
            newlyProduct.slice(0, 4).map((item) => (
              <Link
                to={`/product/${item.product_id}`}
                key={item.product_id}
                className='w-[90%] sm:w-64 md:w-80 p-2 bg-gray-100 cursor-pointer rounded-lg shadow-sm hover:shadow-md transition'
              >
                <div className='h-56 sm:h-64 md:h-72'>
                  <img 
                    className='w-full h-full rounded-md' 
                    src={`${BASE_URL}/${item.main_image}`} 
                    alt="product" 
                  />
                </div>

                <div className='mt-3 px-3 flex flex-col'>
                  <h2 className='text-gray-700 text-[15px] font-medium truncate'>
                    {item.product_name}
                  </h2>

                  <p className='text-gray-600 text-sm'>
                    {item.product_description.length > 38
                      ? item.product_description.substring(0, 38) + "..."
                      : item.product_description}
                  </p>

                  <p className='font-bold text-[15px] mt-1'>
                    ₹{item.product_price}
                  </p>
                </div>

              </Link>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Main