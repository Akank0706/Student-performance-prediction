"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function ModelGovernance() {
  const currentModel = {
    version: "v2.4.1",
    trained: "2026-04-30",
    f1: 0.88,
    auc: 0.94,
    brier: 0.057,
  };

  const history = [
    { version: "v2.4.1", trained: "2026-04-30", f1: 0.88, auc: 0.94 },
    { version: "v2.3.0", trained: "2026-04-15", f1: 0.86, auc: 0.92 },
    { version: "v2.2.5", trained: "2026-03-28", f1: 0.84, auc: 0.89 },
  ];

  const metrics = [
    { label: "Model Version", value: currentModel.version },
    { label: "Training Date", value: currentModel.trained },
    { label: "F1 Score", value: currentModel.f1 },
    { label: "ROC-AUC", value: currentModel.auc },
    { label: "Brier Score", value: currentModel.brier },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Model Governance</h1>
        <p className="text-slate-500">Auditing, transparency logs, and performance validation for the AI lifecycle.</p>
      </div>

      <div className="grid grid-cols-5 gap-6">
        {metrics.map((m) => (
          <div key={m.label} className="glass-card p-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">{m.label}</p>
            <span className="text-xl font-bold text-slate-900">{m.value}</span>
          </div>
        ))}
      </div>

      <div className="p-6 bg-slate-900 rounded-2xl text-xs text-slate-400 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
          <p className="italic font-medium">Compliance Note: Prediction logs are stored with industry-standard hashing (SHA-256) to ensure student privacy and GDPR/FERPA compliance.</p>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-display font-bold text-slate-800">Model Version Performance History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                <th className="px-8 py-4">Version</th>
                <th className="px-8 py-4">Training Date</th>
                <th className="px-8 py-4">F1 Score</th>
                <th className="px-8 py-4">ROC-AUC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {history.map((h) => (
                <tr key={h.version} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-900">{h.version}</td>
                  <td className="px-8 py-5 text-sm text-slate-600">{h.trained}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-slate-800">{h.f1}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-slate-800">{h.auc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="font-display font-bold text-slate-800 text-lg mb-8">Model Evolution Comparison</h3>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={[...history].reverse()}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="version" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#94a3b8", fontWeight: 600 }} domain={[0, 1]} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend verticalAlign="top" height={48} iconType="circle" wrapperStyle={{ fontSize: "11px", textTransform: "uppercase", fontWeight: "bold", paddingBottom: "20px" }} />
              <Bar dataKey="f1" fill="#6366f1" radius={[6, 6, 0, 0]} name="F1 Score" barSize={30} />
              <Bar dataKey="auc" fill="#cbd5e1" radius={[6, 6, 0, 0]} name="ROC-AUC" barSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
