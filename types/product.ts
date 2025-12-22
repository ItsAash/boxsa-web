export interface PricingTier {
  minQty: number;
  maxQty: number | null;
  unitPrice: number;
  savings: number | null;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  badge?: string;
  distributor?: string;
  images: string[];
  pricingTiers: PricingTier[];
  stock: number;
  estimatedDelivery: string;
  breadcrumbs: string[];
  category?: string;
  sku?: string;
}

export interface ProductCardData {
  id?: string;
  title: string;
  image: string;
  price: number;
  unitPrice?: string;
  originalPrice?: number;
  minQty: string;
  tag?: string;
  tagColor?: "red" | "green" | "blue";
}
