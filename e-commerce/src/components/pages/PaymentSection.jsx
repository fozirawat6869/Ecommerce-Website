

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import api from "../../utils/api";

function PaymentSection() {
     
    const token=localStorage.getItem('token')
    console.log("token",token)

    const fetchAddress=async()=>{
      try{
           const res=await api.get('/api/getAddress',{
               headers:{
                Authorization:`Bearer ${token}`
               }
           })
         return res || []

      }catch(err){
        console.log("wrong api", err)
      }
    }

    const {data}=useQuery({
        queryKey:['getAddress'],
        queryFn:fetchAddress,
         
    })
    console.log(data)

  const [selected, setSelected] = useState("");

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

  return (
    <div className=" bg-gray-100 flex gap-5 items-center justify-center p-2">

             <div className="bg-white rounded-2xl shadow-md p-5 mb-6 border border-gray-200">

  {/* Top */}
  <div className="flex items-start justify-between gap-4">

    {/* Left */}
    <div>
      <p className="text-sm text-gray-500 mb-2">
        Deliver To:
      </p>

      <h2 className="text-lg font-semibold text-gray-800">
        Mayur Rawat
      </h2>

      <p className="text-gray-600 text-sm mt-1 leading-6">
        Chwincha Gawn, Pauri Garhwal, Uttarakhand - 246001
      </p>

      <p className="text-gray-700 font-medium mt-2">
        8755306869
      </p>
    </div>

    {/* Button */}
    <button className="border border-blue-500 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
      Change
    </button>
  </div>

  {/* Warning Box */}
  <div className="mt-5 bg-orange-100 border border-orange-200 rounded-xl p-4 flex items-center justify-between">

    <p className="text-orange-700 text-sm">
      Incomplete address details for delivery
    </p>

    <button className="text-blue-600 font-medium hover:underline">
      Edit Details
    </button>
  </div>
</div>
        
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-7">

   

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-3xl font-bold text-gray-800">
            Payment Method
          </h1>

          <p className="text-gray-500 mt-2">
            Select your preferred payment option
          </p>
        </div>

        {/* Payment Options */}
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
              {/* Overlay */}
              {!item.available && (
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <p className="text-white font-semibold text-lg">
                    Not Available Right Now
                  </p>
                </div>
              )}

              {/* Content */}
              <div className="flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                  {/* Icon */}
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

                  {/* Text */}
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

                {/* Right Status Icon */}
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

        {/* Button */}
        <button
          disabled={selected !== "cod"}
          className={`w-full mt-8 py-4 rounded-2xl text-lg font-semibold transition-all duration-300

          ${
            selected === "cod"
              ? "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:scale-[1.02]"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }
          `}
        >
          {selected === "cod"
            ? "Place Order"
            : "Select Available Payment Method"}
        </button>
      </div>
    </div>
  );
}

export default PaymentSection;

