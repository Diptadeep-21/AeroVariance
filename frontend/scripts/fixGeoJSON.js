const fs = require("fs");
const path = require("path");

const input = path.join(
  __dirname,
  "../public/geojson/kolkata-wards.geojson"
);

const output = path.join(
  __dirname,
  "../public/geojson/kolkata-wards-fixed.geojson"
);

const geojson = JSON.parse(
  fs.readFileSync(input, "utf8")
);

let fixed = 0;
let skipped = 0;

function swapCoordinates(coords) {
  if (!coords) return coords;

  // Base case: one coordinate
  if (
    Array.isArray(coords) &&
    coords.length >= 2 &&
    typeof coords[0] === "number" &&
    typeof coords[1] === "number"
  ) {
    const [lat, lng] = coords;

    fixed++;

    return [lng, lat];
  }

  // Recursive case
  if (Array.isArray(coords)) {
    return coords.map(swapCoordinates);
  }

  return coords;
}

geojson.features = geojson.features.map((feature) => {
  if (
    !feature.geometry ||
    !feature.geometry.coordinates
  ) {
    skipped++;

    return feature;
  }

  return {
    ...feature,
    geometry: {
      ...feature.geometry,
      coordinates: swapCoordinates(
        feature.geometry.coordinates
      ),
    },
  };
});

fs.writeFileSync(
  output,
  JSON.stringify(geojson, null, 2)
);

console.log("================================");
console.log("GeoJSON conversion complete");
console.log("Coordinates fixed :", fixed);
console.log("Features skipped  :", skipped);
console.log("Output:", output);
console.log("================================");