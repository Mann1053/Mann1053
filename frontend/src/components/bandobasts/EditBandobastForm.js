"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import {
  Save,
  X,
  ChevronRight,
  ChevronLeft,
  Shield,
  MapPin,
  Users,
  Settings,
  Bell,
  Eye,
  FileText,
  CheckCircle,
  Calendar,
  AlertTriangle,
  Navigation,
  Search,
  Trash2,
} from "lucide-react";
import StaffManagement from "./StaffManagement";

export default function EditBandobastForm({ bandobastId }) {
  const router = useRouter();
  const { callApi } = useApi();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [points, setPoints] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // Flag to prevent auto-generation during load

  // Master data state
  const [masterData, setMasterData] = useState({
    bandobastTypes: [],
    priorityLevels: [],
    vipCategories: [],
    threatLevels: [],
    approvingAuthorities: [],
  });
  const [masterDataLoading, setMasterDataLoading] = useState(true);

  // Form state for all sections
  const [formData, setFormData] = useState({
    // Basic Info
    bandobastName: "",
    bandobastType: "",
    priorityLevel: "",
    eventDate: "",
    eventStartTime: "",
    eventEndTime: "",
    // Location
    location: "",
    district: "",
    taluka: "",
    village: "",
    landmark: "",
    // Event/VIP Details
    eventName: "",
    eventDescription: "",
    vipName: "",
    vipCategory: "",
    expectedCrowd: "",
    threatLevel: "",
    intelligenceNotes: "", // Added missing field
    // Manpower
    totalOfficers: "",
    totalPoints: "",
    totalAreas: "",
    shiftType: "Single", // Added missing field
    // Officer Assignment
    assignmentMode: "",
    reportingOfficer: "",
    backupOfficer: "",
    replacementAllowed: false,
    // Approval
    approvingAuthority: "",
    remarks: "",
    // Instructions
    generalInstructions: "",
    pointwiseInstructions: "",
    emergencyProtocol: "",
    uniformType: "",
    // Communication
    groupChatEnabled: false,
    emergencyBroadcast: false,
    language: "",
    // Monitoring
    liveLocationTracking: false,
    geoFencingEnabled: false,
    locationUpdateInterval: "",
    attendanceMode: "",
    // Post-Event
    autoReportGeneration: false,
    incidentLogging: false,
    photoVideoUpload: false,
    feedbackRequired: false
  });

  // Fetch master data on component mount
  useEffect(() => {
    const fetchMasterData = async () => {
      try {
        setMasterDataLoading(true);

        const [bandobastTypes, priorityLevels, vipCategories, threatLevels, approvingAuthorities] = await Promise.all([
          callApi("get", "/master-data/bandobast-types?page=1&limit=1000"),
          callApi("get", "/master-data/priority-levels?page=1&limit=1000"),
          callApi("get", "/master-data/vip-categories?page=1&limit=1000"),
          callApi("get", "/master-data/threat-levels?page=1&limit=1000"),
          callApi("get", "/master-data/approving-authorities?page=1&limit=1000"),
        ]);

        setMasterData({
          bandobastTypes: bandobastTypes?.data || [],
          priorityLevels: priorityLevels?.data || [],
          vipCategories: vipCategories?.data || [],
          threatLevels: threatLevels?.data || [],
          approvingAuthorities: approvingAuthorities?.data || [],
        });
      } catch (error) {
        console.error("Error fetching master data:", error);
      } finally {
        setMasterDataLoading(false);
      }
    };

    fetchMasterData();
  }, []);
  // Fetch existing bandobast data for editing
  useEffect(() => {
    const fetchBandobastData = async () => {
      if (!bandobastId) return;

      try {
        setLoading(true);
        const response = await callApi("get", `/bandobasts/${bandobastId}`);

        if (response && response.success) {
          const data = response.data;

          // Populate form data
          setFormData({
            bandobastName: data.bandobast_name || "",
            bandobastType: data.bandobast_type_id?.toString() || "",
            priorityLevel: data.priority_id?.toString() || "",
            eventDate: data.start_date || "",
            eventStartTime: data.start_time || "",
            eventEndTime: data.end_time || "",
            location: data.location || "",
            district: data.district || "",
            taluka: data.city_taluka || "",
            village: data.village || "",
            landmark: data.landmark || "",
            eventName: data.vip_event_name || "",
            eventDescription: data.event_description || "",
            vipName: data.vip_name || "",
            vipCategory: data.vip_category_id?.toString() || "",
            expectedCrowd: data.expected_crowd?.toString() || "",
            threatLevel: data.threat_level_id?.toString() || "",
            intelligenceNotes: data.intelligence_notes || "",
            totalOfficers: data.total_force?.toString() || "",
            totalPoints: (data.total_points && data.total_points > 0) ? data.total_points.toString() : (data.points?.length > 0 ? data.points.length.toString() : ""),
            totalAreas: data.total_areas?.toString() || "",
            shiftType: data.shift_type || "Single",
            assignmentMode: data.assignment_mode || "",
            reportingOfficer: data.reporting_officer || "",
            backupOfficer: data.backup_officer || "",
            replacementAllowed: data.replacement_allowed || false,
            approvingAuthority: data.approving_authority_id?.toString() || "",
            remarks: data.remarks || "",
            generalInstructions: data.general_instructions || "",
            pointwiseInstructions: data.pointwise_instructions || "",
            emergencyProtocol: data.emergency_protocol || "",
            uniformType: data.uniform_type || "",
            groupChatEnabled: data.group_chat_enabled || false,
            emergencyBroadcast: data.emergency_broadcast || false,
            language: data.language || "",
            liveLocationTracking: data.live_location_tracking || false,
            geoFencingEnabled: data.geo_fencing_enabled || false,
            locationUpdateInterval: data.location_update_interval || "",
            attendanceMode: data.attendance_mode || "",
            autoReportGeneration: data.auto_report_generation || false,
            incidentLogging: data.incident_logging || false,
            photoVideoUpload: data.photo_video_upload || false,
            feedbackRequired: data.feedback_required || false
          });

          // Populate staff list
          if (data.staff && Array.isArray(data.staff)) {
            setStaffList(data.staff.map(s => ({
              name: s.name,
              mobileNumber: s.mobile_number,
              buckleNumber: s.buckle_number,
              designation: s.designation,
              dutyLocation: s.duty_location
            })));
          }

          // Populate points with assigned officers
          if (data.points && Array.isArray(data.points)) {
            setPoints(data.points.map(p => ({
              id: p.id,
              pointName: p.point_name,
              location: p.location,
              latitude: p.latitude || "",
              longitude: p.longitude || "",
              officersRequired: p.officers_required || 0,
              assignedOfficers: (p.assignedOfficers || []).map(o => ({
                id: o.id,
                staffId: o.name,
                name: o.name,
                mobileNumber: o.mobile_number,
                buckleNumber: o.buckle_number,
                designation: o.designation,
                dutyLocation: o.duty_location
              }))
            })));
          }

          setDataLoaded(true); // Mark data as loaded
        }
      } catch (error) {
        console.error("Error fetching bandobast data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBandobastData();
  }, [bandobastId]);

  // Auto-update Total Officers based on staff count
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      totalOfficers: staffList.length.toString()
    }));
  }, [staffList]);

  // Auto-generate points based on Total Points value (skip during initial data load)
  useEffect(() => {
    // Skip if we haven't loaded data yet (for edit mode) or if loading
    if (!dataLoaded && bandobastId) return;
    if (loading) return;

    const totalPointsNum = parseInt(formData.totalPoints) || 0;

    if (totalPointsNum > points.length) {
      // Add new points
      const newPoints = [...points];
      for (let i = points.length; i < totalPointsNum; i++) {
        newPoints.push({
          id: Date.now() + i,
          pointName: `Point ${i + 1}`,
          location: "",
          latitude: "",
          longitude: "",
          officersRequired: 0,
          assignedOfficers: []
        });
      }
      setPoints(newPoints);
    } else if (totalPointsNum < points.length) {
      // Remove excess points
      setPoints(points.slice(0, totalPointsNum));
    }
  }, [formData.totalPoints, dataLoaded, loading]);

  const steps = [
    { id: 0, title: "Basic Info", icon: FileText },
    { id: 1, title: "Location", icon: MapPin },
    { id: 2, title: "Event/VIP", icon: Users },
    { id: 3, title: "Manpower & Officers", icon: Users },
    { id: 4, title: "Points", icon: Navigation },
    { id: 5, title: "Approval", icon: CheckCircle },
    { id: 6, title: "Instructions", icon: FileText },
    { id: 7, title: "Communication", icon: Settings },
    { id: 8, title: "Monitoring", icon: AlertTriangle }
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Point management functions
  const handlePointChange = (pointIndex, field, value) => {
    const updatedPoints = [...points];
    updatedPoints[pointIndex][field] = value;

    // If officersRequired changed, update assignedOfficers array
    if (field === 'officersRequired') {
      const officersNum = parseInt(value) || 0;
      const currentOfficers = updatedPoints[pointIndex].assignedOfficers || [];

      if (officersNum > currentOfficers.length) {
        // Add new officer slots
        for (let i = currentOfficers.length; i < officersNum; i++) {
          currentOfficers.push({
            id: Date.now() + i,
            staffId: "",
            name: "",
            mobileNumber: "",
            buckleNumber: "",
            designation: "",
            dutyLocation: ""
          });
        }
      } else if (officersNum < currentOfficers.length) {
        // Remove excess officer slots
        currentOfficers.splice(officersNum);
      }

      updatedPoints[pointIndex].assignedOfficers = currentOfficers;
    }

    setPoints(updatedPoints);
  };

  const handleOfficerChange = (pointIndex, officerIndex, field, value) => {
    const updatedPoints = [...points];

    if (field === 'staffId') {
      // Find selected staff and auto-fill details
      const selectedStaff = staffList.find(s => s.name === value);
      if (selectedStaff) {
        updatedPoints[pointIndex].assignedOfficers[officerIndex] = {
          ...updatedPoints[pointIndex].assignedOfficers[officerIndex],
          staffId: value,
          name: selectedStaff.name,
          mobileNumber: selectedStaff.mobileNumber || selectedStaff.mobile_number,
          buckleNumber: selectedStaff.buckleNumber || selectedStaff.buckle_number,
          designation: selectedStaff.designation,
          dutyLocation: selectedStaff.dutyLocation || selectedStaff.duty_location || ""
        };
      }
    } else {
      updatedPoints[pointIndex].assignedOfficers[officerIndex][field] = value;
    }

    setPoints(updatedPoints);
  };

  // Get available staff (excluding already assigned ones)
  const getAvailableStaff = (currentPointIndex, currentOfficerIndex) => {
    // Collect all assigned staff IDs
    const assignedStaffIds = new Set();

    points.forEach((point, pointIndex) => {
      point.assignedOfficers?.forEach((officer, officerIndex) => {
        // Skip the current officer slot (allow changing selection)
        if (pointIndex === currentPointIndex && officerIndex === currentOfficerIndex) {
          return;
        }

        if (officer.staffId) {
          assignedStaffIds.add(officer.staffId);
        }
      });
    });

    // Filter out assigned staff
    return staffList.filter(staff => !assignedStaffIds.has(staff.name));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Only allow submission on the last step
    if (currentStep !== steps.length - 1) {
      return;
    }

    // Map frontend camelCase to backend snake_case
    const payload = {
      bandobast_name: formData.bandobastName,
      bandobast_type_id: parseInt(formData.bandobastType),
      priority_id: parseInt(formData.priorityLevel),
      start_date: formData.eventDate,
      start_time: formData.eventStartTime,
      end_date: formData.eventDate, // Using same date for now
      end_time: formData.eventEndTime,
      event_description: formData.eventDescription,

      // Location (only district and city_taluka are used)
      district: formData.district,
      city_taluka: formData.taluka, // Fixed: was cityTaluka, should be taluka

      // Structure
      total_areas: parseInt(formData.totalAreas) || 0,
      total_points: parseInt(formData.totalPoints) || 0,

      // Manpower (removed unused count fields)
      total_force: parseInt(formData.totalOfficers) || 0, // Fixed: using totalOfficers from formData
      shift_type: formData.shiftType || 'Single',

      // Event/VIP Details
      vip_event_name: formData.eventName, // Fixed: was vipEventName, should be eventName
      vip_category_id: formData.vipCategory ? parseInt(formData.vipCategory) : null,
      expected_crowd: parseInt(formData.expectedCrowd) || 0, // Fixed: was expectedCrowdSize
      threat_level_id: formData.threatLevel ? parseInt(formData.threatLevel) : null,
      intelligence_notes: formData.intelligenceNotes || null,

      // Officers
      assignment_mode: formData.assignmentMode,
      reporting_officer: formData.reportingOfficer,
      backup_officer: formData.backupOfficer,
      replacement_allowed: formData.replacementAllowed,

      // Instructions
      general_instructions: formData.generalInstructions,
      pointwise_instructions: formData.pointwiseInstructions,
      emergency_protocol: formData.emergencyProtocol,
      uniform_type: formData.uniformType,

      // Communication
      group_chat_enabled: formData.groupChatEnabled,
      emergency_broadcast: formData.emergencyBroadcast,
      language: formData.language,

      // Monitoring
      live_location_tracking: formData.liveLocationTracking,
      location_update_interval: formData.locationUpdateInterval,
      attendance_mode: formData.attendanceMode,
      geo_fencing_enabled: formData.geoFencingEnabled,

      // Approval
      approving_authority_id: parseInt(formData.approvingAuthority),
      remarks: formData.remarks,

      // Post event
      auto_report_generation: formData.autoReportGeneration,
      incident_logging: formData.incidentLogging,
      photo_video_upload: formData.photoVideoUpload,
      feedback_required: formData.feedbackRequired,

      status: 'Active',
      approval_status: 'Draft',

      // Staff mapping
      staff: staffList.map(s => ({
        name: s.name,
        mobile_number: s.mobileNumber,
        buckle_number: s.buckleNumber,
        designation: s.designation,
        duty_location: s.dutyLocation
      })),

      // Points mapping
      points: points.map(point => ({
        pointName: point.pointName,
        location: point.location,
        latitude: point.latitude,
        longitude: point.longitude,
        officersRequired: parseInt(point.officersRequired) || 0,
        assignedOfficers: (point.assignedOfficers || []).map(officer => ({
          name: officer.name,
          mobileNumber: officer.mobileNumber,
          buckleNumber: officer.buckleNumber,
          designation: officer.designation,
          dutyLocation: officer.dutyLocation
        }))
      }))
    };

    try {
      const response = await callApi("put", `/bandobasts/${bandobastId}`, payload);

      if (response && response.success) {
        // showToast("Bandobast created successfully!", "success"); // Need to import showToast if we use it, or relies on global
        console.log("Updated successfully", response);
        router.push("/my-admin/bandobasts");
      }
    } catch (error) {
      console.error("Failed to Update Bandobast", error);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Bandobast Basic Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bandobast Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.bandobastName}
                  onChange={(e) => handleInputChange("bandobastName", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PM Visit - Ahmedabad"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bandobast Type <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.bandobastType}
                  onChange={(e) => handleInputChange("bandobastType", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={masterDataLoading}
                >
                  <option value="">{masterDataLoading ? "Loading..." : "Select Type"}</option>
                  {masterData.bandobastTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority Level <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.priorityLevel}
                  onChange={(e) => handleInputChange("priorityLevel", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={masterDataLoading}
                >
                  <option value="">{masterDataLoading ? "Loading..." : "Select Priority"}</option>
                  {masterData.priorityLevels.map((level) => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Event Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) => handleInputChange("eventDate", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.eventStartTime}
                  onChange={(e) => handleInputChange("eventStartTime", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.eventEndTime}
                  onChange={(e) => handleInputChange("eventEndTime", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>


          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Location & Event Details
            </h3>

            {/* Location & Jurisdiction */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Control room location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  District
                </label>
                <input
                  type="text"
                  value={formData.district}
                  onChange={(e) => handleInputChange("district", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter district"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Taluka
                </label>
                <input
                  type="text"
                  value={formData.taluka}
                  onChange={(e) => handleInputChange("taluka", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter taluka"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Village
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => handleInputChange("village", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter village"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Landmark
                </label>
                <input
                  type="text"
                  value={formData.landmark}
                  onChange={(e) => handleInputChange("landmark", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter landmark"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Event & VIP Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Name</label>
                <input
                  type="text"
                  value={formData.eventName}
                  onChange={(e) => handleInputChange("eventName", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Event Description</label>
                <textarea
                  value={formData.eventDescription}
                  onChange={(e) => handleInputChange("eventDescription", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">VIP Name</label>
                <input
                  type="text"
                  value={formData.vipName}
                  onChange={(e) => handleInputChange("vipName", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">VIP Category</label>
                <select
                  value={formData.vipCategory}
                  onChange={(e) => handleInputChange("vipCategory", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={masterDataLoading}
                >
                  <option value="">{masterDataLoading ? "Loading..." : "Select Category"}</option>
                  {masterData.vipCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expected Crowd</label>
                <input
                  type="number"
                  value={formData.expectedCrowd}
                  onChange={(e) => handleInputChange("expectedCrowd", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Threat Level</label>
                <select
                  value={formData.threatLevel}
                  onChange={(e) => handleInputChange("threatLevel", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={masterDataLoading}
                >
                  <option value="">{masterDataLoading ? "Loading..." : "Select Threat Level"}</option>
                  {masterData.threatLevels.map((level) => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Intelligence Notes</label>
                <textarea
                  value={formData.intelligenceNotes}
                  onChange={(e) => handleInputChange("intelligenceNotes", e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter any intelligence or security notes..."
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Manpower & Officer Assignment</h3>
              <button
                type="button"
                onClick={() => setShowStaffModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-lg shadow-lg transition-all"
              >
                <Users className="w-4 h-4 inline mr-2" />
                Manage Staff ({staffList.length})
              </button>
            </div>

            {/* Personnel Requirements */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl border-2 border-blue-200 dark:border-blue-700">
              <h4 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Personnel Requirements
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Total Officers <span className="text-blue-500 text-xs">(Auto-calculated)</span>
                  </label>
                  <input
                    type="number"
                    value={formData.totalOfficers}
                    readOnly
                    className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-gray-800 dark:text-white font-bold text-lg cursor-not-allowed"
                    placeholder="0"
                  />
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                    Based on staff added in Staff Management
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Total Points <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.totalPoints}
                    onChange={(e) => handleInputChange("totalPoints", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                    placeholder="0"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Total Areas (km)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={formData.totalAreas}
                      onChange={(e) => handleInputChange("totalAreas", e.target.value)}
                      className="w-full px-4 py-3 pr-12 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                      placeholder="0.0"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 font-medium">km</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Shift Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.shiftType}
                    onChange={(e) => handleInputChange("shiftType", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                  >
                    <option value="Single">Single Shift</option>
                    <option value="Double">Double Shift</option>
                    <option value="Triple">Triple Shift</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Officer Assignment */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <h4 className="font-bold text-lg text-purple-900 dark:text-purple-100 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Officer Assignment
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Assignment Mode</label>
                  <select
                    value={formData.assignmentMode}
                    onChange={(e) => handleInputChange("assignmentMode", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
                  >
                    <option value="">Select Mode</option>
                    <option value="Auto">Auto</option>
                    <option value="Manual">Manual</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Reporting Officer</label>
                  <select
                    value={formData.reportingOfficer}
                    onChange={(e) => handleInputChange("reportingOfficer", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
                  >
                    <option value="">Select Officer</option>
                    {staffList.map((staff, index) => (
                      <option key={index} value={staff.name}>
                        {staff.name} - {staff.designation}
                      </option>
                    ))}
                  </select>
                  {staffList.length === 0 && (
                    <p className="text-xs text-amber-600 dark:text-amber-400 mt-1">
                      Add staff members first to populate this list
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Backup Officer</label>
                  <select
                    value={formData.backupOfficer}
                    onChange={(e) => handleInputChange("backupOfficer", e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-medium"
                  >
                    <option value="">Select Backup Officer (Optional)</option>
                    {staffList.map((staff, index) => (
                      <option key={index} value={staff.name}>
                        {staff.name} - {staff.designation}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.replacementAllowed}
                      onChange={(e) => handleInputChange("replacementAllowed", e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Replacement Allowed on Absence</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Navigation className="w-6 h-6" />
                Points Management
              </h3>
              <div className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <span className="text-sm font-semibold text-blue-900 dark:text-blue-100">
                  Total Points: {points.length}
                </span>
              </div>
            </div>

            {points.length === 0 ? (
              <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600">
                <Navigation className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg font-medium">
                  No points created yet
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
                  Set "Total Points" in the previous step to auto-generate points
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {points.map((point, pointIndex) => (
                  <div
                    key={point.id}
                    className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-xl border-2 border-emerald-200 dark:border-emerald-700"
                  >
                    <h4 className="font-bold text-lg text-emerald-900 dark:text-emerald-100 mb-4">
                      Point #{pointIndex + 1}
                    </h4>

                    {/* Point Details */}
                    <div className="grid grid-cols-5 gap-3 mb-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Point Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={point.pointName}
                          onChange={(e) => handlePointChange(pointIndex, 'pointName', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., Main Gate"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Location <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={point.location}
                          onChange={(e) => handlePointChange(pointIndex, 'location', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., Stadium Entrance"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Officers Required <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="number"
                          value={point.officersRequired}
                          onChange={(e) => handlePointChange(pointIndex, 'officersRequired', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="0"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Latitude
                        </label>
                        <input
                          type="text"
                          value={point.latitude}
                          onChange={(e) => handlePointChange(pointIndex, 'latitude', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., 23.0225"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Longitude
                        </label>
                        <input
                          type="text"
                          value={point.longitude}
                          onChange={(e) => handlePointChange(pointIndex, 'longitude', e.target.value)}
                          className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., 72.5714"
                        />
                      </div>
                    </div>

                    {/* Officer Assignments */}
                    {point.assignedOfficers && point.assignedOfficers.length > 0 && (
                      <div className="mt-4 pt-4 border-t-2 border-emerald-200 dark:border-emerald-700">
                        <h5 className="font-semibold text-sm text-emerald-800 dark:text-emerald-200 mb-3 flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Assigned Officers ({point.assignedOfficers.length})
                        </h5>
                        <div className="space-y-2">
                          {point.assignedOfficers.map((officer, officerIndex) => (
                            <div
                              key={officer.id}
                              className="bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                                  Officer #{officerIndex + 1}
                                </span>
                              </div>
                              <div className="grid grid-cols-6 gap-2">
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Select Staff <span className="text-red-500">*</span>
                                  </label>
                                  <select
                                    value={officer.staffId}
                                    onChange={(e) => handleOfficerChange(pointIndex, officerIndex, 'staffId', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                                  >
                                    <option value="">Select...</option>
                                    {getAvailableStaff(pointIndex, officerIndex).map((staff, idx) => (
                                      <option key={idx} value={staff.name}>
                                        {staff.name} - {staff.designation}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Name
                                  </label>
                                  <input
                                    type="text"
                                    value={officer.name}
                                    onChange={(e) => handleOfficerChange(pointIndex, officerIndex, 'name', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                                    placeholder="Name"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Mobile Number
                                  </label>
                                  <input
                                    type="text"
                                    value={officer.mobileNumber}
                                    onChange={(e) => handleOfficerChange(pointIndex, officerIndex, 'mobileNumber', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                                    placeholder="Mobile"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Buckle Number
                                  </label>
                                  <input
                                    type="text"
                                    value={officer.buckleNumber}
                                    onChange={(e) => handleOfficerChange(pointIndex, officerIndex, 'buckleNumber', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                                    placeholder="Buckle No."
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Designation
                                  </label>
                                  <input
                                    type="text"
                                    value={officer.designation}
                                    onChange={(e) => handleOfficerChange(pointIndex, officerIndex, 'designation', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                                    placeholder="Designation"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    Duty Location
                                  </label>
                                  <input
                                    type="text"
                                    value={officer.dutyLocation}
                                    onChange={(e) => handleOfficerChange(pointIndex, officerIndex, 'dutyLocation', e.target.value)}
                                    className="w-full px-2 py-1.5 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
                                    placeholder="Duty Location"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Event / VIP Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  VIP / Event Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.vipEventName}
                  onChange={(e) => handleInputChange("vipEventName", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Narendra Modi / Rath Yatra"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  VIP Category
                </label>
                <select
                  value={formData.vipCategory}
                  onChange={(e) => handleInputChange("vipCategory", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={masterDataLoading}
                >
                  <option value="">{masterDataLoading ? "Loading..." : "Select Category"}</option>
                  {masterData.vipCategories.map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Expected Crowd Size
                </label>
                <input
                  type="number"
                  value={formData.expectedCrowdSize}
                  onChange={(e) => handleInputChange("expectedCrowdSize", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Approximate count"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Threat Level
                </label>
                <select
                  value={formData.threatLevel}
                  onChange={(e) => handleInputChange("threatLevel", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={masterDataLoading}
                >
                  <option value="">{masterDataLoading ? "Loading..." : "Select Threat Level"}</option>
                  {masterData.threatLevels.map((level) => (
                    <option key={level.id} value={level.id}>{level.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Intelligence Notes
              </label>
              <textarea
                value={formData.intelligenceNotes}
                onChange={(e) => handleInputChange("intelligenceNotes", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Optional confidential information..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Route Map Upload
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => handleInputChange("routeMap", e.target.files[0])}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Upload travel route map (if applicable)
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Bandobast Structure Setup
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Define the operational breakdown of areas, sectors, and points for this bandobast.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Total Areas
                </label>
                <input
                  type="number"
                  value={formData.totalAreas}
                  onChange={(e) => handleInputChange("totalAreas", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Count of areas"
                />
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Note:</strong> Dynamic area, sector, and point management will be available after initial bandobast creation. You can add detailed structure including GPS locations, point types, and sensitivity levels in the edit view.
              </p>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Officer Assignment Rules
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assignment Mode
                </label>
                <select
                  value={formData.assignmentMode}
                  onChange={(e) => handleInputChange("assignmentMode", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Mode</option>
                  <option value="Auto">Auto</option>
                  <option value="Manual">Manual</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Reporting Officer
                </label>
                <select
                  value={formData.reportingOfficer}
                  onChange={(e) => handleInputChange("reportingOfficer", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Officer</option>
                  <option value="PI">Police Inspector (PI)</option>
                  <option value="ACP">Assistant Commissioner of Police (ACP)</option>
                  <option value="DSP">Deputy Superintendent of Police (DSP)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Backup Officer
                </label>
                <select
                  value={formData.backupOfficer}
                  onChange={(e) => handleInputChange("backupOfficer", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Backup Officer (Optional)</option>
                  <option value="PI">Police Inspector (PI)</option>
                  <option value="ACP">Assistant Commissioner of Police (ACP)</option>
                  <option value="DSP">Deputy Superintendent of Police (DSP)</option>
                </select>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.replacementAllowed}
                    onChange={(e) => handleInputChange("replacementAllowed", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Replacement Allowed on Absence
                  </span>
                </label>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Duty Instructions & Guidelines
            </h3>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                General Instructions
              </label>
              <textarea
                value={formData.generalInstructions}
                onChange={(e) => handleInputChange("generalInstructions", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Common SOP and general guidelines..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Point-wise Instructions
              </label>
              <textarea
                value={formData.pointwiseInstructions}
                onChange={(e) => handleInputChange("pointwiseInstructions", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Specific tasks for each point..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Emergency Protocol
              </label>
              <textarea
                value={formData.emergencyProtocol}
                onChange={(e) => handleInputChange("emergencyProtocol", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="What to do in crisis situations..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Uniform Type
                </label>
                <select
                  value={formData.uniformType}
                  onChange={(e) => handleInputChange("uniformType", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Uniform Type</option>
                  <option value="Regular">Regular</option>
                  <option value="Ceremonial">Ceremonial</option>
                  <option value="Riot Gear">Riot Gear</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Communication & Notifications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.groupChatEnabled}
                    onChange={(e) => handleInputChange("groupChatEnabled", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Bandobast Group Chat
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.emergencyBroadcast}
                    onChange={(e) => handleInputChange("emergencyBroadcast", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Emergency Broadcast (One-click Alert)
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Language
                </label>
                <select
                  value={formData.language}
                  onChange={(e) => handleInputChange("language", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Language</option>
                  <option value="Gujarati">Gujarati</option>
                  <option value="English">English</option>
                  <option value="Both">Both</option>
                </select>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <strong>Notification Modes:</strong> App notifications and SMS will be configured based on system settings.
              </p>
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Monitoring & Tracking Settings
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.liveLocationTracking}
                    onChange={(e) => handleInputChange("liveLocationTracking", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Live Location Tracking (GPS)
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.geoFencingEnabled}
                    onChange={(e) => handleInputChange("geoFencingEnabled", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Geo-Fencing (Point Boundary)
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location Update Interval
                </label>
                <select
                  value={formData.locationUpdateInterval}
                  onChange={(e) => handleInputChange("locationUpdateInterval", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!formData.liveLocationTracking}
                >
                  <option value="">Select Interval</option>
                  <option value="30sec">30 seconds</option>
                  <option value="1min">1 minute</option>
                  <option value="5min">5 minutes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Attendance Mode
                </label>
                <select
                  value={formData.attendanceMode}
                  onChange={(e) => handleInputChange("attendanceMode", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Mode</option>
                  <option value="Auto GPS">Auto GPS</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Approval & Post-Event Settings
            </h3>

            {/* Approval & Authority */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mb-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Approval & Authority</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Approving Authority <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.approvingAuthority}
                  onChange={(e) => handleInputChange("approvingAuthority", e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  disabled={masterDataLoading}
                >
                  <option value="">{masterDataLoading ? "Loading..." : "Select Authority"}</option>
                  {masterData.approvingAuthorities.map((authority) => (
                    <option key={authority.id} value={authority.id}>{authority.designation}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Remarks / Comments
              </label>
              <textarea
                value={formData.remarks}
                onChange={(e) => handleInputChange("remarks", e.target.value)}
                rows={4}
                className="w-full px-4 py-2 rounded-lg border-2 border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Approval comments or special notes..."
              />
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                <strong>Note:</strong> This bandobast will be saved as "Draft" and will require approval from the selected authority before activation.
              </p>
            </div>

            {/* Post-Bandobast Settings */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg mt-6 mb-4">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Post-Bandobast Settings</h4>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.autoReportGeneration}
                    onChange={(e) => handleInputChange("autoReportGeneration", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Auto Report Generation
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.incidentLogging}
                    onChange={(e) => handleInputChange("incidentLogging", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Incident Logging During Event
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.photoVideoUpload}
                    onChange={(e) => handleInputChange("photoVideoUpload", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Allow Photo / Video Upload (Evidence)
                  </span>
                </label>
              </div>

              <div className="flex items-center">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.feedbackRequired}
                    onChange={(e) => handleInputChange("feedbackRequired", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Require Officer Feedback After Event
                  </span>
                </label>
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-sm text-green-800 dark:text-green-200">
                <strong>Ready to Submit!</strong> Review all sections and click "Update Bandobast" to save this bandobast as a draft for approval.
              </p>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              Section {currentStep + 1} content will be implemented here
            </p>
          </div>
        );
    }
  };


  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden max-w-full">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white truncate">
              Edit Bandobast
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
              Step {currentStep + 1} of {steps.length}: {steps[currentStep].title}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
            Progress
          </span>
          <span className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
            {Math.round(((currentStep + 1) / steps.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Steps Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700 overflow-x-hidden">
        <div className="px-4 sm:px-6 py-3 overflow-x-auto">
          <div className="flex gap-1.5 sm:gap-2 pb-1">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = currentStep === index;
              const isCompleted = currentStep > index;

              return (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg font-medium text-xs whitespace-nowrap transition-all flex-shrink-0 ${isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : isCompleted
                      ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                    }`}
                >
                  <StepIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  <span className="hidden lg:inline text-xs">{step.title}</span>
                  <span className="lg:hidden">{index + 1}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="p-4 sm:p-6">{renderStepContent()}</div>

        {/* Form Actions */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push("/my-admin/bandobasts")}
            className="px-6 py-2.5 rounded-xl border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>

          <div className="flex items-center gap-3">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => handlePrevious()}
                className="px-6 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-300 dark:hover:bg-gray-500 transition-all flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            )}

            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => handleNext()}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Update Bandobast
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Staff Management Modal */}
      {showStaffModal && (
        <StaffManagement
          onClose={() => setShowStaffModal(false)}
          initialStaffList={staffList}
          onSave={setStaffList}
        />
      )}
    </div>
  );
}

