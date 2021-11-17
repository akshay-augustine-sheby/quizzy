import React from "react";

import { Warning } from "@bigbinary/neeto-icons";

import PublicNavBar from "../NavBar/PublicNavBar";

const ErrorPage = () => {
  return (
    <div>
      <PublicNavBar />
      <div className="flex flex-col justify-center items-center place-items-center align-middle space-y-10 mt-10">
        <div className="text-red-500">
          <Warning size={96} />
        </div>
        <div className="text-3xl font-bold text-center">Invalid quiz link!</div>
        <div className="text-3xl font-bold text-center">
          Please use a valid quiz link
        </div>
      </div>
    </div>
  );
};
export default ErrorPage;
