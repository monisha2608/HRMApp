function Team() {
  const teamMembers = [
    {
      name: "Alice Johnson",
      role: "CEO & Founder",
      bio: "Visionary leader with 10+ years in tech innovation and business strategy.",
    },
    {
      name: "Michael Lee",
      role: "CTO",
      bio: "Expert in AI and cloud technologies, driving the technical roadmap of XYZ Corporation.",
    },
    {
      name: "Sophia Patel",
      role: "HR Manager",
      bio: "Passionate about people and processes, ensuring smooth hiring and employee growth.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-pink-500 mb-12 text-center">
        Meet Our Team
      </h1>
      <div className="grid md:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-gray-900 p-6 rounded-lg shadow-lg hover:shadow-pink-500/40 transition"
          >
            <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
            <h3 className="text-lg text-purple-400 mb-4">{member.role}</h3>
            <p className="text-gray-400">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
