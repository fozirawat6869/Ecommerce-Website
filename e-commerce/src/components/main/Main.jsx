import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "../../utils/api";

function Main() {

  // ✅ Fetch function (matches backend)
  const fetchNewProducts = async () => {
    const res = await api.get("/api/newlyAddedProducts", {
      params: {
        page: 1,
        limit: 4,
      },
    });

    return res.data.newlyAddedProducts || [];
  };

  // ✅ React Query (caching enabled)
  const {
    data: newlyProduct = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newProducts", 1], // 🔥 cache key with page
    queryFn: fetchNewProducts,
    staleTime: 1000 * 60 * 5, // 5 min cache
  });

  // ✅ Loading UI
  if (isLoading) {
    return <h1 className="text-center py-10">Loading...</h1>;
  }

  // ✅ Error UI
  if (isError) {
    return <h1 className="text-center text-red-500">Error fetching products</h1>;
  }

  return (
    <div className="bg-gray-100 p-3 sm:px-5 md:px-10">
      <div className="bg-white">

        {/* HEADER */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 items-center p-4 sm:p-5">
          <h1 className="font-bold text-xl sm:text-2xl text-center">
            Newly Added Products
          </h1>

          <Link
            to="/newlyAddedProducts"
            className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center"
          >
            <IoIosArrowForward className="text-2xl text-white" />
          </Link>
        </div>

        {/* PRODUCTS GRID */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 pb-5">

          {newlyProduct.map((item) => (
            <Link
              to={`/product/${item.product_id}`}
              key={item.product_id}
              className="bg-gray-100 p-2 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition duration-200"
            >

              {/* IMAGE */}
              <div className="h-56">
                <img
                  className="w-full h-full object-cover rounded-md"
                  src={
                    item.main_image
                      ? `${BASE_URL}/${item.main_image}`
                      : "/placeholder.png"
                  }
                  alt="product"
                />
              </div>

              {/* DETAILS */}
              <div className="mt-3 px-2 flex flex-col">

                <h2 className="text-gray-700 text-sm font-medium truncate">
                  {item.product_name}
                </h2>

                <p className="text-gray-600 text-sm">
                  {item.product_description?.length > 38
                    ? item.product_description.substring(0, 38) + "..."
                    : item.product_description}
                </p>

                <p className="font-bold text-[15px] mt-1">
                  ₹{item.product_price}
                </p>

              </div>

            </Link>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Main;