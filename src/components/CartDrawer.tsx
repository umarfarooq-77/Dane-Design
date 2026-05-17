import React, { useState } from "react";
import { X, ShoppingBag, Plus, Minus, Trash2, CreditCard, Truck, Receipt, CheckCircle, ArrowRight, TreePine, Lock } from "lucide-react";
import { CartItem } from "../types";
import { motion, AnimatePresence } from "motion/react";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQty: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onClearCart: () => void;
}

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQty, 
  onRemoveItem,
  onClearCart
}: CartDrawerProps) {
  
  // Checkout flow controller state: "cart" | "checkout" | "processing" | "success"
  const [stage, setStage] = useState<"cart" | "checkout" | "processing" | "success">("cart");
  
  // Eco tree-planting offset
  const [ecoOffset, setEcoOffset] = useState(true);

  // Form parameters
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  // Loading text rotation during premium woodwork processing simulation
  const [craftProcessText, setCraftProcessText] = useState("Gluing joint dowels...");

  const subtotal = cart.reduce((acc, curr) => acc + (curr.product.price * curr.quantity), 0);
  const ecoCost = ecoOffset ? 5.00 : 0.00;
  const shippingCost = subtotal > 1500 ? 0.00 : 150.00; // Premium crating fee
  const orderTotal = subtotal + ecoCost + shippingCost;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStage("processing");
    
    // Animate a series of physical woodworking tasks to make checkout incredible!
    const processSteps = [
      { text: "Securing solid walnut frameworks...", ms: 1200 },
      { text: "Polishing paper cord thread seals...", ms: 2400 },
      { text: "Waxing wood surfaces with organic beeswax...", ms: 3600 },
      { text: "Crating artifacts securely in spruce boxes...", ms: 4800 },
      { text: "Filing high-priority customs bills...", ms: 5800 }
    ];

    processSteps.forEach((step) => {
      setTimeout(() => {
        setCraftProcessText(step.text);
      }, step.ms);
    });

    // Advance to receipt stage
    setTimeout(() => {
      setStage("success");
    }, 6500);
  };

  const handleCloseInternal = () => {
    // Reset state before closing
    setStage("cart");
    onClose();
  };

  const restartShopping = () => {
    onClearCart();
    setStage("cart");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-sans">
        
        {/* Backdrop filter cover */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseInternal}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"
        ></motion.div>

        {/* Sliding Drawer Container */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10 select-none">
          <motion.div 
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-screen max-w-md bg-zinc-950 border-l border-zinc-900 flex flex-col justify-between shadow-2xl relative text-white"
          >
            {/* Header section handles view context */}
            <header className="px-6 py-5 border-b border-zinc-900 flex justify-between items-center bg-zinc-950 text-white">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-emerald-450 text-emerald-400 animate-pulse" />
                <h2 className="font-headline text-sm font-bold tracking-tight uppercase font-mono">
                  {stage === "cart" && "Sourcing Crate"}
                  {stage === "checkout" && "Premium Checkout"}
                  {stage === "processing" && "Crafting Crate"}
                  {stage === "success" && "Order Booked"}
                </h2>
              </div>
              <button 
                onClick={handleCloseInternal}
                className="p-1 px-2 py-0.5 border border-zinc-850 hover:border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </header>

            {/* STAGE 1: Standard Cart Shopping Items */}
            {stage === "cart" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cart.length === 0 ? (
                  <div className="text-center py-24 text-zinc-400 space-y-5">
                    <ShoppingBag className="w-10 h-10 text-emerald-400 mx-auto opacity-75 animate-bounce" />
                    <h3 className="font-headline text-sm font-bold text-white">Basket is Empty</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                      Explore our mid-century chairs, storage solutions, or lighting fixtures to load custom designs onto your shipping crate.
                    </p>
                    <button 
                      onClick={onClose}
                      className="inline-block bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-xs font-bold tracking-widest uppercase px-6 py-3 rounded-xl cursor-pointer hover:shadow-lg transition-all"
                    >
                      Return to Gallery
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Items List */}
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={item.id} className="bg-zinc-900 p-4 rounded-2xl border border-zinc-850/70 flex gap-4">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-16 h-16 object-cover rounded-xl bg-zinc-950 border border-zinc-850/60 flex-shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="flex-1 min-w-0 flex flex-col justify-between">
                            <div>
                              <h4 className="text-xs font-bold truncate text-white">{item.product.name}</h4>
                              <p className="text-[10px] text-zinc-400 mt-1 truncate leading-none">
                                {item.selectedFinish} {item.selectedFabric ? `/ ${item.selectedFabric}` : ""} {item.selectedCord ? `/ ${item.selectedCord}` : ""}
                              </p>
                            </div>

                            <div className="flex justify-between items-center mt-2.5">
                              {/* Quantity adjustments */}
                              <div className="flex items-center border border-zinc-800 bg-zinc-950 rounded-xl">
                                <button 
                                  onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                                  className="px-2.5 py-1 text-zinc-400 hover:text-white text-xs cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-bold font-mono text-emerald-400">{item.quantity}</span>
                                <button 
                                  onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                                  className="px-2.5 py-1 text-zinc-400 hover:text-white text-xs cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="text-xs font-bold font-mono text-emerald-400">
                                ${(item.product.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                          </div>

                          <button 
                            onClick={() => onRemoveItem(item.id)}
                            className="p-1 hover:text-red-400 text-zinc-500 flex-shrink-0 self-start transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Sustainable Tree planting offset box */}
                    <div className="bg-gradient-to-br from-[#064e3b]/30 to-zinc-950 p-4.5 rounded-2xl border border-emerald-900/30 flex gap-3 text-white">
                      <input 
                        type="checkbox" 
                        checked={ecoOffset}
                        onChange={(e) => setEcoOffset(e.target.checked)}
                        className="cursor-pointer accent-emerald-400 mt-1 h-4.5 w-4.5"
                        id="eco-planting-box1"
                      />
                      <label htmlFor="eco-planting-box1" className="cursor-pointer">
                        <span className="text-xs font-bold text-white flex items-center gap-1.5 leading-none mb-1">
                          <TreePine className="w-4 h-4 text-emerald-400" /> Plant certified woodland sapling
                        </span>
                        <span className="text-[10px] text-zinc-400 leading-relaxed block font-medium">
                          Add <span className="font-bold text-emerald-400 font-mono">$5.00</span> to plant a certified Danish ash sapling in Aarhus reserves, absorbing logistics emissions.
                        </span>
                      </label>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* STAGE 2: Interactive Checkout form details */}
            {stage === "checkout" && (
              <form onSubmit={handleCheckoutSubmit} className="flex-1 overflow-y-auto p-6 space-y-5 col text-white">
                
                {/* Shipping info */}
                <fieldset className="space-y-3.5">
                  <legend className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block mb-2 font-bold flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-400" /> 1. Shipping Destination Ledger
                  </legend>
                  <p className="text-[10px] text-zinc-400 leading-relaxed font-semibold">
                    Products are crated in custom protective spruce timber. Deliveries follow selective climate-protected logistics.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="First Name" 
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-emerald-400 font-semibold"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name" 
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-emerald-400 font-semibold"
                      required
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Recipient Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-emerald-400 font-semibold"
                    required
                  />
                  <input 
                    type="text" 
                    placeholder="Physical Street Delivery Address" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-emerald-400 font-semibold"
                    required
                  />
                </fieldset>

                {/* Billing info */}
                <fieldset className="space-y-3 pt-5 border-t border-zinc-900">
                  <legend className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 block mb-2.5 font-bold flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-400" /> 2. Secure Billing Node
                  </legend>
                  
                  {/* Mock card overlay badge styled incredibly premium green */}
                  <div className="bg-emerald-500 text-zinc-950 p-5 rounded-3xl mb-3 shadow-lg space-y-4 border border-emerald-400">
                    <header className="flex justify-between items-center text-[8px] font-mono uppercase tracking-[0.14em] font-extrabold text-zinc-900">
                      <span>GUILD WALLET SIGNATURE</span>
                      <Lock className="w-3.5 h-3.5 text-zinc-900" />
                    </header>
                    <div className="font-mono text-sm tracking-widest text-zinc-950 font-extrabold">
                      {cardNumber ? cardNumber.replace(/\d{4}(?=.)/g, '$& ') : "•••• •••• •••• ••••"}
                    </div>
                    <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-900">
                      <span>CLIENT: {firstName || lastName ? `${firstName} ${lastName}`.toUpperCase() : "REGISTRY CLIENT"}</span>
                      <span>EXPIRY: {cardExpiry || "MM/YY"}</span>
                    </div>
                  </div>

                  <input 
                    type="text" 
                    maxLength={16}
                    placeholder="Credit Card Number (16-digits)" 
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-xl text-white placeholder-zinc-550 placeholder-zinc-500 outline-none focus:border-emerald-400 font-bold font-mono"
                    required
                  />
                  
                  <div className="grid grid-cols-2 gap-3">
                    <input 
                      type="text" 
                      placeholder="MM/YY" 
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-emerald-400 font-semibold font-mono text-center"
                      required
                    />
                    <input 
                      type="password" 
                      maxLength={3}
                      placeholder="CVV" 
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                      className="bg-zinc-900 border border-zinc-800 text-xs p-3 rounded-xl text-white placeholder-zinc-500 outline-none focus:border-emerald-400 font-semibold font-mono text-center"
                      required
                    />
                  </div>
                </fieldset>

                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1.5 justify-center pt-2 font-bold">
                  <Lock className="w-3 h-3 text-emerald-450 text-emerald-400" /> SECURE BANK SSL LAYER • DANE ENCRYPTED
                </div>
              </form>
            )}

            {/* STAGE 3: Processing loading page woodwork simulator */}
            {stage === "processing" && (
              <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-6 text-white bg-zinc-950">
                <div className="relative w-14 h-14">
                  <div className="absolute inset-0 rounded-full border-2 border-zinc-900 border-t-emerald-400 animate-spin"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <LoaderWoodworker className="w-5 h-5 text-emerald-400 animate-bounce" />
                  </div>
                </div>

                <div className="text-center">
                  <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400 block mb-1.5">
                    Anatomical Compiling
                  </span>
                  <h4 className="font-headline text-md font-bold text-white">
                    Constructing Delivery Crate
                  </h4>
                  <p className="text-xs text-zinc-400 mt-4 max-w-xs mx-auto leading-relaxed">
                    Our team is matching your cabinetmaker logs, securing dense wax shields, and verifying joint tolerances...
                  </p>
                </div>

                <div className="bg-zinc-900 text-emerald-400 border border-zinc-800 px-5 py-3 rounded-xl text-xs font-mono font-bold shadow-md">
                  {craftProcessText}
                </div>
              </div>
            )}

            {/* STAGE 4: Animated Receipt success screen */}
            {stage === "success" && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6 text-white">
                <div className="text-center space-y-3 pt-6">
                  <CheckCircle className="w-11 h-11 text-emerald-400 mx-auto" />
                  <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 block font-bold">
                    Signature Accepted
                  </span>
                  <h3 className="font-headline text-xl font-bold text-white">
                    Bespoke Crate Booked!
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-xs mx-auto">
                    An automated logging slip was dispatched to <span className="font-bold underline text-white">{email || "client@dane-guild.dk"}</span>.
                  </p>
                </div>

                {/* Structured Invoice box */}
                <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-850 font-mono text-xs text-zinc-400 space-y-4 shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-1 bg-emerald-500"></div>
                  
                  <header className="flex justify-between border-b border-zinc-800 pb-3 text-[10px] font-bold">
                    <span>REGISTRY ID: DANE-9421-DK</span>
                    <span>{new Date().toLocaleDateString("da-DK")}</span>
                  </header>

                  <div className="space-y-2 border-b border-zinc-800 pb-3.5">
                    <span className="text-[8px] uppercase tracking-wider block font-bold text-emerald-400">Items Sourced:</span>
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-[11px] text-white font-semibold">
                        <span>{item.quantity}x {item.product.name.substring(0, 18)}...</span>
                        <span>${(item.product.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span>Logistics Subtotal:</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    {ecoOffset && (
                      <div className="flex justify-between">
                        <span>Sapling forest fee:</span>
                        <span>$5.00</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Climate Crate Logistics:</span>
                      <span>{shippingCost === 0 ? "FREE (Guild Overpass)" : "$150.00"}</span>
                    </div>
                    <div className="flex justify-between font-bold text-white text-sm pt-2 border-t border-dashed border-zinc-850">
                      <span>Total Invoice:</span>
                      <span className="text-emerald-400">${orderTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {ecoOffset && (
                    <div className="bg-emerald-950/40 text-emerald-400 p-3.5 rounded-xl text-[10px] font-semibold border border-emerald-900/40 flex items-center gap-2">
                      <TreePine className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span>One Danish Ash sapling is allocated for planting in the Aarhus reserve.</span>
                    </div>
                  )}
                </div>

                {/* Delivery estimates */}
                <div className="bg-zinc-900 p-5 rounded-3xl border border-zinc-850 text-xs space-y-2 font-semibold text-zinc-300">
                  <h5 className="font-bold text-emerald-400 uppercase font-mono tracking-wider text-[10px] flex items-center gap-1.5">
                    <Truck className="w-4 h-4" /> ESTIMATED ESCORT INTERVAL
                  </h5>
                  <p className="text-xs">
                    Crate will arrive between <span className="font-bold text-white">May 24th and May 29th</span>. Secure tracing is available under your registry codes.
                  </p>
                </div>
              </div>
            )}

            {/* Sticky Bottom Actions footer */}
            {stage !== "processing" && (
              <footer className="p-6 border-t border-zinc-900 bg-zinc-950 text-white">
                
                {/* Pricing Summary */}
                {stage !== "success" && (
                  <div className="space-y-3 mb-6 text-xs text-zinc-400 font-medium">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-bold text-white">${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Eco reforestation offset:</span>
                      <span className="font-bold text-white">${ecoCost}.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Spruce Crating Logistics:</span>
                      <span className="font-bold text-white">
                        {shippingCost === 0 ? "FREE" : `$${shippingCost}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm font-bold border-t pt-3 border-dashed border-zinc-900 text-white">
                      <span>Invoice Total:</span>
                      <span className="text-base font-extrabold text-emerald-400 font-mono">${orderTotal.toLocaleString()}</span>
                    </div>
                  </div>
                )}

                {/* Action CTA triggers */}
                {stage === "cart" && (
                  <button
                    onClick={() => setStage("checkout")}
                    disabled={cart.length === 0}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-zinc-900 text-zinc-950 disabled:text-zinc-600 border border-transparent disabled:border-zinc-800 py-4 rounded-xl text-xs font-bold tracking-widest uppercase disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg"
                    id="begin-checkout-btn"
                  >
                    Proceed to secure Checkout <ArrowRight className="w-4 h-4 text-zinc-950" />
                  </button>
                )}

                {stage === "checkout" && (
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setStage("cart")}
                      className="flex-1 border border-zinc-800 text-zinc-400 hover:text-white bg-zinc-900 text-center py-3.5 rounded-xl text-xs font-bold uppercase cursor-pointer"
                    >
                      Back to Crate
                    </button>
                    <button
                      onClick={handleCheckoutSubmit}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 text-center py-3.5 rounded-xl text-xs font-extrabold uppercase tracking-wider shadow-lg cursor-pointer"
                    >
                      Complete Order
                    </button>
                  </div>
                )}

                {stage === "success" && (
                  <button
                    onClick={restartShopping}
                    className="w-full bg-emerald-500 hover:bg-emerald-400 text-zinc-950 py-4.5 rounded-xl text-xs font-bold tracking-widest uppercase transition-all cursor-pointer text-center"
                    id="restart-shop-btn"
                  >
                    Clear Crate &amp; Renew Catalog
                  </button>
                )}

              </footer>
            )}

          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

// Inner custom loaders to prevent icon errors
function LoaderWoodworker(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={props.className}
    >
      <path d="m14 4-10-10" />
      <path d="m18 8-2.5-2.5" />
      <path d="M12 11.5c.6.8 1.4 1.4 2.2 2H6L4 20h3.5l1.5-2v-5c.8.6 1.7 1 2.6 1.1s1.9-.2 3.8-.6m-3-2H18m2.5 2.5a2.12 2.12 0 0 1-3-3l1.5-1.5" />
    </svg>
  );
}
