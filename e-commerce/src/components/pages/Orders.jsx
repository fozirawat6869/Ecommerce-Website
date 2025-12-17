import React from "react";

export default function Orders() {
  return (
    <div className=" bg-gray-100 pt-2">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

        {/* Table Header */}
        <div className="grid grid-cols-5 gap-4 text-sm font-medium text-gray-600 border-b pb-2 mb-4">
          <p>Product</p>
          <p>Name</p>
          <p>Price</p>
          <p>Status</p>
          <p className="text-right">Action</p>
        </div>

        {/* Order Row */}
        <div className="grid grid-cols-5 gap-4 items-center border-b py-4">
          <img
            src="https://via.placeholder.com/60"
            alt="product"
            className="w-14 h-14 rounded"
          />
          <p className="font-medium">Wireless Headphones</p>
          <p>₹2,499</p>
          <p className="text-green-600">Delivered</p>
          <button className="text-blue-600 text-sm text-right">View</button>
        </div>

        {/* Order Row */}
        <div className="grid grid-cols-5 gap-4 items-center border-b py-4">
          <img
            src="https://via.placeholder.com/60"
            alt="product"
            className="w-14 h-14 rounded"
          />
          <p className="font-medium">Smart Watch</p>
          <p>₹1,299</p>
          <p className="text-blue-600">Shipped</p>
          <button className="text-blue-600 text-sm text-right">View</button>
        </div>

        {/* Order Row */}
        <div className="grid grid-cols-5 gap-4 items-center py-4">
          <img
            src="https://via.placeholder.com/60"
            alt="product"
            className="w-14 h-14 rounded"
          />
          <p className="font-medium">Phone Cover</p>
          <p>₹799</p>
          <p className="text-yellow-600">Processing</p>
          <button className="text-blue-600 text-sm text-right">View</button>
        </div>
      </div>
    </div>
  );
}
