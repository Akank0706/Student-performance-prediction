import { NextResponse } from "next/server";

export async function GET() {
  const analyticsData = {
    grade_distribution: [
      { name: "A", count: 240 },
      { name: "B", count: 580 },
      { name: "C", count: 820 },
      { name: "D", count: 260 },
      { name: "F", count: 100 },
    ],
    risk_by_school: [
      { name: "government", value: 0.62 },
      { name: "private", value: 0.38 },
      { name: "aided", value: 0.54 },
    ],
    feature_importance: [
      { name: "attendance_pct", value: 0.85 },
      { name: "quiz_avg", value: 0.72 },
      { name: "study_hours_wk", value: 0.68 },
      { name: "prior_gpa", value: 0.55 },
      { name: "assign_avg", value: 0.42 },
      { name: "lms_logins_wk", value: 0.31 },
    ],
    pass_rate_parent_edu: [
      { name: "below 10th", value: 65 },
      { name: "10th pass", value: 72 },
      { name: "12th pass", value: 78 },
      { name: "graduate", value: 85 },
      { name: "postgraduate", value: 92 },
    ],
    study_hours_grade: [
      { name: "A", value: 24.5 },
      { name: "B", value: 18.2 },
      { name: "C", value: 12.4 },
      { name: "D", value: 6.8 },
      { name: "F", value: 3.2 },
    ],
    at_risk_attendance: [
      { name: "below 50%", value: 82 },
      { name: "50-65%", value: 145 },
      { name: "65-75%", value: 98 },
      { name: "75-85%", value: 42 },
      { name: "above 85%", value: 12 },
    ],
  };
  
  return NextResponse.json(analyticsData);
}
