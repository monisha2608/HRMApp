import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import { ClipboardList, AlertCircle, Loader2, CheckCircle2 } from "lucide-react";

export default function OnboardingPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setErr("");

    (async () => {
      try {
        const res = await api.get("/api/onboarding/plans", {
          params: { page: 1, size: 20 },
        });
        if (!active) return;
        setPlans(res.data?.items ?? res.data?.plans ?? []); // support either shape
      } catch (e) {
        console.error("Error loading onboarding plans:", e);
        if (!active) return;
        setErr(
          e?.response?.data ??
            `Failed to load onboarding plans (status ${e?.response?.status ?? "?"})`
        );
      } finally {
        if (active) setLoading(false);
      }
    })();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-16 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-4xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <ClipboardList className="h-7 w-7 text-pink-400" />
          <h1 className="text-3xl font-bold text-pink-500">Onboarding Plans</h1>
        </div>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          View onboarding progress for hired candidates. Each row shows total
          tasks, completed tasks, and overall progress.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto mt-8">
        {loading ? (
          <div className="flex items-center justify-center gap-3 text-slate-300">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading onboarding plans…</span>
          </div>
        ) : err ? (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 flex gap-3 text-rose-100">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Something went wrong</div>
              <div className="text-sm break-words">{String(err)}</div>
              <p className="mt-2 text-xs text-rose-200/80">
                Open DevTools → Network tab and check the{" "}
                <code>/api/onboarding/plans</code> request (status &amp; response)
                to see if it’s 401 unauthorized or another error.
              </p>
            </div>
          </div>
        ) : plans.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-4 text-xl font-semibold">No onboarding plans yet</h2>
            <p className="mt-2 text-slate-400 text-sm">
              Create plans from the HR console for hired candidates to see them
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {plans.map((p) => {
              const progress = p.progress ?? 0;
              const pctLabel = `${progress}%`;
              return (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <div className="text-lg font-semibold">
                        {p.candidateName ?? "Candidate"}
                      </div>
                      <div className="text-xs text-slate-400">
                        Plan started:{" "}
                        {p.startDate
                          ? new Date(p.startDate).toLocaleDateString()
                          : "—"}
                        {p.applicationId
                          ? ` • Application #${p.applicationId}`
                          : ""}
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="text-slate-300">
                        {p.completedTasks ?? 0} / {p.totalTasks ?? 0} tasks
                      </div>
                      {progress === 100 && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                          <CheckCircle2 className="h-3 w-3" />
                          Completed
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 h-2 w-full rounded-full bg-white/10 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 transition-all"
                      style={{ width: pctLabel }}
                    />
                  </div>
                  <div className="mt-1 text-right text-xs text-slate-400">
                    {pctLabel} complete
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
