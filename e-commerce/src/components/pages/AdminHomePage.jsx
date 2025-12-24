import React from "react";

function AdminHomePage() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Products</h2>
          <p className="text-2xl font-bold">120</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Total Orders</h2>
          <p className="text-2xl font-bold">340</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Users</h2>
          <p className="text-2xl font-bold">89</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-gray-500">Revenue</h2>
          <p className="text-2xl font-bold">₹1,30,000</p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
            Add Product
          </button>

          <button className="bg-green-600 text-white px-4 py-2 rounded-lg">
            View Orders
          </button>

          <button className="bg-purple-600 text-white px-4 py-2 rounded-lg">
            Manage Users
          </button>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="text-left border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Status</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-b">
              <td className="py-2">#101</td>
              <td className="py-2">Rahul</td>
              <td className="py-2">₹1,299</td>
              <td className="py-2 text-green-600">Delivered</td>
            </tr>

            <tr className="border-b">
              <td className="py-2">#102</td>
              <td className="py-2">Amit</td>
              <td className="py-2">₹899</td>
              <td className="py-2 text-yellow-600">Pending</td>
            </tr>

            <tr>
              <td className="py-2">#103</td>
              <td className="py-2">Neha</td>
              <td className="py-2">₹2,499</td>
              <td className="py-2 text-red-600">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default AdminHomePage;
