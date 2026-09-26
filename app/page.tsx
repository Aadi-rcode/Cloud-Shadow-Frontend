"use client";

import Sidebar from "./Sidebar";
import { cloudAnalysis, formatLakhs } from "./cloudData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f5f8fc] text-slate-900">
      <Sidebar activeSection="overview" />

      <section className="lg:ml-[250px]">
        <Overview />
      </section>
    </main>
  );
}

function Overview() {
  const { overview, rootCause, costImpact } = cloudAnalysis;

  const serviceA = cloudAnalysis.services.find(
    (service) => service.id === "service-a"
  );

  const serviceB = cloudAnalysis.services.find(
    (service) => service.id === "service-b"
  );

  return (
    <div className="min-h-screen bg-[#f5f8fc]">
      {/* =========================================================
          HEADER
      ========================================================= */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.08),transparent_32%),radial-gradient(circle_at_60%_100%,rgba(59,130,246,0.05),transparent_30%)]" />

        <div className="relative px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="flex flex-col justify-between gap-7 xl:flex-row xl:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-500" />
                </span>

                <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-teal-600">
                  Cloud intelligence
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-[-0.03em] text-slate-950 sm:text-4xl lg:text-[42px]">
                CloudShadow Overview
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-500">
                Understand what changed in your cloud bill, why it changed,
                and which application behaviour caused it.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/80 px-4 py-3 shadow-sm">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
              </span>

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-600">
                  Analysis status
                </p>

                <p className="mt-0.5 text-xs font-bold text-emerald-700">
                  Analysis complete
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="space-y-8 p-6 sm:p-8 lg:p-10">
        {/* =========================================================
            FINANCIAL OVERVIEW
        ========================================================= */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600">
                Financial overview
              </p>

              <h2 className="mt-1.5 text-base font-bold text-slate-800">
                Current cloud environment
              </h2>
            </div>

            <span className="hidden rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[9px] font-semibold uppercase tracking-wider text-slate-400 sm:block">
              Live analysis
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {/* Current cost */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-teal-50/70" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Current monthly cost
                  </p>

                  <span className="rounded-lg bg-teal-50 px-2 py-1 text-[9px] font-bold text-teal-600">
                    LIVE
                  </span>
                </div>

                <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
                  {formatLakhs(overview.currentCost)}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600">
                    +{overview.overallChange}%
                  </span>

                  <span className="text-[10px] text-slate-400">
                    vs previous period
                  </span>
                </div>
              </div>
            </div>

            {/* Previous cost */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                Previous cost
              </p>

              <p className="mt-5 text-3xl font-bold tracking-tight text-slate-950">
                {formatLakhs(overview.previousCost)}
              </p>

              <div className="mt-4 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-300" />

                <span className="text-[10px] text-slate-400">
                  Previous analysis period
                </span>
              </div>
            </div>

            {/* Network */}
            <div className="group relative overflow-hidden rounded-2xl border border-teal-100 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-teal-50" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Network spending
                </p>

                <p className="mt-5 text-3xl font-bold tracking-tight text-teal-600">
                  {formatLakhs(overview.networkCost)}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600">
                    +{overview.networkChange}%
                  </span>

                  <span className="text-[10px] text-slate-400">
                    strongest cost signal
                  </span>
                </div>
              </div>
            </div>

            {/* Compute */}
            <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
              <div className="absolute right-0 top-0 h-20 w-20 rounded-bl-full bg-blue-50" />

              <div className="relative">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                  Compute spending
                </p>

                <p className="mt-5 text-3xl font-bold tracking-tight text-blue-600">
                  {formatLakhs(overview.computeCost)}
                </p>

                <div className="mt-4 flex items-center gap-2">
                  <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[9px] font-bold text-amber-600">
                    +{overview.computeChange}%
                  </span>

                  <span className="text-[10px] text-slate-400">
                    usage increased
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            ROOT CAUSE HERO
        ========================================================= */}
        <section className="relative overflow-hidden rounded-[28px] border border-red-200/80 bg-white shadow-[0_10px_40px_rgba(15,23,42,0.06)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_10%,rgba(20,184,166,0.12),transparent_28%),radial-gradient(circle_at_0%_0%,rgba(239,68,68,0.10),transparent_28%)]" />

          <div className="relative p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-600">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
                    Root cause detected
                  </span>

                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-semibold text-slate-500 shadow-sm">
                    Confidence {rootCause.confidence}%
                  </span>
                </div>

                <h2 className="mt-5 max-w-4xl text-2xl font-bold leading-tight tracking-tight text-slate-950 lg:text-3xl">
                  Service A traffic is driving downstream infrastructure
                  usage and cloud cost growth.
                </h2>

                <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">
                  CloudShadow connected the increase in Service A traffic
                  with downstream requests, compute usage and network
                  spending.
                </p>
              </div>

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 shadow-sm">
                <span className="text-2xl font-bold">!</span>
              </div>
            </div>

            {/* Signals */}
            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              <SignalCard
                label="Service A traffic"
                value={`+${serviceA?.traffic}%`}
                tone="red"
              />

              <SignalCard
                label="Service B requests"
                value={`+${serviceB?.traffic}%`}
                tone="amber"
              />

              <SignalCard
                label="Network cost"
                value={`+${costImpact.network}%`}
                tone="teal"
              />
            </div>

            {/* CTA */}
            <div className="mt-7 flex flex-wrap gap-3 border-t border-slate-100 pt-6">
              <button
                type="button"
                onClick={() => {
                  window.location.href = "/root-causes";
                }}
                className="rounded-xl bg-slate-950 px-5 py-3 text-xs font-bold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg"
              >
                Investigate Root Cause →
              </button>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/dependencies";
                }}
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-600 transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-200 hover:bg-teal-50 hover:text-teal-700"
              >
                View Dependency Graph →
              </button>
            </div>
          </div>
        </section>

        {/* =========================================================
            INTELLIGENCE FLOW
        ========================================================= */}
        <section className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_6px_30px_rgba(15,23,42,0.04)] lg:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-teal-50/60" />

          <div className="relative">
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-teal-600">
                  CloudShadow intelligence
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                  From application behaviour to cloud bill
                </h2>
              </div>

              <span className="w-fit rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-teal-600">
                Causal analysis
              </span>
            </div>

            <div className="relative mt-8">
              {/* connector */}
              <div className="absolute left-[12%] right-[12%] top-[30px] hidden h-px bg-gradient-to-r from-teal-200 via-blue-200 to-violet-200 md:block" />

              <div className="grid gap-4 md:grid-cols-4">
                {[
                  [
                    "01",
                    "Application Traffic",
                    `+${costImpact.serviceTraffic}%`,
                    "Traffic signal",
                    "teal",
                  ],
                  [
                    "02",
                    "Downstream Requests",
                    `+${serviceB?.traffic}%`,
                    "Request signal",
                    "blue",
                  ],
                  [
                    "03",
                    "Infrastructure Usage",
                    `+${costImpact.compute}%`,
                    "Usage signal",
                    "violet",
                  ],
                  [
                    "04",
                    "Cloud Spending",
                    `+${overview.overallChange}%`,
                    "Billing impact",
                    "red",
                  ],
                ].map(([number, title, value, label, tone]) => (
                  <div
                    key={number}
                    className="group relative rounded-2xl border border-slate-200 bg-slate-50/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[10px] font-bold text-slate-500 shadow-sm">
                        {number}
                      </span>

                      <span className="text-[9px] font-semibold uppercase tracking-wider text-slate-400">
                        {label}
                      </span>
                    </div>

                    <p className="mt-6 text-sm font-semibold text-slate-700">
                      {title}
                    </p>

                    <p
                      className={`mt-2 text-2xl font-bold ${
                        tone === "teal"
                          ? "text-teal-600"
                          : tone === "blue"
                            ? "text-blue-600"
                            : tone === "violet"
                              ? "text-violet-600"
                              : "text-red-600"
                      }`}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================
            INVESTIGATION WORKSPACE
        ========================================================= */}
        <section>
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                Investigation workspace
              </p>

              <h2 className="mt-1.5 text-base font-bold text-slate-800">
                Explore the analysis
              </h2>
            </div>

            <span className="hidden text-[10px] text-slate-400 sm:block">
              Choose an analysis layer →
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <NavCard
              number="01"
              title="Cost Analysis"
              description="Break down spending by service, category and time period."
              href="/costs"
              icon="◈"
            />

            <NavCard
              number="02"
              title="Service Intelligence"
              description="Inspect traffic, CPU, latency and billing signals."
              href="/services"
              icon="▦"
            />

            <NavCard
              number="03"
              title="Root Cause"
              description="Trace the actual behaviour behind the bill increase."
              href="/root-causes"
              icon="⌁"
            />

            <NavCard
              number="04"
              title="Dependencies"
              description="Explore the application traffic dependency graph."
              href="/dependencies"
              icon="◇"
            />

            <NavCard
              number="05"
              title="Recommendations"
              description="Review optimization opportunities and estimated savings."
              href="/recommendations"
              icon="✦"
            />
          </div>
        </section>

        {/* =========================================================
            FOOTER
        ========================================================= */}
        <footer className="flex flex-col justify-between gap-2 border-t border-slate-200 pt-5 text-[10px] text-slate-400 sm:flex-row">
          <span>CloudShadow • Analyze → Explain → Optimize</span>

          <span>Cloud Intelligence v1.0</span>
        </footer>
      </div>
    </div>
  );
}

/* =========================================================
   SIGNAL CARD
========================================================= */

function SignalCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "red" | "amber" | "teal";
}) {
  const styles = {
    red: {
      border: "border-red-100",
      bg: "bg-red-50/50",
      value: "text-red-600",
      dot: "bg-red-500",
    },
    amber: {
      border: "border-amber-100",
      bg: "bg-amber-50/50",
      value: "text-amber-600",
      dot: "bg-amber-500",
    },
    teal: {
      border: "border-teal-100",
      bg: "bg-teal-50/50",
      value: "text-teal-600",
      dot: "bg-teal-500",
    },
  };

  const style = styles[tone];

  return (
    <div
      className={`rounded-2xl border ${style.border} ${style.bg} p-4 transition-all duration-200 hover:-translate-y-0.5`}
    >
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />

        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
      </div>

      <p className={`mt-2 text-2xl font-bold ${style.value}`}>{value}</p>
    </div>
  );
}

/* =========================================================
   NAVIGATION CARD
========================================================= */

function NavCard({
  number,
  title,
  description,
  href,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = href;
      }}
      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-[0_4px_20px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-200 hover:shadow-[0_14px_35px_rgba(15,23,42,0.08)]"
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-slate-50 transition-colors duration-300 group-hover:bg-teal-50" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
            {number}
          </span>

          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-sm font-bold text-teal-600 transition-all duration-300 group-hover:bg-teal-600 group-hover:text-white">
            {icon}
          </span>
        </div>

        <h3 className="mt-6 text-sm font-bold text-slate-900">{title}</h3>

        <p className="mt-2 max-w-sm text-xs leading-5 text-slate-500">
          {description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-[10px] font-bold text-teal-600">
          Explore analysis
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </button>
  );
}