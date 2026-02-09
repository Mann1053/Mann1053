"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Shield, X, Plus } from "lucide-react";
import useApi from "@/hooks/useApi";
import { showToast } from "@/utils/common";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddRole() {
  const { callApi, loading } = useApi();
  const router = useRouter();

  const [permissionList, setPermissionList] = useState([]);
  const [permissionGroups, setPermissionGroups] = useState({});
  const [initialLoading, setInitialLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  // Fetch permissions and organize them into groups
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await callApi("get", "/permissions");
        setPermissionList(response);

        // Organize permissions into groups
        const groups = response.reduce((acc, permission) => {
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
        console.error("Error fetching permissions:", err);
        showToast("Error fetching permissions", "error");
      } finally {
        setInitialLoading(false);
      }
    };

    fetchPermissions();
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Step 1: Create the role
      const roleResponse = await callApi("post", "/roles", {
        name: data.name,
      });

      console.log("roleResponseroleResponse => ", roleResponse);

      if (roleResponse?.error) {
        showToast(roleResponse.error, "error");
        return;
      }

      // Step 2: Set permissions for the role
      if (roleResponse?.id && data.permissions.length > 0) {
        const permissionResponse = await callApi("post", "/role-permissions", {
          roleId: roleResponse.id,
          permissionIds: data.permissions,
        });

        if (permissionResponse?.error) {
          showToast("Role created but error setting permissions", "error");
          return;
        }
      }

      showToast("Role created successfully", "success");
      router.push("/my-admin/users/roles");
    } catch (err) {
      console.error("Error in role creation process:", err);
      showToast("Error creating role", "error");
    }
  };

  if (initialLoading) {
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
            Loading permissions...
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
                Add New Role
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Create a new role with specific permissions
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

      {/* Form */}
      <form className="p-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-6">
          {/* Role Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Role Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Shield className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                style={{ paddingLeft: "2.75rem" }}
                className={`w-full pr-4 py-3 rounded-xl border-2 ${
                  errors.name
                    ? "border-red-500"
                    : "border-gray-200 dark:border-gray-600"
                } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Enter role name"
                {...register("name", {
                  required: "Role name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Permissions Section */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
              Permissions <span className="text-red-500">*</span>
            </label>
            <Controller
              name="permissions"
              control={control}
              rules={{ required: "At least one permission is required" }}
              render={({ field: { value, onChange } }) => (
                <div className="space-y-4">
                  {Object.entries(permissionGroups).map(
                    ([groupName, permissions]) => (
                      <div
                        key={groupName}
                        className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-xl p-5 space-y-4"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            className="w-5 h-5 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                            checked={permissions.every((p) =>
                              value.includes(p.id)
                            )}
                            onChange={(e) => {
                              const isChecked = e.target.checked;
                              const groupPermissionIds = permissions.map(
                                (p) => p.id
                              );

                              if (isChecked) {
                                const newValue = [
                                  ...new Set([...value, ...groupPermissionIds]),
                                ];
                                onChange(newValue);
                              } else {
                                const newValue = value.filter(
                                  (id) => !groupPermissionIds.includes(id)
                                );
                                onChange(newValue);
                              }
                            }}
                            id={`group-${groupName}`}
                          />
                          <label
                            htmlFor={`group-${groupName}`}
                            className="text-base font-semibold text-gray-800 dark:text-white capitalize cursor-pointer"
                          >
                            {groupName}
                          </label>
                        </div>
                        <div className="ml-8 grid grid-cols-1 md:grid-cols-2 gap-3">
                          {permissions.map((permission) => (
                            <div
                              key={permission.id}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-600 transition-colors"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                                checked={value.includes(permission.id)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    onChange([...value, permission.id]);
                                  } else {
                                    onChange(
                                      value.filter((id) => id !== permission.id)
                                    );
                                  }
                                }}
                                id={`permission-${permission.id}`}
                              />
                              <label
                                htmlFor={`permission-${permission.id}`}
                                className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                              >
                                {permission.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  )}
                </div>
              )}
            />
            {errors.permissions && (
              <p className="text-red-500 text-sm mt-1">
                {errors.permissions.message}
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex items-center justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <Link
            href="/my-admin/users/roles"
            className="px-6 py-3 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            {loading ? "Creating..." : "Create Role"}
          </button>
        </div>
      </form>
    </div>
  );
}
