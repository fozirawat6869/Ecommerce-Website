import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign } from "react-icons/fa";
import { useNavigate ,Link} from "react-router-dom";
import { useEffect } from "react";

function AdminHomePage() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

useEffect(() => {
  if (!token) {
    navigate("/login");
  }
}, [token,navigate]);

  return (
    <div className=" bg-gray-100 p-4">

      {/* Header */}
      
        <h1 className="text-3xl font-bold text-center mb-5 text-green-500">Admin Dashboard</h1>
      

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <Link to={"/adminAllProducts"} className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaBox className="text-blue-600 text-3xl" />
          <div>
            <h2 className="text-gray-500">Total Products</h2>
            <p className="text-2xl font-bold">120</p>
          </div>
        </Link>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaShoppingCart className="text-green-600 text-3xl" />
          <div>
            <h2 className="text-gray-500">Total Orders</h2>
            <p className="text-2xl font-bold">340</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow flex items-center gap-4">
          <FaUsers className="text-purple-600 text-4xl" />
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

    

    </div>
  );
}

export default AdminHomePage;
