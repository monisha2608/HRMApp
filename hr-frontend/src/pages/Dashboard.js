import { motion } from "framer-motion";

function Dashboard() {
  const stats = [
    { job: "Software Engineer", applicants: 10 },
    { job: "HR Manager", applicants: 5 },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">HR Dashboard</h2>
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3, delay: i * 0.2 }}
          className="p-4 border rounded mb-2 bg-gray-100"
        >
          <p><strong>{s.job}</strong>: {s.applicants} applicants</p>
        </motion.div>
      ))}
    </div>
  );
}
export default Dashboard;
