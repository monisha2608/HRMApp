import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black text-white shadow-md">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-pink-500">
        XYZ<span className="text-purple-500">Corp</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center space-x-8 text-lg font-semibold">
        <Link to="/" className="hover:text-pink-400 transition">Home</Link>
        <Link to="/team" className="hover:text-pink-400 transition">Team</Link>
        <Link to="/jobs" className="hover:text-pink-400 transition">Careers</Link>
        <Link to="/contact" className="hover:text-pink-400 transition">Contact Us</Link>

        {/* Show candidate dashboard when logged in */}
        {user?.roles?.includes("Candidate") && (
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg text-white transition"
          >
            Candidate Dashboard
          </Link>
        )}

        {/* Auth Buttons */}
        {user ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 bg-pink-600 hover:bg-pink-700 rounded-lg transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
