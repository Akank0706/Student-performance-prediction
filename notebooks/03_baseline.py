# %% [markdown]
# Baseline Model Comparison

# %%
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from src.pipeline import pre

# --- load data ---
df = pd.read_parquet("data/students.parquet")
X = df.drop(columns=["student_id", "final_score", "final_grade_band", "passed"])
y = df["passed"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# %%
# --- baseline 1: logistic regression ---
lr_pipe = Pipeline([
    ("pre", pre),
    ("clf", LogisticRegression(random_state=42))
])

lr_scores = cross_val_score(lr_pipe, X_train, y_train, cv=5, scoring="roc_auc")
print(f"Logistic Regression AUC: {lr_scores.mean():.4f} (+/- {lr_scores.std():.4f})")

# %%
# --- baseline 2: random forest ---
rf_pipe = Pipeline([
    ("pre", pre),
    ("clf", RandomForestClassifier(n_estimators=100, random_state=42))
])

rf_scores = cross_val_score(rf_pipe, X_train, y_train, cv=5, scoring="roc_auc")
print(f"Random Forest AUC: {rf_scores.mean():.4f} (+/- {rf_scores.std():.4f})")
