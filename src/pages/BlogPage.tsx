import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faUser } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const posts = [
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    category: "Tips",
    title: "10 Tips for First-Time Home Buyers",
    excerpt:
      "Buying your first home is exciting. Here is how to navigate the process with confidence.",
    author: "John Doe",
    readTime: "5 min read",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    category: "Market",
    title: "Jakarta Property Market Trends 2026",
    excerpt:
      "A deep dive into pricing, demand, and what buyers should expect this year.",
    author: "Ari Wibowo",
    readTime: "7 min read",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80",
    category: "Design",
    title: "Modern Interiors for Compact Homes",
    excerpt:
      "Maximize space and style with these smart interior design ideas.",
    author: "Siti Rahayu",
    readTime: "4 min read",
  },
];

export default function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-5xl"
    >
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-extrabold text-slate-900 md:text-3xl">
          EstateEase Blog
        </h1>
        <p className="mt-2 text-sm text-slate-500 md:text-base">
          Insights, tips, and stories from the world of real estate.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <article
            key={i}
            className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="h-44 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-5">
              <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wide text-blue-600">
                {post.category}
              </span>
              <h3 className="mt-3 text-base font-bold text-slate-900">
                {post.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {post.excerpt}
              </p>
              <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faUser} />
                  {post.author}
                </span>
                <span className="flex items-center gap-1">
                  <FontAwesomeIcon icon={faClock} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
