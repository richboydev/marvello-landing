import apiClient from "@/lib/axios";
import type { LeadCreateDto } from "@/types/api";

export async function createLead(dto: LeadCreateDto): Promise<void> {
  await apiClient.post("/api/lead", dto);
}
