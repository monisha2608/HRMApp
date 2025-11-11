import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", fullName: "", agree: false });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  // simple, fast client-side checks before hitting API
  const issues = useMemo(() => {
    const errs = [];
    if (!form.fullName.trim()) errs.push("Full name is required");
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
    if (!emailOk) errs.push("Enter a valid email address");
    if (form.password.length < 8) errs.push("Password must be at least 8 characters");
    if (!/[A-Z]/.test(form.password)) errs.push("Add at least one uppercase letter");
    if (!/[a-z]/.test(form.password)) errs.push("Add at least one lowercase letter");
    if (!/[0-9]/.test(form.password)) errs.push("Add at least one number");
    if (!/[^A-Za-z0-9]/.test(form.password)) errs.push("Add at least one symbol");
    if (!form.agree) errs.push("Please accept the Terms & Privacy");
    return errs;
  }, [form]);

  const strength = useMemo(() => {
    let s = 0;
    if (form.password.length >= 8) s++;
    if (/[A-Z]/.test(form.password)) s++;
    if (/[a-z]/.test(form.password)) s++;
    if (/[0-9]/.test(form.password)) s++;
    if (/[^A-Za-z0-9]/.test(form.password)) s++;
    return Math.min(s, 5);
  }, [form.password]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (issues.length) {
      // Surface the first issue inline; field highlights guide the rest
      setError(issues[0]);
      return;
    }
    setBusy(true);
    try {
      await register({
        email: form.email.trim(),
        password: form.password,
        fullName: form.fullName.trim(),
        role: "Candidate",
      });
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.error || "Registration failed";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  // ui helpers
  const strengthLabels = ["Very weak", "Weak", "Okay", "Good", "Strong"];
  const strengthPct = (strength / 5) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* glow accent */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-pink-600/30 via-fuchsia-500/30 to-purple-500/30 blur-2xl" aria-hidden />

        <div className="relative rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Create an Account</h1>
            <p className="mt-2 text-sm text-slate-300">Join to manage applications, track status, and more.</p>
          </header>

          {error && (
            <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <label className="block" htmlFor="fullName">
              <span className="mb-1.5 block text-slate-200">Full Name</span>
              <div className={`flex items-center gap-3 rounded-xl border bg-slate-800/60 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${!form.fullName.trim() && error.includes("Full name") ? "border-red-500/50" : "border-white/10"}`}>
                <User className="h-5 w-5 text-slate-400" />
                <input
                  id="fullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Alex Johnson"
                  className="w-full bg-transparent outline-none placeholder:text-slate-500"
                  autoComplete="name"
                  required
                />
              </div>
            </label>

            {/* Email */}
            <label className="block" htmlFor="email">
              <span className="mb-1.5 block text-slate-200">Email</span>
              <div className={`flex items-center gap-3 rounded-xl border bg-slate-800/60 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${error.includes("email") ? "border-red-500/50" : "border-white/10"}`}>
                <Mail className="h-5 w-5 text-slate-400" />
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full bg-transparent outline-none placeholder:text-slate-500"
                  autoComplete="email"
                  required
                />
              </div>
            </label>

            {/* Password */}
            <label className="block" htmlFor="password">
              <span className="mb-1.5 block text-slate-200">Password</span>
              <div className={`flex items-center gap-3 rounded-xl border bg-slate-800/60 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${error.toLowerCase().includes("password") ? "border-red-500/50" : "border-white/10"}`}>
                <Lock className="h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="At least 8 characters"
                  className="w-full bg-transparent outline-none placeholder:text-slate-500"
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="text-slate-400 transition hover:text-slate-200"
                >
                  {showPw ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              {/* Strength bar */}
              <div className="mt-2">
                <div className="h-2 w-full rounded-full bg-slate-800">
                  <div
                    className={`h-2 rounded-full bg-gradient-to-r from-rose-500 via-fuchsia-500 to-purple-500`}
                    style={{ width: `${strengthPct}%` }}
                    aria-hidden
                  />
                </div>
                <div className="mt-1.5 flex items-center justify-between text-xs text-slate-400">
                  <span>Password strength</span>
                  <span className="font-medium text-slate-300">{strengthLabels[Math.max(0, strength - 1)] || "Very weak"}</span>
                </div>
              </div>
            </label>

           {/* Terms */}
            <label className="mt-2 flex items-start gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
                className="mt-0.5 h-4 w-4 rounded border-white/20 bg-slate-800 accent-pink-600"
              />
              <span>
                I agree to the <a href="#" className="text-pink-400 hover:text-pink-300 underline decoration-dotted">Terms of Service</a> and
                <a href="#" className="ml-1 text-pink-400 hover:text-pink-300 underline decoration-dotted">Privacy Policy</a>.
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={busy}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-600 px-5 py-3 text-base font-semibold shadow-lg shadow-pink-600/30 transition hover:bg-pink-700 disabled:opacity-70"
            >
              {busy ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            {/* Trust hint */}
            <div className="flex items-center justify-center gap-2 pt-2 text-xs text-slate-400">
              <ShieldCheck className="h-4 w-4" />
              <span>Your data is encrypted in transit.</span>
            </div>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
            <div className="h-px flex-1 bg-white/10" />
            <span>or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Social auth placeholders (optional wire-ups) */}
          <div className="grid grid-cols-1 gap-3">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              onClick={() => alert("Hook up Google OAuth here.")}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>
          </div>

          {/* Sign in link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Already have an account? {" "}
            <a href="/login" className="font-medium text-pink-400 hover:text-pink-300 underline decoration-dotted">Sign in</a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
