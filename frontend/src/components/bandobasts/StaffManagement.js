"use client";

import React, { useState, useEffect } from "react";
import { X, Plus, Edit, Trash, Download, Upload, Users, Loader2 } from "lucide-react";
import useApi from "@/hooks/useApi";

export default function StaffManagement({ onClose, initialStaffList = [], onSave, bandobastId = null }) {
  const { callApi } = useApi();
  const [staffList, setStaffList] = useState(initialStaffList);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    buckleNumber: "",
    designation: "",
    dutyLocation: "",
  });

  // Fetch staff if bandobastId is provided
  useEffect(() => {
    if (bandobastId) {
      fetchStaff();
    }
  }, [bandobastId]);

  const fetchStaff = async () => {
    if (!bandobastId) return;

    try {
      setLoading(true);
      const response = await callApi("get", `/bandobasts/${bandobastId}/staff`);
      if (response && response.success) {
        setStaffList(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();

    const staffData = {
      name: formData.name,
      mobile_number: formData.mobileNumber,
      buckle_number: formData.buckleNumber,
      designation: formData.designation,
      duty_location: formData.dutyLocation
    };

    if (bandobastId) {
      // API mode - create via API
      try {
        setLoading(true);
        const response = await callApi("post", `/bandobasts/${bandobastId}/staff`, staffData);
        if (response && response.success) {
          await fetchStaff(); // Refresh list
          resetForm();
        }
      } catch (error) {
        console.error("Error adding staff:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Local mode - add to local state
      const newStaff = {
        id: Date.now(),
        ...formData,
      };
      setStaffList([...staffList, newStaff]);
      resetForm();
    }
  };

  const handleUpdateStaff = async (e) => {
    e.preventDefault();

    if (!editingStaff) return;

    const staffData = {
      name: formData.name,
      mobile_number: formData.mobileNumber,
      buckle_number: formData.buckleNumber,
      designation: formData.designation,
      duty_location: formData.dutyLocation
    };

    if (bandobastId) {
      // API mode - update via API
      try {
        setLoading(true);
        const response = await callApi("put", `/staff/${editingStaff.id}`, staffData);
        if (response && response.success) {
          await fetchStaff(); // Refresh list
          resetForm();
        }
      } catch (error) {
        console.error("Error updating staff:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Local mode - update local state
      setStaffList(staffList.map(s =>
        s.id === editingStaff.id
          ? { ...s, ...formData }
          : s
      ));
      resetForm();
    }
  };

  const handleDeleteStaff = async (staff) => {
    if (!confirm(`Are you sure you want to delete ${staff.name}?`)) return;

    if (bandobastId) {
      // API mode - delete via API
      try {
        setLoading(true);
        const response = await callApi("delete", `/staff/${staff.id}`);
        if (response && response.success) {
          await fetchStaff(); // Refresh list
        }
      } catch (error) {
        console.error("Error deleting staff:", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Local mode - remove from local state
      setStaffList(staffList.filter((s) => s.id !== staff.id));
    }
  };

  const handleEditStaff = (staff) => {
    setEditingStaff(staff);
    setFormData({
      name: staff.name,
      mobileNumber: staff.mobile_number || staff.mobileNumber,
      buckleNumber: staff.buckle_number || staff.buckleNumber,
      designation: staff.designation,
      dutyLocation: staff.duty_location || staff.dutyLocation,
    });
    setShowAddForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      mobileNumber: "",
      buckleNumber: "",
      designation: "",
      dutyLocation: "",
    });
    setEditingStaff(null);
    setShowAddForm(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (bandobastId) {
      // API mode - import via backend for existing bandobasts
      const formData = new FormData();
      formData.append("file", file);

      try {
        setUploading(true);
        const response = await callApi("post", `/bandobasts/${bandobastId}/staff/import`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response && response.success) {
          alert(`Successfully imported ${response.data.imported} staff members`);
          await fetchStaff(); // Refresh list
        }
      } catch (error) {
        console.error("Error importing staff:", error);
        alert("Error importing staff. Please check the file format.");
      } finally {
        setUploading(false);
        e.target.value = ""; // Reset file input
      }
    } else {
      // Local mode - parse CSV/Excel locally for new bandobasts
      try {
        setUploading(true);
        const text = await file.text();
        const lines = text.split("\n").filter(line => line.trim());

        if (lines.length < 2) {
          alert("File is empty or invalid");
          return;
        }

        // Skip header row and parse data
        const importedStaff = [];
        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",").map(v => v.trim().replace(/^"|"$/g, ''));

          if (values.length >= 5 && values[0]) {
            importedStaff.push({
              id: Date.now() + i,
              name: values[0],
              mobileNumber: values[1],
              buckleNumber: values[2],
              designation: values[3],
              dutyLocation: values[4]
            });
          }
        }

        if (importedStaff.length > 0) {
          setStaffList([...staffList, ...importedStaff]);
          alert(`Successfully imported ${importedStaff.length} staff members`);
        } else {
          alert("No valid staff data found in file");
        }
      } catch (error) {
        console.error("Error parsing file:", error);
        alert("Error importing file. Please ensure it's a valid CSV file with the correct format.");
      } finally {
        setUploading(false);
        e.target.value = ""; // Reset file input
      }
    }
  };

  const handleDownloadSample = () => {
    // Create sample CSV data
    const sampleData = [
      ["Name", "Mobile Number", "Buckle Number", "Designation", "Duty Location"],
      ["Naresh Mor", "9876543210", "BK001", "Police Inspector", "Main Gate"],
      ["Rajesh Kumar", "9876543211", "BK002", "Sub Inspector", "North Sector"],
      ["Priya Sharma", "9876543212", "BK003", "Constable", "South Sector"],
    ];

    // Convert to CSV string
    const csvContent = sampleData.map(row => row.join(",")).join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", "staff_import_sample.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportStaff = () => {
    if (staffList.length === 0) {
      alert("No staff data to export");
      return;
    }

    // Create CSV data from current staff list
    const headers = ["Name", "Mobile Number", "Buckle Number", "Designation", "Duty Location"];
    const rows = staffList.map(staff => [
      staff.name,
      staff.mobile_number || staff.mobileNumber,
      staff.buckle_number || staff.buckleNumber,
      staff.designation,
      staff.duty_location || staff.dutyLocation
    ]);

    const csvContent = [headers, ...rows].map(row => row.join(",")).join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", `staff_export_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = () => {
    if (bandobastId) {
      // For existing bandobasts, just close (data already saved via API)
      onClose();
    } else {
      // For new bandobasts, pass data back to parent
      onSave(staffList);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Staff Management
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage police staff for this bandobast
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Actions */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                resetForm();
                setShowAddForm(!showAddForm);
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all flex items-center gap-2"
              disabled={loading}
            >
              <Plus className="w-4 h-4" />
              Add Staff
            </button>
            <button
              onClick={handleDownloadSample}
              className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg transition-all flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Sample
            </button>
            <label className={`px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all flex items-center gap-2 cursor-pointer ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Import CSV/Excel
                </>
              )}
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
            </label>
          </div>
          <button
            onClick={handleExportStaff}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all flex items-center gap-2"
            disabled={staffList.length === 0}
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div className="px-6 py-4 bg-blue-50 dark:bg-blue-900/20 border-b border-gray-200 dark:border-gray-700">
            <form onSubmit={editingStaff ? handleUpdateStaff : handleAddStaff} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.mobileNumber}
                    onChange={(e) => handleInputChange("mobileNumber", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Buckle Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.buckleNumber}
                    onChange={(e) => handleInputChange("buckleNumber", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter buckle number"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Designation <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.designation}
                    onChange={(e) => handleInputChange("designation", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select Designation</option>
                    <option value="Police Inspector">Police Inspector (PI)</option>
                    <option value="Police Sub-Inspector">Police Sub-Inspector (PSI)</option>
                    <option value="Assistant Sub-Inspector">Assistant Sub-Inspector (ASI)</option>
                    <option value="Head Constable">Head Constable</option>
                    <option value="Constable">Constable</option>
                    <option value="Home Guard">Home Guard</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duty Location <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.dutyLocation}
                    onChange={(e) => handleInputChange("dutyLocation", e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter duty location"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
                      {editingStaff ? 'Updating...' : 'Adding...'}
                    </>
                  ) : (
                    editingStaff ? 'Update Staff' : 'Add to List'
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Staff List Table */}
        <div className="flex-1 overflow-auto p-6">
          {loading && !uploading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Mobile Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Buckle Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Designation
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Duty Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {staffList.map((staff) => (
                    <tr
                      key={staff.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                        {staff.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {staff.mobile_number || staff.mobileNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {staff.buckle_number || staff.buckleNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400">
                          {staff.designation}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {staff.duty_location || staff.dutyLocation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEditStaff(staff)}
                            className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                            title="Edit Staff"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteStaff(staff)}
                            className="p-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                            title="Delete Staff"
                          >
                            <Trash className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {staffList.length === 0 && !loading && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">
                No staff added yet. Click "Add Staff" to begin.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Total Staff: <span className="font-semibold text-blue-600 dark:text-blue-400">{staffList.length}</span>
          </span>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
