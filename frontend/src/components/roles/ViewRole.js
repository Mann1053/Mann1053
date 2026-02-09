"use client";

import React, { useEffect, useState } from "react";
import { Shield, X, CheckCircle2 } from "lucide-react";
import useApi from "@/hooks/useApi";
import { showToast } from "@/utils/common";
import Link from "next/link";

export default function ViewRole({ roleId }) {
  const { callApi } = useApi();
  const [roleData, setRoleData] = useState(null);
  const [permissionGroups, setPermissionGroups] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoleData = async () => {
      try {
        // Fetch role data with permissions
        const roleResponse = await callApi("get", `/roles/${roleId}`);
        if (roleResponse?.error) {
          showToast(roleResponse.error, "error");
          return;
        }

        setRoleData(roleResponse);

        // Organize permissions into groups
        const groups = roleResponse.permissions.reduce((acc, permission) => {
          const resource = permission.name.split("_")[1];

          if (!acc[resource]) {
            acc[resource] = [];
          }

          acc[resource].push({
            id: permission.id,
            name: permission.name,
            label: permission.name
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" "),
          });

          return acc;
        }, {});

        setPermissionGroups(groups);
      } catch (err) {
        console.error("Error fetching role data:", err);
        showToast("Error fetching role data", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchRoleData();
  }, [roleId]);

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
            Loading role details...
          </p>
        </div>
      </div>
    );
  }

  if (!roleData) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col justify-center items-center py-16">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-4">
            <X className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Role not found
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
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                View Role
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Role details and permissions
              </p>
            </div>
          </div>
          <Link
            href="/my-admin/users/roles"
            className="p-2 rounded-lg bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 space-y-8">
        {/* Role Name Section */}
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
            Role Name
          </label>
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-4">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {roleData.name}
            </p>
          </div>
        </div>

        {/* Permissions Section */}
        <div>
          <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            Assigned Permissions
          </label>
          {Object.keys(permissionGroups).length === 0 ? (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-8 text-center">
              <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-gray-400 dark:text-gray-500" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 font-medium">
                No permissions assigned
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {Object.entries(permissionGroups).map(
                ([groupName, permissions]) => (
                  <div
                    key={groupName}
                    className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-5 space-y-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-gray-800 dark:text-white capitalize">
                        {groupName}
                      </h3>
                    </div>
                    <div className="ml-11 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {permissions.map((permission) => (
                        <div
                          key={permission.id}
                          className="flex items-center gap-3 p-3 bg-white dark:bg-gray-600 rounded-lg border border-gray-200 dark:border-gray-500"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">
                            {permission.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* Role Statistics */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
            Role Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Total Permissions
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {roleData.permissions.length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Permission Groups
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {Object.keys(permissionGroups).length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                Role ID
              </p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">
                {roleData.id}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-8 py-6 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-end">
        <Link
          href="/my-admin/users/roles"
          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
        >
          Back to Roles
        </Link>
      </div>
    </div>
  );
}
