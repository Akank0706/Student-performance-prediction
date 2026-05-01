"use client";

import { useEffect, useState } from "react";

interface Student {
  id: number;
  name: string;
  risk_score: number;
  grade_band: string;
  attendance_pct: number;
  study_hours: number;
  note: string;
}

const MetricCard = ({ label, value, sub, color, icon }: any) => (
  <div className="glass-card stat-card p-0 overflow-hidden group">
    <div className="p-6">
      <div className="flex justify-between items-start mb-4">
        <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white font-bold shadow-lg`}>
          {icon}
        </div>
        <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
          <div className={`h-full ${color} w-2/3`}></div>
        </div>
      </div>
      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-slate-900">{value}</span>
        {sub && <span className="text-[11px] font-medium text-slate-500">{sub}</span>}
      </div>
    </div>
    <div className={`h-1 w-full ${color} opacity-20`}></div>
  </div>
);

export default function AtRiskStudents() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/students")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: Student, b: Student) => b.risk_score - a.risk_score);
        setStudents(sorted);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const metrics = [
    { label: "Total Students Scored", value: "2,000", color: "bg-brand-500", icon: "S" },
    { label: "High Risk Identified", value: "248", sub: "12.4% Batch", color: "bg-accent-red", icon: "R" },
    { label: "Active Drift Alerts", value: "3", sub: "Priority High", color: "bg-accent-amber", icon: "D" },
    { label: "Model Confidence", value: "94.2%", sub: "v2.4.1 Stable", color: "bg-accent-emerald", icon: "C" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400 font-medium">
        Loading Intelligence Suite...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">At-Risk Student Monitoring</h1>
          <p className="text-slate-500 max-w-2xl">Real-time predictive analysis identifying students requiring immediate academic intervention based on behavioral patterns.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
            Export Analytics
          </button>
          <button className="px-5 py-2.5 bg-brand-600 text-white rounded-xl text-sm font-semibold hover:bg-brand-700 transition-all shadow-lg shadow-brand-100">
            Bulk Intervention
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {metrics.map((m) => (
          <MetricCard key={m.label} {...m} />
        ))}
      </div>

      <div className="glass-card overflow-hidden border-slate-200/60">
        <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h3 className="font-display font-bold text-slate-800">Priority Intervention List</h3>
            <span className="px-2.5 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold uppercase rounded-full border border-red-100">Action Required</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="relative">
                <input type="text" placeholder="Search students..." className="pl-9 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all w-64" />
                <svg className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
             </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                <th className="px-8 py-4">Student Identity</th>
                <th className="px-8 py-4">Risk Probability</th>
                <th className="px-8 py-4 text-center">Grade Band</th>
                <th className="px-8 py-4">Attendance</th>
                <th className="px-8 py-4">Study Load</th>
                <th className="px-8 py-4">Recommended Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {students.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600">
                        {s.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="font-semibold text-slate-900">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-full max-w-[80px] h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${s.risk_score > 0.8 ? 'bg-accent-red' : s.risk_score > 0.5 ? 'bg-accent-amber' : 'bg-accent-emerald'}`}
                          style={{ width: `${s.risk_score * 100}%` }}
                        ></div>
                      </div>
                      <span className={`text-xs font-bold ${s.risk_score > 0.5 ? 'text-accent-red' : 'text-slate-600'}`}>
                        {(s.risk_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg text-xs font-bold border ${
                      s.grade_band === 'A' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                      s.grade_band === 'B' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                      s.grade_band === 'F' ? 'bg-red-50 border-red-100 text-red-700' : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}>
                      {s.grade_band}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`text-sm font-medium ${s.attendance_pct < 65 ? 'text-accent-red' : 'text-slate-600'}`}>
                      {s.attendance_pct}%
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-slate-600">{s.study_hours}h / week</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 italic max-w-[180px]">{s.note}</span>
                      <button className="opacity-0 group-hover:opacity-100 px-3 py-1.5 bg-slate-900 text-white text-[10px] font-bold rounded-lg transition-all">
                        Take Action
                      </button>
                    </div>
                  </td>
                </tr>
             ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
