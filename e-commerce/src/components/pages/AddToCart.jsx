import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api, { BASE_URL } from "../../utils/api";
import AddToCartLoader from "../../Loaders/ForAddToCart";

function AddToCart() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  // ✅ FETCH CART (CACHED)
  const fetchCart = async () => {
    const res = await api.get("/api/cartProducts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Simulate 2 sec delay
    return res.data.data;
  };

  const {
    data: cartItems = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,

    // ✅ caching
    staleTime: 1000 * 60 * 5,   // 5 min fresh
    cacheTime: 1000 * 60 * 10,  // 10 min cache
  });

  // ✅ REMOVE ITEM (Mutation)
  const removeMutation = useMutation({
    mutationFn: async (id) => {
      await api.post(
        "/api/removeFromCart",
        { cartId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    },

    // ✅ after success → refresh cache
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["cartCount"]);
    },
  });

  // ✅ TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.product_price) * Number(item.cart_quantity),
    0
  );

  // ✅ LOADING

  
 if (isLoading) {
  return(
    <AddToCartLoader />
  )

}

  // ✅ ERROR
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-red-500">Error loading cart</h2>
      </div>
    );
  }

  // ✅ EMPTY
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-gray-500">
          Your cart is empty 🛒
        </h2>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 p-4 sm:p-6 ">
      <h1 className="text-2xl sm:text-3xl text-center text-gray-700 font-bold mb-6">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between gap-4"
            >
              
              <div className="flex gap-4 sm:gap-5 items-center">
                <img
                  src={`${BASE_URL}/${item.image}`}
                  alt={item.product_name}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl border"
                />

                <div>
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-800">
                    {item.product_name}
                  </h2>

                  <p className="text-blue-600 font-bold mt-1">
                    ₹{item.product_price}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {Object.entries(item.product_attributes || {}).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                        >
                          {key}: {value}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-2">
                    <span className="text-gray-500 text-sm">Qty:</span>
                    <span className="ml-2 px-3 py-1 bg-gray-200 rounded-lg text-sm">
                      {item.cart_quantity}
                    </span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="flex sm:flex-col justify-between items-center">
                <p className="text-lg font-bold text-gray-800">
                  ₹
                  {Number(item.product_price) *
                    Number(item.cart_quantity)}
                </p>

                <button
                  onClick={() => removeMutation.mutate(item.cart_id)}
                  disabled={removeMutation.isPending}
                  className="text-red-500 text-sm hover:underline disabled:opacity-50"
                >
                  {removeMutation.isPending
                    ? "Removing..."
                    : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow h-fit">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between text-gray-600">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between mt-2 font-semibold text-lg">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="w-full bg-yellow-400 py-3 rounded-xl mt-4 hover:bg-yellow-500 transition font-semibold">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;