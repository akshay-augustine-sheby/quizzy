import axios from "axios";

const update = ({ attempt_id, payload }) =>
  axios.put(`/attempts/${attempt_id}`, payload);
const attemptsApi = {
  update,
};
export default attemptsApi;
