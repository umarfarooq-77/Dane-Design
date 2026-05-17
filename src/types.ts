export interface Product {
  id: string;
  name: string;
  category: "seating" | "lighting" | "tables" | "storage";
  subtitle: string;
  price: number;
  imageUrl: string;
  description: string;
  designer: string;
  year: string;
  materials: string[];
  dimensions: string;
  origin: string;
  finishes: string[];
  fabrics?: string[];
  paperCords?: string[];
  rating: number;
}

export interface CartItem {
  id: string; // Combined key of productId + custom finishes
  product: Product;
  quantity: number;
  selectedFinish: string;
  selectedFabric?: string;
  selectedCord?: string;
}

export interface Category {
  id: "seating" | "lighting" | "tables" | "storage";
  name: string;
  productCount: number;
  imageUrl: string;
}

export interface AIRecommendation {
  advisorGreeting: string;
  materialCritique: string;
  spaceLayoutStrategy: string;
  recommendedProducts: {
    productName: string;
    designReasoning: string;
    placementTip: string;
  }[];
  aestheticVerdict: string;
}
