import React from "react";

import { Link } from "react-router-dom";

const publicNavBar = () => {
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
        </div>
      </div>
    </nav>
  );
};
export default publicNavBar;
