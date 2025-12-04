

import React, { useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useQuery } from '@tanstack/react-query'
import { filterConfig } from '../reuseCode/filterConfig'

function CategoryPage() {
  const { category } = useParams()
  const [showSection, setShowSection] = useState({})
  const [filters, setFilters] = useState({}) // dynamic filter state
  const [page, setPage] = useState(1)

  // Fetch products
  const fetchProducts = async () => {
    
    try {
      const queryParams = new URLSearchParams({
        category,
        ...filters,
        page,
        limit: 10
      }).toString()

      const res = await axios.get(`http://localhost:8000/api/productsCategory?${queryParams}`)
      console.log("all data for backend", queryParams)
      console.log(res)
      // return res.data || []
    } catch {
      console.log("error in fetching products")
    }
  }

  

  const { data } = useQuery({
    queryKey: ['products', page, filters, category],
    queryFn: fetchProducts,
    cacheTime: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 5
  })

  // Handle checkbox changes dynamically
  const handleFilterChange = (key, value) => {
    // console.log("key,value",key,value)
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

  // Get the current filter config for the category
  const currentFilterConfig = filterConfig[category] || {}
console.log(currentFilterConfig)
console.log("hlo",showSection)
  return (
    <main className='flex gap-5 bg-gray-100 px-8 py-4'>
      {/* LEFT FILTER */}
      <div className='flex flex-col bg-white h-auto w-1/4'>
        <h1 className='text-center text-xl py-4'>Filter</h1>

        {Object.keys(currentFilterConfig).map((filterKey) => (
          <div key={filterKey} className='border-b-1 border-gray-300 px-5 py-4'>
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={() =>
                setShowSection(prev => ({
                  ...prev,
                  [filterKey]:!prev[filterKey]
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
      </div>

      {/* RIGHT PRODUCTS */}
      <div className='flex flex-col w-full bg-white'>
        <h1 className='text-center font-bold text-2xl py-5'>{category} Products</h1>
        <div className='flex gap-5 flex-wrap justify-center pb-4'>
          {data?.map((item) => (
            <Link
              to={`/product/${item.product_id}`}
              key={item.product_id}
              className='w-90 h-120 p-2 bg-gray-100 cursor-pointer'
            >
              <div className='w-full h-[75%]'>
                <img className='w-full h-full' src={item.main_image} alt={item.name} />
              </div>
              <div className='w-full h-[25%] flex flex-col justify-center px-5'>
                <h2 className='text-gray-600 text-[18px]'>{item.name}</h2>
                <p>{item.description.length > 38 ? item.description.substring(0, 38) + "..." : item.description}</p>
                <p className='font-bold text-[18px]'>₹{item.price}</p>
              </div>
            </Link>
          ))}
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



