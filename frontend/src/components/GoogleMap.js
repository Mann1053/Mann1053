"use client";

import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GoogleMap = ({ locations, height = "400px" }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
        version: "weekly",
      });

      try {
        const google = await loader.load();
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 20.5937, lng: 78.9629 }, // Center of India
          zoom: 5,
        });

        mapInstance.current = map;

        // Clear existing markers
        markers.current.forEach((marker) => marker.setMap(null));
        markers.current = [];

        // Add markers for each location
        locations.forEach((location) => {
          if (location.latitude && location.longitude) {
            const marker = new google.maps.Marker({
              position: {
                lat: parseFloat(location.latitude),
                lng: parseFloat(location.longitude),
              },
              map: map,
              title: location.towerLocation,
            });

            // Add info window
            const infoWindow = new google.maps.InfoWindow({
              content: `
                <div class="p-2">
                  <h3 class="font-bold">${location.towerLocation}</h3>
                  <p>Call Count: ${location.callCount}</p>
                  <p>Unique Numbers: ${location.uniqueNumbers}</p>
                </div>
              `,
            });

            marker.addListener("click", () => {
              infoWindow.open(map, marker);
            });

            markers.current.push(marker);
          }
        });

        // Fit bounds to show all markers
        if (markers.current.length > 0) {
          const bounds = new google.maps.LatLngBounds();
          markers.current.forEach((marker) =>
            bounds.extend(marker.getPosition())
          );
          map.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    if (locations && locations.length > 0) {
      initMap();
    }

    return () => {
      // Cleanup markers when component unmounts
      markers.current.forEach((marker) => marker.setMap(null));
      markers.current = [];
    };
  }, [locations]);

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: height,
        borderRadius: "8px",
      }}
    />
  );
};

export default GoogleMap;
