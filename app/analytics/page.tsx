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
  Cell,
} from "recharts";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl border border-slate-800">
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">{label}</p>
        <p className="text-sm font-bold">{`Value: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const ChartCard = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <div className="glass-card p-8">
    <div className="mb-8">
      <h3 className="font-display font-bold text-slate-800 text-lg">{title}</h3>
      <p className="text-sm text-slate-400">{subtitle}</p>
    </div>
    <div className="h-[260px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        {children as any}
      </ResponsiveContainer>
    </div>
  </div>
);

export default function PerformanceAnalytics() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(err => console.error(err));
  }, []);

  if (!data) {
    return (
      <div className="flex items-center justify-center h-full text-slate-400 font-medium">
        Processing Analytics Dataset...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Performance Analytics</h1>
          <p className="text-slate-500">Comprehensive breakdown of academic performance vectors and risk factor distributions.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 flex items-center gap-3">
          <span className="w-2 h-2 bg-accent-emerald rounded-full"></span>
          <span className="text-xs font-bold text-slate-600">Live Batch Data</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <ChartCard title="Grade Band Distribution" subtitle="Volume of students segmented by their projected final grade bands.">
          <BarChart data={data.grade_distribution}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="count" radius={[6, 6, 0, 0]} barSize={40}>
              {data.grade_distribution.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={index === 2 ? "#6366f1" : "#cbd5e1"} />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>

        <ChartCard title="Risk Score by School" subtitle="Comparative analysis of average risk probability across institution types.">
          <BarChart data={data.risk_by_school}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[0, 1]} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="value" fill="#10b981" radius={[6, 6, 0, 0]} barSize={50} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Feature Importance" subtitle="Identifying the primary behavioral drivers influencing prediction confidence.">
          <BarChart data={data.feature_importance} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} domain={[0, 1]} />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#64748b" }} width={120} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="value" fill="#f59e0b" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Parental Education Impact" subtitle="Correlating student success rates with primary caregiver education levels.">
          <BarChart data={data.pass_rate_parent_edu}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} unit="%" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="value" fill="#8b5cf6" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Study Habits vs Grades" subtitle="Average weekly study hours recorded across projected grade cohorts.">
          <BarChart data={data.study_hours_grade}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="value" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ChartCard>

        <ChartCard title="Attendance Risk Filter" subtitle="Number of students flagged as high-risk within specific attendance brackets.">
          <BarChart data={data.at_risk_attendance}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "#94a3b8" }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
            <Bar dataKey="value" fill="#ef4444" radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ChartCard>
      </div>
    </div>
  );
}
