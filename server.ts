import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is not set. Please add it in the Secrets panel inside the Settings menu.");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API Endpoints
  // Healthcheck
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // AI Decor & Space Advisor
  app.post("/api/gemini/advisor", async (req, res) => {
    try {
      const { 
        roomType, 
        dimensions, 
        currentVibe, 
        desiredVibe, 
        favoriteMaterials, 
        userDescription,
        selectedProducts 
      } = req.body;

      const ai = getGeminiClient();

      const prompt = `
You are Hans Wegner, the legendary mid-century Danish furniture architect and master craftsman. 
A user is looking for your expert guidance to design their space. Here is the brief they supplied to you:

1. Room Type: ${roomType || "Living Room"}
2. Dimensions/Layout: ${dimensions || "Standard space"}
3. Current Aesthetic & Mood: ${currentVibe || "Unspecified"}
4. Desired Aesthetic/Vibe: ${desiredVibe || "Nordic Cozy Minimalism"}
5. Favorite Materials/Finishes: ${favoriteMaterials || "Oak, linen, paper-cord, warm wool"}
6. Additional Context or Description: "${userDescription || "Looking for a refined interior plan."}"
${selectedProducts && selectedProducts.length > 0 ? `7. Client is considering these specific products from our catalog: ${selectedProducts.join(", ")}` : ""}

We have a catalog of genuine mid-century Dane Design furniture. Please cross-reference this selection in your recommendations:
- **Eames Style Lounge Chair & Ottoman** ($1,450) - Black leather and walnut wood. Bold, luxurious, highly ergonomic.
- **CH24 Wishbone Chair** ($810) - Ash wood with hand-woven paper cord seat. Organic curves, timeless masterpiece.
- **Arne Jacobsen Egg Chair** ($1,980) - Velvet fabric with aluminum base. Architectural, sculptural.
- **Finn Juhl Pelican Chair** ($1,650) - Warm wool fabric with solid oak legs. Friendly, artistic, cozy.
- **Hans Wegner CH327 Dining Table** ($2,450) - 180cm length, solid oak. Robust, minimalist, celebrates joinery.
- **Saru Wood Coffee Table** ($480) - Round walnut veneer table. Soft silhouette, organic warmth.
- **Isamu Noguchi Triangle Table** ($1,250) - Heavy glass and solid cherry wood frame. High art, sculptural.
- **Børge Mogensen Teak Sideboard** ($2,100) - Restored original sideboard with sliding doors. Tapered legs, beautiful grain.
- **Dane Minimalist Highboard** ($1,850) - Oak with sliding cane panel doors. Airy texture, elegant storage.
- **Poulsen PH5 Pendant Lamp** ($520) - Muted white/brass finish. Anti-glare illumination, premium Danish lighting.
- **Arco floor Lamp** ($890) - Arching steel frame with a solid Carrara marble block base. Architectural, sculptural light.
- **Dane Architectural Brass Column Lamp** ($640) - Fluted column glass and warm brass detailing. Atmospheric evening glow.

Act as Hans Wegner himself. Your tone should be humble, highly passionate about craft, meticulous about joinery, woodgrains, natural lighting, and "less but better" utility.

Please return your space assessment, styling advice, and design suggestions in JSON format matching the following schema. Keep your explanations highly immersive, poetic yet functional.

Respond ONLY with a JSON object conforming to this TypeScript definition (do not include markdown wrapping in the output raw stream beyond pure JSON):
{
  "advisorGreeting": "A personal, warm welcoming text from Hans Wegner discussing the architectural core of the client's space.",
  "materialCritique": "Your thoughts as a craftsman on their preferred materials (e.g., how solid oak interacts with daylight or the texture of woven paper cord).",
  "spaceLayoutStrategy": "Exact physical guidelines on placement of items to optimize natural light, sightlines, and architectural honesty (e.g. placing a lounge chair next to the window).",
  "recommendedProducts": [
    {
      "productName": "One of the exact products listed above",
      "designReasoning": "Specifically why this product fits their room dimensions,Desired aesthetic, and aesthetic values.",
      "placementTip": "Where exactly in their room they should place this item."
    }
  ],
  "aestheticVerdict": "A summarizing philosophical thought on how to live simpler, focusing on objects built for generations to come."
}
`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advisorGreeting: { type: Type.STRING },
              materialCritique: { type: Type.STRING },
              spaceLayoutStrategy: { type: Type.STRING },
              recommendedProducts: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    productName: { type: Type.STRING },
                    designReasoning: { type: Type.STRING },
                    placementTip: { type: Type.STRING },
                  },
                  required: ["productName", "designReasoning", "placementTip"],
                },
              },
              aestheticVerdict: { type: Type.STRING },
            },
            required: [
              "advisorGreeting",
              "materialCritique",
              "spaceLayoutStrategy",
              "recommendedProducts",
              "aestheticVerdict",
            ],
          },
        },
      });

      const responseText = response.text;
      if (!responseText) {
        throw new Error("No response text received from Gemini API");
      }

      // Parse the JSON output and send
      const data = JSON.parse(responseText.trim());
      res.json(data);
    } catch (error: any) {
      console.error("Gemini Advisor API Error:", error);
      res.status(500).json({ 
        error: error.message || "Something went wrong in the AI Spatial Planner service."
      });
    }
  });

  // Serve static assets in production, or mount Vite middleware in development
  if (process.env.NODE_ENV === "production") {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
