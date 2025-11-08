import { motion } from "framer-motion";

function Homepage() {
  const letters = [
    { char: "X", color: "text-[orangered]" },
    { char: "Y", color: "text-purple-500" },
    { char: "Z", color: "text-pink-500" },
  ];

  const fadeLeft = {
    hidden: { opacity: 0, x: -60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };
  const fadeRight = {
    hidden: { opacity: 0, x: 60 },
    show: { opacity: 1, x: 0, transition: { duration: 0.7 } },
  };
  const pop = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <div className="bg-black text-white">
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

      {/* About */}
      <section className="px-6 md:px-10 lg:px-16 py-20 bg-gradient-to-b from-black to-[#0b0b0f]">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold">
              About <span className="text-pink-500">XYZ</span> Corporation
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              We build intelligent products that scale. Our teams blend modern engineering with research-driven AI to deliver 
              secure, high-performance platforms across finance, retail, and healthcare.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 rounded-full bg-purple-600/20 text-purple-300 text-sm">AI/ML</span>
              <span className="px-4 py-2 rounded-full bg-pink-600/20 text-pink-300 text-sm">Cloud-Native</span>
              <span className="px-4 py-2 rounded-full bg-orange-600/20 text-orange-300 text-sm">APIs</span>
              <span className="px-4 py-2 rounded-full bg-emerald-600/20 text-emerald-300 text-sm">Security</span>
            </div>
          </motion.div>

          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-pink-500/20 blur-2xl rounded-3xl" />
            <div className="relative rounded-3xl border border-white/10 bg-black/60 p-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-purple-400">50+</div>
                  <div className="text-sm text-gray-400">Enterprise Apps</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-pink-400">99.9%</div>
                  <div className="text-sm text-gray-400">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-extrabold text-orange-400">15</div>
                  <div className="text-sm text-gray-400">Countries</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="px-6 md:px-10 lg:px-16 py-20 bg-black">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            variants={pop}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-14"
          >
            Our <span className="text-purple-500">Services</span>
          </motion.h3>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Solutions",
                text:
                  "Recommendation engines, NLP pipelines, and ML-powered automation integrated into your workflows.",
                accent: "from-purple-600/20 to-pink-600/20",
                border: "border-purple-500/30",
              },
              {
                title: "Cloud Engineering",
                text:
                  "Azure-first architecture, microservices, CI/CD, observability, and cost-efficient scaling.",
                accent: "from-orange-600/20 to-rose-600/20",
                border: "border-orange-500/30",
              },
              {
                title: "Product Development",
                text:
                  "Design-to-delivery web & mobile apps with API-first backends, security, and performance baked in.",
                accent: "from-emerald-600/20 to-cyan-600/20",
                border: "border-emerald-500/30",
              },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                className={`relative rounded-2xl p-6 bg-gradient-to-br ${s.accent} border ${s.border}`}
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-white/5 backdrop-blur-sm" />
                <div className="relative">
                  <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                  <p className="text-gray-300">{s.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="px-6 md:px-10 lg:px-16 py-20 bg-[#0b0b0f]">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            variants={pop}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="text-3xl md:text-4xl font-extrabold text-center mb-12"
          >
            How We <span className="text-pink-500">Deliver</span>
          </motion.h3>

          <div className="space-y-8">
            {[
              {
                step: "01",
                title: "Discovery & Strategy",
                text:
                  "We align on business goals, success metrics, and constraints to shape a practical roadmap.",
                side: "left",
              },
              {
                step: "02",
                title: "Design & Architecture",
                text:
                  "System design, data flows, and UI/UX prototypes with security and scale considerations.",
                side: "right",
              },
              {
                step: "03",
                title: "Build & Integrate",
                text:
                  "Agile delivery of features, integrations, and automation with continuous testing.",
                side: "left",
              },
              {
                step: "04",
                title: "Launch & Evolve",
                text:
                  "Release with observability, SLOs, and a feedback loop for ongoing improvements.",
                side: "right",
              },
            ].map((p) => (
              <motion.div
                key={p.step}
                variants={p.side === "left" ? fadeLeft : fadeRight}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                className={`grid md:grid-cols-12 gap-6 items-center`}
              >
                <div
                  className={`md:col-span-2 text-4xl font-extrabold ${
                    p.side === "left" ? "order-1" : "order-1 md:order-2 md:text-right"
                  } text-gray-500`}
                >
                  {p.step}
                </div>
                <div
                  className={`md:col-span-10 ${
                    p.side === "left" ? "order-2" : "order-2 md:order-1"
                  }`}
                >
                  <div className="rounded-2xl border border-white/10 p-6 bg-black/40">
                    <div className="text-xl font-bold mb-2">{p.title}</div>
                    <div className="text-gray-300">{p.text}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 lg:px-16 py-20 bg-black">
        <motion.div
          variants={pop}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-5xl mx-auto rounded-3xl p-10 border border-white/10 bg-gradient-to-r from-purple-900/30 via-black to-pink-900/30 text-center"
        >
          <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to build what’s next?
          </h3>
          <p className="text-gray-300 mb-8">
            Partner with XYZ Corporation to ship reliable products, faster—powered by AI and cloud excellence.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/contact"
              className="px-6 py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 transition"
            >
              Contact Us
            </a>
            <a
              href="/jobs"
              className="px-6 py-3 rounded-lg font-semibold bg-pink-600 hover:bg-pink-700 transition"
            >
              Careers
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Homepage;
