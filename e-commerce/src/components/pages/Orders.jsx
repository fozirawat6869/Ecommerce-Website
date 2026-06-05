


import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";

export default function Orders() {
  const [filter, setFilter] = useState("all");



  const handleShowOrders=async()=>{
       try{
        const res=await api.get('/api/showOrders',{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        })
        console.log("Orders data from API", res.data.orders);
        // await new Promise((resolve) => setTimeout(resolve, 5000)); // simulate network delay
        return res.data.orders || [] ; // Assuming the orders are in res.data.orders
       }catch(err){
        console.log("Error while fetching orders", err);
        throw err;
       }
  };

  const {data:orderData,isLoading}=useQuery({
    queryKey:["orders"],
    queryFn:handleShowOrders,
    cacheTime:1000*60*10, // cache for 10 minutes
    staleTime:1000*60*5, // data is fresh for 5 minutes
  })

  console.log("Orders data in Orders component", orderData);
    const filteredOrders =
  filter === "all"
    ? orderData
    : orderData?.filter(
        (order) => order.order_status === filter
      );







// const BASE_URL = "https://ecommerce-website-egix.onrender.com";
const BASE_URL = "http://localhost:8000";

return (
  <div className="min-h-screen bg-gray-100 p-4 md:p-8">

    <div className="max-w-7xl mx-auto">

      <h1 className="text-3xl font-bold mb-6">
        My Orders
      </h1>

      {/* Filters */}
      <div className="flex gap-3 mb-6 flex-wrap">

        {["all", "pending", "shipped", "delivered", "cancelled"].map(
          (item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-5 py-2 rounded-full font-medium transition
              ${
                filter === item
                  ? "bg-blue-600 text-white"
                  : "bg-white border"
              }`}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          )
        )}
      </div>

      {/* Empty */}
      {filteredOrders?.length === 0 && (
        <div className="bg-white rounded-2xl p-10 text-center">
          <h2 className="text-xl font-semibold">
            No Orders Found
          </h2>
        </div>
      )}

      {/* Orders */}
      <div className="space-y-5">

        {filteredOrders?.map((order) => (
          <div
            key={order.id}
            className="bg-white rounded-2xl shadow-md border p-5 hover:shadow-xl transition"
          >
            <div className="flex flex-col md:flex-row gap-5">

              {/* Image */}
              <div className="w-full md:w-40 h-40 flex-shrink-0">
                <img
                  src={`${BASE_URL}/${order.image_path}`}
                  alt={order.product_name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Details */}
              <div className="flex-1">

                <h2 className="text-xl font-bold text-gray-800">
                  {order.product_name}
                </h2>

                <p className="text-gray-500 mt-2 line-clamp-2">
                  {order.product_description}
                </p>

                <div className="mt-4 flex flex-wrap gap-5 text-sm">

                  <span>
                    Quantity:
                    <strong> {order.quantity}</strong>
                  </span>

                  <span>
                    Payment:
                    <strong className="capitalize">
                      {" "}
                      {order.payment_method}
                    </strong>
                  </span>

                  <span>
                    Payment Status:
                    <strong
                      className={
                        order.payment_status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }
                    >
                      {" "}
                      {order.payment_status}
                    </strong>
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-green-700 mt-4">
                  ₹
                  {Number(
                    order.total_price
                  ).toLocaleString("en-IN")}
                </h3>
              </div>

              {/* Status */}
              <div className="md:w-64">

                <div className="flex items-center gap-2">

                  <div
                    className={`w-3 h-3 rounded-full
                    ${
                      order.order_status === "delivered"
                        ? "bg-green-500"
                        : order.order_status === "shipped"
                        ? "bg-blue-500"
                        : order.order_status === "cancelled"
                        ? "bg-red-500"
                        : "bg-yellow-500"
                    }`}
                  />

                  <span className="font-semibold capitalize">
                    {order.order_status}
                  </span>
                </div>

                <p className="text-gray-500 text-sm mt-2">
                  Ordered on
                </p>

                <p className="font-medium">
                  {new Date(
                    order.created_at
                  ).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </p>

                {order.order_status === "pending" && (
                  <button className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl">
                    Cancel Order
                  </button>
                )}

                <button className="w-full mt-3 border py-2 rounded-xl hover:bg-gray-50">
                  View Details
                </button>

              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
}
