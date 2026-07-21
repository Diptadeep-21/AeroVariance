export interface SensorReading {
  AQI: number;

  timestamp?: string;

  datetimeLocal?: string;

  datetimeUtc?: string;

  location_name?: string;

  pm25?: number;

  pm10?: number;

  co?: number;

  no2?: number;

  so2?: number;

  o3?: number;
}

export interface Prediction {
    timestamp: string;

    predicted_aqi: number;

    category: string;

    confidence: number;

    model_version: string;
}

export interface Evaluation {

    timestamp: string;

    predicted_aqi: number;

    actual_aqi: number;

    absolute_error: number;

}

export interface AnalyticsResponse {

    station: string;

    sensor_readings: SensorReading[];

    predictions: Prediction[];

    evaluations: Evaluation[];

}

export interface ModelMetricsResponse {
  regression: {
    RMSE: number;
    MAE: number;
    MAPE: number;
    R2: number;
  };

  classification: {
    accuracy: number;
  };

  top_features: {
    feature: string;
    importance: number;
  }[];
}