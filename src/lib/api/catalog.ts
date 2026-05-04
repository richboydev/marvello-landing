import apiClient from "@/lib/axios";
import type { Catalog } from "@/types/api";

export async function getCatalogs(): Promise<Catalog[]> {
  const { data } = await apiClient.get<Catalog[]>("/api/catalog");
  return Array.isArray(data) ? data : [];
}
