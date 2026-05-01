# %% [markdown]
# Exploratory Data Analysis

# %%
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np

# --- global styling ---
plt.rcParams.update({
    "axes.facecolor": "#ffffff",
    "figure.facecolor": "#ffffff",
    "text.color": "#111111",
    "axes.labelcolor": "#111111",
    "xtick.color": "#111111",
    "ytick.color": "#111111",
    "axes.edgecolor": "#111111",
    "grid.color": "#e5e5e5",
    "grid.linewidth": 0.5
})

# %%
# 1. Load data
df = pd.read_parquet("data/students.parquet")
print("Shape:", df.shape)
print("\nDtypes:")
print(df.dtypes)

# %%
# 2. Missing values
missing = df.isnull().sum().sort_values(ascending=False)
plt.figure(figsize=(10, 5))
plt.bar(missing.index, missing.values, color="#111111")
plt.title("Missing Values per Column")
plt.xticks(rotation=45, ha="right")
plt.grid(axis="y")
plt.tight_layout()
plt.savefig("outputs/missing_values.png")
plt.show()

# %%
# 3. Class balance
balance = df["passed"].value_counts().sort_index()
plt.figure(figsize=(6, 4))
plt.bar(["Failed (0)", "Passed (1)"], balance.values, color=["#888888", "#111111"])
plt.title("Target Class Balance")
plt.ylabel("Count")
plt.grid(axis="y")
plt.savefig("outputs/class_balance.png")
plt.show()

# %%
# 4. Correlation heatmap
numeric_df = df.select_dtypes(include=[np.number])
corr = numeric_df.corr()

plt.figure(figsize=(10, 8))
im = plt.imshow(corr.values, cmap="Greys", vmin=-1, vmax=1)
plt.colorbar(im)
plt.xticks(range(len(corr.columns)), corr.columns, rotation=90)
plt.yticks(range(len(corr.columns)), corr.columns)
plt.title("Numeric Feature Correlation Heatmap")
plt.tight_layout()
plt.savefig("outputs/correlation_heatmap.png")
plt.show()

# %%
# 5. Study hours distribution by target
plt.figure(figsize=(10, 5))
plt.hist(df[df["passed"] == 1]["study_hours_wk"], bins=20, alpha=0.6, label="Passed", color="#111111")
plt.hist(df[df["passed"] == 0]["study_hours_wk"], bins=20, alpha=0.6, label="Failed", color="#888888")
plt.title("Study Hours Distribution by Outcome")
plt.xlabel("Hours per Week")
plt.ylabel("Frequency")
plt.legend()
plt.grid(axis="both")
plt.savefig("outputs/study_hours_dist.png")
plt.show()

# %%
# 6. Attendance by school type
groups = [df[df["school_type"] == t]["attendance_pct"] for t in df["school_type"].unique()]
labels = df["school_type"].unique()

plt.figure(figsize=(8, 6))
plt.boxplot(groups, labels=labels, patch_artist=True, 
            boxprops=dict(facecolor="#888888", color="#111111"),
            medianprops=dict(color="#111111"),
            whiskerprops=dict(color="#111111"),
            capprops=dict(color="#111111"))
plt.title("Attendance Pct by School Type")
plt.ylabel("Attendance %")
plt.grid(axis="y")
plt.savefig("outputs/attendance_boxplot.png")
plt.show()
