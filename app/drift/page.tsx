"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DriftItem {
  feature: string;
  ks_stat: number;
  p_val: number;
  status: string;
}

export default function DriftMonitor() {
  const [driftData, setDriftData] = useState<DriftItem[]>([]);

  useEffect(() => {
    fetch("/api/drift")
      .then((res) => res.json())
      .then((data) => setDriftData(data))
      .catch(err => console.error(err));
  }, []);

  const alertCount = driftData.filter(d => d.status === "alert").length;

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Drift Monitor</h1>
          <p className="text-slate-500">Monitoring feature distribution stability to ensure model prediction reliability.</p>
        </div>
        <div className={`px-4 py-2 rounded-xl border flex items-center gap-3 ${alertCount > 0 ? 'bg-red-50 border-red-200 text-red-600' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
          <span className={`w-2 h-2 rounded-full ${alertCount > 0 ? 'bg-red-500' : 'bg-emerald-500'}`}></span>
          <span className="text-xs font-bold uppercase tracking-wider">{alertCount} Features Drifting</span>
        </div>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-display font-bold text-slate-800">Feature Distribution Stability (KS Test)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                <th className="px-8 py-4">Feature Name</th>
                <th className="px-8 py-4">KS Statistic</th>
                <th className="px-8 py-4">P-Value</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {driftData.map((d) => (
                <tr key={d.feature} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5 font-mono text-xs text-slate-700">{d.feature}</td>
                  <td className="px-8 py-5 text-sm font-semibold">{d.ks_stat.toFixed(3)}</td>
                  <td className="px-8 py-5 text-sm font-mono text-slate-500">{d.p_val.toFixed(4)}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider border ${
                      d.status === "alert" ? "bg-red-50 border-red-100 text-red-600" : "bg-slate-50 border-slate-200 text-slate-400"
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="font-display font-bold text-slate-800 text-lg mb-8">KS Statistic by Feature</h3>
        <div className="h-[260px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={driftData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="feature" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8", fontWeight: 600 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8", fontWeight: 600 }} />
              <Tooltip 
                contentStyle={{ backgroundColor: "#0f172a", border: "none", borderRadius: "12px", color: "#fff", fontSize: "12px" }}
                itemStyle={{ color: "#fff" }}
              />
              <Bar dataKey="ks_stat" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
