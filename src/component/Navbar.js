import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./form/Authprovider";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-black">
            Payment
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
            {!isLoggedIn ? (
              <Link
                to="/login"
                className="ml-4 px-3 py-2 text-sm font-medium text-black rounded hover:bg-gray-100"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="ml-4 px-3 py-2 text-sm font-medium text-black rounded hover:bg-gray-100"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
