"""
merge_clean_cpcb.py

Merges the 6 per-station CPCB/OpenAQ export files into one
`cpcb_historical.csv`, then produces a cleaned version.

Expected input layout (adjust RAW_DIR if yours differs):

    datasets/raw/
        Ballygunge.csv
        Bidhannagar.csv
        Jadavpur.csv
        Rabindra_Sarobar.csv
        Victoria.csv
        FortWilliam.csv

Outputs:
    datasets/aqi/cpcb_historical.csv              <- raw merge, untouched values
    datasets/processed/cpcb_historical_clean.csv  <- cleaned + unit-standardized
"""

import pandas as pd
from pathlib import Path

RAW_DIR = Path("datasets/raw")
AQI_DIR = Path("datasets/aqi")
PROCESSED_DIR = Path("datasets/processed")
STATION_FILES = [
    "Ballygunge.csv",
    "Bidhannagar.csv",
    "Jadavpur.csv",
    "RabindraSarobar.csv",
    "Victoria.csv",
    "FortWilliam.csv",
]

# ppb -> ug/m3 conversion: ug/m3 = ppb * MW / 24.45  (25C, 1 atm reference)
MOLECULAR_WEIGHTS = {
    "co": 28.01,
    "no": 30.01,
    "no2": 46.01,
    "nox": 46.01,   # reported as NO2-equivalent by convention
    "so2": 64.07,
    "o3": 48.00,
}

# Columns that come through 100% empty in every station export
DROP_COLS = ["country_iso", "isMobile", "isMonitor"]


def merge_raw(raw_dir: Path) -> pd.DataFrame:
    frames = []
    for fname in STATION_FILES:
        fpath = raw_dir / fname
        df = pd.read_csv(fpath)
        df["source_file"] = fname
        frames.append(df)
    merged = pd.concat(frames, ignore_index=True)
    return merged


def clean(df: pd.DataFrame) -> pd.DataFrame:
    df = df.copy()

    # 1. Drop columns that are entirely empty across all stations
    df = df.drop(columns=[c for c in DROP_COLS if c in df.columns])

    # 2. Coerce value to numeric, turn "" / bad values into NaN
    df["value"] = pd.to_numeric(df["value"], errors="coerce")

    # 3. Parse datetimes properly (keep both UTC and local, they're both useful)
    df["datetimeUtc"] = pd.to_datetime(df["datetimeUtc"], utc=True)
    df["datetimeLocal"] = pd.to_datetime(df["datetimeLocal"])

    # 4. Standardize units: convert every ppb reading to ug/m3 so each
    #    parameter has exactly one unit across the whole dataset.
    is_ppb = df["unit"].str.lower() == "ppb"
    for param, mw in MOLECULAR_WEIGHTS.items():
        mask = is_ppb & (df["parameter"] == param)
        df.loc[mask, "value"] = df.loc[mask, "value"] * mw / 24.45
        df.loc[mask, "unit"] = "µg/m³"

    # 5. Drop exact duplicate rows, and duplicate readings for the same
    #    station+parameter+timestamp (keep the first)
    df = df.drop_duplicates()
    df = df.drop_duplicates(subset=["location_id", "parameter", "datetimeUtc"], keep="first")

    # 6. Drop rows where value is missing (can't be used downstream) -
    #    but keep a copy of how many were dropped for the report
    n_before = len(df)
    df = df.dropna(subset=["value"])
    n_after = len(df)

    # 7. Sanity: no negative concentrations / met values that don't make sense
    non_negative_params = ["co", "no", "no2", "nox", "o3", "pm10", "pm25", "so2",
                            "relativehumidity", "wind_speed"]
    before_neg = len(df)
    df = df[~((df["parameter"].isin(non_negative_params)) & (df["value"] < 0))]
    after_neg = len(df)

    # 8. Sort for readability
    df = df.sort_values(["location_name", "parameter", "datetimeUtc"]).reset_index(drop=True)

    print(f"Dropped {n_before - n_after} rows with missing values")
    print(f"Dropped {before_neg - after_neg} rows with impossible negative readings")
    print(f"Final row count: {len(df)}")

    return df


def main():
    AQI_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    merged = merge_raw(RAW_DIR)
    merged.to_csv(AQI_DIR / "cpcb_historical.csv", index=False)
    print(f"Raw merge written: {AQI_DIR / 'cpcb_historical.csv'} ({len(merged)} rows)")

    cleaned = clean(merged)
    cleaned.to_csv(PROCESSED_DIR / "cpcb_historical_clean.csv", index=False)
    print(f"Cleaned file written: {PROCESSED_DIR / 'cpcb_historical_clean.csv'} ({len(cleaned)} rows)")


if __name__ == "__main__":
    main()