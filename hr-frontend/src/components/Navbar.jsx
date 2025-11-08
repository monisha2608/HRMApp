import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-black text-white shadow-md border-b border-gray-800">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-pink-500 hover:scale-105 transition-transform">
        XYZ<span className="text-purple-500">Corp</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center space-x-8 text-lg font-semibold">
        {[
          { to: "/", label: "Home" },
          { to: "/team", label: "Team" },
          { to: "/jobs", label: "Careers" },
          { to: "/contact", label: "Contact Us" },
        ].map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`relative group transition ${
              isActive(link.to)
                ? "text-pink-500 after:w-full"
                : "text-gray-300 hover:text-pink-400"
            }`}
          >
            <span>{link.label}</span>
            <span
              className={`absolute left-0 -bottom-1 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300 ${
                isActive(link.to)
                  ? "w-full"
                  : "w-0 group-hover:w-full"
              }`}
            ></span>
          </Link>
        ))}

        {/* Candidate Dashboard */}
        {user?.roles?.includes("Candidate") && (
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg font-medium transition-transform transform hover:scale-105 shadow-md ${
              isActive("/dashboard")
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-pink-500/40"
                : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white shadow-pink-500/20"
            }`}
          >
            Dashboard
          </Link>
        )}

        {/* Auth Buttons */}
        {user ? (
          <button
            onClick={logout}
            className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-transform transform hover:scale-105"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg transition-transform transform hover:scale-105 ${
                isActive("/login")
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-500/40"
                  : "bg-gradient-to-r from-purple-600 to-fuchsia-600 hover:from-fuchsia-600 hover:to-purple-600 text-white shadow-md shadow-purple-500/20"
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className={`px-4 py-2 rounded-lg transition-transform transform hover:scale-105 ${
                isActive("/register")
                  ? "bg-pink-600 text-white shadow-lg shadow-pink-500/40"
                  : "bg-gradient-to-r from-pink-600 to-purple-600 hover:from-purple-600 hover:to-pink-600 text-white shadow-md shadow-pink-500/20"
              }`}
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
