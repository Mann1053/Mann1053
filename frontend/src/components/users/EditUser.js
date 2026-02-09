"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  UserCheck,
  Mail as MailIcon,
  Smartphone,
  SquareAsterisk,
  MapPin,
  Globe,
  Building2,
  Save,
  X,
} from "lucide-react";
import useApi from "@/hooks/useApi";
import { showToast } from "@/utils/common";
import { isApiError } from "@/utils/apiErrorHandler";
import { useRouter } from "next/navigation";
import Link from "next/link";
import usePermissions from "@/hooks/usePermissions";

export default function EditUser({ userId }) {
  const { callApi } = useApi();
  const { hasPermission } = usePermissions();
  const [roleListData, setRoleListData] = useState([]);
  const [countryListData, setCountryListData] = useState([]);
  const [stateListData, setStateListData] = useState([]);
  const [cityListData, setCityListData] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const [userData, setUserData] = useState(null);

  const router = useRouter();
  const canChangeStatus = hasPermission("activedeactive_user");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  // Watch for country and state changes
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  // Fetch user data on component mount
  useEffect(() => {
    getUserData();
    getCountryList();
    getRoles();
  }, []);

  // Fetch user data
  const getUserData = async () => {
    try {
      setLoadingData(true);
      const response = await callApi("get", `/user/${userId}`);
      setUserData(response);
      console.log("getUserDataaaaaaaaa => ", response);

      // Fetch dependent dropdowns
      if (response.country) {
        await getStateList(response.country);
      }
      if (response.state) {
        await getCityList(response.state);
      }

      // Pre-fill form with user data
      reset({
        fullName: response.username,
        email: response.emailAddress,
        phone: response.mobileNumber,
        role: response.roleId,
        country: response.country,
        state: response.state,
        city: response.city,
        address: response.address,
        status: response.status?.toString() || "1",
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      showToast("Error fetching user data", "error");
    } finally {
      setLoadingData(false);
    }
  };

  // Fetch states when country changes
  useEffect(() => {
    if (selectedCountry) {
      getStateList(selectedCountry);
      // Only reset state and city if the country has changed from the original value
      if (selectedCountry !== userData?.country) {
        setValue("state", "");
        setValue("city", "");
        setCityListData([]);
      }
    }
  }, [selectedCountry]);

  // Fetch cities when state changes
  useEffect(() => {
    if (selectedState) {
      getCityList(selectedState);
      // Only reset city if the state has changed from the original value
      if (selectedState !== userData?.state) {
        setValue("city", "");
      }
    }
  }, [selectedState]);

  const getCountryList = async () => {
    try {
      setLoadingData(true);
      const response = await callApi("get", "/countries");
      setCountryListData(response.data);
    } catch (err) {
      console.error("Error fetching countries:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const getStateList = async (countryId) => {
    try {
      setLoadingData(true);
      const response = await callApi("get", `/states/${countryId}`);
      setStateListData(response.data);
    } catch (err) {
      console.error("Error fetching states:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const getCityList = async (stateId) => {
    try {
      setLoadingData(true);
      const response = await callApi("get", `/cities/${stateId}`);
      setCityListData(response.data);
    } catch (err) {
      console.error("Error fetching cities:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const getRoles = async () => {
    try {
      const roleList = await callApi("get", "/roles");
      setRoleListData(roleList);
    } catch (err) {
      console.error("Error fetching roles:", err);
    }
  };

  const onSubmit = async (data) => {
    const body = {
      username: data.fullName,
      mobileNumber: data.phone,
      emailAddress: data.email,
      roleId: parseInt(data.role),
      country: data.country,
      state: data.state,
      city: data.city,
      address: data.address,
      status: parseInt(data.status),
    };

    // Only include password if it was changed
    if (data.password) {
      body.password = data.password;
    }

    const result = await callApi("put", `/user/${userId}`, body);

    // Check if the result contains an error
    if (isApiError(result)) {
      // Error is already handled by useApi hook with toast message
      return;
    }

    // Success case
    showToast("User updated successfully", "success");
    router.push("/my-admin/users");
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <UserCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Edit User
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Update user account details
              </p>
            </div>
          </div>
          <Link
            href="/my-admin/users"
            className="p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Form */}
      <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserCheck className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full pr-4 py-3 rounded-xl border-2 ${
                  errors.fullName
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter full name"
                {...register("fullName", {
                  required: "Full name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.fullName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full pr-4 py-3 rounded-xl border-2 ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter email address"
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
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Smartphone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full pr-4 py-3 rounded-xl border-2 ${
                  errors.phone
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="+1 (555) 000-0000"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\+?1?\s*\(?[0-9]{3}\)?\s*[0-9]{3}\s*[0-9]{4}$/,
                    message: "Invalid phone number format",
                  },
                })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.role
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all`}
                {...register("role", {
                  required: "Please select a role",
                })}
              >
                <option value="">Choose a role</option>
                {roleListData?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Password{" "}
              <span className="text-gray-500 text-xs">
                (Leave blank to keep current)
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <SquareAsterisk className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full pr-4 py-3 rounded-xl border-2 ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter new password"
                {...register("password", {
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.country
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all`}
                {...register("country", {
                  required: "Please select a country",
                })}
                disabled={loadingData}
              >
                <option value="">Choose a country</option>
                {countryListData?.map((country) => (
                  <option key={country.id} value={country.id}>
                    {country.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <Globe className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {errors.country && (
              <p className="text-red-500 text-sm mt-1">
                {errors.country.message}
              </p>
            )}
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              State <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.state
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all`}
                {...register("state", {
                  required: "Please select a state",
                })}
                disabled={!selectedCountry || loadingData}
              >
                <option value="">Choose a state</option>
                {stateListData.map((state) => (
                  <option key={state.id} value={state.id}>
                    {state.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <Building2 className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {errors.state && (
              <p className="text-red-500 text-sm mt-1">
                {errors.state.message}
              </p>
            )}
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              City <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                className={`w-full px-4 py-3 rounded-xl border-2 ${
                  errors.city
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none transition-all`}
                {...register("city", {
                  required: "Please select a city",
                })}
                disabled={!selectedState || loadingData}
              >
                <option value="">Choose a city</option>
                {cityListData.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
            </div>
            {errors.city && (
              <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Status <span className="text-red-500">*</span>
            </label>
            {canChangeStatus ? (
              <>
                <div className="flex gap-6 mt-3">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="1"
                      className="w-4 h-4 text-green-600 focus:ring-green-500 focus:ring-2"
                      {...register("status", {
                        required: "Please select a status",
                      })}
                    />
                    <span className="ml-3 text-sm font-medium text-green-600 dark:text-green-400 group-hover:text-green-700 dark:group-hover:text-green-300">
                      Active
                    </span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="0"
                      className="w-4 h-4 text-red-600 focus:ring-red-500 focus:ring-2"
                      {...register("status", {
                        required: "Please select a status",
                      })}
                    />
                    <span className="ml-3 text-sm font-medium text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300">
                      Inactive
                    </span>
                  </label>
                </div>
                {errors.status && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.status.message}
                  </p>
                )}
              </>
            ) : (
              <div className="mt-3 px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      userData?.status === 1 ? "bg-green-600" : "bg-red-600"
                    }`}
                  ></div>
                  <span
                    className={`text-sm font-medium ${
                      userData?.status === 1
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {userData?.status === 1 ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  You don't have permission to change user status
                </p>
              </div>
            )}
          </div>

          {/* Address - Full Width */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full pr-4 py-3 rounded-xl border-2 ${
                  errors.address
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter full address"
                {...register("address", {
                  required: "Full address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                  },
                })}
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-sm mt-1">
                {errors.address.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/my-admin/users"
            className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}
