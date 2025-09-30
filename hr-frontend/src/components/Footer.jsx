function Footer() {
  return (
    <footer className="bg-black text-gray-400 py-8 px-6 mt-16 border-t border-gray-700">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        
        
        <h2 className="text-xl font-extrabold text-[orangered]">
          XYZ <span className="text-purple-500">Corporation</span>
        </h2>

        <div className="flex space-x-8">
          <a href="/" className="hover:text-pink-500 transition font-semibold">Home</a>
          <a href="/team" className="hover:text-pink-500 transition font-semibold">Team</a>
          <a href="/career" className="hover:text-pink-500 transition font-semibold">Career</a>
          <a href="/contact" className="hover:text-pink-500 transition font-semibold">Contact</a>
        </div>

     
        <div className="flex space-x-6 text-xl">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="mailto:contact@xyzcorp.com" className="hover:text-pink-500 transition">
            <i className="fas fa-envelope"></i>
          </a>
        </div>
      </div>

    
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} XYZ Corporation. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
