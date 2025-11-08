import { useEffect, useMemo, useState } from "react";
import api, { API_BASE } from "../services/api";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Filter, Search, RefreshCw, FileText, ExternalLink, Briefcase } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "", label: "All statuses" },
  { value: "Applied", label: "Applied" },
  { value: "UnderReview", label: "Under Review" },
  { value: "Shortlisted", label: "Shortlisted" },
  { value: "InterviewScheduled", label: "Interview Scheduled" },
  { value: "Offered", label: "Offered" },
  { value: "Hired", label: "Hired" },
  { value: "Rejected", label: "Rejected" },
];

function statusClasses(status) {
  switch (status) {
    case "Hired": return "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40";
    case "UnderReview": return "bg-amber-500/15 text-amber-300 ring-1 ring-amber-500/40";
    case "Rejected": return "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/40";
    case "Shortlisted": return "bg-fuchsia-500/15 text-fuchsia-300 ring-1 ring-fuchsia-500/40";
    case "InterviewScheduled": return "bg-teal-500/15 text-teal-300 ring-1 ring-teal-500/40";
    case "Offered": return "bg-green-500/15 text-green-300 ring-1 ring-green-500/40";
    case "Applied":
    default: return "bg-blue-500/15 text-blue-300 ring-1 ring-blue-500/40";
  }
}

function prettyStatus(s) {
  return (s || "Applied").replace(/([a-z])([A-Z])/g, "$1 $2");
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-6 animate-pulse">
      <div className="h-6 w-2/3 rounded bg-white/10" />
      <div className="mt-3 h-4 w-1/3 rounded bg-white/10" />
      <div className="mt-6 h-8 w-28 rounded-full bg-white/10" />
      <div className="mt-6 h-4 w-24 rounded bg-white/10" />
    </div>
  );
}

export default function CandidateDashboard() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("new");
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const params = useMemo(() => ({ page, size, status, sort, q: q.trim() || undefined }), [page, size, status, sort, q]);
  const totalPages = Math.max(1, Math.ceil(total / size));

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setErr("");
    (async () => {
      try {
        const res = await api.get("/api/applications/mine", { params });
        if (!mounted) return;
        setItems(res.data.items || []);
        setTotal(res.data.total || 0);
      } catch (e) {
        if (!mounted) return;
        setErr("Failed to load applications");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [params]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-16 px-6">
      <motion.h1 initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} transition={{duration:0.4}} className="text-4xl font-bold text-center">
        My Applications
      </motion.h1>

      {/* Controls */}
      <div className="mt-8 grid gap-4 md:grid-cols-[1fr_auto_auto_auto] items-center">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            value={q}
            onChange={(e)=>{ setQ(e.target.value); setPage(1); }}
            placeholder="Search title or job #…"
            className="w-full rounded-xl bg-slate-900/70 border border-white/10 pl-10 pr-3 py-3 outline-none focus:ring-2 focus:ring-pink-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            className="rounded-xl bg-slate-900/70 border border-white/10 px-3 py-3"
            value={status}
            onChange={(e)=>{ setStatus(e.target.value); setPage(1); }}
          >
            {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </select>
        </div>

        <select
          className="rounded-xl bg-slate-900/70 border border-white/10 px-3 py-3"
          value={sort}
          onChange={(e)=>{ setSort(e.target.value); setPage(1); }}
        >
          <option value="new">Sort: Newest</option>
          <option value="old">Sort: Oldest</option>
        </select>

        <select
          className="rounded-xl bg-slate-900/70 border border-white/10 px-3 py-3"
          value={size}
          onChange={(e)=>{ setSize(parseInt(e.target.value||"8")); setPage(1); }}
        >
          <option value={8}>8 / page</option>
          <option value={12}>12 / page</option>
          <option value={16}>16 / page</option>
        </select>
      </div>

      {/* Content */}
      <div className="mt-8">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {Array.from({length:size}).map((_,i)=> <SkeletonCard key={i} />)}
          </div>
        ) : err ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 text-center">
            <p className="text-rose-200">{err}</p>
            <button onClick={()=>{ setPage(1); }} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-rose-500/20 px-4 py-2">
              <RefreshCw className="h-4 w-4" /> Retry
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
            <Briefcase className="mx-auto h-12 w-12 text-slate-400" />
            <h3 className="mt-4 text-xl font-semibold">No applications yet</h3>
            <p className="mt-2 text-slate-400">When you apply for jobs, they’ll show up here with status updates.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {items.map(a => (
              <motion.div key={a.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{duration:0.25}}
                className="rounded-2xl border border-white/10 bg-slate-900/60 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-semibold leading-tight">{a.jobTitle ?? `Job #${a.jobId}`}</h2>
                    <p className="text-slate-400 mt-1 text-sm">Applied on: {a.appliedOn ? new Date(a.appliedOn).toLocaleString() : "—"}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusClasses(a.status)}`}>
                    {prettyStatus(a.status)}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                  {a.resumeUrl ? (
                    <a href={`${API_BASE}${a.resumeUrl}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-pink-400 hover:text-pink-300 underline">
                      <FileText className="h-4 w-4" /> Open Resume
                    </a>
                  ) : (
                    <span className="text-slate-500">No resume</span>
                  )}
                  {a.jobUrl && (
                    <a href={a.jobUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sky-400 hover:text-sky-300 underline">
                      <ExternalLink className="h-4 w-4" /> View Job
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            disabled={page<=1}
            onClick={()=>setPage(p=>Math.max(1,p-1))}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900/70 px-3 py-2 disabled:opacity-50"
          >
            <ArrowLeft className="h-4 w-4" /> Prev
          </button>
          <span className="px-3 py-2 text-slate-300">Page {page} / {totalPages}</span>
          <button
            disabled={page>=totalPages}
            onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
            className="inline-flex items-center gap-2 rounded-xl bg-slate-900/70 px-3 py-2 disabled:opacity-50"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}