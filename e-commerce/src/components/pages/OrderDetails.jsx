
import React from "react";
import { useQuery } from "@tanstack/react-query";
import {  useParams,Navigate, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaCreditCard,
  FaBoxOpen,
  FaCheckCircle,
} from "react-icons/fa";
import api,{BASE_URL} from "../../utils/api";


function OrderDetails() {

  const navigate=useNavigate()
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const handleShowOrderDetails = async () => {
    const res = await api.get(`/api/orderDetails/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
console.log(res.data.orderDetails)
    return res.data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["orderDetails", id],
    queryFn: handleShowOrderDetails,
    cacheTime:1000*60*10,
    staleTime:1000*60*10
  });

  if(isLoading){
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] gap-3">  
      <div className="w-10 h-10 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading your order details...</p>
    </div>
  )
}

  if (isError) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-red-500 text-xl">
          Failed to load order details
        </h1>
      </div>
    );
  }

  const order = data?.orderDetails;

  const imageUrl = `${BASE_URL}/${order?.image_path}`;

  const steps = ["pending", "shipped", "delivered"];

  const currentStep = steps.indexOf(order?.order_status);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "shipped":
        return "bg-blue-100 text-blue-700";

      case "delivered":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* PRODUCT */}
            <div className="bg-white rounded-2xl shadow-sm border">
              <div className="p-6">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
                  <FaBoxOpen />
                  Product Details
                </h2>

                <div className="flex flex-col md:flex-row gap-6">
                  
                    <img 
                    onClick={()=>navigate(`/product/${data.orderDetails.product_id}`)}
                    src={imageUrl}
                    alt={order?.product_name}
                    className="w-48 h-48 object-cover rounded-xl border cursor-pointer"
                  />
                 

                  <div className="flex-1">
                    <h1 className="text-2xl font-bold">
                      {order?.product_name}
                    </h1>

                    <p className="text-gray-600 mt-3">
                      {order?.product_description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                        Brand: {order?.product_attributes?.brand}
                      </span>

                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                        RAM: {order?.product_attributes?.ram}
                      </span>

                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-sm">
                        Storage: {order?.product_attributes?.storage}
                      </span>
                    </div>

                    <div className="mt-5">
                      <p className="text-3xl font-bold text-green-600">
                        ₹{Number(order?.total_price).toLocaleString()}
                      </p>

                      <p className="text-gray-500 mt-1">
                        Quantity: {order?.quantity}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3 mt-5">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getStatusColor(
                          order?.order_status
                        )}`}
                      >
                        {order?.order_status}
                      </span>

                      <span
                        className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${getPaymentColor(
                          order?.payment_status
                        )}`}
                      >
                        Payment {order?.payment_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TRACKING */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-8">
                Order Tracking
              </h2>

              {order?.order_status === "cancelled" ? (
                <div className="bg-red-50 border border-red-200 rounded-xl p-5">
                  <h3 className="text-red-600 font-semibold text-lg">
                    ❌ Order Cancelled
                  </h3>

                  <p className="text-red-500 mt-2">
                    This order has been cancelled.
                  </p>
                </div>
              ) : (
                <div>
                  {steps.map((step, index) => (
                    <div
                      key={step}
                      className="flex gap-4 relative pb-10"
                    >
                      {index !== steps.length - 1 && (
                        <div
                          className={`absolute left-4 top-8 w-1 h-16 ${
                            index < currentStep
                              ? "bg-green-500"
                              : "bg-gray-300"
                          }`}
                        />
                      )}

                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                          index <= currentStep
                            ? "bg-green-500 text-white"
                            : "bg-gray-300"
                        }`}
                      >
                        <FaCheckCircle size={14} />
                      </div>

                      <div>
                        <h3 className="font-semibold capitalize">
                          {step}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {index <= currentStep
                            ? "Completed"
                            : "Waiting"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            {/* ADDRESS */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
                <FaMapMarkerAlt />
                Delivery Address
              </h2>

              <h3 className="font-semibold text-lg">
                {order?.full_name}
              </h3>

              <p className="text-gray-600 mt-2">
                {order?.addres}
              </p>

              <p className="text-gray-600">
                {order?.city}, {order?.state}
              </p>

              <p className="text-gray-600">
                {order?.pincode}
              </p>

              <p className="font-medium mt-3">
                {order?.mobile}
              </p>
            </div>

            {/* PRICE */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold mb-5">
                Price Details
              </h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Price</span>
                  <span>
                    ₹{Number(order?.price).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Quantity</span>
                  <span>{order?.quantity}</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>

                  <span className="text-green-600">
                    ₹{Number(order?.total_price).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="bg-white rounded-2xl shadow-sm border p-6">
              <h2 className="text-xl font-bold flex items-center gap-2 mb-5">
                <FaCreditCard />
                Payment Details
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Method</span>
                  <span className="uppercase font-medium">
                    {order?.payment_method}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Status</span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm capitalize ${getPaymentColor(
                      order?.payment_status
                    )}`}
                  >
                    {order?.payment_status}
                  </span>
                </div>
              </div>
            </div>

            {/* ORDER INFO */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-5">
                Order Summary
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Order ID</span>
                  <span>#{order.order_id}</span>
                </div>

                {/* <div className="flex justify-between">
                  <span>Date</span>

                  <span>
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div> */}

                <div className="flex justify-between">
                  <span>Status</span>

                  <span className="capitalize">
                    {order?.order_status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Payment</span>

                  <span className="capitalize">
                    {order?.payment_status}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;