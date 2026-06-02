import React, { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io"
import { useQuery } from '@tanstack/react-query'
import { filterConfig } from '../reuseCode/filterConfig'
import api, { BASE_URL } from '../../utils/api'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

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

  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        category,
        ...filters,
        page,
        price,
        limit: 10
      }).toString()

      const res = await api.get(`/api/productsCategory?${queryParams}`)
      return res.data.categoryProducts || []
    } catch {
      return []
    }
  }

  const {
    data,
    isLoading,
    isError,
    isFetching
  } = useQuery({
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

  if (isError) {
    return (
      <div className='flex items-center justify-center h-64'>
        <p className='text-red-500 text-lg'>
          Error loading products. Please try again.
        </p>
      </div>
    )
  }

  return (
    <main className='flex flex-col lg:flex-row gap-5 bg-gray-100 px-3 sm:px-6 md:px-8 py-2'>

      {/* ================= FILTER ================= */}
      <div className='w-full lg:w-1/4 bg-white rounded-lg shadow'>
        <h1 className='text-center text-lg sm:text-xl py-4 font-semibold'>
          Filter
        </h1>

        {Object.keys(currentFilterConfig).map((filterKey) => (
          <div key={filterKey} className='border-b border-gray-300 px-4 py-3'>
            <div
              className='flex justify-between items-center cursor-pointer'
              onClick={() =>
                setShowSection(prev => ({
                  ...prev,
                  [filterKey]: !prev[filterKey]
                }))
              }
            >
              <h2 className='text-sm sm:text-base'>
                {filterKey.toUpperCase()}
              </h2>
              {showSection[filterKey] ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </div>

            {showSection[filterKey] && (
              <div className='flex flex-col pt-2'>
                {currentFilterConfig[filterKey].map((value) => (
                  <div className='flex gap-2 items-center' key={value}>
                    <input
                      type="checkbox"
                      value={value}
                      checked={filters[filterKey] === value}
                      onChange={() => handleFilterChange(filterKey, value)}
                    />
                    <label className='text-sm'>{value}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {/* ================= PRICE ================= */}
        <div className='border-b border-gray-300 px-4 py-3'>
          <div
            className='flex justify-between items-center cursor-pointer'
            onClick={() =>
              setShowSection(prev => ({ ...prev, price: !prev.price }))
            }
          >
            <h2 className='text-sm sm:text-base'>Price</h2>
            {showSection.price ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </div>

          {showSection.price && (
            <div className='flex flex-col pt-2'>
              {["100","200","300","400","500","1000","1000plus"].map(val => (
                <div key={val} className='flex gap-2 items-center'>
                  <input
                    type="checkbox"
                    value={val}
                    checked={price === val}
                    onChange={handlePrice}
                  />
                  <label className='text-sm'>
                    ₹{val === "1000plus" ? "1000+" : val}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className='w-full bg-white rounded-lg shadow'>
        <h1 className='text-center font-bold text-xl sm:text-2xl py-4'>
          {category} Products
        </h1>

        {/* 🔥 FIRST LOAD LOADER ONLY */}
        {isLoading ? (
          <SkeletonTheme baseColor="#e5e7eb" highlightColor="#f3f4f6">
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 pb-4 justify-items-center'>
              {[...Array(8)].map((_, i) => (
                <div key={i} className='w-full max-w-[250px] bg-gray-100 rounded-lg'>
                  <Skeleton height={140} />
                  <div className='p-3'>
                    <Skeleton height={15} />
                    <Skeleton height={12} width="80%" />
                    <Skeleton height={16} width="40%" />
                  </div>
                </div>
              ))}
            </div>
          </SkeletonTheme>
        ) : (
          <>
            {/* 🔥 FILTER UPDATE LOADER (SMALL ONLY) */}
            {isFetching && (
              <div className="px-4 py-2 text-sm text-gray-500">
                Updating products...
              </div>
            )}

            {/* ================= PRODUCTS GRID ================= */}
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-3 pb-4 justify-items-center'>
              {data?.length === 0 ? (
                <div className='col-span-full text-center text-gray-500 py-10'>
                  No products available
                </div>
              ) : (
                data?.map((item) => (
                  <Link
                    to={`/product/${item.product_id}`}
                    key={item.product_id}
                    className='bg-gray-100 rounded-lg overflow-hidden w-[150px] sm:w-[190px] md:w-[220px] lg:w-full lg:max-w-[250px] hover:shadow-lg transition'
                  >
                    <div className='h-[120px] sm:h-40 md:h-48 lg:h-52'>
                      <img
                        className='w-full h-full object-cover'
                        src={`${BASE_URL}/${item.image}`}
                        alt={item.product_name}
                      />
                    </div>

                    <div className='p-2 sm:p-3 flex flex-col gap-1'>
                      <h2 className='text-xs sm:text-sm md:text-base font-semibold line-clamp-2'>
                        {item.product_name}
                      </h2>

                      <p className='text-[11px] sm:text-xs md:text-sm text-gray-500'>
                        {item.product_description.length > 40
                          ? item.product_description.substring(0, 40) + "..."
                          : item.product_description}
                      </p>

                      <p className='font-bold text-xs sm:text-sm md:text-base'>
                        ₹{item.product_price}
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </>
        )}

        {/* ================= PAGINATION ================= */}
        <div className='flex justify-center gap-3 py-4'>
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className='bg-red-500 px-3 sm:px-4 py-2 rounded-xl text-white text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Previous
          </button>

          <button
            disabled={data?.length < 10}
            onClick={() => setPage(page + 1)}
            className='bg-green-500 px-3 sm:px-4 py-2 rounded-xl text-white text-sm sm:text-base disabled:opacity-50 disabled:bg-transparent'
          >
            Next
          </button>
        </div>

      </div>
    </main>
  )
}

export default CategoryPage