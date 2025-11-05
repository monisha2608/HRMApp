import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Homepage from "./pages/Homepage";
import Team from "./pages/Team";
import Contact from "./pages/Contact";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Apply from "./pages/Apply";
import Login from "./pages/Login";
import CandidateDashboard from "./pages/CandidateDashboard";
import { AuthProvider } from "./context/AuthContext";
import { ApplicationProvider } from "./context/ApplicationContext";
import Register from "./pages/Register";

import { ToastProvider } from "./context/ToastContext";

function App() {
  return (
    <ToastProvider>
    <AuthProvider>
      <ApplicationProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/dashboard" element={<CandidateDashboard />} />
            <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> 
          </Routes>
          <Footer />
        </BrowserRouter>
      </ApplicationProvider>
    </AuthProvider>
    </ToastProvider>
  );
}

export default App;
