import { useEffect, useState } from "react";
import api from "../services/api";
import { motion } from "framer-motion";
import {
  ClipboardList,
  AlertCircle,
  Loader2,
  CheckCircle2,
} from "lucide-react";

export default function OnboardingPage() {
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    setErr("");

    (async () => {
      try {
        // 🔑 NEW endpoint – candidate specific
        const res = await api.get("/api/candidate/onboarding/my");
        if (!active) return;
        setPlan(res.data ?? null);
      } catch (e) {
        console.error("Error loading onboarding plan:", e);
        if (!active) return;
        const status = e?.response?.status;
        if (status === 401) {
          setErr("You must be logged in as a candidate to view onboarding.");
        } else {
          setErr(`Failed to load onboarding plan (status ${status ?? "?"})`);
        }
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
        className="max-w-3xl mx-auto"
      >
        <div className="flex items-center gap-3">
          <ClipboardList className="h-7 w-7 text-pink-400" />
          <h1 className="text-3xl font-bold text-pink-500">Onboarding</h1>
        </div>
        <p className="mt-2 text-slate-300 text-sm md:text-base">
          Tasks help you complete paperwork, setup, and orientation once you’ve
          been hired.
        </p>
      </motion.div>

      {/* Content */}
      <div className="max-w-3xl mx-auto mt-8">
        {loading ? (
          <div className="flex items-center justify-center gap-3 text-slate-300">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span>Loading your onboarding plan…</span>
          </div>
        ) : err ? (
          <div className="rounded-2xl border border-rose-500/40 bg-rose-500/10 p-6 flex gap-3 text-rose-100">
            <AlertCircle className="h-5 w-5 mt-0.5" />
            <div>
              <div className="font-semibold mb-1">Something went wrong</div>
              <div className="text-sm break-words">{err}</div>
            </div>
          </div>
        ) : !plan ? (
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-8 text-center">
            <ClipboardList className="mx-auto h-10 w-10 text-slate-400" />
            <h2 className="mt-4 text-xl font-semibold">
              No onboarding plan yet
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              Once HR marks your application as <span className="font-semibold">Hired</span> and
              creates an onboarding plan for you, it will appear here.
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 space-y-4"
          >
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-lg font-semibold">
                  {plan.candidateName}
                </div>
                <div className="text-xs text-slate-400">
                  Plan started:{" "}
                  {plan.startDate
                    ? new Date(plan.startDate).toLocaleDateString()
                    : "—"}
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="text-slate-300">
                  {plan.tasks?.filter((t) => t.isCompleted).length ?? 0} /{" "}
                  {plan.tasks?.length ?? 0} tasks
                </div>
                {plan.progress === 100 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" />
                    Completed
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-2 h-2 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-emerald-400 transition-all"
                style={{ width: `${plan.progress ?? 0}%` }}
              />
            </div>
            <div className="mt-1 text-right text-xs text-slate-400">
              {plan.progress ?? 0}% complete
            </div>

            {/* Tasks */}
            <div className="mt-4 space-y-2">
              {plan.tasks?.length ? (
                plan.tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm"
                  >
                    <div>
                      <div
                        className={`font-medium ${
                          t.isCompleted ? "line-through text-slate-400" : ""
                        }`}
                      >
                        {t.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {t.assignedTo && <>Owner: {t.assignedTo} · </>}
                        {t.dueDate
                          ? `Due: ${new Date(t.dueDate).toLocaleDateString()}`
                          : "No due date"}
                      </div>
                    </div>
                    {t.isCompleted && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-2 py-1 text-xs text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        Done
                      </span>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-xs text-slate-400">
                  HR has created a plan but hasn’t added tasks yet.
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
