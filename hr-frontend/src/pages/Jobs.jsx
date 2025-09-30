import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

function Jobs() {
  const navigate = useNavigate();

  const jobs = [
    { id: 1, title: "Frontend Developer", desc: "Build sleek and responsive UIs with React and Tailwind." },
    { id: 2, title: "Backend Engineer", desc: "Develop robust APIs and services with ASP.NET Core." },
    { id: 3, title: "AI Specialist", desc: "Work on AI-powered automation and recommendation systems." },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-8">
      <div className="flex items-center justify-between mb-14">
        <h1 className="text-4xl font-bold text-pink-500">Current Openings</h1>
        
        <button
          onClick={() => navigate("/login")}
          className="mt-7 px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition"
        >
          Candidate Login
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {jobs.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-pink-500/40 transition cursor-pointer"
          >
            <h2 className="text-2xl font-semibold mb-4">{job.title}</h2>
            <p className="text-gray-400 mb-6">{job.desc}</p>
            <Link
              to={`/jobs/${job.id}`}
              className="inline-block px-4 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default Jobs;
