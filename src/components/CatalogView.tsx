import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, Heart, Trash2, Check, ArrowUpDown, Filter } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../constants";
import { motion, AnimatePresence } from "motion/react";

interface CatalogViewProps {
  onProductClick: (product: Product) => void;
  selectedCategory: "all" | "seating" | "lighting" | "tables" | "storage";
  setSelectedCategory: (cat: "all" | "seating" | "lighting" | "tables" | "storage") => void;
  onAddWishlist: (product: Product) => void;
  wishlist: string[];
}

type TimberFilter = "all" | "oak" | "ash" | "walnut" | "teak";

export default function CatalogView({ 
  onProductClick, 
  selectedCategory, 
  setSelectedCategory,
  onAddWishlist,
  wishlist
}: CatalogViewProps) {
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTimber, setSelectedTimber] = useState<TimberFilter>("all");
  const [priceMax, setPriceMax] = useState<number>(3500);
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc" | "rating">("name");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Filter and Sort Computing logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // 1. Search Query mapping
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.materials.some(m => m.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Category mapping
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;

      // 3. Timber/Material Wood mapping
      const matchesTimber = 
        selectedTimber === "all" || 
        product.materials.some(m => m.toLowerCase().includes(selectedTimber)) ||
        product.name.toLowerCase().includes(selectedTimber);

      // 4. Price Boundaries
      const matchesPrice = product.price <= priceMax;

      return matchesSearch && matchesCategory && matchesTimber && matchesPrice;
    }).sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "price-asc") {
        return a.price - b.price;
      } else if (sortBy === "price-desc") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
      return 0;
    });
  }, [searchQuery, selectedCategory, selectedTimber, priceMax, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTimber("all");
    setPriceMax(3500);
    setSortBy("name");
  };

  const categoriesList = [
    { id: "all", label: "All Items" },
    { id: "seating", label: "Seating Originals" },
    { id: "tables", label: "Crafted Tables" },
    { id: "storage", label: "Heritage Storage" },
    { id: "lighting", label: "Ambient Lighting" },
  ] as const;

  const timbersList = [
    { id: "all", label: "All Timbers" },
    { id: "oak", label: "Sustainable Oak" },
    { id: "ash", label: "Danish Ash" },
    { id: "walnut", label: "American Walnut" },
    { id: "teak", label: "Vintage Teak" },
  ] as const;

  return (
    <div className="bg-zinc-950 min-h-screen py-10 px-6 max-w-7xl mx-auto text-white">
      
      {/* Editorial Title */}
      <header className="mb-12 border-b border-zinc-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-2 font-mono">
            VERIFIED CRAFT INVENTORY
          </span>
          <h1 className="font-headline text-3xl md:text-4.5xl font-extrabold tracking-tight text-white">
            Curated Collectibles
          </h1>
        </div>
        
        {/* Quick stat & toggle */}
        <div className="text-xs text-zinc-400 font-semibold font-mono">
          DISPLAYING <span className="font-bold text-emerald-405 text-emerald-400">{filteredProducts.length}</span> OF {PRODUCTS.length} REGISTERED ARTIFACTS
        </div>
      </header>

      {/* Control center panel */}
      <div className="flex items-center gap-4 mb-8 bg-zinc-900 p-4 rounded-3xl border border-zinc-850 shadow-2xl">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Search material, wood species, or designer..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-11 pr-4 py-3 bg-zinc-950 rounded-2xl text-white placeholder-zinc-550 placeholder-zinc-500 focus:outline-none border border-zinc-800 focus:border-emerald-400 transition-colors"
          />
        </div>

        {/* Sort selector */}
        <div className="hidden md:flex items-center gap-3">
          <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400 flex items-center gap-1.5 font-bold">
            <ArrowUpDown className="w-3.5 h-3.5 text-emerald-450" /> SORT INDEX:
          </span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-xs bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 font-semibold text-white outline-none focus:border-emerald-400 cursor-pointer"
          >
            <option value="name">Alphabetical</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Guild Rating</option>
          </select>
        </div>

        {/* Mobile controls toggle */}
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="md:hidden flex items-center gap-1.5 bg-emerald-500 text-zinc-950 text-xs px-4 py-2.5 rounded-xl hover:bg-emerald-450 active:scale-95 cursor-pointer font-bold"
        >
          <Filter className="w-3.5 h-3.5" />
          Filter
        </button>
      </div>

      {/* Main split-screen layout */}
      <div className="flex flex-col md:flex-row gap-10">
        
        {/* Left Side: Editorial Filter Sidebar (Desktop) */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-28 space-y-8">
            
            {/* 1. Category selector block */}
            <div className="space-y-3">
              <h3 className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                CATEGORIES
              </h3>
              <div className="flex flex-col space-y-1">
                {categoriesList.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`text-xs text-left py-2.5 px-4 rounded-xl font-bold transition-all ${
                      selectedCategory === cat.id 
                        ? "bg-emerald-500 text-zinc-950 font-extrabold shadow-sm" 
                        : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Sustainable Wood Choice */}
            <div className="space-y-3">
              <h3 className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                TIMBER BASE
              </h3>
              <div className="flex flex-col space-y-1">
                {timbersList.map(timber => (
                  <button
                    key={timber.id}
                    onClick={() => setSelectedTimber(timber.id)}
                    className="text-xs text-left py-2 px-3.5 rounded-xl font-bold transition-all flex items-center justify-between hover:bg-zinc-900"
                  >
                    <span className={selectedTimber === timber.id ? "text-emerald-450 text-emerald-400 underline decoration-2 underline-offset-4" : "text-zinc-400 hover:text-zinc-200"}>
                      {timber.label}
                    </span>
                    {selectedTimber === timber.id && <Check className="w-3.5 h-3.5 text-emerald-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Price bounding slider */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  BUDGET MAX
                </h3>
                <span className="text-xs font-bold text-emerald-400 font-mono">${priceMax}</span>
              </div>
              <input 
                type="range" 
                min="400" 
                max="3500" 
                step="50"
                value={priceMax}
                onChange={(e) => setPriceMax(Number(e.target.value))}
                className="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-emerald-400 focus:outline-none"
              />
              <div className="flex justify-between text-[8px] text-zinc-500 font-mono">
                <span>$400</span>
                <span>$3,500</span>
              </div>
            </div>

            {/* 4. Reset Filters button */}
            <button 
              onClick={clearAllFilters}
              className="w-full border border-zinc-850 hover:border-zinc-800 text-zinc-450 text-zinc-400 hover:text-emerald-400 hover:shadow-md transition-all py-3 rounded-2xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer bg-zinc-900/40"
            >
              <Trash2 className="w-3.5 h-3.5 text-emerald-400" />
              Reset Filters
            </button>
          </div>
        </aside>

        {/* Collapsible Mobile Filters Drawer */}
        <AnimatePresence>
          {showMobileFilters && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-zinc-900 p-6 rounded-3xl border border-zinc-850 mb-6 space-y-6"
            >
              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 block mb-2 font-bold">Category Selection</span>
                <div className="flex flex-wrap gap-2">
                  {categoriesList.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`text-[11px] px-3.5 py-2 rounded-xl font-bold transition-all ${
                        selectedCategory === cat.id ? "bg-emerald-500 text-zinc-950" : "bg-zinc-950 text-zinc-400 border border-zinc-800"
                      }`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 block mb-2 font-bold">Sustainable Timber</span>
                <div className="flex flex-wrap gap-2">
                  {timbersList.map(timber => (
                    <button
                      key={timber.id}
                      onClick={() => setSelectedTimber(timber.id)}
                      className={`text-[11px] px-3.5 py-2 rounded-xl font-bold transition-all ${
                        selectedTimber === timber.id ? "bg-emerald-500 text-zinc-950" : "bg-zinc-950 text-zinc-400 border border-zinc-800"
                      }`}
                    >
                      {timber.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Max Budget</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">${priceMax}</span>
                </div>
                <input 
                  type="range" 
                  min="400" 
                  max="3500" 
                  value={priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  className="w-full accent-emerald-550 accent-emerald-400 h-1.5 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={clearAllFilters}
                  className="flex-1 border border-zinc-800 bg-zinc-950 text-center py-2.5 text-xs font-bold text-zinc-400 rounded-xl uppercase"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="flex-1 bg-emerald-500 text-zinc-950 text-center py-2.5 text-xs font-bold rounded-xl uppercase"
                >
                  Apply Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Right Side: Responsive Product Grid */}
        <main className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24 bg-zinc-900 rounded-3xl border border-dashed border-zinc-800">
              <SlidersHorizontal className="w-10 h-10 text-zinc-650 text-zinc-600 mx-auto mb-4" />
              <h3 className="font-headline text-lg font-bold text-white mb-2">
                No matching original details
              </h3>
              <p className="text-xs text-zinc-450 text-zinc-400 max-w-sm mx-auto mb-6">
                Try widening your budget, resetting search query variables, or exploring other timber varieties to discover fitting models.
              </p>
              <button 
                onClick={clearAllFilters}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl cursor-pointer hover:shadow-lg transition-shadow"
              >
                Restore Full Collection
              </button>
            </div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => {
                  const isLiked = wishlist.includes(product.id);
                  return (
                    <motion.div 
                      layout
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45 }}
                      key={product.id} 
                      className="group flex flex-col justify-between h-full bg-zinc-900 border border-zinc-850/65 rounded-3xl p-4 transition-all duration-350 hover:bg-zinc-850/40 hover:border-emerald-500/30 hover:shadow-[0_12px_30px_rgba(0,0,0,0.4)]"
                    >
                      {/* Thumbnail Container */}
                      <div className="relative aspect-square bg-zinc-950 overflow-hidden rounded-2xl mb-4 cursor-pointer shadow-xs border border-zinc-850/60">
                        <img 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-[1.02] filter brightness-95 transition-transform duration-700 select-none"
                          referrerPolicy="no-referrer"
                          src={product.imageUrl} 
                          onClick={() => onProductClick(product)}
                        />
                        
                        {/* Favorite button */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onAddWishlist(product);
                          }}
                          className="absolute top-3 right-3 w-8 h-8 bg-zinc-950/90 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 border border-zinc-800 transition-opacity duration-200 cursor-pointer shadow-sm hover:scale-105"
                        >
                          <Heart className={`w-3.5 h-3.5 transition-colors ${isLiked ? "fill-emerald-400 text-emerald-400" : "text-zinc-400"}`} />
                        </button>

                        <div 
                          onClick={() => onProductClick(product)}
                          className="absolute inset-x-0 bottom-0 bg-emerald-500 text-zinc-950 text-[10px] tracking-widest font-extrabold uppercase text-center py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        >
                          Explore &amp; Customize
                        </div>
                      </div>

                      {/* Header details */}
                      <div className="flex justify-between items-start cursor-pointer group mt-1" onClick={() => onProductClick(product)}>
                        <div className="pr-2">
                          <h4 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors leading-tight">
                            {product.name}
                          </h4>
                          <p className="text-[11px] text-zinc-400 mt-1 leading-snug">{product.subtitle}</p>
                        </div>
                        <span className="text-xs font-bold font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-xl border border-emerald-500/10 whitespace-nowrap">
                          ${product.price.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          )}
        </main>

      </div>
    </div>
  );
}
