import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import classification_report, roc_auc_score, brier_score_loss
from xgboost import XGBClassifier
from src.pipeline import pre

# --- load data ---
df = pd.read_csv("data/students.csv")
# --- split features and target ---
X = df.drop(columns=["final_score", "final_grade_band", "passed"])
y = df["passed"]

# --- train/test split ---
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# --- build base pipeline ---
base_pipe = Pipeline([
    ("preprocessor", pre),
    ("clf", XGBClassifier(
        n_estimators=400,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        tree_method="hist"
    ))
])

# --- wrap with calibration ---
model = CalibratedClassifierCV(
    estimator=base_pipe,
    method="isotonic",
    cv=3
)

# --- fit model ---
model.fit(X_train, y_train)

# --- evaluate ---
y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

print("Classification Report:")
print(classification_report(y_test, y_pred))

print(f"ROC AUC Score: {roc_auc_score(y_test, y_prob):.4f}")
print(f"Brier Score Loss: {brier_score_loss(y_test, y_prob):.4f}")

# --- save model ---
joblib.dump(model, "models/student_perf_model.joblib")
