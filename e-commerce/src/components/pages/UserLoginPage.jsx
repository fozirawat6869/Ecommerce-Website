import React, { useState } from 'react'
import api from "../../utils/api";
import { Link, useNavigate } from 'react-router-dom';

function UserLoginPage() {

    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState("");
    const [otp, setOtp] = useState("");
    const [mobileError, setMobileError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [session_id, setSessionId] = useState("");

    const navigate = useNavigate();

    const handleMobileChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 10) {
            setMobile(value);
            setMobileError("");
        } else if (!/^\d*$/.test(value)) {
            setMobileError("Please enter only numbers");
        }
    };

    const handleOtpChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && value.length <= 6) {
            setOtp(value);
            setOtpError("");
        } else if (!/^\d*$/.test(value)) {
            setOtpError("Please enter only numbers");
        }
    };

    const handleGenerateOtp = async (e) => {
        e.preventDefault();

        if (mobile.length !== 10) {
            setMobileError("Please enter a valid 10-digit mobile number");
            return;
        }

        try {
            const res = await api.post(
                "/api/login",
                { mobile },
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data.success) {
                setStep(2);
                setSessionId(res.data.session_id);
            } 
        } catch (error) {
            setMobileError(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleSubmitOtp = async (e) => {
        e.preventDefault();

        if (otp.length !== 6) {
            setOtpError("Please enter a valid 6-digit OTP");
            return;
        }

        try {
            const res = await api.post(
                "/api/verifyOTP",
                { mobile: mobile, otp: otp ,session_id:session_id },
                { headers: { "Content-Type": "application/json" } }
            );

            if (res.data.success) {
                localStorage.setItem('token',res.data.token);   
                navigate('/');
            } else {
                setOtpError("Invalid OTP. Try again.");
                return;
            }

            setStep(1);
            setMobile("");
            setOtp("");

        } catch (error) {
            setOtpError(error.response?.data?.message || "Invalid OTP. Try again.");
        }
    };

    return (
        <div className='bg-gray-100 pt-2 flex items-center justify-center px-4 sm:px-6 md:px-10'>
            
            <div className='bg-white w-full max-w-md sm:max-w-lg md:max-w-xl p-6 sm:p-8 md:p-10 rounded-xl shadow-lg'>
                
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 text-blue-500">
                    User Login
                </h2>

                {step === 1 && (
                    <form onSubmit={handleGenerateOtp}>
                        
                        <label className="block font-medium mb-1 pl-1 sm:pl-2 text-sm sm:text-base">
                            Mobile Number
                        </label>

                        <input
                            type="tel"
                            value={mobile}
                            onChange={handleMobileChange}
                            placeholder="Enter your mobile number"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none mb-1 text-sm sm:text-base
                            ${mobileError 
                              ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"}`}
                            maxLength={10}
                            required
                        />

                        <p className="text-red-500 text-xs sm:text-sm mb-2 h-5">
                            {mobileError ? mobileError : " "}
                        </p>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white font-semibold py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
                        >
                            Generate OTP
                        </button>

                        <Link to={'/register'}>
                            <h1 className='mt-4 sm:mt-5 text-center text-sm sm:text-base hover:text-blue-500 cursor-pointer'>
                                Create an account ?
                            </h1>
                        </Link>
                    </form>
                )}

                {step === 2 && (
                    <form onSubmit={handleSubmitOtp}>
                        
                        <p className="mb-4 text-gray-700 text-sm sm:text-base text-center sm:text-left">
                            Enter OTP sent to <strong>{mobile}</strong>
                        </p>

                        <input
                            type="text"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="Enter OTP"
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none mb-4 text-sm sm:text-base
                            ${otpError 
                              ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"}`}
                            maxLength={6}
                            required
                        />

                        <p className="text-red-500 text-xs sm:text-sm mb-2 h-5">
                            {otpError ? otpError : " "}
                        </p>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 sm:py-3 rounded-lg hover:bg-gray-800 transition text-sm sm:text-base"
                        >
                            Submit
                        </button>

                        <button
                            type="button"
                            className="mt-2 w-full text-xs sm:text-sm text-blue-600 hover:underline"
                            onClick={() => setStep(1)}
                        >
                            Edit mobile number
                        </button>
                    </form>
                )}

            </div>
        </div>
    )
}

export default UserLoginPage;