import { Product, Category } from "./types";

export const CATEGORIES: Category[] = [
  {
    id: "seating",
    name: "Seating",
    productCount: 42,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2yvWB6qnfTyUnFLAdW0OdWi0gqEHgNHtMqDbwt8hCm8Dra2ewz8XpeQJ9mMCBOnIVhQrp-CKRxXkBcWA4M1e3fMImO6a8_Cz0-buqk36yrytSPTNqalOcC23rz3j8x62_hfpf7HhRdUS6d0xreeSplo23WgZBQKKfIUS97Dq8rCUyw66vy5J5fJ0kuiodHnS3qgyE7FdwU96rU0gBrm2q2yqxPkT646tcf8pTyHjA9iShjQagOCWKNnvcKtO5yu3iqYgO_w_VHcw6"
  },
  {
    id: "lighting",
    name: "Lighting",
    productCount: 28,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBElmBiI0KHu6w_tWCKl1dSsH9qpxWbLzOU01fwrPlsWl08TWm1wRh8XiR1HSYxCfLVSIdo_nxsXkC38M0rc2CTD_XMKHn6A04b0obpjq2UeBlugPVOgcc2Jb00Ff61QBzOo4wi2IzvHWGK9WMplXi7fTSZ4-jylqt9dcgdu1GSKgMwRDSFB2vedhD2fVA5RxrSDSz-8U9vms8oAY8msYLFWL0FCHlbU77DFNb93NWWdOhac6HHmnbaRX80Z0te905RGU_GdRT_cvWZ"
  },
  {
    id: "tables",
    name: "Tables",
    productCount: 15,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKr48bu--Peh5KcGRIZgFgYp7uLrv-J4daEj0I-GVdpz9o3MvkIul67k4exGgNBkw9fkhKpcm2QVb_cpHLVWG1CBH-yzzJjF4QRkA4IHRTVvCBfS6jz3bqIBY9GvpZOQ8tG-KyNtpYvT-v7ptMj0iAZCWy7yIVEucl54JhDd7Pml0R97j9tJ0FEtKK0k0N0nWM6CXfO3IIog7OM7klXHuh2Saog6QmeGErxORkhZH6QHPIZ7oB3RrbNBbe2hgAz0s5mBcooe6KKzQS"
  },
  {
    id: "storage",
    name: "Storage",
    productCount: 19,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7EF135fjz6QPldw8gY5sbw4arxWfxIknBMGKEcS36f4x4k9MG9im8HipuCUQ5rb3lSjgm53HLQSVvxh5g_F14ZmYwoxUIOAuxGg52Yd9iqjsyuh63tLtYDMWwLBQ-2KnmAV8XMC0l2xRPXt3Rjzr_Ad1h5aylSrKl-BZuergIUZTXIjib-fO4GaBPVbceSumQ2CgHKEwAnLCweiwz0PRBHNcwGGAAay7IZHf58_AlTn_OTMQVj1ZoM8FUwr5UeVyLA0y4JGzZcIVC"
  }
];

export const PRODUCTS: Product[] = [
  {
    id: "eames-lounge",
    name: "Eames Style Lounge Chair",
    category: "seating",
    subtitle: "Black Leather & Walnut",
    price: 1450,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOrc37x3dZKWOmnYft_9Rw6u5bCa9_3Yt0EajrVQCclH1QoXIvQ-_D34e-0mH3b6khzj3rdUWL4RGdP2SfDSES5FRxZ0YDvodT1u_r6maKjeNygWFuB_MMK3zV4zurFegHJjw9YKhd8B_p0p13v-39FyeXPSgvMJyf9kfs3n0IxftmKoFtVbmpEb2rnrsh9jDDna8FBPbgI6a0_bSy6gOkl6pY2_GrUN209ygiGcZdR892QG0ufEHFYTO9imQLR6-OtLRXi7_9o_v9",
    description: "Designed in 1956, this Eames lounge chair and ottoman set represents the pinnacle of luxurious, organic mid-century design. Expertly constructed with a 7-ply molded walnut veneer shell and premium full-grain black leather upholstery, it is meticulously proportioned to distribute weight evenly and offer transcendent comfort. An essential visual anchor that infuses masculine sophistication into minimalist libraries or open sunlit living areas.",
    designer: "Charles & Ray Eames",
    year: "1956",
    materials: ["Solid Walnut Veneer", "Full Grain Black Leather", "Cast Aluminum Base"],
    dimensions: "33\"W x 33\"D x 32\"H (Seat: 15\"H)",
    origin: "Denmark Assembly",
    finishes: ["Classic Walnut", "Dark Palisander Rosewood", "Oiled Ash"],
    fabrics: ["Premium Obsidian Leather", "Warm Cognac Leather", "Saddle Tan Leather"],
    rating: 4.9
  },
  {
    id: "teak-sideboard",
    name: "Mid-Century Teak Sideboard",
    category: "storage",
    subtitle: "Restored Original",
    price: 2100,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDMhNf8iVuX4cqjkt2vPbUdYOun94dpQuEpcnTyNyzyvUWnSpk0xRdhCn3VbQBcrHj-Hi8cFM3Cq3--IbsFehR75jsvBVUmUyV_TeQ8FwYRgehBpg84yFokeXb0C3WoOuM5oYlW8psL64ohS8xcN87vZlw4pQFqrcYNDV_ojHM2BFSFtAC1sQGZZsTHhBBZtJ3Cn8gkUB05e1IIGjNqjYiiiVyIuFD8zBpI_UVIEwzw7-rTtJ556NhuYmSzkdOtDhcoA-OyYHh7A-ct",
    description: "Crafted in the heart of Copenhagen, this restored masterpiece features honey-toned Danish teak and elegant recessed pulls. Its clean architectural lines, tapered legs, and generous interior shelving embody the less-is-more Scandinavian design ethos. Perfect for displaying vintage glassware, curated design titles, or acting as an elegant credenza underneath large art pieces.",
    designer: "Børge Mogensen Inspired",
    year: "1963",
    materials: ["Solid Teak Framework", "Hand-matched Teak Woodgrain", "Matted Lacquer Coating"],
    dimensions: "72\"W x 18\"D x 31\"H",
    origin: "Sweden Workshop",
    finishes: ["Vintage Danish Teak", "Refined American Walnut", "Bleached White Oak"],
    rating: 4.8
  },
  {
    id: "arco-lamp",
    name: "Arco Floor Lamp",
    category: "lighting",
    subtitle: "Marble Base & Chrome",
    price: 890,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOYH1EyF4S9jG1ShjCXQ8-mcDXS3WKi3IzzddFnldyWE4pZd6AIVtWoGj4MZsNvhQEz3X6ZQVjRYxe3BiDdkGXdjgNRSALKkQMwR8CUek1KS-DeXZ-xdPbL3MM6Vg-KgR1CBzDTenKIN4EokFB2BUM8x7uKNHE0J8eNrNw1TVQ6XBodC9IvQwQMyfvj1FlVNQYv8HTIbujjJMJ7MYW-XXQ1lmUx9XGheXW22tizbZqY9Rk2IVNoPIJAaQ_HzRJFN1iJ_WUQwhaKsfL",
    description: "This structural icon combines a massive Carrara white marble block (originally weight-balanced to lift the lamp effortlessly) with an arcing stainless steel tube and high-grade chrome pendant shell. Designed to provide overhead illumination without requiring ceiling wiring, it hovers beautifully over minimal dining setups or corner reading islands, casting soft multi-directional light.",
    designer: "Achille Castiglioni",
    year: "1962",
    materials: ["White Carrara Marble", "Extruded Stainless Steel", "Polished Chrome Hood"],
    dimensions: "86\"Max H x 78\"Span x 12\"D",
    origin: "Italy Studio",
    finishes: ["Polished Nero Marquina Marble", "Classic Pure Carrara White"],
    rating: 4.7
  },
  {
    id: "wishbone-chair",
    name: "CH24 Wishbone Chair",
    category: "seating",
    subtitle: "Danish Ash & Hand-woven Seat",
    price: 810,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBg0erlbpoYeJ0ctzMDv6TU843AIzfIkjqpEnwqkaRKYp6QQOR9KahPefIHoOqLZHXPa60y0rjGKLukMe7bA1FaE78J6BLZug_3wfJ8H5uFB4-po4GUnV3mg9kD97F6eYWsg-WlQROCb25X5Ge7Q7Wu7mcCFwruwhfc7gLa6M1X64acco0UjoIkhCgAsBMKexKJ3aSWAdflS-8-S46aHTZzQgy5FARJ5Aelea5tB01Zkhm6-Zz19pSJpmY8H7FjnAVGHAqm61VUa9bF",
    description: "Known throughout the design world as the CH24 Wishbone, Hans Wegner's masterpiece has been in continuous production since 1950. Its distinctive curved organic backrest and comfortable Y-shaped spine celebrate pure joinery. Each seat is hand-woven by skilled Danish artisans from over 120 meters of premium, sustainable paper cord, ensuring dynamic, lifelong flexibility and seating breathability.",
    designer: "Hans J. Wegner",
    year: "1950",
    materials: ["Solid Ash Wood", "Natural Danish Paper Cord"],
    dimensions: "22\"W x 20\"D x 29\"H (Seat: 17.7\"H)",
    origin: "Denmark Factory",
    finishes: ["Natural Soaped Ash", "Rich Smoked Oak", "Deep Oiled Walnut", "Satin Black Lacquer"],
    paperCords: ["Natural Paper Cord", "Charcoal Black Cord"],
    rating: 4.95
  },
  {
    id: "nordic-classic-armchair",
    name: "Finn No. 45 Armchair",
    category: "seating",
    subtitle: "Forest green wool & Oiled ash",
    price: 1150,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuC2yvWB6qnfTyUnFLAdW0OdWi0gqEHgNHtMqDbwt8hCm8Dra2ewz8XpeQJ9mMCBOnIVhQrp-CKRxXkBcWA4M1e3fMImO6a8_Cz0-buqk36yrytSPTNqalOcC23rz3j8x62_hfpf7HhRdUS6d0xreeSplo23WgZBQKKfIUS97Dq8rCUyw66vy5J5fJ0kuiodHnS3qgyE7FdwU96rU0gBrm2q2yqxPkT646tcf8pTyHjA9iShjQagOCWKNnvcKtO5yu3iqYgO_w_VHcw6",
    description: "The Finn No. 45 Armchair is a brilliant dialogue between woodcraft and upholstery. Often called \"the most beautiful armchair in the world\" because of its elegant armrests resembling fine violins. Features a hand-carved solid oak or ash framework, carrying a suspended forest green wool padded seat. Tactile, warm, and highly sculptural.",
    designer: "Finn Juhl Inspired",
    year: "1945",
    materials: ["Oiled White Oak Wood", "Danish Forest Green Wool Blend"],
    dimensions: "27\"W x 29\"D x 31\"H",
    origin: "Sweden Workshop",
    finishes: ["Oiled Ash", "Dark Smoked Oak", "Satin Walnut"],
    fabrics: ["Forest Green Pure Wool", "Snowy Soft Bouclé", "Linen Sand Blend"],
    rating: 4.85
  },
  {
    id: "scandi-walnut-table",
    name: "Matte Walnut Dining Table",
    category: "tables",
    subtitle: "Organic Walnut Veneer",
    price: 1950,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCKr48bu--Peh5KcGRIZgFgYp7uLrv-J4daEj0I-GVdpz9o3MvkIul67k4exGgNBkw9fkhKpcm2QVb_cpHLVWG1CBH-yzzJjF4QRkA4IHRTVvCBfS6jz3bqIBY9GvpZOQ8tG-KyNtpYvT-v7ptMj0iAZCWy7yIVEucl54JhDd7Pml0R97j9tJ0FEtKK0k0N0nWM6CXfO3IIog7OM7klXHuh2Saog6QmeGErxORkhZH6QHPIZ7oB3RrbNBbe2hgAz0s5mBcooe6KKzQS",
    description: "This high-angle round table celebrates the sheer, swirling beauty of natural grain patterns. Constructed with organic american walnut veneer, and finished with a rich, silky matte lacquer to keep dust off while letting the natural warmth of the grain breathe. A generous round shape that optimizes human interaction, ideal for close dinners and family design sharing.",
    designer: "Scandinavian Craft Studio",
    year: "1972",
    materials: ["Organic Walnut Veneer", "Solid Birch Timber core", "Matte Polyurethane"],
    dimensions: "60\" Diameter x 29.5\" H",
    origin: "Sweden Workshop",
    finishes: ["American Walnut Veneer", "Natural Scandinavian Ash", "Smoked Oak Veneer"],
    rating: 4.75
  },
  {
    id: "cane-highboard",
    name: "Dane Minimalist Cane Highboard",
    category: "storage",
    subtitle: "Oiled Oak & Woven Cane Panels",
    price: 1850,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuD7EF135fjz6QPldw8gY5sbw4arxWfxIknBMGKEcS36f4x4k9MG9im8HipuCUQ5rb3lSjgm53HLQSVvxh5g_F14ZmYwoxUIOAuxGg52Yd9iqjsyuh63tLtYDMWwLBQ-2KnmAV8XMC0l2xRPXt3Rjzr_Ad1h5aylSrKl-BZuergIUZTXIjib-fO4GaBPVbceSumQ2CgHKEwAnLCweiwz0PRBHNcwGGAAay7IZHf58_AlTn_OTMQVj1ZoM8FUwr5UeVyLA0y4JGzZcIVC",
    description: "Built for light-filled environments, this Danish Storage highboard features two sliding cane doors that let air circulate while providing an organic visual depth. Crafted from sustainable white oak with custom tapered timber feet and solid joinery detailing. It can house books, records, and fine stoneware with effortless grace.",
    designer: "Hans J. Wegner",
    year: "1958",
    materials: ["Solid White Oak Frame", "Woven Natural French Rattan Cane"],
    dimensions: "48\"W x 16\"D x 52\"H",
    origin: "Denmark Workshop",
    finishes: ["Natural Clear Oiled Oak", "Refined Smoked Oak", "Ebonized Ash"],
    rating: 4.9
  },
  {
    id: "brass-column-lamp",
    name: "Dane Architectural Brass Column Lamp",
    category: "lighting",
    subtitle: "Fluted Ribbed Glass & Solid Brass",
    price: 640,
    imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBElmBiI0KHu6w_tWCKl1dSsH9qpxWbLzOU01fwrPlsWl08TWm1wRh8XiR1HSYxCfLVSIdo_nxsXkC38M0rc2CTD_XMKHn6A04b0obpjq2UeBlugPVOgcc2Jb00Ff61QBzOo4wi2IzvHWGK9WMplXi7fTSZ4-jylqt9dcgdu1GSKgMwRDSFB2vedhD2fVA5RxrSDSz-8U9vms8oAY8msYLFWL0FCHlbU77DFNb93NWWdOhac6HHmnbaRX80Z0te905RGU_GdRT_cvWZ",
    description: "An incredibly elegant upright lighting fixture that casts a ribbed, beautiful diffused ambient glow. Built with high-purity brass columns, housing a vertical LED bar surrounded by thick ribbed glass filters. Perfect for placing in silent interior corners or at both sides of low credenzas to introduce dramatic, high-fidelity gallery light.",
    designer: "Dane Architectural Team",
    year: "2024",
    materials: ["Enameled Brass Columns", "Fluted Ribbed Borosilicate Glass"],
    dimensions: "7\"W x 7\"D x 42\"H",
    origin: "Sweden Workshop",
    finishes: ["Brushed High-Purity Brass", "Satin Black Nickel", "Matted Chrome Steel"],
    rating: 4.8
  }
];

export const PRECONFIG_ROOMS = [
  {
    id: "copenhagen-loft",
    name: "Copenhagen Industrial Loft",
    description: "Light exposed concrete, grey linen accents, and massive steel-framed factory windows that invite natural morning rays.",
    currentVibe: "Raw raw concrete, minimal modern, empty and open",
    desiredVibe: "Warm organic Scandi with focus on tactile joinery and contrast",
    favoriteMaterials: "Oak, dark walnut, charcoal wool, textured ceramics",
    dimensions: "24ft x 18ft, high 12ft ceilings"
  },
  {
    id: "stockholm-studio",
    name: "Stockholm Sunny Studio",
    description: "A cozy studio space defined by whitewashed timber floors, light cream walls, and functional multi-use built-ins.",
    currentVibe: "Plain white rental space, bright but slightly cold",
    desiredVibe: "Cozy Nordic sanctuary, 'hygge' environment, comfortable",
    favoriteMaterials: "Ash wood, natural paper-cord, beige bouclé, linen",
    dimensions: "16ft x 14ft, regular 8.5ft ceilings"
  },
  {
    id: "oslo-nordic-cabin",
    name: "Aarhus Forest Cabin",
    description: "Deep pines surroundings, cedarwood logs inside, a massive stone-surround fireplace and low leather chairs.",
    currentVibe: "Rustic log interior, very dark and heavily woody",
    desiredVibe: "Elegant, sophisticated mid-century woodland workspace/getaway",
    favoriteMaterials: "Black-stained oak, Premium leather, brass lighting icons",
    dimensions: "20ft x 15ft, open angled rafters"
  }
];
