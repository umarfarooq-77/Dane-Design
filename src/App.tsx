import React, { useState } from "react";
import Navbar from "./components/Navbar";
import HomeView from "./components/HomeView";
import CatalogView from "./components/CatalogView";
import AdvisorView from "./components/AdvisorView";
import SustainabilityView from "./components/SustainabilityView";
import ProductModal from "./components/ProductModal";
import CartDrawer from "./components/CartDrawer";
import { Product, CartItem } from "./types";

export default function App() {
  
  // 1. Core structural view toggler
  const [currentView, setView] = useState<"home" | "catalog" | "advisor" | "sustainability">("home");

  // 2. State metrics
  const [selectedCategory, setSelectedCategory] = useState<"all" | "seating" | "lighting" | "tables" | "storage">("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 3. Coordinate navigation filters
  const handleSelectCategoryAndGo = (categoryId: "seating" | "lighting" | "tables" | "storage") => {
    setSelectedCategory(categoryId);
    setView("catalog");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSetViewAndResetFilters = (view: "home" | "catalog" | "advisor" | "sustainability") => {
    if (view === "catalog") {
      setSelectedCategory("all");
    }
    setView(view);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 4. Cart operational mechanisms
  const handleAddToCart = (
    product: Product, 
    quantity: number, 
    finish: string, 
    fabric?: string, 
    paperCord?: string,
    finalPrice?: number
  ) => {
    // Generate a configuration unique ID
    const configId = `${product.id}-${finish.replace(/\s+/g, "")}-${fabric ? fabric.replace(/\s+/g, "") : ""}-${paperCord ? paperCord.replace(/\s+/g, "") : ""}`;

    // Override price if upcharge active
    const actualPrice = finalPrice || product.price;

    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === configId);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === configId 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      
      const newProductRef: Product = {
        ...product,
        price: actualPrice // embed configured price for listing
      };

      return [
        ...prevCart,
        {
          id: configId,
          product: newProductRef,
          quantity,
          selectedFinish: finish,
          selectedFabric: fabric,
          selectedCord: paperCord,
        },
      ];
    });
  };

  const handleAddToCartDirect = (product: Product, selectedFinish: string) => {
    // Standard quick add from advice layout widget
    handleAddToCart(product, 1, selectedFinish, product.fabrics ? product.fabrics[0] : undefined, product.paperCords ? product.paperCords[0] : undefined);
    setIsCartOpen(true);
  };

  const handleUpdateQty = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // 5. Bookmark tracker
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => 
      prev.includes(product.id) 
        ? prev.filter((id) => id !== product.id) 
        : [...prev, product.id]
    );
  };

  // Compute total count in crate
  const cartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col justify-between" id="applet-viewport-root">
      
      {/* Premium Navbar sticky controller */}
      <Navbar 
        currentView={currentView} 
        setView={handleSetViewAndResetFilters} 
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Dynamic View rendering switch */}
      <main className="flex-grow">
        {currentView === "home" && (
          <HomeView 
            setView={handleSetViewAndResetFilters}
            onSelectCategoryAndGo={handleSelectCategoryAndGo}
            onProductClick={setSelectedProduct}
            onAddWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        )}

        {currentView === "catalog" && (
          <CatalogView 
            onProductClick={setSelectedProduct}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onAddWishlist={handleToggleWishlist}
            wishlist={wishlist}
          />
        )}

        {currentView === "advisor" && (
          <AdvisorView 
            onProductClick={setSelectedProduct}
            onAddToCartDirect={handleAddToCartDirect}
          />
        )}

        {currentView === "sustainability" && (
          <SustainabilityView 
            onProductClick={setSelectedProduct}
            setView={handleSetViewAndResetFilters}
          />
        )}
      </main>

      {/* Customizable Material configuration Sheet Modal */}
      <ProductModal 
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onAddWishlist={handleToggleWishlist}
        wishlist={wishlist}
      />

      {/* Slideout interactive Drawer */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
