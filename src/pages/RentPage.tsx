import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faHouse, faShieldHalved, faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

export default function RentPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:p-10"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
          Rent with confidence
        </h1>
        <p className="mt-2 text-sm text-slate-500 md:text-base">
          Thousands of verified rental listings, flexible terms, and trusted
          agents.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            icon: faHouse,
            title: "Verified Listings",
            text: "Every rental is checked before going live.",
          },
          {
            icon: faKey,
            title: "Flexible Leases",
            text: "Monthly, yearly, and custom lease options.",
          },
          {
            icon: faShieldHalved,
            title: "Secure Payments",
            text: "Protected transactions and clear contracts.",
          },
          {
            icon: faWandMagicSparkles,
            title: "Easy Application",
            text: "Apply online and get approved faster.",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="rounded-xl border border-slate-100 p-5 transition hover:shadow-md"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FontAwesomeIcon icon={item.icon} />
            </div>
            <h3 className="mb-1 text-sm font-bold text-slate-900">
              {item.title}
            </h3>
            <p className="text-xs leading-relaxed text-slate-500">
              {item.text}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl bg-slate-50 p-6 text-center">
        <h3 className="text-base font-bold text-slate-900">
          Looking for your next home?
        </h3>
        <p className="mt-1 text-sm text-slate-500">
          Switch back to Buy to browse all properties available for rent.
        </p>
      </div>
    </motion.div>
  );
}
