function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        
        <h2 className="text-lg font-semibold mb-4 md:mb-0">
          HR Management App
        </h2>

     
        <div className="flex space-x-6 mb-4 md:mb-0">
          <a href="/jobs" className="hover:text-white transition">Jobs</a>
          <a href="/apply" className="hover:text-white transition">Apply</a>
          <a href="/dashboard" className="hover:text-white transition">Dashboard</a>
        </div>

      
        <div className="flex space-x-4">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github text-xl hover:text-white"></i>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin text-xl hover:text-white"></i>
          </a>
          <a href="mailto:contact@hrapp.com">
            <i className="fas fa-envelope text-xl hover:text-white"></i>
          </a>
        </div>
      </div>

    
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} HR Management App. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
