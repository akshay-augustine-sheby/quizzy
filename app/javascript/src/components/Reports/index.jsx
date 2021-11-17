import React, { useEffect, useState } from "react";

import { Download } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui/v2";

import TableReports from "./TableReports";

import attemptsApi from "../../apis/attempts";
import Container from "../Container";
import PageLoader from "../PageLoader";

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [reportData, setReportData] = useState([]);
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
  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="w-screen h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Container>
      <div className="flex-col space-y-5 mt-10">
        <div className="flex justify-between">
          <div className="text-3xl font-bold ">Reports</div>
          <Button
            iconPosition="left"
            label="Download"
            size="default"
            style="primary"
            onClick={() => {}}
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
