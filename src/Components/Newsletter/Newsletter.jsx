const Newsletter = () => {
  return (
    <section className="py-20">
      <div className="w-11/12 mx-auto bg-gradient-to-br from-blue-600 to-indigo-800 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Never Miss a Contest</h2>
          <p className="text-blue-100 mb-10 max-w-2xl mx-auto text-lg">
            Subscribe to our newsletter and get updates on the latest high-paying contests directly in your inbox every week.
          </p>
          <form className="flex flex-col md:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="input input-lg flex-grow rounded-full px-8 focus:outline-none dark:bg-white dark:text-black border-none" 
              required
            />
            <button className="btn btn-lg bg-orange-500 hover:bg-orange-600 border-none text-white rounded-full px-10 font-bold">
              Subscribe Now
            </button>
          </form>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400/20 rounded-full -ml-20 -mb-20 blur-3xl"></div>
      </div>
    </section>
  );
};

export default Newsletter