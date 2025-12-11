

import React, { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
     
    const navigate=useNavigate();

    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [otpError, setOtpError] = useState("");

    // Handle mobile input
    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobile(value);
            setMobileError("");
        } else if (!/^\d*$/.test(value)) {
            setMobileError("Please enter only numbers");
        }
    };

    // Handle OTP input
    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
            setOtpError("");
        } else if (!/^\d*$/.test(value)) {
            setOtpError("Please enter only numbers");
        }
    };

    // Generate OTP API

    const handleGenerateOtp = async (e) => {
    e.preventDefault();

    if (mobile.length !== 10) {
        setMobileError("Please enter a valid 10-digit mobile number");
        return;
    }

    try {
        console.log("Sending mobile:", mobile);
        const res = await axios.post(
            "http://localhost:8000/api/register",
            { mobile: mobile },
            { headers: { "Content-Type": "application/json" } }
        );

        console.log("OTP Sent:", res.data);
        setStep(2);

    } catch (error) {
        console.log("Error from backend:", error.response?.data);
        setMobileError(error.response?.data?.message || "Something went wrong");
    }
};

  

    // Submit OTP API
    const handleSubmitOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setOtpError("Please enter a valid 6-digit OTP");
            return;
        }

        try {
            const res = await axios.post("http://localhost:8000/api/verifyOTP", {
                mobile: mobile,
                otp: otp
            });

            console.log("OTP Verification Response:", res.data);

            if (res.data.success) {
               navigate('/')
            } else {
                setOtpError("Invalid OTP. Try again.");
                return;
            }

            // Reset fields
            setStep(1);
            setMobile("");
            setOtp("");

        } catch (error) {
            console.log(error);
            setOtpError("Invalid OTP. Try again.");
        }
    };

    return (
        <>
            <div className='bg-gray-100 px-10 pt-2 '>
                <div className='bg-white p-28 flex justify-center items-center'>
                    <div className="bg-white outline-5 outline-gray-100 p-6 w-120 h-80 rounded-xl shadow-lg ">

                        <h2 className="text-2xl font-bold text-center mb-6 text-blue-500 font-bold">User Register</h2>

                        {/* Step 1 */}
                        {step === 1 && (
                            <form onSubmit={handleGenerateOtp}>
                                <label className="block font-medium mb-1 pl-2">Mobile Number</label>
                                <input
                                    type="tel"
                                    value={mobile}
                                    onChange={handleMobileChange}
                                    placeholder="Enter your mobile number"
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none mb-1 focus:ring-1
                                    ${mobileError ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`}
                                    maxLength={10}
                                    required
                                />

                                <p className="text-red-500 pt-[0.5px] text-sm mb-2 h-5">
                                    {mobileError ? mobileError : " "}
                                </p>

                                <button
                                    type="submit"
                                    className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Generate OTP
                                </button>

                                <Link to={'/login'} className='flex justify-center items-center'>
                                    <h1 className='mt-5 text-center text-[16px]   hover:text-blue-500 cursor-pointer'>
                                        Existing user ? Login
                                    </h1>
                                </Link>
                            </form>
                        )}

                        {/* Step 2 */}
                        {step === 2 && (
                            <form onSubmit={handleSubmitOtp}>
                                <p className="mb-4 text-gray-700">
                                    Enter OTP sent to <strong>{mobile}</strong>
                                </p>

                                <input
                                    type="text"
                                    value={otp}
                                    onChange={handleOtpChange}
                                    placeholder="Enter OTP"
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none mb-4
                                    ${otpError ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
                                    maxLength={6}
                                    required
                                />

                                <p className="text-red-500 text-sm mb-2 h-5">{otpError ? otpError : " "}</p>

                                <button
                                    type="submit"
                                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Submit
                                </button>

                                <button
                                    type="button"
                                    className="mt-2 w-full text-sm text-blue-600 hover:underline"
                                    onClick={() => setStep(1)}
                                >
                                    Edit mobile number
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;
