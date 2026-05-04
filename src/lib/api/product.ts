import apiClient from "@/lib/axios";
import type { ProductType, ApiProduct, ApiProductDetail } from "@/types/api";

export async function getProductTypes(catalogId?: number): Promise<ProductType[]> {
  const { data } = await apiClient.get<ProductType[]>("/api/product-type", {
    params: catalogId !== undefined ? { catalogId } : {},
  });
  return Array.isArray(data) ? data : [];
}

export async function getProducts(productTypeId?: number): Promise<ApiProduct[]> {
  const { data } = await apiClient.get<ApiProduct[]>("/api/product", {
    params: productTypeId !== undefined ? { productTypeId } : {},
  });
  return Array.isArray(data) ? data : [];
}

export async function getProductDetails(productId: number): Promise<ApiProductDetail[]> {
  const { data } = await apiClient.get<ApiProductDetail[]>("/api/product-detail", {
    params: { productId },
  });
  return Array.isArray(data) ? data : [];
}
