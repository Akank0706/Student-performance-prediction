import { NextResponse } from "next/server";

export async function GET() {
  const students = [
    { id: 1, name: "Rohan Sharma", risk_score: 0.84, grade_band: "D", attendance_pct: 62.5, study_hours: 4.2, note: "Attendance drop detected in Week 8. Requires one-on-one counseling." },
    { id: 2, name: "Priya Patel", risk_score: 0.72, grade_band: "C", attendance_pct: 68.1, study_hours: 6.5, note: "Quiz performance inconsistent. Recommend remedial sessions." },
    { id: 3, name: "Aarav Mehta", risk_score: 0.65, grade_band: "C", attendance_pct: 71.4, study_hours: 5.8, note: "Engagement level below average. Monitor LMS logins." },
    { id: 4, name: "Sneha Reddy", risk_score: 0.48, grade_band: "B", attendance_pct: 82.3, study_hours: 12.4, note: "High participation in forums. Likely to improve grade." },
    { id: 5, name: "Arjun Verma", risk_score: 0.31, grade_band: "B", attendance_pct: 88.7, study_hours: 15.2, note: "Strong academic trajectory. Potential peer mentor." },
    { id: 6, name: "Kavya Nair", risk_score: 0.95, grade_band: "F", attendance_pct: 42.2, study_hours: 2.1, note: "Critical: Multiple missed assignments. Guardian contact advised." },
    { id: 7, name: "Vikram Singh", risk_score: 0.15, grade_band: "A", attendance_pct: 94.6, study_hours: 22.5, note: "Exceptional performance across all metrics." },
    { id: 8, name: "Ananya Iyer", risk_score: 0.55, grade_band: "C", attendance_pct: 74.2, study_hours: 8.4, note: "Midterm score below expectations. Peer tutoring suggested." },
    { id: 9, name: "Rahul Gupta", risk_score: 0.22, grade_band: "B", attendance_pct: 91.0, study_hours: 18.3, note: "Consistent engagement. High confidence in B/A outcome." },
    { id: 10, name: "Pooja Desai", risk_score: 0.68, grade_band: "D", attendance_pct: 58.9, study_hours: 5.1, note: "LMS activity is minimal. Needs digital engagement push." },
    { id: 11, name: "Ishaan Khatri", risk_score: 0.88, grade_band: "F", attendance_pct: 51.0, study_hours: 3.5, note: "High risk of failure. Recommend urgent advisor meeting." },
    { id: 12, name: "Zara Khan", risk_score: 0.42, grade_band: "B", attendance_pct: 85.5, study_hours: 14.0, note: "Solid progress. Engagement metrics are rising." },
  ];
  
  return NextResponse.json(students);
}
