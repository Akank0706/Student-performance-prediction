import { NextResponse } from "next/server";

export async function GET() {
  const driftData = [
    { feature: "attendance_pct", ks_stat: 0.12, p_val: 0.002, status: "alert" },
    { feature: "quiz_avg", ks_stat: 0.08, p_val: 0.045, status: "ok" },
    { feature: "study_hours_wk", ks_stat: 0.15, p_val: 0.0001, status: "alert" },
    { feature: "lms_logins_wk", ks_stat: 0.05, p_val: 0.210, status: "ok" },
    { feature: "assign_avg", ks_stat: 0.07, p_val: 0.082, status: "ok" },
    { feature: "forum_posts", ks_stat: 0.11, p_val: 0.008, status: "alert" },
  ];
  
  return NextResponse.json(driftData);
}
