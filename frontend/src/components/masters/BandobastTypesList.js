"use client";
import useApi from "@/hooks/useApi";
import usePermissions from "@/hooks/usePermissions";
import { showToast } from "@/utils/common";
import { Edit, Trash, Search, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function BandobastTypesList() {
    const { callApi, loading, error, data } = useApi();
    const { hasPermission } = usePermissions();
    const [listData, setListData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
    });
    const router = useRouter();

    const fetchData = async (page = 1, search = "") => {
        try {
            setIsLoading(true);
            const response = await callApi(
                "get",
                `/master-data/bandobast-types?page=${page}&limit=10&search=${search}`
            );

            if (response?.status === 403) {
                showToast("Access denied", "error");
                router.push("/my-admin/dashboard");
                return false;
            }

            if (response?.success) {
                setListData(response.data);
                setPagination(response.pagination);
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            showToast("Error fetching bandobast types", "error");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage, searchTerm);
    }, [currentPage]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setCurrentPage(1);
        fetchData(1, value);
    };

    const handleDelete = async (id) => {
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
                const response = await callApi(
                    "delete",
                    `/master-data/bandobast-types/${id}`
                );

                if (response?.error) {
                    showToast(response.error, "error");
                    return;
                }

                showToast("Bandobast type deleted successfully", "success");
                fetchData(currentPage, searchTerm);
            } catch (err) {
                console.error("Error deleting:", err);
                showToast("Error deleting bandobast type", "error");
            }
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
                        Loading bandobast types...
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
                        <Trash className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <p className="text-red-600 dark:text-red-400 mb-4 font-medium">
                        {error}
                    </p>
                    <button
                        onClick={() => fetchData(currentPage, searchTerm)}
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
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                            Bandobast Types
                        </h2>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            Manage bandobast types
                        </p>
                    </div>
                    {hasPermission("create_master_data") && (
                        <Link
                            href="/my-admin/masters/bandobast-types/add"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        >
                            <Plus className="w-5 h-5" />
                            Add New
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
                        onChange={handleSearch}
                        placeholder="Search bandobast types..."
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
                                ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Description
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                        {listData?.length > 0 ? (
                            listData.map((item) => (
                                <tr
                                    key={item.id}
                                    className="hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors duration-150"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {item.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                                        {item.description || "N/A"}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span
                                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${item.is_active
                                                    ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                                    : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                                                }`}
                                        >
                                            {item.is_active ? "Active" : "Inactive"}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            {hasPermission("update_master_data") && (
                                                <Link
                                                    href={`/my-admin/masters/bandobast-types/edit/${item.id}`}
                                                    className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors duration-200"
                                                    title="Edit"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                            )}
                                            {hasPermission("delete_master_data") && (
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200"
                                                    title="Delete"
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
                                        <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
                                            No bandobast types found
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                                            {searchTerm
                                                ? "Try adjusting your search"
                                                : "Get started by creating your first bandobast type"}
                                        </p>
                                        {!searchTerm && hasPermission("create_master_data") && (
                                            <Link
                                                href="/my-admin/masters/bandobast-types/add"
                                                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                                            >
                                                <Plus className="w-5 h-5" />
                                                Create Bandobast Type
                                            </Link>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {listData?.length > 0 && (
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                            Showing{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                {(currentPage - 1) * pagination.limit + 1}
                            </span>{" "}
                            to{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                {Math.min(currentPage * pagination.limit, pagination.total)}
                            </span>{" "}
                            of{" "}
                            <span className="text-blue-600 dark:text-blue-400">
                                {pagination.total}
                            </span>{" "}
                            entries
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            <span className="px-4 py-2 text-gray-700 dark:text-gray-300">
                                Page {currentPage} of {pagination.totalPages}
                            </span>
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === pagination.totalPages}
                                className="px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
