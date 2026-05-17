import React, { useState, useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Leaf, Sparkles, Heart, Star, Compass, Paintbrush } from "lucide-react";
import { Product } from "../types";
import { CATEGORIES, PRODUCTS } from "../constants";
import { motion } from "motion/react";

interface HomeViewProps {
  setView: (v: "home" | "catalog" | "advisor" | "sustainability") => void;
  onSelectCategoryAndGo: (categoryId: "seating" | "lighting" | "tables" | "storage") => void;
  onProductClick: (product: Product) => void;
  onAddWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function HomeView({ 
  setView, 
  onSelectCategoryAndGo, 
  onProductClick, 
  onAddWishlist,
  wishlist 
}: HomeViewProps) {
  
  // Custom states for interactive timber/finish selector inside Featured Series Section
  const [selectedFinish, setSelectedFinish] = useState("Solid Ash Wood");
  const [selectedCord, setSelectedCord] = useState("Natural Danish Paper Cord");
  const [seriesActivePrice, setSeriesActivePrice] = useState(810);

  // References for categories carousel
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 320, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -320, behavior: "smooth" });
    }
  };

  // Extract featured models matching the exact spec
  const discoverProducts = PRODUCTS.filter(p => 
    p.id === "eames-lounge" || p.id === "teak-sideboard" || p.id === "arco-lamp"
  );

  const wishboneProductRef = PRODUCTS.find(p => p.id === "wishbone-chair") || PRODUCTS[3];

  const handleSeriesConfig = (finish: string, priceMod: number) => {
    setSelectedFinish(finish);
    setSeriesActivePrice(810 + priceMod);
  };

  return (
    <div className="bg-zinc-950 text-white font-sans overflow-x-hidden">
      
      {/* 1. Dramatic Editorial Hero Section as a Premium Bento Stage */}
      <section className="relative w-full h-[720px] md:h-[820px] flex items-center overflow-hidden px-4 md:px-8 py-6">
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden mx-4 md:mx-6 my-2 border border-zinc-900">
          <img 
            alt="Scandinavian Interior" 
            className="w-full h-full object-cover select-none scale-102 filter brightness-[0.7] contrast-[1.15] transition-transform duration-1000"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpsMPQHjynKsNpdlMUlHMwqY7lJ1WHBC_HsfH4CeF8JkEyaUEM70swT3gr5R4PWAlCG3lyvzY4Z0Ds7fqB3R0rgwe2m7PqkH4NMpbFYfWNdpcsOL2RNpbvN0okS3jqh981-_UVpwlKZMxvmAEbhbyv3uin3T0w0hsP5SZkJriBcuZCRYghA-eKhO5e5AFwNDdoFFzAGmuhzF5SMS5c3Z7EhyIr6mO9cI7_Law7gLScsW_pxw9dyOc0zKr_F9uQIT0DUjyK60o-YgF" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent"></div>
        </div>

        <div className="relative z-10 px-6 max-w-7xl mx-auto w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, cubicBezier: [0.16, 1, 0.3, 1] }}
            className="max-w-xl bg-zinc-900/70 border border-zinc-800 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl relative overflow-hidden"
          >
            {/* Tech scanner active glow */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500/20 via-emerald-400 to-emerald-500/20"></div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-450 text-emerald-400">SESSION: BESPOKE SCANDI LAB</span>
            </div>

            <h1 className="font-headline text-3xl md:text-5xl font-extrabold tracking-tight mb-5 leading-tight text-white">
              Timeless Design <br />
              for Modern Living<span className="text-emerald-400">.</span>
            </h1>
            <p className="font-sans text-xs md:text-sm leading-relaxed mb-8 text-zinc-400 max-w-md">
              Discover our curated collection of mid-century originals, where master Danish timber craft meets clean geometric organization.
            </p>
            <button 
              onClick={() => setView("catalog")}
              className="w-full sm:w-auto bg-emerald-500 text-zinc-950 hover:bg-emerald-400 px-8 py-4 px-10 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all shadow-[0_8px_20px_rgba(52,211,153,0.15)] hover:shadow-[0_8px_25px_rgba(52,211,153,0.3)] active:scale-98 cursor-pointer"
            >
              Shop All Furniture
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. Scrollable Category Explorer styled as a sleek Bento Deck */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
              EXPLORE OUR RANGE
            </span>
            <h2 className="font-headline text-2xl md:text-3.5xl font-bold text-white tracking-tight">
              Browse by Category
            </h2>
          </div>
          <div className="hidden md:flex space-x-3">
            <button 
              onClick={scrollLeft}
              className="w-11 h-11 rounded-2xl border border-zinc-800 flex items-center justify-center hover:border-emerald-400 text-zinc-400 hover:text-emerald-400 bg-zinc-900 transition-colors cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-11 h-11 rounded-2xl border border-zinc-800 flex items-center justify-center hover:border-emerald-400 text-zinc-400 hover:text-emerald-400 bg-zinc-900 transition-colors cursor-pointer active:scale-95"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Slider */}
        <div 
          ref={carouselRef} 
          className="flex overflow-x-auto hide-scrollbar space-x-6 pb-6 scroll-smooth snap-x snap-mandatory"
        >
          {CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              onClick={() => onSelectCategoryAndGo(category.id)}
              className="min-w-[280px] md:min-w-[316px] bg-zinc-900 border border-zinc-800 rounded-3xl p-4 group cursor-pointer snap-start flex-shrink-0 transition-all hover:border-emerald-400/40 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] flex flex-col justify-between"
            >
              <div className="aspect-[4/5] bg-zinc-950 rounded-2xl overflow-hidden mb-5 relative">
                <img 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 select-none filter brightness-90 border border-zinc-850"
                  referrerPolicy="no-referrer"
                  src={category.imageUrl} 
                />
                <div className="absolute inset-0 bg-zinc-950/5 group-hover:bg-transparent transition-colors duration-300"></div>
                
                {/* Micro Category count Tag */}
                <span className="absolute top-3 left-3 bg-black/60 text-emerald-400 text-[9px] font-mono tracking-widest font-bold px-2.5 py-1 rounded-lg backdrop-blur-md border border-white/5">
                  {category.productCount} SKUS
                </span>
              </div>
              <div>
                <h3 className="font-headline text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-[10px] uppercase tracking-widest text-zinc-500 mt-1 font-mono font-semibold">Active Series Model</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured Collection Showcase - Hans Wegner Series (Bento split hardware layout) */}
      <section className="bg-zinc-950 py-24 md:py-28 px-6 border-y border-zinc-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">
          
          {/* Wishbone Chair Gallery block */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative max-w-md w-full">
              <div className="absolute -top-6 -left-6 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl z-0 animate-pulse"></div>
              <div className="relative z-10 bg-zinc-900 p-6 rounded-3xl shadow-2xl border border-zinc-850 group overflow-hidden">
                <img 
                  alt="Hans Wegner CH24 Wishbone Chair" 
                  className="w-full rounded-2xl max-h-[460px] object-cover mix-blend-lighten select-none filter saturate-[0.85] brightness-95"
                  referrerPolicy="no-referrer"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBg0erlbpoYeJ0ctzMDv6TU843AIzfIkjqpEnwqkaRKYp6QQOR9KahPefIHoOqLZHXPa60y0rjGKLukMe7bA1FaE78J6BLZug_3wfJ8H5uFB4-po4GUnV3mg9kD97F6eYWsg-WlQROCb25X5Ge7Q7Wu7mcCFwruwhfc7gLa6M1X64acco0UjoIkhCgAsBMKexKJ3aSWAdflS-8-S46aHTZzQgy5FARJ5Aelea5tB01Zkhm6-Zz19pSJpmY8H7FjnAVGHAqm61VUa9bF" 
                />
                
                {/* Visual spec badge styled like premium system sensor overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-zinc-950/90 backdrop-blur-md p-4 border border-zinc-800 rounded-2xl text-xs flex justify-between items-center shadow-lg">
                  <div>
                    <span className="text-zinc-500 font-mono uppercase block text-[8px] tracking-widest">Wegner Active Specifier</span>
                    <span className="font-semibold text-white truncate max-w-[200px] block mt-0.5">{selectedFinish} - {selectedCord}</span>
                  </div>
                  <span className="font-mono font-bold text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-450/20 px-3 py-1.5 rounded-xl">${seriesActivePrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Configuration Console */}
          <div className="w-full md:w-1/2 space-y-6">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 block">
              ICONIC NORDIC DESIGN
            </span>
            <h2 className="font-headline text-2xl md:text-3.5xl font-extrabold text-white leading-tight">
              The Hans Wegner Inspired Series
            </h2>
            <p className="text-xs md:text-sm leading-relaxed text-zinc-400 font-medium">
              Celebrating the organic tension of handconstructed paper cord and carbonized ash wood. Our specialists configure exact fiber logs directly inside our automated kiln.
            </p>

            {/* Interactive Selector Chips */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-xl">
              <div className="space-y-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 block font-bold flex items-center gap-1.5">
                  <Paintbrush className="w-3.5 h-3.5 text-emerald-400" /> TIMBER FINISH
                </span>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => handleSeriesConfig("Solid Ash Wood", 0)}
                    className={`text-xs text-left px-3.5 py-2.5 rounded-xl transition-all flex justify-between items-center ${selectedFinish === "Solid Ash Wood" ? "bg-emerald-500 text-zinc-950 font-bold" : "bg-zinc-950 hover:bg-zinc-850 text-zinc-400 border border-zinc-800"}`}
                  >
                    <span>Natural Organic Ash</span>
                    <span className="font-mono text-[9px]">+$0</span>
                  </button>
                  <button 
                    onClick={() => handleSeriesConfig("Oiled Walnut Frame", 110)}
                    className={`text-xs text-left px-3.5 py-2.5 rounded-xl transition-all flex justify-between items-center ${selectedFinish === "Oiled Walnut Frame" ? "bg-emerald-500 text-zinc-950 font-bold" : "bg-zinc-950 hover:bg-zinc-850 text-zinc-400 border border-zinc-800"}`}
                  >
                    <span>Charcoal Walnut</span>
                    <span className="font-mono text-[9px]">+$110</span>
                  </button>
                  <button 
                    onClick={() => handleSeriesConfig("Deep Black Lacquer", 50)}
                    className={`text-xs text-left px-3.5 py-2.5 rounded-xl transition-all flex justify-between items-center ${selectedFinish === "Deep Black Lacquer" ? "bg-emerald-500 text-zinc-950 font-bold" : "bg-zinc-950 hover:bg-zinc-850 text-zinc-400 border border-zinc-800"}`}
                  >
                    <span>Satin Oak Black</span>
                    <span className="font-mono text-[9px]">+$50</span>
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 block font-bold flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" /> HANDCRAFTED CORD
                </span>
                <div className="flex flex-col space-y-2">
                  <button 
                    onClick={() => setSelectedCord("Natural Danish Paper Cord")}
                    className={`text-xs text-left px-3.5 py-2.5 rounded-xl transition-all ${selectedCord === "Natural Danish Paper Cord" ? "bg-emerald-500 text-zinc-950 font-bold" : "bg-zinc-950 hover:bg-zinc-850 text-zinc-400 border border-zinc-800"}`}
                  >
                    120m Flax Natural Cord
                  </button>
                  <button 
                    onClick={() => setSelectedCord("Charcoal Black Thread")}
                    className={`text-xs text-left px-3.5 py-2.5 rounded-xl transition-all ${selectedCord === "Charcoal Black Thread" ? "bg-emerald-500 text-zinc-950 font-bold" : "bg-zinc-950 hover:bg-zinc-850 text-zinc-400 border border-zinc-800"}`}
                  >
                    Charcoal Cord (+ $20)
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button 
                onClick={() => onProductClick(wishboneProductRef)}
                className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 px-8 py-4.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all shadow-[0_8px_20px_rgba(52,211,153,0.15)] hover:shadow-[0_8px_25px_rgba(52,211,153,0.3)] text-center cursor-pointer active:scale-95 flex-1"
              >
                Configure &amp; Add
              </button>
              <button 
                onClick={() => onSelectCategoryAndGo("seating")}
                className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-white hover:text-emerald-400 px-8 py-4.5 rounded-2xl text-xs font-bold tracking-widest uppercase transition-all text-center cursor-pointer flex-1"
              >
                Learn More
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Product Discovery Grid: Featured Selection in Bento Modules */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400 block mb-3">
            VERIFIED GUILD SELECTION
          </span>
          <h2 className="font-headline text-2xl md:text-3.5xl font-extrabold text-white mb-3">
            Featured Selection
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-lg mx-auto leading-relaxed font-semibold">
            Hand-picked design blueprints mapped exactly onto modern digital bento grids.
          </p>
        </div>

        {/* 3-column Grid matching Bento Specification */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {discoverProducts.map((product) => {
            const isLiked = wishlist.includes(product.id);
            return (
              <div 
                key={product.id} 
                className="bg-zinc-900 border border-zinc-850 rounded-3xl p-5 group flex flex-col justify-between transition-all hover:border-zinc-750 hover:shadow-2xl relative"
              >
                {/* Visual scanline texture over images in group */}
                <div className="relative aspect-square bg-zinc-950 overflow-hidden rounded-2xl mb-5 border border-zinc-850/50">
                  <img 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 cursor-pointer select-none"
                    referrerPolicy="no-referrer"
                    src={product.imageUrl} 
                    onClick={() => onProductClick(product)}
                  />
                  {/* Floating Like Icon - Transparent Glassmorphic blur */}
                  <button 
                    onClick={() => onAddWishlist(product)}
                    className="absolute top-4 right-4 w-10 h-10 bg-zinc-950/80 backdrop-blur-md rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer border border-zinc-800 hover:border-emerald-400 text-zinc-400 hover:text-emerald-450 hover:text-emerald-400 hover:scale-105 active:scale-95 shadow-lg"
                    title="Bookmark design"
                  >
                    <Heart className={`w-4 h-4 transition-colors ${isLiked ? "fill-rose-500 text-rose-500" : "text-white"}`} />
                  </button>
                  
                  {/* Quick Preview overlay */}
                  <div className="absolute inset-x-0 bottom-0 bg-emerald-500/90 backdrop-blur-sm text-zinc-950 text-[10px] tracking-widest font-extrabold uppercase text-center py-3.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    Preview customization &amp; grain specs
                  </div>
                </div>

                <div className="flex justify-between items-start cursor-pointer px-1" onClick={() => onProductClick(product)}>
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                      {product.name}
                    </h4>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-zinc-500 mt-1 leading-none">{product.subtitle}</p>
                  </div>
                  <span className="text-xs font-mono font-bold bg-zinc-950/80 text-emerald-400 px-3 py-1.5 rounded-xl border border-zinc-850">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => setView("catalog")}
            className="border-b-2 border-emerald-400 hover:border-emerald-350 text-emerald-400 hover:text-emerald-300 font-mono text-xs uppercase font-extrabold tracking-widest pb-1 hover:opacity-90 transition-all cursor-pointer inline-block"
          >
            Retrieve Full Repository (SKU List)
          </button>
        </div>
      </section>

      {/* 5. Sustainability Commitment Node styled as deeply atmospheric Bento Grid Cell */}
      <section className="pb-24 px-6">
        <div className="max-w-4xl mx-auto bg-gradient-to-br from-indigo-950/40 via-zinc-900 to-zinc-950 p-10 md:p-16 rounded-3xl text-center border border-zinc-800 relative overflow-hidden shadow-2xl group">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-[9px] font-mono uppercase bg-black/40 px-2 py-1 rounded backdrop-blur-md border border-white/10 text-blue-400">Atmosphere Core Unit</span>
          </div>

          <Leaf className="w-10 h-10 text-emerald-400 mx-auto mb-6 hover:scale-110 duration-300 transition-transform" />
          <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-5 tracking-tight">
            Built for Generations<span className="text-emerald-405 text-emerald-400">.</span>
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8 font-medium">
            We believe in design that locks carbon in cellulose tissues forever. Our furniture is crafted from FSC-certified sustainable woods and produced through selective logging protocols. By choosing timeless quality over fleeting trends, we respect natural forestry layers.
          </p>
          <button 
            onClick={() => setView("sustainability")}
            className="text-xs font-bold text-emerald-450 text-emerald-400 hover:text-emerald-350 bg-emerald-500/10 hover:bg-emerald-500/20 px-6 py-2.5 rounded-2xl border border-emerald-500/20 transition-colors uppercase tracking-[0.18em] cursor-pointer"
          >
            System Heritage Manual
          </button>
        </div>
      </section>

      {/* 6. Footer section in precise AetherOS grid metrics */}
      <footer className="bg-zinc-950 border-t border-zinc-900 pt-12 pb-14 px-6 font-sans">
        <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8 md:gap-4 select-none">
          
          <div className="font-headline text-lg md:text-xl font-bold text-white italic tracking-tight flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full inline-block animate-ping"></span>
            DANE<span className="text-emerald-400 font-extrabold not-italic">DESIGN</span>
          </div>
          
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-xs font-bold uppercase tracking-widest text-zinc-400">
            <button onClick={() => setView("sustainability")} className="hover:text-emerald-400 cursor-pointer">About System</button>
            <button onClick={() => setView("sustainability")} className="hover:text-emerald-400 cursor-pointer">Forest Metrics</button>
            <button onClick={() => setView("advisor")} className="hover:text-emerald-450 hover:text-emerald-400 cursor-pointer">Registry Logs</button>
          </div>

          <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-mono">
            System v4.0.2 • Authorized Active Session
          </div>
        </div>
      </footer>

    </div>
  );
}
