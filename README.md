# Student Performance Prediction System

## Overview

The **Student Performance Prediction System** is an end-to-end machine learning and analytics platform designed to identify at-risk students before final examinations. By analyzing semester-long engagement signals—such as attendance, quiz averages, and LMS activity—the system provides academic advisors with actionable risk scores and data-driven intervention strategies.

## Problem Statement

Educational institutions often struggle with "reactive" support, identifying student failure only after it occurs. Manually tracking hundreds of engagement metrics is inefficient and prone to oversight. A centralized, predictive intelligence dashboard is required to transform raw student data into proactive alerts.

## Use Cases

- **Dropout Prevention**: Identifying high-risk students early for immediate counseling.
- **Academic Intervention**: Recommending specific actions (e.g., remedial quizzes, attendance plans) based on behavioral drivers.
- **Resource Allocation**: Helping faculty prioritize support for batches with high feature drift or declining engagement.

## Tech Stack

- **Core Engine**: Python 3.11+, Scikit-Learn, XGBoost
- **Data Engineering**: Pandas, PyArrow (Parquet), NumPy
- **Inference Service**: FastAPI, Uvicorn, Pydantic v2
- **Intelligence Dashboard**: Next.js 14 (App Router), Tailwind CSS
- **Visual Analytics**: Recharts (Web), Matplotlib (Batch Reports)
- **Deployment**: Docker, Virtual Environments (venv)

## 🎥 Project Demo

[![Watch Demo](https://img.youtube.com/vi/XRbMG8s4xSo/0.jpg)](https://youtu.be/XRbMG8s4xSo)

👉 **[Watch the full system walkthrough here](https://youtu.be/XRbMG8s4xSo)**

## System Architecture

```text
Student-Performance-Prediction/
├── app/                        # Next.js 14 Dashboard (Adviser View)
├── serving/                    # FastAPI Inference Service
├── src/                        # Core ML Pipeline logic
│   ├── generate_data.py        # Synthetic student simulation
│   ├── pipeline.py             # Preprocessing ColumnTransformer
│   ├── train.py                # Calibrated XGBoost training logic
│   └── evaluate.py             # Performance metrics & confusion matrix
├── notebooks/                  # EDA and baseline experiments
├── data/                       # Student records (CSV & Parquet)
├── models/                     # Serialized model binaries (.joblib)
├── outputs/                    # Generated visual artifacts & reports
├── main.py                     # Pipeline orchestrator
├── requirements.txt            # Backend dependencies
└── README.md                   # Documentation
```

## How to Run

### 1. Setup Environment

```bash
# Create and activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt
npm install
```

### 2. Execute ML Pipeline

```bash
# This generates data, trains the model, and exports analytics
python main.py
```

### 3. Launch Dashboard & API

```bash
# Start the web interface
npm run dev

# Start the inference service (optional)
uvicorn serving.app:app --reload
```

## Project Deliverables (Outputs)

- **Risk Analysis**: [Confusion Matrix](outputs/confusion_matrix.png)
- **EDA Reports**: [Class Balance](outputs/class_balance.png) | [Correlation Heatmap](outputs/correlation_heatmap.png)
- **Trained Model**: `models/student_perf_model.joblib`

---
