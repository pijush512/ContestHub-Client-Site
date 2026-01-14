import React from "react";

const FAQSection = () => {
  const faqs = [
    { 
      q: "Is there a registration fee for contests?", 
      a: "Yes, each contest has a specific entry fee. We use Stripe to ensure all your transactions are secure and encrypted." 
    },
    { 
      q: "How are winners selected?", 
      a: "Contest creators review all submitted tasks manually based on pre-defined criteria. The best quality work is then declared as the winner." 
    },
    { 
      q: "Can I participate in multiple contests?", 
      a: "Absolutely! There is no limit. You can join as many contests as you want as long as you meet the skill requirements." 
    },
    { 
      q: "How do I receive my prize money?", 
      a: "Once you win, your dashboard will reflect the victory. Our finance team will process your prize money through your preferred payout method." 
    }
  ];

  return (
    <section className="py-24 bg-white dark:bg-gray-950">
      <div className="max-w-4xl mx-auto w-11/12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            Got Questions? <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
              We Have Answers
            </span>
          </h2>
          <div className="h-1.5 w-20 bg-blue-600 mt-6 rounded-full mx-auto"></div>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="group collapse collapse-arrow bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2rem] transition-all duration-300 hover:shadow-lg hover:border-blue-200 dark:hover:border-blue-900"
            >
              <input type="radio" name="faq-accordion" defaultChecked={index === 0} /> 
              
              <div className="collapse-title text-xl font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors py-5 px-8">
                {faq.q}
              </div>
              
              <div className="collapse-content px-8 text-gray-600 dark:text-gray-400 font-medium"> 
                <p className="pb-4 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;