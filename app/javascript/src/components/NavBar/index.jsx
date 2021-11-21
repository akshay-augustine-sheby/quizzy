import React from "react";

import { Link } from "react-router-dom";
import { resetAuthTokens } from "src/apis/axios";

import authApi from "apis/auth";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";

const NavBar = () => {
  const userFirstName = getFromLocalStorage("authUserFirstName");
  const userLastName = getFromLocalStorage("authUserLastName");
  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        authEmail: null,
        userId: null,
        userFirstName: null,
        userLastName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };
  const handleReport = () => {
    window.location.href = "/reports";
  };

  return (
    <nav className="bg-white shadow">
      <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <Link
                to="/"
                className="inline-flex items-center px-1 pt-1 mr-3
                          font-bold text-4xl leading-5"
              >
                Quizzy
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-end gap-x-4">
            <a
              onClick={handleReport}
              className="inline-flex items-center px-1 pt-1 text-sm
              leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
            >
              Reports
            </a>
            <span
              className="inline-flex items-center px-2 pt-1 text-sm
              font-regular leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent focus:outline-none
              focus:text-bb-gray-700"
            >
              {`${userFirstName} ${userLastName}`}
            </span>

            <a
              onClick={handleLogout}
              className="inline-flex items-center px-1 pt-1 text-sm
              font-semibold leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
            >
              LogOut
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
