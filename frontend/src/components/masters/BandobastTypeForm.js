"use client";
import useApi from "@/hooks/useApi";
import { showToast } from "@/utils/common";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Save, X } from "lucide-react";

export default function BandobastTypeForm({ id = null }) {
    const { callApi, loading } = useApi();
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        is_active: true,
    });

    useEffect(() => {
        if (id) {
            fetchData();
        }
    }, [id]);

    const fetchData = async () => {
        try {
            const response = await callApi(
                "get",
                `/master-data/bandobast-types?page=1&limit=1000`
            );
            if (response?.success) {
                const item = response.data.find((d) => d.id === parseInt(id));
                if (item) {
                    setFormData({
                        name: item.name || "",
                        description: item.description || "",
                        is_active: item.is_active ?? true,
                    });
                }
            }
        } catch (err) {
            console.error("Error fetching data:", err);
            showToast("Error fetching bandobast type", "error");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            showToast("Name is required", "error");
            return;
        }

        try {
            const method = id ? "put" : "post";
            const url = id
                ? `/master-data/bandobast-types/${id}`
                : `/master-data/bandobast-types`;

            const response = await callApi(method, url, formData);

            if (response?.success) {
                showToast(
                    id
                        ? "Bandobast type updated successfully"
                        : "Bandobast type created successfully",
                    "success"
                );
                router.push("/my-admin/masters/bandobast-types");
            } else {
                showToast(response?.message || "Operation failed", "error");
            }
        } catch (err) {
            console.error("Error saving:", err);
            showToast("Error saving bandobast type", "error");
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                    {id ? "Edit" : "Add"} Bandobast Type
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {id ? "Update" : "Create"} bandobast type information
                </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter bandobast type name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Description
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        placeholder="Enter description"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="is_active"
                        id="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                        htmlFor="is_active"
                        className="text-sm font-semibold text-gray-700 dark:text-gray-300"
                    >
                        Active
                    </label>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save className="w-5 h-5" />
                        {loading ? "Saving..." : id ? "Update" : "Create"}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push("/my-admin/masters/bandobast-types")}
                        className="inline-flex items-center gap-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <X className="w-5 h-5" />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
