function Contact() {
  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-pink-500 mb-10">Contact Us</h1>

      <p className="text-gray-400 text-lg max-w-2xl text-center mb-12">
        Have questions or want to get in touch? We’d love to hear from you. Reach
        out to us via email or use the contact form below.
      </p>

      <form className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Your Name</label>
          <input
            type="text"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Your Email</label>
          <input
            type="email"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-300 mb-2">Message</label>
          <textarea
            rows="5"
            className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Write your message..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-pink-600 hover:bg-pink-700 rounded-lg text-lg font-semibold transition"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 text-gray-400 text-center">
        <p>Email: <span className="text-pink-400">support@xyzcorp.com</span></p>
        <p>Phone: <span className="text-pink-400">+1 (555) 123-4567</span></p>
        <p>Address: <span className="text-pink-400">123 Tech Street, Toronto, Canada</span></p>
      </div>
    </div>
  );
}

export default Contact;
