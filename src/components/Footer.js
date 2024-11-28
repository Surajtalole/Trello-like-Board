import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-indigo-600 text-white py-4 text-center fixed bottom-0 w-full">
      <p className="text-sm">
        Trello-like Board © {new Date().getFullYear()} | Developed by Suraj Talole
      </p>
    </footer>
  );
};

export default Footer;
