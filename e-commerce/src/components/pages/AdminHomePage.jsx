import React from "react";
import { FaBox, FaShoppingCart, FaUsers, FaRupeeSign } from "react-icons/fa";
import { useNavigate ,Link} from "react-router-dom";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../../utils/api";
import AdminLoader from '../../Loaders/ForAdminHomePage'

function AdminHomePage() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

useEffect(() => {
  if (!token) {
    navigate("/login");
  }
}, [token,navigate]);

const handleAllProudcts = async () => {
  try {
    const res = await api.get("/api/totalProducts")
      console.log("products res", res.data.total)
    // await new Promise((resolve)=>setTimeout(resolve,5000))
      return res.data.total || 0
  } catch {
    console.log("error fetching products")
    return 0
  }
}

     const handleAllUsers = async () => {
    try {
      const res = await api.get("/api/allUsers")  
      console.log("users res", res.data.users)
      // await new Promise((resolve)=>setTimeout(resolve,5000))
      return res.data.users || []
    } catch {
      console.log("error fetching users")
      return []
    }
  }

  const handleAllOrders=async ()=>{
         try {
      const res = await api.get("/api/totalOrders",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })  
      console.log("Total orders res", res.data.allOrders)
      // await new Promise((resolve)=>setTimeout(resolve,5000))
      return res.data.allOrders || []
    } catch {
      console.log("error fetching allOrders")
      return []
    }
  }

  const getRevenue = async () => {
  const res = await api.get("/api/totalRevenue",{
      headers:{
          Authorization:`Bearer ${token}`
        }
  });
  return res.data.totalRevenue;
};



  const{data:productCount,isLoading:allProductLoader}=useQuery({
    queryKey:["allProducts"],
    queryFn:handleAllProudcts,
    cacheTime:1000*60*10, // 10 min cache
    staleTime:1000*60*10, // 10 min fresh
  })
   const{data:allUsers,isLoading:allUsersLoader}=useQuery({
    queryKey:["allUsers"],
    queryFn:handleAllUsers,
    cacheTime:1000*60*10, // 10 min cache
    staleTime:1000*60*10, // 10 min fresh
  })

  const {data:allOrders,isLoading:allOrdersLoader}=useQuery({
       queryKey:['allOrders'],
       queryFn:handleAllOrders,
       cacheTime:1000*60*10, // 10 min cache
    staleTime:1000*60*10, // 10 min fresh
  })

  
const { data:totalRevenue,isLoading:allTotalRevenue } = useQuery({
  queryKey: ["revenue"],
  queryFn: getRevenue,
    cacheTime:1000*60*10, // 10 min cache
    staleTime:1000*60*10, // 10 min fresh
});
  

  if(allProductLoader||allOrdersLoader||allUsersLoader||allTotalRevenue){
    return (
     <AdminLoader/>
    )
  }

  console.log("total revenue is : ",totalRevenue)



return (
  <div className="min-h-screen bg-gray-100 p-3 sm:p-4 md:p-6">
    <div className="max-w-7xl mx-auto">

      {/* Header */}
      <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-6 mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-sm sm:text-base text-gray-500 mt-2">
          Manage products, orders and users from one place.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        <Link
          to="/adminAllProducts"
          className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <p className="text-gray-500 text-sm">Total Products</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">
              {productCount ?? 0}
            </h2>
          </div>

          <div className="bg-blue-100 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl">
            <FaBox className="text-blue-600 text-2xl sm:text-3xl lg:text-4xl" />
          </div>
        </Link>

        <Link
          to="/adminAllOrders"
          className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">
              {allOrders?.length || 0}
            </h2>
          </div>

          <div className="bg-green-100 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl">
            <FaShoppingCart className="text-green-600 text-2xl sm:text-3xl lg:text-4xl" />
          </div>
        </Link>

        <Link
          to="/allUsers"
          className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
        >
          <div>
            <p className="text-gray-500 text-sm">Total Users</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">
              {allUsers?.length || 0}
            </h2>
          </div>

          <div className="bg-purple-100 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl">
            <FaUsers className="text-purple-600 text-2xl sm:text-3xl lg:text-4xl" />
          </div>
        </Link>

        <div className="bg-white rounded-2xl p-4 sm:p-5 lg:p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm">Revenue</p>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1">
              ₹{totalRevenue}
            </h2>
          </div>

          <div className="bg-red-100 p-2 sm:p-3 lg:p-4 rounded-xl sm:rounded-2xl">
            <FaRupeeSign className="text-red-600 text-2xl sm:text-3xl lg:text-4xl" />
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-8">

      {/* Quick Actions */}
<div className="bg-white rounded-3xl shadow-sm p-5 sm:p-6">
  <h2 className="text-xl font-semibold mb-6">
    Quick Actions
  </h2>

  <div className="grid grid-cols-2 gap-3">

    <Link
      to="/createProduct"
      className="
      group
      bg-blue-600
      hover:bg-blue-700
      active:scale-95
      text-white
      rounded-xl
      p-3 sm:p-4
      transition-all
      duration-300
      hover:shadow-xl
      hover:-translate-y-1
      flex
      items-center
      justify-center
      gap-2
      "
    >
      <FaBox className="text-lg sm:text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

      <span className="text-sm sm:text-base font-medium">
        Add Product
      </span>
    </Link>

    <Link
      to="/adminAllOrders"
      className="
      group
      bg-green-600
      hover:bg-green-700
      active:scale-95
      text-white
      rounded-xl
      p-3 sm:p-4
      transition-all
      duration-300
      hover:shadow-xl
      hover:-translate-y-1
      flex
      items-center
      justify-center
      gap-2
      "
    >
      <FaShoppingCart className="text-lg sm:text-xl transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110" />

      <span className="text-sm sm:text-base font-medium">
        Orders
      </span>
    </Link>

  </div>
</div>

        {/* Overview */}
        <div className="bg-white rounded-3xl shadow-sm p-5 sm:p-6">
          <h2 className="text-xl font-semibold mb-6">
            Dashboard Overview
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Products</span>
              <span className="font-bold">{productCount ?? 0}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Orders</span>
              <span className="font-bold">{allOrders?.length || 0}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="text-gray-600">Users</span>
              <span className="font-bold">{allUsers?.length || 0}</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-600">Revenue</span>
              <span className="font-bold text-green-600">
                ₹{totalRevenue}
              </span>
            </div>

          </div>
        </div>

      </div>

    </div>
  </div>
);


}

export default AdminHomePage;
