import React from 'react'

function ForProductDetails() {
  return (
    
    <div className="bg-gray-100 px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 pt-2 pb-5 animate-pulse">

      <div className="flex flex-col lg:flex-row gap-5">

        {/* LEFT IMAGE SECTION */}
        <div className="bg-white w-full lg:w-1/2 p-4 sm:p-6 flex flex-col gap-5">

          {/* Main Product Image */}
          <div className="w-full h-72 sm:h-96 md:h-[500px] lg:h-[520px] border-4 sm:border-6 lg:border-10 border-gray-200 rounded-2xl bg-gray-300"></div>

          {/* Thumbnail Images */}
          <div className="w-full flex justify-center mt-4">
            <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
              {[1, 2, 3, 4].map((item) => (
                <div
                  key={item}
                  className="h-20 w-20 sm:h-24 sm:w-24 md:h-28 md:w-28 rounded-lg bg-gray-300 border-2 border-gray-200"
                ></div>
              ))}
            </div>
          </div>

        </div>

        {/* RIGHT DETAILS SECTION */}
        <div className="bg-white w-full lg:w-1/2 p-5 flex flex-col gap-4">

          {/* Product Title */}
          <div className="h-8 w-3/4 bg-gray-300 rounded"></div>

          {/* Description */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
          </div>

          {/* Price */}
          <div className="h-8 w-40 bg-gray-300 rounded"></div>

          {/* Attributes */}
          <div className="flex flex-wrap gap-5 mt-3">
            {[1, 2].map((item) => (
              <div key={item}>
                <div className="h-4 w-20 bg-gray-300 rounded mb-2"></div>
                <div className="h-10 w-24 bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* Reviews Heading */}
          <div className="h-6 w-44 bg-gray-300 rounded mt-5"></div>

          {/* Reviews */}
          <div className="flex flex-col gap-4">

            {[1, 2].map((item) => (
              <div
                key={item}
                className="border-b border-gray-300 pb-3 flex flex-col gap-2"
              >

                <div className="h-4 w-32 bg-gray-300 rounded"></div>

                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className="h-5 w-5 rounded-full bg-gray-300"
                    ></div>
                  ))}
                </div>

                <div className="h-3 w-full bg-gray-300 rounded"></div>
                <div className="h-3 w-4/5 bg-gray-300 rounded"></div>

              </div>
            ))}

            {/* Pagination Buttons */}
            <div className="flex gap-2 mt-2">
              <div className="h-10 w-24 rounded-xl bg-gray-300"></div>
              <div className="h-10 w-24 rounded-xl bg-gray-300"></div>
            </div>

          </div>

          {/* Stock */}
          <div className="h-5 w-40 bg-gray-300 rounded"></div>

          {/* Quantity Section */}
          <div>

            <div className="h-5 w-52 bg-gray-300 rounded mb-3"></div>

            <div className="flex items-center w-fit border rounded-xl overflow-hidden shadow-sm">

              <div className="h-12 w-12 bg-gray-300"></div>

              <div className="h-12 w-14 bg-gray-200"></div>

              <div className="h-12 w-12 bg-gray-300"></div>

            </div>

          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-5 w-full">

            <div className="h-14 w-1/2 rounded-xl bg-gray-300"></div>

            <div className="h-14 w-1/2 rounded-xl bg-gray-300"></div>

          </div>

          {/* Rating Section */}
          <div className="mt-6">

            <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>

            <div className="flex gap-3 items-center flex-wrap">

              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className="h-8 w-8 rounded-full bg-gray-300"
                ></div>
              ))}

              <div className="h-4 w-24 bg-gray-300 rounded"></div>

            </div>

            {/* Review Text */}
            <div className="h-6 w-48 bg-gray-300 rounded mt-5 mb-3"></div>

            {/* Textarea */}
            <div className="w-full h-32 bg-gray-300 rounded"></div>

            {/* Submit Button */}
            <div className="h-11 w-40 bg-gray-300 rounded mt-3"></div>

          </div>

        </div>

      </div>
    </div>
  
  )
}

export default ForProductDetails