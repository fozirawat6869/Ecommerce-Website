import React from "react";

function AdminHomeLoader() {
  return (
    <div className="bg-gray-100 p-4 animate-pulse">

      {/* Header */}
      <div className="h-10 w-64 mx-auto bg-gray-300 rounded mb-6"></div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        {[1, 2, 3, 4].map((_, i) => (
          <div
            key={i}
            className="bg-white p-5 rounded-xl shadow flex items-center gap-4"
          >
            {/* Icon */}
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>

            {/* Text */}
            <div className="space-y-2">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-6 w-12 bg-gray-300 rounded"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow p-6 mb-8">
        <div className="h-6 w-40 bg-gray-300 rounded mb-4"></div>

        <div className="flex gap-4 flex-wrap">
          <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
          <div className="h-10 w-28 bg-gray-300 rounded-lg"></div>
        </div>
      </div>

    </div>
  );
}

export default AdminHomeLoader;