function Navbar() {
  const currentPath = window.location.pathname;

  const links = [
    { name: "Home", path: "/" },
    { name: "Team", path: "/team" },
    { name: "Career", path: "/jobs" },
    { name: "Contact Us", path: "/contact" }
  ];

  return (
    <nav className="fixed top-0 left-0 w-full bg-black text-white px-8 py-4 flex items-center justify-between z-50 shadow-lg">
      <h1 className="text-2xl font-extrabold text-[orangered]">
        XYZ <span className="text-purple-500">Corporation</span>
      </h1>

      <ul className="flex space-x-8">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.path}
              className={`text-lg font-semibold px-4 py-2 rounded-md transition duration-300 ${
                currentPath === link.path
                  ? "bg-pink-600 text-white"
                  : "text-gray-300 hover:bg-pink-500/20"
              }`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
