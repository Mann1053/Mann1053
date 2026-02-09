"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { Key, X, Save } from "lucide-react";
import useApi from "@/hooks/useApi";
import { showToast } from "@/utils/common";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddPermission() {
  const { callApi, loading } = useApi();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await callApi("post", "/permissions", { name: data.name });
      if (result?.error) {
        showToast(result.error, "error");
      } else {
        showToast("Permission created successfully", "success");
        router.push("/my-admin/users/permissions");
      }
    } catch (err) {
      console.error("Error creating permission:", err);
      showToast("Failed to create permission", "error");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Key className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Add Permission
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create a new permission
              </p>
            </div>
          </div>
          <Link
            href="/my-admin/users/permissions"
            className="p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Form */}
      <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Permission Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Permission Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Key className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full pr-4 py-3 rounded-xl border-2 ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter permission name"
                {...register("name", {
                  required: "Permission name is required",
                  minLength: {
                    value: 2,
                    message: "Permission name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <Key className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                  Permission Naming Convention
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Use lowercase with underscores (e.g., create_user, view_role,
                  delete_permission)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/my-admin/users/permissions"
            className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-5 h-5" />
            {loading ? "Creating..." : "Create Permission"}
          </button>
        </div>
      </form>
    </div>
  );
}
