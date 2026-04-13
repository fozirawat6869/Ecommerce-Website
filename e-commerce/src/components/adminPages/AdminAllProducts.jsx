import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import api, { BASE_URL } from '../../utils/api'

function AdminAllProducts() {
  const queryClient = useQueryClient()
  const [page, setPage] = useState(1)
  const [deletingId, setDeletingId] = useState(null)

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/api/products?page=${page}&limit=10`
      )
      return res.data.allProduct || []
    } catch (err) {
      console.log("error in fetching products")
      return []
    }
  }

  async function handleDeleteProduct(productId) {
    try {
      setDeletingId(productId)

      const res = await api.delete(`/api/deleteProduct/${productId}`)

      if (res.data.success) {
        alert("Product deleted successfully")

        // ✅ refetch correct query
        queryClient.invalidateQueries(['products', page])
      } else {
        alert("Failed to delete product")
      }

      setDeletingId(null)
    } catch (err) {
      console.log("error in deleting product", err)
      alert("Failed to delete product")
      setDeletingId(null)
    }
  }

  const { data = [], isLoading } = useQuery({
    queryKey: ['products', page],
    queryFn: fetchProducts,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5,
  })

  // ================= Skeleton =================
  const SkeletonRow = () => {
    return (
      <div className="animate-pulse border-b px-3 py-3">
        <div className="flex gap-3 md:hidden">
          <div className="w-16 h-16 bg-gray-300 rounded-md"></div>
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            <div className="h-3 bg-gray-300 rounded w-2/4"></div>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-6 gap-4 items-center">
          <div className="h-4 bg-gray-300 rounded w-6"></div>
          <div className="w-16 h-16 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-16"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      </div>
    )
  }

  return (
    <main className='bg-gray-100 min-h-screen px-2 sm:px-4 md:px-8 py-5'>

      <h1 className='text-center text-lime-500 font-bold text-2xl md:text-3xl mb-6'>
        All Products
      </h1>

      <div className='bg-white rounded-xl shadow-sm overflow-hidden'>

        {/* HEADER */}
        <div className='hidden md:grid grid-cols-6 gap-4 px-5 py-3 border-b font-semibold text-gray-600'>
          <p>S.No</p>
          <p>Image</p>
          <p>Name</p>
          <p>Description</p>
          <p>Price</p>
          <p>Action</p>
        </div>

        {/* DATA */}
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <SkeletonRow key={i} />
          ))
        ) : data.length === 0 ? (
          <p className='text-center py-10 text-gray-500'>
            No products found
          </p>
        ) : (
          data.map((item, index) => {
            const serial = (page - 1) * 10 + index + 1

            return (
              <div
                key={item.product_id}
                className='border-b border-gray-300 hover:bg-gray-50 transition px-3 py-3'
              >

                {/* MOBILE */}
                <div className='flex gap-3 md:hidden items-start'>

                  <img
                    src={`${BASE_URL}/${item.image}`}
                    alt={item.product_name}
                    className='w-16 h-16 object-cover rounded-md'
                  />

                  <div className='flex flex-col w-full'>

                    <div className='flex justify-between'>
                      <p className='text-sm font-semibold'>#{serial}</p>
                      <p className='font-bold text-sm'>₹{item.product_price}</p>
                    </div>

                    <p className='text-sm font-medium text-gray-700 line-clamp-1'>
                      {item.product_name}
                    </p>

                    <p className='text-xs text-gray-500 line-clamp-1'>
                      {item.product_description}
                    </p>

                    <div className='flex gap-2 mt-2'>
                      <Link
                        to={`/product/${item.product_id}`}
                        className='text-xs bg-blue-500 text-white px-2 py-1 rounded'
                      >
                        View
                      </Link>

                      <button
                        onClick={() => handleDeleteProduct(item.product_id)}
                        disabled={deletingId === item.product_id}
                        className={` cursor-pointer text-xs px-2 py-1 rounded text-white transition
                          ${deletingId === item.product_id
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-red-500 hover:bg-red-600"}`}
                      >
                        {deletingId === item.product_id ? "Deleting..." : "Delete"}
                      </button>
                    </div>

                  </div>
                </div>

                {/* DESKTOP */}
                <div className='hidden md:grid grid-cols-6 gap-4 items-center'>

                  <p>{serial}</p>

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

                    <button
                      onClick={() => handleDeleteProduct(item.product_id)}
                      disabled={deletingId === item.product_id}
                      className={`px-3 cursor-pointer py-1 rounded-lg text-sm text-white transition
                        ${deletingId === item.product_id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600"}`}
                    >
                      {deletingId === item.product_id ? "Deleting..." : "Delete"}
                    </button>

                  </div>

                </div>

              </div>
            )
          })
        )}
      </div>

      {/* PAGINATION */}
      <div className='flex flex-wrap justify-center items-center gap-3 mt-6'>

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
            ${data.length <= 10 ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"}`}
        >
          Next
        </button>

      </div>

    </main>
  )
}

export default AdminAllProducts