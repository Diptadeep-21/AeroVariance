export const MAP_STYLE =
  process.env.NEXT_PUBLIC_MAP_STYLE ??
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";

export const DEFAULT_VIEW = {
  longitude: 88.3639,
  latitude: 22.5726,
  zoom: 10.5,
};

export const AQI_COLORS = {
  Good: "#22c55e",
  Satisfactory: "#84cc16",
  Moderate: "#facc15",
  Poor: "#f97316",
  "Very Poor": "#dc2626",
};