import { motion } from "framer-motion";

function Homepage() {
  const letters = [
    { char: "X", color: "text-[orangered]" },
    { char: "Y", color: "text-purple-500" },
    { char: "Z", color: "text-pink-500" },
  ];

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white overflow-hidden px-6 py-10">
      <div className="flex items-end relative mt-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-orange-500 via-purple-600 to-pink-500 blur-3xl rounded-full"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        />
        {letters.map((l, index) => (
          <motion.span
            key={index}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.6 }}
            className={`text-6xl md:text-8xl font-extrabold mx-1 relative z-10 ${l.color}`}
            style={{ fontFamily: "Orbitron, sans-serif" }}
          >
            {l.char}
          </motion.span>
        ))}
        <motion.span
          initial={{ y: 200, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: letters.length * 0.6 }}
          className="text-3xl md:text-5xl font-semibold text-gray-300 ml-4 relative z-10"
          style={{ fontFamily: "Orbitron, sans-serif" }}
        >
          Corporation
        </motion.span>
      </div>

      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
        className="mt-20 text-2xl md:text-2xl font-bold text-gray-200 max-w-4xl text-center leading-snug"
      >
        Driving the future of technology with AI-powered solutions, 
        cloud innovation, and digital transformation — empowering businesses worldwide.
      </motion.p>
    </div>
  );
}

export default Homepage;
