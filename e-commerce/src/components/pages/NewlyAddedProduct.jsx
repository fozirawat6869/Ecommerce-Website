import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import api, { BASE_URL } from "../../utils/api";

function NewlyAddedProduct() {

  const [page, setPage] = useState(1);
  const limit = 12;

  const [newlyProduct, setNewlyProduct] = useState([]);

  useEffect(() => {
    api.get(`/api/newlyAddedProducts?page=${page}&limit=${limit}`)
      .then(res => {
        console.log("DATA:", res.data);
        setNewlyProduct(res.data.newlyAddedProducts);
      })
      .catch(err => console.log("Error fetching newly added products:", err));
  }, [page]);

  return (
    <div className='bg-gray-100 px-2 sm:px-4 md:px-6 py-4'>

      <div className='bg-white rounded-xl shadow-md'>

        {/* TITLE */}
        <h1 className='text-center py-5 font-bold text-lg sm:text-2xl md:text-3xl'>
          Newly Added Products
        </h1>

        {/* CENTER CONTAINER */}
        <div className='flex justify-center'>
          <div className='flex flex-wrap justify-center gap-3 sm:gap-6 max-w-6xl w-full px-2'>

            {newlyProduct.map((item) => (
              <Link
                to={`/product/${item.product_id}`}
                key={item.product_id}
                className='
                  w-[48%] 
                  sm:w-[45%] 
                  md:w-[30%] 
                  lg:w-[22%] 
                  bg-gray-100 
                  rounded-lg 
                  overflow-hidden 
                  shadow 
                  hover:shadow-lg 
                  hover:scale-105 
                  transition duration-200
                '
              >

                {/* IMAGE */}
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

                {/* DETAILS */}
                <div className='p-2 sm:p-3 flex flex-col gap-1'>

                  {/* NAME */}
                  <h2 className='text-gray-800 font-semibold text-xs sm:text-sm md:text-base line-clamp-1'>
                    {item.product_name}
                  </h2>

                  {/* DESCRIPTION */}
                  <p className='text-xs sm:text-sm text-gray-500 line-clamp-2'>
                    {item.product_description?.length > 60
                      ? item.product_description.substring(0, 60) + "..."
                      : item.product_description}
                  </p>

                  {/* PRICE */}
                  <p className='font-bold text-sm sm:text-base text-black mt-1'>
                    ₹{item.product_price}
                  </p>

                </div>
              </Link>
            ))}

          </div>
        </div>

        {/* PAGINATION */}
        <div className='flex justify-center gap-4 py-6'>

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className='bg-red-500 px-3 sm:px-4 py-2 rounded-lg text-white disabled:opacity-40'
          >
            Previous
          </button>

          <button
            disabled={newlyProduct.length < limit}
            onClick={() => setPage(page + 1)}
            className='bg-green-500 px-3 sm:px-4 py-2 rounded-lg text-white disabled:opacity-40'
          >
            Next
          </button>

        </div>

      </div>
    </div>
  )
}

export default NewlyAddedProduct;