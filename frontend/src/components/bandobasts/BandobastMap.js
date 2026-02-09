"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Users, MapPin, AlertCircle, X, Phone, Badge } from 'lucide-react';

// Fix for default marker icons in Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to auto-fit map bounds to show all markers
function FitBounds({ points }) {
    const map = useMap();

    useEffect(() => {
        if (points && points.length > 0) {
            const validPoints = points.filter(p => p.latitude && p.longitude);
            if (validPoints.length > 0) {
                const bounds = validPoints.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)]);
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    }, [points, map]);

    return null;
}

// Staff List Modal Component
function StaffListModal({ point, onClose }) {
    const officers = point.assignedOfficers || [];

    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-3xl w-full max-h-[85vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                    <div className="flex items-start justify-between">
                        <div className="flex-1">
                            <h3 className="text-2xl font-bold mb-2">{point.point_name}</h3>
                            <div className="flex items-center gap-4 text-sm text-blue-100">
                                <div className="flex items-center gap-1">
                                    <MapPin className="w-4 h-4" />
                                    <span>{point.location || 'N/A'}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="bg-white/20 px-3 py-1 rounded-full">
                                        Required: {point.officers_required || 0}
                                    </span>
                                    <span className="bg-white/20 px-3 py-1 rounded-full">
                                        Assigned: {officers.length}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors ml-4"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-180px)]">
                    {officers.length > 0 ? (
                        <div className="grid gap-4">
                            {officers.map((officer, index) => (
                                <div
                                    key={index}
                                    className="bg-white dark:bg-gray-700 rounded-xl p-5 border-2 border-gray-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 transition-colors shadow-sm"
                                >
                                    <div className="flex items-start gap-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
                                                {index + 1}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                                                {officer.name}
                                            </h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                <div className="flex items-center gap-2">
                                                    <Badge className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Designation</p>
                                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                                            {officer.designation || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Mobile</p>
                                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                                            {officer.mobile_number || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Badge className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Buckle Number</p>
                                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                                            {officer.buckle_number || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0" />
                                                    <div className="min-w-0">
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">Duty Location</p>
                                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                                            {officer.duty_location || 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <AlertCircle className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                            <p className="text-gray-500 dark:text-gray-400 text-lg">No officers assigned to this point yet.</p>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                        onClick={onClose}
                        className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function BandobastMap({ points }) {
    const [selectedPoint, setSelectedPoint] = useState(null);

    // Filter points that have valid coordinates
    const validPoints = points?.filter(p => p.latitude && p.longitude) || [];

    if (validPoints.length === 0) {
        return (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
                <p className="text-yellow-800 dark:text-yellow-200">
                    No points with valid coordinates to display on map.
                </p>
            </div>
        );
    }

    // Calculate center point (average of all coordinates)
    const centerLat = validPoints.reduce((sum, p) => sum + parseFloat(p.latitude), 0) / validPoints.length;
    const centerLng = validPoints.reduce((sum, p) => sum + parseFloat(p.longitude), 0) / validPoints.length;

    // Create route coordinates (connect points in order)
    const routeCoordinates = validPoints.map(p => [parseFloat(p.latitude), parseFloat(p.longitude)]);

    return (
        <>
            <div className="w-full h-[500px] rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                <MapContainer
                    center={[centerLat, centerLng]}
                    zoom={13}
                    style={{ height: '100%', width: '100%' }}
                    scrollWheelZoom={true}
                >
                    {/* OpenStreetMap tiles */}
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {/* Auto-fit bounds */}
                    <FitBounds points={validPoints} />

                    {/* Route connecting all points */}
                    {routeCoordinates.length > 1 && (
                        <Polyline
                            positions={routeCoordinates}
                            color="#3b82f6"
                            weight={3}
                            opacity={0.7}
                            dashArray="10, 10"
                        />
                    )}

                    {/* Markers for each point */}
                    {validPoints.map((point, index) => (
                        <Marker
                            key={point.id || index}
                            position={[parseFloat(point.latitude), parseFloat(point.longitude)]}
                        >
                            <Popup maxWidth={280} className="custom-popup">
                                <div className="p-2">
                                    {/* Point Info */}
                                    <div className="mb-3">
                                        <h3 className="font-bold text-base text-gray-900 dark:text-white mb-1">
                                            {point.point_name}
                                        </h3>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1">
                                            <MapPin className="w-3 h-3" />
                                            {point.location || 'N/A'}
                                        </p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex gap-2 mb-3">
                                        <div className="flex-1 bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 text-center">
                                            <p className="text-2xl my-1 font-bold text-blue-600 dark:text-blue-400">
                                                {point.officers_required || 0}
                                            </p>
                                            <p className="text-xs my-1 text-gray-600 dark:text-gray-400">Required</p>
                                        </div>
                                        <div className="flex-1 bg-green-50 dark:bg-green-900/30 rounded-lg p-2 text-center">
                                            <p className="text-2xl my-1 font-bold text-green-600 dark:text-green-400">
                                                {point.assignedOfficers?.length || 0}
                                            </p>
                                            <p className="text-xs my-1 text-gray-600 dark:text-gray-400">Assigned</p>
                                        </div>
                                    </div>

                                    {/* View Staff Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setSelectedPoint(point);
                                        }}
                                        className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2 text-sm shadow-md"
                                    >
                                        <Users className="w-4 h-4" />
                                        View Staff Details
                                    </button>

                                    {/* Point Badge */}
                                    <div className="mt-2 text-center">
                                        <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs px-2 py-1 rounded-full">
                                            Point #{index + 1}
                                        </span>
                                    </div>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>

            {/* Staff List Modal */}
            {selectedPoint && (
                <StaffListModal
                    point={selectedPoint}
                    onClose={() => setSelectedPoint(null)}
                />
            )}
        </>
    );
}
