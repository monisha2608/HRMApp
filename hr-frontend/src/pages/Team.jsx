import { motion } from "framer-motion";

function Team() {
  const teamMembers = [
    {
      name: "Monisha Monisha",
      role: "Front-End/UI Designer",
      bio: "A creative Front-End/UI Designer specializing in React.js and Tailwind CSS to craft engaging, user-friendly interfaces.",
    },
    {
      name: "Saurav Kumar Suraj",
      role: "Project Manager",
      bio: "A results-driven Project Manager skilled in leadership, planning, and coordination to ensure timely project delivery.",
    },
    {
      name: "Paras Saini",
      role: "HR Domain Specialist",
      bio: "An HR Domain Specialist focused on strategy, compliance, and workflow optimization for effective HR operations.",
    },
    {
      name: "Sanjana Sanjana",
      role: "Technical Writer",
      bio: "A Technical Writer adept at creating clear documentation and research reports to support project communication.",
    },
    {
      name: "Ramanpreet Kaur",
      role: "Software Engineer",
      bio: "A Software Engineer proficient in ASP.NET, SQL, and API development, building robust backend solutions.",
    },
    {
      name: "Jashanpreet Kaur",
      role: "Data Analyst",
      bio: "A Data Analyst experienced in Power BI and analytics for generating actionable insights and KPI dashboards.",
    },
    {
      name: "Kiranjeet Kaur",
      role: "QA & Testing Specialist",
      bio: "A QA & Testing Specialist dedicated to ensuring quality through meticulous testing and debugging processes.",
    },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 60 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white py-20 px-6 md:px-12">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-extrabold text-center mb-4"
      >
        Meet Our <span className="text-pink-500">Team</span>
      </motion.h1>
      <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto text-lg">
        The passionate professionals behind XYZ Corporation — blending creativity, innovation, and technical excellence.
      </p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
        {teamMembers.map((member, index) => (
          <motion.div
            key={index}
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="group relative overflow-hidden rounded-2xl bg-gray-900/70 border border-gray-700 hover:border-pink-500 transition-all duration-500 shadow-lg hover:shadow-pink-500/30"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition duration-700" />

            <div className="relative z-10 p-8">
              <h2 className="text-2xl font-bold mb-1 group-hover:text-pink-400 transition">
                {member.name}
              </h2>
              <h3 className="text-lg font-semibold text-purple-400 mb-4 tracking-wide uppercase">
                {member.role}
              </h3>
              <p className="text-gray-300 leading-relaxed">{member.bio}</p>

              <div className="mt-6 flex items-center gap-4">
                <span className="h-[2px] w-10 bg-pink-500 block"></span>
                <p className="text-sm text-gray-400 italic">
                  Driven • Passionate • Innovative
                </p>
              </div>
            </div>

            {/* subtle floating animation */}
            <motion.div
              className="absolute -bottom-10 left-0 w-full h-[3px] bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-all duration-700"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
            />
          </motion.div>
        ))}
      </div>

      {/* CTA / Footer */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="text-center mt-24"
      >
        <h2 className="text-3xl font-bold mb-4">
          Want to join our <span className="text-purple-400">dynamic team?</span>
        </h2>
        <p className="text-gray-400 mb-8">
          We're always looking for talented individuals who want to make an impact.
        </p>
        <a
          href="/jobs"
          className="inline-block px-8 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-lg font-semibold transition shadow-lg hover:shadow-pink-500/40"
        >
          Explore Careers
        </a>
      </motion.div>
    </div>
  );
}

export default Team;
