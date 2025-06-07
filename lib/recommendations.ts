// This file will handle fetching and processing the recommendation data

export type RecommendationItem = {
  category: string
  recommendationType: string
  item: string
  link: string
  imageUrl: string // We'll use placeholder images for now
}

// Main categories from the CSV
export const categories = [
  "Blazer – Burgundy",
  "Beige Shorts",
  "Black Jeans",
  "Blue Denim Shirt",
  "Brown Leather Jacket",
  "Floral Dress",
  "Gray Sweater",
  "Green T-shirt",
  "Red Skirt",
  "White Sneakers",
]

// Slugify function to convert category names to URL-friendly slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}

// Function to get recommendations for a specific category
export function getRecommendationsForCategory(category: string): RecommendationItem[] {
  // This would normally fetch from the CSV, but for now we'll use mock data
  const mockRecommendations: Record<string, RecommendationItem[]> = {
    "Blazer – Burgundy": [
      {
        category: "Blazer – Burgundy",
        recommendationType: "Different Color",
        item: "Navy Blue Formal Blazer",
        link: "https://www.amazon.in/BELLARA-UNSTITCHED-Formal-Trouser-Blazer/dp/B0BT6ZYL21/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Blazer – Burgundy",
        recommendationType: "Different Style",
        item: "Casual Burgundy Blazer",
        link: "https://www.amazon.in/MANQ-Casual-Single-Breasted-Blazer/dp/B07LFVF9HG/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Blazer – Burgundy",
        recommendationType: "Complementary Item",
        item: "White Dress Shirt",
        link: "https://www.amazon.in/Louis-Philippe-Formal-Shirt-LYSFCSLPK58324_White_40/dp/B07L1M1VBP/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Blazer – Burgundy",
        recommendationType: "Accessory",
        item: "Burgundy Tie",
        link: "https://www.amazon.in/Maroon-Burgundy-Necktie-Pocket-Square/dp/B07GXRH2ML/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Beige Shorts": [
      {
        category: "Beige Shorts",
        recommendationType: "Different Color",
        item: "Navy Blue Shorts",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Cotton-AZ-SH-03_Navy_32/dp/B08CZMRH7H/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Beige Shorts",
        recommendationType: "Different Style",
        item: "Beige Cargo Shorts",
        link: "https://www.amazon.in/Urbano-Fashion-Cotton-Cargo-Shorts/dp/B07C2TXMTW/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Beige Shorts",
        recommendationType: "Complementary Item",
        item: "Blue Polo Shirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Regular-AZ-TS-PO-01_Light-Blue_Large/dp/B07JVDQ3B6/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Beige Shorts",
        recommendationType: "Accessory",
        item: "Brown Leather Belt",
        link: "https://www.amazon.in/Creature-Formal-Reversible-Leather-B-019/dp/B07BFNHV5Z/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Black Jeans": [
      {
        category: "Black Jeans",
        recommendationType: "Different Color",
        item: "Blue Denim Jeans",
        link: "https://www.amazon.in/Levis-Skinny-Jeans-18298-0628_Blue_32/dp/B08CSDJ4YF/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Black Jeans",
        recommendationType: "Different Style",
        item: "Black Ripped Jeans",
        link: "https://www.amazon.in/Urbano-Fashion-Distressed-Stretchable-Jeans/dp/B07JLRQ4VP/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Black Jeans",
        recommendationType: "Complementary Item",
        item: "White Casual Shirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Regular-AZ-SH-LS01_White_Large/dp/B07JVDQ3B7/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Black Jeans",
        recommendationType: "Accessory",
        item: "Black Leather Wallet",
        link: "https://www.amazon.in/Hornbull-Wallet-Genuine-Leather-Wallets/dp/B01LXLZP1I/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Blue Denim Shirt": [
      {
        category: "Blue Denim Shirt",
        recommendationType: "Different Color",
        item: "Black Denim Shirt",
        link: "https://www.amazon.in/Dennis-Lingo-Casual-Shirt-C501_Black_M/dp/B07W3T2WL9/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Blue Denim Shirt",
        recommendationType: "Different Style",
        item: "Light Blue Chambray Shirt",
        link: "https://www.amazon.in/Levis-Regular-Shirt-32896-0003_Blue_Large/dp/B08CSDJVS2/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Blue Denim Shirt",
        recommendationType: "Complementary Item",
        item: "Khaki Chinos",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Regular-AZ-TR-01_Khaki_32/dp/B07JVDQ3B8/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Blue Denim Shirt",
        recommendationType: "Accessory",
        item: "Brown Leather Watch",
        link: "https://www.amazon.in/Fossil-Chronograph-Black-Leather-Watch-FS4812/dp/B00HVBJ1KI/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Brown Leather Jacket": [
      {
        category: "Brown Leather Jacket",
        recommendationType: "Different Color",
        item: "Black Leather Jacket",
        link: "https://www.amazon.in/VEAREAR-Leather-Jacket-Regular-VR-MJ-BLK-L_Black_Large/dp/B07JVDQ3B9/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Brown Leather Jacket",
        recommendationType: "Different Style",
        item: "Brown Suede Jacket",
        link: "https://www.amazon.in/VEAREAR-Suede-Jacket-Regular-VR-MJ-SUD-BRN-L_Brown_Large/dp/B07JVDQ3BA/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Brown Leather Jacket",
        recommendationType: "Complementary Item",
        item: "White Henley T-shirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Regular-AZ-TS-HN-01_White_Large/dp/B07JVDQ3BB/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Brown Leather Jacket",
        recommendationType: "Accessory",
        item: "Brown Leather Gloves",
        link: "https://www.amazon.in/VEAREAR-Leather-Gloves-Regular-VR-GL-BRN-L_Brown_Large/dp/B07JVDQ3BC/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Floral Dress": [
      {
        category: "Floral Dress",
        recommendationType: "Different Color",
        item: "Solid Color Dress",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Womens-AZ-WD-01_Navy_Small/dp/B07JVDQ3BD/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Floral Dress",
        recommendationType: "Different Style",
        item: "Floral Maxi Dress",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Womens-AZ-WD-MX-01_Floral_Small/dp/B07JVDQ3BE/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Floral Dress",
        recommendationType: "Complementary Item",
        item: "Denim Jacket",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Womens-AZ-WJ-DN-01_Blue_Small/dp/B07JVDQ3BF/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Floral Dress",
        recommendationType: "Accessory",
        item: "Straw Hat",
        link: "https://www.amazon.in/FabSeasons-Foldable-Beach-Women-Beige/dp/B07JVDQ3BG/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Gray Sweater": [
      {
        category: "Gray Sweater",
        recommendationType: "Different Color",
        item: "Navy Blue Sweater",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Sweater-AZ-SW-01_Navy_Large/dp/B07JVDQ3BH/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Gray Sweater",
        recommendationType: "Different Style",
        item: "Gray Cardigan",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Cardigan-AZ-SW-CD-01_Gray_Large/dp/B07JVDQ3BI/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Gray Sweater",
        recommendationType: "Complementary Item",
        item: "White Collared Shirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Regular-AZ-SH-LS01_White_Large/dp/B07JVDQ3BJ/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Gray Sweater",
        recommendationType: "Accessory",
        item: "Gray Beanie",
        link: "https://www.amazon.in/FabSeasons-Unisex-Beanie-Gray_Free-Size/dp/B07JVDQ3BK/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Green T-shirt": [
      {
        category: "Green T-shirt",
        recommendationType: "Different Color",
        item: "Red T-shirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Regular-AZ-TS-01_Red_Large/dp/B07JVDQ3BL/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Green T-shirt",
        recommendationType: "Different Style",
        item: "Green Polo Shirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Regular-AZ-TS-PO-01_Green_Large/dp/B07JVDQ3BM/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Green T-shirt",
        recommendationType: "Complementary Item",
        item: "Blue Jeans",
        link: "https://www.amazon.in/Levis-Skinny-Jeans-18298-0628_Blue_32/dp/B08CSDJ4YF/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Green T-shirt",
        recommendationType: "Accessory",
        item: "Black Sunglasses",
        link: "https://www.amazon.in/Vincent-Chase-Eyewear-Sunglasses-VC-S11162/dp/B07JVDQ3BN/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "Red Skirt": [
      {
        category: "Red Skirt",
        recommendationType: "Different Color",
        item: "Black Skirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Womens-AZ-WS-01_Black_Small/dp/B07JVDQ3BO/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Red Skirt",
        recommendationType: "Different Style",
        item: "Red Pleated Skirt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Womens-AZ-WS-PL-01_Red_Small/dp/B07JVDQ3BP/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Red Skirt",
        recommendationType: "Complementary Item",
        item: "White Blouse",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Womens-AZ-WS-BL-01_White_Small/dp/B07JVDQ3BQ/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "Red Skirt",
        recommendationType: "Accessory",
        item: "Black Belt",
        link: "https://www.amazon.in/Amazon-Brand-Symbol-Womens-AZ-W-BL-01_Black_Small/dp/B07JVDQ3BR/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
    "White Sneakers": [
      {
        category: "White Sneakers",
        recommendationType: "Different Color",
        item: "Black Sneakers",
        link: "https://www.amazon.in/Puma-Unisex-Sneakers-37260401_Black_9/dp/B07JVDQ3BS/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "White Sneakers",
        recommendationType: "Different Style",
        item: "White Canvas Shoes",
        link: "https://www.amazon.in/Converse-Unisex-Sneakers-M7652C_White_9/dp/B07JVDQ3BT/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "White Sneakers",
        recommendationType: "Complementary Item",
        item: "Blue Jeans",
        link: "https://www.amazon.in/Levis-Skinny-Jeans-18298-0628_Blue_32/dp/B08CSDJ4YF/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
      {
        category: "White Sneakers",
        recommendationType: "Accessory",
        item: "White Socks",
        link: "https://www.amazon.in/Puma-Unisex-Socks-P100990_White_Free-Size/dp/B07JVDQ3BU/",
        imageUrl: "/placeholder.svg?height=300&width=300",
      },
    ],
  }

  return mockRecommendations[category] || []
}

// Get all categories with their slugs
export function getAllCategoriesWithSlugs() {
  return categories.map((category) => ({
    category,
    slug: slugify(category),
  }))
}

// Get category by slug
export function getCategoryBySlug(slug: string) {
  const category = categories.find((cat) => slugify(cat) === slug)
  return category || null
}

