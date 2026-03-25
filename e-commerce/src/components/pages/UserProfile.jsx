

import React from "react";
import { CgProfile } from "react-icons/cg";

function UserProfile() {
  return (
    <div className="bg-gray-100 flex justify-center items-start pt-3">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-md p-6">

        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4 flex  justify-center items-center">
          <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
            <CgProfile className="text-4xl text-blue-500" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-800">
              User Profile
            </h2>
            <p className="text-sm text-gray-500">
              Manage your account details
            </p>
          </div>
        </div>

        {/* Personal Information */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Personal Information</h3>
            <button className="text-blue-600 text-sm">Cancel</button>
          </div>

          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm text-gray-600">First Name</label>
              <input
                value="Mayur"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm text-gray-600">Last Name</label>
              <input
                value="Rawat"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button className="bg-blue-600 text-white px-8 py-2 rounded">
              SAVE
            </button>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Contact Information</h3>
            <button className="text-blue-600 text-sm">Cancel</button>
          </div>

          {/* Email Row */}
          <div className="flex gap-4 items-end mb-4">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Email</label>
              <input
                value="example@email.com"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button className="bg-blue-600 text-white px-8 py-2 rounded">
              SAVE
            </button>
          </div>

          {/* Mobile Row */}
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm text-gray-600">Mobile Number</label>
              <input
                value="+91 XXXXX XXXXX"
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <button className="bg-blue-600 text-white px-8 py-2 rounded">
              SAVE
            </button>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50">
            Orders
          </button>

          <button className="border border-red-500 text-red-500 px-6 py-2 rounded-lg hover:bg-red-50">
            Logout
          </button>
        </div>

      </div>
    </div>
  );
}

export default UserProfile;
