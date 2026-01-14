import React from "react";
import { FaFacebookF, FaLinkedinIn, FaGithub, FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-800 pb-10">
          
          {/* 1. Brand Identity */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src="https://i.ibb.co.com/Vchp0YVj/image-jpg-removebg-preview-1.png" 
                alt="Logo" 
                className="w-10 h-10" 
              />
              <span className="text-2xl font-black tracking-tighter text-blue-500">ContestHub</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              The world’s leading platform for creative competitions. Showcase your skills, compete with the best, and win amazing rewards.
            </p>
          </div>

          {/* 2. Quick Navigation */}
          <div className="md:text-center">
            <h3 className="text-lg font-bold mb-5 text-white">Quick Links</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li><Link to="/allContests" className="hover:text-blue-400 transition">Browse Contests</Link></li>
              <li><Link to="/leaderboard" className="hover:text-blue-400 transition">Hall of Fame</Link></li>
              <li><Link to="/about" className="hover:text-blue-400 transition">Our Story</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* 3. Contact Info & Socials */}
          <div className="md:ml-auto space-y-4">
            <h3 className="text-lg font-bold mb-5 text-white">Get in Touch</h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-blue-500" />
                <span>support@contesthub.com</span>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-blue-500" />
                <span>+880 1234-567890</span>
              </div>
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-blue-500 mt-1" />
                <span>Uttara, Dhaka, Bangladesh</span>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a href="https://www.facebook.com/groups/phweb12/posts/1147959647147835" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-600 transition duration-300">
                <FaFacebookF size={16} />
              </a>
              <a href="https://www.linkedin.com/in/pijushsarkeralways/" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-blue-700 transition duration-300">
                <FaLinkedinIn size={16} />
              </a>
              <a href="https://github.com/pijush512" className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition duration-300">
                <FaGithub size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center text-[11px] uppercase tracking-widest text-gray-500 gap-4">
          <p>© {currentYear} ContestHub Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-white transition">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-white transition">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;