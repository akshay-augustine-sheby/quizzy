import axios from "axios";

const show = questionId => axios.get(`/options/${questionId}`);

const optionsApi = {
  show,
};
export default optionsApi;
