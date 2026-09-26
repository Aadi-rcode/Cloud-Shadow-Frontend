
"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Sidebar from "../Sidebar";
import { cloudAnalysis, formatINR } from "../cloudData";

const services = cloudAnalysis.services;

function StatusBadge({ status }: { status: string }) {
  const config =
    status === "Critical"
      ? {
          text: "CRITICAL",
          color: "text-red-400",
          bg: "bg-red-500/10",
          border: "border-red-500/20",
          dot: "bg-red-400",
        }
      : status === "Warning"
        ? {
            text: "WARNING",
            color: "text-amber-400",
            bg: "bg-amber-500/10",
            border: "border-amber-500/20",
            dot: "bg-amber-400",
          }
        : {
            text: "HEALTHY",
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
            border: "border-emerald-500/20",
            dot: "bg-emerald-400",
          };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border ${config.border} ${config.bg} px-2.5 py-1 text-[9px] font-bold tracking-[0.12em] ${config.color}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} />
      {config.text}
    </span>
  );
}

function ServiceIcon({ name }: { name: string }) {
  const label =
    name === "Service A"
      ? "A"
      : name === "Service B"
        ? "B"
        : name === "Database"
          ? "DB"
          : "API";

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-xs font-black text-cyan-300">
      {label}
    </div>
  );
}

function MetricBar({
  label,
  value,
  color = "bg-cyan-400",
}: {
  label: string;
  value: number;
  color?: string;
}) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-500">
          {label}
        </span>
        <span className="text-[10px] font-bold text-slate-300">{value}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedName, setSelectedName] = useState("Service A");
  const [showDetails, setShowDetails] = useState(true);

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(search.toLowerCase()) ||
        service.category.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || service.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const selectedService = services.find(
    (service) => service.name === selectedName
  );

  const criticalCount = services.filter(
    (service) => service.status === "Critical"
  ).length;

  const warningCount = services.filter(
    (service) => service.status === "Warning"
  ).length;

  const healthyCount = services.filter(
    (service) => service.status === "Healthy"
  ).length;

  const totalServiceCost = services.reduce(
    (sum, service) => sum + service.current,
    0
  );

  const highestCostService = [...services].sort(
    (a, b) => b.current - a.current
  )[0];

  return (
    <main className="min-h-screen bg-[#070b12] text-slate-200">
      <Sidebar />

      <section className="min-h-screen lg:ml-[250px]">
        {/* TOP BAR */}
        <header className="border-b border-white/[0.07] bg-[#080d15]/95">
          <div className="px-5 py-5 sm:px-7 lg:px-10">
            <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />

                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                    CloudShadow / Service Intelligence
                  </span>
                </div>

                <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Service Command Center
                </h1>

                <p className="mt-1 text-xs text-slate-500">
                  Infrastructure behaviour, utilization signals and cost
                  exposure.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="hidden rounded-lg border border-white/[0.07] bg-white/[0.025] px-4 py-2.5 sm:block">
                  <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-slate-600">
                    Environment
                  </p>
                  <p className="mt-0.5 text-[11px] font-bold text-slate-300">
                    Production
                  </p>
                </div>

                <div className="rounded-lg border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                    <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-emerald-400">
                      Monitoring Active
                    </span>
                  </div>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {services.length} services connected
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-5 p-5 sm:p-7 lg:p-10">
          {/* COMMAND METRICS */}
          <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <button
              type="button"
              onClick={() => setStatusFilter("All")}
              className="group rounded-xl border border-white/[0.07] bg-white/[0.025] p-4 text-left transition hover:border-cyan-400/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                  Services
                </span>
                <span className="text-[8px] font-bold text-cyan-400">LIVE</span>
              </div>

              <p className="mt-3 text-2xl font-bold text-white">
                {String(services.length).padStart(2, "0")}
              </p>

              <p className="mt-1 text-[9px] text-slate-600">
                Total monitored
              </p>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("Critical")}
              className="group rounded-xl border border-red-400/10 bg-red-400/[0.025] p-4 text-left transition hover:border-red-400/25"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Critical
              </span>

              <div className="mt-3 flex items-end gap-2">
                <p className="text-2xl font-bold text-red-400">
                  {String(criticalCount).padStart(2, "0")}
                </p>
                <span className="mb-1 text-[9px] font-bold text-red-400/60">
                  ACTION
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("Warning")}
              className="group rounded-xl border border-amber-400/10 bg-amber-400/[0.025] p-4 text-left transition hover:border-amber-400/25"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Warning
              </span>

              <div className="mt-3 flex items-end gap-2">
                <p className="text-2xl font-bold text-amber-400">
                  {String(warningCount).padStart(2, "0")}
                </p>
                <span className="mb-1 text-[9px] font-bold text-amber-400/60">
                  MONITOR
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setStatusFilter("Healthy")}
              className="group rounded-xl border border-emerald-400/10 bg-emerald-400/[0.025] p-4 text-left transition hover:border-emerald-400/25"
            >
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Healthy
              </span>

              <div className="mt-3 flex items-end gap-2">
                <p className="text-2xl font-bold text-emerald-400">
                  {String(healthyCount).padStart(2, "0")}
                </p>
                <span className="mb-1 text-[9px] font-bold text-emerald-400/60">
                  STABLE
                </span>
              </div>
            </button>

            <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] p-4 sm:col-span-2 xl:col-span-1">
              <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Service Cost
              </span>

              <p className="mt-3 text-2xl font-bold text-cyan-300">
                {formatINR(totalServiceCost)}
              </p>

              <p className="mt-1 text-[9px] text-slate-600">
                Highest: {highestCostService.name}
              </p>
            </div>
          </section>

          {/* FILTER / SEARCH */}
          <section className="rounded-xl border border-white/[0.07] bg-white/[0.025]">
            <div className="flex flex-col gap-4 p-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                    Live telemetry
                  </p>
                </div>

                <h2 className="mt-1 text-sm font-bold text-white">
                  Infrastructure signals
                </h2>
              </div>

              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-slate-600">
                    ⌕
                  </span>

                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search service..."
                    className="w-full rounded-lg border border-white/[0.07] bg-black/20 py-2.5 pl-8 pr-4 text-[11px] text-slate-300 outline-none placeholder:text-slate-700 focus:border-cyan-400/30 sm:w-52"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(event) => setStatusFilter(event.target.value)}
                  className="rounded-lg border border-white/[0.07] bg-[#0b111b] px-3 py-2.5 text-[11px] font-medium text-slate-400 outline-none focus:border-cyan-400/30"
                >
                  <option value="All">All statuses</option>
                  <option value="Critical">Critical</option>
                  <option value="Warning">Warning</option>
                  <option value="Healthy">Healthy</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-white/[0.05] px-4 py-2.5">
              <p className="text-[9px] text-slate-600">
                Showing{" "}
                <span className="font-bold text-slate-400">
                  {filteredServices.length}
                </span>{" "}
                / {services.length} services
              </p>

              {statusFilter !== "All" && (
                <button
                  type="button"
                  onClick={() => setStatusFilter("All")}
                  className="text-[9px] font-bold text-cyan-400 hover:text-cyan-300"
                >
                  Reset filter
                </button>
              )}
            </div>
          </section>

          {/* MAIN SERVICE GRID */}
          <section className="grid gap-5 xl:grid-cols-[minmax(0,1.65fr)_minmax(300px,0.75fr)]">
            <div className="grid gap-3">
              {filteredServices.map((service) => {
                const active = selectedName === service.name;

                return (
                  <button
                    key={service.name}
                    type="button"
                    onClick={() => {
                      setSelectedName(service.name);
                      setShowDetails(true);
                    }}
                    className={`group relative overflow-hidden rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-cyan-400/25 bg-cyan-400/[0.035]"
                        : "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.13] hover:bg-white/[0.04]"
                    }`}
                  >
                    {active && (
                      <div className="absolute left-0 top-0 h-full w-0.5 bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.7)]" />
                    )}

                    <div className="flex items-center justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <ServiceIcon name={service.name} />

                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="truncate text-sm font-bold text-white">
                              {service.name}
                            </h3>

                            <span className="hidden rounded bg-white/5 px-1.5 py-0.5 text-[8px] font-bold uppercase text-slate-600 sm:inline-block">
                              {service.category}
                            </span>
                          </div>

                          <p className="mt-1 text-[9px] text-slate-600">
                            {service.signal}
                          </p>
                        </div>
                      </div>

                      <StatusBadge status={service.status} />
                    </div>

                    <div className="mt-4 grid gap-4 md:grid-cols-[1fr_1fr_1fr_0.8fr]">
                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-slate-600">
                          Monthly cost
                        </p>

                        <p className="mt-1.5 text-lg font-bold text-white">
                          {formatINR(service.current)}
                        </p>

                        <p className="mt-0.5 text-[9px] font-bold text-red-400">
                          +{service.change}% vs previous
                        </p>
                      </div>

                      <MetricBar
                        label="Traffic"
                        value={service.traffic}
                        color="bg-red-400"
                      />

                      <MetricBar
                        label="CPU"
                        value={service.cpu}
                        color="bg-cyan-400"
                      />

                      <div>
                        <p className="text-[8px] font-bold uppercase tracking-[0.13em] text-slate-600">
                          Latency
                        </p>

                        <p className="mt-2 text-base font-bold text-slate-300">
                          {service.latency}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-white/[0.05] pt-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-700">
                          Cost impact
                        </span>

                        <span
                          className={`text-[9px] font-bold ${
                            service.impact === "HIGH"
                              ? "text-red-400"
                              : "text-amber-400"
                          }`}
                        >
                          {service.impact}
                        </span>
                      </div>

                      <span className="text-[9px] font-bold text-cyan-400 opacity-0 transition group-hover:opacity-100">
                        INSPECT →
                      </span>
                    </div>
                  </button>
                );
              })}

              {filteredServices.length === 0 && (
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-12 text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-slate-600">
                    ⌕
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-300">
                    No matching services
                  </p>

                  <p className="mt-1 text-[10px] text-slate-600">
                    Change your search or status filter.
                  </p>
                </div>
              )}
            </div>

            {/* INTELLIGENCE PANEL */}
            <div className="xl:sticky xl:top-5 xl:self-start">
              {showDetails && selectedService ? (
                <div className="overflow-hidden rounded-xl border border-cyan-400/15 bg-[#0b111a]">
                  <div className="border-b border-white/[0.06] bg-cyan-400/[0.025] p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <ServiceIcon name={selectedService.name} />

                        <div>
                          <p className="text-[8px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                            Selected intelligence
                          </p>

                          <h2 className="mt-1 text-lg font-bold text-white">
                            {selectedService.name}
                          </h2>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowDetails(false)}
                        className="rounded-md border border-white/[0.07] px-2 py-1 text-xs text-slate-600 hover:text-slate-300"
                      >
                        ×
                      </button>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <StatusBadge status={selectedService.status} />

                      <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-slate-600">
                        {selectedService.category}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-5">
                    {/* COST */}
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-4">
                      <p className="text-[8px] font-bold uppercase tracking-[0.15em] text-slate-600">
                        Monthly cost exposure
                      </p>

                      <div className="mt-2 flex items-end justify-between">
                        <p className="text-2xl font-bold text-white">
                          {formatINR(selectedService.current)}
                        </p>

                        <span className="text-[10px] font-bold text-red-400">
                          +{selectedService.change}%
                        </span>
                      </div>

                      <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5">
                        <div
                          className="h-full rounded-full bg-red-400"
                          style={{
                            width: `${Math.min(selectedService.width, 100)}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* SIGNALS */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg border border-red-400/10 bg-red-400/[0.035] p-3">
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-600">
                          Traffic
                        </p>
                        <p className="mt-2 text-lg font-bold text-red-400">
                          +{selectedService.traffic}%
                        </p>
                      </div>

                      <div className="rounded-lg border border-cyan-400/10 bg-cyan-400/[0.035] p-3">
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-600">
                          CPU
                        </p>
                        <p className="mt-2 text-lg font-bold text-cyan-300">
                          {selectedService.cpu}%
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-600">
                          Latency
                        </p>
                        <p className="mt-2 text-lg font-bold text-slate-300">
                          {selectedService.latency}
                        </p>
                      </div>

                      <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-3">
                        <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-slate-600">
                          Impact
                        </p>
                        <p className="mt-2 text-lg font-bold text-amber-400">
                          {selectedService.impact}
                        </p>
                      </div>
                    </div>

                    {/* WHY */}
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.025] p-4">
                      <div className="flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                        <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-cyan-400">
                          Intelligence signal
                        </p>
                      </div>

                      <p className="mt-3 text-xs leading-5 text-slate-400">
                        {selectedService.reason}
                      </p>
                    </div>

                    {/* CAUSAL SIGNAL */}
                    <div className="rounded-lg border border-red-400/10 bg-red-400/[0.035] p-4">
                      <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-red-400">
                        Cost driver
                      </p>

                      <p className="mt-2 text-xs font-semibold leading-5 text-slate-300">
                        {selectedService.signal}
                      </p>
                    </div>

                    {/* ACTIONS */}
                    <div className="space-y-2">
                      <Link
                        href="/root-causes"
                        className="flex items-center justify-center rounded-lg bg-cyan-400 px-4 py-3 text-[10px] font-black uppercase tracking-[0.12em] text-[#061018] transition hover:bg-cyan-300"
                      >
                        Investigate Root Cause →
                      </Link>

                      <Link
                        href="/dependencies"
                        className="flex items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.025] px-4 py-3 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
                      >
                        Trace Dependencies →
                      </Link>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-8 text-center">
                  <p className="text-sm font-bold text-slate-300">
                    Service inspection closed
                  </p>

                  <p className="mt-2 text-[10px] leading-5 text-slate-600">
                    Select a service card to reopen its intelligence panel.
                  </p>

                  <button
                    type="button"
                    onClick={() => setShowDetails(true)}
                    className="mt-4 rounded-lg border border-cyan-400/20 px-4 py-2 text-[9px] font-bold uppercase tracking-[0.12em] text-cyan-400"
                  >
                    Open Inspector
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* SYSTEM INSIGHT */}
          <section className="relative overflow-hidden rounded-xl border border-red-400/15 bg-gradient-to-br from-red-400/[0.07] via-white/[0.025] to-cyan-400/[0.04]">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-red-400/5 blur-3xl" />

            <div className="relative p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-red-400/20 bg-red-400/10 px-2.5 py-1 text-[8px] font-black uppercase tracking-[0.14em] text-red-400">
                  CloudShadow AI Insight
                </span>

                <span className="rounded-full border border-white/[0.07] bg-white/[0.03] px-2.5 py-1 text-[8px] font-bold text-slate-500">
                  Confidence {cloudAnalysis.rootCause.confidence}%
                </span>
              </div>

              <div className="mt-4 grid gap-5 lg:grid-cols-[1.4fr_0.8fr] lg:items-end">
                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-600">
                    Detected system pattern
                  </p>

                  <h2 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-2xl">
                    {cloudAnalysis.rootCause.title}
                  </h2>

                  <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-500">
                    Service A traffic is propagating downstream through Service
                    B, increasing infrastructure utilization and network
                    spending.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
                    <p className="text-[8px] font-bold uppercase text-slate-600">
                      Traffic
                    </p>
                    <p className="mt-1 text-lg font-bold text-red-400">
                      +{cloudAnalysis.costImpact.serviceTraffic}%
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
                    <p className="text-[8px] font-bold uppercase text-slate-600">
                      Requests
                    </p>
                    <p className="mt-1 text-lg font-bold text-amber-400">
                      +{services.find((s) => s.name === "Service B")?.traffic}%
                    </p>
                  </div>

                  <div className="rounded-lg border border-white/[0.06] bg-black/20 p-3">
                    <p className="text-[8px] font-bold uppercase text-slate-600">
                      Network
                    </p>
                    <p className="mt-1 text-lg font-bold text-cyan-300">
                      +{cloudAnalysis.costImpact.network}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.06] pt-4 text-[9px] text-slate-700 sm:flex-row">
            <span>CloudShadow • Service Intelligence</span>
            <span>
              Application behaviour → Infrastructure → Cost
            </span>
          </footer>
        </div>
      </section>
    </main>
  );
}
