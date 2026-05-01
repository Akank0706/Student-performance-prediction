import pandas as pd
import joblib
import matplotlib.pyplot as plt
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay, classification_report
from sklearn.model_selection import train_test_split
from pathlib import Path

# --- load data and model ---
df = pd.read_parquet("data/students.parquet")
model = joblib.load("models/student_perf_model.joblib")

# --- prepare test set ---
X = df.drop(columns=["final_score", "final_grade_band", "passed"])
y = df["passed"]
_, X_test, _, y_test = train_test_split(
    X, y, test_size=0.2, stratify=y, random_state=42
)

# --- predict ---
y_pred = model.predict(X_test)

# --- metrics ---
print("Model Evaluation:")
print(classification_report(y_test, y_pred))

# --- confusion matrix plot ---
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=["Failed", "Passed"])

plt.figure(figsize=(8, 6))
disp.plot(cmap="Greys")
plt.title("Student Performance Confusion Matrix")
plt.tight_layout()

# save to outputs
out_path = Path("outputs/confusion_matrix.png")
plt.savefig(out_path)
print(f"Confusion matrix saved to {out_path}")
