from app.core.model_loader import loader

loader.load()

print(loader.regressor)

print(len(loader.feature_columns))

print(len(loader.local_explanations))

print(loader.feature_importance[:3])