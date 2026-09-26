"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Sidebar from "../Sidebar";
import { cloudAnalysis, formatINR, formatLakhs } from "../cloudData";

const periods = ["7D", "30D", "90D"];

export default function CostsPage() {
  const [period, setPeriod] = useState("30D");
  const [category, setCategory] = useState("All");
  const [selectedService, setSelectedService] = useState("Service A");

  const { overview, services, categories, trend } = cloudAnalysis;

  const filteredServices = useMemo(() => {
    if (category === "All") return services;
    return services.filter((service) => service.category === category);
  }, [category, services]);

  const selected =
    services.find((service) => service.name === selectedService) ??
    services[0];

  const maxTrend = Math.max(...trend.map((item) => item.value));

  return (
    <main className="min-h-screen bg-[#07111f] text-white">
      <Sidebar />

      <section className="lg:ml-[250px]">
        {/* HEADER */}
        <header className="border-b border-white/10 bg-[#081321]/95">
          <div className="px-5 py-6 sm:px-7 lg:px-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,.8)]" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                    CloudShadow / Financial Intelligence
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Cost Analysis
                </h1>

                <p className="mt-2 max-w-2xl text-sm text-slate-400">
                  Detect spending anomalies, isolate cost drivers and connect
                  billing changes with application behaviour.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
                      Analysis Engine Active
                    </span>
                  </div>
                </div>

                <div className="flex rounded-xl border border-white/10 bg-white/[0.03] p-1">
                  {periods.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPeriod(item)}
                      className={`rounded-lg px-3 py-2 text-[10px] font-bold transition ${
                        period === item
                          ? "bg-cyan-400 text-slate-950"
                          : "text-slate-400 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-5 p-5 sm:p-7 lg:p-10">
          {/* KPI STRIP */}
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-transparent p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Current Cloud Cost
                </span>
                <span className="text-cyan-400">₹</span>
              </div>
              <div className="mt-3 text-3xl font-bold">
                {formatLakhs(overview.currentCost)}
              </div>
              <div className="mt-2 text-xs text-red-400">
                ▲ {overview.overallChange}% vs previous period
              </div>
            </div>

            <div className="rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-400/10 to-transparent p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Cost Spike
                </span>
                <span className="text-red-400">▲</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-red-300">
                +{overview.overallChange}%
              </div>
              <div className="mt-2 text-xs text-slate-500">
                ₹{((overview.currentCost - overview.previousCost) / 100000).toFixed(2)}L incremental
              </div>
            </div>

            <div className="rounded-2xl border border-orange-400/20 bg-gradient-to-br from-orange-400/10 to-transparent p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Network Spending
                </span>
                <span className="text-orange-400">⌁</span>
              </div>
              <div className="mt-3 text-3xl font-bold">
                {formatLakhs(overview.networkCost)}
              </div>
              <div className="mt-2 text-xs text-orange-300">
                +{overview.networkChange}% — strongest signal
              </div>
            </div>

            <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Potential Saving
                </span>
                <span className="text-emerald-400">✦</span>
              </div>
              <div className="mt-3 text-3xl font-bold text-emerald-300">
                ₹84K
              </div>
              <div className="mt-2 text-xs text-slate-500">
                Identified optimization opportunity
              </div>
            </div>
          </section>

          {/* MAIN VISUAL AREA */}
          <section className="grid gap-5 xl:grid-cols-[1.7fr_.8fr]">
            {/* TREND CHART */}
            <div className="rounded-2xl border border-white/10 bg-[#0b1727] p-5 sm:p-6">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">
                      Cloud Spending Velocity
                    </span>
                    <span className="rounded-full border border-red-400/20 bg-red-400/10 px-2 py-1 text-[8px] font-bold text-red-300">
                      SPIKE DETECTED
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Daily spend movement · {period}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">
                    Latest
                  </p>
                  <p className="text-lg font-bold text-cyan-300">
                    {formatINR(trend[trend.length - 1].cost)}
                  </p>
                </div>
              </div>

              <div className="mt-8 flex h-64 items-end gap-2 border-b border-white/10">
                {trend.map((item, index) => {
                  const active = index === trend.length - 1;
                  const height = (item.value / maxTrend) * 100;

                  return (
                    <div
                      key={item.date}
                      className="group relative flex h-full flex-1 items-end"
                    >
                      <div className="absolute inset-x-0 top-0 flex flex-col justify-between opacity-30">
                        <span className="border-t border-dashed border-slate-700" />
                        <span className="border-t border-dashed border-slate-700" />
                        <span className="border-t border-dashed border-slate-700" />
                        <span className="border-t border-dashed border-slate-700" />
                      </div>

                      <div
                        className={`relative w-full rounded-t-lg transition-all ${
                          active
                            ? "bg-gradient-to-t from-red-500 to-orange-300 shadow-[0_0_25px_rgba(239,68,68,.35)]"
                            : "bg-gradient-to-t from-cyan-700/70 to-cyan-300/70 group-hover:from-cyan-500 group-hover:to-cyan-300"
                        }`}
                        style={{ height: `${height}%` }}
                      >
                        <div className="absolute -top-7 left-1/2 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#111f32] px-2 py-1 text-[9px] font-bold group-hover:block">
                          {formatINR(item.cost)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-3 flex justify-between text-[9px] text-slate-500">
                {trend.map((item) => (
                  <span key={item.date}>{item.date}</span>
                ))}
              </div>
            </div>

            {/* COST DRIVER */}
            <div className="rounded-2xl border border-red-400/20 bg-gradient-to-b from-red-400/10 to-[#0b1727] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-red-300">
                  Primary Cost Driver
                </span>
                <span className="rounded-full bg-red-400/10 px-2 py-1 text-[8px] font-bold text-red-300">
                  HIGH IMPACT
                </span>
              </div>

              <div className="mt-8">
                <p className="text-4xl font-bold">Network</p>
                <p className="mt-2 text-sm text-slate-400">
                  {formatLakhs(overview.networkCost)} current spend
                </p>
              </div>

              <div className="mt-7">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-slate-500">Cost increase</span>
                  <span className="font-bold text-red-300">
                    +{overview.networkChange}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-600 to-orange-300"
                    style={{ width: `${overview.networkChange}%` }}
                  />
                </div>
              </div>

              <div className="mt-7 space-y-3">
                <div className="rounded-xl border border-white/5 bg-black/10 p-3">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">
                    Connected signal
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-200">
                    Service A traffic +62%
                  </p>
                </div>

                <div className="rounded-xl border border-white/5 bg-black/10 p-3">
                  <p className="text-[9px] uppercase tracking-wider text-slate-500">
                    Downstream effect
                  </p>
                  <p className="mt-1 text-xs font-semibold text-slate-200">
                    Service B requests +48%
                  </p>
                </div>
              </div>

              <Link
                href="/root-causes"
                className="mt-6 flex items-center justify-center rounded-xl bg-red-500 px-4 py-3 text-xs font-bold text-white transition hover:bg-red-400"
              >
                Investigate Root Cause →
              </Link>
            </div>
          </section>

          {/* SERVICE HEATMAP */}
          <section className="rounded-2xl border border-white/10 bg-[#0b1727]">
            <div className="flex flex-col gap-4 border-b border-white/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">
                    Service Cost Signals
                  </span>
                  <span className="text-[9px] text-slate-500">
                    {filteredServices.length} services monitored
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Select a service to inspect its cost behaviour.
                </p>
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="rounded-lg border border-white/10 bg-[#111f32] px-3 py-2 text-xs text-slate-300 outline-none"
              >
                <option value="All">All categories</option>
                <option value="Compute">Compute</option>
                <option value="Network">Network</option>
                <option value="Database">Database</option>
              </select>
            </div>

            <div className="grid gap-3 p-5 sm:grid-cols-2 xl:grid-cols-4">
              {filteredServices.map((service) => {
                const active = selected.name === service.name;

                return (
                  <button
                    key={service.name}
                    type="button"
                    onClick={() => setSelectedService(service.name)}
                    className={`text-left rounded-2xl border p-4 transition ${
                      active
                        ? "border-cyan-400/40 bg-cyan-400/[0.07]"
                        : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold">
                        {service.name}
                      </span>
                      <span
                        className={`rounded-full px-2 py-1 text-[8px] font-bold ${
                          service.status === "Critical"
                            ? "bg-red-400/10 text-red-300"
                            : service.status === "Warning"
                              ? "bg-orange-400/10 text-orange-300"
                              : "bg-emerald-400/10 text-emerald-300"
                        }`}
                      >
                        {service.status}
                      </span>
                    </div>

                    <p className="mt-1 text-[9px] text-slate-500">
                      {service.category}
                    </p>

                    <div className="mt-5 flex items-end justify-between">
                      <div>
                        <p className="text-xl font-bold">
                          {formatLakhs(service.current)}
                        </p>
                        <p className="mt-1 text-[9px] text-slate-500">
                          Previous {formatINR(service.previous)}
                        </p>
                      </div>

                      <span className="text-sm font-bold text-red-300">
                        +{service.change}%
                      </span>
                    </div>

                    <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className="h-full rounded-full bg-cyan-400"
                        style={{ width: `${service.width}%` }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          {/* SELECTED SERVICE INTELLIGENCE */}
          <section className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl border border-cyan-400/20 bg-[#0b1727] p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-cyan-400">
                    Selected Signal
                  </p>
                  <h2 className="mt-1 text-2xl font-bold">
                    {selected.name}
                  </h2>
                </div>

                <span className="rounded-full border border-red-400/20 bg-red-400/10 px-3 py-1 text-[9px] font-bold text-red-300">
                  +{selected.change}% COST
                </span>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-2">
                <div className="rounded-xl bg-white/[0.03] p-3">
                  <p className="text-[8px] uppercase text-slate-500">
                    Traffic
                  </p>
                  <p className="mt-2 text-lg font-bold text-cyan-300">
                    +{selected.traffic}%
                  </p>
                </div>

                <div className="rounded-xl bg-white/[0.03] p-3">
                  <p className="text-[8px] uppercase text-slate-500">CPU</p>
                  <p className="mt-2 text-lg font-bold">{selected.cpu}%</p>
                </div>

                <div className="rounded-xl bg-white/[0.03] p-3">
                  <p className="text-[8px] uppercase text-slate-500">
                    Latency
                  </p>
                  <p className="mt-2 text-lg font-bold">{selected.latency}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-[#0b1727] p-5 sm:p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                Intelligence Explanation
              </p>

              <div className="mt-4 flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-300">
                  AI
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    {selected.reason}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    {selected.description}
                  </p>
                </div>
              </div>

              <Link
                href="/root-causes"
                className="mt-5 inline-flex text-xs font-bold text-cyan-300 hover:text-cyan-200"
              >
                Trace this signal →
              </Link>
            </div>
          </section>

          {/* CATEGORY DISTRIBUTION */}
          <section className="rounded-2xl border border-white/10 bg-[#0b1727] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold">Spend Distribution</h2>
                <p className="mt-1 text-xs text-slate-500">
                  Current cloud spending by category
                </p>
              </div>

              <Link
                href="/services"
                className="text-[10px] font-bold text-cyan-300"
              >
                View Services →
              </Link>
            </div>

            <div className="mt-6 space-y-4">
              {categories.map((item) => (
                <div key={item.name}>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2 w-2 rounded-full ${
                          item.name === "Network"
                            ? "bg-cyan-400"
                            : item.name === "Compute"
                              ? "bg-blue-400"
                              : item.name === "Database"
                                ? "bg-violet-400"
                                : "bg-amber-400"
                        }`}
                      />
                      <span className="text-xs font-semibold text-slate-300">
                        {item.name}
                      </span>
                    </div>

                    <span className="text-xs font-bold">
                      {formatLakhs(item.cost)} · {item.percentage}%
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full ${
                        item.name === "Network"
                          ? "bg-cyan-400"
                          : item.name === "Compute"
                            ? "bg-blue-400"
                            : item.name === "Database"
                              ? "bg-violet-400"
                              : "bg-amber-400"
                      }`}
                      style={{ width: `${item.percentage * 2.7}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* BOTTOM ACTION */}
          <section className="flex flex-col gap-4 rounded-2xl border border-red-400/20 bg-gradient-to-r from-red-500/10 via-transparent to-cyan-500/5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-300">
                Cost Intelligence Alert
              </p>
              <h2 className="mt-1 text-lg font-bold">
                Network spending is the strongest billing signal.
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Trace the signal to understand what application behaviour
                created the additional cost.
              </p>
            </div>

            <div className="flex gap-2">
              <Link
                href="/root-causes"
                className="rounded-xl bg-red-500 px-4 py-3 text-xs font-bold text-white hover:bg-red-400"
              >
                Root Cause →
              </Link>

              <Link
                href="/recommendations"
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold text-slate-300 hover:bg-white/10"
              >
                Optimize →
              </Link>
            </div>
          </section>

          <footer className="border-t border-white/10 pt-5 text-[9px] text-slate-600">
            CloudShadow · Cost Intelligence Engine · {period} analysis window
          </footer>
        </div>
      </section>
    </main>
  );
}