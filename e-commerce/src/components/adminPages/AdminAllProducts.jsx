

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api, { BASE_URL } from '../../utils/api'

function AdminAllProducts() {

  const [page, setPage] = useState(1)


  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/api/products?page=${page}&limit=10`
      )
      return res.data.allProduct || []
    } catch {
      console.log("error in fetching products")
      return []
    }
  }

  const { data = [], isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: fetchProducts,
    cacheTime: 60*1000*5,
    staleTime: 60*1000*5,
  })

  return (
    <main className='bg-gray-100  px-3 sm:px-6 md:px-10 py-5'>

      <h1 className='text-center text-lime-500 font-bold text-2xl md:text-3xl mb-6'>
        All Products 
      </h1>

      <div className='bg-white rounded-xl shadow overflow-hidden'>

        {/* HEADER (desktop only) */}
        <div className='hidden font-semibold  md:grid grid-cols-6 gap-4 px-5 py-3 border-b border-gray-400 font-semibold text-gray-600'>
          <p>S.No</p>
          <p>Image</p>
          <p>Name</p>
          <p>Description</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {/* DATA */}
        {isLoading ? (
          <p className='text-center py-10'>Loading...</p>
        ) : data.length === 0 ? (
          <p className='text-center py-10 text-gray-500'>No products found</p>
        ) : (
          data.map((item, index) => {

            const serial = (page - 1) * 10 + index + 1

            return (
              <div
                className='border-b border-gray-300 hover:bg-gray-50 tran                key={item.product_id}
sition px-3 py-3'
              >

                {/* ✅ MOBILE VIEW */}
                <div className='flex gap-3 md:hidden '>

                  {/* IMAGE */}
                  <img
                    src={`${BASE_URL}/${item.image}`}
                    alt={item.product_name}
                    className='w-16 h-16 object-cover rounded-md'
                  />

                  {/* DETAILS */}
                  <div className='flex flex-col justify-between w-full '>

                    <div className='flex justify-between '>
                      <p className='text-sm  font-semibold'>
                        #{serial}
                      </p>
                      <p className='font-bold text-sm'>
                        ₹{item.product_price}
                      </p>
                    </div>

                    <p className='text-sm font-medium text-gray-700 line-clamp-1'>
                      {item.product_name}
                    </p>

                    <p className='text-xs text-gray-500 line-clamp-1'>
                      {item.product_description}
                    </p>

                    <div className='flex gap-2 mt-1'>
                      <Link
                        to={`/product/${item.product_id}`}
                        className='text-xs bg-blue-500 text-white px-2 py-1 rounded'
                      >
                        View
                      </Link>
                      <button className='text-xs bg-red-500 text-white px-2 py-1 rounded'>
                        Delete
                      </button>
                    </div>

                  </div>
                </div>

                {/* ✅ DESKTOP VIEW */}
                <div className='hidden md:grid grid-cols-6 gap-4 items-center'>

                  <p className='pl-4'>{serial}</p>

                  <img
                    src={`${BASE_URL}/${item.image}`}
                    alt={item.product_name}
                    className='w-16 h-16 object-cover rounded-lg'
                  />

                  <p className='font-medium'>{item.product_name}</p>

                  <p className='text-sm text-gray-500'>
                    {item.product_description?.length > 40
                      ? item.product_description.substring(0, 40) + "..."
                      : item.product_description}
                  </p>

                  <p className='font-bold'>₹{item.product_price}</p>

                  <div className='flex gap-2'>
                    <Link
                      to={`/product/${item.product_id}`}
                      className='bg-blue-500 text-white px-3 py-1 rounded-lg text-sm'
                    >
                      View
                    </Link>

                    <button className='bg-red-500 text-white px-3 py-1 rounded-lg text-sm'>
                      Delete
                    </button>
                  </div>

                </div>

              </div>
            )
          })
        )}
      </div>

       {/* PAGINATION */}
      <div className='flex justify-center items-center gap-5 mt-6'>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg text-white transition 
            ${page === 1 ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"}`}
        >
          Previous
        </button>

        <span className='font-semibold'>Page {page}</span>

        <button
          disabled={data.length < 10}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg text-white transition 
            ${data.length < 10 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
        >
          Next
        </button>

      </div>

    </main>
  )
}

export default AdminAllProducts