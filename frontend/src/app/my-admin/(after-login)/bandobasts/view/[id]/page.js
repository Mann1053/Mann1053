"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import {
    ArrowLeft,
    Shield,
    Calendar,
    MapPin,
    Users,
    FileText,
    AlertTriangle,
    CheckCircle,
    Edit,
    Loader2,
} from "lucide-react";
import Link from "next/link";
import dynamic from 'next/dynamic';

// Dynamic import for map component (client-side only)
const BandobastMap = dynamic(
    () => import('@/components/bandobasts/BandobastMap'),
    { ssr: false }
);

export default function ViewBandobast() {
    const router = useRouter();
    const params = useParams();
    const { callApi } = useApi();
    const [loading, setLoading] = useState(true);
    const [bandobast, setBandobast] = useState(null);
    const [activeStaffTab, setActiveStaffTab] = useState('all');

    useEffect(() => {
        if (params.id) {
            fetchBandobast();
        }
    }, [params.id]);

    const fetchBandobast = async () => {
        try {
            setLoading(true);
            const response = await callApi("get", `/bandobasts/${params.id}`);

            if (response && response.success) {
                setBandobast(response.data);
            }
        } catch (error) {
            console.error("Error fetching bandobast:", error);
        } finally {
            setLoading(false);
        }
    };

    const getReserveStaff = () => {
        if (!bandobast?.staff) return [];
        const points = bandobast.points || [];
        const assignedNames = new Set();
        points.forEach(p => {
            p.assignedOfficers?.forEach(o => {
                if (o.name) assignedNames.add(o.name);
            });
        });
        return bandobast.staff.filter(s => !assignedNames.has(s.name));
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Active":
                return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400";
            case "Completed":
                return "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400";
            case "Cancelled":
                return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400";
            default:
                return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
            </div>
        );
    }

    if (!bandobast) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <Shield className="w-20 h-20 text-gray-300 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    Bandobast Not Found
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                    The bandobast you're looking for doesn't exist.
                </p>
                <Link
                    href="/my-admin/bandobasts"
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                >
                    Back to List
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-6">
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => router.back()}
                                    className="p-2 rounded-lg hover:bg-white/50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                                </button>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Shield className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                                            {bandobast.bandobast_name}
                                        </h1>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Bandobast Details
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span
                                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(
                                        bandobast.status
                                    )}`}
                                >
                                    {bandobast.status}
                                </span>
                                <Link
                                    href={`/my-admin/bandobasts/edit/${params.id}`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg"
                                >
                                    <Edit className="w-5 h-5" />
                                    Edit
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Basic Information */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <FileText className="w-6 h-6 text-blue-600" />
                                Basic Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="Bandobast Type" value={bandobast.bandobastType?.name} />
                                <InfoItem label="Priority" value={bandobast.priority?.name} />
                                <InfoItem label="Start Date" value={new Date(bandobast.start_date).toLocaleDateString()} />
                                <InfoItem label="Start Time" value={bandobast.start_time} />
                                <InfoItem label="End Date" value={new Date(bandobast.end_date).toLocaleDateString()} />
                                <InfoItem label="End Time" value={bandobast.end_time} />
                            </div>
                            {bandobast.event_description && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Event Description
                                    </label>
                                    <p className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        {bandobast.event_description}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Location Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <MapPin className="w-6 h-6 text-green-600" />
                                Location & Jurisdiction
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="State" value={bandobast.state?.name || "N/A"} />
                                <InfoItem label="District" value={bandobast.district} />
                                <InfoItem label="City/Taluka" value={bandobast.city_taluka} />
                                <InfoItem label="Police Range" value={bandobast.police_range} />
                                <InfoItem label="Division" value={bandobast.division} />
                                <InfoItem label="Control Room" value={bandobast.control_room_location} />
                            </div>
                        </div>

                        {/* Event/VIP Details */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <AlertTriangle className="w-6 h-6 text-orange-600" />
                                Event & Security Details
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InfoItem label="VIP/Event Name" value={bandobast.vip_event_name} />
                                <InfoItem label="VIP Category" value={bandobast.vipCategory?.name} />
                                <InfoItem label="Expected Crowd" value={bandobast.expected_crowd?.toLocaleString()} />
                                <InfoItem label="Threat Level" value={bandobast.threatLevel?.name} />
                            </div>
                            {bandobast.intelligence_notes && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Intelligence Notes
                                    </label>
                                    <p className="text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        {bandobast.intelligence_notes}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Manpower */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <Users className="w-6 h-6 text-purple-600" />
                                Manpower Planning
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <InfoItem label="Total Staff" value={bandobast.staff?.length || 0} />
                                <InfoItem label="Shift Type" value={bandobast.shift_type} />
                                <InfoItem label="Total Areas" value={`${bandobast.total_areas} km`} />

                                {/* Designation-based counts */}
                                {(() => {
                                    const designationCounts = {};
                                    bandobast.staff?.forEach(staff => {
                                        const designation = staff.designation || 'Other';
                                        designationCounts[designation] = (designationCounts[designation] || 0) + 1;
                                    });

                                    return Object.entries(designationCounts)
                                        .sort((a, b) => b[1] - a[1]) // Sort by count descending
                                        .map(([designation, count]) => (
                                            <InfoItem
                                                key={designation}
                                                label={designation}
                                                value={count}
                                            />
                                        ));
                                })()}
                            </div>
                        </div>

                        {/* Points Overview */}
                        {bandobast.points && bandobast.points.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <MapPin className="w-6 h-6 text-emerald-600" />
                                    Points Overview ({bandobast.points.length})
                                </h2>
                                <div className="grid grid-cols-1 gap-6">
                                    {bandobast.points.map((point, index) => (
                                        <div key={point.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-900 text-lg dark:text-white flex items-center gap-2">
                                                    <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full">Point {index + 1}</span>
                                                    {point.point_name}
                                                </h3>
                                                <span className="text-xs text-gray-500">{point.location}</span>
                                            </div>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-2">
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400 block text-xs">Officers Reqd</span>
                                                    <span className="font-medium dark:text-gray-200">{point.officers_required}</span>
                                                </div>
                                                <div>
                                                    <span className="text-gray-500 dark:text-gray-400 block text-xs">Lat/Long</span>
                                                    <span className="font-medium dark:text-gray-200">
                                                        {point.latitude && point.longitude ? `${point.latitude}, ${point.longitude}` : 'N/A'}
                                                    </span>
                                                </div>
                                                <div className="col-span-2">
                                                    <span className="text-gray-500 dark:text-gray-400 block text-xs">Assigned</span>
                                                    <span className="font-medium dark:text-gray-200">
                                                        {point.assignedOfficers?.length || 0} Officers
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Map View */}
                        {bandobast.points && bandobast.points.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                    <MapPin className="w-6 h-6 text-red-600" />
                                    Points Map View
                                </h2>
                                <BandobastMap points={bandobast.points} />
                            </div>
                        )}

                        {/* Assigned Staff Tabs */}
                        {bandobast.staff && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                                    <Users className="w-6 h-6 text-blue-600" />
                                    Staff Management
                                </h2>

                                {/* Tab Headers */}
                                <div className="flex gap-1 border-b border-gray-200 dark:border-gray-700 mb-4">
                                    <button
                                        onClick={() => setActiveStaffTab('all')}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeStaffTab === 'all'
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                            }`}
                                    >
                                        All Staff ({bandobast.staff.length})
                                    </button>
                                    <button
                                        onClick={() => setActiveStaffTab('pointwise')}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeStaffTab === 'pointwise'
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                            }`}
                                    >
                                        Point-wise Staff
                                    </button>
                                    <button
                                        onClick={() => setActiveStaffTab('reserve')}
                                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${activeStaffTab === 'reserve'
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border-b-2 border-blue-500'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                                            }`}
                                    >
                                        Reserve Staff ({getReserveStaff().length})
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                    {activeStaffTab === 'all' && (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-700">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Mobile</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Buckle No.</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Designation</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Duty Location</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                    {bandobast.staff.length > 0 ? (
                                                        bandobast.staff.map((staff) => (
                                                            <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{staff.name}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.mobile_number}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.buckle_number}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.designation}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.duty_location}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">No staff assigned</td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}

                                    {activeStaffTab === 'pointwise' && (
                                        <div className="p-4 space-y-4">
                                            {bandobast.points && bandobast.points.length > 0 ? (
                                                bandobast.points.map((point, idx) => (
                                                    <div key={point.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                                                        <div className="bg-gray-50 dark:bg-gray-700 px-4 py-2 border-b border-gray-200 dark:border-gray-600 flex justify-between items-center">
                                                            <div>
                                                                <span className="font-semibold text-sm text-gray-900 dark:text-white">Point {idx + 1}: {point.point_name}</span>
                                                                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">({point.location})</span>
                                                            </div>
                                                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                                                {point.assignedOfficers?.length || 0} assigned
                                                            </span>
                                                        </div>
                                                        {point.assignedOfficers && point.assignedOfficers.length > 0 ? (
                                                            <div className="overflow-x-auto">
                                                                <table className="w-full text-xs text-left">
                                                                    <thead className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-700">
                                                                        <tr>
                                                                            <th className="px-4 py-2 font-medium">Name</th>
                                                                            <th className="px-4 py-2 font-medium">Mobile</th>
                                                                            <th className="px-4 py-2 font-medium">Buckle No.</th>
                                                                            <th className="px-4 py-2 font-medium">Designation</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                                                                        {point.assignedOfficers.map((officer, officerIdx) => (
                                                                            <tr key={officer.id || officerIdx}>
                                                                                <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">{officer.name}</td>
                                                                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{officer.mobile_number}</td>
                                                                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{officer.buckle_number}</td>
                                                                                <td className="px-4 py-2 text-gray-700 dark:text-gray-300">{officer.designation}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        ) : (
                                                            <div className="px-4 py-3 text-xs text-gray-500 text-center">No officers assigned to this point</div>
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="text-center py-8 text-gray-500">No points or point-wise assignments available</div>
                                            )}
                                        </div>
                                    )}

                                    {activeStaffTab === 'reserve' && (
                                        <div className="overflow-x-auto">
                                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                                <thead className="bg-gray-50 dark:bg-gray-700">
                                                    <tr>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Name</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Mobile</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Buckle No.</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Designation</th>
                                                        <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase">Duty Location</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                                    {getReserveStaff().length > 0 ? (
                                                        getReserveStaff().map((staff) => (
                                                            <tr key={staff.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                                                <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-medium">{staff.name}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.mobile_number}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.buckle_number}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.designation}</td>
                                                                <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">{staff.duty_location}</td>
                                                            </tr>
                                                        ))
                                                    ) : (
                                                        <tr>
                                                            <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                                                                No reserve staff (all staff assigned to points)
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Approval Info */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                                <CheckCircle className="w-6 h-6 text-green-600" />
                                Approval Status
                            </h2>
                            <div className="space-y-3">
                                <InfoItem label="Status" value={bandobast.approval_status} />
                                <InfoItem label="Authority" value={bandobast.approvingAuthority?.designation} />
                                {bandobast.approval_date && (
                                    <InfoItem
                                        label="Approval Date"
                                        value={new Date(bandobast.approval_date).toLocaleDateString()}
                                    />
                                )}
                            </div>
                            {bandobast.remarks && (
                                <div className="mt-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Remarks
                                    </label>
                                    <p className="text-sm text-gray-800 dark:text-white bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                                        {bandobast.remarks}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Settings */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6">
                            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                                Settings & Features
                            </h2>
                            <div className="space-y-2">
                                <FeatureItem
                                    label="Live Location Tracking"
                                    enabled={bandobast.live_location_tracking}
                                />
                                <FeatureItem label="Geo-Fencing" enabled={bandobast.geo_fencing_enabled} />
                                <FeatureItem label="Group Chat" enabled={bandobast.group_chat_enabled} />
                                <FeatureItem
                                    label="Emergency Broadcast"
                                    enabled={bandobast.emergency_broadcast}
                                />
                                <FeatureItem
                                    label="Auto Report Generation"
                                    enabled={bandobast.auto_report_generation}
                                />
                                <FeatureItem label="Incident Logging" enabled={bandobast.incident_logging} />
                                <FeatureItem
                                    label="Photo/Video Upload"
                                    enabled={bandobast.photo_video_upload}
                                />
                                <FeatureItem label="Feedback Required" enabled={bandobast.feedback_required} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Helper Components
function InfoItem({ label, value }) {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                {label}
            </label>
            <p className="text-gray-900 dark:text-white font-medium">
                {value || "N/A"}
            </p>
        </div>
    );
}

function FeatureItem({ label, enabled }) {
    return (
        <div className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
            <span className="text-sm text-gray-700 dark:text-gray-300">{label}</span>
            <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${enabled
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
                    }`}
            >
                {enabled ? "Enabled" : "Disabled"}
            </span>
        </div>
    );
}
