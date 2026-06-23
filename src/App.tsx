import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LoadingScreen from "./components/LoadingScreen";
import Navbar from "./components/Navbar";
import MobileNav from "./components/MobileNav";
import DashboardPage from "./components/DashboardPage";
import RentPage from "./pages/RentPage";
import FavoritesPage from "./pages/FavoritesPage";
import HelpPage from "./pages/HelpPage";
import ServicesPage from "./pages/ServicesPage";
import BlogPage from "./pages/BlogPage";
import type { Page, Property } from "./types";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activePage, setActivePage] = useState<Page>("buy");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("estateease_favorites");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Persist favorites
  useEffect(() => {
    localStorage.setItem("estateease_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const handleToggleFavorite = useCallback((id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  }, []);

  const handleSelectProperty = useCallback((_p: Property) => {
    setActivePage("buy");
    // Dashboard handles modal internally; this just ensures we are on buy tab
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "buy":
      case "property":
        return (
          <DashboardPage
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            searchQuery={searchQuery}
          />
        );
      case "rent":
        return <RentPage />;
      case "favorites":
        return (
          <FavoritesPage
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelect={handleSelectProperty}
          />
        );
      case "help":
        return <HelpPage />;
      case "services":
        return <ServicesPage />;
      case "blog":
        return <BlogPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence>
        {loading && (
          <LoadingScreen onComplete={() => setLoading(false)} />
        )}
      </AnimatePresence>

      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex min-h-screen flex-col bg-[#eef0f4] pb-20 md:pb-0"
        >
          <header className="p-3 md:p-5">
            <Navbar
              activePage={activePage}
              onNavigate={setActivePage}
              searchQuery={searchQuery}
              onSearch={setSearchQuery}
            />
          </header>

          <main className="flex-1 px-3 pb-6 pt-1 md:px-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </main>

          <MobileNav activePage={activePage} onNavigate={setActivePage} />
        </motion.div>
      )}
    </>
  );
}
