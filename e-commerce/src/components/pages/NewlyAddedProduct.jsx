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
        console.log("newly added product data", res.data);
        setNewlyProduct(res.data.newlyAddedProducts);
      })
      .catch(err => console.log("Error fetching newly added products:", err));

  }, [page]);

  return (
    <div className='bg-gray-100 px-4 sm:px-6 md:px-10 py-4'>

      <div className='bg-white rounded-xl shadow-md'>

        {/* TITLE */}
        <h1 className='text-center py-5 font-bold text-xl sm:text-2xl md:text-3xl'>
          Newly Added Products
        </h1>

        {/* PRODUCTS GRID */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-4 pb-6'>

          {newlyProduct.map((item) => (
            <Link
              to={`/product/${item.product_id}`}
              key={item.product_id}
              className='bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg transition'
            >
              {/* IMAGE */}
              <div className='w-full h-48 sm:h-56 md:h-60 lg:h-64'>
                <img
                  className='w-full h-full object-cover'
                  src={`${BASE_URL}/${item.main_image}`}   // ✅ FIXED
                  alt="product"
                />
              </div>

              {/* DETAILS */}
              <div className='p-3 flex flex-col gap-1'>
                <h2 className='text-gray-700 font-semibold text-sm sm:text-base'>
                  {item.name}
                </h2>

                <p className='text-xs sm:text-sm text-gray-500'>
                  {item.description?.length > 40
                    ? item.description.substring(0, 40) + "..."
                    : item.description}
                </p>

                <p className='font-bold text-sm sm:text-lg'>
                  ₹{item.price}
                </p>
              </div>
            </Link>
          ))}

        </div>

        {/* PAGINATION */}
        <div className='flex justify-center gap-4 pb-6'>

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className='bg-red-500 px-4 py-2 rounded-lg text-white disabled:opacity-40'
          >
            Previous
          </button>

          <button
            disabled={newlyProduct.length < limit}
            onClick={() => setPage(page + 1)}
            className='bg-green-500 px-4 py-2 rounded-lg text-white disabled:opacity-40'
          >
            Next
          </button>

        </div>

      </div>
    </div>
  )
}

export default NewlyAddedProduct;