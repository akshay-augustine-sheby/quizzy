import axios from "axios";

const list = () => axios.get("/attempts");
const update = ({ attempt_id, payload }) =>
  axios.put(`/attempts/${attempt_id}`, payload);
const attemptsApi = {
  list,
  update,
};
export default attemptsApi;
