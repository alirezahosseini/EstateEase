import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faMagnifyingGlass,
  faBell,
  faChevronDown,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import type { Page } from "../types";

interface NavbarProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
  searchQuery: string;
  onSearch: (q: string) => void;
}

const navItems: { page: Page; label: string }[] = [
  { page: "buy", label: "Buy" },
  { page: "rent", label: "Rent" },
  { page: "favorites", label: "Favorites" },
  { page: "help", label: "Help" },
  { page: "services", label: "Services" },
  { page: "blog", label: "Blog" },
];

export default function Navbar({
  activePage,
  onNavigate,
  searchQuery,
  onSearch,
}: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 mx-auto flex w-full max-w-[1600px] items-center justify-between gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_4px_24px_rgba(15,23,42,0.05)] md:px-6">
      {/* Logo */}
      <button
        onClick={() => onNavigate("buy")}
        className="flex items-center gap-2.5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
          <FontAwesomeIcon icon={faHouse} className="text-sm" />
        </div>
        <span className="hidden text-lg font-bold text-slate-900 sm:inline">
          EstateEase
        </span>
      </button>

      {/* Desktop nav */}
      <div className="hidden items-center gap-1 rounded-xl bg-slate-50 p-1 lg:flex">
        {navItems.map((item) => (
          <button
            key={item.page}
            onClick={() => onNavigate(item.page)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              activePage === item.page
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="hidden flex-1 items-center justify-end md:flex">
        <div className="relative flex w-full max-w-[260px] items-center">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-3 text-slate-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search Anything..."
            className="h-10 w-full rounded-xl border border-slate-100 bg-slate-50 pl-9 pr-16 text-sm font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-200 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />
          {searchQuery && (
            <button
              onClick={() => onSearch("")}
              className="absolute right-9 text-slate-400 hover:text-slate-600"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          )}
          <button className="absolute right-2 flex h-6 w-6 items-center justify-center rounded-md bg-slate-200 text-slate-600">
            <FontAwesomeIcon icon={faBars} className="text-[10px]" />
          </button>
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition hover:bg-slate-100">
          <FontAwesomeIcon icon={faBell} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        <div className="hidden items-center gap-2 pl-2 md:flex">
          <img
            src="https://i.pravatar.cc/150?u=john"
            alt="John Doe"
            className="h-9 w-9 rounded-full object-cover ring-2 ring-slate-100"
          />
          <div className="hidden flex-col items-start lg:flex">
            <span className="text-sm font-bold text-slate-900">John Doe</span>
            <span className="text-xs text-slate-500">doe@gmail.com</span>
          </div>
          <FontAwesomeIcon icon={faChevronDown} className="text-xs text-slate-400" />
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-slate-700 lg:hidden"
        >
          <FontAwesomeIcon icon={mobileOpen ? faXmark : faBars} />
        </button>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-2xl border border-slate-100 bg-white p-3 shadow-xl lg:hidden">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => {
                  onNavigate(item.page);
                  setMobileOpen(false);
                }}
                className={`rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                  activePage === item.page
                    ? "bg-blue-50 text-blue-600"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="mt-3 border-t border-slate-100 pt-3">
            <div className="relative flex items-center">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-3 text-slate-400"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search Anything..."
                className="h-10 w-full rounded-xl border border-slate-100 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-blue-200 focus:bg-white"
              />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
