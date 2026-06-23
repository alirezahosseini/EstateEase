import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faHeadset,
  faMessage,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How do I schedule a property viewing?",
    a: "Open any property and click Contact Agent. You can request a viewing time that works for you.",
  },
  {
    q: "Are the listings verified?",
    a: "Yes. Every listing on EstateEase is reviewed and verified by our team before it goes live.",
  },
  {
    q: "Can I save properties to view later?",
    a: "Absolutely. Click the bookmark icon on any card to add it to your Favorites.",
  },
  {
    q: "What payment methods are accepted?",
    a: "We accept bank transfer, credit/debit cards, and secure escrow payments for rentals.",
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_340px]"
    >
      <div className="rounded-2xl bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] md:p-8">
        <h1 className="mb-6 text-2xl font-extrabold text-slate-900">
          Help Center
        </h1>
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-slate-100"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-3.5 text-left"
              >
                <span className="text-sm font-bold text-slate-900">{f.q}</span>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`text-xs text-slate-400 transition ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-4 pb-4 text-sm leading-relaxed text-slate-500">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>

      <div className="h-fit space-y-4">
        {[
          {
            icon: faHeadset,
            title: "Live Chat",
            text: "Talk to our support team in real-time.",
            action: "Start chat",
          },
          {
            icon: faPhone,
            title: "Call Us",
            text: "+62 21 1234 5678",
            action: "Call now",
          },
          {
            icon: faMessage,
            title: "Email Support",
            text: "support@estateease.id",
            action: "Send email",
          },
        ].map((c, i) => (
          <div
            key={i}
            className="rounded-2xl bg-white p-5 shadow-[0_4px_24px_rgba(15,23,42,0.06)]"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <FontAwesomeIcon icon={c.icon} />
            </div>
            <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
            <p className="mt-1 text-xs text-slate-500">{c.text}</p>
            <button className="mt-3 rounded-lg bg-blue-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700">
              {c.action}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
