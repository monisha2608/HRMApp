import { useEffect, useMemo, useState } from "react";
import api, { API_BASE } from "../services/api";

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
    case "Hired": return "bg-green-100 text-green-800 ring-1 ring-green-300";
    case "UnderReview": return "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300";
    case "Rejected": return "bg-red-100 text-red-800 ring-1 ring-red-300";
    case "Shortlisted": return "bg-purple-100 text-purple-800 ring-1 ring-purple-300";
    case "InterviewScheduled": return "bg-teal-100 text-teal-800 ring-1 ring-teal-300";
    case "Offered": return "bg-emerald-100 text-emerald-800 ring-1 ring-emerald-300";
    case "Applied":
    default: return "bg-blue-100 text-blue-800 ring-1 ring-blue-300";
  }
}

function prettyStatus(s) {
  return (s || "Applied").replace(/([a-z])([A-Z])/g, "$1 $2");
}

export default function CandidateDashboard() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(8);
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("new"); // "new" | "old"
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const params = useMemo(() => ({ page, size, status, sort }), [page, size, status, sort]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await api.get("/api/applications/mine", { params });
        if (!mounted) return;
        setItems(res.data.items || []);
        setTotal(res.data.total || 0);
      } catch (e) {
        setErr("Failed to load applications");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [params]);

  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-pink-500 mb-8 text-center">My Applications</h1>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center mb-8">
        <select
          className="p-3 rounded bg-gray-900 border border-gray-700"
          value={status}
          onChange={(e)=>{ setStatus(e.target.value); setPage(1); }}
        >
          {STATUS_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>

        <select
          className="p-3 rounded bg-gray-900 border border-gray-700"
          value={sort}
          onChange={(e)=>{ setSort(e.target.value); setPage(1); }}
        >
          <option value="new">Sort: Newest</option>
          <option value="old">Sort: Oldest</option>
        </select>

        <select
          className="p-3 rounded bg-gray-900 border border-gray-700"
          value={size}
          onChange={(e)=>{ setSize(parseInt(e.target.value||"8")); setPage(1); }}
        >
          <option value={8}>8 / page</option>
          <option value={12}>12 / page</option>
          <option value={16}>16 / page</option>
        </select>

        <div className="text-gray-400">Total: {total}</div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center text-gray-400">Loading…</div>
      ) : err ? (
        <div className="text-center text-red-400">{err}</div>
      ) : items.length === 0 ? (
        <div className="text-center text-gray-400">No applications yet.</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {items.map(a => (
            <div key={a.id} className="bg-gray-900 p-6 rounded-lg shadow-lg">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-semibold">{a.jobTitle ?? `Job #${a.jobId}`}</h2>
                  <p className="text-gray-400 mt-1">
                    Applied on: {a.appliedOn ? new Date(a.appliedOn).toLocaleString() : "—"}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${statusClasses(a.status)}`}>
                  {prettyStatus(a.status)}
                </span>
              </div>

              <div className="mt-4">
                {a.resumeUrl ? (
                  <a href={`${API_BASE}${a.resumeUrl}`} target="_blank" rel="noreferrer"
                     className="text-pink-400 hover:text-pink-300 underline">
                    Open Resume
                  </a>
                ) : (
                  <span className="text-gray-500">No resume</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            disabled={page<=1}
            onClick={()=>setPage(p=>Math.max(1,p-1))}
            className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
          >Prev</button>
          <span className="px-3 py-2 text-gray-300">Page {page} / {totalPages}</span>
          <button
            disabled={page>=totalPages}
            onClick={()=>setPage(p=>Math.min(totalPages,p+1))}
            className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  );
}
