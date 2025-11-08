import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-16 px-6 flex flex-col items-center">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold text-pink-500 mb-8"
      >
        Contact Us
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-gray-300 text-lg max-w-2xl text-center mb-12"
      >
        Have questions or want to get in touch? We’d love to hear from you. Send us a message or reach out through the contact details below.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
        className="relative bg-slate-900/70 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl w-full max-w-2xl"
      >
        <div className="mb-5">
          <label className="block text-gray-300 mb-2 font-medium">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/70 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-5">
          <label className="block text-gray-300 mb-2 font-medium">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/70 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2 font-medium">Message</label>
          <textarea
            rows="5"
            className="w-full px-4 py-3 rounded-xl bg-slate-800/70 text-white focus:outline-none focus:ring-2 focus:ring-pink-500 placeholder:text-gray-500"
            placeholder="Write your message..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="group w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <Send className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          Send Message
        </button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.7 }}
        className="mt-12 text-gray-400 text-center space-y-3"
      >
        <p className="flex items-center justify-center gap-2">
          <Mail className="h-5 w-5 text-pink-400" />
          <span className="text-pink-400">support@xyzcorp.com</span>
        </p>
        <p className="flex items-center justify-center gap-2">
          <Phone className="h-5 w-5 text-pink-400" />
          <span className="text-pink-400">+1 (555) 123-4567</span>
        </p>
        <p className="flex items-center justify-center gap-2">
          <MapPin className="h-5 w-5 text-pink-400" />
          <span className="text-pink-400">123 Tech Street, Toronto, Canada</span>
        </p>
      </motion.div>
    </div>
  );
}