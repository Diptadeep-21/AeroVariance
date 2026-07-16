import { api } from "@/lib/api";

import type {
  TranslationRequest,
} from "@/types/translation";

export async function translate(
  payload: TranslationRequest
) {
  const { data } =
    await api.post(
      "/translate",
      payload
    );

  return data;
}