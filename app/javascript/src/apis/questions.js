import axios from "axios";

const show = quizId => axios.get(`/questions/${quizId}`);
const create = payload => axios.post("/questions/", payload);

const questionsApi = {
  show,
  create,
};
export default questionsApi;
