import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
 

  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-black">
            Freelancer
          </Link>
          <div>
            <Link
              to="/paymentForm"
              className="ml-4 px-3 py-2 text-sm font-medium text-black rounded hover:bg-gray-100"
            >
              Payment Form
            </Link>
            <Link
              to="/Paymentdata"
              className="ml-4 px-3 py-2 text-sm font-medium text-black rounded hover:bg-gray-100"
            >
              Payment Data
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
