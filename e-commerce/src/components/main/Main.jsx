import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import api, { BASE_URL } from "../../utils/api";

function Main() {

  const [newlyProduct, setNewlyProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/api/newlyAddedProducts", {
      params: {
        page: 1,
        limit: 4,
      },
    })
    .then((res) => {
      setNewlyProduct(res.data.newlyAddedProducts || []);
      setLoading(false);
    })
    .catch((err) => {
      console.log(err);
      setError("Error fetching products");
      setLoading(false);
    });
  }, []);

  // ✅ Loading
  if (loading) {
    return <h1 className="text-center py-10">Loading...</h1>;
  }

  // ✅ Error
  if (error) {
    return <h1 className="text-center text-red-500">{error}</h1>;
  }

  return (
    <div className="bg-gray-100 p-3 sm:px-5 md:px-10">
      <div className="bg-white">

        {/* HEADER */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-10 items-center p-4 sm:p-5">
          <h1 className="font-bold text-lg sm:text-xl md:text-2xl text-center">
            Newly Added Products
          </h1>

          <Link
            to="/newlyAddedProducts"
            className="bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center"
          >
            <IoIosArrowForward className="text-xl text-white" />
          </Link>
        </div>

        {/* EMPTY STATE */}
        {newlyProduct.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No products found
          </p>
        )}

        {/* PRODUCTS GRID */}
        <div className="mx-auto max-w-6xl grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 pb-5 px-2">

          {newlyProduct.map((item) => (
            <Link
              to={`/product/${item.product_id}`}
              key={item.product_id}
              className="bg-gray-100 p-2 sm:p-3 rounded-lg shadow-sm hover:shadow-md hover:scale-105 transition duration-200"
            >

              {/* IMAGE */}
              <div className="h-36 sm:h-44 md:h-56">
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
              <div className="mt-2 sm:mt-3 px-1 sm:px-2 flex flex-col">

                <h2 className="text-gray-700 text-xs sm:text-sm font-medium truncate">
                  {item.product_name}
                </h2>

                <p className="text-gray-600 text-xs sm:text-sm">
                  {item.product_description?.length > 38
                    ? item.product_description.substring(0, 38) + "..."
                    : item.product_description}
                </p>

                <p className="font-bold text-sm sm:text-[15px] mt-1">
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