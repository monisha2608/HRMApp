import { motion } from "framer-motion";

function Jobs() {
  const jobs = [
    { id: 1, title: "Software Engineer", desc: "Develop web apps" },
    { id: 2, title: "HR Manager", desc: "Manage candidates" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
      {jobs.map(job => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 mb-2 border rounded shadow"
        >
          <h3 className="font-semibold">{job.title}</h3>
          <p>{job.desc}</p>
        </motion.div>
      ))}
    </div>
  );
}
export default Jobs;
