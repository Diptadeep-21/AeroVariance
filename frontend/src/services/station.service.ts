import { WBPCB_STATIONS } from "@/lib/constants";
import type { Station } from "@/types/station";

export async function getStations(): Promise<Station[]> {
  return WBPCB_STATIONS.map((s) => ({
    station: s.id,
    active: true,
  }));
}