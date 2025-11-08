import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const res = await api.get(`/api/jobs/${id}`);
        if (mounted) setJob(res.data);
        setErr("");
      } catch (e) {
        setErr(e?.response?.status === 404 ? "Job not found" : "Failed to load job");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const handleApply = () => {
    const returnTo = `/apply?jobId=${id}`;
    if (user) {
      navigate(returnTo);
    } else {
      navigate(`/register?returnTo=${encodeURIComponent(returnTo)}`);
    }
  };

  const chips = useMemo(() => {
    if (!job) return [];
    const arr = [];
    if (job.department) arr.push({ label: job.department, c: "from-purple-600/20 text-purple-300" });
    if (job.location) arr.push({ label: job.location, c: "from-pink-600/20 text-pink-300" });
    if (job.employmentType) arr.push({ label: job.employmentType, c: "from-orange-600/20 text-orange-300" });
    return arr;
  }, [job]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="px-6 md:px-10 lg:px-16 pt-16">
          <div className="h-10 w-2/3 bg-gray-900 rounded mb-6 animate-pulse" />
          <div className="h-5 w-1/2 bg-gray-900 rounded mb-3 animate-pulse" />
          <div className="h-5 w-2/3 bg-gray-900 rounded mb-8 animate-pulse" />
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-4 w-full bg-gray-900 rounded animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (err) {
    return (
      <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-xl">
        {err}
      </div>
    );
  }

  // Defensive: if API returned nothing
  if (!job) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center text-xl">
        Job unavailable.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header / title */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-16 pb-6 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-purple-900/20 via-black to-pink-900/20" />
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-extrabold text-pink-500 mb-4"
        >
          {job.title}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2"
        >
          {chips.map((chip, i) => (
            <span
              key={i}
              className={`px-3 py-1 rounded-full bg-gradient-to-r ${chip.c} text-xs border border-white/10`}
            >
              {chip.label}
            </span>
          ))}
        </motion.div>
      </section>

      {/* Body */}
      <section className="px-6 md:px-10 lg:px-16 pb-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="text-gray-300 text-lg whitespace-pre-line leading-relaxed"
        >
          {job.description || "No description provided."}
        </motion.div>

        {/* Optional: small metadata block */}
        {(job.postedOn || job.department || job.location) && (
          <div className="mt-8 text-sm text-gray-400 space-x-3">
            {job.postedOn && <span>Posted: {new Date(job.postedOn).toLocaleDateString()}</span>}
            {job.department && <span>• Dept: {job.department}</span>}
            {job.location && <span>• {job.location}</span>}
          </div>
        )}
      </section>

      {/* Sticky Apply Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-black/70 backdrop-blur border-t border-white/10 px-6 md:px-10 lg:px-16 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="text-gray-300 text-sm">
            Ready to apply for <span className="text-white font-semibold">{job.title}</span>?
          </div>
          <button
            onClick={handleApply}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobDetails;
