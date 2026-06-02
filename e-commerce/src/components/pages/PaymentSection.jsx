

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import {
  FaCreditCard,
  FaWallet,
  FaMoneyBillWave,
  FaCheckCircle,
  FaTimesCircle,
  FaStar,
} from "react-icons/fa";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import api from "../../utils/api";
import FroPaymentCompo from "../../Loaders/ForPaymentCompo";

const BASE_URL = "https://ecommerce-website-egix.onrender.com";

function PaymentSection() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const token = localStorage.getItem("token");

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState(
    parseInt(searchParams.get("quantity")) || 1
  );

  const handleFetchPaymentProductDetails = async () => {
    try {
      const res = await api.get(`/api/paymentProductDetails/${id}`);
      return res.data.product || null;
    } catch (err) {
      console.log("Error fetching payment product details:", err);
      return null;
    }
  };

  const { data: productDetailsForPaymentSection } = useQuery({
    queryKey: ["paymentProductDetails", id],
    queryFn: handleFetchPaymentProductDetails,
  });

  const fetchAddress = async () => {
    try {
      const res = await api.get("/api/getAddress", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data.userAddress || [];
    } catch (err) {
      console.log("wrong api", err);
      return [];
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ["getAddress"],
    queryFn: fetchAddress,
  });

  const addressData = Array.isArray(data)
    ? data
    : data?.address || data?.data || [];

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

  const handlePlaceOrder = async () => {
    setShowPopup(true);
    setTimeout(() => navigate("/"), 2000);
  };

  if (isLoading) return <FroPaymentCompo />;

  const product = productDetailsForPaymentSection;
  const totalPrice = product
    ? (parseFloat(product.product_price) * quantity).toLocaleString("en-IN")
    : null;

  return (
    <>
      {showPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-2xl text-center">
            <h1 className="text-2xl font-bold text-green-600">
              🎉 Order Placed Successfully
            </h1>
            <p className="text-gray-600 mt-2">Your order has been confirmed</p>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-yellow-400 text-white px-5 py-2 rounded-lg"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-100 flex flex-col lg:flex-row gap-4 lg:gap-5 items-center lg:items-stretch justify-center p-2">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4 w-full max-w-sm sm:max-w-md">

          {/* ADDRESS */}
          {addressData.length === 0 ? (
            <div className="bg-white w-full rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-7 border border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 sm:mb-3">
                No Address Found
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-6 sm:leading-7 mb-4 sm:mb-6">
                Please add your delivery address before placing order.
              </p>
              <button
                onClick={() => navigate("/addAddress")}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 sm:py-3 rounded-xl sm:rounded-2xl transition"
              >
                Add Address
              </button>
            </div>
          ) : (
            <div className="bg-white w-full rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-6 border border-gray-200">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs sm:text-sm font-bold text-gray-500 mb-2">
                    Deliver To :
                  </p>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {addressData?.[0]?.full_name}
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mt-2 leading-5 sm:leading-7">
                    {addressData?.[0]?.city},{" "}
                    {addressData?.[0]?.state} - {addressData?.[0]?.pincode}
                  </p>
                  <p className="text-sm text-gray-700 font-medium mt-3">
                    {addressData?.[0]?.mobile}
                  </p>
                </div>
              </div>
              <div className="mt-4 sm:mt-5 bg-green-100 border border-green-200 rounded-xl sm:rounded-2xl p-3 sm:p-4 flex items-center justify-between">
                <p className="text-green-700 text-xs sm:text-sm">
                  Delivery address verified
                </p>
                <button className="text-blue-600 font-medium hover:underline text-xs sm:text-sm">
                  Edit
                </button>
              </div>
            </div>
          )}

          {/* PRODUCT CARD */}
          {product && (
            <div className="bg-white w-full rounded-2xl sm:rounded-3xl shadow-xl border border-gray-200 overflow-hidden flex-1">
              {/* ✅ taller image */}
      <div className="w-full h-56 sm:h-64 bg-gray-50">
  <img
    src={`${BASE_URL}/${product.image}`}
    alt={product.product_name}
    className="w-full h-full object-cover"
    onError={(e) => {
      e.target.style.display = "none";
    }}
  />
</div>

              <div className="p-4 sm:p-5">
                <h2 className="text-base sm:text-lg font-bold text-gray-900">
                  {product.product_name}
                </h2>

                <div className="flex items-center gap-1 mt-1.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={12}
                      className={
                        i < Math.round(parseFloat(product.avg_rating))
                          ? "text-yellow-400"
                          : "text-gray-200"
                      }
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">
                    {product.avg_rating}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-2 leading-relaxed line-clamp-2">
                  {product.product_description}
                </p>

                {product.product_attributes && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {Object.entries(product.product_attributes).map(
                      ([key, value]) => (
                        <span
                          key={key}
                          className="bg-blue-50 text-blue-700 text-xs font-medium px-2.5 py-0.5 rounded-full border border-blue-100"
                        >
                          {key}: {value}
                        </span>
                      )
                    )}
                  </div>
                )}

                <p className="text-lg sm:text-xl font-extrabold text-gray-900 mt-3">
                  ₹{parseFloat(product.product_price).toLocaleString("en-IN")}
                </p>

                <div className="flex items-center gap-3 mt-3">
                  <span className="text-sm text-gray-600 font-medium">Qty:</span>
                  <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-red-50 hover:text-red-600 text-gray-700 text-lg font-bold transition"
                    >
                      −
                    </button>
                    <span className="w-9 text-center text-sm font-semibold text-gray-800">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity((q) =>
                          Math.min(product.product_quantity, q + 1)
                        )
                      }
                      className="w-8 h-8 flex items-center justify-center bg-gray-50 hover:bg-green-50 hover:text-green-600 text-gray-700 text-lg font-bold transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* ✅ PAYMENT — lg:self-stretch makes it equal height to left col */}
        <div className="w-full max-w-sm sm:max-w-md lg:max-w-3xl lg:flex-1 bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-7 flex flex-col lg:self-stretch">

          <div className="mb-5 sm:mb-7">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Payment Method
            </h1>
            <p className="text-sm sm:text-base text-gray-500 mt-2">
              Select your preferred payment option
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {paymentOptions.map((item) => (
              <div
                key={item.id}
                onClick={() => item.available && setSelected(item.id)}
                className={`relative overflow-hidden border-2 rounded-xl sm:rounded-2xl p-3 sm:p-5 transition-all duration-300 group
                  ${selected === item.id
                    ? "border-green-500 bg-green-50 scale-[1.02]"
                    : "border-gray-200 bg-white"
                  }
                  ${item.available
                    ? "hover:shadow-xl hover:border-green-400 cursor-pointer"
                    : "cursor-not-allowed opacity-80 hover:border-red-300"
                  }
                `}
              >
                {!item.available && (
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                    <p className="text-white font-semibold text-sm sm:text-lg">
                      Not Available Right Now
                    </p>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-2 sm:p-4 rounded-xl
                      ${item.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-500"
                      }`}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h2 className="text-sm sm:text-lg font-semibold text-gray-800">
                        {item.title}
                      </h2>
                      <p className={`text-xs sm:text-sm mt-1
                        ${item.available ? "text-green-600" : "text-red-500"}`}
                      >
                        {item.message}
                      </p>
                    </div>
                  </div>
                  <div>
                    {item.available ? (
                      <FaCheckCircle className="text-green-500" size={20} />
                    ) : (
                      <FaTimesCircle className="text-red-400" size={20} />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ ORDER SUMMARY — appears only after payment method selected */}
          {selected && product && (
            <div className="mt-6 rounded-2xl border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Order Summary
                </h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Product</span>
                  <span className="font-medium text-gray-800 text-right max-w-[60%] truncate">
                    {product.product_name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Price</span>
                  <span className="font-medium text-gray-800">
                    ₹{parseFloat(product.product_price).toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Quantity</span>
                  <span className="font-medium text-gray-800">{quantity}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Delivery</span>
                  <span className="font-medium text-green-600">FREE</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Payment</span>
                  <span className="font-medium text-gray-800 capitalize">
                    {paymentOptions.find((p) => p.id === selected)?.title}
                  </span>
                </div>
                <div className="pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
                  <span className="text-base font-bold text-gray-800">
                    Total Amount
                  </span>
                  <span className="text-xl font-extrabold text-green-700">
                    ₹{totalPrice}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* push button to bottom */}
          <div className="flex-1" />

          <button
            onClick={handlePlaceOrder}
            disabled={selected !== "cod" || addressData.length === 0}
            className={`w-full mt-6 sm:mt-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-lg font-semibold transition
              ${selected === "cod" && addressData.length > 0
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {addressData.length === 0
              ? "Add Address First"
              : selected === "cod"
              ? "Place Order"
              : "Select Payment Method"}
          </button>

        </div>
      </div>
    </>
  );
}

export default PaymentSection;








