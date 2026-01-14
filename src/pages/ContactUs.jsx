import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Our team will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 pt-32 pb-24">
      <div className="w-11/12 max-w-7xl mx-auto">

        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter leading-tight">
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Touch</span>
          </h1>
          <div className="h-1.5 w-24 bg-blue-600 mt-6 rounded-full mx-auto"></div>
          <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto">
            Have questions or need support? Our team is here to help you 24/7.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">


          <div className="space-y-6">
            {[
              { icon: <FaPhoneAlt />, label: "Call Us", val: "+880 1234-567890", color: "text-blue-600", bg: "bg-blue-50 dark:bg-blue-900/20" },
              { icon: <FaEnvelope />, label: "Email Support", val: "support@contesthub.com", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-900/20" },
              { icon: <FaMapMarkerAlt />, label: "Visit Office", val: "Uttara, Dhaka-1230", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-900/20" }
            ].map((info, i) => (
              <div key={i} className="group bg-gray-50 dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex items-center gap-6">
                <div className={`w-16 h-16 ${info.bg} ${info.color} flex items-center justify-center rounded-2xl text-2xl group-hover:scale-110 transition-transform`}>
                  {info.icon}
                </div>
                <div>
                  <h3 className="text-xs uppercase tracking-widest font-black text-gray-400 mb-1">{info.label}</h3>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{info.val}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 relative group">

            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-500 rounded-[3rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>

            <div className="relative bg-white dark:bg-gray-900 p-10 md:p-14 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-2xl">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Your Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 focus:ring-2 ring-blue-500 dark:text-white outline-none" required />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 focus:ring-2 ring-blue-500 dark:text-white outline-none" required />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Subject</label>
                  <input type="text" placeholder="How can we help you?" className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 focus:ring-2 ring-blue-500 dark:text-white outline-none" required />
                </div>

                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-gray-500 ml-1">Message</label>
                  <textarea className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl p-4 h-40 focus:ring-2 ring-blue-500 dark:text-white outline-none resize-none" placeholder="Describe your issue or question..."></textarea>
                </div>

                <div className="md:col-span-2 pt-4">
                  <button className="group bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest py-5 px-10 rounded-2xl w-full md:w-auto transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20">
                    <FaPaperPlane className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;