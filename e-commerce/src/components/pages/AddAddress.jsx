

import React, { useState } from "react";
import api from "../../utils/api";

function AddAddress() {

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const [formData, setFormData] = useState({
    full_name: "",
    mobile: "",
    pincode: "",
    state: "",
    city: "",
    addres: "",
  });

  const [errors, setErrors] = useState({});

  // Handle Change

  const handleChange = (e) => {

    const { name, value } = e.target;

    // Only numbers allowed for mobile & pincode

    if (
      (name === "mobile" || name === "pincode") &&
      !/^\d*$/.test(value)
    ) {
      return;
    }

    // Mobile max 10 digits

    if (name === "mobile" && value.length > 10) {
      return;
    }

    // Pincode max 6 digits

    if (name === "pincode" && value.length > 6) {
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });

    // Remove error while typing

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  // Handle Submit

  const handleSubmit = async (e) => {

    e.preventDefault();

    const newErrors = {};

    const validateFields = {
      full_name: "Full name is required",
      mobile: "Mobile number is required",
      addres: "Address is required",
      city: "City is required",
      state: "Please select state",
      pincode: "Pincode is required",
    };

    // Dynamic Validation

    Object.entries(validateFields).forEach(
      ([key, message]) => {

        if (!formData[key].trim()) {
          newErrors[key] = message;
        }
      }
    );

    // Mobile Validation

    if (
      formData.mobile &&
      formData.mobile.length !== 10
    ) {
      newErrors.mobile =
        "Mobile number must be 10 digits";
    }

    // Pincode Validation

    if (
      formData.pincode &&
      formData.pincode.length !== 6
    ) {
      newErrors.pincode =
        "Pincode must be 6 digits";
    }

    setErrors(newErrors);

    // Stop Submit

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {

      const token = localStorage.getItem("token");

      const res = await api.post(
        "/api/addAddress",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      alert("Address Added Successfully");

      // Reset Form

      setFormData({
        full_name: "",
        mobile: "",
        pincode: "",
        state: "",
        city: "",
        addres: "",
      });

    } catch (err) {

      console.log(err);

      alert("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">

      <div className="w-full max-w-2xl bg-white p-8 rounded-3xl shadow-2xl">

        {/* Heading */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-gray-800">
            Add Delivery Address
          </h1>

          <p className="text-gray-500 mt-2">
            Please enter your delivery details
          </p>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Full Name */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>

            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="Enter full name"
              className={`w-full border rounded-2xl px-4 py-3 outline-none

              ${
                errors.full_name
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }
              `}
            />

            {
              errors.full_name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.full_name}
                </p>
              )
            }
          </div>

          {/* Mobile */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Mobile Number
            </label>

            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="Enter mobile number"
              className={`w-full border rounded-2xl px-4 py-3 outline-none

              ${
                errors.mobile
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }
              `}
            />

            {
              errors.mobile && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.mobile}
                </p>
              )
            }
          </div>

          {/* Address */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>

            <textarea
              rows="4"
              name="addres"
              value={formData.addres}
              onChange={handleChange}
              placeholder="House no, street, area..."
              className={`w-full border rounded-2xl px-4 py-3 outline-none resize-none

              ${
                errors.addres
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }
              `}
            ></textarea>

            {
              errors.addres && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.addres}
                </p>
              )
            }
          </div>

          {/* City & State */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* City */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter city"
                className={`w-full border rounded-2xl px-4 py-3 outline-none

                ${
                  errors.city
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }
                `}
              />

              {
                errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city}
                  </p>
                )
              }
            </div>

            {/* State */}

            <div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`w-full border rounded-2xl px-4 py-3 outline-none

                ${
                  errors.state
                    ? "border-red-500"
                    : "border-gray-300 focus:border-blue-500"
                }
                `}
              >

                <option value="">
                  Select State
                </option>

                {
                  indianStates.map((stateName) => (

                    <option
                      key={stateName}
                      value={stateName}
                    >
                      {stateName}
                    </option>
                  ))
                }

              </select>

              {
                errors.state && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.state}
                  </p>
                )
              }
            </div>
          </div>

          {/* Pincode */}

          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pincode
            </label>

            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              placeholder="Enter pincode"
              className={`w-full border rounded-2xl px-4 py-3 outline-none

              ${
                errors.pincode
                  ? "border-red-500"
                  : "border-gray-300 focus:border-blue-500"
              }
              `}
            />

            {
              errors.pincode && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.pincode}
                </p>
              )
            }
          </div>

          {/* Buttons */}

          <div className="flex gap-4 pt-4">

            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Save Address
            </button>

            <button
              type="button"
              className="flex-1 border border-gray-300 hover:bg-gray-100 py-3 rounded-2xl font-semibold transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAddress;