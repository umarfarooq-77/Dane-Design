import React, { useState } from "react";
import { Leaf, Award, Compass, HeartHandshake, ArrowRight, ShieldCheck, TreePine, Sparkles } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../constants";
import { motion } from "motion/react";

interface SustainabilityViewProps {
  onProductClick: (product: Product) => void;
  setView: (v: "home" | "catalog" | "advisor" | "sustainability") => void;
}

const WOOD_SPECIES_STATS = {
  oak: {
    name: "Scandinavian White Oak",
    carbonRate: 11.4, // kg CO2 per year
    hardness: 1290, // Janka score
    fiberPattern: "Pronounced, coarse ray flecks with gorgeous cathedrals.",
    restorationCare: "Linseed wax buffer blocks dust, allowing wood respiration.",
    matchedIds: ["cane-highboard", "wishbone-chair"]
  },
  ash: {
    name: "Certified Danish Ash",
    carbonRate: 10.2,
    hardness: 1320,
    fiberPattern: "Straight, highly elastic grains, soft cream tones.",
    restorationCare: "Soap-flake solution buffers skin acids, maintaining clear shade.",
    matchedIds: ["wishbone-chair", "nordic-classic-armchair"]
  },
  walnut: {
    name: "Refrained American Walnut",
    carbonRate: 12.8,
    hardness: 1010,
    fiberPattern: "Swirling, luxurious dark cocoa hearts and warm bronze borders.",
    restorationCare: "Pure tung-oil rub deeply penetrates, highlighting grain depth.",
    matchedIds: ["eames-lounge", "scandi-walnut-table"]
  }
};

export default function SustainabilityView({ onProductClick, setView }: SustainabilityViewProps) {
  
  // Custom states for interactive timber calculator
  const [selectedWood, setSelectedWood] = useState<"oak" | "ash" | "walnut">("oak");
  const [growthYears, setGrowthYears] = useState(65);

  const activeWood = WOOD_SPECIES_STATS[selectedWood];
  
  // Dynamic metrics
  const co2Absorbed = Math.round(activeWood.carbonRate * growthYears);
  const jankaRating = activeWood.hardness;

  const harvestedMatchedProducts = PRODUCTS.filter(p => 
    activeWood.matchedIds.includes(p.id)
  );

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-10 px-6 max-w-7xl mx-auto space-y-20 font-sans">
      
      {/* 1. Header Section */}
      <header className="border-b border-zinc-900 pb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 block mb-2 font-mono">
            EIGHTY-YEAR CELLULOSE LIFECYCLES
          </span>
          <h1 className="font-headline text-3xl md:text-4.5xl font-extrabold tracking-tight text-white">
            Forestry Stewardship Ledger
          </h1>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm md:text-right font-semibold">
          Authentic Danish joinery isn't just constructed—it's harvested in balance with ancient Swedish and Danish reserves.
        </p>
      </header>

      {/* 2. Brand Manifesto Screen */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="text-[10px] font-mono tracking-widest text-emerald-400 font-bold uppercase flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" /> 1. Symmetrical Forestry Guarantee
          </span>
          <h2 className="font-headline text-2xl md:text-3.5xl font-extrabold text-white leading-tight">
            FSC Certified Solid Logging
          </h2>
          <p className="text-xs md:text-sm leading-relaxed text-zinc-400 font-medium">
            We source noble, matured ash and white oak trunks under selective logging directives, completely protecting canopy layers. Every time a certified mature timber trunk is harvested, our guild finances the planting of 3 saplings.
          </p>
          <p className="text-xs md:text-sm leading-relaxed text-zinc-400 font-medium">
            This active reforestation balance means European forest caps actually grow larger synchronously with our master workshop production cycles.
          </p>
          
          <div className="grid grid-cols-3 gap-4 pt-4 text-center font-mono">
            <div className="bg-zinc-900 text-white p-4 rounded-2xl border border-zinc-850">
              <span className="text-sm font-bold block text-emerald-400">3 : 1</span>
              <span className="text-[8px] uppercase tracking-wider text-zinc-500 mt-1.5 block leading-none font-semibold">Planting Delta</span>
            </div>
            <div className="bg-zinc-900 text-white p-4 rounded-2xl border border-zinc-850">
              <span className="text-sm font-bold block text-emerald-400">100%</span>
              <span className="text-[8px] uppercase tracking-wider text-zinc-500 mt-1.5 block leading-none font-semibold">FSC Sourced</span>
            </div>
            <div className="bg-zinc-900 text-white p-4 rounded-2xl border border-zinc-850">
              <span className="text-sm font-bold block text-emerald-400">80Y+</span>
              <span className="text-[8px] uppercase tracking-wider text-zinc-500 mt-1.5 block leading-none font-semibold">Mature Trunks</span>
            </div>
          </div>
        </div>

        {/* Hand Sanding Image Cell */}
        <div className="relative rounded-3xl overflow-hidden bg-zinc-900 aspect-[4/3] flex items-center justify-center border border-zinc-850 group shadow-lg">
          <img 
            alt="Hand-sanding timber furniture" 
            className="w-full h-full object-cover select-none group-hover:scale-[1.02] filter brightness-90 transition-transform duration-700"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIpsMPQHjynKsNpdlMUlHMwqY7lJ1WHBC_HsfH4CeF8JkEyaUEM70swT3gr5R4PWAlCG3lyvzY4Z0Ds7fqB3R0rgwe2m7PqkH4NMpbFYfWNdpcsOL2RNpbvN0okS3jqh981-_UVpwlKZMxvmAEbhbyv3uin3T0w0hsP5SZkJriBcuZCRYghA-eKhO5e5AFwNDdoFFzAGmuhzF5SMS5c3Z7EhyIr6mO9cI7_Law7gLScsW_pxw9dyOc0zKr_F9uQIT0DUjyK60o-YgF" 
          />
          <div className="absolute top-4 left-4 bg-zinc-950/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl text-[9px] font-mono tracking-wider font-bold uppercase flex items-center gap-1.5 border border-zinc-800 text-white">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> GUILD STAMP ACCREDITATION
          </div>
        </div>
      </section>

      {/* 3. Interactive Wood Maturity & Carbon Calculator */}
      <section className="bg-zinc-900 rounded-3xl border border-zinc-850 p-8 md:p-12 shadow-2xl space-y-10 relative">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <TreePine className="w-8 h-8 text-emerald-400 mx-auto mb-4" />
          <h3 className="font-headline text-2xl font-bold text-white tracking-tight">
            Anatomical Forestry Maturity Engine
          </h3>
          <p className="text-xs md:text-sm text-zinc-400 leading-relaxed font-semibold">
            Adjust the growth calculator below to simulate the lifecycle of our organic materials and discover how long-term forestry stores carbon sustainably inside final seating cabinetry.
          </p>
        </div>

        {/* Dynamic Controls Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          
          {/* Controls Species selector & maturity slider */}
          <div className="space-y-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block">
                1. SELECT ANATOMICAL MATERIAL
              </span>
              <div className="flex flex-col space-y-2.5">
                {(["oak", "ash", "walnut"] as const).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedWood(key)}
                    className={`text-left text-xs px-4 py-3.5 rounded-xl border transition-all flex justify-between items-center cursor-pointer ${
                      selectedWood === key 
                        ? "bg-emerald-500 text-zinc-950 border-emerald-500 font-extrabold shadow-sm" 
                        : "bg-zinc-950 text-zinc-400 border-zinc-850 hover:bg-zinc-800"
                    }`}
                  >
                    <span>{WOOD_SPECIES_STATS[key].name}</span>
                    <Sparkles className={`w-3.5 h-3.5 ${selectedWood === key ? "text-zinc-950 animate-pulse" : "text-zinc-800"}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Growth selector */}
            <div className="space-y-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold">
                  2. HARVEST INTERVAL (AGE)
                </span>
                <span className="text-xs font-bold font-mono text-emerald-400">{growthYears} Years</span>
              </div>
              <input 
                type="range" 
                min="40" 
                max="120"
                step="5"
                value={growthYears}
                onChange={(e) => setGrowthYears(Number(e.target.value))}
                className="w-full h-1 bg-zinc-950 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[8px] text-zinc-500 font-mono">
                <span>40y (Sapling)</span>
                <span>80y (Standard)</span>
                <span>120y (Veteran Wood)</span>
              </div>
            </div>
          </div>

          {/* Sourced Metrics Panels */}
          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-850 space-y-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#baa182] font-bold block mb-1">
                CO2 LOCKED IN CELLULOSE BRICKS
              </span>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-4xl font-headline font-extrabold text-white tracking-tight">
                  {co2Absorbed}
                </span>
                <span className="text-[10px] font-bold text-zinc-500 font-mono uppercase">KG CO2</span>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed mt-4 font-medium">
                This carbon dioxide represents ambient gas locked inside the dense wood fibers, permanently prevented from circulating back into the atmosphere.
              </p>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#baa182] font-bold block mb-1">
                JANKA FIBER RESISTANCE SCORE
              </span>
              <div className="flex items-baseline gap-1.5 mt-1.5">
                <span className="text-2.5xl font-mono font-bold text-emerald-450 text-emerald-400">
                  {jankaRating}
                </span>
                <span className="text-[9px] font-semibold text-zinc-500 font-mono uppercase">lbf</span>
              </div>
            </div>
          </div>

          {/* Fiber profile & matched products */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#baa182] font-bold block mb-2.5">
                ORGANIC SPECIES ANATOMY
              </span>
              <div className="text-xs text-zinc-350 space-y-3 font-medium bg-zinc-950 p-4 rounded-xl border border-zinc-850/40">
                <p><strong>Cell Ribs:</strong> {activeWood.fiberPattern}</p>
                <p><strong>Buffers:</strong> {activeWood.restorationCare}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-zinc-850">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#baa182] font-bold block mb-3 leading-none">
                Artifact Models Using {activeWood.name.split(" ").slice(-1)[0] || "Oak"}
              </span>
              <div className="space-y-2">
                {harvestedMatchedProducts.map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => onProductClick(p)}
                    className="flex justify-between items-center bg-zinc-950 hover:bg-zinc-800 px-4 py-3 rounded-xl border border-zinc-850 cursor-pointer text-xs font-bold group transition-all"
                  >
                    <span className="truncate max-w-[150px] text-zinc-300 group-hover:text-emerald-450 group-hover:text-emerald-400">{p.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Traditional Joint Crafts Section (Split Bento Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-850 space-y-4 shadow-xl">
          <Award className="w-7 h-7 text-emerald-400" />
          <h4 className="font-headline text-base font-bold text-white">Traditional Cabinetmaker's Guild</h4>
          <p className="text-xs leading-relaxed text-zinc-400 font-medium">
            We banish cheap metal brackets or laminate glue films. Sideboards are constructed solely via Mortise-and-Tenon, sliding tongue joints, and hand-inserted oak dowels to allow wood breathing room.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-850 space-y-4 shadow-xl">
          <Compass className="w-7 h-7 text-emerald-400" />
          <h4 className="font-headline text-base font-bold text-white">Danish Local Workshop Integrity</h4>
          <p className="text-xs leading-relaxed text-zinc-400 font-medium">
            Unlike cheap flat-pack logistics, all seating loops are steam-bent, clamped, and glued by certified master cabinetmakers in regional Scandinavian factories, ensuring objects last generations.
          </p>
        </div>

        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-850 space-y-4 shadow-xl">
          <Leaf className="w-7 h-7 text-emerald-400" />
          <h4 className="font-headline text-base font-bold text-white">Manual Zero-VOC Natural Linseeds</h4>
          <p className="text-xs leading-relaxed text-zinc-400 font-medium">
            Each artifact is rubbed repeatedly with organic cold-pressed linseeds and pure Swedish beeswax. We forbid formaldehyde sealants so that you touch the honest wood grain.
          </p>
        </div>
      </section>

      {/* 5. Big CTA Banner */}
      <section className="bg-gradient-to-br from-indigo-950/20 to-zinc-900 border border-zinc-850 p-10 md:p-14 rounded-3xl flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6 shadow-2xl">
        <div>
          <h3 className="font-headline text-lg md:text-xl font-bold mb-2 text-white">
            Ready to arrange these noble materials?
          </h3>
          <p className="text-xs text-zinc-400 font-semibold">
            Browse our verified inventory or input custom room dimensions inside our space advisor.
          </p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setView("catalog")}
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-lg transition-transform"
          >
            Explore Catalog
          </button>
          <button 
            onClick={() => setView("advisor")}
            className="border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-white hover:text-emerald-400 text-xs font-bold tracking-widest uppercase px-6 py-3.5 rounded-xl cursor-pointer"
          >
            AI Spatial Planner
          </button>
        </div>
      </section>

    </div>
  );
}
