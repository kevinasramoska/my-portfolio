import {
  Activity,
  BarChart3,
  Building2,
  CircleDollarSign,
  Home,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import type { Project } from "@/types/content";

type ProjectPreviewProps = {
  project: Project;
  compact?: boolean;
};

function WindowChrome({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-3">
      <div className="flex gap-1.5">
        <span className="h-2 w-2 rounded-full bg-rose-400/80" />
        <span className="h-2 w-2 rounded-full bg-amber-300/80" />
        <span className="h-2 w-2 rounded-full bg-emerald-400/80" />
      </div>
      <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
        {label}
      </span>
    </div>
  );
}

function CryptoPreview({ compact }: { compact: boolean }) {
  const bars = [40, 58, 48, 72, 64, 86, 78, 96];

  return (
    <div className="project-preview-window overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020] shadow-2xl shadow-black/30 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-blue-950/40">
      <WindowChrome label="Demo interface" />
      <div className={compact ? "p-4" : "p-5 sm:p-6"}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Portfolio value
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
              $30,000.00
            </p>
            <p className="mt-1 text-xs font-semibold text-emerald-400">
              +$7,500 total P/L
            </p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/15 text-blue-300">
            <CircleDollarSign size={20} />
          </div>
        </div>

        <div className="mt-5 grid grid-cols-[1fr_auto] items-end gap-4 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div>
            <div className="flex h-16 items-end gap-1.5">
              {bars.map((height, index) => (
                <span
                  key={`${height}-${index}`}
                  className="project-chart-bar min-w-2 flex-1 rounded-t-sm bg-gradient-to-t from-blue-600 to-cyan-300"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
            <p className="mt-2 text-[10px] font-medium text-slate-500">30-day performance</p>
          </div>
          <BarChart3 className="text-slate-600" size={18} />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] text-slate-500">BTC holding</p>
            <p className="mt-1 text-sm font-semibold text-slate-200">0.50 BTC</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <p className="text-[10px] text-slate-500">Ledger status</p>
            <p className="mt-1 flex items-center gap-1.5 text-sm font-semibold text-emerald-300">
              <ShieldCheck size={13} /> Consistent
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function RentRightPreview({ compact }: { compact: boolean }) {
  return (
    <div className="project-preview-window overflow-hidden rounded-2xl border border-white/10 bg-[#10151f] shadow-2xl shadow-black/30 transition duration-500 group-hover:-translate-y-1 group-hover:shadow-emerald-950/30">
      <WindowChrome label="Demo interface" />
      <div className={compact ? "p-4" : "p-5 sm:p-6"}>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Landlord workspace
            </p>
            <p className="mt-1 text-xl font-bold tracking-tight text-white sm:text-2xl">
              Property overview
            </p>
          </div>
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400/10 text-emerald-300">
            <Building2 size={20} />
          </div>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-400/20 to-blue-400/10 text-emerald-300">
              <Home size={21} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-slate-100">Active property</p>
              <p className="mt-1 text-xs text-slate-500">Tenant access verified</p>
            </div>
            <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-300">
              Occupied
            </span>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Wrench size={14} />
              <p className="text-[10px] font-semibold uppercase tracking-wide">Maintenance</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-amber-300">In progress</p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="flex items-center gap-2 text-slate-400">
              <ShieldCheck size={14} />
              <p className="text-[10px] font-semibold uppercase tracking-wide">Access</p>
            </div>
            <p className="mt-2 text-sm font-semibold text-blue-300">Role scoped</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-xl border border-white/[0.06] px-3 py-2.5 text-xs text-slate-500">
          <span className="flex items-center gap-2"><Activity size={13} /> Workflow status</span>
          <span className="font-medium text-slate-300">Tracked</span>
        </div>
      </div>
    </div>
  );
}

export default function ProjectPreview({
  project,
  compact = false,
}: ProjectPreviewProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] p-5 sm:p-7 ${
        project.slug === "crypto-portfolio-tracker"
          ? "bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.28),transparent_55%),linear-gradient(145deg,#111827,#09090b)]"
          : "bg-[radial-gradient(circle_at_top_left,rgba(52,211,153,0.2),transparent_55%),linear-gradient(145deg,#14211d,#09090b)]"
      }`}
      aria-hidden="true"
    >
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/[0.04] blur-2xl" />
      {project.slug === "crypto-portfolio-tracker" ? (
        <CryptoPreview compact={compact} />
      ) : (
        <RentRightPreview compact={compact} />
      )}
    </div>
  );
}
