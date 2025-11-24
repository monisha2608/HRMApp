import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function OnboardingNew() {
  const nav = useNavigate();
  const [candidateName, setCandidateName] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const [startDate, setStartDate] = useState(() => new Date().toISOString().slice(0,10));
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const body = {
        candidateName: candidateName.trim(),
        applicationId: applicationId ? parseInt(applicationId) : null,
        startDate: startDate ? new Date(startDate).toISOString() : null
      };
      const res = await api.post("/api/onboarding/plans", body);
      const id = res.data?.id ?? res.data?.Id;
      nav(`/onboarding/${id}`);
    } catch (ex) {
      setErr("Failed to create plan");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <h1 className="text-3xl font-bold text-pink-500">New Onboarding Plan</h1>
      <form onSubmit={submit} className="mt-6 grid gap-4 max-w-lg">
        {err && <div className="text-rose-400">{err}</div>}
        <label>
          <div className="mb-1">Candidate Name</div>
          <input className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                 value={candidateName} onChange={(e)=>setCandidateName(e.target.value)} required />
        </label>
        <label>
          <div className="mb-1">Linked Application ID (optional)</div>
          <input className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                 value={applicationId} onChange={(e)=>setApplicationId(e.target.value)} />
        </label>
        <label>
          <div className="mb-1">Start Date</div>
          <input type="date" className="w-full bg-gray-900 border border-gray-800 rounded-lg px-3 py-2"
                 value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
        </label>
        <button className="mt-2 px-5 py-2 rounded-lg bg-purple-600 hover:bg-purple-700">Create</button>
      </form>
    </div>
  );
}
