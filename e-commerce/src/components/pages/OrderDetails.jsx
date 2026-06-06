import React from "react";
import {
  FaBox,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaCheckCircle,
} from "react-icons/fa";

function OrderDetails() {
  const order = {
    id: 101,
    product_name: "GymWar Ankle Support Wrap",
    image:
      "https://images.unsplash.com/photo-1584865288642-42078afe6942?w=500",
    quantity: 2,
    price: 109,
    total_price: 218,
    payment_method: "cod",
    payment_status: "completed",
    order_status: "delivered",
    created_at: "2026-06-07",

    address: {
      name: "Mayur Rawat",
      phone: "8755306869",
      city: "Haridwar",
      state: "Uttarakhand",
      pincode: "249401",
      address:
        "Chwincha Gawn Pauri Subdistrict, Garhwal District Uttarakhand",
    },
  };

  const timeline = [
    "Order Placed",
    "Packed",
    "Shipped",
    "Delivered",
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT SECTION */}
        <div className="lg:col-span-2 space-y-6">
          {/* PRODUCT CARD */}
          <div className="bg-white rounded-xl shadow border p-4">
            <h2 className="text-xl font-semibold mb-4">
              Product Details
            </h2>

            <div className="flex flex-col sm:flex-row gap-4">
              <img
                src={order.image}
                alt=""
                className="w-32 h-32 object-cover rounded-lg border"
              />

              <div className="flex-1">
                <h3 className="text-lg font-semibold">
                  {order.product_name}
                </h3>

                <p className="text-gray-600 mt-2">
                  Quantity : {order.quantity}
                </p>

                <p className="text-gray-600">
                  Price : ₹{order.price}
                </p>

                <p className="text-xl font-bold mt-2">
                  ₹{order.total_price}
                </p>

                <span
                  className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                    order.order_status === "delivered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.order_status}
                </span>
              </div>
            </div>
          </div>

          {/* ORDER TRACKING */}
          <div className="bg-white rounded-xl shadow border p-4">
            <h2 className="text-xl font-semibold mb-6">
              Order Timeline
            </h2>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className="flex gap-4">
                  <FaCheckCircle className="text-green-600 text-xl mt-1" />

                  <div>
                    <p className="font-medium">{item}</p>

                    <p className="text-sm text-gray-500">
                      Jun 07, 2026
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">
          {/* DELIVERY DETAILS */}
          <div className="bg-white rounded-xl shadow border p-4">
            <h2 className="text-xl font-semibold mb-4">
              Delivery Details
            </h2>

            <div className="space-y-4">
              <div className="flex gap-3">
                <FaMapMarkerAlt className="mt-1 text-gray-600" />

                <div>
                  <p className="font-semibold">
                    {order.address.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    {order.address.address}
                  </p>

                  <p className="text-sm text-gray-600">
                    {order.address.city},{" "}
                    {order.address.state} -{" "}
                    {order.address.pincode}
                  </p>

                  <p className="text-sm text-gray-600 mt-1">
                    {order.address.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* PRICE DETAILS */}
          <div className="bg-white rounded-xl shadow border p-4">
            <h2 className="text-xl font-semibold mb-4">
              Price Details
            </h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Price</span>
                <span>₹{order.price}</span>
              </div>

              <div className="flex justify-between">
                <span>Quantity</span>
                <span>{order.quantity}</span>
              </div>

              <div className="flex justify-between">
                <span>Payment</span>
                <span className="capitalize">
                  {order.payment_method}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>

                <span
                  className={`font-medium ${
                    order.payment_status === "completed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
                  {order.payment_status}
                </span>
              </div>

              <hr />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{order.total_price}</span>
              </div>
            </div>
          </div>

          {/* ORDER INFO */}
          <div className="bg-white rounded-xl shadow border p-4">
            <h2 className="text-xl font-semibold mb-4">
              Order Info
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span>#{order.id}</span>
              </div>

              <div className="flex justify-between">
                <span>Date</span>
                <span>{order.created_at}</span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span className="capitalize">
                  {order.order_status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;