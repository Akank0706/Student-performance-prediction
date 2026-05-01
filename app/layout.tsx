"use client";

import "./globals.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isUploading, setIsUploading] = useState(false);

  const menuGroups = [
    {
      label: "Academic Insights",
      links: [
        { name: "At-Risk Students", href: "/" },
        { name: "Performance Analytics", href: "/analytics" },
        { name: "Batch Scoring", href: "/batch" },
      ]
    },
    {
      label: "Administration",
      links: [
        { name: "Class Settings", href: "/settings" },
        { name: "Upload Records", href: "#", onClick: () => setIsUploading(true) },
      ]
    },
    {
      label: "System Health",
      links: [
        { name: "Drift Monitor", href: "/drift" },
        { name: "Model Governance", href: "/governance" },
      ]
    }
  ];

  const handleGenerateReport = () => {
    window.print();
  };

  return (
    <html lang="en">
      <body className="flex h-screen bg-slate-50 antialiased overflow-hidden">
        {/* Sidebar */}
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col z-20 overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-10 h-10 bg-gradient-to-br from-brand-600 to-brand-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-100">
                <span className="font-display font-bold text-xl text-white">A</span>
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-slate-900 leading-tight">Academic AI</h1>
                <p className="text-[11px] font-bold text-brand-600 uppercase tracking-widest">Predictive Suite</p>
              </div>
            </div>
            
            <nav className="space-y-8">
              {menuGroups.map((group) => (
                <div key={group.label}>
                  <p className="px-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3">
                    {group.label}
                  </p>
                  <div className="space-y-1">
                    {group.links.map((link) => {
                      const isActive = pathname === link.href;
                      if (link.onClick) {
                        return (
                          <button
                            key={link.name}
                            onClick={link.onClick}
                            className="w-full text-left nav-link"
                          >
                            {link.name}
                          </button>
                        );
                      }
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className={`nav-link ${isActive ? "active" : ""}`}
                        >
                          {link.name}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
          
          <div className="mt-auto p-8 pt-0">
            <div className="bg-slate-900 rounded-2xl p-5 text-white relative overflow-hidden group">
              <div className="relative z-10">
                <p className="text-xs font-medium text-slate-400 mb-1">Active Batch</p>
                <p className="text-sm font-bold mb-4">Spring 2026</p>
                <button 
                  onClick={handleGenerateReport}
                  className="w-full bg-white text-slate-900 text-xs font-bold py-2.5 rounded-lg hover:bg-slate-100 transition-colors shadow-sm"
                >
                  Generate Report
                </button>
              </div>
              <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-brand-500 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50">
          <header className="h-20 border-b border-slate-200 flex items-center px-10 justify-between bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <h2 className="font-display font-semibold text-slate-800">Student Performance Monitoring</h2>
            </div>
            
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-900">Prof. Ananya Iyer</p>
                  <p className="text-[10px] text-slate-400">Head of Department</p>
                </div>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-100 to-brand-200 border border-brand-200 flex items-center justify-center font-display font-bold text-brand-600">
                  AI
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="max-w-[1440px] mx-auto p-10">
              {children}
            </div>
          </main>
        </div>

        {/* Simple Upload Modal Mock */}
        {isUploading && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6">
            <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200">
              <h3 className="font-display text-xl font-bold mb-2">Upload Student Records</h3>
              <p className="text-sm text-slate-500 mb-6">Select a CSV or Excel file containing the latest student engagement data.</p>
              
              <div className="border-2 border-dashed border-slate-200 rounded-2xl p-10 text-center hover:border-brand-400 transition-colors cursor-pointer mb-6">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/></svg>
                </div>
                <p className="text-sm font-semibold text-slate-900">Drop files here</p>
                <p className="text-xs text-slate-400 mt-1">or click to browse</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => setIsUploading(false)} className="flex-1 py-2.5 bg-slate-100 text-slate-900 text-xs font-bold rounded-xl uppercase tracking-wider">Cancel</button>
                <button onClick={() => setIsUploading(false)} className="flex-1 py-2.5 bg-brand-600 text-white text-xs font-bold rounded-xl uppercase tracking-wider">Start Upload</button>
              </div>
            </div>
          </div>
        )}
      </body>
    </html>
  );
}
