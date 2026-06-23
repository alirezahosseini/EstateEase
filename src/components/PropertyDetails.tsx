import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faStar,
  faBed,
  faBath,
  faDoorOpen,
  faKitchenSet,
  faRulerCombined,
  faCar,
  faPhone,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import type { Property } from "../types";
import MapView from "./MapView";

interface PropertyDetailsProps {
  property: Property;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onBack?: () => void;
}

const tabs = ["Overview", "Reviews", "About"] as const;

export default function PropertyDetails({
  property,
  isFavorite,
  onToggleFavorite,
  onBack,
}: PropertyDetailsProps) {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.35 }}
      className="h-fit rounded-2xl bg-white p-4 shadow-[0_4px_24px_rgba(15,23,42,0.06)] lg:p-5"
    >
      {/* Image gallery */}
      <div className="mb-4 grid grid-cols-3 gap-2">
        <div className="col-span-2 h-40 overflow-hidden rounded-xl md:h-48">
          <img
            src={property.images[0]}
            alt={property.title}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="col-span-1 flex flex-col gap-2">
          {property.images.slice(1, 3).map((img, i) => (
            <div
              key={i}
              className="flex-1 overflow-hidden rounded-xl bg-slate-100"
            >
              <img
                src={img}
                alt={`${property.title} ${i + 2}`}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
          {property.images.length < 3 && (
            <div className="flex-1 rounded-xl bg-slate-100" />
          )}
        </div>
      </div>

      {/* Title row */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-900 lg:text-xl">
            {property.title}
          </h2>
          <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{property.address}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xl font-extrabold text-slate-900 lg:text-2xl">
            ${property.price.toLocaleString()}
          </div>
          <div className="text-xs font-semibold text-slate-400">
            /{property.period}
          </div>
        </div>
      </div>

      {/* Rating pill */}
      <div className="mb-4 flex items-center gap-3">
        <div className="flex items-center gap-1.5 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-600">
          <FontAwesomeIcon icon={faStar} />
          {property.rating}
          <span className="font-medium text-slate-400">
            ({property.reviews} reviews)
          </span>
        </div>
        <button
          onClick={() => onToggleFavorite(property.id)}
          className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-bold transition ${
            isFavorite
              ? "bg-blue-50 text-blue-600"
              : "bg-slate-50 text-slate-500 hover:bg-slate-100"
          }`}
        >
          <FontAwesomeIcon
            icon={isFavorite ? faBookmark : faBookmarkRegular}
          />
          {isFavorite ? "Saved" : "Save"}
        </button>
      </div>

      {/* Tabs */}
      <div className="mb-4 flex items-center gap-1 border-b border-slate-100">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-3 py-2.5 text-sm font-bold transition ${
              activeTab === tab ? "text-slate-900" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === "Overview" && (
            <div>
              <h4 className="mb-1 text-sm font-bold text-slate-900">
                Description
              </h4>
              <p className="mb-5 text-sm leading-relaxed text-slate-500">
                {property.description}
              </p>

              <div className="mb-5 grid grid-cols-3 gap-3">
                <div className="flex flex-col gap-1.5 rounded-xl bg-slate-50 p-3">
                  <FontAwesomeIcon
                    icon={faDoorOpen}
                    className="text-slate-500"
                  />
                  <span className="text-xs font-bold text-slate-900">
                    {property.rooms} Rooms
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 rounded-xl bg-slate-50 p-3">
                  <FontAwesomeIcon icon={faBed} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-900">
                    {property.beds} Beds
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 rounded-xl bg-slate-50 p-3">
                  <FontAwesomeIcon icon={faBath} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-900">
                    {property.baths} Baths
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 rounded-xl bg-slate-50 p-3">
                  <FontAwesomeIcon
                    icon={faKitchenSet}
                    className="text-slate-500"
                  />
                  <span className="text-xs font-bold text-slate-900">
                    {property.kitchens} Kitchen
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 rounded-xl bg-slate-50 p-3">
                  <FontAwesomeIcon
                    icon={faRulerCombined}
                    className="text-slate-500"
                  />
                  <span className="text-xs font-bold text-slate-900">
                    {property.area.toLocaleString()} sqft
                  </span>
                </div>
                <div className="flex flex-col gap-1.5 rounded-xl bg-slate-50 p-3">
                  <FontAwesomeIcon icon={faCar} className="text-slate-500" />
                  <span className="text-xs font-bold text-slate-900">
                    {property.garage} Garage
                  </span>
                </div>
              </div>

              <div className="mb-5">
                <h4 className="mb-2 text-sm font-bold text-slate-900">
                  Amenities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {property.amenities.map((a) => (
                    <span
                      key={a}
                      className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "Reviews" && (
            <div className="space-y-3">
              {[
                {
                  name: "Sarah Jenkins",
                  rating: 5,
                  text: "Absolutely loved staying here. The place is spotless and the neighborhood is quiet.",
                },
                {
                  name: "Michael Chen",
                  rating: 4,
                  text: "Great value for money. The host was responsive and the amenities were exactly as described.",
                },
                {
                  name: "Putri Anggraini",
                  rating: 5,
                  text: "Beautiful home with a lovely garden. Perfect for our family vacation.",
                },
              ].map((review, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-slate-100 p-3"
                >
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-900">
                      {review.name}
                    </span>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                      <FontAwesomeIcon icon={faStar} />
                      {review.rating}
                    </div>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-500">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "About" && (
            <div className="space-y-4 text-sm text-slate-500">
              <p>
                This property is managed by <strong className="text-slate-900">{property.agent.name}</strong>. Listed on EstateEase and verified for quality and accuracy.
              </p>
              <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3">
                <img
                  src={property.agent.avatar}
                  alt={property.agent.name}
                  className="h-11 w-11 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-slate-900">
                    {property.agent.name}
                  </div>
                  <div className="text-xs">Licensed EstateEase Agent</div>
                </div>
                <a
                  href={`tel:${property.agent.phone}`}
                  className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white"
                >
                  <FontAwesomeIcon icon={faPhone} className="text-xs" />
                </a>
              </div>
              <ul className="list-disc space-y-1 pl-5 text-xs">
                <li>Instant booking available</li>
                <li>Free cancellation within 48 hours</li>
                <li>24/7 guest support</li>
                <li>Security deposit required</li>
              </ul>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Actions */}
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50">
          Contact Agent
        </button>
        <button className="rounded-xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700">
          Order Now
        </button>
      </div>

      {/* Map */}
      <div className="mt-5 overflow-hidden rounded-2xl">
        <MapView coordinates={property.coordinates} title={property.title} />
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="mt-4 w-full rounded-xl bg-slate-100 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-200"
        >
          Back to listings
        </button>
      )}
    </motion.div>
  );
}
