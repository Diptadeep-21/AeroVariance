export interface TranslationRequest {
  language: string;

  strings: Record<
    string,
    string
  >;
}