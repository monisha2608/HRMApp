import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, AlertCircle, KeyRound } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", remember: true });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPw, setShowPw] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await login({ email: form.email.trim(), password: form.password });
      // optional: persist email if remember me
      if (form.remember) {
        try { localStorage.setItem("hrapp:lastEmail", form.email.trim()); } catch {}
      } else {
        try { localStorage.removeItem("hrapp:lastEmail"); } catch {}
      }
      navigate("/dashboard");
    } catch (err) {
      const msg = err?.response?.data?.error || "Invalid email or password";
      setError(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="relative w-full max-w-md"
      >
        {/* soft neon glow */}
        <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-r from-pink-600/30 via-fuchsia-500/30 to-purple-500/30 blur-2xl" aria-hidden />

        <div className="relative rounded-3xl bg-slate-900/70 backdrop-blur-xl border border-white/10 shadow-2xl p-8">
          <header className="mb-6 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-sm text-slate-300">Sign in to continue to your dashboard.</p>
          </header>

          {error && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Email */}
            <label className="block" htmlFor="email">
              <span className="mb-1.5 block text-slate-200">Email</span>
              <div className={`flex items-center gap-3 rounded-xl border bg-slate-800/60 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${error.toLowerCase().includes("email") ? "border-rose-500/50" : "border-white/10"}`}>
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
              <div className={`flex items-center gap-3 rounded-xl border bg-slate-800/60 px-4 py-3 focus-within:ring-2 focus-within:ring-pink-500 ${error.toLowerCase().includes("password") ? "border-rose-500/50" : "border-white/10"}`}>
                <Lock className="h-5 w-5 text-slate-400" />
                <input
                  id="password"
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Your password"
                  className="w-full bg-transparent outline-none placeholder:text-slate-500"
                  autoComplete="current-password"
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
            </label>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-slate-300">
                <input
                  type="checkbox"
                  name="remember"
                  checked={form.remember}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-white/20 bg-slate-800 accent-pink-600"
                />
                Remember me
              </label>
             
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={busy}
              className="group relative inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-600 px-5 py-3 text-base font-semibold shadow-lg shadow-pink-600/30 transition hover:bg-pink-700 disabled:opacity-70"
            >
              {busy ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />
                </>
              )}
            </button>

            {/* Divider */}
            <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
              <div className="h-px flex-1 bg-white/10" />
              <span>or</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            {/* OAuth placeholder */}
            <button
              type="button"
              className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10"
              onClick={() => alert("Hook up Google OAuth here.")}
            >
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="h-5 w-5" />
              Continue with Google
            </button>
          </form>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-slate-400">
            Don’t have an account? {" "}
            <Link to="/register" className="font-medium text-pink-400 hover:text-pink-300 underline decoration-dotted">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
