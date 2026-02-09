"use client";

import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, Plus, Trash2, Save, Edit, X } from "lucide-react";
import useApi from "@/hooks/useApi";
import usePermissions from "@/hooks/usePermissions";
import { showToast } from "@/utils/common";
import Swal from "sweetalert2";

export default function Settings() {
  const [fields, setFields] = useState([]);
  const [existingIds, setExistingIds] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const { callApi, loading } = useApi();
  const { hasPermission } = usePermissions();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const response = await callApi("get", "/settings");
      
    if (response) {
      const ids = response.map(item => item.id);
      setExistingIds(ids);
      setFields(response.map(item => ({
        id: item.id,
        name: item.name,
        value: item.value,
        isSystemvariable: item.isSystemvariable
      })));
    }
  };

  const addNewField = () => {
    if (!hasPermission('create_settings')) {
      showToast("You don't have permission to create settings", "error");
      return;
    }
    const newId = Date.now();
    setFields([...fields, { id: newId, name: "", value: "", isSystemvariable: 0 }]);
    setEditingId(newId);
    showToast("New field added", "info");
  };

  const removeField = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      if (existingIds.includes(id)) {
        const response = await callApi("delete", `/setting/${id}`);
        if (response) {
          showToast("Setting deleted successfully", "success");
          fetchSettings();
        }
      } else {
        setFields(fields.filter((field) => field.id !== id));
        showToast("Field removed successfully", "success");
      }
    }
  };

  const updateField = (id, key, value) => {
    setFields(
      fields.map((field) =>
        field.id === id ? { ...field, [key]: value } : field
      )
    );
  };

  const saveSettings = async () => {
    const newFields = fields.filter(field => !existingIds.includes(field.id));
    if (newFields.length === 0) {
      showToast("No new fields to save", "info");
      return;
    }
    const settings = newFields.map(({ name, value, isSystemvariable }) => ({ name, value, isSystemvariable }));
    const response = await callApi("post", "/settings", { settings });
    if (response) {
      showToast("Settings saved successfully", "success");
      fetchSettings();
    }
  };

  const updateSetting = async (id) => {
    const field = fields.find(f => f.id === id);
    const response = await callApi("put", `/setting/${id}`, {
      name: field.name,
      value: field.value
    });
    if (response) {
      showToast("Setting updated successfully", "success");
      setEditingId(null);
      fetchSettings();
    }
  };

 console.log("fieldsfields => ", fields);
 
  

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          ></div>
        </div>
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-white dark:bg-gray-700 flex items-center justify-center shadow-lg border-4 border-white/20">
              <SettingsIcon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-1 sm:mb-2">Settings</h1>
              <p className="text-sm sm:text-base text-white/80">Manage your application settings</p>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
            {hasPermission('create_settings') && (
              <button
                onClick={addNewField}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg text-sm sm:text-base"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Add New</span>
                <span className="sm:hidden">Add</span>
              </button>
            )}
            {hasPermission('create_settings') && (
              <button
                onClick={saveSettings}
                disabled={loading}
                className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 bg-white text-green-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 text-sm sm:text-base"
              >
                <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                Save
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
          {loading ? (
            <div className="flex flex-col justify-center items-center py-16">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-blue-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full"></div>
                </div>
              </div>
              <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">Loading settings...</p>
            </div>
          ) : fields.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mx-auto mb-4">
                <SettingsIcon className="w-10 h-10 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">
                No settings configured yet
              </p>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                Click "Add New" to create your first setting
              </p>
            </div>
          ) : (
            fields.map((field) => (
              <div
                key={field.id}
                className={`rounded-xl p-6 relative ${
                  field.isSystemvariable === 1
                    ? "bg-yellow-50 dark:bg-yellow-900/30"
                    : "bg-gray-50 dark:bg-gray-700/50"
                }`}
              >
                <div className="flex sm:absolute sm:top-4 sm:right-4 gap-2 mbWWWWW-4 sm:mb-0 justify-end">
                  {existingIds.includes(field.id) ? (
                    editingId === field.id ? (
                      <>
                        {hasPermission('update_settings') && (
                          <button
                            onClick={() => updateSetting(field.id)}
                            className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors"
                          >
                            <Save className="w-4 h-4 text-green-600 dark:text-green-400" />
                          </button>
                        )}
                        <button
                          onClick={() => setEditingId(null)}
                          className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-900/30 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-900/50 transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        </button>
                      </>
                    ) : (
                      hasPermission('update_settings') && (
                        <button
                          onClick={() => setEditingId(field.id)}
                          className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                        >
                          <Edit className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        </button>
                      )
                    )
                  ) : null}
                  {hasPermission('delete_settings') && field.isSystemvariable !== 1 && (
                    <button
                      onClick={() => removeField(field.id)}
                      className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:pr-20">
                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Field Name
                    </label>
                    <input
                      type="text"
                      value={field.name}
                      onChange={(e) =>
                        updateField(field.id, "name", e.target.value)
                      }
                      placeholder="Enter field name"
                      readOnly={existingIds.includes(field.id) && editingId !== field.id}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all read-only:bg-gray-100 dark:read-only:bg-gray-900 read-only:cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                      Field Value
                    </label>
                    <input
                      type="text"
                      value={field.value}
                      onChange={(e) =>
                        updateField(field.id, "value", e.target.value)
                      }
                      placeholder="Enter field value"
                      readOnly={existingIds.includes(field.id) && editingId !== field.id}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all read-only:bg-gray-100 dark:read-only:bg-gray-900 read-only:cursor-not-allowed"
                    />
                  </div>
                </div>
                {!existingIds.includes(field.id) && (
                  <div className="mt-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={field.isSystemvariable === 1}
                        onChange={(e) =>
                          updateField(field.id, "isSystemvariable", e.target.checked ? 1 : 0)
                        }
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300">System Variable</span>
                    </label>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
