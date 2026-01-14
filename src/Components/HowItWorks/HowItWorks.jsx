const HowItWorks = () => {
  const steps = [
    { title: "Explore", desc: "Find a contest that matches your skill." },
    { title: "Register", desc: "Pay the entry fee and join the battle." },
    { title: "Submit", desc: "Upload your best work before the deadline." },
    { title: "Win", desc: "Get recognized and win amazing prizes!" },
  ];
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Start Your Winning Journey</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">{i+1}</span>
              <h3 className="text-xl font-bold mt-4 mb-2">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks