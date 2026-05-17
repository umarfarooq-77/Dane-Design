import React, { useState, useEffect } from "react";
import { Sparkles, Compass, Lightbulb, Hammer, Star, Wand2, RefreshCw, Layers, Check, ChevronRight, Paintbrush } from "lucide-react";
import { AIRecommendation, Product } from "../types";
import { PRODUCTS, PRECONFIG_ROOMS } from "../constants";
import { motion, AnimatePresence } from "motion/react";

interface AdvisorViewProps {
  onProductClick: (product: Product) => void;
  onAddToCartDirect: (product: Product, selectedFinish: string) => void;
}

// Contemplative quotes to show during craftsman loading sequence
const CRAFTSMAN_QUOTES = [
  "\"A chair is to have no backside. It should be beautiful from all angles.\" — Hans J. Wegner",
  "\"We must take care that everything is as simple and clean as possible.\" — Kaare Klint",
  "\"The wood has waited eighty years in the forest to become a useful object. We must treat it with deep respect.\"",
  "\"A home is built for life. Lighting must feel like natural morning rays filtering through pine needles.\"",
  "\"Good design is not just what looks elegant; it is the truth of joinery and clean structural utility.\"",
  "\"With simple things, the craftsman's joinery becomes the sole source of ornament.\""
];

export default function AdvisorView({ onProductClick, onAddToCartDirect }: AdvisorViewProps) {
  
  // Form parameters
  const [roomType, setRoomType] = useState("Living Room");
  const [dimensions, setDimensions] = useState("");
  const [currentVibe, setCurrentVibe] = useState("");
  const [desiredVibe, setDesiredVibe] = useState("");
  const [favoriteMaterials, setFavoriteMaterials] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);

  // Response and loading attributes
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aiData, setAiData] = useState<AIRecommendation | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Quote rotation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setInterval(() => {
        setCurrentQuoteIndex((prev) => (prev + 1) % CRAFTSMAN_QUOTES.length);
      }, 4200);
    }
    return () => clearInterval(timer);
  }, [isLoading]);

  const loadPreset = (presetId: string) => {
    const preset = PRECONFIG_ROOMS.find(r => r.id === presetId);
    if (preset) {
      setRoomType(preset.id === "oslo-nordic-cabin" ? "Study/Office Workspace" : "Living Room");
      setDimensions(preset.dimensions);
      setCurrentVibe(preset.currentVibe);
      setDesiredVibe(preset.desiredVibe);
      setFavoriteMaterials(preset.favoriteMaterials);
      setUserDescription(preset.description);
      
      // Optionally preselect appropriate catalog works in checklist 
      if (presetId === "copenhagen-loft") {
        setSelectedProductIds(["wishbone-chair", "teak-sideboard"]);
      } else if (presetId === "stockholm-studio") {
        setSelectedProductIds(["wishbone-chair", "brass-column-lamp"]);
      } else {
        setSelectedProductIds(["eames-lounge", "arco-lamp"]);
      }
    }
  };

  const toggleProductSelect = (id: string) => {
    setSelectedProductIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAskWegner = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setAiData(null);
    setCurrentQuoteIndex(0);

    // Map matched product names for Wegner reference
    const matchedNames = PRODUCTS
      .filter(p => selectedProductIds.includes(p.id))
      .map(p => p.name);

    try {
      const response = await fetch("/api/gemini/advisor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomType,
          dimensions,
          currentVibe,
          desiredVibe,
          favoriteMaterials,
          userDescription,
          selectedProducts: matchedNames
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        let parsedErr = "API returned an invalid response code.";
        try {
          parsedErr = JSON.parse(errText).error || parsedErr;
        } catch(e) {}
        throw new Error(parsedErr);
      }

      const parsedJSON = await response.json();
      setAiData(parsedJSON);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to establish a connection with the Spatial Planning server. Please retry.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-zinc-950 min-h-screen py-10 px-6 max-w-7xl mx-auto text-white">
      
      {/* Page Header styled as premium bento top box */}
      <header className="mb-14 border-b border-zinc-900 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-450 text-emerald-400 block mb-2 font-mono">
            COGNITIVE INTERIOR PROTOCOLS
          </span>
          <h1 className="font-headline text-3xl md:text-4.5xl font-extrabold tracking-tight text-white">
            AI Space Planner Desk
          </h1>
        </div>
        <p className="text-xs text-zinc-400 max-w-sm md:text-right font-semibold">
          Draft layout topologies directly with the system. Analyze lumber grains, solar shadows, and structural timber metrics.
        </p>
      </header>

      {/* Main split-view or full loading block */}
      <div className="relative">
        
        {/* AnimatePresence for Loading and Results */}
        <AnimatePresence mode="wait">
          
          {/* Active spatial compilation spinner */}
          {isLoading && (
            <motion.div 
              key="loading-screen"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-10 md:p-20 text-center shadow-2xl flex flex-col items-center justify-center min-h-[500px] relative overflow-hidden"
            >
              {/* Absolute glass matrix dots backdrop */}
              <div className="absolute inset-0 grid-scanline opacity-20 pointer-events-none"></div>

              <div className="relative w-16 h-16 mb-10">
                <div className="absolute inset-0 rounded-full border-2 border-zinc-800 border-t-emerald-400 animate-spin"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 p-3 rounded-full border border-zinc-800">
                  <Sparkles className="w-5 h-5 text-emerald-450 text-emerald-400 animate-pulse" />
                </div>
              </div>

              <span className="font-mono text-xs tracking-widest uppercase font-bold text-emerald-400 mb-3">
                QUERYING THE DANISH GUILD ARCHIVE DATABASE
              </span>
              
              {/* Rotating quotes sequence */}
              <div className="max-w-xl min-h-[80px] flex items-center justify-center z-10">
                <motion.p 
                  key={currentQuoteIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-sans italic text-sm md:text-base leading-relaxed text-zinc-300"
                >
                  {CRAFTSMAN_QUOTES[currentQuoteIndex]}
                </motion.p>
              </div>

              <p className="text-[10px] text-zinc-500 uppercase tracking-[0.14em] mt-8 font-mono">
                Calculating room node lighting coefficients • aligning active grains
              </p>
            </motion.div>
          )}

          {/* Render AI Result View */}
          {!isLoading && aiData && (
            <motion.div
              key="advisor-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="space-y-10"
            >
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-zinc-900 px-6 py-5 rounded-3xl border border-zinc-850 shadow-2xl gap-4">
                <span className="text-xs font-bold uppercase font-mono text-emerald-400 flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-400" /> TOPOLOGY OPTIMIZATION STREAM COMPLETED
                </span>
                <button 
                  onClick={() => setAiData(null)}
                  className="bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-bold tracking-wider uppercase px-5 py-2.5 rounded-2xl border border-zinc-850 cursor-pointer flex items-center gap-2"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> Adjust Topology Inputs
                </button>
              </div>

              {/* Handcrafted Boardroom Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* Visual Welcome Board & Critique */}
                <div className="lg:col-span-2 bg-zinc-900 rounded-3xl border border-zinc-850 p-8 md:p-12 shadow-2xl space-y-10">
                  
                  {/* Wegner Letter */}
                  <div className="border-b border-zinc-800 pb-8 relative">
                    <span className="font-mono text-[9px] tracking-widest text-[#baa182] font-semibold uppercase block mb-2">Designer Greeting Log</span>
                    <h3 className="font-headline text-xl md:text-2xl font-bold text-white mb-4 pr-10">
                      Guild Master Structural Briefing
                    </h3>
                    <Compass className="absolute top-0 right-0 w-8 h-8 text-zinc-800" />
                    <p className="font-sans text-sm md:text-[15px] leading-relaxed text-zinc-200 italic">
                      {aiData.advisorGreeting}
                    </p>
                  </div>

                  {/* Material Insights */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs tracking-widest text-emerald-405 text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                      <Layers className="w-4 h-4" /> Material &amp; Fiber Critique
                    </h4>
                    <p className="text-xs md:text-sm leading-relaxed text-zinc-300 bg-zinc-950 p-6 rounded-2xl border border-zinc-850/50">
                      {aiData.materialCritique}
                    </p>
                  </div>

                  {/* Layout Strategy */}
                  <div className="space-y-4">
                    <h4 className="font-mono text-xs tracking-widest text-emerald-405 text-emerald-400 uppercase font-bold flex items-center gap-1.5">
                      <Compass className="w-4 h-4" /> Spatial Vector Orientation
                    </h4>
                    <p className="text-xs md:text-sm leading-relaxed text-zinc-300 whitespace-pre-line font-medium leading-relaxed">
                      {aiData.spaceLayoutStrategy}
                    </p>
                  </div>
                </div>

                {/* Recommended Products sidebar widget */}
                <div className="space-y-6">
                  
                  {/* Dynamic side heading */}
                  <div className="bg-zinc-900 border border-zinc-850 p-6 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500"></div>
                    <h4 className="font-headline text-sm tracking-wide font-bold mb-1 flex items-center gap-1.5 text-white">
                      <Wand2 className="w-4 h-4 text-emerald-400" /> Selected Objects mapping
                    </h4>
                    <p className="text-[10px] text-zinc-500 font-mono">FITTED MODEL CODES</p>
                  </div>

                  {/* List out mapped items from our store */}
                  <div className="space-y-4">
                    {aiData.recommendedProducts.map((rec, index) => {
                      // Lookup product from local file catalog
                      const mappedProduct = PRODUCTS.find(
                        p => p.name.toLowerCase().includes(rec.productName.toLowerCase()) || 
                             rec.productName.toLowerCase().includes(p.name.toLowerCase())
                      );

                      return (
                        <div key={index} className="bg-zinc-900 border border-zinc-850 rounded-3xl p-5 shadow-xl space-y-4">
                          <header className="flex justify-between items-start border-b border-zinc-800 pb-3.5">
                            <div>
                              <span className="text-[9px] uppercase font-mono tracking-widest text-emerald-400 block font-bold">Suggested Object</span>
                              <h5 className="text-xs font-bold text-white mt-1">{rec.productName}</h5>
                            </div>
                            {mappedProduct && (
                              <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-xl border border-emerald-500/15">${mappedProduct.price}</span>
                            )}
                          </header>

                          <div className="text-xs text-zinc-400 space-y-2.5">
                            <p className="italic">“{rec.designReasoning}”</p>
                            <p className="text-zinc-200"><span className="underline decoration-emerald-500">Placement:</span> {rec.placementTip}</p>
                          </div>

                          {/* Quick Add option if product matches store */}
                          {mappedProduct ? (
                            <div className="flex gap-2.5 pt-2">
                              <button 
                                onClick={() => onProductClick(mappedProduct)}
                                className="flex-1 bg-zinc-950 hover:bg-zinc-800 text-white hover:text-emerald-400 border border-zinc-805 text-[10px] font-bold tracking-wider uppercase py-2 cursor-pointer rounded-xl text-center"
                              >
                                View Specs
                              </button>
                              <button 
                                onClick={() => {
                                  onAddToCartDirect(mappedProduct, mappedProduct.finishes[0]);
                                }}
                                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-[10px] font-bold tracking-wider uppercase py-2 cursor-pointer rounded-xl text-center flex items-center justify-center gap-1 hover:shadow-[0_0_15px_rgba(52,211,153,0.2)] transition-shadow"
                              >
                                Add model <ChevronRight className="w-3 h-3 text-zinc-950" />
                              </button>
                            </div>
                          ) : (
                            <div className="text-[10px] text-zinc-500 bg-zinc-950 p-2.5 text-center rounded-xl border border-zinc-850">
                              Consult registry catalog indexes.
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Verdict sign off */}
                  <div className="bg-zinc-900 p-6 rounded-3xl border border-zinc-850 text-xs space-y-3">
                    <span className="font-bold text-emerald-400 block uppercase font-mono tracking-wider text-[9px]">Aesthetic Verdict Node</span>
                    <p className="italic text-zinc-400 leading-relaxed">{aiData.aestheticVerdict}</p>
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* Form and Presets Layout */}
          {!isLoading && !aiData && (
            <motion.div 
              key="advisor-form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              
              {/* Left pane: Guidelines & Presets */}
              <div className="space-y-8">
                
                {/* Guild Principles with fine green gradient */}
                <div className="bg-gradient-to-br from-[#064e3b]/80 to-zinc-950 text-white p-8 rounded-3xl shadow-2xl space-y-4 border border-emerald-950/40 relative">
                  <div className="absolute top-4 right-4 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-405 bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </div>
                  <Compass className="w-7 h-7 text-emerald-400" />
                  <h3 className="font-headline text-md tracking-wide font-bold">
                    The Space-Advisor Principles
                  </h3>
                  <p className="text-xs text-zinc-300 leading-relaxed">
                    Hans Wegner's spatial layouts are governed by strict aesthetic logic:
                  </p>
                  <ul className="text-xs text-zinc-300 space-y-2.5 list-disc pl-4 font-medium">
                    <li>Allow clean daylight to bounce over natural solid grains.</li>
                    <li>Balance custom dark timbers with soft linens to eliminate heavy shadows.</li>
                    <li>Forbid artificial clutter; celebrate joinery, physics, and breathing margin.</li>
                  </ul>
                </div>

                {/* Preset Scandi Rooms */}
                <div className="space-y-4 text-white">
                  <h4 className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                    CHOOSE AN ARCHITECTURAL PRESET
                  </h4>
                  <div className="flex flex-col space-y-3">
                    {PRECONFIG_ROOMS.map((preset) => (
                      <div 
                        key={preset.id}
                        onClick={() => loadPreset(preset.id)}
                        className="p-4 bg-zinc-900 hover:bg-zinc-850 rounded-2xl border border-zinc-850 hover:border-emerald-400/50 transition-all cursor-pointer shadow-xl group"
                      >
                        <header className="flex justify-between items-center mb-2">
                          <h5 className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                            {preset.name}
                          </h5>
                          <span className="text-[8px] font-mono tracking-wider font-semibold text-emerald-450 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-lg border border-emerald-500/10">
                            {preset.dimensions === "24ft x 18ft, high 12ft ceilings" ? "LOFT" : preset.dimensions === "16ft x 14ft, regular 8.5ft ceilings" ? "STUDIO" : "CABIN"}
                          </span>
                        </header>
                        <p className="text-[11px] text-zinc-400 leading-relaxed">
                          {preset.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right pane: Interactive Advisor Form Desk */}
              <div className="lg:col-span-2 bg-zinc-900 rounded-3xl border border-zinc-850 p-8 md:p-10 shadow-2xl">
                
                {error && (
                  <div className="bg-red-950/40 text-red-400 p-4 rounded-2xl text-xs leading-relaxed mb-6 border border-red-900/40 flex items-center gap-2">
                    <span className="font-bold underline">Error occurred:</span> {error}
                  </div>
                )}

                <form onSubmit={handleAskWegner} className="space-y-6">
                  
                  {/* Row 1: Room Type & Dimensions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-2 font-bold">
                        Room Type / Purpose
                      </label>
                      <select
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full text-xs bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-xl focus:border-emerald-400 text-white outline-none inline-block cursor-pointer font-semibold"
                      >
                        <option value="Living Room">Living Room Lounge</option>
                        <option value="Dining Room">Dining Hall</option>
                        <option value="Study/Office Workspace">Studio Workspace</option>
                        <option value="Bedroom">Sleeping Chamber / Bedroom</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-2 font-bold">
                        Dimensions (Approximate)
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g., 20ft x 15ft with high skylights" 
                        value={dimensions}
                        onChange={(e) => setDimensions(e.target.value)}
                        className="w-full text-xs bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-xl focus:border-emerald-400 text-white outline-none font-semibold"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 2: Mood & Aesthetic Profile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-2 font-bold">
                        Current Vibe / Setup
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g., Cold white walls, brick fireplace, empty corner" 
                        value={currentVibe}
                        onChange={(e) => setCurrentVibe(e.target.value)}
                        className="w-full text-xs bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-xl focus:border-emerald-400 text-white outline-none font-semibold"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-2 font-bold">
                        Desired Vibe / Ambience
                      </label>
                      <input 
                        type="text" 
                        placeholder="e.g., Warm natural textures, cosy reading corner, amber lights" 
                        value={desiredVibe}
                        onChange={(e) => setDesiredVibe(e.target.value)}
                        className="w-full text-xs bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-xl focus:border-emerald-400 text-white outline-none font-semibold"
                        required
                      />
                    </div>
                  </div>

                  {/* Materials Choice */}
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-2 font-bold">
                      Preferred Solid Materials / Finishes
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g., Bleached ash wood, black matte steel, woven flax cord, natural linen" 
                      value={favoriteMaterials}
                      onChange={(e) => setFavoriteMaterials(e.target.value)}
                      className="w-full text-xs bg-zinc-950 border border-zinc-800 px-4 py-3 rounded-xl focus:border-emerald-400 text-white outline-none font-semibold"
                      required
                    />
                  </div>

                  {/* Curated checklist of store items referenced */}
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-2.5 font-bold">
                      Reference specific objects from our Guild Catalog
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-4 bg-zinc-950 rounded-2xl border border-zinc-850">
                      {PRODUCTS.map(p => (
                        <div 
                          key={p.id}
                          onClick={() => toggleProductSelect(p.id)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl cursor-pointer transition-all select-none border ${selectedProductIds.includes(p.id) ? "bg-emerald-500 text-zinc-950 border-emerald-500 font-extrabold shadow-sm" : "bg-zinc-900 hover:bg-zinc-850 border-zinc-800 text-zinc-400"}`}
                        >
                          <div className={`w-3.5 h-3.5 border rounded flex items-center justify-center ${selectedProductIds.includes(p.id) ? "border-zinc-950 bg-zinc-950 text-emerald-400" : "border-zinc-800 bg-zinc-950"}`}>
                            {selectedProductIds.includes(p.id) && <Check className="w-2.5 h-2.5 stroke-[3.5]" />}
                          </div>
                          <span className="text-[10px] truncate leading-none">{p.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Context Textarea Detail */}
                  <div>
                    <label className="text-[10px] uppercase font-mono tracking-widest text-emerald-400 block mb-2 font-bold">
                      Additional context / Structural details of your home
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="e.g., The morning sun comes directly from the east, projecting harsh shadows onto my blank north wall..."
                      value={userDescription}
                      onChange={(e) => setUserDescription(e.target.value)}
                      className="w-full text-xs bg-zinc-950 border border-zinc-800 p-4 rounded-xl focus:border-emerald-400 text-white outline-none resize-none font-semibold leading-relaxed"
                      required
                    ></textarea>
                  </div>

                  {/* Trigger Button */}
                  <button
                    type="submit"
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 py-4.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] cursor-pointer flex items-center justify-center gap-2 active:scale-99"
                  >
                    <Sparkles className="w-4 h-4 text-zinc-950" />
                    Compute Space Optimization Protocols
                  </button>
                </form>

              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

    </div>
  );
}
