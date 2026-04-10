// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
// import { useQuery } from '@tanstack/react-query'
// import api, { BASE_URL } from '../../utils/api'

// function AdminAllProducts() {

//   const [showSection, setShowSection] = useState({
//     category: false,
//     price: false,
//   })

//   const [page, setPage] = useState(1)
//   const [categoryValue, setCategoryValue] = useState("")
//   const [price, setPrice] = useState("")

//   const fetchProducts = async () => {
//     try {
//       const res = await api.get(
//         `/api/products?category=${categoryValue}&price=${price}&page=${page}&limit=${10}`
//       )
//       return res.data.allProduct || []
//     } catch {
//       console.log("error in fetching products")
//       return []
//     }
//   }

//   const { data } = useQuery({
//     queryKey: ['products', page, categoryValue, price],
//     queryFn: fetchProducts,
//   })

//   const handleCategory = (e) => {
//     if (categoryValue === e.target.value) {
//       setCategoryValue("")
//     } else {
//       setCategoryValue(e.target.value)
//     }
//     setPage(1)
//   }

//   const handlePrice = (e) => {
//     if (price === e.target.value) {
//       setPrice("")
//     } else {
//       setPrice(e.target.value)
//     }
//     setPage(1)
//   }

//   return (
//     <main className='flex flex-col lg:flex-row gap-5 bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10 py-3'>

     

//       {/* RIGHT PRODUCTS */}
//       <div className='w-full bg-white'>

//         <h1 className='text-center font-bold text-2xl py-5'>All Products</h1>

//         {/* PRODUCTS */}
//         <div className='flex flex-wrap justify-center gap-5 pb-5'>

//           {data?.length === 0 ? (
//             <p className='text-gray-500'>No products found</p>
//           ) : (
//             data?.map((item) => (
//               <Link
//                 to={`/product/${item.product_id}`}
//                 key={item.product_id}
//                 className='w-[260px] h-[360px] p-2 bg-gray-100 cursor-pointer flex flex-col'
//               >

//                 {/* IMAGE */}
//                 <div className='w-full h-[70%]'>
//                   <img
//                     className='w-full h-full object-cover'
//                     src={`${BASE_URL}/${item.image}`}
//                     alt={item.product_name}
//                   />
//                 </div>

//                 {/* DETAILS */}
//                 <div className='w-full h-[30%] flex flex-col justify-between px-3 py-2'>

//                   <h2 className='text-gray-600 text-[15px] font-medium'>
//                     {item.product_name}
//                   </h2>

//                   <p className='text-sm text-gray-500'>
//                     {item.product_description?.length > 38
//                       ? item.product_description.substring(0, 38) + "..."
//                       : item.product_description}
//                   </p>

//                   <p className='font-bold text-[16px]'>
//                     ₹{item.product_price}
//                   </p>

//                 </div>
//               </Link>
//             ))
//           )}

//         </div>

//         {/* PAGINATION */}
//         <div className='bg-gray-100'>
//           <div className='flex justify-center gap-5 p-5 bg-white'>
//             <button
//               disabled={page === 1}
//               onClick={() => setPage(page - 1)}
//               className='bg-red-500 px-4 py-2 rounded-xl text-white'
//             >
//               Previous
//             </button>

//             <button
//               disabled={data?.length < 10}
//               onClick={() => setPage(page + 1)}
//               className='bg-green-500 px-4 py-2 rounded-xl text-white'
//             >
//               Next
//             </button>
//           </div>
//         </div>

//       </div>
//     </main>
//   )
// }

// export default AdminAllProducts


import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import api, { BASE_URL } from '../../utils/api'

function AdminAllProducts() {

  const [page, setPage] = useState(1)
  const [categoryValue, setCategoryValue] = useState("")
  const [price, setPrice] = useState("")

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/api/products?category=${categoryValue}&price=${price}&page=${page}&limit=10`
      )
      return res.data.allProduct || []
    } catch {
      console.log("error in fetching products")
      return []
    }
  }

  const { data = [], isLoading } = useQuery({
    queryKey: ['products', page, categoryValue, price],
    queryFn: fetchProducts,
  })

  return (
    <main className='bg-gray-100 min-h-screen px-3 sm:px-6 md:px-10 py-5'>

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
                key={item.product_id}
                className='border-b border-gray-300 hover:bg-gray-50 transition px-3 py-3'
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