import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function OnboardingList() {
  const [q, setQ] = useState("");
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(12);
  const [loading, setLoading] = useState(true);

  const params = useMemo(() => ({ q, page, size }), [q, page, size]);

  useEffect(() => {
    let on = true;
    setLoading(true);
    (async () => {
      const res = await api.get("/api/onboarding/plans", { params });
      if (!on) return;
      setItems(res.data.items || []);
      setTotal(res.data.total || 0);
      setLoading(false);
    })();
    return () => { on = false; };
  }, [params]);

  const totalPages = Math.max(1, Math.ceil(total / size));

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <h1 className="text-3xl font-bold text-pink-500 text-center">Onboarding</h1>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <input
          className="bg-gray-900 border border-gray-800 px-3 py-2 rounded-lg"
          placeholder="Search candidate"
          value={q}
          onChange={(e) => { setQ(e.target.value); setPage(1); }}
        />
        <Link
          to="/onboarding/new"
          className="ml-auto px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700"
        >
          New Plan
        </Link>
      </div>

      {loading ? (
        <p className="mt-8 text-gray-400">Loading…</p>
      ) : items.length === 0 ? (
        <p className="mt-8 text-gray-400">No plans.</p>
      ) : (
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {items.map(p => (
            <Link
              key={p.id}
              to={`/onboarding/${p.id}`}
              className="rounded-xl border border-white/10 bg-slate-900/60 p-5 hover:border-pink-500/40 transition"
            >
              <div className="text-lg font-semibold">{p.candidateName}</div>
              <div className="text-sm text-slate-400 mt-1">Started: {new Date(p.startDate).toLocaleDateString()}</div>

              <div className="mt-4">
                <div className="flex justify-between text-sm text-slate-300 mb-1">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-2 bg-pink-600" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="mt-2 text-xs text-slate-400">
                  {p.completedTasks}/{p.totalTasks} tasks
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
            className="px-3 py-2 rounded bg-slate-900/70 disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-slate-300 px-2">Page {page} / {totalPages}</span>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            className="px-3 py-2 rounded bg-slate-900/70 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
