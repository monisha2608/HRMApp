import { useParams, useNavigate } from "react-router-dom";

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock job data
  const jobs = [
    { id: 1, title: "Frontend Developer", desc: "Full job description for Frontend Developer." },
    { id: 2, title: "Backend Engineer", desc: "Full job description for Backend Engineer." },
    { id: 3, title: "AI Specialist", desc: "Full job description for AI Specialist." },
  ];

  const job = jobs.find((j) => j.id === parseInt(id));

  if (!job) {
    return (
      <div className="h-screen flex items-center justify-center text-2xl text-red-500">
        Job not found
      </div>
    );
  }

  const handleApply = () => {
    navigate("/apply", { state: { job } }); // ✅ pass job info
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-8">
      <h1 className="text-4xl font-bold text-pink-500 mb-6">{job.title}</h1>
      <p className="text-gray-300 text-lg mb-10">{job.desc}</p>
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
