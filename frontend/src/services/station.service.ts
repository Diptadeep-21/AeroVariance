import { api } from "@/lib/api";

export async function getStations() {
  const { data } = await api.get<string[]>(
    "/stations"
  );

  return data;
}