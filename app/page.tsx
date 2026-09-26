
"use client";

import Sidebar from "./Sidebar";
import { cloudAnalysis, formatINR, formatLakhs } from "./cloudData";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#07111f] text-slate-100">
      <Sidebar activeSection="overview" />

      <section className="lg:ml-[250px]">
        <Overview />
      </section>
    </main>
  );
}

function Overview() {
  const { overview, rootCause, costImpact, services, recommendations } =
    cloudAnalysis;

  const serviceA = services.find((service) => service.id === "service-a");
  const serviceB = services.find((service) => service.id === "service-b");

  const totalSavings = recommendations.reduce(
    (sum, recommendation) => sum + recommendation.saving,
    0
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#07111f]">
      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="border-b border-white/10 bg-[#081525]">
        <div className="px-5 py-5 sm:px-7 lg:px-9">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative h-2 w-2 rounded-full bg-cyan-400" />
                </span>

                <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Cloud Intelligence
                </span>
              </div>

              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                CloudShadow
              </h1>

              <p className="mt-1.5 text-xs text-slate-400">
                Cloud intelligence for explainable spending, root-cause
                analysis and optimization.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-2.5">
                <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

                <div>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-emerald-400">
                    Analysis Engine
                  </p>

                  <p className="mt-0.5 text-[10px] font-semibold text-emerald-300">
                    ACTIVE
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5">
                <p className="text-[8px] font-bold uppercase tracking-widest text-slate-500">
                  Analysis
                </p>

                <p className="mt-0.5 text-[10px] font-semibold text-slate-300">
                  Sep 26, 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <div className="space-y-5 p-5 sm:p-7 lg:p-9">
        {/* ===================================================
            KPI STRIP
        =================================================== */}
        <section>
          <div className="mb-3">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
              CloudShadow Overview
            </p>

            <h2 className="mt-1 text-sm font-bold text-white">
              Current cloud environment
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <MetricCard
              label="Current Cloud Cost"
              value={formatLakhs(overview.currentCost)}
              change={`+${overview.overallChange}%`}
              description="vs previous period"
              tone="cyan"
            />

            <MetricCard
              label="Cost Increase"
              value={`+${overview.overallChange}%`}
              change="38.4%"
              description="overall increase"
              tone="red"
            />

            <MetricCard
              label="Network Spending"
              value={formatLakhs(overview.networkCost)}
              change={`+${overview.networkChange}%`}
              description="strongest cost signal"
              tone="amber"
            />

            <MetricCard
              label="Active Investigations"
              value="04"
              change="02"
              description="high-impact signals"
              tone="blue"
            />

            <MetricCard
              label="Potential Savings"
              value={formatINR(totalSavings)}
              change="3"
              description="optimization actions"
              tone="green"
            />
          </div>
        </section>

        {/* ===================================================
            COST + AI INTELLIGENCE
        =================================================== */}
        <section className="grid gap-5 xl:grid-cols-[1.7fr_1fr]">
          {/* COST INTELLIGENCE */}
          <div className="rounded-2xl border border-white/10 bg-[#0b192b] shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  CloudShadow Intelligence
                </p>

                <h2 className="mt-1 text-sm font-bold text-white">
                  Service spending & anomaly signals
                </h2>
              </div>

              <button
                type="button"
                onClick={() => {
                  window.location.href = "/costs";
                }}
                className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[9px] font-bold text-slate-400 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300"
              >
                View Analysis →
              </button>
            </div>

            <div className="p-5">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">
                    Current monthly spend
                  </p>

                  <p className="mt-1 text-3xl font-bold tracking-tight text-white">
                    {formatLakhs(overview.currentCost)}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">
                    Previous
                  </p>

                  <p className="mt-1 text-sm font-bold text-slate-400">
                    {formatLakhs(overview.previousCost)}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <ServiceSignal
                  name="Service A"
                  category="Compute"
                  cost={serviceA?.current ?? 0}
                  change={serviceA?.change ?? 0}
                  signal={`Traffic +${serviceA?.traffic ?? 0}%`}
                  tone="red"
                />

                <ServiceSignal
                  name="Service B"
                  category="Network"
                  cost={serviceB?.current ?? 0}
                  change={serviceB?.change ?? 0}
                  signal={`Requests +${serviceB?.traffic ?? 0}%`}
                  tone="amber"
                />

                <ServiceSignal
                  name="Database"
                  category="Database"
                  cost={124000}
                  change={18}
                  signal="Normal activity"
                  tone="violet"
                />

                <ServiceSignal
                  name="API Gateway"
                  category="Network"
                  cost={96000}
                  change={33}
                  signal="Traffic increased"
                  tone="cyan"
                />
              </div>
            </div>
          </div>

          {/* AI DECISION FEED */}
          <div className="rounded-2xl border border-cyan-400/15 bg-[#0b192b] shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  CloudShadow AI
                </p>

                <h2 className="mt-1 text-sm font-bold text-white">
                  Decision Support Feed
                </h2>
              </div>

              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/5 px-2.5 py-1 text-[8px] font-bold uppercase tracking-wider text-emerald-400">
                Live Engine
              </span>
            </div>

            <div className="space-y-3 p-5">
              <DecisionFeed
                title="Root cause detected"
                description="Service A traffic is driving downstream infrastructure usage."
                value={`+${costImpact.serviceTraffic}%`}
                tone="red"
              />

              <DecisionFeed
                title="Downstream impact"
                description="Service B requests increased as upstream traffic grew."
                value={`+${serviceB?.traffic ?? 0}%`}
                tone="amber"
              />

              <DecisionFeed
                title="Network anomaly"
                description="Network spending is currently the strongest cost signal."
                value={`+${costImpact.network}%`}
                tone="cyan"
              />

              <DecisionFeed
                title="Optimization available"
                description="Caching and request optimization can reduce repeated traffic."
                value={formatINR(totalSavings)}
                tone="green"
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            ROOT CAUSE
        =================================================== */}
        <section className="rounded-2xl border border-red-400/15 bg-[#0b192b] shadow-2xl shadow-black/20">
          <div className="flex flex-col justify-between gap-4 border-b border-white/10 px-5 py-4 lg:flex-row lg:items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-red-400">
                CloudShadow Root Cause Engine
              </p>

              <h2 className="mt-1 text-sm font-bold text-white">
                Why did the cloud bill increase?
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-lg border border-red-400/20 bg-red-400/5 px-3 py-2 text-[9px] font-bold text-red-300">
                HIGH IMPACT
              </span>

              <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[9px] font-bold text-slate-400">
                {rootCause.confidence}% CONFIDENCE
              </span>
            </div>
          </div>

          <div className="grid gap-5 p-5 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="rounded-xl border border-red-400/10 bg-red-400/[0.03] p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-400/20 bg-red-400/10 text-lg font-bold text-red-400">
                    !
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-widest text-red-400">
                      Primary finding
                    </p>

                    <h3 className="mt-2 text-lg font-bold leading-snug text-white">
                      Service A traffic is driving downstream infrastructure
                      usage and cloud cost growth.
                    </h3>

                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      {rootCause.title}. Increased application traffic created
                      additional downstream requests, increasing compute and
                      network consumption.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <SignalMini
                  label="Service A Traffic"
                  value={`+${serviceA?.traffic ?? 0}%`}
                  tone="red"
                />

                <SignalMini
                  label="Service B Requests"
                  value={`+${serviceB?.traffic ?? 0}%`}
                  tone="amber"
                />

                <SignalMini
                  label="Network Cost"
                  value={`+${costImpact.network}%`}
                  tone="cyan"
                />
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#081525] p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-slate-500">
                Causal chain
              </p>

              <div className="mt-4 space-y-4">
                {cloudAnalysis.chain.map((item, index) => (
                  <div key={item.step} className="relative flex gap-3">
                    {index < cloudAnalysis.chain.length - 1 && (
                      <div className="absolute left-[11px] top-7 h-7 w-px bg-white/10" />
                    )}

                    <span className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/5 text-[8px] font-bold text-cyan-400">
                      {item.step}
                    </span>

                    <div>
                      <p className="text-[10px] font-bold text-slate-200">
                        {item.title}
                      </p>

                      <p className="mt-0.5 text-[9px] leading-4 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 border-t border-white/10 px-5 py-4">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/root-causes";
              }}
              className="rounded-lg bg-cyan-500 px-4 py-2.5 text-[9px] font-bold text-[#07111f] transition hover:bg-cyan-400"
            >
              Investigate Root Cause →
            </button>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/dependencies";
              }}
              className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-[9px] font-bold text-slate-300 transition hover:border-cyan-400/30 hover:bg-cyan-400/5 hover:text-cyan-300"
            >
              Open Dependency Network →
            </button>
          </div>
        </section>

        {/* ===================================================
            DEPENDENCY NETWORK
        =================================================== */}
        <section className="rounded-2xl border border-white/10 bg-[#0b192b] shadow-2xl shadow-black/20">
          <div className="flex flex-col justify-between gap-3 border-b border-white/10 px-5 py-4 sm:flex-row sm:items-center">
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                CloudShadow Dependency Network
              </p>

              <h2 className="mt-1 text-sm font-bold text-white">
                Application behaviour → infrastructure impact
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                window.location.href = "/dependencies";
              }}
              className="w-fit rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[9px] font-bold text-slate-400 transition hover:border-cyan-400/30 hover:text-cyan-300"
            >
              View Full Network →
            </button>
          </div>

          <div className="overflow-x-auto p-5">
            <div className="flex min-w-[700px] items-center justify-center gap-3 py-8">
              <NetworkNode
                title="API Gateway"
                subtitle="Entry point"
                value="+33%"
                tone="blue"
              />

              <NetworkArrow />

              <NetworkNode
                title="Service A"
                subtitle="Primary signal"
                value="+62%"
                tone="red"
                active
              />

              <NetworkArrow />

              <NetworkNode
                title="Service B"
                subtitle="Downstream"
                value="+48%"
                tone="amber"
                active
              />

              <NetworkArrow />

              <NetworkNode
                title="Database"
                subtitle="Data layer"
                value="+18%"
                tone="violet"
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            ACTIVITY + DECISION WORKSPACE
        =================================================== */}
        <section className="grid gap-5 xl:grid-cols-[1.3fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-[#0b192b]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                  Recent CloudShadow Activity
                </p>

                <h2 className="mt-1 text-sm font-bold text-white">
                  Cost investigation & coordination log
                </h2>
              </div>

              <span className="flex items-center gap-2 text-[8px] font-bold uppercase tracking-wider text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Live Sync
              </span>
            </div>

            <div className="divide-y divide-white/5">
              <ActivityRow
                time="10:42"
                title="Root cause identified"
                description="Service A traffic anomaly correlated with network spending."
                status="AI MATCH"
                tone="cyan"
              />

              <ActivityRow
                time="10:38"
                title="Dependency impact traced"
                description="Service A → Service B request amplification detected."
                status="TRACED"
                tone="blue"
              />

              <ActivityRow
                time="10:31"
                title="Cost anomaly detected"
                description="Monthly cloud spending crossed expected baseline."
                status="ALERT"
                tone="red"
              />

              <ActivityRow
                time="10:24"
                title="Optimization generated"
                description="Caching strategy estimated to reduce repeated traffic."
                status="READY"
                tone="green"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b192b]">
            <div className="border-b border-white/10 px-5 py-4">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500">
                CloudShadow Workspace
              </p>

              <h2 className="mt-1 text-sm font-bold text-white">
                Continue investigation
              </h2>
            </div>

            <div className="grid gap-2 p-4 sm:grid-cols-2 xl:grid-cols-1">
              <ActionButton
                title="Cost Analysis"
                description="Explore spending trends"
                href="/costs"
              />

              <ActionButton
                title="Service Intelligence"
                description="Inspect service signals"
                href="/services"
              />

              <ActionButton
                title="Root Cause"
                description="Review causal evidence"
                href="/root-causes"
              />

              <ActionButton
                title="Recommendations"
                description={`Review ${formatINR(totalSavings)} potential savings`}
                href="/recommendations"
              />
            </div>
          </div>
        </section>

        {/* ===================================================
            FOOTER
        =================================================== */}
        <footer className="flex flex-col justify-between gap-2 border-t border-white/10 pt-5 text-[8px] uppercase tracking-wider text-slate-600 sm:flex-row">
          <span>CloudShadow • Cloud Intelligence</span>

          <span>CloudShadow v1.0 • Analysis Engine Active</span>
        </footer>
      </div>
    </div>
  );
}

/* =========================================================
   METRIC CARD
   ========================================================= */

function MetricCard({
  label,
  value,
  change,
  description,
  tone,
}: {
  label: string;
  value: string;
  change: string;
  description: string;
  tone: "cyan" | "red" | "amber" | "blue" | "green";
}) {
  const tones = {
    cyan: {
      border: "border-cyan-400/15",
      glow: "bg-cyan-400/5",
      value: "text-cyan-300",
      dot: "bg-cyan-400",
    },
    red: {
      border: "border-red-400/15",
      glow: "bg-red-400/5",
      value: "text-red-300",
      dot: "bg-red-400",
    },
    amber: {
      border: "border-amber-400/15",
      glow: "bg-amber-400/5",
      value: "text-amber-300",
      dot: "bg-amber-400",
    },
    blue: {
      border: "border-blue-400/15",
      glow: "bg-blue-400/5",
      value: "text-blue-300",
      dot: "bg-blue-400",
    },
    green: {
      border: "border-emerald-400/15",
      glow: "bg-emerald-400/5",
      value: "text-emerald-300",
      dot: "bg-emerald-400",
    },
  };

  const style = tones[tone];

  return (
    <div
      className={`group relative overflow-hidden rounded-xl border ${style.border} bg-[#0b192b] p-4 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0d1d31]`}
    >
      <div
        className={`absolute right-0 top-0 h-20 w-20 rounded-bl-full ${style.glow}`}
      />

      <div className="relative">
        <div className="flex items-center gap-2">
          <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />

          <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
            {label}
          </p>
        </div>

        <p className={`mt-4 text-2xl font-bold tracking-tight ${style.value}`}>
          {value}
        </p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-[9px] font-bold text-slate-300">
            {change}
          </span>

          <span className="text-[8px] text-slate-600">{description}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SERVICE SIGNAL
   ========================================================= */

function ServiceSignal({
  name,
  category,
  cost,
  change,
  signal,
  tone,
}: {
  name: string;
  category: string;
  cost: number;
  change: number;
  signal: string;
  tone: "red" | "amber" | "violet" | "cyan";
}) {
  const colors = {
    red: "bg-red-400",
    amber: "bg-amber-400",
    violet: "bg-violet-400",
    cyan: "bg-cyan-400",
  };

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3 transition hover:border-white/10 hover:bg-white/[0.04]">
      <span className={`h-8 w-1 rounded-full ${colors[tone]}`} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] font-bold text-slate-200">{name}</p>

            <p className="mt-0.5 text-[8px] uppercase tracking-wider text-slate-600">
              {category}
            </p>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-bold text-white">
              {formatLakhs(cost)}
            </p>

            <p className="text-[8px] font-bold text-red-400">
              +{change}%
            </p>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <span className="h-1 w-1 rounded-full bg-slate-600" />

          <span className="text-[8px] text-slate-500">{signal}</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   AI DECISION FEED
   ========================================================= */

function DecisionFeed({
  title,
  description,
  value,
  tone,
}: {
  title: string;
  description: string;
  value: string;
  tone: "red" | "amber" | "cyan" | "green";
}) {
  const colors = {
    red: "border-red-400/20 bg-red-400/5 text-red-300",
    amber: "border-amber-400/20 bg-amber-400/5 text-amber-300",
    cyan: "border-cyan-400/20 bg-cyan-400/5 text-cyan-300",
    green: "border-emerald-400/20 bg-emerald-400/5 text-emerald-300",
  };

  return (
    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3.5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold text-slate-200">{title}</p>

          <p className="mt-1 text-[8px] leading-4 text-slate-500">
            {description}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-lg border px-2 py-1 text-[8px] font-bold ${colors[tone]}`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SIGNAL MINI
   ========================================================= */

function SignalMini({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "red" | "amber" | "cyan";
}) {
  const colors = {
    red: {
      border: "border-red-400/15",
      value: "text-red-300",
      dot: "bg-red-400",
    },
    amber: {
      border: "border-amber-400/15",
      value: "text-amber-300",
      dot: "bg-amber-400",
    },
    cyan: {
      border: "border-cyan-400/15",
      value: "text-cyan-300",
      dot: "bg-cyan-400",
    },
  };

  const style = colors[tone];

  return (
    <div className={`rounded-xl border ${style.border} bg-white/[0.02] p-3`}>
      <div className="flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${style.dot}`} />

        <p className="text-[8px] font-bold uppercase tracking-wider text-slate-500">
          {label}
        </p>
      </div>

      <p className={`mt-2 text-xl font-bold ${style.value}`}>{value}</p>
    </div>
  );
}

/* =========================================================
   NETWORK NODE
   ========================================================= */

function NetworkNode({
  title,
  subtitle,
  value,
  tone,
  active = false,
}: {
  title: string;
  subtitle: string;
  value: string;
  tone: "blue" | "red" | "amber" | "violet";
  active?: boolean;
}) {
  const colors = {
    blue: {
      border: "border-blue-400/30",
      bg: "bg-blue-400/5",
      value: "text-blue-300",
    },
    red: {
      border: "border-red-400/40",
      bg: "bg-red-400/10",
      value: "text-red-300",
    },
    amber: {
      border: "border-amber-400/40",
      bg: "bg-amber-400/10",
      value: "text-amber-300",
    },
    violet: {
      border: "border-violet-400/30",
      bg: "bg-violet-400/5",
      value: "text-violet-300",
    },
  };

  const style = colors[tone];

  return (
    <div
      className={`relative min-w-[145px] rounded-xl border p-4 text-center transition-all duration-300 hover:-translate-y-1 ${style.border} ${style.bg} ${
        active ? "shadow-[0_0_25px_rgba(34,211,238,0.08)]" : ""
      }`}
    >
      {active && (
        <span className="absolute -right-1.5 -top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
      )}

      <p className="text-[10px] font-bold text-white">{title}</p>

      <p className="mt-1 text-[8px] text-slate-500">{subtitle}</p>

      <p className={`mt-3 text-lg font-bold ${style.value}`}>{value}</p>
    </div>
  );
}

/* =========================================================
   NETWORK ARROW
   ========================================================= */

function NetworkArrow() {
  return (
    <div className="flex items-center gap-1">
      <span className="h-px w-7 bg-cyan-400/20" />

      <span className="text-cyan-400/60">›</span>
    </div>
  );
}

/* =========================================================
   ACTIVITY ROW
   ========================================================= */

function ActivityRow({
  time,
  title,
  description,
  status,
  tone,
}: {
  time: string;
  title: string;
  description: string;
  status: string;
  tone: "cyan" | "blue" | "red" | "green";
}) {
  const colors = {
    cyan: "text-cyan-300 border-cyan-400/20 bg-cyan-400/5",
    blue: "text-blue-300 border-blue-400/20 bg-blue-400/5",
    red: "text-red-300 border-red-400/20 bg-red-400/5",
    green: "text-emerald-300 border-emerald-400/20 bg-emerald-400/5",
  };

  return (
    <div className="flex gap-4 px-5 py-3.5">
      <span className="w-10 shrink-0 pt-0.5 font-mono text-[8px] text-slate-600">
        {time}
      </span>

      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[9px] font-bold text-slate-300">{title}</p>

          <span
            className={`rounded-md border px-1.5 py-0.5 text-[7px] font-bold ${colors[tone]}`}
          >
            {status}
          </span>
        </div>

        <p className="mt-1 text-[8px] text-slate-600">{description}</p>
      </div>
    </div>
  );
}

/* =========================================================
   ACTION BUTTON
   ========================================================= */

function ActionButton({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        window.location.href = href;
      }}
      className="group flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3 text-left transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.03]"
    >
      <div>
        <p className="text-[9px] font-bold text-slate-200">{title}</p>

        <p className="mt-0.5 text-[8px] text-slate-600">{description}</p>
      </div>

      <span className="text-xs text-slate-600 transition group-hover:text-cyan-400">
        →
      </span>
    </button>
  );
}
