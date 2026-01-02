import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign } from "react-icons/fa";

function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome, Admin 👋</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaBox className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-gray-500">Total Products</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaShoppingCart className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-gray-500">Total Orders</h2>
            <p className="text-2xl font-bold">340</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaUsers className="text-purple-600 text-3xl" />
          <div>
            <h2 className="text-gray-500">Users</h2>
            <p className="text-2xl font-bold">89</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaRupeeSign className="text-red-600 text-3xl" />
          <div>
            <h2 className="text-gray-500">Revenue</h2>
            <p className="text-2xl font-bold">₹1,30,000</p>
          </div>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
            Add Product
          </button>

          <button className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg">
            View Orders
          </button>

          <button className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg">
            Manage Users
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2 text-left">Order ID</th>
                <th className="py-2 text-left">Customer</th>
                <th className="py-2 text-left">Amount</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-2">#101</td>
                <td className="py-2">Rahul</td>
                <td className="py-2">₹1,299</td>
                <td className="py-2">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Delivered
                  </span>
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-2">#102</td>
                <td className="py-2">Amit</td>
                <td className="py-2">₹899</td>
                <td className="py-2">
                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Pending
                  </span>
                </td>
              </tr>

              <tr>
                <td className="py-2">#103</td>
                <td className="py-2">Neha</td>
                <td className="py-2">₹2,499</td>
                <td className="py-2">
                  <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm">
                    Cancelled
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}

export default AdminHomePage;
