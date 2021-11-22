import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";
import { isNil, isEmpty, either } from "ramda";

import ReportPrepare from "./ReportPrepare";
import TableReports from "./TableReports";

import attemptsApi from "../../apis/attempts";
import reportsApi from "../../apis/reports";
import Container from "../Container";
import PageLoader from "../PageLoader";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
  const [jobId, setJobId] = useState("");
  const fetchReports = async () => {
    try {
      const response = await attemptsApi.list();
      //console.log(response)
      setReportData(response.data.data);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };
  const handleExport = async () => {
    try {
      setLoading(true);
      const response = await reportsApi.exportReport();
      //console.log(response)
      setJobId(response.data.jid);
    } catch (error) {
      logger.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  } else if (either(isNil, isEmpty)(reportData)) {
    return (
      <Container>
        <div className="text-xl text-center align-text-middle mt-40">
          <div>No quiz reports are available now.</div>
        </div>
      </Container>
    );
  } else if (jobId !== "") {
    return (
      <Container>
        <ReportPrepare jobId={jobId} />
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex-col space-y-5 mt-10 mb-12">
        <div className="flex justify-between">
          <div className="text-3xl font-bold ">Reports</div>
          <Button
            iconPosition="left"
            label="Download"
            size="default"
            style="primary"
            onClick={handleExport}
            icon={Download}
          />
        </div>
        <div className="">
          <TableReports reportData={reportData} />
        </div>
      </div>
    </Container>
  );
};
export default Reports;
