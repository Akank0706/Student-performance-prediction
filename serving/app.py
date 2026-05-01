import joblib
import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from contextlib import asynccontextmanager

class StudentFeatures(BaseModel):
    prior_gpa: float
    attendance_pct: float
    quiz_avg: float
    assign_avg: float
    midterm: float
    study_hours_wk: float
    on_time_submit_pct: float
    lms_logins_wk: float
    forum_posts: float
    commute_min: float
    gender: str
    school_type: str
    parent_edu: str

model_assets = {}

@asynccontextmanager
async def lifespan(app: FastAPI):
    model_assets["model"] = joblib.load("models/student_perf_model.joblib")
    yield
    model_assets.clear()

app = FastAPI(lifespan=lifespan)
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict")
async def predict(data: StudentFeatures):
    df = pd.DataFrame([data.model_dump()])
    prob = model_assets["model"].predict_proba(df)[0][1]
    return {"risk_prob": float(1 - prob), "at_risk": bool(prob < 0.5)}

@app.post("/explain")
async def explain(data: StudentFeatures):
    model = model_assets["model"]
    # get the trained pipeline from the first calibrated classifier
    pipeline = model.calibrated_classifiers_[0].base_estimator
    clf = pipeline.named_steps["clf"]
    pre = pipeline.named_steps["preprocessor"]
    
    # get feature names and their importances
    names = pre.get_feature_names_out()
    imps = clf.feature_importances_
    
    # aggregate OHE importances back to raw features
    feat_imps = {}
    for name, imp in zip(names, imps):
        raw_name = name.split("__")[-1]
        # remove OHE suffix if present
        base_name = raw_name.split("_")[0] if "_" in raw_name and raw_name not in names else raw_name
        # specifically handle the known columns to be safe
        for original in ["gender", "school_type", "parent_edu"]:
            if raw_name.startswith(original):
                base_name = original
                break
        feat_imps[base_name] = feat_imps.get(base_name, 0) + imp
        
    top_4 = sorted(feat_imps.items(), key=lambda x: x[1], reverse=True)[:4]
    return {"top_factors": [f[0] for f in top_4]}
