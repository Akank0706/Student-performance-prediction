# %% [markdown]
# Data Ingestion and Validation

# %%
import pandas as pd
from pathlib import Path

# --- load raw data ---
csv_path = Path("data/students.csv")
if not csv_path.exists():
    print("Error: data/students.csv not found. Run src/generate_data.py first.")
else:
    df = pd.read_csv(csv_path)
    
    # --- basic validation ---
    print(f"Loaded {len(df)} rows from CSV.")
    
    # check for nulls
    nulls = df.isnull().sum().sum()
    print(f"Total missing values: {nulls}")
    
    # check unique students
    unique_ids = df["student_id"].nunique()
    print(f"Unique student IDs: {unique_ids}")
    
    # verify column presence
    expected_cols = [
        "student_id", "gender", "school_type", "prior_gpa", "attendance_pct",
        "quiz_avg", "assign_avg", "midterm", "study_hours_wk", "on_time_submit_pct",
        "lms_logins_wk", "forum_posts", "parent_edu", "commute_min", "final_score",
        "final_grade_band", "passed"
    ]
    missing_cols = [c for c in expected_cols if c not in df.columns]
    if not missing_cols:
        print("All expected columns present.")
    else:
        print(f"Missing columns: {missing_cols}")

    # --- save to parquet for optimized downstream use ---
    parquet_path = Path("data/students.parquet")
    df.to_parquet(parquet_path, index=False)
    print(f"Data saved to {parquet_path}")
