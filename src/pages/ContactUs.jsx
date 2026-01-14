import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

const ContactUs = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! Our team will contact you soon.");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-20 pb-20">
      <div className="w-11/12 mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black dark:text-white mb-4">Get in Touch</h1>
          <p className="text-gray-500">Have questions? We're here to help you 24/7.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center rounded-2xl text-2xl">
                <FaPhoneAlt />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Call Us</h3>
                <p className="text-gray-500">+880 1234-567890</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center gap-6">
              <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center rounded-2xl text-2xl">
                <FaEnvelope />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Email Support</h3>
                <p className="text-gray-500">support@contesthub.com</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 flex items-center gap-6">
              <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center rounded-2xl text-2xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <h3 className="font-bold dark:text-white">Visit Office</h3>
                <p className="text-gray-500">Uttara, Dhaka-1230</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text dark:text-gray-300">Your Name</span></label>
                  <input type="text" placeholder="John Doe" className="input input-bordered bg-gray-50 dark:bg-gray-800 rounded-xl focus:ring-2 ring-blue-500" required />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text dark:text-gray-300">Email Address</span></label>
                  <input type="email" placeholder="john@example.com" className="input input-bordered bg-gray-50 dark:bg-gray-800 rounded-xl" required />
                </div>
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text dark:text-gray-300">Subject</span></label>
                <input type="text" placeholder="I have a question about my contest" className="input input-bordered bg-gray-50 dark:bg-gray-800 rounded-xl" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text dark:text-gray-300">Message</span></label>
                <textarea className="textarea textarea-bordered bg-gray-50 dark:bg-gray-800 rounded-xl h-32" placeholder="Write your message here..."></textarea>
              </div>
              <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white w-full rounded-xl gap-3">
                <FaPaperPlane /> Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;