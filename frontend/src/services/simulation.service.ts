import { api } from "@/lib/api";
import {
  SimulationRequest,
  SimulationResponse,
} from "@/types/simulation";

export async function simulateAQI(
  payload: SimulationRequest
) {
  const { data } =
    await api.post<SimulationResponse>(
      "/simulation/",
      payload
    );

  return data;
}