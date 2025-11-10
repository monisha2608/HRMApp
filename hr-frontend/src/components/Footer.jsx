function Footer() {
  return (
    <footer className="bg-gradient-to-t from-black via-gray-900 to-black text-gray-400 py-10 px-6 mt-16 border-t border-pink-600/20 shadow-inner shadow-pink-500/10">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        {/* Logo / Brand */}
        <h2 className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-pink-500 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent">
          XYZ <span className="text-white">Corporation</span>
        </h2>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-8 text-lg font-semibold">
          {["Home", "Team", "Career", "Contact"].map((label, i) => (
            <a
              key={i}
              href={`/${label.toLowerCase() === "home" ? "" : label.toLowerCase()}`}
              className="relative group transition"
            >
              <span className="group-hover:text-pink-400 transition-all duration-300">
                {label}
              </span>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex space-x-6 text-2xl">
          <a
            href="https://github.com/monisha2608/HRMApp"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-transform transform hover:scale-110"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/saurav-roy-b0a695296"
            target="_blank"
            rel="noreferrer"
            className="hover:text-pink-500 transition-transform transform hover:scale-110"
          >
            <i className="fab fa-linkedin"></i>
          </a>
          <a
            href="mailto:noreply.xyzhr@gmail.com"
            className="hover:text-pink-500 transition-transform transform hover:scale-110"
          >
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm text-gray-500 mt-8">
        © {new Date().getFullYear()}{" "}
        <span className="text-pink-500 font-semibold">XYZ Corporation</span>. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
