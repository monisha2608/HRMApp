import { NavLink } from "react-router-dom";

function Navbar() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Career", path: "/career" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white px-8 py-4 flex items-center justify-between z-50 shadow-lg">
      <h1 className="text-2xl font-extrabold text-[orangered]">
        XYZ <span className="text-purple-500">Corporation</span>
      </h1>

      <ul className="flex space-x-8">
        {links.map((link, index) => (
          <li key={index} className="relative group">
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `text-lg font-semibold px-4 py-2 rounded-md transition duration-300 ${
                  isActive ? "bg-pink-600 text-black" : "text-gray-300"
                }`
              }
            >
              {link.name}
            </NavLink>
            <span className="absolute inset-0 rounded-md bg-blue-500 opacity-0 group-hover:opacity-20 transition-all duration-300"></span>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
