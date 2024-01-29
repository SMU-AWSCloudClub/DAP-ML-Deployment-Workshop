import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  let links = [
    { name: "Home", path: "/" },
    { name: "Calculator", path: "/calculator" },
  ];

  let [open, setOpen] = useState(false);
  return (
    <div className="fixed top-0 bg-slate-800 shadow-md w-full">
      <div className="flex items-center justify-between h-16 px-4">
        <span className="text-white font-bold text-2xl cursor-pointer flex items-center font-[Poppins]">
          Budget Property Guru
        </span>
        <ul className="hidden md:flex items-center space-x-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link to={link.path} className="text-white hover:text-gray-300">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
