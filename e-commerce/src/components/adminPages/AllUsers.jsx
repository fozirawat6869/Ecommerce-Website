import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import api from '../../utils/api'

function AllUsers() {

  const [page, setPage] = useState(1)

  // 📦 Fetch Users
  const fetchUsers = async () => {
    try {
      const res = await api.get(`/api/allUsers?page=${page}&limit=10`)
       console.log("users res", res.data.users)
      return res.data.users || []
    } catch {
      console.log("error fetching users")
      return []
    }
  }

  const { data = [], isLoading } = useQuery({
    queryKey: ['users', page],
    queryFn: fetchUsers,
    cacheTime: 60*1000*5,
    staleTime: 60*1000*5,
  })

  return (
  <main className='bg-gray-100  py-6 flex justify-center'>
    
    <div className='w-full max-w-6xl px-3 sm:px-6'>
      
      {/* HEADER */}
      <h1 className='text-center text-purple-500 font-bold text-2xl md:text-3xl mb-6'>
        All Users
      </h1>

      <div className='bg-white rounded-2xl shadow-lg overflow-hidden'>

        {/* DESKTOP HEADER */}
        <div className='hidden md:grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50 border-b text-gray-600 font-semibold text-sm'>
          <p>S.No</p>
          <p>Name</p>
          <p>Email</p>
          <p>Mobile</p>
          <p className='text-center'>Action</p>
        </div>

        {/* DATA */}
        {isLoading ? (
          <p className='text-center py-10'>Loading...</p>
        ) : data.length === 0 ? (
          <p className='text-center py-10 text-gray-500'>No users found</p>
        ) : (
          data.map((user, index) => {
            const serial = (page - 1) * 10 + index + 1

            return (
              <div
                key={user.id}
                className='border-b last:border-none hover:bg-gray-50 transition'
              >

                {/* ✅ MOBILE VIEW */}
                <div className='flex flex-col gap-2 p-4 md:hidden'>

                  <div className='flex justify-between items-center'>
                    <p className='text-sm font-semibold text-gray-700'>
                      #{serial}
                    </p>

                    <span className={`text-xs px-2 py-1 rounded-full font-medium
                      ${user.role === "admin"
                        ? "bg-red-100 text-red-600"
                        : "bg-green-100 text-green-600"}`}>
                      {user.role}
                    </span>
                  </div>

                  <p className='font-semibold text-gray-800'>
                    {user.first_name || "No Name"}
                  </p>

                  <p className='text-sm text-gray-500 break-all'>
                    {user.email}
                  </p>

                  <p className='text-sm text-gray-600'>
                    📱 {user.mobile}
                  </p>

                  <div className='flex justify-end mt-2'>
                    <button className='text-xs bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition'>
                      Delete
                    </button>
                  </div>

                </div>

                {/* ✅ DESKTOP VIEW */}
                <div className='hidden md:grid grid-cols-5 gap-4 items-center px-6 py-4'>

                  <p className='text-gray-600'>{serial}</p>

                  <p className='font-medium text-gray-800'>
                    {user.first_name || "No Name"} {user.last_name || ""}
                  </p>

                  <p className='text-sm text-gray-500 truncate'>
                    {user.email}
                  </p>

                  <p className='text-sm text-gray-700'>
                    {user.mobile}
                  </p>

                  <div className='flex justify-center'>
                    <button className='bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-sm transition'>
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
      <div className='flex justify-center items-center gap-4 mt-6'>

        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className={`px-4 py-2 rounded-lg text-white text-sm transition
            ${page === 1
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"}`}
        >
          Prev
        </button>

        <span className='font-semibold text-sm sm:text-base'>
          Page {page}
        </span>

        <button
          disabled={data.length < 10}
          onClick={() => setPage(page + 1)}
          className={`px-4 py-2 rounded-lg text-white text-sm transition
            ${data.length < 10
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"}`}
        >
          Next
        </button>

      </div>

    </div>
  </main>
)
}

export default AllUsers