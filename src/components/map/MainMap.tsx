import React from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { createCustomPotholeIcon } from "./types/PotholeMarker.ts";
import type { IPothole } from "./types/Pothole.ts";

interface IMapProps {
    potholes: IPothole[];
    onMarkerClick: (pothole: IPothole) => void;
}

import { useTheme } from "../../context/ThemeContext";

// İzmir Merkez Koordinatları
const IZMIR_CENTER: [number, number] = [38.4237, 27.1428];

export const MainMap: React.FC<IMapProps> = ({ potholes, onMarkerClick }) => {
    const { isDark } = useTheme();

    // Harita stilini (Dark/Light Mode) CartoDB üzerinden çekiyoruz
    const mapUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    return (
        <div className="h-screen w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <MapContainer
                center={IZMIR_CENTER}
                zoom={13}
                zoomControl={false} // Custom zoom kontrolü için kapattık
                className="h-full w-full z-0"
                attributionControl={false}
                key={isDark ? 'dark' : 'light'} // Force remount on theme change to prevent tile glitches
            >
                <TileLayer url={mapUrl} />

                {potholes.map((pothole) => (
                    <Marker
                        key={pothole.id}
                        position={[pothole.lat, pothole.lng]}
                        icon={createCustomPotholeIcon(pothole.status)}
                        eventHandlers={{
                            click: () => onMarkerClick(pothole),
                        }}
                    />
                ))}

                {/* Zoom kontrolünü sağ alta, Navigasyonun üzerine alıyoruz */}
                <ZoomControl position="bottomright" />
            </MapContainer>

            {/* Harita Üzerinde "Overlay" Gradient - Navigasyonun arkasını karartmak için */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-900 to-transparent pointer-events-none z-10" />
        </div>
    );
};