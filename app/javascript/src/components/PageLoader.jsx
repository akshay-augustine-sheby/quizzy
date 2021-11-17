import React from "react";

import { PageLoader as PageLoader1 } from "@bigbinary/neetoui/v2";

const PageLoader = () => {
  return (
    <div className="flex flex-row items-center justify-center w-screen h-screen">
      <PageLoader1 color="#9041c7" />
    </div>
  );
};

export default PageLoader;
