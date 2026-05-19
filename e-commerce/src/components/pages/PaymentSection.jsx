
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

function PaymentSection() {

  const navigate = useNavigate();

  const [selected, setSelected] = useState("");

  const token = localStorage.getItem("token");

  // Fetch Address
  const fetchAddress = async () => {
    try {

      const res = await api.get("/api/getAddress", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("api response", res.data);

      return res.data.userAddress || []

    } catch (err) {
      console.log("wrong api", err);
      return [];
    }
  };

  // React Query
  const { data, isLoading } = useQuery({
    queryKey: ["getAddress"],
    queryFn: fetchAddress,
  });

  console.log("data from quer ", data);

  // SAFETY
  const addressData = Array.isArray(data)
    ? data
    : data?.address || data?.data || [];

  // Payment Options
  const paymentOptions = [
    {
      id: "credit",
      title: "Credit Card",
      icon: <FaCreditCard size={26} />,
      available: false,
      message: "Coming Soon",
    },
    {
      id: "debit",
      title: "Debit Card",
      icon: <FaWallet size={26} />,
      available: false,
      message: "Currently Unavailable",
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      icon: <FaMoneyBillWave size={26} />,
      available: true,
      message: "Available",
    },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-semibold">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-gray-100  flex gap-5 items-start justify-center p-2">

      {/* ADDRESS SECTION */}

      {
        addressData.length === 0 ? (

          <div className="bg-white w-[400px] rounded-3xl shadow-xl p-7 border border-gray-200">

            <h2 className="text-2xl font-bold text-gray-800 mb-3">
              No Address Found
            </h2>

            <p className="text-gray-500 leading-7 mb-6">
              Please add your delivery address before placing order.
            </p>

            <button
              onClick={() => navigate("/addAddress")}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-2xl transition-all duration-300"
            >
              Add Address
            </button>
          </div>

        ) : (

          <div className="bg-white rounded-3xl shadow-xl p-6 border border-gray-200 w-[400px]">

            {/* TOP */}

            <div className="flex items-start justify-between gap-4">

              {/* LEFT */}

              <div>

                <p className="text-sm text-gray-500 mb-2">
                  Deliver To:
                </p>

                <h2 className="text-xl font-semibold text-gray-800">
                  {addressData?.[0]?.full_name}
                </h2>

                <p className="text-gray-600 text-sm mt-2 leading-7">

                  {addressData?.[0]?.city},
                  {" "}

                  {addressData?.[0]?.state}

                  {" - "}

                  {addressData?.[0]?.pincode}

                </p>

                <p className="text-gray-700 font-medium mt-3">
                  {addressData?.[0]?.mobile}
                </p>

              </div>

              {/* CHANGE BUTTON */}

              <button
                className="border border-blue-500 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-50 transition"
              >
                Change
              </button>
            </div>

            {/* VERIFIED BOX */}

            <div className="mt-5 bg-green-100 border border-green-200 rounded-2xl p-4 flex items-center justify-between">

              <p className="text-green-700 text-sm">
                Delivery address verified
              </p>

              <button className="text-blue-600 font-medium hover:underline">
                Edit
              </button>

            </div>
          </div>
        )
      }

      {/* PAYMENT SECTION */}

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-7">

        {/* HEADING */}

        <div className="mb-7">

          <h1 className="text-3xl font-bold text-gray-800">
            Payment Method
          </h1>

          <p className="text-gray-500 mt-2">
            Select your preferred payment option
          </p>
        </div>

        {/* PAYMENT OPTIONS */}

        <div className="space-y-4">

          {paymentOptions.map((item) => (

            <div
              key={item.id}

              onClick={() =>
                item.available && setSelected(item.id)
              }

              className={`relative overflow-hidden border-2 rounded-2xl p-5 transition-all duration-300 group

              ${
                selected === item.id
                  ? "border-green-500 bg-green-50 scale-[1.02]"
                  : "border-gray-200 bg-white"
              }

              ${
                item.available
                  ? "hover:shadow-xl hover:border-green-400 cursor-pointer"
                  : "cursor-not-allowed opacity-80 hover:border-red-300"
              }
              `}
            >

              {/* OVERLAY */}

              {!item.available && (

                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">

                  <p className="text-white font-semibold text-lg">
                    Not Available Right Now
                  </p>

                </div>
              )}

              {/* CONTENT */}

              <div className="flex items-center justify-between">

                {/* LEFT */}

                <div className="flex items-center gap-4">

                  {/* ICON */}

                  <div
                    className={`p-4 rounded-2xl

                    ${
                      item.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                    }
                    `}
                  >
                    {item.icon}
                  </div>

                  {/* TEXT */}

                  <div>

                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.title}
                    </h2>

                    <p
                      className={`text-sm mt-1

                      ${
                        item.available
                          ? "text-green-600"
                          : "text-red-500"
                      }
                      `}
                    >
                      {item.message}
                    </p>

                  </div>
                </div>

                {/* RIGHT ICON */}

                <div>

                  {item.available ? (

                    <FaCheckCircle
                      className="text-green-500"
                      size={24}
                    />

                  ) : (

                    <FaTimesCircle
                      className="text-red-400"
                      size={24}
                    />
                  )}

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PLACE ORDER BUTTON */}

        <button
          disabled={
            selected !== "cod" ||
            addressData.length === 0
          }

          className={`w-full mt-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300

          ${
            selected === "cod" &&
            addressData.length > 0

              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-[1.02]"

              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
          `}
        >

          {
            addressData.length === 0

              ? "Add Address First"

              : selected === "cod"

              ? "Place Order"

              : "Select Available Payment Method"
          }

        </button>
      </div>
    </div>
  );
}

export default PaymentSection;