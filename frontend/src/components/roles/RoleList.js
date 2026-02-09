"use client";
import useApi from "@/hooks/useApi";
import usePermissions from "@/hooks/usePermissions";
import { showToast } from "@/utils/common";
import { Edit, Eye, Trash, Shield, Search, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function RoleList() {
  const { callApi, loading, error, data } = useApi();
  const { hasPermission } = usePermissions();
  const [roleListData, setRoleListData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const getRoles = async () => {
    try {
      setIsLoading(true);
      const roleDataList = await callApi("get", "/roles");

      if (roleDataList?.status === 403) {
        showToast("Access denied", "error");
        router.push("/my-admin/dashboard");
        return false;
      }

      setRoleListData(roleDataList);
    } catch (err) {
      console.error("Error posting data:", err);
      showToast("Error fetching roles", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getRoles();
  }, []);

  const handleDelete = async (roleId) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await callApi("delete", `/roles/${roleId}`);

        if (response?.error) {
          showToast(response.error, "error");
          return;
        }

        showToast("Role deleted successfully", "success");
        getRoles();
      } catch (err) {
        console.error("Error deleting role:", err);
        showToast("Error deleting role", "error");
      }
    }
  };

  const filteredRoles = roleListData?.filter((role) =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
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
            Loading roles...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-red-600 dark:text-red-400" />
          </div>
          <p className="text-red-600 dark:text-red-400 mb-4 font-medium">
            {error}
          </p>
          <button
            onClick={getRoles}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                Role Management
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage system roles and permissions
              </p>
            </div>
          </div>
          {hasPermission("create_role") && (
            <Link
              href="/my-admin/users/roles/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <Plus className="w-5 h-5" />
              Add Role
            </Link>
          )}
        </div>
      </div>

      {/* Search */}
      <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="relative max-w-md">
          <input
            type="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search roles..."
            style={{ paddingLeft: "2.75rem" }}
            className="w-full pr-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                <div className="flex items-center gap-2">
                  <input
                    className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    type="checkbox"
                  />
                  <span>ID</span>
                </div>
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Role Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Created At
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Updated At
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {filteredRoles?.length > 0 ? (
              filteredRoles.map((role) => (
                <tr
                  key={role.id}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <input
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        type="checkbox"
                      />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {role.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hasPermission("update_role") ? (
                      <Link
                        href={`/my-admin/users/roles/edit/${role.id}`}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 capitalize transition-colors"
                      >
                        {role.name}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {role.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {role.createdAt
                      ? new Date(role.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {role.updatedAt
                      ? new Date(role.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {hasPermission("view_role") && (
                        <Link
                          href={`/my-admin/users/roles/view/${role.id}`}
                          className="p-2 rounded-lg bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-100 dark:hover:bg-cyan-900/30 transition-colors duration-200"
                          title="View Role"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      {hasPermission("update_role") && (
                        <Link
                          href={`/my-admin/users/roles/edit/${role.id}`}
                          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                          title="Edit Role"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      )}
                      {hasPermission("delete_role") && (
                        <button
                          onClick={() => handleDelete(role.id)}
                          className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                          title="Delete Role"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-16">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                      <Shield className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                      No roles found
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                      {searchTerm
                        ? "Try adjusting your search"
                        : "Get started by creating your first role"}
                    </p>
                    {!searchTerm && hasPermission("create_role") && (
                      <Link
                        href="/my-admin/users/roles/add"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                      >
                        <Plus className="w-5 h-5" />
                        Create Role
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      {filteredRoles?.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Showing{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {filteredRoles.length}
              </span>{" "}
              of{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {roleListData?.length || 0}
              </span>{" "}
              roles
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
