import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";
import api from "../services/api";
import { useToast } from "../context/ToastContext";
import { motion } from "framer-motion";
import {
  FileUp, CheckCircle2, AlertCircle, User, Mail, Phone,
  FileText, X, Loader2, Briefcase
} from "lucide-react";

export default function Apply() {
  const [search] = useSearchParams();
  const jobId = search.get("jobId");
  const navigate = useNavigate();
  const { show } = useToast();

  // job header
  const [job, setJob] = useState(null);
  const [jobErr, setJobErr] = useState("");
  const [jobLoading, setJobLoading] = useState(!!jobId);

  // form
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
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // ---- job fetch (for nice header) ----
  useEffect(() => {
    let on = true;
    if (!jobId) return;
    (async () => {
      try {
        setJobLoading(true);
        const res = await api.get(`/api/jobs/${jobId}`);
        if (!on) return;
        setJob(res.data);
      } catch (e) {
        if (!on) return;
        setJobErr(e?.response?.status === 404 ? "Job not found." : "Failed to load job.");
      } finally {
        if (on) setJobLoading(false);
      }
    })();
    return () => { on = false; };
  }, [jobId]);

  // ---- helpers ----
  const onChange = (key, val) => {
    setServerMsg("");
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const formatPhone = (v) => {
    const d = v.replace(/\D/g, "").slice(0, 10);
    const p1 = d.slice(0, 3);
    const p2 = d.slice(3, 6);
    const p3 = d.slice(6, 10);
    if (d.length > 6) return `(${p1}) ${p2}-${p3}`;
    if (d.length > 3) return `(${p1}) ${p2}`;
    if (d.length > 0) return `(${p1}`;
    return "";
  };

  const validate = () => {
    const e = {};
    if (!jobId) e.jobId = "Missing job id.";
    if (!form.fullName.trim()) e.fullName = "Full name is required";
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email";
    if (!form.phone.trim()) e.phone = "Phone is required";
    else if (form.phone.replace(/\D/g, "").length < 10) e.phone = "Enter a 10-digit phone";
    if (!form.coverLetter.trim()) e.coverLetter = "Cover letter is required";
    if (!form.resume) e.resume = "Resume is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const allowExt = ["pdf", "doc", "docx"];
  const onFile = (f) => {
    setServerMsg("");
    if (!f) { setForm((p) => ({ ...p, resume: null })); return; }
    const ext = f.name.toLowerCase().split(".").pop();
    if (!allowExt.includes(ext)) {
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
      fd.append("fullName", form.fullName.trim());
      fd.append("email", form.email.trim());
      fd.append("phone", form.phone.trim());
      fd.append("coverLetter", form.coverLetter.trim());
      fd.append("resume", form.resume);

      await api.post("/api/applications", fd, { headers: { "Content-Type": "multipart/form-data" } });
      show("Application submitted successfully!");
      try { localStorage.removeItem(draftKey); } catch {}
      navigate("/candidate-dashboard");
    } catch (err) {
      console.error(err);
      show("Submission failed", "error");
      setServerMsg(err?.response?.data ?? "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  // ---- cover letter helpers ----
  const CL_MAX = 2000;
  const clLeft = useMemo(() => Math.max(0, CL_MAX - form.coverLetter.length), [form.coverLetter]);
  const clPct = useMemo(() => 100 - Math.floor((clLeft / CL_MAX) * 100), [clLeft]);

  // ---- autosave draft to localStorage ----
  const draftKey = useMemo(() => `apply:draft:${jobId ?? "unknown"}`, [jobId]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(draftKey);
      if (raw) {
        const d = JSON.parse(raw);
        setForm((prev) => ({ ...prev, ...d, resume: null })); // no file blobs
      }
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draftKey]);

  useEffect(() => {
    try {
      const { fullName, email, phone, coverLetter } = form;
      localStorage.setItem(draftKey, JSON.stringify({ fullName, email, phone, coverLetter }));
    } catch {}
  }, [form.fullName, form.email, form.phone, form.coverLetter, draftKey, form]);

  // ---- drag & drop ----
  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const f = e.dataTransfer.files?.[0];
    if (f) onFile(f);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-16 px-6">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-3xl"
      >
        <div className="flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-pink-400" />
          <h1 className="text-3xl font-bold text-pink-500">
            Apply {jobId ? `• Job #${jobId}` : ""}
          </h1>
        </div>

        {jobLoading ? (
          <p className="mt-2 text-slate-400">Loading job…</p>
        ) : jobErr ? (
          <p className="mt-2 text-rose-300">{jobErr}</p>
        ) : job ? (
          <div className="mt-3 text-slate-300">
            <div className="font-semibold">{job.title}</div>
            <div className="text-sm text-slate-400">
              {[job.department, job.location, job.employmentType].filter(Boolean).join(" • ")}
            </div>
          </div>
        ) : null}

        <p className="mt-3 text-slate-300">
          Please complete the form below. Supported resume types: PDF, DOC, DOCX (max 10 MB).
        </p>
        {errors.jobId && <p className="mt-1 text-rose-400 text-sm">{errors.jobId}</p>}
      </motion.header>

      {/* Form */}
      <motion.form
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="mt-8 grid gap-6 max-w-3xl"
      >
        {serverMsg && (
          <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200 flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{String(serverMsg)}</span>
          </div>
        )}

        {/* Full Name */}
        <label className="block" htmlFor="fullName">
          <span className="mb-2 block text-slate-200">Full Name</span>
          <div className={`flex items-center gap-3 rounded-xl border bg-slate-900/70 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${errors.fullName ? "border-rose-500/50" : "border-white/10"}`}>
            <User className="h-5 w-5 text-slate-400" />
            <input
              id="fullName"
              className="w-full bg-transparent outline-none placeholder:text-slate-500"
              value={form.fullName}
              onChange={(e) => onChange("fullName", e.target.value)}
              placeholder="e.g., Alex Johnson"
              autoComplete="name"
              required
            />
          </div>
          {errors.fullName && <p className="mt-1 text-rose-400 text-sm">{errors.fullName}</p>}
        </label>

        {/* Email + Phone */}
        <div className="grid md:grid-cols-2 gap-6">
          <label className="block" htmlFor="email">
            <span className="mb-2 block text-slate-200">Email</span>
            <div className={`flex items-center gap-3 rounded-xl border bg-slate-900/70 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${errors.email ? "border-rose-500/50" : "border-white/10"}`}>
              <Mail className="h-5 w-5 text-slate-400" />
              <input
                id="email"
                className="w-full bg-transparent outline-none placeholder:text-slate-500"
                value={form.email}
                onChange={(e) => onChange("email", e.target.value)}
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            {errors.email && <p className="mt-1 text-rose-400 text-sm">{errors.email}</p>}
          </label>

          <label className="block" htmlFor="phone">
            <span className="mb-2 block text-slate-200">Phone</span>
            <div className={`flex items-center gap-3 rounded-xl border bg-slate-900/70 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${errors.phone ? "border-rose-500/50" : "border-white/10"}`}>
              <Phone className="h-5 w-5 text-slate-400" />
              <input
                id="phone"
                className="w-full bg-transparent outline-none placeholder:text-slate-500"
                value={form.phone}
                onChange={(e) => onChange("phone", formatPhone(e.target.value))}
                placeholder="(555) 123-4567"
                inputMode="tel"
                autoComplete="tel"
                required
              />
            </div>
            {errors.phone && <p className="mt-1 text-rose-400 text-sm">{errors.phone}</p>}
          </label>
        </div>

        {/* Cover Letter */}
        <label className="block" htmlFor="coverLetter">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-slate-200">Cover Letter</span>
            <span className={`text-xs ${clLeft < 100 ? "text-amber-300" : "text-slate-400"}`}>{clLeft} characters left</span>
          </div>
          <div className={`rounded-xl border bg-slate-900/70 focus-within:ring-2 focus-within:ring-pink-500 ${errors.coverLetter ? "border-rose-500/50" : "border-white/10"}`}>
            <textarea
              id="coverLetter"
              className="block w-full resize-y rounded-xl bg-transparent px-4 py-3 outline-none placeholder:text-slate-500"
              rows={8}
              maxLength={CL_MAX}
              value={form.coverLetter}
              onChange={(e) => onChange("coverLetter", e.target.value)}
              placeholder="Introduce yourself, highlight relevant skills, and explain why you're a great fit."
              required
            />
          </div>
          {/* progress bar */}
          <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-2 bg-pink-600 transition-all"
              style={{ width: `${clPct}%` }}
            />
          </div>
          {errors.coverLetter && <p className="mt-1 text-rose-400 text-sm">{errors.coverLetter}</p>}
        </label>

        {/* Resume Upload */}
        <div>
          <span className="mb-2 block text-slate-200">Resume (PDF/DOC/DOCX)</span>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            className={`rounded-2xl border-2 border-dashed px-6 py-8 text-center transition ${dragOver ? "border-pink-500 bg-pink-500/10" : errors.resume ? "border-rose-500/60" : "border-white/15"}`}
          >
            {!form.resume ? (
              <>
                <FileUp className="mx-auto h-10 w-10 text-slate-400" />
                <p className="mt-3 text-slate-300">Drag & drop your resume here, or</p>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-3 inline-flex items-center justify-center rounded-xl bg-pink-600 px-4 py-2 font-medium hover:bg-pink-700"
                >
                  Browse file
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  onChange={(e) => onFile(e.target.files?.[0] ?? null)}
                />
                <p className="mt-2 text-xs text-slate-400">Max 10 MB • PDF, DOC, DOCX</p>
              </>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-emerald-400" />
                <div className="text-sm text-slate-200">
                  <span className="font-medium">{form.resume.name}</span>
                  <span className="ml-2 text-slate-400">
                    ({(form.resume.size / (1024 * 1024)).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onFile(null)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2 text-sm text-slate-200 hover:bg-white/10"
                >
                  <X className="h-4 w-4" /> Replace file
                </button>
              </div>
            )}
          </div>
          {errors.resume && <p className="mt-2 text-rose-400 text-sm">{errors.resume}</p>}
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            disabled={submitting}
            className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-pink-600 px-6 py-3 font-semibold shadow-lg shadow-pink-600/30 transition hover:bg-pink-700 disabled:opacity-70"
          >
            {submitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                Submitting…
              </>
            ) : (
              <>
                <FileText className="h-5 w-5" />
                Submit Application
              </>
            )}
          </button>
        </div>
      </motion.form>
    </div>
  );
}
