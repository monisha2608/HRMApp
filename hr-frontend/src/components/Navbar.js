import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <h1 className="font-bold text-lg">HR App</h1>
      <div>
        <Link to="/jobs" className="px-2">Jobs</Link>
        <Link to="/apply" className="px-2">Apply</Link>
        <Link to="/dashboard" className="px-2">Dashboard</Link>
      </div>
    </nav>
  );
}

export default Navbar;
