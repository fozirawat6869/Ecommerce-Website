import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "../../utils/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function SearchInputsProduct() {
  const { search } = useParams();

  const fetchProducts = async () => {
    const res = await api.get(`/api/inputSearch?search=${search}`);
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // simulate network delay
    return res.data.products || [];
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["searchProducts", search],
    queryFn: fetchProducts,
  });

  return (
  <div className="py-5 flex flex-col items-center px-10">

    <h1 className=" w-full  text-center text-2xl font-bold mb-6 bg-gray-200 text-gray-500 py-5">Search Results for "{search}"</h1>

  <div className="flex flex-wrap justify-center gap-5">

    {isLoading
      ? Array(4).fill(0).map((_, i) => (
          <div
            key={i}
            className="w-[170px] sm:w-[190px] bg-gray-100 p-2 rounded-lg"
          >
            <Skeleton height={140} />
            <Skeleton height={15} className="mt-2" />
            <Skeleton height={12} />
            <Skeleton height={15} width={60} />
          </div>
        ))

      : data.length === 0 ? (
        <p className="text-center text-gray-500 w-full">
          No products found
        </p>
      ) : (
        data.map((item) => (
          <Link
            key={item.product_id}
            to={`/product/${item.product_id}`}
            className="w-[170px] sm:w-[190px] bg-gray-100 p-2 rounded-lg"
          >
            <div className="h-[140px]">
              <img
                src={`${BASE_URL}/${item.image}`}
                alt={item.product_name}
                className="w-full h-full object-cover rounded"
              />
            </div>

            <h2 className="text-sm mt-2 line-clamp-2">
              {item.product_name}
            </h2>

            <p className="text-xs text-gray-500 line-clamp-2">
              {item.product_description}
            </p>

            <p className="font-bold text-sm">
              ₹{item.product_price}
            </p>
          </Link>
        ))
      )}

  </div>
</div>
  );
}

export default SearchInputsProduct;