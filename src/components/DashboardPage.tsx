import { useState, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faSliders } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";
import FilterSidebar from "./FilterSidebar";
import PropertyCard from "./PropertyCard";
import PropertyDetails from "./PropertyDetails";
import EmptyState from "./EmptyState";
import type { Property, FilterState } from "../types";
import { properties } from "../data/properties";

interface DashboardPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  searchQuery: string;
}

const initialFilters: FilterState = {
  locations: [],
  priceRange: null,
  customMin: 10000,
  customMax: 50000,
  areaMin: "",
  areaMax: "",
  placeTypes: [],
  amenities: [],
};

export default function DashboardPage({
  favorites,
  onToggleFavorite,
  searchQuery,
}: DashboardPageProps) {
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [selected, setSelected] = useState<Property | null>(properties[2]);
  const [filterOpen, setFilterOpen] = useState(false);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches =
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q);
        if (!matches) return false;
      }

      // Location
      if (filters.locations.length && !filters.locations.includes(p.location)) {
        return false;
      }

      // Price
      if (filters.priceRange) {
        const price = p.price;
        if (filters.priceRange === "under-1000" && price >= 1000) return false;
        if (
          filters.priceRange === "1000-15000" &&
          (price < 1000 || price > 15000)
        )
          return false;
        if (filters.priceRange === "over-15000" && price <= 15000) return false;
        if (
          filters.priceRange === "custom" &&
          (price < filters.customMin || price > filters.customMax)
        )
          return false;
      }

      // Area
      const min = filters.areaMin ? Number(filters.areaMin) : null;
      const max = filters.areaMax ? Number(filters.areaMax) : null;
      if (min !== null && p.area < min) return false;
      if (max !== null && p.area > max) return false;

      // Place type
      if (
        filters.placeTypes.length &&
        !filters.placeTypes.includes(p.placeType)
      ) {
        return false;
      }

      // Amenities
      if (
        filters.amenities.length &&
        !filters.amenities.every((a) => p.amenities.includes(a))
      ) {
        return false;
      }

      return true;
    });
  }, [filters, searchQuery]);

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr_380px]">
      {/* Filters */}
      <FilterSidebar
        filters={filters}
        onChange={setFilters}
        isOpen={filterOpen}
        onClose={() => setFilterOpen(false)}
      />

      {/* Listings */}
      <section className="min-w-0">
        <div className="mb-4 flex items-center justify-between md:hidden">
          <h2 className="text-lg font-bold text-slate-900">
            {filtered.length} Properties
          </h2>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm"
          >
            <FontAwesomeIcon icon={faFilter} />
            Filters
          </button>
        </div>

        <div className="mb-4 hidden items-center justify-between md:flex">
          <h2 className="text-base font-bold text-slate-900">
            {filtered.length} Properties found
          </h2>
          <button className="flex items-center gap-2 rounded-lg bg-white px-3 py-1.5 text-xs font-bold text-slate-500 shadow-sm">
            <FontAwesomeIcon icon={faSliders} />
            Sort by recommended
          </button>
        </div>

        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
          >
            <AnimatePresence>
              {filtered.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  isActive={selected?.id === p.id}
                  isFavorite={favorites.includes(p.id)}
                  onSelect={(prop) => {
                    setSelected(prop);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </section>

      {/* Details panel - hidden on mobile unless selected; shown on desktop */}
      <aside className="hidden lg:block">
        <AnimatePresence mode="wait">
          {selected ? (
            <PropertyDetails
              key={selected.id}
              property={selected}
              isFavorite={favorites.includes(selected.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ) : (
            <EmptyState
              title="Select a property"
              description="Click any property card to view full details here."
            />
          )}
        </AnimatePresence>
      </aside>

      {/* Mobile details modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white p-4 lg:hidden"
          >
            <PropertyDetails
              property={selected}
              isFavorite={favorites.includes(selected.id)}
              onToggleFavorite={onToggleFavorite}
              onBack={() => setSelected(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
