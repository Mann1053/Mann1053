"use client";

import React, { useEffect, useState } from "react";
import {
  User2,
  Mail,
  Smartphone,
  MapPin,
  Globe,
  Building2,
  Shield,
  Home,
  Edit
} from "lucide-react";
import { useSelector } from "react-redux";
import { getLoginUserData } from "@/utils/selector";
import useApi from "@/hooks/useApi";
import Link from "next/link";

export default function UserProfile() {
  const userData = useSelector(getLoginUserData);
  const { callApi } = useApi();
  const [countryName, setCountryName] = useState("");
  const [stateName, setStateName] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);

 
  

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        if (userData?.user?.country) {
          await getCountryName(userData.user.country);
        }
        if (userData?.user?.state && userData?.user?.country) {
          await getStateName(userData.user.state, userData.user.country);
        }
        if (userData?.user?.city && userData?.user?.state) {
          await getCityName(userData.user.city, userData.user.state);
        }
      } catch (err) {
        console.error("Error fetching location data:", err);
      } finally {
        setLoading(false);
      }
    };

    if (userData?.user) {
      fetchLocationData();
    } else {
      setLoading(false);
    }
  }, [userData]);

  const getCountryName = async (countryId) => {
    try {
      const response = await callApi("get", "/countries");
      const country = response.data?.find(c => c.id === countryId);
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
      const state = response.data?.find(s => s.id === stateId);
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
      const city = response.data?.find(c => c.id === cityId);
      if (city) {
        setCityName(city.name);
      }
    } catch (err) {
      console.error("Error fetching city:", err);
    }
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
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData?.user) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden p-8">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400">No user data available</p>
        </div>
      </div>
    );
  }

  const user = userData.user;
 
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg border-4 border-white/20">
              <User2 className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
              <p className="text-white/80">View and manage your profile information</p>
            </div>
          </div>
          <Link
            href={`/users/edit/${user.id}`}
            className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
          >
            <Edit className="w-5 h-5" />
            Edit Profile
          </Link>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">
        <div className="space-y-6">
          {/* Full Name */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                <User2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Name *</p>
                <p className="text-gray-900 dark:text-white font-medium text-lg">{user.username || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Email Address */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Email Address *</p>
                <p className="text-gray-900 dark:text-white font-medium break-all">{user.emailAddress || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center flex-shrink-0">
                <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Phone Number *</p>
                <p className="text-gray-900 dark:text-white font-medium">{user.mobileNumber || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Role */}
          {/* <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Role *</p>
                <p className="text-gray-900 dark:text-white font-medium">{user.role?.name || "Not provided"}</p>
              </div>
            </div>
          </div> */}

          {/* Country */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                <Globe className="w-5 h-5 text-orange-600 dark:text-orange-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Country *</p>
                <p className="text-gray-900 dark:text-white font-medium">{countryName || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* State */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-pink-600 dark:text-pink-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">State *</p>
                <p className="text-gray-900 dark:text-white font-medium">{stateName || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* City */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">City *</p>
                <p className="text-gray-900 dark:text-white font-medium">{cityName || "Not provided"}</p>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status *</p>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full font-medium">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  Active
                </div>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <Home className="w-5 h-5 text-red-600 dark:text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Full Address *</p>
                <p className="text-gray-900 dark:text-white font-medium">
                  {user.address || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}