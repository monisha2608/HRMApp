import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import api from "../services/api";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(9);

  const [q, setQ] = useState("");
  const [location, setLocation] = useState("");
  const [department, setDepartment] = useState("");
  const [employmentType, setEmploymentType] = useState("");

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const params = useMemo(
    () => ({ q, location, department, employmentType, page, size }),
    [q, location, department, employmentType, page, size]
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await api.get("/api/jobs", { params });
        if (!mounted) return;
        setJobs(res.data.items || []);
        setTotal(res.data.total || 0);
        setErr("");
      } catch (e) {
        setErr("Failed to load jobs");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [params]);

  const totalPages = Math.max(1, Math.ceil(total / size));

  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
  };

  const clearFilters = () => {
    setQ("");
    setLocation("");
    setDepartment("");
    setEmploymentType("");
    setPage(1);
  };

  const activeChips = [
    q && { label: `“${q}”`, onClear: () => setQ("") },
    location && { label: location, onClear: () => setLocation("") },
    department && { label: department, onClear: () => setDepartment("") },
    employmentType && { label: employmentType, onClear: () => setEmploymentType("") },
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="px-6 md:px-10 lg:px-16 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-extrabold text-center mb-3"
        >
          Current <span className="text-pink-500">Openings</span>
        </motion.h1>
        <p className="text-center text-gray-400 mb-6">
          Find your next role at XYZ Corporation.
        </p>

        {/* Sticky Filters */}
        <form
          onSubmit={onSearch}
          className="sticky top-0 z-20 bg-black/70 backdrop-blur supports-[backdrop-filter]:backdrop-blur rounded-2xl border border-white/10 p-4 md:p-5"
        >
          <div className="grid md:grid-cols-5 gap-3">
            <input
              aria-label="Keyword"
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-600 md:col-span-2"
              placeholder="Keyword (title/description)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <input
              aria-label="Location"
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <input
              aria-label="Department"
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-600"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <select
              aria-label="Employment type"
              className="p-3 rounded-lg bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
            >
              <option value="">Type</option>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
            </select>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <button
              className="px-5 py-2.5 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold transition"
            >
              Search
            </button>
            <button
              type="button"
              onClick={clearFilters}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg"
            >
              Clear
            </button>
            <div className="flex-1" />
            <select
              aria-label="Page size"
              className="p-2.5 rounded-lg bg-gray-900 border border-gray-700"
              value={size}
              onChange={(e) => { setSize(parseInt(e.target.value || "9", 10)); setPage(1); }}
            >
              <option value={6}>6 / page</option>
              <option value={9}>9 / page</option>
              <option value={12}>12 / page</option>
            </select>
            <div className="text-gray-400">Total: {total}</div>
          </div>

          {/* Active filter chips */}
          {activeChips.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeChips.map((c, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-sm"
                >
                  {c.label}
                  <button
                    type="button"
                    onClick={c.onClear}
                    className="text-gray-300 hover:text-white"
                    aria-label={`Clear ${c.label}`}
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </form>
      </section>

      {/* List */}
      <section className="px-6 md:px-10 lg:px-16 pb-16">
        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl bg-gray-900 border border-gray-800 p-6 animate-pulse">
                <div className="h-6 w-2/3 bg-gray-800 rounded mb-3" />
                <div className="h-4 w-full bg-gray-800 rounded mb-2" />
                <div className="h-4 w-5/6 bg-gray-800 rounded mb-6" />
                <div className="flex gap-2 mb-6">
                  <div className="h-6 w-20 bg-gray-800 rounded" />
                  <div className="h-6 w-24 bg-gray-800 rounded" />
                  <div className="h-6 w-28 bg-gray-800 rounded" />
                </div>
                <div className="h-10 w-28 bg-gray-800 rounded" />
              </div>
            ))}
          </div>
        ) : err ? (
          <div className="text-center text-red-400">
            {err}
            <div>
              <button
                onClick={() => setPage(1)}
                className="mt-4 px-4 py-2 bg-gray-800 rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center text-gray-400">
            No jobs found. Try different filters.
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {jobs.map((job, idx) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: (idx % 3) * 0.06 }}
                className="group relative bg-gray-900 p-6 rounded-xl border border-gray-800 hover:border-pink-500/50 shadow-lg hover:shadow-pink-500/30 transition"
              >
                <div className="absolute -inset-px rounded-xl bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition" />
                <div className="relative">
                  <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
                  <p className="text-gray-400 mb-5 line-clamp-3">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {job.department && (
                      <span className="px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 text-xs">
                        {job.department}
                      </span>
                    )}
                    {job.location && (
                      <span className="px-3 py-1 rounded-full bg-pink-600/20 text-pink-300 text-xs">
                        {job.location}
                      </span>
                    )}
                    {job.employmentType && (
                      <span className="px-3 py-1 rounded-full bg-orange-600/20 text-orange-300 text-xs">
                        {job.employmentType}
                      </span>
                    )}
                  </div>

                  <Link
                    to={`/jobs/${job.id}`}
                    className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
            >
              Prev
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }).slice(0, 6).map((_, i) => {
                const n = i + 1;
                const active = page === n;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`px-3 py-2 rounded ${
                      active ? "bg-pink-600" : "bg-gray-800 hover:bg-gray-700"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
              {totalPages > 6 && (
                <span className="px-2 text-gray-500">…</span>
              )}
            </div>

            <button
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
