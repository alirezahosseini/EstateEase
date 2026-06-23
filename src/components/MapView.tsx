import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";

interface MapViewProps {
  coordinates: { lat: number; lng: number };
  title: string;
}

export default function MapView({ coordinates, title }: MapViewProps) {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-2xl bg-[#e5e9ef]">
      {/* Stylized map background */}
      <svg
        className="absolute inset-0 h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 400 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="400" height="200" fill="#e8edf3" />
        {/* Roads */}
        <path d="M0 80 H400" stroke="#ffffff" strokeWidth="18" />
        <path d="M0 150 H400" stroke="#ffffff" strokeWidth="14" />
        <path d="M120 0 V200" stroke="#ffffff" strokeWidth="16" />
        <path d="M280 0 V200" stroke="#ffffff" strokeWidth="12" />
        {/* Parks */}
        <rect x="20" y="20" width="70" height="40" rx="8" fill="#bbf7d0" />
        <rect x="300" y="110" width="80" height="50" rx="8" fill="#bbf7d0" />
        <rect x="150" y="10" width="90" height="35" rx="8" fill="#bbf7d0" />
        {/* Water */}
        <path d="M320 180 Q360 160 400 180 V200 H320 Z" fill="#bfdbfe" />
        {/* Blocks */}
        <rect x="140" y="100" width="50" height="35" rx="4" fill="#d1d5db" />
        <rect x="210" y="55" width="45" height="30" rx="4" fill="#d1d5db" />
        <rect x="30" y="110" width="55" height="30" rx="4" fill="#d1d5db" />
      </svg>

      {/* Marker - mapped to stylized map bounds (approx Jakarta/Semarang area) */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{
          left: `${Math.min(
            92,
            Math.max(8, ((coordinates.lng - 105) / 7.5) * 100)
          )}%`,
          top: `${Math.min(
            92,
            Math.max(8, ((-coordinates.lat - 6) / 1.5) * 100)
          )}%`,
        }}
      >
        <div className="map-pin-pulse flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg">
          <FontAwesomeIcon icon={faLocationDot} />
        </div>
        <div className="mt-1.5 whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-[10px] font-bold text-white shadow-lg">
          {title}
        </div>
      </div>

      {/* Other decorative pins */}
      <div className="absolute left-[22%] top-[35%] flex h-7 w-7 items-center justify-center rounded-full bg-amber-400 text-white shadow-md">
        <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
      </div>
      <div className="absolute left-[72%] top-[68%] flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-md">
        <FontAwesomeIcon icon={faLocationDot} className="text-xs" />
      </div>
    </div>
  );
}
