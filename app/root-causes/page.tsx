
"use client";

import Link from "next/link";
import Sidebar from "../Sidebar";
import { cloudAnalysis } from "../cloudData";

function Metric({
  label,
  value,
  sub,
  tone = "teal",
}: {
  label: string;
  value: string;
  sub: string;
  tone?: "red" | "amber" | "teal" | "blue";
}) {
  const tones = {
    red: "text-red-400 border-red-500/20 bg-red-500/10",
    amber: "text-amber-400 border-amber-500/20 bg-amber-500/10",
    teal: "text-teal-400 border-teal-500/20 bg-teal-500/10",
    blue: "text-blue-400 border-blue-500/20 bg-blue-500/10",
  };

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>

      <p className={`mt-3 text-2xl font-bold ${tones[tone].split(" ")[0]}`}>
        {value}
      </p>

      <p className="mt-1 text-xs text-slate-500">{sub}</p>
    </div>
  );
}

function SignalBar({
  label,
  value,
  width,
  color,
}: {
  label: string;
  value: string;
  width: string;
  color: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-medium text-slate-400">{label}</span>
        <span className="text-xs font-bold text-white">{value}</span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width }}
        />
      </div>
    </div>
  );
}

export default function RootCausePage() {
  const rootCause = cloudAnalysis.rootCause;

  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <Sidebar />

      <section className="lg:ml-[250px]">
        {/* Header */}
        <header className="border-b border-white/[0.07] bg-[#090e17]/90 px-6 py-6 backdrop-blur-xl lg:px-10">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_12px_rgba(248,113,113,0.8)]" />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-red-400">
                  CloudShadow / Root Cause Intelligence
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
                Root Cause Analysis
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Trace the billing anomaly from application behavior to
                infrastructure impact.
              </p>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />

              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-emerald-400/70">
                  Analysis Engine
                </p>
                <p className="mt-0.5 text-xs font-semibold text-emerald-300">
                  Investigation complete
                </p>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-5 lg:p-8">
          {/* Command metrics */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Metric
              label="Root cause confidence"
              value={`${rootCause.confidence}%`}
              sub="High-confidence signal"
              tone="red"
            />

            <Metric
              label="Primary trigger"
              value="+62%"
              sub="Service A traffic"
              tone="amber"
            />

            <Metric
              label="Downstream effect"
              value="+48%"
              sub="Service B requests"
              tone="blue"
            />

            <Metric
              label="Billing impact"
              value="+52%"
              sub="Network spending"
              tone="teal"
            />
          </div>

          {/* Main investigation panel */}
          <section className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-500/[0.08] via-[#0b111b] to-[#07151a]">
            <div className="grid xl:grid-cols-[1fr_300px]">
              <div className="p-6 lg:p-8">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-red-500/25 bg-red-500/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.16em] text-red-400">
                    Root cause detected
                  </span>

                  <span className="rounded-full border border-white/[0.08] bg-white/[0.035] px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Automated investigation
                  </span>
                </div>

                <h2 className="mt-6 max-w-4xl text-2xl font-bold leading-tight tracking-tight text-white lg:text-3xl">
                  {rootCause.title}
                </h2>

                <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-400">
                  CloudShadow identified Service A traffic as the strongest
                  upstream signal. The increased traffic propagated through
                  downstream requests, compute usage and network transfer,
                  producing the observed billing increase.
                </p>

                {/* Signal cards */}
                <div className="mt-7 grid gap-3 md:grid-cols-3">
                  <div className="rounded-2xl border border-red-500/15 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                        Trigger
                      </span>

                      <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-red-400">
                      +62%
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Service A traffic
                    </p>
                  </div>

                  <div className="rounded-2xl border border-amber-500/15 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                        Propagation
                      </span>

                      <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-amber-400">
                      +48%
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Service B requests
                    </p>
                  </div>

                  <div className="rounded-2xl border border-teal-500/15 bg-black/20 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-500">
                        Cost impact
                      </span>

                      <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                    </div>

                    <p className="mt-3 text-2xl font-bold text-teal-400">
                      +52%
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      Network spending
                    </p>
                  </div>
                </div>
              </div>

              {/* Confidence */}
              <div className="border-t border-white/[0.07] bg-black/20 p-6 xl:border-l xl:border-t-0 lg:p-8">
                <p className="text-[10px] font-bold uppercase tracking-[0.17em] text-slate-500">
                  Confidence score
                </p>

                <div className="mt-6 flex items-end gap-2">
                  <span className="text-6xl font-bold tracking-tight text-red-400">
                    {rootCause.confidence}
                  </span>

                  <span className="mb-2 text-2xl font-bold text-red-400">
                    %
                  </span>
                </div>

                <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/[0.07]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 to-orange-400"
                    style={{ width: `${rootCause.confidence}%` }}
                  />
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-white/[0.07] pt-5">
                  <span className="text-xs text-slate-500">Impact level</span>

                  <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-bold text-red-400">
                    {rootCause.impact}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Causal chain */}
          <section className="rounded-3xl border border-white/[0.08] bg-[#0b111b] p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-400">
                  Causal chain
                </p>

                <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
                  How the anomaly propagated
                </h2>

                <p className="mt-2 text-xs text-slate-500">
                  Application signal → service dependency → infrastructure
                  usage → cloud bill
                </p>
              </div>

              <span className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[10px] font-semibold text-slate-500">
                4 linked signals
              </span>
            </div>

            <div className="mt-8 grid gap-3 lg:grid-cols-4">
              {cloudAnalysis.chain.map((item, index) => (
                <div key={item.step} className="relative">
                  <div
                    className={`h-full rounded-2xl border p-5 ${
                      index === 0
                        ? "border-red-500/20 bg-red-500/[0.055]"
                        : index === cloudAnalysis.chain.length - 1
                          ? "border-teal-500/20 bg-teal-500/[0.055]"
                          : "border-white/[0.08] bg-white/[0.025]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.06] text-[10px] font-bold text-slate-400">
                        {item.step}
                      </span>

                      <span
                        className={`text-lg font-bold ${
                          index === 0
                            ? "text-red-400"
                            : index === cloudAnalysis.chain.length - 1
                              ? "text-teal-400"
                              : "text-amber-400"
                        }`}
                      >
                        {item.change}
                      </span>
                    </div>

                    <h3 className="mt-5 text-sm font-semibold leading-5 text-white">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-slate-500">
                      {item.description}
                    </p>

                    {index < cloudAnalysis.chain.length - 1 && (
                      <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:block">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.08] bg-[#0b111b] text-xs text-teal-400">
                          →
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Evidence + Impact */}
          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            {/* Evidence */}
            <section className="rounded-3xl border border-white/[0.08] bg-[#0b111b] p-6 lg:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-400">
                    Evidence
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-white">
                    Signals supporting the diagnosis
                  </h2>
                </div>

                <span className="rounded-lg border border-emerald-500/15 bg-emerald-500/[0.07] px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                  Verified
                </span>
              </div>

              <div className="mt-6 space-y-3">
                {cloudAnalysis.evidence.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition hover:border-emerald-500/20 hover:bg-white/[0.035]"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-xs font-bold text-emerald-400">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-300">
                        {item}
                      </p>

                      <p className="mt-1 text-[9px] font-bold uppercase tracking-[0.14em] text-slate-600">
                        Supporting signal
                      </p>
                    </div>

                    <span className="text-emerald-400">✓</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Impact */}
            <section className="rounded-3xl border border-white/[0.08] bg-[#0b111b] p-6 lg:p-7">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-orange-400">
                Impact profile
              </p>

              <h2 className="mt-2 text-xl font-bold text-white">
                Where the increase appeared
              </h2>

              <div className="mt-7 space-y-6">
                <SignalBar
                  label="Service traffic"
                  value="+62%"
                  width="90%"
                  color="bg-amber-400"
                />

                <SignalBar
                  label="Network spending"
                  value="+52%"
                  width="78%"
                  color="bg-red-400"
                />

                <SignalBar
                  label="Compute usage"
                  value="+31%"
                  width="55%"
                  color="bg-orange-400"
                />
              </div>

              <div className="mt-7 rounded-2xl border border-amber-500/15 bg-amber-500/[0.06] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
                      Strongest upstream signal
                    </p>

                    <p className="mt-2 text-sm font-semibold text-white">
                      Service A traffic
                    </p>
                  </div>

                  <span className="text-2xl font-bold text-amber-400">
                    +62%
                  </span>
                </div>
              </div>
            </section>
          </div>

          {/* AI explanation */}
          <section className="rounded-3xl border border-teal-500/15 bg-gradient-to-br from-teal-500/[0.07] via-[#0b111b] to-blue-500/[0.05] p-6 lg:p-8">
            <div className="flex flex-col justify-between gap-5 lg:flex-row">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500/10 text-sm text-teal-400">
                    ✦
                  </span>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-teal-400">
                      CloudShadow AI Explanation
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-600">
                      Behavior-aware cost intelligence
                    </p>
                  </div>
                </div>

                <h2 className="mt-5 text-xl font-bold text-white lg:text-2xl">
                  The bill increase starts with application behavior.
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  CloudShadow does not treat the cloud bill as an isolated
                  infrastructure event. It follows the dependency chain from
                  Service A traffic to downstream requests, compute activity
                  and network transfer, connecting the observed application
                  behavior to the final cost increase.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-3 lg:min-w-[190px]">
                <Link
                  href="/dependencies"
                  className="rounded-xl bg-teal-500 px-4 py-3 text-center text-xs font-bold text-slate-950 transition hover:bg-teal-400"
                >
                  Open dependency graph →
                </Link>

                <Link
                  href="/recommendations"
                  className="rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-3 text-center text-xs font-semibold text-slate-300 transition hover:border-teal-500/30 hover:text-teal-300"
                >
                  View recommendations
                </Link>
              </div>
            </div>

            {/* Signal flow */}
            <div className="mt-7 flex flex-wrap items-center gap-2 border-t border-white/[0.07] pt-6">
              {[
                ["Service A", "+62%", "red"],
                ["Service B", "+48%", "amber"],
                ["Compute", "+31%", "orange"],
                ["Network", "+52%", "teal"],
              ].map(([name, change, tone], index) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3">
                    <p className="text-xs font-semibold text-white">{name}</p>

                    <p
                      className={`mt-1 text-[10px] font-bold ${
                        tone === "red"
                          ? "text-red-400"
                          : tone === "amber"
                            ? "text-amber-400"
                            : tone === "orange"
                              ? "text-orange-400"
                              : "text-teal-400"
                      }`}
                    >
                      {change}
                    </p>
                  </div>

                  {index < 3 && (
                    <span className="text-slate-600">→</span>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-5 text-[10px] text-slate-600 sm:flex-row">
            <span>CloudShadow • Root Cause Intelligence</span>

            <span>Detect → Trace → Explain → Optimize</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

