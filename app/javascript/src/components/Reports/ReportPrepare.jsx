import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import HashLoader from "react-spinners/HashLoader";

import reportsApi from "../../apis/reports";

const ReportPrepare = ({ jobId }) => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const interv =
      status !== "complete" &&
      setInterval(function () {
        getExportJobStatus(jobId);
      }, 800);
    return () => clearInterval(interv);
  }, [status]);

  const getExportJobStatus = async jobId => {
    try {
      const response = await reportsApi.exportStatus(jobId);
      //console.log(response)
      setStatus(response.data.status);
    } catch (error) {
      logger.error(error);
    }
  };

  const handleDownload = () => {
    window.location.href = `/export_download.xlsx?id=${jobId}`;
  };

  if (status === "complete") {
    return (
      <div className="text-xl text-center align-text-middle mt-40 space-y-5">
        <div>Report is now ready for download.</div>
        <Button
          iconPosition="left"
          label="Download Report"
          size="default"
          style="primary"
          onClick={handleDownload}
          icon={Download}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-4 text-xl text-center align-text-middle align-middle justify-between mt-40">
      <div>
        <HashLoader
          color={"#9041c7"}
          loading={status !== "complete"}
          size={40}
        />
      </div>
      <div>Your report is being prepared for downloading</div>
    </div>
  );
};
export default ReportPrepare;
