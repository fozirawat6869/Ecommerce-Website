import React from 'react'

function FroPaymentCompo() {
  return (
    <div className="bg-gray-100 flex flex-col lg:flex-row gap-4 lg:gap-5 items-center lg:items-start justify-center p-2 animate-pulse">

      {/* ADDRESS SKELETON */}
      <div className="bg-white w-full max-w-sm sm:max-w-md rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 border border-gray-200">

        <div className="h-4 w-24 bg-gray-300 rounded mb-4"></div>

        <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>

        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded"></div>
          <div className="h-4 w-52 bg-gray-200 rounded"></div>
        </div>

        <div className="h-5 w-32 bg-gray-300 rounded mt-5"></div>

        <div className="mt-5 bg-gray-100 border border-gray-200 rounded-xl sm:rounded-2xl p-4 flex items-center justify-between">

          <div className="h-4 w-40 bg-gray-300 rounded"></div>

          <div className="h-4 w-14 bg-gray-300 rounded"></div>

        </div>
      </div>

      {/* PAYMENT SKELETON */}
      <div className="w-full max-w-sm sm:max-w-md lg:max-w-3xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-7">

        <div className="mb-7">
          <div className="h-8 w-52 bg-gray-300 rounded mb-3"></div>
          <div className="h-4 w-72 bg-gray-200 rounded"></div>
        </div>

        <div className="space-y-4">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border-2 border-gray-200 rounded-xl sm:rounded-2xl p-4 sm:p-5"
            >

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="w-14 h-14 bg-gray-300 rounded-xl"></div>

                  <div>
                    <div className="h-5 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                  </div>

                </div>

                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>

              </div>

            </div>
          ))}

        </div>

        <div className="h-14 w-full bg-gray-300 rounded-xl sm:rounded-2xl mt-8"></div>

      </div>
    </div>
  )
}

export default FroPaymentCompo