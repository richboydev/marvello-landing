export interface MediaItem {
  mediaId: number;
  mediaType: "image" | "video" | string;
  fileName: string;
  contentType: string;
  relativePath: string;
  sortOrder: number;
}

export interface Catalog {
  id: number;
  name: string;
  nameRu?: string;
  nameUz?: string;
  nameEn?: string;
  image?: string;
  items?: MediaItem[];
}

export interface ProductType {
  id: number;
  name: string;
  nameRu?: string;
  nameUz?: string;
  nameEn?: string;
  catalogId: number;
  price?: number;
  description?: string;
  descriptionRu?: string;
  descriptionUz?: string;
  items?: MediaItem[];
}

export interface ApiProduct {
  id: number;
  name: string;
  nameRu?: string;
  nameUz?: string;
  nameEn?: string;
  price?: number;
  quantity?: number;
  productTypeId?: number;
  dimensions?: string;
  description?: string;
  items?: MediaItem[];
}

export interface ApiProductDetail {
  id: number;
  productId: number;
  name?: string;
  nameRu?: string;
  nameUz?: string;
  value?: string;
  description?: string;
  items?: MediaItem[];
}

export interface LeadCreateDto {
  productId?: number | null;
  productName?: string | null;
  fullName?: string | null;
  phoneNumber?: string | null;
  leadStatusId: number;
}

/** Returns first image URL from items array, or null */
export function getFirstImageUrl(
  items: MediaItem[] | undefined,
  baseUrl: string
): string | null {
  if (!items?.length) return null;
  const sorted = [...items].sort((a, b) => a.sortOrder - b.sortOrder);
  const img = sorted.find((i) => i.mediaType === "image");
  return img ? `${baseUrl}${img.relativePath}` : null;
}

/** Returns all image URLs from items array */
export function getImageUrls(
  items: MediaItem[] | undefined,
  baseUrl: string
): string[] {
  if (!items?.length) return [];
  return [...items]
    .filter((i) => i.mediaType === "image")
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((i) => `${baseUrl}${i.relativePath}`);
}
