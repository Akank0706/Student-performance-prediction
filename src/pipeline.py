from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

# --- define column groups ---
num_features = [
    "prior_gpa", "attendance_pct", "quiz_avg", "assign_avg", 
    "midterm", "study_hours_wk", "on_time_submit_pct", 
    "lms_logins_wk", "forum_posts", "commute_min"
]

cat_features = ["gender", "school_type", "parent_edu"]

# --- numeric sub-pipeline ---
num_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="median")),
    ("scaler", StandardScaler())
])

# --- categorical sub-pipeline ---
cat_pipe = Pipeline([
    ("imputer", SimpleImputer(strategy="most_frequent")),
    ("encoder", OneHotEncoder(handle_unknown="ignore", sparse_output=False))
])

# --- combined preprocessing ---
pre = ColumnTransformer([
    ("num", num_pipe, num_features),
    ("cat", cat_pipe, cat_features)
])
