import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pt-32 pb-24">
      <div className="max-w-4xl mx-auto w-11/12">
      
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            Privacy <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Policy</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-[0.2em] text-sm">
            Last updated: January 2026
          </p>
        </div>

        {/* Content Box */}
        <div className="bg-gray-50 dark:bg-gray-900 p-8 md:p-16 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="space-y-12">
            
            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-black text-blue-600 italic">01.</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter italic">
                  Information We Collect
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium pl-12">
                We collect information you provide directly to us when you create an account, 
                participate in a contest, or communicate with us. This includes your name, 
                email address, and payment information handled securely through Stripe.
              </p>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-black text-blue-600 italic">02.</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter italic">
                  How We Use Information
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium pl-12">
                We use the information we collect to operate and maintain our contests, 
                process payments, verify winners, and improve your overall experience on ContestHub. 
                Your data helps us personalize the platform for your specific interests.
              </p>
            </section>

            <section className="group">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-black text-blue-600 italic">03.</span>
                <h2 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter italic">
                  Data Security
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium pl-12">
                We implement industry-standard security measures, including SSL encryption, 
                to protect your personal data from unauthorized access, disclosure, or alteration. 
                Your security is our top priority.
              </p>
            </section>

            {/* Subtle Footer Note */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-500 italic">
                If you have any questions about this policy, please contact us at 
                <span className="text-blue-600 font-bold ml-1 italic">support@contesthub.com</span>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;