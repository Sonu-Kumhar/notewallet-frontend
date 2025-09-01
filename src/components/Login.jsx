import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import BASE_URL from "../config";

const Login = () => {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [error, setError] = useState("");
    const [loginVerified, setLoginVerified] = useState(false);
    const [showOtp, setShowOtp] = useState(false);
    const [keepLoggedIn, setKeepLoggedIn] = useState(false);

    // Resend OTP timer
    const [timer, setTimer] = useState(0);

    const navigate = useNavigate();

    // Countdown effect
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    // Send OTP
    const handleSendOtp = async () => {
        setError("");
        if (!email) {
            setError("Please enter your email!");
            return;
        }
        try {
            await axios.post(`${BASE_URL}/login/send-otp`, { email });
            setOtpSent(true);
            setOtp("");
            setTimer(30); // 30s timer for resend
            toast.success("OTP sent to your email!");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to send OTP");
        }
    };

    // Verify OTP
    const handleVerifyOtp = async () => {
        setError("");
        if (!otp) {
            setError("Please enter OTP!");
            return;
        }
        try {
            const res = await axios.post(`${BASE_URL}/login/verify-otp`, {
                email,
                otp,
            });

            // Store token based on "keep me logged in"
            if (keepLoggedIn) {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("userEmail", email);
            } else {
                sessionStorage.setItem("token", res.data.token);
                sessionStorage.setItem("userEmail", email);
            }

            setLoginVerified(true);
            toast.success("Login successful!");
            setTimeout(() => navigate("/dashboard"), 1500);
        } catch (err) {
            setError(err.response?.data?.message || "Invalid OTP");
        }
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white">
            {/* Left Section */}
            <div className="flex-1 flex flex-col h-screen p-6 md:p-12 mt-20 md:mt-0">
                {/* Logo */}
                <div className="flex justify-center md:justify-start mb-8">
                    <svg width="343" height="32" viewBox="0 0 343 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M152.142 0.843087L148.985 0L146.325 9.89565L143.923 0.961791L140.766 1.80488L143.361 11.4573L136.897 5.01518L134.585 7.31854L141.676 14.3848L132.846 12.0269L132 15.1733L141.648 17.7496C141.537 17.2748 141.479 16.7801 141.479 16.2717C141.479 12.6737 144.406 9.75685 148.016 9.75685C151.626 9.75685 154.553 12.6737 154.553 16.2717C154.553 16.7768 154.495 17.2685 154.386 17.7405L163.154 20.0818L164 16.9354L154.314 14.3489L163.144 11.9908L162.298 8.84437L152.613 11.4308L159.077 4.98873L156.766 2.68538L149.774 9.65357L152.142 0.843087Z" fill="#367AFF" />
                        <path d="M154.378 17.7771C154.107 18.9176 153.535 19.9421 152.751 20.763L159.103 27.0935L161.415 24.7901L154.378 17.7771Z" fill="#367AFF" />
                        <path d="M152.687 20.8292C151.894 21.637 150.891 22.2398 149.766 22.5504L152.077 31.1472L155.235 30.3041L152.687 20.8292Z" fill="#367AFF" />
                        <path d="M149.648 22.5819C149.126 22.7156 148.579 22.7866 148.016 22.7866C147.412 22.7866 146.827 22.705 146.272 22.5523L143.959 31.1569L147.116 32L149.648 22.5819Z" fill="#367AFF" />
                        <path d="M146.161 22.5205C145.053 22.1945 144.068 21.584 143.291 20.7739L136.923 27.1199L139.234 29.4233L146.161 22.5205Z" fill="#367AFF" />
                        <path d="M143.238 20.7178C142.474 19.9026 141.917 18.8917 141.652 17.7688L132.856 20.1179L133.702 23.2643L143.238 20.7178Z" fill="#367AFF" />
                        <path d="M178.077 25V7.54544H181.239V14.9346H189.327V7.54544H192.497V25H189.327V17.5852H181.239V25H178.077ZM200.891 25H194.976V7.54544H201.01C202.743 7.54544 204.232 7.89487 205.476 8.59374C206.726 9.28692 207.686 10.2841 208.357 11.5852C209.027 12.8864 209.362 14.4432 209.362 16.2557C209.362 18.0739 209.024 19.6364 208.348 20.9432C207.678 22.25 206.709 23.2528 205.442 23.9517C204.181 24.6506 202.663 25 200.891 25ZM198.138 22.2642H200.737C201.953 22.2642 202.967 22.0426 203.78 21.5994C204.592 21.1506 205.203 20.4829 205.612 19.5966C206.021 18.7045 206.226 17.5909 206.226 16.2557C206.226 14.9204 206.021 13.8125 205.612 12.9318C205.203 12.0454 204.598 11.3835 203.797 10.946C203.002 10.5028 202.013 10.2812 200.831 10.2812H198.138V22.2642Z" fill="#232323" />
                    </svg>
                </div>

                {/* Form */}
                <div className="flex-1 flex  justify-center mt-20">
                    <div className="w-full max-w-xl flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-2">Sign in</h2>
                        <p className="text-gray-500 mb-6">
                            Please login to continue to your account
                        </p>

                        {error && (
                            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                                {error}
                            </div>
                        )}

                        {!loginVerified && (
                            <div className="space-y-4">
                                {/* Email Input */}
                                <div className="relative w-full">
                                    <label className="absolute -top-2 left-3 bg-white px-1 text-sm text-gray-500">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        disabled={otpSent}
                                    />
                                </div>


                                {/* OTP Input */}
                                {otpSent && (
                                    <div>
                                        <div className="relative">
                                            <input
                                                type={showOtp ? "text" : "password"}
                                                placeholder="Enter OTP"
                                                value={otp}
                                                onChange={(e) => setOtp(e.target.value)}
                                                className="w-full px-4 py-2 border rounded-lg pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                required
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowOtp(!showOtp)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                            >
                                                {showOtp ? <IoIosEye size={22} /> : <IoIosEyeOff size={22} />}
                                            </button>
                                        </div>

                                        <p className="mt-2 text-sm text-gray-500">
                                            Didn’t get OTP? Check your <span className="font-medium">spam folder</span>.
                                        </p>

                                        {/* Keep me logged in */}
                                        <div className="flex items-center mt-3">
                                            <input
                                                id="keepLoggedIn"
                                                type="checkbox"
                                                checked={keepLoggedIn}
                                                onChange={() => setKeepLoggedIn(!keepLoggedIn)}
                                                className="mr-2"
                                            />
                                            <label htmlFor="keepLoggedIn" className="text-sm text-gray-600">
                                                Keep me logged in
                                            </label>
                                        </div>

                                        {/* Login Button */}
                                        <button
                                            type="button"
                                            onClick={handleVerifyOtp}
                                            className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                        >
                                            Login
                                        </button>

                                        {/* Resend OTP */}
                                        <div className="text-center mt-3">
                                            {timer > 0 ? (
                                                <p className="text-sm text-gray-500">
                                                    Resend OTP in <b>{timer}s</b>
                                                </p>
                                            ) : (
                                                <button
                                                    type="button"
                                                    onClick={handleSendOtp}
                                                    className="text-sm text-blue-600 hover:underline"
                                                >
                                                    Resend OTP
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Send OTP Button */}
                                {!otpSent && (
                                    <button
                                        type="button"
                                        onClick={handleSendOtp}
                                        className="btn w-full bg-blue-600 text-white hover:text-white py-2 rounded-lg hover:bg-blue-700 transition"
                                    >
                                        Get OTP
                                    </button>
                                )}
                            </div>
                        )}

                        {/* Register Redirect */}
                        <p className="text-center text-gray-600 mt-6">
                            Need an account?{" "}
                            <Link
                                to="/register"
                                className="text-blue-600 font-medium hover:underline"
                            >
                                Create an account
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section (Image) */}
            <div className="hidden md:flex flex-1 h-screen p-6">
                <div className="w-full h-full rounded-2xl overflow-hidden">
                    <img
                        src="/windows.png"
                        alt="Decorative"
                        className="w-full h-full object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
