

import React, { useState } from 'react'


import { Link, useParams } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useQuery } from '@tanstack/react-query'
import { filterConfig } from '../reuseCode/filterConfig'

// ✅ add this
import api, { BASE_URL } from '../../utils/api'

function CategoryPage() {
  const { category } = useParams()
  const [showSection, setShowSection] = useState({})
  const [filters, setFilters] = useState({})
  const [page, setPage] = useState(1)
  const [price, setPrice] = useState("")

  const handlePrice = (e) => {
    const value = e.target.value
    setPrice(prev => prev === value ? "" : value)
  }

  // Fetch products
  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        category,
        ...filters,
        page,
        price,
        limit: 10
      }).toString()

      // ✅ axios → api
      const res = await api.get(`/api/productsCategory?${queryParams}`)

      console.log("all data for backend", queryParams)
      console.log(res.data.categoryProducts)
      return res.data.categoryProducts || []
    } catch {
      console.log("error in fetching category products")
      return []
    }
  }

  const { data } = useQuery({
    queryKey: ['products', page, filters, category, price],
    queryFn: fetchProducts,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      if (prev[key] === value) {
        const copy = { ...prev }
        delete copy[key]
        return copy
      }
      return { ...prev, [key]: value }
    })
    setPage(1)
  }

  const currentFilterConfig = filterConfig[category] || {}

  return (
    <main className='flex gap-5 bg-gray-100 px-8 py-4'>

      <div className='flex flex-col bg-white h-auto w-1/4'>
        <h1 className='text-center text-xl py-4'>Filter</h1>

        {Object.keys(currentFilterConfig).map((filterKey) => (
          <div key={filterKey} className='border-b-1 border-gray-300 px-5 py-4'>
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={() =>
                setShowSection(prev => ({
                  ...prev,
                  [filterKey]: !prev[filterKey]
                }))
              }
            >
              <h2>{filterKey.toUpperCase()}</h2>
              {showSection[filterKey] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>

            {showSection[filterKey] && (
              <div className='flex flex-col pt-3'>
                {currentFilterConfig[filterKey].map((value) => (
                  <div className='flex gap-3' key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      checked={filters[filterKey] === value}
                      onChange={() => handleFilterChange(filterKey, value)}
                    />
                    <label>{value}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* PRICE */}
        <div className='border-b-1 border-gray-300 px-5 py-4'>
          <div 
            className='flex justify-between items-center cursor-pointe'
            onClick={() => setShowSection(prev => ({ ...prev, price: !prev.price }))}
          >
            <h2>Price</h2>
            {showSection.price ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {showSection.price && (
            <div className='flex flex-col pt-3 '>
              <div className='flex gap-3'>
                <input type="checkbox" value="100" checked={price==="100"} onChange={handlePrice} />
                <label>₹100</label>
              </div>

              <div className='flex gap-3'>
                <input type="checkbox" value="200" checked={price==="200"} onChange={handlePrice} />
                <label>₹200</label>
              </div>

              <div className='flex gap-3'>
                <input type="checkbox" value="300" checked={price==="300"} onChange={handlePrice} />
                <label>₹300</label>
              </div>

              <div className='flex gap-3'>
                <input type="checkbox" value="400" checked={price==="400"} onChange={handlePrice} />
                <label>₹400</label>
              </div>

              <div className='flex gap-3'>
                <input type="checkbox" value="500" checked={price==="500"} onChange={handlePrice} />
                <label>₹500</label>
              </div>

              <div className='flex gap-3'>
                <input type="checkbox" value="1000" checked={price==="1000"} onChange={handlePrice} />
                <label>₹1000</label>
              </div>

              <div className='flex gap-3'>
                <input type="checkbox" value="1000plus" checked={price==="1000plus"} onChange={handlePrice} />
                <label>₹1000+</label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className='flex flex-col w-full bg-white'>
        <h1 className='text-center font-bold text-2xl py-5'>{category} Products</h1>

        <div className='flex gap-5 flex-wrap justify-center pb-4 '>
          {data?.length === 0 ? (
            <div className='bg-gray-100 pt-3 w-full'>
              <h2 className="text-lg font-semibold text-gray-600 bg-white text-center pt-4 ">
                No products available
              </h2>
            </div>
          ) : (
            data?.map((item) => (
              <Link
                to={`/product/${item.product_id}`}
                key={item.product_id}
                className='w-90 h-120 p-2 bg-gray-100 cursor-pointer'
              >
                <div className='w-full h-[75%]'>
                  {/* ✅ image fixed */}
                  <img 
                    className='w-full h-full' 
                    src={`${BASE_URL}/${item.image}`} 
                    alt={item.product_name} 
                  />
                </div>

                <div className='w-full h-[25%] flex flex-col justify-center px-5'>
                  <h2 className='text-gray-600 text-[18px]'>{item.product_name}</h2>
                  <p>{item.product_description.length > 38 ? item.product_description.substring(0, 38) + "..." : item.product_description}</p>
                  <p className='font-bold text-[18px]'>₹{item.product_price}</p>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className='pt-3 bg-gray-100'>
          <div className='flex justify-center bg-white gap-5 p-5'>
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className='bg-red-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'
            >
              Previous
            </button>

            <button
              disabled={data?.length < page * 10}
              onClick={() => setPage(page + 1)}
              className='bg-green-500 px-4 py-2 rounded-xl text-white text-[16px] cursor-pointer'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default CategoryPage