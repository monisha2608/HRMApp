import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
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

  const params = useMemo(() => ({
    q, location, department, employmentType, page, size
  }), [q, location, department, employmentType, page, size]);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await api.get("/api/jobs", { params });
        if (!mounted) return;
        setJobs(res.data.items || []);
        setTotal(res.data.total || 0);
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
    setPage(1); // reset to first page on search
    // fetch triggers automatically via effect
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-8">
      <h1 className="text-4xl font-bold text-pink-500 mb-8 text-center">Current Openings</h1>

      {/* Filters */}
      <form onSubmit={onSearch} className="grid md:grid-cols-5 gap-4 mb-8">
        <input className="p-3 rounded bg-gray-900 border border-gray-700 md:col-span-2"
               placeholder="Keyword (title/description)"
               value={q} onChange={(e)=>setQ(e.target.value)} />
        <input className="p-3 rounded bg-gray-900 border border-gray-700"
               placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} />
        <input className="p-3 rounded bg-gray-900 border border-gray-700"
               placeholder="Department" value={department} onChange={(e)=>setDepartment(e.target.value)} />
        <select className="p-3 rounded bg-gray-900 border border-gray-700"
                value={employmentType} onChange={(e)=>setEmploymentType(e.target.value)}>
          <option value="">Type</option>
          <option>Full-time</option>
          <option>Part-time</option>
          <option>Contract</option>
          <option>Internship</option>
        </select>

        <div className="md:col-span-5 flex items-center gap-4">
          <button className="px-5 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold">Search</button>
          <select className="p-3 rounded bg-gray-900 border border-gray-700"
                  value={size} onChange={(e)=>{ setSize(parseInt(e.target.value||"9")); setPage(1); }}>
            <option value={6}>6 / page</option>
            <option value={9}>9 / page</option>
            <option value={12}>12 / page</option>
          </select>
          <div className="text-gray-400">Total: {total}</div>
        </div>
      </form>

      {/* List */}
      {loading ? (
        <div className="text-center text-gray-400">Loading…</div>
      ) : err ? (
        <div className="text-center text-red-400">{err}</div>
      ) : jobs.length === 0 ? (
        <div className="text-center text-gray-400">No jobs found. Try different filters.</div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-pink-500/40 transition">
              <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-400 mb-4 line-clamp-3">{job.description}</p>
              <div className="text-gray-500 text-sm mb-5 space-x-3">
                {job.department && <span>{job.department}</span>}
                {job.location && <span>• {job.location}</span>}
                {job.employmentType && <span>• {job.employmentType}</span>}
              </div>
              <Link to={`/jobs/${job.id}`} className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg">
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            disabled={page<=1}
            onClick={()=>setPage(p => Math.max(1, p-1))}
            className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
          >Prev</button>

          <span className="px-3 py-2 text-gray-300">Page {page} / {totalPages}</span>

          <button
            disabled={page>=totalPages}
            onClick={()=>setPage(p => Math.min(totalPages, p+1))}
            className="px-3 py-2 bg-gray-800 rounded disabled:opacity-50"
          >Next</button>
        </div>
      )}
    </div>
  );
}
