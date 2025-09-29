import { motion } from "framer-motion";

function Apply() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold mb-4">Apply for Job</h2>
      <form className="space-y-4 max-w-md">
        <input type="text" placeholder="Your Name" className="border p-2 w-full" />
        <input type="email" placeholder="Email" className="border p-2 w-full" />
        <input type="text" placeholder="Resume Link" className="border p-2 w-full" />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
      </form>
    </motion.div>
  );
}
export default Apply;
