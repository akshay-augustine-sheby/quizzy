import axios from "axios";

const show = questionId => axios.get(`/options/${questionId}`);
const destroy = id => axios.delete(`/options/${id}`);

const optionsApi = {
  show,
  destroy,
};
export default optionsApi;
