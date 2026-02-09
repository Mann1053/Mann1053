"use client";
import React, { useEffect, useState } from "react";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import useApi from "./../hooks/useApi";
import { ToastContainer } from "react-toastify";
import { showToast } from "@/utils/common";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "@/store/slices/userSlice";
import { useRouter } from "next/navigation";
import { getLoginUserData } from "@/utils/selector";
import OTPVerification from "./OTPVerification";
// Point-and-click captcha component
const SimpleCaptcha = ({ onSuccess, onRefresh }) => {
  const [targetItems, setTargetItems] = useState([]);
  const [clickedItems, setClickedItems] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [instruction, setInstruction] = useState("");

  const generateRandomChallenge = () => {
    const challenges = [
      {
        target: "car",
        instruction: "Click all the cars",
        items: [
          { type: "car", emoji: "🚗" },
          { type: "car", emoji: "🚙" },
          { type: "car", emoji: "🚕" },
          { type: "tree", emoji: "🌳" },
          { type: "house", emoji: "🏠" },
          { type: "flower", emoji: "🌸" },
        ],
      },
      {
        target: "animal",
        instruction: "Click all the animals",
        items: [
          { type: "animal", emoji: "🐶" },
          { type: "animal", emoji: "🐱" },
          { type: "animal", emoji: "🐭" },
          { type: "car", emoji: "🚗" },
          { type: "tree", emoji: "🌳" },
          { type: "house", emoji: "🏠" },
        ],
      },
      {
        target: "food",
        instruction: "Click all the food",
        items: [
          { type: "food", emoji: "🍕" },
          { type: "food", emoji: "🍔" },
          { type: "food", emoji: "🍎" },
          { type: "car", emoji: "🚙" },
          { type: "tree", emoji: "🌳" },
          { type: "flower", emoji: "🌸" },
        ],
      },
    ];

    const selectedChallenge =
      challenges[Math.floor(Math.random() * challenges.length)];
    const positions = [];

    selectedChallenge.items.forEach((item, index) => {
      let x, y, overlap;
      do {
        x = Math.floor(Math.random() * 80) + 10;
        y = Math.floor(Math.random() * 70) + 15;
        overlap = positions.some(
          (pos) => Math.abs(pos.x - x) < 15 && Math.abs(pos.y - y) < 15
        );
      } while (overlap);

      positions.push({
        id: index + 1,
        ...item,
        x,
        y,
        isTarget: item.type === selectedChallenge.target,
      });
    });

    return { items: positions, instruction: selectedChallenge.instruction };
  };

  React.useEffect(() => {
    const challenge = generateRandomChallenge();
    setTargetItems(challenge.items);
    setInstruction(challenge.instruction);
  }, []);

  const handleItemClick = (item) => {
    if (clickedItems.includes(item.id) || isCompleted) return;

    const newClickedItems = [...clickedItems, item.id];
    setClickedItems(newClickedItems);

    const targetCount = targetItems.filter((i) => i.isTarget).length;
    const correctClicks = newClickedItems.filter((id) => {
      const clickedItem = targetItems.find((i) => i.id === id);
      return clickedItem && clickedItem.isTarget;
    }).length;

    if (
      correctClicks === targetCount &&
      newClickedItems.length === targetCount
    ) {
      setIsCompleted(true);
      onSuccess();
    }
  };

  const resetCaptcha = () => {
    setClickedItems([]);
    setIsCompleted(false);
    const challenge = generateRandomChallenge();
    setTargetItems(challenge.items);
    setInstruction(challenge.instruction);
    onRefresh();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border w-full max-w-sm">
      <div className="text-center mb-3">
        <span className="text-sm font-medium">
          {isCompleted ? "✓ Verification Complete" : instruction}
        </span>
      </div>

      <div className="relative w-full h-32 bg-blue-100 dark:bg-blue-900 rounded border-2 border-dashed border-blue-300 dark:border-blue-600 mb-3">
        {targetItems.map((item) => (
          <div
            key={item.id}
            className={`absolute cursor-pointer text-2xl transition-all duration-200 hover:scale-110 ${
              clickedItems.includes(item.id)
                ? item.isTarget
                  ? "ring-2 ring-green-400"
                  : "ring-2 ring-red-400"
                : "hover:ring-2 hover:ring-blue-400"
            }`}
            style={{
              left: `${item.x}%`,
              top: `${item.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            onClick={() => handleItemClick(item)}
          >
            {item.emoji}
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-600 dark:text-gray-400">
          {clickedItems.length} / {targetItems.filter((i) => i.isTarget).length}{" "}
          selected
        </span>
        <button
          onClick={resetCaptcha}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
export default function Login() {
  const isLogin = useSelector(getLoginUserData);

  useEffect(() => {
    if (isLogin?.token) {
      router.push("/my-admin/dashboard");
    }
  }, [isLogin]);

  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [captchaResolved, setCaptchaResolved] = useState(false);
  const [showOTPScreen, setShowOTPScreen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const { callApi, loading, error, data } = useApi();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  console.log("isLoginisLoginisLogin => ", isLogin);

  const onSubmit = async (data) => {
    if (!captchaResolved) {
      showToast("Please complete the captcha verification", "error");
      return;
    }

    const body = {
      email: data.email,
      password: data.password,
    };

    try {
      const result = await callApi("post", "/login", body);

      if (result?.error) {
        showToast(result.error, "error");
      } else if (result?.message) {
        // OTP sent successfully
        showToast(result.message || "OTP sent successfully", "success");
        setUserEmail(data.email);
        setShowOTPScreen(true);
      }
    } catch (err) {
      console.error("Error posting data:", err);
      showToast("Failed to send OTP", "error");
    }
  };

  const handleResendOTP = async () => {
    const body = {
      email: userEmail,
      password: "", // Password not needed for resend, backend should handle this
    };

    try {
      const result = await callApi("post", "/login", body);
      return result;
    } catch (err) {
      console.error("Error resending OTP:", err);
      throw err;
    }
  };

  const handleBackToLogin = () => {
    setShowOTPScreen(false);
    setUserEmail("");
    setCaptchaResolved(false);
  };

  // Show OTP verification screen if needed
  if (showOTPScreen) {
    return (
      <>
        <ToastContainer />
        <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
          </div>

          <div className="relative z-10">
            <OTPVerification
              email={userEmail}
              onBack={handleBackToLogin}
              onResendOTP={handleResendOTP}
            />
          </div>
        </section>

        <style jsx>{`
          @keyframes blob {
            0% {
              transform: translate(0px, 0px) scale(1);
            }
            33% {
              transform: translate(30px, -50px) scale(1.1);
            }
            66% {
              transform: translate(-20px, 20px) scale(0.9);
            }
            100% {
              transform: translate(0px, 0px) scale(1);
            }
          }
          .animate-blob {
            animation: blob 7s infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-4000 {
            animation-delay: 4s;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <ToastContainer />
      <section className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>

        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 relative z-10">
          {/* Left side - Image/Illustration */}
          <div className="hidden lg:flex lg:w-1/2 items-center justify-center">
            <div className="relative w-full max-w-lg">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-3xl transform rotate-6 opacity-20"></div>
              <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                <img
                  src="../assets/images/auth-img.png"
                  alt="login illustration"
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className="w-full lg:w-1/2 max-w-md">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 sm:p-10 backdrop-blur-lg bg-opacity-90 dark:bg-opacity-90">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  E Police
                </h1>
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                  Welcome Back
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  Sign in to continue to your account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="h-5 w-5" />
                    </span>
                    <input
                      type="email"
                      className={`w-full h-12 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      }`}
                      style={{ paddingLeft: "3rem", paddingRight: "1rem" }}
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Lock className="h-5 w-5" />
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className={`w-full h-12 rounded-xl border-2 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.password
                          ? "border-red-500"
                          : "border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500"
                      }`}
                      style={{ paddingLeft: "3rem", paddingRight: "3rem" }}
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                      <span className="inline-block w-1 h-1 bg-red-500 rounded-full"></span>
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Captcha */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Verification
                  </label>
                  <div className="flex justify-center">
                    <SimpleCaptcha
                      onSuccess={() => setCaptchaResolved(true)}
                      onRefresh={() => setCaptchaResolved(false)}
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 cursor-pointer"
                      {...register("rememberMe")}
                      id="rememberMe"
                    />
                    <span className="ml-2 text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                      Remember me
                    </span>
                  </label>
                  <a
                    href="#"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !captchaResolved}
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
                      <span>Signing in...</span>
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>

                
                
              </form>
            </div>

            {/* Mobile Image Preview */}
            <div className="lg:hidden mt-8 flex justify-center">
              <div className="w-48 h-48 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl transform rotate-6 opacity-20"></div>
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-4 shadow-xl">
                  <img
                    src="../assets/images/auth-img.png"
                    alt="login illustration"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </>
  );
}
