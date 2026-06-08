import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, ZoomControl, useMapEvents} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {createCustomPotholeIcon, createUserLocationIcon} from "./types/PotholeMarker.ts";
import type {IPothole} from "./types/Pothole.ts";
import {useTheme} from "../../context/ThemeContext";
import {useDevice} from '../../hooks/useDevice.tsx';

interface IMapProps {
    potholes: IPothole[];
    onMarkerClick: (pothole: IPothole) => void;
}


// İzmir Merkez Koordinatları
const IZMIR_CENTER: [number, number] = [38.4237, 27.1428];

const LocationMarker = () => {
    const [position, setPosition] = useState<[number, number] | null>(null);

    const map = useMapEvents({
        locationfound(e) {
            setPosition([e.latlng.lat, e.latlng.lng]);
            map.flyTo(e.latlng, 15);
        },
    });

    useEffect(() => {
        map.locate();
    }, [map]);

    return position === null ? null : (
        <Marker position={position} icon={createUserLocationIcon()}/>
    );
};

export const MainMap: React.FC<IMapProps> = ({potholes, onMarkerClick}) => {
    const {isDark} = useTheme();
    const {isMobile} = useDevice();

    // Harita stilini (Dark/Light Mode) CartoDB üzerinden çekiyoruz
    const mapUrl = isDark
        ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

    return (
        <div className="h-[100dvh] w-full bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
            <MapContainer
                center={IZMIR_CENTER}
                zoom={13}
                zoomControl={false}
                doubleClickZoom={true}
                touchZoom={true}
                zoomAnimation={true}
                className="h-full w-full z-0"
                attributionControl={false}
                key={isDark ? 'dark' : 'light'}
            >
                <TileLayer url={mapUrl}/>

                {potholes.map((pothole) => (
                    <Marker
                        key={pothole.id}
                        position={[pothole.lat, pothole.lng]}
                        icon={createCustomPotholeIcon()}
                        eventHandlers={{
                            click: () => onMarkerClick(pothole),
                        }}
                    />
                ))}

                {/* Kullanıcının Konumu */}
                <LocationMarker/>

                {/* Zoom kontrolünü sağ alta, Navigasyonun üzerine alıyoruz */}
                {!isMobile && <ZoomControl position="bottomright"/>}
            </MapContainer>

            {/* Harita Üzerinde "Overlay" Gradient - Navigasyonun arkasını karartmak için */}
            <div
                className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-slate-900 to-transparent pointer-events-none z-10"/>
        </div>
    );
};