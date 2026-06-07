import React, {useEffect, useState} from 'react';
import {MapContainer, TileLayer, Marker, Circle, useMap, useMapEvents} from 'react-leaflet';
import {useUploadStore} from '../../store/useUploadStore';
import {Check, X, AlertTriangle} from 'lucide-react';
import L from 'leaflet';
import {useTheme} from '../../context/ThemeContext';

// Fix Leaflet marker icon
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
});

interface IProps {
    onConfirm: () => void;
    onCancel: () => void;
}

const MAX_DISTANCE_METERS = 250;

// Helper to handle map clicks
const LocationMarker = () => {
    const location = useUploadStore(state => state.location);
    const setLocation = useUploadStore(state => state.setLocation);
    const userLocation = useUploadStore(state => state.userLocation);

    useMapEvents({
        click(e) {
            // Check distance
            if (userLocation) {
                setLocation(e.latlng.lat, e.latlng.lng);
            } else {
                setLocation(e.latlng.lat, e.latlng.lng);
            }
        },
    });

    return location ? <Marker position={location}/> : null;
};

// Helper to center map on user location
const RecenterMap = ({lat, lng}: { lat: number; lng: number }) => {
    const map = useMap();
    useEffect(() => {
        map.flyTo([lat, lng], 15);
    }, [lat, lng, map]);
    return null;
};

const IZMIR_CENTER = {lat: 38.4237, lng: 27.1428};

export const LocationPicker: React.FC<IProps> = ({onConfirm, onCancel}) => {
    const location = useUploadStore(state => state.location);
    const userLocation = useUploadStore(state => state.userLocation);
    const setUserLocation = useUploadStore(state => state.setUserLocation);
    const setLocation = useUploadStore(state => state.setLocation);
    const {isDark} = useTheme();
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [geoError, setGeoError] = useState(false);

    const mapUrl = isDark
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const {latitude, longitude} = position.coords;
                    setUserLocation(latitude, longitude);
                    // If no location set yet, set to current
                    const currentLocation = useUploadStore.getState().location;
                    if (!currentLocation) {
                        setLocation(latitude, longitude);
                    }

                    setLoadingLocation(false);
                    setGeoError(false);
                },
                (error) => {
                    console.error("Konum alınamadı", error);

                    setLoadingLocation(false);
                    setGeoError(true);
                }
            );
        } else {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setLoadingLocation(false);
            setGeoError(true);
        }
    }, [setLocation, setUserLocation]); // Run once on mount

    const mapCenter = userLocation || IZMIR_CENTER;

    return (
        <div className="flex flex-col h-full w-full bg-slate-50 dark:bg-slate-900 relative">
            <div className="flex-1 w-full relative z-0">
                {loadingLocation ? (
                    <div className="flex items-center justify-center h-full text-slate-500">
                        Konum alınıyor...
                    </div>
                ) : (
                    <MapContainer
                        center={mapCenter}
                        zoom={15}
                        className="h-full w-full"
                        zoomControl={false}
                        touchZoom={true}
                        doubleClickZoom={false}
                        zoomAnimation={true}
                        attributionControl={false}
                        key={isDark ? 'dark' : 'light'}
                    >
                        <TileLayer url={mapUrl}/>

                        {userLocation && (
                            <>
                                {/* User's Radius Circle */}
                                <Circle
                                    center={userLocation}
                                    radius={MAX_DISTANCE_METERS}
                                    pathOptions={{color: 'orange', fillColor: 'orange', fillOpacity: 0.1}}
                                />

                                {/* Current Location Marker (User) */}
                                <Circle
                                    center={userLocation}
                                    radius={5}
                                    pathOptions={{color: 'blue', fillColor: 'blue', fillOpacity: 1}}
                                />
                            </>
                        )}

                        <LocationMarker/>
                        {userLocation && <RecenterMap lat={userLocation.lat} lng={userLocation.lng}/>}
                    </MapContainer>
                )}

                {/* Overlay Info */}
                <div className="absolute top-4 left-4 right-4 z-[1000] pointer-events-none flex flex-col gap-2">
                    {geoError && (
                        <div
                            className="bg-amber-50 dark:bg-amber-900/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-amber-200 dark:border-amber-800/50 flex gap-3 text-left">
                            <AlertTriangle className="text-amber-600 shrink-0 mt-0.5" size={20}/>
                            <p className="text-[11px] font-medium text-amber-800 dark:text-amber-200 leading-relaxed">
                                Konum izni verilmediği için harita otomatik odaklanamadı. İhbar oluşturmak için haritaya
                                manuel tıklayarak çukurun yerini işaretleyebilir veya tarayıcı ayarlarından izni tekrar
                                açabilirsiniz.
                            </p>
                        </div>
                    )}

                    {!geoError && !loadingLocation && (
                        <div
                            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 text-center">
                            <p className="text-sm font-bold text-slate-800 dark:text-white">Konumu İşaretleyin</p>
                            <p className="text-xs text-slate-500 mt-1">
                                Şu anki konumunuzdan en fazla <span
                                className="text-orange-600 font-bold">250m</span> uzağı seçebilirsiniz.
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="p-6 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 z-10">
                <button
                    disabled={!location}
                    onClick={onConfirm}
                    className={`w-full py-4 rounded-2xl font-black text-white text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 ${location
                        ? 'bg-orange-600 hover:bg-orange-700 shadow-orange-500/30'
                        : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                    }`}
                >
                    Konumu Onayla
                    <Check size={20}/>
                </button>
                <button
                    onClick={onCancel}
                    className="w-full py-4 rounded-2xl font-black text-white text-lg shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 bg-slate-300 dark:bg-slate-700 cursor-pointer mt-3"
                >
                    İptal
                    <X size={20}/>
                </button>
            </div>
        </div>
    );
};
