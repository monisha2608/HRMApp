import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Apply() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job || { title: "Unknown Job", desc: "" };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resume: null,
    coverLetter: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application Submitted:", { job, ...formData });

    // Show success state
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 flex flex-col items-center">
      {!submitted ? (
        <>
          <h1 className="text-4xl font-bold text-pink-500 mb-8">
            Apply for {job.title}
          </h1>

          <div className="bg-gray-900 p-6 rounded-lg shadow-lg mb-10 max-w-2xl w-full">
            <h2 className="text-2xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-400">{job.desc}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl"
          >
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Resume (PDF)</label>
              <input
                type="file"
                name="resume"
                accept=".pdf"
                onChange={handleChange}
                required
                className="w-full text-gray-300"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-300 mb-2">Cover Letter</label>
              <textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-lg font-semibold transition"
            >
              Submit Application
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center mt-20">
  <h2 className="text-3xl font-bold text-green-500 mb-6">
    🎉 Application Submitted Successfully!
  </h2>
  <p className="text-gray-400 mb-8">
    To keep track of your applications, please{" "}
    <span className="text-pink-500">create an account</span>.
  </p>
  <button
    onClick={() => navigate("/register")}
    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg text-lg font-semibold transition"
  >
    Create an Account
  </button>
</div>

      )}
    </div>
  );
}

export default Apply;
