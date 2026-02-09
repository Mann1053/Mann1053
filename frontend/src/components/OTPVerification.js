"use client";
import React, { useState, useRef, useEffect } from "react";
import { Mail, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import useApi from "./../hooks/useApi";
import { showToast } from "@/utils/common";
import { useDispatch } from "react-redux";
import { userLogin } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";

export default function OTPVerification({ email, onBack, onResendOTP }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const { callApi, loading } = useApi();
  const [resendLoading, setResendLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [verifying, setVerifying] = useState(false);
  const [clientIp, setClientIp] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: email,
    },
  });

  // Auto-focus first input on mount and fetch IP
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    fetch("https://api.ipify.org?format=json")
      .then((res) => res.json())
      .then((data) => setClientIp(data.ip))
      .catch(() => setClientIp(""));
  }, []);

  // Resend timer countdown
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const handleOtpChange = (index, value) => {
    // Only allow numeric input
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Take only last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace to go to previous input
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);

    // Only process if pasted data is numeric
    if (!/^\d+$/.test(pastedData)) {
      showToast("Please paste only numeric values", "error");
      return;
    }

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length && i < 6; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;

    setResendLoading(true);
    try {
      const result = await onResendOTP();
      if (result?.error) {
        showToast(result.error, "error");
      } else {
        showToast("OTP resent successfully", "success");
        setResendTimer(60); // 60 seconds countdown
        setOtp(["", "", "", "", "", ""]); // Clear OTP inputs
        inputRefs.current[0]?.focus();
      }
    } catch (err) {
      showToast("Failed to resend OTP", "error");
    } finally {
      setResendLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const otpValue = otp.join("");

    // Validate OTP
    if (otpValue.length !== 6) {
      showToast("Please enter a 6-digit OTP", "error");
      return;
    }

    if (!/^\d{6}$/.test(otpValue)) {
      showToast("OTP must contain only numbers", "error");
      return;
    }

    const body = {
      email: email,
      otp: otpValue,
      ip: clientIp,
    };

    try {
      const result = await callApi("post", "/verify-otp", body);

      if (result?.error) {
        showToast(result.error, "error");
        // Clear OTP on error
        setOtp(["", "", "", "", "", ""]);
        inputRefs.current[0]?.focus();
      } else if (result?.token) {
        setVerifying(true);

        // Store authentication data
        localStorage.setItem("token", result.token);

        // Store user data if available
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
        }

        // Store permissions if available
        if (result.permissions) {
          localStorage.setItem(
            "permissions",
            JSON.stringify(result.permissions)
          );
        }

        // Update Redux store
        dispatch(userLogin(result));

        showToast("Login successful!", "success");

        // Redirect to dashboard
        router.push("/my-admin/dashboard");
      }
    } catch (err) {
      console.error("Error verifying OTP:", err);
      showToast("Failed to verify OTP", "error");
    }
  };

  if (verifying) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
              <svg
                className="animate-spin h-8 w-8 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
              Verification Successful
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
              Redirecting to dashboard...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
            <Mail className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
            Verify OTP
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            Enter the 6-digit code sent to
          </p>
          <p className="text-blue-600 dark:text-blue-400 font-medium mt-1">
            {email}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field (Read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
            </label>
            <input
              type="email"
              className="w-full h-12 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-4 cursor-not-allowed"
              value={email}
              readOnly
              {...register("email")}
            />
          </div>

          {/* OTP Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 text-center">
              Enter OTP
            </label>
            <div className="flex gap-2 sm:gap-3 justify-center">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-12 h-14 sm:w-14 sm:h-16 text-center text-2xl font-bold rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                />
              ))}
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2">
              Paste your 6-digit OTP or enter it manually
            </p>
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            <button
              type="button"
              onClick={handleResendOTP}
              disabled={resendLoading || resendTimer > 0}
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center gap-2"
            >
              {resendLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : resendTimer > 0 ? (
                <span>Resend OTP in {resendTimer}s</span>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  <span>Resend OTP</span>
                </>
              )}
            </button>
          </div>

          {/* Verify Button */}
          <button
            type="submit"
            disabled={loading || otp.some((digit) => !digit)}
            className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                <span>Verifying...</span>
              </>
            ) : (
              "Verify OTP"
            )}
          </button>

          {/* Back to Login */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={onBack}
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
