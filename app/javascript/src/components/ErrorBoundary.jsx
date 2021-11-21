import React from "react";

import { Warning } from "@bigbinary/neeto-icons";

import Container from "./Container";

const ErrorBoundary = () => {
  return (
    <Container>
      <div className="flex flex-col justify-center items-center place-items-center align-middle space-y-10 mt-10">
        <div className="text-red-500">
          <Warning size={96} />
        </div>
        <div className="text-3xl font-bold text-center">
          Something went wrong
        </div>
      </div>
    </Container>
  );
};
export default ErrorBoundary;
