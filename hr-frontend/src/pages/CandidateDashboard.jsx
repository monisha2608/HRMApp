import { useApplications } from "../context/ApplicationContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";

function CandidateDashboard() {
  const { applications } = useApplications();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login"); // ✅ redirect if not logged in
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-pink-500 mb-10 text-center">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <p className="text-center text-gray-400 text-lg">
          You haven’t applied for any jobs yet.
        </p>
      ) : (
        <div className="grid md:grid-cols-2 gap-8">
          {applications.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-pink-500/40 transition"
            >
              <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
              <p className="text-gray-400 mb-4">
                Applied on: {new Date(job.date).toLocaleDateString()}
              </p>
              <span className="px-3 py-1 rounded-lg text-sm font-semibold bg-yellow-600 text-white">
                {job.status}
              </span>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CandidateDashboard;
