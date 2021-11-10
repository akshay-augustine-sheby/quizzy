import axios from "axios";

const show = id => axios.get(`/options/${id}`);

const optionsApi = {
  show,
};
export default optionsApi;
