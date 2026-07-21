import joblib

reg = joblib.load("models/aqi_regressor.joblib")

print("Feature Names:")
print(reg.feature_names_in_)

print("\nFeature Importances:")

for f, imp in sorted(
    zip(reg.feature_names_in_, reg.feature_importances_),
    key=lambda x: x[1],
    reverse=True,
)[:20]:
    print(f"{f:30} {imp:.4f}")