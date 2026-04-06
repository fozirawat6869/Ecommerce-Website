

// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import { useQueryClient } from "@tanstack/react-query";

// function AddToCart() {
//   const queryClient = useQueryClient();

//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [removingId, setRemovingId] = useState(null);

//   const token = localStorage.getItem("token");

//   // ✅ FETCH CART FUNCTION
//   const fetchCart = useCallback(async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8000/api/cartProducts",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       setCartItems(res.data.data);
//     } catch (err) {
//       console.log("Error fetching cart:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [token]);

//   // ✅ CALL ON LOAD
//   useEffect(() => {
//     fetchCart();
//   }, [fetchCart]);

//   // ✅ TOTAL PRICE
//   const totalPrice = cartItems.reduce(
//     (total, item) =>
//       total + Number(item.product_price) * Number(item.cart_quantity),
//     0
//   );

//   // ✅ REMOVE ITEM
//   const handleRemove = async (id) => {
//     setRemovingId(id);

//     try {
//       await axios.post(
//         "http://localhost:8000/api/removeFromCart",
//         { cartId: id },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       await fetchCart();
//       queryClient.invalidateQueries(["cartCount"]);
//     } catch (err) {
//       console.log("Error removing item:", err);
//     } finally {
//       setRemovingId(null);
//     }
//   };

//   // ✅ LOADING
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h2 className="text-xl text-gray-600">Loading cart...</h2>
//       </div>
//     );
//   }

//   // ✅ EMPTY
//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <h2 className="text-xl text-gray-500">
//           Your cart is empty 🛒
//         </h2>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-100 p-4 sm:p-6 min-h-screen">
      
//       {/* HEADING */}
//       <h1 className="text-2xl sm:text-3xl text-center text-gray-700 font-bold mb-6">
//         Your Cart
//       </h1>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
//         {/* ================= CART ITEMS ================= */}
//         <div className="lg:col-span-2 space-y-4">
//           {cartItems.map((item) => (
//             <div
//               key={item.cart_id}
//               className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between gap-4"
//             >
//               {/* LEFT */}
//               <div className="flex gap-4 sm:gap-5 items-center">
                
//                 {/* IMAGE */}
//                 <img
//                   src={`http://localhost:8000/${item.image}`}
//                   alt={item.product_name}
//                   className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl border"
//                 />

//                 {/* DETAILS */}
//                 <div className="max-w-[200px] sm:max-w-sm">
                  
//                   <h2 className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight">
//                     {item.product_name}
//                   </h2>

//                   <p className="text-blue-600 font-bold mt-1 text-sm sm:text-base">
//                     ₹{item.product_price}
//                   </p>

//                   {/* ATTRIBUTES */}
//                   <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
//                     {Object.entries(item.product_attributes || {}).map(
//                       ([key, value]) => (
//                         <span
//                           key={key}
//                           className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs px-2 py-1 rounded-full"
//                         >
//                           {key}: {value}
//                         </span>
//                       )
//                     )}
//                   </div>

//                   {/* QUANTITY */}
//                   <div className="mt-2 sm:mt-3">
//                     <span className="text-xs sm:text-sm text-gray-500">
//                       Qty:
//                     </span>
//                     <span className="ml-2 px-2 sm:px-3 py-1 bg-gray-200 rounded-lg text-xs sm:text-sm font-medium">
//                       {item.cart_quantity}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* RIGHT */}
//               <div className="flex sm:flex-col justify-between sm:items-end items-center">
                
//                 <p className="text-sm sm:text-lg font-bold text-gray-800">
//                   ₹
//                   {Number(item.product_price) *
//                     Number(item.cart_quantity)}
//                 </p>

//                 <button
//                   onClick={() => handleRemove(item.cart_id)}
//                   disabled={removingId === item.cart_id}
//                   className="text-red-500 cursor-pointer text-xs sm:text-sm hover:underline disabled:opacity-50"
//                 >
//                   {removingId === item.cart_id
//                     ? "Removing..."
//                     : "Remove"}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ================= SUMMARY ================= */}
//         <div className="bg-white p-4 sm:p-6 rounded-2xl shadow h-fit">
//           <h2 className="text-lg sm:text-xl font-bold mb-4">
//             Order Summary
//           </h2>

//           <div className="flex justify-between mb-2 text-gray-600 text-sm sm:text-base">
//             <span>Total Items</span>
//             <span>{cartItems.length}</span>
//           </div>

//           <div className="flex justify-between mb-4 text-base sm:text-lg font-semibold">
//             <span>Total Price</span>
//             <span>₹{totalPrice}</span>
//           </div>

//           <button className="w-full bg-yellow-400 py-2 sm:py-3 rounded-xl hover:bg-yellow-500 transition font-semibold text-sm sm:text-base">
//             Place Order
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddToCart;


import React, { useEffect, useState, useCallback } from "react";


import { useQueryClient } from "@tanstack/react-query";

// ✅ add this
import api, { BASE_URL } from "../../utils/api";

function AddToCart() {
  const queryClient = useQueryClient();

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ FETCH CART FUNCTION
  const fetchCart = useCallback(async () => {
    try {
      const res = await api.get(
        "/api/cartProducts",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCartItems(res.data.data);
    } catch (err) {
      console.log("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // ✅ CALL ON LOAD
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // ✅ TOTAL PRICE
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.product_price) * Number(item.cart_quantity),
    0
  );

  // ✅ REMOVE ITEM
  const handleRemove = async (id) => {
    setRemovingId(id);

    try {
      await api.post(
        "/api/removeFromCart",
        { cartId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await fetchCart();
      queryClient.invalidateQueries(["cartCount"]);
    } catch (err) {
      console.log("Error removing item:", err);
    } finally {
      setRemovingId(null);
    }
  };

  // ✅ LOADING
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl text-gray-600">Loading cart...</h2>
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
    <div className="bg-gray-100 p-4 sm:p-6 min-h-screen">
      
      <h1 className="text-2xl sm:text-3xl text-center text-gray-700 font-bold mb-6">
        Your Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.cart_id}
              className="bg-white p-4 sm:p-5 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between gap-4"
            >
              
              <div className="flex gap-4 sm:gap-5 items-center">
                
                {/* ✅ image fixed */}
                <img
                  src={`${BASE_URL}/${item.image}`}
                  alt={item.product_name}
                  className="w-20 h-20 sm:w-28 sm:h-28 object-cover rounded-xl border"
                />

                <div className="max-w-[200px] sm:max-w-sm">
                  
                  <h2 className="text-sm sm:text-lg font-semibold text-gray-800 leading-tight">
                    {item.product_name}
                  </h2>

                  <p className="text-blue-600 font-bold mt-1 text-sm sm:text-base">
                    ₹{item.product_price}
                  </p>

                  <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                    {Object.entries(item.product_attributes || {}).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="bg-gray-100 text-gray-700 text-[10px] sm:text-xs px-2 py-1 rounded-full"
                        >
                          {key}: {value}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-2 sm:mt-3">
                    <span className="text-xs sm:text-sm text-gray-500">
                      Qty:
                    </span>
                    <span className="ml-2 px-2 sm:px-3 py-1 bg-gray-200 rounded-lg text-xs sm:text-sm font-medium">
                      {item.cart_quantity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col justify-between sm:items-end items-center">
                
                <p className="text-sm sm:text-lg font-bold text-gray-800">
                  ₹
                  {Number(item.product_price) *
                    Number(item.cart_quantity)}
                </p>

                <button
                  onClick={() => handleRemove(item.cart_id)}
                  disabled={removingId === item.cart_id}
                  className="text-red-500 cursor-pointer text-xs sm:text-sm hover:underline disabled:opacity-50"
                >
                  {removingId === item.cart_id
                    ? "Removing..."
                    : "Remove"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-2xl shadow h-fit">
          <h2 className="text-lg sm:text-xl font-bold mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2 text-gray-600 text-sm sm:text-base">
            <span>Total Items</span>
            <span>{cartItems.length}</span>
          </div>

          <div className="flex justify-between mb-4 text-base sm:text-lg font-semibold">
            <span>Total Price</span>
            <span>₹{totalPrice}</span>
          </div>

          <button className="w-full bg-yellow-400 py-2 sm:py-3 rounded-xl hover:bg-yellow-500 transition font-semibold text-sm sm:text-base">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddToCart;