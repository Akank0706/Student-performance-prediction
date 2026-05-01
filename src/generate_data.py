import numpy as np
import pandas as pd
from pathlib import Path

SEED = 42
N = 2000
rng = np.random.default_rng(SEED)

# --- base behavioral features ---
study_hours_wk     = rng.normal(loc=10, scale=4, size=N).clip(0, 30)
attendance_pct     = rng.normal(loc=78, scale=12, size=N).clip(0, 100)
quiz_avg           = rng.normal(loc=70, scale=12, size=N).clip(0, 100)
assign_avg         = rng.normal(loc=72, scale=11, size=N).clip(0, 100)
midterm            = rng.normal(loc=68, scale=15, size=N).clip(0, 100)
prior_gpa          = rng.normal(loc=2.8, scale=0.7, size=N).clip(0.0, 4.0).round(2)

# --- engagement features ---
on_time_submit_pct = rng.normal(loc=80, scale=15, size=N).clip(0, 100)
lms_logins_wk      = rng.normal(loc=5, scale=2.5, size=N).clip(0, 20).round(1)
forum_posts        = rng.integers(0, 30, size=N)

# --- demographic / background features ---
gender       = rng.choice(["Male", "Female", "Other"], size=N, p=[0.48, 0.48, 0.04])
school_type  = rng.choice(["Public", "Private"], size=N, p=[0.65, 0.35])
parent_edu   = rng.choice(
    ["None", "High School", "Bachelor", "Master", "PhD"],
    size=N, p=[0.10, 0.35, 0.35, 0.15, 0.05]
)
commute_min  = rng.integers(0, 120, size=N)

# --- student_id ---
student_id = [f"S{str(i+1).zfill(4)}" for i in range(N)]

# --- final_score: weighted blend with realistic correlation drivers ---
# study and attendance are the primary lifters
score_raw = (
    0.20 * prior_gpa * 25          # GPA contribution (0-100 scale)
    + 0.20 * attendance_pct        # direct attendance lift
    + 0.15 * study_hours_wk * 3    # study hours lift
    + 0.15 * midterm
    + 0.12 * quiz_avg
    + 0.10 * assign_avg
    + 0.08 * on_time_submit_pct
    + rng.normal(0, 5, N)          # noise term
)

# rescale to a realistic 30-100 range
score_min, score_max = score_raw.min(), score_raw.max()
final_score = ((score_raw - score_min) / (score_max - score_min) * 70 + 30).round(1)
final_score = final_score.clip(0, 100)

# --- derived target columns ---
def assign_band(s):
    if s >= 90: return "A"
    if s >= 80: return "B"
    if s >= 65: return "C"
    if s >= 50: return "D"
    return "F"

final_grade_band = [assign_band(s) for s in final_score]
passed           = (final_score >= 50).astype(int)

# --- assemble dataframe ---
df = pd.DataFrame({
    "student_id":          student_id,
    "gender":              gender,
    "school_type":         school_type,
    "prior_gpa":           prior_gpa,
    "attendance_pct":      attendance_pct.round(1),
    "quiz_avg":            quiz_avg.round(1),
    "assign_avg":          assign_avg.round(1),
    "midterm":             midterm.round(1),
    "study_hours_wk":      study_hours_wk.round(1),
    "on_time_submit_pct":  on_time_submit_pct.round(1),
    "lms_logins_wk":       lms_logins_wk,
    "forum_posts":         forum_posts,
    "parent_edu":          parent_edu,
    "commute_min":         commute_min,
    "final_score":         final_score,
    "final_grade_band":    final_grade_band,
    "passed":              passed,
})

# --- save outputs ---
out_dir = Path(__file__).resolve().parent.parent / "data"
out_dir.mkdir(parents=True, exist_ok=True)

csv_path     = out_dir / "students.csv"
parquet_path = out_dir / "students.parquet"

df.to_csv("data/students.csv", index=False)

# --- summary ---
print("Shape:", df.shape)
print("\nClass balance (passed):")
print(df["passed"].value_counts().to_string())
print("\nFirst 3 rows:")
print(df.head(3).to_string(index=False))
