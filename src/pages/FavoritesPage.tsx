import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropertyCard from "../components/PropertyCard";
import PropertyDetails from "../components/PropertyDetails";
import EmptyState from "../components/EmptyState";
import { properties } from "../data/properties";
import type { Property } from "../types";

interface FavoritesPageProps {
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelect: (p: Property) => void;
}

export default function FavoritesPage({
  favorites,
  onToggleFavorite,
  onSelect,
}: FavoritesPageProps) {
  const [selected, setSelected] = useState<Property | null>(null);

  const favProperties = useMemo(
    () => properties.filter((p) => favorites.includes(p.id)),
    [favorites]
  );

  const handleSelect = (p: Property) => {
    setSelected(p);
    onSelect(p);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-6xl"
    >
      <div className="mb-5 flex items-center justify-between">
        <h1 className="text-xl font-extrabold text-slate-900 md:text-2xl">
          Your Favorites
        </h1>
        <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
          {favProperties.length} saved
        </span>
      </div>

      {favProperties.length === 0 ? (
        <EmptyState
          title="No favorites yet"
          description="Start saving properties you love and they will appear here."
        />
      ) : (
        <motion.div
          layout
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {favProperties.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isFavorite
                onSelect={handleSelect}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-white p-4 lg:static lg:z-auto lg:mt-6 lg:rounded-2xl lg:bg-transparent lg:p-0"
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
    </motion.div>
  );
}
