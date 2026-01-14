const FAQSection = () => {
  const faqs = [
    { q: "Is there a registration fee for contests?", a: "Yes, each contest has a specific entry fee which you can pay securely via Stripe." },
    { q: "How are winners selected?", a: "Contest creators review all submitted tasks and declare a winner based on the quality of work." },
    { q: "Can I participate in multiple contests?", a: "Absolutely! You can join as many contests as you want according to your skills." },
    { q: "How do I receive my prize money?", a: "Once you are declared a winner, your prize info is updated in your dashboard, and our team will contact you for the payout." }
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto w-11/12">
        <h2 className="text-4xl font-black text-center mb-12 dark:text-white">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="collapse collapse-arrow bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl">
              <input type="radio" name="my-accordion-2" defaultChecked={index === 0} /> 
              <div className="collapse-title text-xl font-semibold dark:text-white">
                {faq.q}
              </div>
              <div className="collapse-content text-gray-600 dark:text-gray-400"> 
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection