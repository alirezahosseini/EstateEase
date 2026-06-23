import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faDollarSign,
  faRulerCombined,
  faHouseChimney,
  faLayerGroup,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { FilterState } from "../types";
import {
  locationOptions,
  placeTypeOptions,
  amenityOptions,
} from "../data/properties";

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function FilterSidebar({
  filters,
  onChange,
  isOpen,
  onClose,
}: FilterSidebarProps) {
  const toggleArray = (
    key: keyof FilterState,
    value: string,
    isArray: boolean
  ) => {
    if (!isArray) return;
    const current = (filters[key] as string[]) || [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ ...filters, [key]: next });
  };

  const clearAll = () => {
    onChange({
      locations: [],
      priceRange: null,
      customMin: 10000,
      customMax: 50000,
      areaMin: "",
      areaMax: "",
      placeTypes: [],
      amenities: [],
    });
  };

  const filterCount =
    filters.locations.length +
    (filters.priceRange ? 1 : 0) +
    (filters.areaMin || filters.areaMax ? 1 : 0) +
    filters.placeTypes.length +
    filters.amenities.length;

  const SectionHeader = ({
    icon,
    title,
    onClear,
  }: {
    icon: any;
    title: string;
    onClear?: () => void;
  }) => (
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
        <FontAwesomeIcon icon={icon} className="text-slate-500" />
        {title}
      </div>
      {onClear && (
        <button
          onClick={onClear}
          className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-[10px] text-slate-500 hover:bg-slate-200"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-30 bg-slate-900/20 backdrop-blur-sm md:hidden"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-[320px] overflow-y-auto rounded-none bg-white p-5 shadow-[4px_0_24px_rgba(15,23,42,0.08)] transition-transform duration-300 md:static md:z-auto md:h-auto md:w-full md:rounded-2xl md:shadow-none ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="mb-5 flex items-center justify-between md:hidden">
          <h3 className="text-lg font-bold text-slate-900">Custom Filter</h3>
          <button onClick={onClose} className="text-slate-500">
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>

        <div className="mb-5 flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900">Custom Filter</h3>
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700"
          >
            Clear all {filterCount > 0 && `(${filterCount})`}
          </button>
        </div>

        {/* Location */}
        <div className="mb-5 rounded-xl border border-slate-100 p-4">
          <SectionHeader
            icon={faLocationDot}
            title="Location"
            onClear={() => onChange({ ...filters, locations: [] })}
          />
          <div className="space-y-2.5">
            {locationOptions.map((loc) => (
              <label
                key={loc}
                className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700"
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 transition checked:border-blue-600 checked:bg-blue-600"
                    checked={filters.locations.includes(loc)}
                    onChange={() => toggleArray("locations", loc, true)}
                  />
                  <svg
                    className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7L5.5 10.5L12 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {loc}
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-5 rounded-xl border border-slate-100 p-4">
          <SectionHeader
            icon={faDollarSign}
            title="Price Range"
            onClear={() =>
              onChange({
                ...filters,
                priceRange: null,
                customMin: 10000,
                customMax: 50000,
              })
            }
          />
          <div className="space-y-2.5">
            {[
              { id: "under-1000", label: "Under $1,000" },
              { id: "1000-15000", label: "$1,000 - $15,000" },
              { id: "over-15000", label: "More Than $15,000" },
              { id: "custom", label: "Custom" },
            ].map((opt) => (
              <label
                key={opt.id}
                className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700"
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <input
                    type="radio"
                    name="priceRange"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 transition checked:border-blue-600 checked:bg-blue-600"
                    checked={filters.priceRange === (opt.id as any)}
                    onChange={() =>
                      onChange({ ...filters, priceRange: opt.id as any })
                    }
                  />
                  <span className="pointer-events-none absolute h-2 w-2 rounded-full bg-white opacity-0 peer-checked:opacity-100" />
                </div>
                {opt.label}
              </label>
            ))}
          </div>

          {filters.priceRange === "custom" && (
            <div className="mt-4">
              <div className="mb-2 flex justify-between text-xs font-semibold text-slate-500">
                <span>${filters.customMin.toLocaleString()}</span>
                <span>${filters.customMax.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="100000"
                step="1000"
                value={filters.customMax}
                onChange={(e) =>
                  onChange({
                    ...filters,
                    customMax: Number(e.target.value),
                    customMin: Math.min(
                      filters.customMin,
                      Number(e.target.value) - 5000
                    ),
                  })
                }
                className="w-full"
              />
              <div className="mt-3 flex gap-2">
                <input
                  type="number"
                  value={filters.customMin}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      customMin: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
                  placeholder="Min"
                />
                <input
                  type="number"
                  value={filters.customMax}
                  onChange={(e) =>
                    onChange({
                      ...filters,
                      customMax: Number(e.target.value),
                    })
                  }
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-blue-500"
                  placeholder="Max"
                />
              </div>
            </div>
          )}
        </div>

        {/* Land Area */}
        <div className="mb-5 rounded-xl border border-slate-100 p-4">
          <SectionHeader
            icon={faRulerCombined}
            title="Land Area"
            onClear={() =>
              onChange({ ...filters, areaMin: "", areaMax: "" })
            }
          />
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <input
                type="number"
                value={filters.areaMin}
                onChange={(e) =>
                  onChange({ ...filters, areaMin: e.target.value })
                }
                placeholder="Min"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                sq ft
              </span>
            </div>
            <div className="relative flex-1">
              <input
                type="number"
                value={filters.areaMax}
                onChange={(e) =>
                  onChange({ ...filters, areaMax: e.target.value })
                }
                placeholder="Max"
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                sq ft
              </span>
            </div>
          </div>
        </div>

        {/* Type of Place */}
        <div className="mb-5 rounded-xl border border-slate-100 p-4">
          <SectionHeader
            icon={faHouseChimney}
            title="Type Of Place"
            onClear={() => onChange({ ...filters, placeTypes: [] })}
          />
          <div className="space-y-2.5">
            {placeTypeOptions.map((opt) => (
              <label
                key={opt.value}
                className="flex cursor-pointer items-center gap-3 text-sm font-medium text-slate-700"
              >
                <div className="relative flex h-5 w-5 items-center justify-center">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-slate-300 transition checked:border-blue-600 checked:bg-blue-600"
                    checked={filters.placeTypes.includes(opt.value)}
                    onChange={() =>
                      toggleArray("placeTypes", opt.value, true)
                    }
                  />
                  <svg
                    className="pointer-events-none absolute h-3 w-3 text-white opacity-0 peer-checked:opacity-100"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7L5.5 10.5L12 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="rounded-xl border border-slate-100 p-4">
          <SectionHeader
            icon={faLayerGroup}
            title="Amenities"
            onClear={() => onChange({ ...filters, amenities: [] })}
          />
          <div className="flex flex-wrap gap-2">
            {amenityOptions.map((amenity) => {
              const active = filters.amenities.includes(amenity);
              return (
                <button
                  key={amenity}
                  onClick={() => toggleArray("amenities", amenity, true)}
                  className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${
                    active
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                      : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {amenity}
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}
