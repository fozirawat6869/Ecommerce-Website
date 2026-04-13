import React from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import api, { BASE_URL } from "../../utils/api";

function SearchInputsProduct() {

  const { search } = useParams();

  const fetchProducts = async () => {
    const res = await api.get(`/api/inputSearch?search=${search}`);
    console.log("Full response", res.data);
    console.log("search results", res.data.products)
    return res.data.products || [];
  };

  const { data = [], isLoading } = useQuery({
    queryKey: ["searchProducts", search],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p className="text-center py-5">Loading...</p>;
  }

  return (
    <div className="px-4 md:px-10 py-5">

      <h1 className="text-xl md:text-2xl font-bold text-center bg-gray-100 p-5 text-gray-500 mb-5">
        Search Results for "{search}"
      </h1>

      <div className="flex flex-wrap justify-center gap-5">

        {data.length === 0 ? (
          <p>No products found</p>
        ) : (
          data.map((item) => (
            <Link
              key={item.product_id}
              to={`/product/${item.product_id}`}
              className="w-[260px] h-[360px] bg-gray-100 p-2 flex flex-col"
            >

              {/* IMAGE */}
              <div className="w-full h-[70%]">
                <img
                  src={`${BASE_URL}/${item.image}`}
                  alt={item.product_name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* DETAILS */}
              <div className="h-[30%] flex flex-col justify-between p-2">

                <h2 className="text-sm font-medium">
                  {item.product_name}
                </h2>

                <p className="text-xs text-gray-500">
                  {item.product_description?.length > 40
                    ? item.product_description.slice(0, 40) + "..."
                    : item.product_description}
                </p>

                <p className="font-bold">
                  ₹{item.product_price}
                </p>

              </div>
            </Link>
          ))
        )}

      </div>
      
    </div>
  );
}

export default SearchInputsProduct;