import React, { useState } from 'react'
import { Link } from "react-router-dom";
import api, { BASE_URL } from "../../utils/api";
import { useQuery } from "@tanstack/react-query";

function NewlyAddedProduct() {

  const [page, setPage] = useState(1);
  const limit = 8;

  // 🔥 useQuery instead of useEffect
  const { data, isLoading } = useQuery({
    queryKey: ["newlyProducts", page],
    queryFn: async () => {
      const res = await api.get(`/api/newlyAddedProducts?page=${page}&limit=${limit}`);
      return res.data.newlyAddedProducts;
    },
    keepPreviousData: true, // smooth pagination
    staleTime: 1000 * 60, // 1 min cache
  });

  const newlyProduct = data || [];
  const loading = isLoading;

  return (
    <div className='bg-gray-100 px-2 sm:px-4 md:px-6 py-4'>

      <div className='bg-white rounded-xl shadow-md'>

        <h1 className='text-center py-5 font-bold text-lg sm:text-2xl md:text-3xl'>
          Newly Added Products
        </h1>

        <div className='flex justify-center'>
          <div className='flex flex-wrap justify-center gap-3 sm:gap-6 max-w-6xl w-full px-2'>

            {loading
              ? Array.from({ length: limit }).map((_, index) => (
                <div
                  key={index}
                  className='
                    w-[48%] sm:w-[45%] md:w-[30%] lg:w-[22%]
                    bg-gray-100 rounded-lg overflow-hidden shadow animate-pulse
                  '
                >
                  <div className='w-full h-36 sm:h-44 md:h-52 bg-gray-300'></div>

                  <div className='p-2 sm:p-3 flex flex-col gap-2'>
                    <div className='h-3 sm:h-4 bg-gray-300 rounded w-3/4'></div>
                    <div className='h-3 sm:h-4 bg-gray-300 rounded w-full'></div>
                    <div className='h-3 sm:h-4 bg-gray-300 rounded w-2/3'></div>
                    <div className='h-4 sm:h-5 bg-gray-400 rounded w-1/3 mt-2'></div>
                  </div>
                </div>
              ))
              : newlyProduct.map((item) => (
                <Link
                  to={`/product/${item.product_id}`}
                  key={item.product_id}
                  className='
                    w-[48%] sm:w-[45%] md:w-[30%] lg:w-[22%]
                    bg-gray-100 rounded-lg overflow-hidden shadow 
                    hover:shadow-lg hover:scale-105 transition duration-200
                  '
                >
                  <div className='w-full h-36 sm:h-44 md:h-52'>
                    <img
                      className='w-full h-full object-cover'
                      src={
                        item.main_image
                          ? `${BASE_URL}/${item.main_image}`
                          : "/placeholder.png"
                      }
                      alt="product"
                    />
                  </div>

                  <div className='p-2 sm:p-3 flex flex-col gap-1'>
                    <h2 className='text-gray-800 font-semibold text-xs sm:text-sm md:text-base line-clamp-1'>
                      {item.product_name}
                    </h2>

                    <p className='text-xs sm:text-sm text-gray-500 line-clamp-2'>
                      {item.product_description?.length > 60
                        ? item.product_description.substring(0, 60) + "..."
                        : item.product_description}
                    </p>

                    <p className='font-bold text-sm sm:text-base text-black mt-1'>
                      ₹{item.product_price}
                    </p>
                  </div>
                </Link>
              ))
            }

          </div>
        </div>

        {/* PAGINATION */}
        <div className='flex justify-center gap-4 py-6'>

          <button
            disabled={page === 1 || loading}
            onClick={() => setPage(page - 1)}
            className={`
              bg-red-500 px-3 sm:px-4 py-2 rounded-lg text-white
              disabled:opacity-40
              ${page === 1 || loading ? "cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            Previous
          </button>

          <button
            disabled={newlyProduct.length <= limit || loading}
            onClick={() => setPage(page + 1)}
            className={`
              bg-green-500 px-3 sm:px-4 py-2 rounded-lg text-white
              disabled:opacity-40
              ${newlyProduct.length <= limit || loading ? "cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            Next
          </button>

        </div>

      </div>
    </div>
  )
}

export default NewlyAddedProduct;