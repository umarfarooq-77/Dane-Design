import React, { useState, useEffect } from "react";
import { X, Heart, ShoppingBag, Info, Ruler, Leaf, RefreshCw, Star, Check } from "lucide-react";
import { Product } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (
    product: Product, 
    quantity: number, 
    finish: string, 
    fabric: string | undefined, 
    paperCord: string | undefined, 
    finalPrice: number
  ) => void;
  onAddWishlist: (product: Product) => void;
  wishlist: string[];
}

export default function ProductModal({ product, onClose, onAddToCart, onAddWishlist, wishlist }: ProductModalProps) {
  
  // Custom states matching configuration fields
  const [activeTab, setActiveTab] = useState<"heritage" | "specifications" | "preservation">("heritage");
  const [selectedFinish, setSelectedFinish] = useState("");
  const [selectedFabric, setSelectedFabric] = useState("");
  const [selectedCord, setSelectedCord] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [zoomStyle, setZoomStyle] = useState<React.CSSProperties>({});
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  // Initialize selections when product changes
  useEffect(() => {
    if (product) {
      setSelectedFinish(product.finishes[0]);
      setSelectedFabric(product.fabrics ? product.fabrics[0] : "");
      setSelectedCord(product.paperCords ? product.paperCords[0] : "");
      setQuantity(1);
      setIsAddedSuccess(false);
    }
  }, [product]);

  if (!product) return null;

  const isLiked = wishlist.includes(product.id);

  // Dynamic pricing calculation dependent on material upgrades
  const calculatedPrice = (() => {
    let base = product.price;
    
    // Add upcharges depending on selected upgrades
    if (selectedFinish && selectedFinish !== product.finishes[0]) {
      if (selectedFinish.toLowerCase().includes("walnut")) base += 110;
      else if (selectedFinish.toLowerCase().includes("smoked")) base += 75;
      else if (selectedFinish.toLowerCase().includes("lacquer") || selectedFinish.toLowerCase().includes("black")) base += 50;
      else base += 30; // standard variation
    }

    if (selectedFabric && selectedFabric !== product.fabrics?.[0]) {
      if (selectedFabric.toLowerCase().includes("cognac")) base += 120;
      else if (selectedFabric.toLowerCase().includes("obsidian")) base += 80;
      else if (selectedFabric.toLowerCase().includes("bouclé")) base += 90;
      else base += 40;
    }

    if (selectedCord && selectedCord !== product.paperCords?.[0]) {
      if (selectedCord.toLowerCase().includes("charcoal") || selectedCord.toLowerCase().includes("black")) base += 20;
    }

    return base;
  })();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(1.75)"
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({
      transformOrigin: "center",
      transform: "scale(1)"
    });
  };

  const handleAddToCartClick = () => {
    onAddToCart(
      product, 
      quantity, 
      selectedFinish, 
      selectedFabric || undefined, 
      selectedCord || undefined, 
      calculatedPrice
    );
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
      onClose();
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
        
        {/* Backdrop Shadow overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/65 backdrop-blur-sm cursor-pointer"
        ></motion.div>

        {/* Modal Main container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ cubicBezier: [0.16, 1, 0.3, 1], duration: 0.5 }}
          className="relative bg-zinc-950 w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-zinc-850 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] text-white"
          id="product-customizer-modal"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-25 p-2 px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-zinc-850 text-white border border-zinc-800 hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left panel: Zooming Product Picture Gallery */}
          <div className="w-full md:w-1/2 bg-zinc-900 p-8 flex items-center justify-center relative select-none max-h-[40vh] md:max-h-full border-r border-zinc-900">
            <div 
              className="overflow-hidden w-full h-full flex items-center justify-center cursor-zoom-in rounded-2xl"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img 
                alt={product.name} 
                style={zoomStyle}
                className="max-h-[300px] md:max-h-[480px] max-w-full object-contain filter brightness-95 transition-transform duration-100"
                referrerPolicy="no-referrer"
                src={product.imageUrl} 
              />
            </div>
            
            {/* Environmental / Origin banner */}
            <div className="absolute bottom-5 left-5 bg-zinc-950/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl text-[9px] font-bold text-white font-mono tracking-wider flex items-center gap-1.5 border border-zinc-800">
              <Leaf className="w-3.5 h-3.5 text-emerald-450 text-emerald-400" /> Origin: {product.origin}
            </div>
          </div>

          {/* Right panel: Controls & Specifications Content */}
          <div className="w-full md:w-1/2 p-6 md:p-10 flex flex-col justify-between overflow-y-auto max-h-[50vh] md:max-h-full text-white">
            
            <div className="space-y-6">
              {/* Product Info Block */}
              <header className="border-b border-zinc-900 pb-5">
                <span className="text-[9px] font-mono tracking-widest text-[#baa182] uppercase font-bold">
                  {product.designer} ({product.year})
                </span>
                <h2 className="font-headline text-2xl font-extrabold mt-1 text-white">
                  {product.name}
                </h2>
                <div className="flex justify-between items-center mt-3">
                  <span className="font-mono text-xl font-bold text-emerald-405 text-emerald-400" id="modal-product-price">
                    ${calculatedPrice.toLocaleString()}
                  </span>
                  
                  {/* Star ratings */}
                  <span className="text-xs text-zinc-400 flex items-center gap-1.5 font-semibold">
                    <Star className="w-4.5 h-4.5 fill-emerald-400 text-emerald-400" /> {product.rating} / 5.0 Rating
                  </span>
                </div>
              </header>

              {/* Timber / Finish selections */}
              <div className="space-y-2.5">
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  1. Timber base finish wood
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {product.finishes.map((fin) => (
                    <button
                      key={fin}
                      onClick={() => setSelectedFinish(fin)}
                      className={`text-left text-xs px-3.5 py-3 border rounded-xl transition-all flex justify-between items-center cursor-pointer ${
                        selectedFinish === fin 
                          ? "bg-emerald-500 text-zinc-950 border-emerald-500 font-extrabold shadow-sm" 
                          : "bg-zinc-900 text-zinc-400 border-zinc-850 hover:bg-zinc-800"
                      }`}
                    >
                      <span className="truncate">{fin}</span>
                      {selectedFinish === fin && <Check className="w-3.5 h-3.5 text-zinc-950" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textile / Upholstery (if exists) */}
              {product.fabrics && (
                <div className="space-y-2.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    2. Textile / Leather upholstery
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {product.fabrics.map((fab) => (
                      <button
                        key={fab}
                        onClick={() => setSelectedFabric(fab)}
                        className={`text-left text-xs px-3.5 py-3 border rounded-xl transition-all flex justify-between items-center cursor-pointer ${
                          selectedFabric === fab 
                            ? "bg-emerald-500 text-zinc-950 border-emerald-500 font-extrabold shadow-sm" 
                            : "bg-zinc-900 text-zinc-400 border-zinc-850 hover:bg-zinc-800"
                        }`}
                      >
                        <span className="truncate">{fab}</span>
                        {selectedFabric === fab && <Check className="w-3.5 h-3.5 text-zinc-950" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Hand-woven cord (if exists) */}
              {product.paperCords && (
                <div className="space-y-2.5">
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    2. Paper Loom cord weave
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {product.paperCords.map((cord) => (
                      <button
                        key={cord}
                        onClick={() => setSelectedCord(cord)}
                        className={`text-left text-xs px-3.5 py-3 border rounded-xl transition-all flex justify-between items-center cursor-pointer ${
                          selectedCord === cord 
                            ? "bg-emerald-500 text-zinc-950 border-emerald-500 font-extrabold shadow-sm" 
                            : "bg-zinc-900 text-zinc-400 border-zinc-850 hover:bg-zinc-800"
                        }`}
                      >
                        <span className="truncate">{cord}</span>
                        {selectedCord === cord && <Check className="w-3.5 h-3.5 text-zinc-950" />}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Specs and Story Tabs */}
              <div>
                {/* Headers */}
                <div className="flex border-b border-zinc-900 text-xs font-bold mb-4 text-zinc-400">
                  <button 
                    onClick={() => setActiveTab("heritage")}
                    className={`pb-2 mr-6 border-b-2 hover:opacity-80 transition-all cursor-pointer ${activeTab === "heritage" ? "border-emerald-500 text-emerald-400 font-bold" : "border-transparent text-zinc-500"}`}
                  >
                    Heritage Story
                  </button>
                  <button 
                    onClick={() => setActiveTab("specifications")}
                    className={`pb-2 mr-6 border-b-2 hover:opacity-80 transition-all cursor-pointer ${activeTab === "specifications" ? "border-emerald-500 text-emerald-400 font-bold" : "border-transparent text-zinc-500"}`}
                  >
                    Specifications
                  </button>
                  <button 
                    onClick={() => setActiveTab("preservation")}
                    className={`pb-2 border-b-2 hover:opacity-80 transition-all cursor-pointer ${activeTab === "preservation" ? "border-emerald-500 text-emerald-400 font-bold" : "border-transparent text-zinc-500"}`}
                  >
                    Preservation
                  </button>
                </div>

                {/* Tab Outputs */}
                <div className="text-xs text-zinc-400 leading-relaxed min-h-[90px] font-medium">
                  {activeTab === "heritage" && (
                    <p>{product.description}</p>
                  )}
                  {activeTab === "specifications" && (
                    <div className="space-y-2">
                      <p><strong className="text-white">Dimensions:</strong> {product.dimensions}</p>
                      <p><strong className="text-white">Noble Materials Sourced:</strong> {product.materials.join(", ")}</p>
                      <p><strong className="text-white">Joint Restoration:</strong> Mortise-and-Tenon, solid timber wax coat.</p>
                    </div>
                  )}
                  {activeTab === "preservation" && (
                    <p>
                      Maintain wood health by shielding from harsh heat blocks. Friction-polish with warm beeswax once a season. Vacuum woven cord surfaces on minimum power suction to clear dust.
                    </p>
                  )}
                </div>
              </div>

            </div>

            {/* Sticky/Bottom Footer controls: Qty adjustments, add to basket, like */}
            <footer className="pt-6 border-t border-zinc-905 border-zinc-900 mt-8 flex sm:flex-row flex-col sm:items-center justify-between gap-4">
              
              {/* Count Adjust */}
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">QTY:</span>
                <div className="flex items-center border border-zinc-805 border-zinc-800 bg-zinc-900 rounded-xl overflow-hidden shadow-xs">
                  <button 
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3.5 py-1.5 hover:bg-zinc-800 text-zinc-400 text-xs font-bold cursor-pointer transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-bold font-mono text-emerald-400">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3.5 py-1.5 hover:bg-zinc-800 text-zinc-400 text-xs font-bold cursor-pointer transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Drawer actions button */}
              <div className="flex items-center gap-3 flex-1 justify-end">
                <button 
                  onClick={() => onAddWishlist(product)}
                  className={`p-3.5 border border-zinc-805 border-zinc-800 rounded-xl hover:bg-zinc-900 hover:border-zinc-700 transition-colors cursor-pointer ${isLiked ? "bg-zinc-900" : ""}`}
                  title="Bookmark design configuration"
                >
                  <Heart className={`w-4 h-4 ${isLiked ? "fill-emerald-450 fill-emerald-400 text-emerald-400" : "text-zinc-400"}`} />
                </button>

                <button
                  onClick={handleAddToCartClick}
                  disabled={isAddedSuccess}
                  className={`flex-1 sm:flex-initial text-center text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl transition-all focus:ring-1 focus:ring-emerald-450 outline-none cursor-pointer flex items-center justify-center gap-2 ${
                    isAddedSuccess 
                      ? "bg-emerald-600 text-zinc-950 font-extrabold" 
                      : "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold hover:shadow-[0_0_20px_rgba(52,211,153,0.3)]"
                  }`}
                  id="add-to-cart-action-btn"
                >
                  {isAddedSuccess ? (
                    <>
                      <Check className="w-4 h-4 animate-bounce" /> Sourced and Loaded!
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" /> Load to Crate • ${(calculatedPrice * quantity).toLocaleString()}
                    </>
                  )}
                </button>
              </div>

            </footer>

          </div>
        </motion.div>

      </div>
    </AnimatePresence>
  );
}
