import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await api.get(`/api/jobs/${id}`);
        if (mounted) setJob(res.data);
      } catch (e) {
        setErr(e?.response?.status === 404 ? "Job not found" : "Failed to load job");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading…</div>;
  }

  if (err) {
    return <div className="min-h-screen bg-black text-red-500 flex items-center justify-center text-xl">{err}</div>;
  }

  const handleApply = () => {
    const returnTo = `/apply?jobId=${id}`;
    if (user) {
      navigate(returnTo);
    } else {
      navigate(`/register?returnTo=${encodeURIComponent(returnTo)}`);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-8">
      <h1 className="text-4xl font-bold text-pink-500 mb-6">{job.title}</h1>

      <div className="text-gray-300 text-lg mb-8 whitespace-pre-line">
        {job.description}
      </div>

      <div className="text-gray-400 mb-10 space-x-3">
        {job.department && <span>Dept: {job.department}</span>}
        {job.location && <span>• {job.location}</span>}
        {job.employmentType && <span>• {job.employmentType}</span>}
      </div>

      <button
        onClick={handleApply}
        className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
      >
        Apply Now
      </button>
    </div>
  );
}

export default JobDetails;
