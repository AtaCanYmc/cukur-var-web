import L from 'leaflet';
import warningIconUrl from '../../../assets/warning.svg';
import pinIconUrl from '../../../assets/pin.svg';

export const createCustomPotholeIcon = () => {
    return new L.DivIcon({
        className: 'custom-marker',
        html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-10 h-10 bg-orange-500/30 rounded-full animate-ping"></div>
        <img src="${warningIconUrl}" class="relative w-8 h-8 drop-shadow-xl z-10" alt="Warning" />
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

export const createLocationPickerIcon = () => {
    return new L.DivIcon({
        className: 'custom-marker',
        html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute w-10 h-10 bg-orange-500/30 rounded-full animate-ping"></div>
        <img src="${pinIconUrl}" class="relative w-8 h-8 drop-shadow-xl z-10" alt="Warning" />
      </div>
    `,
        iconSize: [40, 40],
        iconAnchor: [20, 36], // Bottom point of the pin
    });
};