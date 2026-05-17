import React, { useState } from "react";
import { ShoppingBag, Menu, X, Sparkles, HelpCircle, Leaf, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface NavbarProps {
  currentView: "home" | "catalog" | "advisor" | "sustainability";
  setView: (v: "home" | "catalog" | "advisor" | "sustainability") => void;
  cartCount: number;
  onOpenCart: () => void;
}

export default function Navbar({ currentView, setView, cartCount, onOpenCart }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "catalog", label: "Seating" }, // Map category triggers safely
    { id: "catalog", label: "Tables", category: "tables" },
    { id: "catalog", label: "Storage", category: "storage" },
    { id: "catalog", label: "Lighting", category: "lighting" },
  ] as const;

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 border-b border-zinc-900 transition-all backdrop-blur-md">
      <div className="flex justify-between items-center w-full px-6 max-w-7xl mx-auto h-20">
        
        {/* Brand Logo in AetherOS Bento Style */}
        <button 
          onClick={() => setView("home")}
          className="font-headline text-xl md:text-2xl font-bold tracking-tight text-white italic hover:opacity-80 flex items-center gap-2 cursor-pointer"
          id="nav-logo"
        >
          <span className="w-2.5 h-2.5 bg-emerald-450 bg-emerald-400 rounded-full inline-block animate-pulse"></span>
          DANE<span className="text-emerald-400 font-extrabold not-italic">DESIGN</span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-sans text-sm tracking-wide">
          <button
            onClick={() => setView("home")}
            className={`cursor-pointer transition-colors duration-200 py-1 ${
              currentView === "home" 
                ? "text-white font-semibold border-b-2 border-emerald-400" 
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => setView("catalog")}
            className={`cursor-pointer transition-all duration-200 py-1 ${
              currentView === "catalog"
                ? "text-white font-semibold border-b-2 border-emerald-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            Browse Furniture
          </button>

          <button
            onClick={() => setView("advisor")}
            className={`cursor-pointer transition-all duration-200 py-1 flex items-center gap-1.5 ${
              currentView === "advisor"
                ? "text-white font-semibold border-b-2 border-emerald-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            AI Interior Advisor
          </button>

          <button
            onClick={() => setView("sustainability")}
            className={`cursor-pointer transition-all duration-200 py-1 flex items-center gap-1 ${
              currentView === "sustainability"
                ? "text-white font-semibold border-b-2 border-emerald-400"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            Our Heritage
          </button>
        </div>

        {/* Icons Utility Basket */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <button
            onClick={() => setView("advisor")}
            className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold tracking-wider uppercase px-4 py-2 rounded-xl hover:shadow-[0_0_15px_rgba(52,211,153,0.3)] transition-all"
            title="Danish Spatial Design Desk"
          >
            <Sparkles className="w-3.5 h-3.5 text-zinc-950" />
            <span className="hidden sm:inline">AI Planner</span>
          </button>

          {/* Cart Trigger Button */}
          <button 
            onClick={onOpenCart}
            className="relative p-2.5 text-zinc-300 hover:text-emerald-400 transition-colors cursor-pointer"
            id="cart-trigger-btn"
            aria-label="Toggle Shopping Bag"
          >
            <ShoppingBag className="w-5.5 h-5.5 stroke-[1.75]" />
            <AnimatePresence>
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-1 right-1 w-4.5 h-4.5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm"
                >
                  {cartCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          {/* Hamburger Menu on Mobile */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 text-white hover:opacity-80 transition-opacity cursor-pointer"
            id="mobile-nav-toggle"
            aria-label="Toggle Mobile Controls"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-zinc-950 border-b border-zinc-900 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col space-y-4 font-sans text-sm tracking-wide">
              <button
                onClick={() => {
                  setView("home");
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 font-medium ${currentView === "home" ? "text-emerald-400 border-l-2 border-emerald-400 pl-3" : "text-zinc-400 pl-1"}`}
              >
                Home Portfolio
              </button>
              <button
                onClick={() => {
                  setView("catalog");
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 font-medium ${currentView === "catalog" ? "text-emerald-400 border-l-2 border-emerald-400 pl-3" : "text-zinc-400 pl-1"}`}
              >
                Explore Catalog
              </button>
              <button
                onClick={() => {
                  setView("advisor");
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 font-medium flex items-center gap-2 ${currentView === "advisor" ? "text-emerald-400 border-l-2 border-emerald-400 pl-3 animate-pulse" : "text-zinc-400 pl-1"}`}
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                AI Space Planner
              </button>
              <button
                onClick={() => {
                  setView("sustainability");
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left py-2 font-medium flex items-center gap-2 ${currentView === "sustainability" ? "text-emerald-400 border-l-2 border-emerald-400 pl-3" : "text-zinc-400 pl-1"}`}
              >
                <Leaf className="w-4 h-4 text-emerald-400" />
                Sustainability &amp; Craft
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
