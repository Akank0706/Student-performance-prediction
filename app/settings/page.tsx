"use client";

import { useState } from "react";

export default function ClassSettings() {
  const [settings, setSettings] = useState({
    sessionName: "Spring 2026",
    department: "Computer Science",
    autoScoring: true,
    riskThreshold: 0.5,
    emailAlerts: true
  });

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div>
        <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">Class Settings</h1>
        <p className="text-slate-500">Configure monitoring parameters and departmental preferences for your student cohorts.</p>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <div className="glass-card p-8">
            <h3 className="font-display font-bold text-slate-800 text-lg mb-6">General Configuration</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Academic Session</label>
<input 
  type="text" 
  value={settings.department}
  onChange={(e) => setSettings({
    ...settings,
    department: e.target.value
  })}
  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
/>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Department</label>
                  <input 
                    type="text" 
                    value={settings.department}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-bold text-slate-900">Risk Threshold Sensitivity</p>
                    <p className="text-xs text-slate-500">Adjust the probability at which students are flagged as at-risk.</p>
                  </div>
                  <span className="px-3 py-1 bg-brand-50 text-brand-600 text-xs font-bold rounded-lg border border-brand-100">
                    {settings.riskThreshold * 100}% Confidence
                  </span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="1" 
                  step="0.05"
                  value={settings.riskThreshold}
                  onChange={(e) => setSettings({...settings, riskThreshold: parseFloat(e.target.value)})}
                  className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                />
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="font-display font-bold text-slate-800 text-lg mb-6">Notification & Automation</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.autoScoring ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-200 text-slate-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Automatic Batch Scoring</p>
                    <p className="text-xs text-slate-500">Process new data automatically every Sunday at midnight.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSettings({...settings, autoScoring: !settings.autoScoring})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoScoring ? 'bg-brand-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.autoScoring ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${settings.emailAlerts ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-200 text-slate-400'}`}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">Advisor Email Alerts</p>
                    <p className="text-xs text-slate-500">Notify assigned advisors when a student's risk exceeds 80%.</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})}
                  className={`w-12 h-6 rounded-full transition-colors relative ${settings.emailAlerts ? 'bg-brand-600' : 'bg-slate-300'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${settings.emailAlerts ? 'left-7' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-8 bg-slate-900 text-white border-none shadow-2xl">
            <h4 className="font-display font-bold text-lg mb-4 text-white">Save Changes</h4>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">Updating these settings will affect how risk scores are calculated and displayed for all teachers in your department.</p>
            <button className="w-full bg-brand-600 text-white font-bold py-3 rounded-xl hover:bg-brand-700 transition-all">
              Apply Settings
            </button>
          </div>

          <div className="glass-card p-8 border-red-100">
            <h4 className="text-sm font-bold text-red-600 mb-2">Danger Zone</h4>
            <p className="text-xs text-slate-500 mb-4">Resetting the session will clear all current risk scores and archived reports.</p>
            <button className="w-full py-2.5 border border-red-200 text-red-600 text-[10px] font-bold uppercase rounded-xl hover:bg-red-50 transition-colors">
              Reset Session Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
