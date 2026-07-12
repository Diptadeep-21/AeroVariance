import { api } from "@/lib/api";
import { AdvisoryResponse } from "@/types/advisory";

export async function getAdvisory(
  category: string
) {
  const { data } =
    await api.get<AdvisoryResponse>(
      `/advisory/${category}`
    );

  return data;
}