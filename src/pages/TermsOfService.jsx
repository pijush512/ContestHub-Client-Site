import React from "react";

const TermsOfService = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto w-11/12">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            Terms of <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Service</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">
            Effective Date: January 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-16 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="space-y-12">
            
            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-black text-blue-600 italic">01.</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter italic">
                  Acceptance of Terms
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium pl-12">
                By accessing or using ContestHub, you agree to be bound by these Terms of Service and all applicable laws. If you do not agree with any part of these terms, you must not use our platform or services.
              </p>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-black text-blue-600 italic">02.</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter italic">
                  Contest Participation
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium pl-12">
                Participants must provide accurate information and follow specific contest rules provided by creators. Any form of fraudulent activity, plagiarism, or harassment will lead to immediate disqualification and account suspension.
              </p>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-black text-blue-600 italic">03.</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter italic">
                  Payments & Refunds
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium pl-12">
                All contest entry fees are processed securely via Stripe. Please note that refunds are only issued in the specific event of a contest cancellation by the creator. Users are responsible for any transaction fees associated with their region.
              </p>
            </section>

            {/* Bottom Accent */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-gray-500 italic">
                Questions? Email us at <span className="text-blue-600 font-bold italic">legal@contesthub.com</span>
              </p>
              <button className="px-6 py-2 bg-blue-600/10 text-blue-600 text-xs font-black uppercase tracking-widest rounded-full hover:bg-blue-600 hover:text-white transition-all">
                Download PDF
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;