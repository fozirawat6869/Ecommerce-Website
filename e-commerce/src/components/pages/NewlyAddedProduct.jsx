import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "../../utils/api";

function NewlyAddedProduct() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const fetchProducts = async ({ queryKey }) => {
    const [_key, page] = queryKey;

    const res = await api.get(
      `/api/newlyAddedProducts?page=${page}&limit=${limit}`
    );

    return res.data.newlyAddedProducts || [];
  };

  const {
    data: products = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["new-products", page], // 🔥 caching per page
    queryFn: fetchProducts,
    keepPreviousData: true, // smooth pagination
    staleTime: 1000 * 60 * 5, // cache 5 minutes
  });

  // 🔹 Loading UI
  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  // 🔹 Error UI
  if (isError) {
    return <p className="text-center text-red-500">Failed to load products</p>;
  }

  return (
    <div className="bg-gray-100 px-4 sm:px-6 md:px-10 py-6">
      <div className="bg-white rounded-xl shadow-md">

        <h1 className="text-center py-5 font-bold text-xl sm:text-2xl md:text-3xl">
          Newly Added Products
        </h1>

        {/* GRID */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((item) => (
            <Link
              to={`/product/${item.product_id}`}
              key={item.product_id}
              className="bg-gray-100 rounded-lg overflow-hidden shadow hover:shadow-lg hover:scale-105 transition duration-200"
            >
              {/* IMAGE */}
              <div className="w-full h-52">
                <img
                  className="w-full h-full object-cover"
                  src={
                    item.main_image
                      ? `${BASE_URL}/${item.main_image}`
                      : "/placeholder.png"
                  }
                  alt="product"
                />
              </div>

              {/* DETAILS */}
              <div className="p-3">
                <h2 className="font-semibold line-clamp-1">
                  {item.product_name}
                </h2>

                <p className="text-sm text-gray-500 line-clamp-2">
                  {item.product_description}
                </p>

                <p className="font-bold mt-1">
                  ₹{item.product_price}
                </p>
              </div>
            </Link>
          ))}

        </div>

        {/* PAGINATION */}
        <div className="flex justify-center gap-4 py-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="bg-red-500 px-4 py-2 rounded-lg text-white disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={products.length < limit}
            onClick={() => setPage((p) => p + 1)}
            className="bg-green-500 px-4 py-2 rounded-lg text-white disabled:opacity-40"
          >
            Next
          </button>
        </div>

      </div>
    </div>
  );
}

export default NewlyAddedProduct;