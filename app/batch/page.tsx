"use client";

export default function BatchScoring() {
  const batchRuns = [
    { date: "2026-04-30 22:15", count: 2000, status: "completed" },
    { date: "2026-04-29 22:10", count: 2000, status: "completed" },
    { date: "2026-04-28 22:12", count: 1985, status: "completed" },
    { date: "2026-04-27 22:05", count: 2000, status: "failed" },
    { date: "2026-04-26 22:18", count: 2000, status: "completed" },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Batch Scoring</h1>
        <p className="text-slate-500">Monitor large scale predictive inference pipelines and processing logs.</p>
      </div>

      <div className="glass-card p-8 flex justify-between items-center bg-brand-50/30 border-brand-100/50">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-brand-600 mb-1">Last Successful Execution</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-slate-900">2026-04-30 22:15</span>
            <span className="px-3 py-1 bg-brand-100 text-brand-700 text-xs font-bold rounded-full">2,000 Students Scored</span>
          </div>
        </div>
        <button className="bg-slate-900 text-white text-xs font-bold py-3 px-8 rounded-xl uppercase tracking-wider hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          Download risk_scores.csv
        </button>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="font-display font-bold text-slate-800">Batch Execution History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 text-[11px] uppercase tracking-wider font-bold text-slate-400">
                <th className="px-8 py-4">Execution Date</th>
                <th className="px-8 py-4">Students Scored</th>
                <th className="px-8 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {batchRuns.map((run, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-5 font-mono text-sm text-slate-600">{run.date}</td>
                  <td className="px-8 py-5 text-sm font-semibold text-slate-700">{run.count.toLocaleString()}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                      run.status === "completed" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-red-50 text-red-600 border border-red-100"
                    }`}>
                      {run.status}
                    </span>
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
