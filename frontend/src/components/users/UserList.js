"use client";

import useApi from "@/hooks/useApi";
import usePermissions from "@/hooks/usePermissions";
import {
  Edit,
  ChevronUp,
  ChevronDown,
  Trash,
  UserPlus,
  Search,
  Users,
  Eye,
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function UserList() {
  const { callApi, loading, error, data } = useApi();
  const { hasPermission } = usePermissions();
  const [pagePageData, setPerPageData] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchField, setSearchField] = useState("username");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [searchError, setSearchError] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: null,
  });
  const [userListData, setUserListData] = useState({
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
    users: [],
  });
  const [deleteConfirmation, setDeleteConfirmation] = useState({
    show: false,
    userId: null,
    userName: null,
  });

  useEffect(() => {
    let isSubscribed = true;

    const fetchData = async () => {
      try {
        let url = `/users?page=${userListData.currentPage}&limit=${pagePageData}`;

        if (debouncedSearchTerm) {
          url += `&search=${encodeURIComponent(
            debouncedSearchTerm
          )}&searchField=${searchField}`;
        }

        if (sortConfig.key) {
          url += `&sortBy=${sortConfig.key}&sortDirection=${sortConfig.direction}`;
        }

        const userDataList = await callApi("get", url);
        if (isSubscribed) {
          if (Array.isArray(userDataList)) {
            setUserListData({
              currentPage: userListData.currentPage,
              totalPages: 1,
              totalUsers: userDataList.length,
              users: userDataList,
            });
          } else {
            setUserListData(userDataList);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();

    return () => {
      isSubscribed = false;
    };
  }, [pagePageData, userListData.currentPage, sortConfig, debouncedSearchTerm]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (columnName) => {
    if (sortConfig.key !== columnName) {
      return <div className="w-4 h-4" />;
    }
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  const handlePageChange = (page) => {
    setUserListData({
      ...userListData,
      currentPage: page,
    });
  };

  const renderPaginationItems = () => {
    const items = [];
    const totalPages = userListData.totalPages;
    const currentPage = userListData.currentPage;

    if (currentPage > 2) {
      items.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="w-10 h-10 rounded-lg font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          aria-label="Page 1"
        >
          1
        </button>
      );

      if (currentPage > 3) {
        items.push(
          <span
            key="ellipsis1"
            className="text-gray-400 dark:text-gray-500 px-2"
          >
            ...
          </span>
        );
      }
    }

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      items.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`w-10 h-10 rounded-lg font-medium transition-all duration-200 ${
            i === currentPage
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
          }`}
          aria-label={`Page ${i}`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        items.push(
          <span
            key="ellipsis2"
            className="text-gray-400 dark:text-gray-500 px-2"
          >
            ...
          </span>
        );
      }
      items.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="w-10 h-10 rounded-lg font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-all"
          aria-label={`Page ${totalPages}`}
        >
          {totalPages}
        </button>
      );
    }

    return items;
  };

  const renderTableHeader = () => (
    <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
      <tr>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
        >
          <div className="flex items-center gap-2">
            <input
              className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
              type="checkbox"
            />
            <button
              onClick={() => handleSort("id")}
              className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ID {getSortIcon("id")}
            </button>
          </div>
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
        >
          <button
            onClick={() => handleSort("username")}
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Name {getSortIcon("username")}
          </button>
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
        >
          Phone
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
        >
          Email
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
        >
          <button
            onClick={() => handleSort("roleId")}
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Role {getSortIcon("roleId")}
          </button>
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
        >
          <button
            onClick={() => handleSort("status")}
            className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            Status {getSortIcon("status")}
          </button>
        </th>
        <th
          scope="col"
          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider"
        >
          Actions
        </th>
      </tr>
    </thead>
  );

  const handleSearch = () => {
    if (searchTerm && searchTerm.length < 3) {
      setSearchError("Minimum 3 characters required");
      return;
    }
    setSearchError("");
    setDebouncedSearchTerm(searchTerm);
  };

  const handleDeleteUser = async (userId) => {
    try {
      const response = await callApi("put", `/user/${userId}`, {
        isDeleted: 1,
      });

      if (response?.error) {
        return;
      }

      // Refresh the user list
      const url = `/users?page=${
        userListData.currentPage
      }&limit=${pagePageData}${
        debouncedSearchTerm
          ? `&search=${encodeURIComponent(debouncedSearchTerm)}`
          : ""
      }${
        sortConfig.key
          ? `&sortBy=${sortConfig.key}&sortDirection=${sortConfig.direction}`
          : ""
      }`;

      const userDataList = await callApi("get", url);
      if (Array.isArray(userDataList)) {
        setUserListData({
          currentPage: userListData.currentPage,
          totalPages: 1,
          totalUsers: userDataList.length,
          users: userDataList,
        });
      } else {
        setUserListData(userDataList);
      }

      setDeleteConfirmation({ show: false, userId: null, userName: null });
    } catch (err) {
      console.error("Error deleting user:", err);
    }
  };

  const TableSkeleton = () => (
    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
      {Array.from({ length: pagePageData }).map((_, index) => (
        <tr key={index}>
          <td className="px-6 py-4">
            <Skeleton height={20} />
          </td>
          <td className="px-6 py-4">
            <Skeleton height={20} />
          </td>
          <td className="px-6 py-4">
            <Skeleton height={20} />
          </td>
          <td className="px-6 py-4">
            <Skeleton height={20} />
          </td>
          <td className="px-6 py-4">
            <Skeleton height={20} />
          </td>
          <td className="px-6 py-4">
            <Skeleton height={20} />
          </td>
          <td className="px-6 py-4">
            <Skeleton height={20} />
          </td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                User Management
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage and organize system users
              </p>
            </div>
          </div>
          {hasPermission("create_user") && (
            <Link
              href="/my-admin/users/add"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
            >
              <UserPlus className="w-5 h-5" />
              Add User
            </Link>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="p-6 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Entries per page */}
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Show
            </label>
            <select
              value={pagePageData}
              onChange={(e) => setPerPageData(Number(e.target.value))}
              className="px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
            </select>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              entries
            </span>
          </div>

          {/* Search */}
          <div className="flex-1 sm:max-w-2xl">
            <div className="flex gap-2">
              <select
                value={searchField}
                onChange={(e) => setSearchField(e.target.value)}
                className="px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="username">Name</option>
                <option value="mobileNumber">Mobile Number</option>
                <option value="emailAddress">Email</option>
                <option value="address">Address</option>
              </select>
              <div className="relative flex-1">
                <input
                  style={{ paddingLeft: "2.75rem" }}
                  className={`w-full pr-4 py-2 rounded-xl border-2 ${
                    searchError
                      ? "border-red-500"
                      : "border-gray-200 dark:border-gray-600"
                  } bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                  placeholder="Search users..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    if (searchError) setSearchError("");
                  }}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                onClick={handleSearch}
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Search
              </button>
            </div>
            {searchError && (
              <p className="text-red-500 text-xs mt-1 ml-1">{searchError}</p>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          {renderTableHeader()}
          {loading ? (
            <TableSkeleton />
          ) : (
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {userListData.users?.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <input
                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                        type="checkbox"
                        id={`user-${user.id}`}
                      />
                      <label
                        className="text-sm font-medium text-gray-700 dark:text-gray-300"
                        htmlFor={`user-${user.id}`}
                      >
                        {user.id}
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {hasPermission("update_user") ? (
                      <Link
                        href={`/my-admin/users/edit/${user.id}`}
                        className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 capitalize transition-colors"
                      >
                        {user.username}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {user.username}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {user.mobileNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                    {user.emailAddress}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400">
                      {user.role?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        user.status === 1
                          ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                          : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400"
                      }`}
                    >
                      {user.status === 1 ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {hasPermission("view_user") && (
                        <Link
                          href={`/my-admin/users/view/${user.id}`}
                          className="p-2 rounded-lg bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
                          title="View User"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      )}
                      {hasPermission("update_user") && (
                        <Link
                          href={`/my-admin/users/edit/${user.id}`}
                          className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                          title="Edit User"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                      )}
                      {hasPermission("delete_user") && (
                        <button
                          type="button"
                          onClick={() =>
                            setDeleteConfirmation({
                              show: true,
                              userId: user.id,
                              userName: user.username,
                            })
                          }
                          className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                          title="Delete User"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>

      {/* Empty State */}
      {!loading && userListData.users?.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16">
          <Users className="w-20 h-20 text-gray-300 dark:text-gray-600 mb-4" />
          <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
            No users found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Try adjusting your search criteria
          </p>
        </div>
      )}

      {/* Pagination */}
      {!loading && userListData.users?.length > 0 && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Info */}
            <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
              Showing{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {(userListData.currentPage - 1) * pagePageData + 1}
              </span>{" "}
              to{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {Math.min(
                  userListData.currentPage * pagePageData,
                  userListData.totalUsers
                )}
              </span>{" "}
              of{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {userListData.totalUsers}
              </span>{" "}
              entries
            </span>

            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(userListData.currentPage - 1)}
                disabled={userListData.currentPage === 1}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Previous
              </button>

              {renderPaginationItems()}

              <button
                onClick={() => handlePageChange(userListData.currentPage + 1)}
                disabled={userListData.currentPage === userListData.totalPages}
                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <Trash className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Delete User
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  This action cannot be undone
                </p>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600 dark:text-red-400">
                {deleteConfirmation.userName}
              </span>
              ? This user will be marked as deleted and won't be able to access
              the system.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() =>
                  setDeleteConfirmation({
                    show: false,
                    userId: null,
                    userName: null,
                  })
                }
                className="px-6 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteUser(deleteConfirmation.userId)}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium transition-all shadow-lg hover:shadow-xl"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
