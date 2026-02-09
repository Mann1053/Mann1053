"use client";

import React, { useEffect, useState } from "react";
import {
  UserCheck,
  X,
  Mail,
  Smartphone,
  MapPin,
  Globe,
  Building2,
  Shield,
  Key,
  AlertTriangle,
  Clock,
  Calendar,
} from "lucide-react";
import useApi from "@/hooks/useApi";
import { showToast } from "@/utils/common";
import Link from "next/link";

export default function ViewUser({ userId }) {
  const { callApi } = useApi();
  const [userData, setUserData] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await callApi("get", `/user/${userId}`);
        if (response?.error) {
          showToast(response.error, "error");
          return;
        }
        setUserData(response);

        // Fetch location names
        if (response.country) {
          await getCountryName(response.country);
        }
        if (response.state && response.country) {
          await getStateName(response.state, response.country);
        }
        if (response.city && response.state) {
          await getCityName(response.city, response.state);
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
        showToast("Error fetching user data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const getCountryName = async (countryId) => {
    try {
      const response = await callApi("get", "/countries");
      const country = response.data?.find((c) => c.id === countryId);
      if (country) {
        setCountryName(country.name);
      }
    } catch (err) {
      console.error("Error fetching country:", err);
    }
  };

  const getStateName = async (stateId, countryId) => {
    try {
      if (!countryId) return;
      const response = await callApi("get", `/states/${countryId}`);
      const state = response.data?.find((s) => s.id === stateId);
      if (state) {
        setStateName(state.name);
      }
    } catch (err) {
      console.error("Error fetching state:", err);
    }
  };

  const getCityName = async (cityId, stateId) => {
    try {
      if (!stateId) return;
      const response = await callApi("get", `/cities/${stateId}`);
      const city = response.data?.find((c) => c.id === cityId);
      if (city) {
        setCityName(city.name);
      }
    } catch (err) {
      console.error("Error fetching city:", err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${mm}-${dd}-${yyyy} ${hh}:${min}:${ss}`;
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col justify-center items-center py-16">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
            </div>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">
            Loading user details...
          </p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col justify-center items-center py-16">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            User not found
          </p>
        </div>
      </div>
    );
  }

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
                View User
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                User details and information
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

      {/* Content */}
      <div className="p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Full Name
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white capitalize">
                {userData.username || "N/A"}
              </p>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Email Address
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {userData.emailAddress || "N/A"}
              </p>
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Phone Number
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {userData.mobileNumber || "N/A"}
              </p>
            </div>
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Role
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Shield className="w-5 h-5 text-gray-400" />
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                {userData.role?.name || "N/A"}
              </span>
            </div>
          </div>

          {/* Country */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Country
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {countryName || "N/A"}
              </p>
            </div>
          </div>

          {/* State */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              State
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Building2 className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {stateName || "N/A"}
              </p>
            </div>
          </div>

          {/* City */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              City
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <MapPin className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {cityName || "N/A"}
              </p>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Status
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  userData.status === 1
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}
              >
                {userData.status === 1 ? "Active" : "Inactive"}
              </span>
            </div>
          </div>

          {/* OTP */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              OTP
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Key className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {userData.otp || "N/A"}
              </p>
            </div>
          </div>

          {/* OTP Attempts */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              OTP Attempts
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {userData.otpAttempts ?? "N/A"}
              </p>
            </div>
          </div>

          {/* Blocked Until */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Blocked Until
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {formatDate(userData.blockedUntil)}
              </p>
            </div>
          </div>

          {/* Last OTP Attempt */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Last OTP Attempt
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {formatDate(userData.lastOtpAttempt)}
              </p>
            </div>
          </div>

          {/* Last Login IP */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Last Login IP
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {userData.lastLoginIp || "N/A"}
              </p>
            </div>
          </div>

          {/* Created At */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Created At
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {formatDate(userData.createdAt)}
              </p>
            </div>
          </div>

          {/* Updated At */}
          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Updated At
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <UserCheck className="w-5 h-5 text-gray-400" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {formatDate(userData.updatedAt)}
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Status
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400" />

              <p
                className={`inline-flex items-center px-6 rounded-full text-lg font-semibold ${
                  userData.status === 1
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}
              >
                {" "}
                {userData.status === 1 ? "Active" : "Inactive"}
              </p>
            </div>
          </div>

          {/* Address - Full Width */}
          <div className="lg:col-span-2">
            <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Full Address
            </label>
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
              <p className="text-base font-semibold text-gray-800 dark:text-white">
                {userData.address || "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* User Statistics */}
        {/* <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            Account Status
          </h3>
          <div className="bg-white dark:bg-gray-700 rounded-lg p-6 border border-gray-200 dark:border-gray-600 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Current Status</p>
              <span
                className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                  userData.status === 1
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                }`}
              >
                {userData.status === 1 ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
        </div> */}
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <Link
          href="/my-admin/users"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
}
