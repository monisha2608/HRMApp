import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function OnboardingPlan() {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  // new task inputs
  const [name, setName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await api.get(`/api/onboarding/plans/${id}`);
    setPlan(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [id]);

  const addTask = async (e) => {
    e.preventDefault();
    await api.post(`/api/onboarding/plans/${id}/tasks`, {
      name: name.trim(),
      assignedTo: assignedTo.trim() || null,
      dueDate: dueDate ? new Date(dueDate).toISOString() : null
    });
    setName(""); setAssignedTo(""); setDueDate("");
    await load();
  };

  const toggle = async (task) => {
    await api.patch(`/api/onboarding/tasks/${task.id}`, { isCompleted: !task.isCompleted });
    await load();
  };

  const removeTask = async (task) => {
    await api.delete(`/api/onboarding/tasks/${task.id}`);
    await load();
  };

  if (loading) return <div className="min-h-screen bg-black text-white p-6">Loading…</div>;
  if (!plan) return <div className="min-h-screen bg-black text-white p-6">Not found</div>;

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-pink-500">{plan.candidateName}</h1>
          <div className="text-sm text-slate-400">Started {new Date(plan.startDate).toLocaleDateString()}</div>
        </div>
        <div className="w-64">
          <div className="flex justify-between text-sm text-slate-300 mb-1">
            <span>Progress</span>
            <span>{plan.progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div className="h-2 bg-pink-600" style={{ width: `${plan.progress}%` }} />
          </div>
        </div>
      </div>

      {/* Add Task */}
      <form onSubmit={addTask} className="mt-8 grid md:grid-cols-[1fr_220px_180px_auto] gap-3 items-end">
        <label className="block">
          <div className="mb-1 text-slate-300">Task name</div>
          <input className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                 value={name} onChange={(e)=>setName(e.target.value)} required />
        </label>
        <label className="block">
          <div className="mb-1 text-slate-300">Assigned to</div>
          <input className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                 value={assignedTo} onChange={(e)=>setAssignedTo(e.target.value)} />
        </label>
        <label className="block">
          <div className="mb-1 text-slate-300">Due date</div>
          <input type="date" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                 value={dueDate} onChange={(e)=>setDueDate(e.target.value)} />
        </label>
        <button className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700">Add</button>
      </form>

      {/* Tasks Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full text-left">
          <thead>
            <tr className="text-slate-300 text-sm border-b border-white/10">
              <th className="py-2 pr-3">Task</th>
              <th className="py-2 px-3">Assigned to</th>
              <th className="py-2 px-3">Due date</th>
              <th className="py-2 px-3">Completed</th>
              <th className="py-2 pl-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plan.tasks.map(t => (
              <tr key={t.id} className="border-b border-white/5">
                <td className="py-3 pr-3">{t.name}</td>
                <td className="py-3 px-3 text-slate-300">{t.assignedTo ?? "—"}</td>
                <td className="py-3 px-3 text-slate-300">{t.dueDate ? new Date(t.dueDate).toLocaleDateString() : "—"}</td>
                <td className="py-3 px-3">
                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-5 w-5 accent-pink-600"
                      checked={t.isCompleted}
                      onChange={() => toggle(t)}
                    />
                    <span className="text-slate-300 text-sm">{t.isCompleted ? "Yes" : "No"}</span>
                  </label>
                </td>
                <td className="py-3 pl-3 text-right">
                  <button
                    onClick={() => removeTask(t)}
                    className="px-3 py-1 rounded bg-rose-600 hover:bg-rose-700 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {plan.tasks.length === 0 && (
              <tr><td colSpan={5} className="py-6 text-slate-400 text-center">No tasks yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
