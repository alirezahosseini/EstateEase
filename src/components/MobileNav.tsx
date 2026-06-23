import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faTags,
  faHeart,
  faBriefcase,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import type { Page } from "../types";

interface MobileNavProps {
  activePage: Page;
  onNavigate: (page: Page) => void;
}

const items: { page: Page; label: string; icon: any }[] = [
  { page: "buy", label: "Buy", icon: faHouse },
  { page: "rent", label: "Rent", icon: faTags },
  { page: "favorites", label: "Saved", icon: faHeart },
  { page: "services", label: "Services", icon: faBriefcase },
  { page: "blog", label: "Blog", icon: faNewspaper },
];

export default function MobileNav({ activePage, onNavigate }: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-100 bg-white px-2 pb-safe pt-2 shadow-[0_-4px_20px_rgba(15,23,42,0.06)] md:hidden">
      <div className="mx-auto flex max-w-md items-center justify-around">
        {items.map((item) => {
          const active = activePage === item.page;
          return (
            <button
              key={item.page}
              onClick={() => onNavigate(item.page)}
              className={`flex flex-col items-center gap-1 rounded-xl px-3 py-2 transition ${
                active ? "text-blue-600" : "text-slate-400"
              }`}
            >
              <FontAwesomeIcon icon={item.icon} className="text-lg" />
              <span className="text-[10px] font-bold">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
