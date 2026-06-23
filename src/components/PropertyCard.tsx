import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookmark,
  faLocationDot,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { motion } from "framer-motion";
import type { Property } from "../types";

interface PropertyCardProps {
  property: Property;
  isActive?: boolean;
  isFavorite?: boolean;
  onSelect: (p: Property) => void;
  onToggleFavorite: (id: string) => void;
}

export default function PropertyCard({
  property,
  isActive,
  isFavorite,
  onSelect,
  onToggleFavorite,
}: PropertyCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ y: -4 }}
      onClick={() => onSelect(property)}
      className={`group cursor-pointer overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(15,23,42,0.06)] transition-all ${
        isActive ? "ring-2 ring-blue-600" : "hover:shadow-[0_8px_30px_rgba(15,23,42,0.1)]"
      }`}
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-wide text-slate-800 backdrop-blur-sm">
          {property.type}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(property.id);
          }}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-lg transition ${
            isFavorite
              ? "bg-blue-600 text-white"
              : "bg-white/90 text-slate-400 backdrop-blur-sm hover:text-blue-600"
          }`}
        >
          <FontAwesomeIcon
            icon={isFavorite ? faBookmark : faBookmarkRegular}
            className="text-sm"
          />
        </button>
      </div>

      <div className="p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h3 className="text-sm font-bold text-slate-900 line-clamp-1">
            {property.title}
          </h3>
        </div>
        <div className="mb-3 flex items-center gap-1 text-xs text-slate-500">
          <FontAwesomeIcon icon={faLocationDot} className="text-[10px]" />
          <span className="line-clamp-1">{property.address}</span>
        </div>

        <div className="flex items-end justify-between">
          <div>
            <span className="text-lg font-extrabold text-blue-600">
              ${property.price.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-400">
              /{property.period}
            </span>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1 text-xs font-bold text-amber-600">
            <FontAwesomeIcon icon={faStar} className="text-[10px]" />
            {property.rating}
            <span className="font-medium text-slate-400">/5</span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
