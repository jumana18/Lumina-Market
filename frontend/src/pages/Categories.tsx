import { useState } from "react";
import { motion } from "motion/react";
import { Search, SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import ProductCard from "../components/product/ProductCard";
import api from "../services/api";

const Categories = () => {
  const {
    items: products,
    status,
    error,
  } = useSelector((state: RootState) => state.products);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <p className="text-red-500 mb-4 text-xl font-serif">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-8 py-3 bg-primary text-black rounded-full font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all"
        >
          Retry Connection
        </button>
      </div>
    );
  }

  const categories = Array.from(new Set(products.map((p) => p.category)));

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory
      ? p.category === selectedCategory
      : true;
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <span className="text-primary font-bold tracking-widest uppercase text-xs">
            Curated Selection
          </span>
          <h1 className="text-5xl font-serif font-bold">Our Collections</h1>
          <p className="text-gray-400 max-w-md">
            Browse through our meticulously crafted pieces designed for the
            modern minimalist.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64 bg-white/5 border border-white/10 rounded-full pl-12 pr-6 py-3 focus:border-primary focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${!selectedCategory ? "bg-primary text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${selectedCategory === category ? "bg-primary text-black" : "bg-white/5 text-white hover:bg-white/10"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-32 space-y-4">
          <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto">
            <SlidersHorizontal className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-2xl font-serif font-bold">No results found</h3>
          <p className="text-gray-400">
            Try adjusting your search or filters, or seed the database if it's
            empty.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSearchQuery("");
              }}
              className="text-primary font-bold hover:underline"
            >
              Clear all filters
            </button>
            <button
              onClick={async () => {
                try {
                  await api.get("/products/seed");
                  window.location.reload();
                } catch (err) {
                  alert("Failed to seed database");
                }
              }}
              className="px-6 py-2 border border-primary text-primary rounded-full hover:bg-primary hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
            >
              Seed Database
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
