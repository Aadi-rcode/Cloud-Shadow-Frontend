
"use client";

import { useMemo, useState } from "react";
import Sidebar from "../Sidebar";
import { cloudAnalysis } from "../cloudData";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
  type Node,
  type Edge,
} from "reactflow";

import "reactflow/dist/style.css";

const serviceDetails: Record<
  string,
  {
    type: string;
    status: string;
    traffic: string;
    cost: string;
    latency: string;
    description: string;
  }
> = {
  api: {
    type: "ENTRY POINT",
    status: "Healthy",
    traffic: "+33%",
    cost: "₹96K",
    latency: "51 ms",
    description:
      "API Gateway receives incoming application traffic and routes requests into the service layer.",
  },

  "service-a": {
    type: "APPLICATION SERVICE",
    status: "Critical",
    traffic: "+62%",
    cost: "₹1.80L",
    latency: "82 ms",
    description:
      "Service A is the strongest upstream signal. Increased traffic is generating additional downstream requests.",
  },

  "service-b": {
    type: "DOWNSTREAM SERVICE",
    status: "Warning",
    traffic: "+48%",
    cost: "₹1.42L",
    latency: "76 ms",
    description:
      "Service B receives additional requests from Service A, increasing compute and network consumption.",
  },

  database: {
    type: "DATA LAYER",
    status: "Healthy",
    traffic: "+18%",
    cost: "₹1.24L",
    latency: "64 ms",
    description:
      "The database is downstream from Service B and shows increased workload as request volume propagates.",
  },
};

function CustomNode({
  data,
}: {
  data: {
    label: React.ReactNode;
    selected?: boolean;
  };
}) {
  return (
    <div
      className={`group min-w-[225px] rounded-2xl border px-5 py-4 transition-all duration-200 ${
        data.selected
          ? "border-teal-400/60 bg-teal-500/[0.10] shadow-[0_0_25px_rgba(20,184,166,0.14)]"
          : "border-white/[0.10] bg-[#101722] shadow-xl shadow-black/20 hover:border-teal-400/30"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!h-2 !w-2 !border-0 !bg-teal-400"
      />

      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg ${
              data.selected ? "bg-teal-400/15" : "bg-white/[0.06]"
            }`}
          >
            <span
              className={`h-2 w-2 rounded-full ${
                data.selected ? "bg-teal-300" : "bg-slate-500"
              }`}
            />
          </div>

          <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500">
            Service
          </span>
        </div>

        {data.selected && (
          <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-2 py-1 text-[8px] font-bold uppercase tracking-wider text-teal-300">
            Selected
          </span>
        )}
      </div>

      {data.label}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-2 !w-2 !border-0 !bg-teal-400"
      />
    </div>
  );
}

const nodeTypes = {
  custom: CustomNode,
};

export default function DependenciesPage() {
  const [selectedId, setSelectedId] = useState("service-a");

  const nodes = useMemo<Node[]>(
    () =>
      cloudAnalysis.dependencies.nodes.map((node, index) => ({
        id: node.id,
        position: {
          x: 380,
          y: index * 145 + 40,
        },
        data: {
          label: (
            <div>
              <p className="text-sm font-semibold text-white">
                {node.label}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {node.description}
              </p>
            </div>
          ),
          selected: node.id === selectedId,
        },
        type: "custom",
      })),
    [selectedId]
  );

  const edges = useMemo<Edge[]>(
    () =>
      cloudAnalysis.dependencies.edges.map((edge, index) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        animated: true,
        style: {
          stroke: index === 1 ? "#2dd4bf" : "#64748b",
          strokeWidth: index === 1 ? 3 : 2,
        },
      })),
    []
  );

  const selected = serviceDetails[selectedId];

  const selectedNode = cloudAnalysis.dependencies.nodes.find(
    (node) => node.id === selectedId
  );

  return (
    <main className="min-h-screen bg-[#070b12] text-slate-100">
      <Sidebar />

      <section className="min-h-screen lg:ml-[250px]">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-white/[0.07] bg-[#090e17]/90 px-6 py-5 backdrop-blur-xl lg:px-10">
          <div className="flex flex-col justify-between gap-5 xl:flex-row xl:items-center">
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-400">
                <span className="h-1.5 w-1.5 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.7)]" />
                CloudShadow / Application Topology
              </div>

              <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
                Dependency Intelligence
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Trace how application traffic propagates across services and
                contributes to cloud spending.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                  Nodes
                </p>

                <p className="mt-1 text-lg font-bold text-white">04</p>
              </div>

              <div className="rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                  Connections
                </p>

                <p className="mt-1 text-lg font-bold text-white">03</p>
              </div>

              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.07] px-4 py-3">
                <p className="text-[9px] font-bold uppercase tracking-wider text-emerald-400/60">
                  Status
                </p>

                <div className="mt-1 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

                  <span className="text-sm font-semibold text-emerald-300">
                    Live
                  </span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="space-y-6 p-5 lg:p-8">
          {/* GRAPH + INSPECTOR */}
          <section className="grid gap-5 xl:grid-cols-[1fr_350px]">
            {/* GRAPH */}
            <div className="overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0b111b]">
              <div className="flex flex-col justify-between gap-4 border-b border-white/[0.07] p-5 sm:flex-row sm:items-center lg:p-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.7)]" />

                    <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-400">
                      Live topology
                    </span>
                  </div>

                  <h2 className="mt-2 text-xl font-bold text-white">
                    Application traffic flow
                  </h2>

                  <p className="mt-1 text-xs text-slate-500">
                    Select a node to inspect its infrastructure impact.
                  </p>
                </div>

                <div className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-[10px] font-medium text-slate-500">
                  Click nodes to inspect
                </div>
              </div>

              <div className="h-[620px] bg-[#080d15]">
                <ReactFlow
                  nodes={nodes}
                  edges={edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{
                    padding: 0.25,
                  }}
                  onNodeClick={(_, node) => setSelectedId(node.id)}
                  attributionPosition="bottom-left"
                >
                  <Background
                    color="#1e293b"
                    gap={24}
                    size={1}
                  />

                  <Controls
                    className="!overflow-hidden !rounded-xl !border !border-white/[0.08] !bg-[#101722] [&>button]:!border-white/[0.06] [&>button]:!bg-[#101722] [&>button]:!fill-slate-400"
                  />

                  <MiniMap
                    nodeColor="#14b8a6"
                    maskColor="rgba(7,11,18,0.82)"
                    className="!overflow-hidden !rounded-xl !border !border-white/[0.08] !bg-[#101722]"
                  />
                </ReactFlow>
              </div>
            </div>

            {/* INSPECTOR */}
            <aside className="rounded-3xl border border-white/[0.08] bg-[#0b111b] p-6">
              <div className="flex items-center justify-between">
                <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-teal-300">
                  Selected service
                </span>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[9px] font-bold ${
                    selected.status === "Critical"
                      ? "border-red-500/20 bg-red-500/10 text-red-400"
                      : selected.status === "Warning"
                        ? "border-amber-500/20 bg-amber-500/10 text-amber-400"
                        : "border-emerald-500/20 bg-emerald-500/10 text-emerald-400"
                  }`}
                >
                  {selected.status}
                </span>
              </div>

              <div className="mt-7">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-600">
                  {selected.type}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-white">
                  {selectedNode?.label}
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {selected.description}
                </p>
              </div>

              <div className="my-7 h-px bg-white/[0.07]" />

              <div className="space-y-3">
                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <div className="flex items-center justify-between">
                    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                      Traffic change
                    </p>

                    <span className="h-1.5 w-1.5 rounded-full bg-teal-400" />
                  </div>

                  <p className="mt-2 text-xl font-bold text-teal-400">
                    {selected.traffic}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Cloud cost
                  </p>

                  <p className="mt-2 text-xl font-bold text-white">
                    {selected.cost}
                  </p>
                </div>

                <div className="rounded-xl border border-white/[0.07] bg-white/[0.025] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-wider text-slate-600">
                    Latency
                  </p>

                  <p className="mt-2 text-xl font-bold text-white">
                    {selected.latency}
                  </p>
                </div>
              </div>

              {selectedId === "service-a" && (
                <div className="mt-5 rounded-xl border border-red-500/15 bg-red-500/[0.06] p-4">
                  <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-red-400">
                    Root cause signal
                  </p>

                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Service A is currently the strongest upstream signal in
                    the dependency chain.
                  </p>
                </div>
              )}
            </aside>
          </section>

          {/* PRIMARY PATH */}
          <section className="rounded-3xl border border-teal-500/15 bg-gradient-to-r from-teal-500/[0.07] via-[#0b111b] to-blue-500/[0.05] p-6 lg:p-7">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-teal-400">
                  Dependency path
                </p>

                <h2 className="mt-2 text-xl font-bold text-white">
                  Primary traffic propagation
                </h2>
              </div>

              <span className="rounded-lg border border-white/[0.07] bg-white/[0.025] px-3 py-2 text-[9px] font-semibold text-slate-600">
                APPLICATION → INFRASTRUCTURE
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-400">
                API Gateway
              </span>

              <span className="text-teal-400">→</span>

              <span className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400">
                Service A +62%
              </span>

              <span className="text-teal-400">→</span>

              <span className="rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-2.5 text-sm font-semibold text-amber-400">
                Service B +48%
              </span>

              <span className="text-teal-400">→</span>

              <span className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-slate-400">
                Database +18%
              </span>
            </div>
          </section>

          {/* SIGNAL CARDS */}
          <section className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-red-500/15 bg-[#0b111b] p-6 transition hover:border-red-500/30">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-red-400">
                  Traffic signal
                </p>

                <span className="h-2 w-2 rounded-full bg-red-400" />
              </div>

              <p className="mt-4 text-3xl font-bold text-white">+62%</p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Service A traffic is the strongest upstream change.
              </p>
            </div>

            <div className="rounded-2xl border border-orange-500/15 bg-[#0b111b] p-6 transition hover:border-orange-500/30">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-orange-400">
                  Compute signal
                </p>

                <span className="h-2 w-2 rounded-full bg-orange-400" />
              </div>

              <p className="mt-4 text-3xl font-bold text-white">+31%</p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Additional requests increased compute consumption.
              </p>
            </div>

            <div className="rounded-2xl border border-teal-500/15 bg-[#0b111b] p-6 transition hover:border-teal-500/30">
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-teal-400">
                  Network signal
                </p>

                <span className="h-2 w-2 rounded-full bg-teal-400" />
              </div>

              <p className="mt-4 text-3xl font-bold text-white">+52%</p>

              <p className="mt-2 text-xs leading-6 text-slate-500">
                Service-to-service traffic increased network spending.
              </p>
            </div>
          </section>

          {/* AI INTELLIGENCE */}
          <section className="rounded-3xl border border-violet-500/15 bg-gradient-to-br from-violet-500/[0.07] via-[#0b111b] to-teal-500/[0.05] p-7 lg:p-8">
            <div className="flex flex-col justify-between gap-6 lg:flex-row">
              <div className="max-w-4xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-violet-400/20 bg-violet-400/10 text-sm text-violet-300">
                    ✦
                  </div>

                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-violet-300">
                      CloudShadow Intelligence
                    </p>

                    <p className="mt-1 text-[10px] text-slate-600">
                      Dependency-aware cost analysis
                    </p>
                  </div>
                </div>

                <h2 className="mt-5 text-xl font-bold text-white lg:text-2xl">
                  The dependency graph explains the cost chain.
                </h2>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  Increased traffic enters through the API Gateway, propagates
                  through Service A and Service B, and creates additional
                  downstream workload. CloudShadow connects this behavior to
                  higher compute and network consumption.
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2 lg:min-w-[190px]">
                <div className="rounded-xl border border-red-500/15 bg-red-500/[0.06] px-4 py-3">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
                    Trigger
                  </p>

                  <p className="mt-1 text-xs font-semibold text-red-400">
                    Service A
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/15 bg-amber-500/[0.06] px-4 py-3">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
                    Propagation
                  </p>

                  <p className="mt-1 text-xs font-semibold text-amber-400">
                    Service B
                  </p>
                </div>

                <div className="rounded-xl border border-teal-500/15 bg-teal-500/[0.06] px-4 py-3">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-slate-600">
                    Cost impact
                  </p>

                  <p className="mt-1 text-xs font-semibold text-teal-400">
                    Network
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="flex flex-col justify-between gap-2 border-t border-white/[0.07] pt-5 text-[10px] text-slate-600 sm:flex-row">
            <span>CloudShadow • Dependency Intelligence</span>

            <span>Trace → Connect → Explain</span>
          </footer>
        </div>
      </section>
    </main>
  );
}

