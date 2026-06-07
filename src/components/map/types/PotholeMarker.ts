import L from 'leaflet';

export const createCustomPotholeIcon = (status: string) => {
    const color = status === 'active' ? '#f97316' : '#22c55e'; // Turuncu veya Yeşil

    return new L.DivIcon({
        className: 'custom-marker',
        html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-8 h-8 bg-${status === 'active' ? 'orange' : 'green'}-500/30 rounded-full animate-ping"></div>
        <div class="relative w-4 h-4 bg-slate-900 border-2 border-[${color}] rounded-full shadow-lg"></div>
      </div>
    `,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });
};

export const createUserLocationIcon = () => {
    return new L.DivIcon({
        className: 'user-location-marker',
        html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-12 h-12 bg-blue-500/30 rounded-full animate-ping"></div>
        <div class="relative w-5 h-5 bg-blue-500 border-2 border-white rounded-full shadow-xl"></div>
      </div>
    `,
        iconSize: [48, 48],
        iconAnchor: [24, 24],
    });
};