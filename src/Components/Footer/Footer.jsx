import React from "react";
import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="w-11/12 mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo + Name */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src="https://i.ibb.co.com/Vchp0YVj/image-jpg-removebg-preview-1.png"
            alt="Logo"
            className="w-10 h-10"
          />
          <span className="text-xl font-bold">ContestHub</span>
        </Link>

        {/* Copyright */}
        <p className="text-gray-400 text-center md:text-left">
          © 2025 ContestHub. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-500 transition"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
