import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalculator,
  faFileContract,
  faCamera,
  faTruckMoving,
  faPaintRoller,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const services = [
  {
    icon: faCalculator,
    title: "Mortgage Calculator",
    text: "Estimate monthly payments and find the best financing options.",
  },
  {
    icon: faFileContract,
    title: "Legal Assistance",
    text: "Expert help with contracts, titles, and closing paperwork.",
  },
  {
    icon: faCamera,
    title: "Property Photography",
    text: "Professional photos and virtual tours to showcase your listing.",
  },
  {
    icon: faTruckMoving,
    title: "Moving Services",
    text: "Trusted partners to help you move to your new home.",
  },
  {
    icon: faPaintRoller,
    title: "Home Staging",
    text: "Make your property stand out with curated staging.",
  },
  {
    icon: faHandshake,
    title: "Agent Matching",
    text: "We connect you with the right agent for your needs.",
  },
];

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
          Our Services
        </h1>
        <p className="mt-2 text-sm text-slate-500 md:text-base">
          Everything you need to buy, sell, or rent a home in one place.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FontAwesomeIcon icon={s.icon} className="text-lg" />
            </div>
            <h3 className="mb-1 text-base font-bold text-slate-900">
              {s.title}
            </h3>
            <p className="text-sm leading-relaxed text-slate-500">{s.text}</p>
            <button className="mt-4 text-sm font-bold text-blue-600 hover:text-blue-700">
              Learn more →
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
