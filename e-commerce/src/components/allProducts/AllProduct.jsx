import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useQuery } from '@tanstack/react-query'
import api, { BASE_URL } from '../../utils/api'

function AllProducts() {

  const [showSection, setShowSection] = useState({
    category: false,
    price: false,
  })

  const [page, setPage] = useState(1)
  const [categoryValue, setCategoryValue] = useState("")
  const [price, setPrice] = useState("")

  const fetchProducts = async () => {
    try {
      const res = await api.get(
        `/api/products?category=${categoryValue}&price=${price}&page=${page}&limit=${10}`
      )
      return res.data.allProduct || []
    } catch {
      console.log("error in fetching products")
      return []
    }
  }

  const { data } = useQuery({
    queryKey: ['products', page, categoryValue, price],
    queryFn: fetchProducts,
    cacheTime: 60*1000*5,
    staleTime: 60*1000*5,
  })

  const handleCategory = (e) => {
    if (categoryValue === e.target.value) {
      setCategoryValue("")
    } else {
      setCategoryValue(e.target.value)
    }
    setPage(1)
  }

  const handlePrice = (e) => {
    if (price === e.target.value) {
      setPrice("")
    } else {
      setPrice(e.target.value)
    }
    setPage(1)
  }

  return (
    <main className='flex flex-col lg:flex-row gap-5 bg-gray-100 px-4 sm:px-6 md:px-8 lg:px-10 py-3'>

      {/* LEFT FILTER */}
      <div className='w-full lg:w-1/4 bg-white'>

        <h1 className='text-center text-xl py-4'>Filter</h1>

        {/* CATEGORY */}
        <div className='border-t border-gray-300 px-5 py-4'>
          <div
            className='flex justify-between items-center cursor-pointer'
            onClick={() => setShowSection(prev => ({ ...prev, category: !prev.category }))}
          >
            <h2>CATEGORY</h2>
            {showSection.category ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {showSection.category && (
            <div className='flex flex-col pt-3'>
              {["Men", "Women", "Mouse", "Camera", "Earphones", "Mobiles", "Speakers", "Televisions", "Trimmers", "Watches"].map((cat) => (
                <div className='flex gap-3' key={cat}>
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={handleCategory}
                    checked={categoryValue === cat}
                  />
                  <label>{cat}</label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PRICE */}
        <div className='border-y border-gray-300 px-5 py-4'>
          <div
            className='flex justify-between items-center cursor-pointer'
            onClick={() => setShowSection(prev => ({ ...prev, price: !prev.price }))}
          >
            <h2>PRICE</h2>
            {showSection.price ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {showSection.price && (
            <div className='flex flex-col pt-3'>
              {["100", "200", "300", "400", "500", "1000", "1000plus"].map((val) => (
                <div className='flex gap-3' key={val}>
                  <input
                    type="checkbox"
                    value={val}
                    checked={price === val}
                    onChange={handlePrice}
                  />
                  <label>₹{val === "1000plus" ? "1000+" : val}</label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT PRODUCTS */}
      <div className='w-full bg-white'>

        <h1 className='text-center font-bold text-2xl py-5'>All Products</h1>

        {/* PRODUCTS */}
        <div className='flex flex-wrap justify-center gap-5 pb-5'>

          {data?.length === 0 ? (
            <p className='text-gray-500'>No products found</p>
          ) : (
            data?.map((item) => (
              <Link
                to={`/product/${item.product_id}`}
                key={item.product_id}
                className='w-[260px] h-[360px] p-2 bg-gray-100 cursor-pointer flex flex-col'
              >

                {/* IMAGE */}
                <div className='w-full h-[70%]'>
                  <img
                    className='w-full h-full object-cover'
                    src={`${BASE_URL}/${item.image}`}
                    alt={item.product_name}
                  />
                </div>

                {/* DETAILS */}
                <div className='w-full h-[30%] flex flex-col justify-between px-3 py-2'>

                  <h2 className='text-gray-600 text-[15px] font-medium'>
                    {item.product_name}
                  </h2>

                  <p className='text-sm text-gray-500'>
                    {item.product_description?.length > 38
                      ? item.product_description.substring(0, 38) + "..."
                      : item.product_description}
                  </p>

                  <p className='font-bold text-[16px]'>
                    ₹{item.product_price}
                  </p>

                </div>
              </Link>
            ))
          )}

        </div>

        {/* PAGINATION */}
        <div className='bg-gray-100'>
          <div className='flex justify-center gap-5 p-5 bg-white'>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className='bg-red-500 px-4 py-2 rounded-xl text-white'
            >
              Previous
            </button>

            <button
              disabled={data?.length < 10}
              onClick={() => setPage(page + 1)}
              className='bg-green-500 px-4 py-2 rounded-xl text-white'
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </main>
  )
}

export default AllProducts