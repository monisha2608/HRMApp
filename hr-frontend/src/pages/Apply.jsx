import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";

export default function Apply() {
  const [search] = useSearchParams();
  const jobId = search.get("jobId");
  const navigate = useNavigate();
  const { show } = useToast();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: null,
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverMsg, setServerMsg] = useState("");

  const onChange = (key, val) => {
    setServerMsg("");
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const validate = () => {
    const e = {};
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    if (!form.coverLetter.trim()) e.coverLetter = "Cover letter is required";
    if (!form.resume) e.resume = "Resume is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onFile = (f) => {
    setServerMsg("");
    if (!f) { setForm((p) => ({ ...p, resume: null })); return; }

    const ext = f.name.toLowerCase().split(".").pop();
    if (!["pdf", "doc", "docx"].includes(ext)) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF/DOC/DOCX allowed" }));
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: "Max size 10 MB" }));
      return;
    }
    setErrors((prev) => ({ ...prev, resume: undefined }));
    setForm((prev) => ({ ...prev, resume: f }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");
    if (!validate()) return;

    try {
      setSubmitting(true);

      const fd = new FormData();
      fd.append("jobId", jobId ?? "");
      fd.append("fullName", form.fullName);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("coverLetter", form.coverLetter);
      fd.append("resume", form.resume);

      await api.post("/api/applications", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      show("Application submitted successfully!"); // ✅ toast
      navigate("/candidate-dashboard");
    } catch (err) {
      console.error(err);
      show("Submission failed", "error");          // ❗ error toast
      setServerMsg(err?.response?.data ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6">
      <h1 className="text-3xl font-bold text-pink-500 mb-6">
        Apply • Job #{jobId ?? ""}
      </h1>

      <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
        {serverMsg && <div className="text-red-400">{String(serverMsg)}</div>}

        <div>
          <label className="block mb-2">Full Name</label>
          <input
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
            value={form.fullName}
            onChange={(e) => onChange("fullName", e.target.value)}
          />
          {errors.fullName && <p className="text-red-400 text-sm">{errors.fullName}</p>}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Email</label>
            <input
              className="w-full p-3 rounded bg-gray-900 border border-gray-700"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label className="block mb-2">Phone</label>
            <input
              className="w-full p-3 rounded bg-gray-900 border border-gray-700"
              value={form.phone}
              onChange={(e) => onChange("phone", e.target.value)}
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </div>
        </div>

        <div>
          <label className="block mb-2">Cover Letter</label>
          <textarea
            className="w-full p-3 rounded bg-gray-900 border border-gray-700"
            rows={6}
            value={form.coverLetter}
            onChange={(e) => onChange("coverLetter", e.target.value)}
          />
          {errors.coverLetter && <p className="text-red-400 text-sm">{errors.coverLetter}</p>}
        </div>

        <div>
          <label className="block mb-2">Resume (PDF/DOC/DOCX)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            className="block w-full text-sm"
          />
          {errors.resume && <p className="text-red-400 text-sm">{errors.resume}</p>}
        </div>

        <button
          disabled={submitting}
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 rounded-lg font-semibold disabled:opacity-60"
        >
          {submitting ? "Submitting..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
}
