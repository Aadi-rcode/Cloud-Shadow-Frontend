
"use client";

import { useState } from "react";
import Link from "next/link";
import Sidebar from "../Sidebar";
import { cloudAnalysis, formatINR } from "../cloudData";

const recommendations = cloudAnalysis.recommendations;

export default function RecommendationsPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const totalSaving = recommendations.reduce(
    (sum, item) => sum + item.saving,
    0
  );

  const highPriority = recommendations.filter(
    (item) => item.priority === "HIGH"
  ).length;

  const avgConfidence = Math.round(
    recommendations.reduce((sum, item) => sum + item.confidence, 0) /
      recommendations.length
  );

  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <Sidebar />

      <section className="min-h-screen lg:ml-[250px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#070b12]/90 px-6 py-5 backdrop-blur-xl lg:px-10">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                CloudShadow / Optimization Engine
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Recommendations
              </h1>

              <p className="mt-1 text-sm text-slate-400">
                Cost optimization actions ranked by impact, confidence and risk.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.07] px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-400/70">
                  Engine
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
                  <span className="text-sm font-semibold text-emerald-300">
                    ACTIVE
                  </span>
                </div>
              </div>

              <div className="hidden rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 sm:block">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                  Analysis
                </p>
                <p className="mt-1 text-sm font-semibold text-white">
                  Complete
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-6 lg:p-10">
          {/* TOP COMMAND STRIP */}
          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Potential monthly saving"
              value={formatINR(totalSaving)}
              detail="Identified opportunity"
              accent="cyan"
            />

            <MetricCard
              label="Optimization opportunities"
              value={String(recommendations.length).padStart(2, "0")}
              detail={`${highPriority} high priority`}
              accent="amber"
            />

            <MetricCard
              label="Average AI confidence"
              value={`${avgConfidence}%`}
              detail="Recommendation certainty"
              accent="violet"
            />

            <MetricCard
              label="Reliability exposure"
              value="LOW"
              detail="Current recommendations"
              accent="emerald"
            />
          </section>

          {/* SAVINGS COMMAND CENTER */}
          <section className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c121c] p-6 lg:p-7">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-cyan-400/[0.05] blur-3xl" />

              <div className="relative">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Optimization forecast
                    </p>

                    <h2 className="mt-2 text-xl font-bold text-white">
                      Where the savings come from
                    </h2>
                  </div>

                  <div className="rounded-lg border border-cyan-400/20 bg-cyan-400/[0.06] px-3 py-2">
                    <span className="text-xs font-bold text-cyan-300">
                      {formatINR(totalSaving)}
                    </span>
                  </div>
                </div>

                <div className="mt-7 space-y-5">
                  {recommendations.map((item) => {
                    const percentage = Math.round(
                      (item.saving / totalSaving) * 100
                    );

                    return (
                      <div key={item.id}>
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <div className="flex min-w-0 items-center gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.04] text-[10px] font-bold text-slate-400">
                              {item.id}
                            </span>

                            <span className="truncate text-sm font-medium text-slate-300">
                              {item.title}
                            </span>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            <span className="text-xs font-bold text-white">
                              {formatINR(item.saving)}
                            </span>

                            <span className="text-[10px] text-slate-500">
                              {percentage}%
                            </span>
                          </div>
                        </div>

                        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-7 border-t border-white/[0.07] pt-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      Estimated optimization value
                    </span>

                    <span className="text-lg font-bold text-cyan-300">
                      {formatINR(totalSaving)} / month
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* DECISION PROFILE */}
            <div className="rounded-2xl border border-white/[0.08] bg-[#0c121c] p-6 lg:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
                Decision profile
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                Safe optimization
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                CloudShadow evaluates cost, application performance and
                reliability before recommending an action.
              </p>

              <div className="mt-6 space-y-4">
                <DecisionRow
                  label="Cost impact"
                  value="HIGH"
                  width={91}
                  tone="cyan"
                />

                <DecisionRow
                  label="Performance risk"
                  value="LOW"
                  width={22}
                  tone="emerald"
                />

                <DecisionRow
                  label="Reliability risk"
                  value="LOW"
                  width={18}
                  tone="emerald"
                />

                <DecisionRow
                  label="AI confidence"
                  value={`${avgConfidence}%`}
                  width={avgConfidence}
                  tone="violet"
                />
              </div>
            </div>
          </section>

          {/* RECOMMENDATION QUEUE */}
          <section>
            <div className="mb-5 flex flex-col justify-between gap-3 md:flex-row md:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Action queue
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  Recommended actions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Each action is connected to the detected cost behavior.
                </p>
              </div>

              <div className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[10px] font-medium uppercase tracking-wider text-slate-500">
                {recommendations.length} actions detected
              </div>
            </div>

            <div className="space-y-4">
              {recommendations.map((item) => {
                const selected = selectedId === item.id;

                return (
                  <article
                    key={item.id}
                    className={`overflow-hidden rounded-2xl border transition-all duration-200 ${
                      selected
                        ? "border-cyan-400/30 bg-[#0d1722] shadow-[0_0_35px_rgba(34,211,238,0.06)]"
                        : "border-white/[0.08] bg-[#0c121c] hover:border-white/[0.14]"
                    }`}
                  >
                    <div className="grid lg:grid-cols-[auto_1fr_auto]">
                      {/* INDEX */}
                      <div className="hidden border-r border-white/[0.07] px-5 py-6 lg:flex lg:w-[78px] lg:items-start lg:justify-center">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-xs font-bold text-slate-500">
                          {item.id}
                        </span>
                      </div>

                      {/* MAIN */}
                      <div className="p-6 lg:p-7">
                        <div className="flex flex-wrap items-center gap-2">
                          <span
                            className={`rounded-md border px-2 py-1 text-[9px] font-bold uppercase tracking-wider ${
                              item.priority === "HIGH"
                                ? "border-red-400/20 bg-red-400/[0.07] text-red-300"
                                : "border-amber-400/20 bg-amber-400/[0.07] text-amber-300"
                            }`}
                          >
                            {item.priority} PRIORITY
                          </span>

                          <span className="rounded-md border border-cyan-400/20 bg-cyan-400/[0.06] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-300">
                            {item.confidence}% CONFIDENCE
                          </span>

                          <span className="rounded-md border border-emerald-400/20 bg-emerald-400/[0.06] px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-300">
                            {item.reliability}
                          </span>
                        </div>

                        <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
                          {item.title}
                        </h3>

                        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                          {item.reason}
                        </p>

                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                          <SignalCard
                            label="Performance"
                            value={item.performance}
                            tone="emerald"
                          />

                          <SignalCard
                            label="Reliability"
                            value={item.reliability}
                            tone="emerald"
                          />

                          <SignalCard
                            label="Expected impact"
                            value={item.impact}
                            tone="cyan"
                          />
                        </div>

                        <div className="mt-5">
                          <div className="mb-2 flex justify-between">
                            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                              AI confidence
                            </span>

                            <span className="text-[10px] font-bold text-slate-400">
                              {item.confidence}%
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500"
                              style={{ width: `${item.confidence}%` }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* SAVING */}
                      <div className="border-t border-white/[0.07] bg-white/[0.02] p-6 lg:w-[230px] lg:border-l lg:border-t-0 lg:p-7">
                        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                          Estimated saving
                        </p>

                        <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                          {formatINR(item.saving)}
                        </p>

                        <p className="mt-1 text-xs text-slate-600">
                          monthly potential
                        </p>

                        <button
                          type="button"
                          onClick={() =>
                            setSelectedId(selected ? null : item.id)
                          }
                          className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-xs font-bold transition ${
                            selected
                              ? "border-cyan-400/25 bg-cyan-400/[0.08] text-cyan-300"
                              : "border-white/[0.08] bg-white/[0.04] text-slate-300 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06] hover:text-cyan-300"
                          }`}
                        >
                          {selected ? "Hide analysis" : "Inspect action"}

                          <span
                            className={`transition-transform ${
                              selected ? "rotate-90" : ""
                            }`}
                          >
                            →
                          </span>
                        </button>
                      </div>
                    </div>

                    {/* EXPANDED */}
                    {selected && (
                      <div className="border-t border-cyan-400/10 bg-cyan-400/[0.025] px-6 py-6 lg:px-7">
                        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-center">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-cyan-400">
                                CloudShadow action analysis
                              </p>
                            </div>

                            <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-400">
                              This recommendation targets the behavior linked
                              to the detected cost increase. Estimated impact:
                              <span className="font-bold text-white">
                                {" "}
                                {formatINR(item.saving)}
                              </span>{" "}
                              monthly, with{" "}
                              <span className="font-bold text-emerald-300">
                                {item.reliability}
                              </span>{" "}
                              reliability exposure.
                            </p>
                          </div>

                          <Link
                            href="/root-causes"
                            className="rounded-xl border border-cyan-400/20 bg-cyan-400/[0.06] px-5 py-3 text-center text-xs font-bold text-cyan-300 transition hover:bg-cyan-400/[0.1]"
                          >
                            Trace root cause →
                          </Link>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          {/* INTELLIGENCE PANEL */}
          <section className="relative overflow-hidden rounded-2xl border border-violet-400/15 bg-gradient-to-br from-violet-500/[0.08] via-[#0c121c] to-cyan-500/[0.05] p-7 lg:p-8">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-violet-500/[0.06] blur-3xl" />

            <div className="relative">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/[0.08] text-lg text-violet-300">
                  ✦
                </div>

                <div>
                  <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-violet-400">
                    CloudShadow Intelligence
                  </p>

                  <h2 className="mt-1 text-xl font-bold text-white">
                    Optimize behavior — not blindly reduce resources.
                  </h2>
                </div>
              </div>

              <p className="mt-5 max-w-4xl text-sm leading-7 text-slate-400">
                CloudShadow connects each recommendation to the detected root
                cause and dependency chain. The goal is not simply to reduce
                infrastructure, but to remove unnecessary traffic and usage
                while protecting application performance and reliability.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <InsightItem
                  number="01"
                  title="Detect"
                  text="Find abnormal cost behavior."
                />

                <InsightItem
                  number="02"
                  title="Explain"
                  text="Connect spend to application behavior."
                />

                <InsightItem
                  number="03"
                  title="Optimize"
                  text="Recommend safe corrective actions."
                />
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-6 text-[10px] uppercase tracking-wider text-slate-600 sm:flex-row">
            <span>CloudShadow • Intelligent Cloud Cost Analysis</span>
            <span>Detect → Explain → Optimize</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

function MetricCard({
  label,
  value,
  detail,
  accent,
}: {
  label: string;
  value: string;
  detail: string;
  accent: "cyan" | "amber" | "violet" | "emerald";
}) {
  const styles = {
    cyan: {
      dot: "bg-cyan-400",
      value: "text-cyan-300",
    },
    amber: {
      dot: "bg-amber-400",
      value: "text-amber-300",
    },
    violet: {
      dot: "bg-violet-400",
      value: "text-violet-300",
    },
    emerald: {
      dot: "bg-emerald-400",
      value: "text-emerald-300",
    },
  };

  const style = styles[accent];

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c121c] p-5">
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />
        <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
          {label}
        </p>
      </div>

      <p className={`mt-4 text-2xl font-bold tracking-tight ${style.value}`}>
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-600">{detail}</p>
    </div>
  );
}

function DecisionRow({
  label,
  value,
  width,
  tone,
}: {
  label: string;
  value: string;
  width: number;
  tone: "cyan" | "emerald" | "violet";
}) {
  const bar = {
    cyan: "from-cyan-500 to-blue-500",
    emerald: "from-emerald-500 to-teal-400",
    violet: "from-violet-500 to-fuchsia-400",
  };

  const text = {
    cyan: "text-cyan-300",
    emerald: "text-emerald-300",
    violet: "text-violet-300",
  };

  return (
    <div>
      <div className="mb-2 flex justify-between">
        <span className="text-xs text-slate-500">{label}</span>
        <span className={`text-[10px] font-bold ${text[tone]}`}>
          {value}
        </span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${bar[tone]}`}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function SignalCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "cyan" | "emerald";
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-3">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p
        className={`mt-2 text-xs font-semibold ${
          tone === "emerald" ? "text-emerald-300" : "text-cyan-300"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InsightItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-black/10 p-4">
      <div className="flex items-center gap-3">
        <span className="text-[9px] font-bold text-violet-400">{number}</span>
        <span className="text-sm font-bold text-white">{title}</span>
      </div>

      <p className="mt-2 text-xs leading-5 text-slate-500">{text}</p>
    </div>
  );
}
