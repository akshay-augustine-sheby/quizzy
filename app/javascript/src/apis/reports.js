import axios from "axios";

const exportReport = () => axios.get("/export");
const exportStatus = jobId => axios.get(`/export_status?job_id=${jobId}`);
const reportsApi = {
  exportReport,
  exportStatus,
};
export default reportsApi;
