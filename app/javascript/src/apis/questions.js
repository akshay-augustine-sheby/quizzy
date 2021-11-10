import axios from "axios";

const show = quizId => axios.get(`/questions/${quizId}`);
const create = payload => axios.post("/questions/", payload);
const destroy = questionId => axios.delete(`/questions/${questionId}`);

const questionsApi = {
  show,
  create,
  destroy,
};
export default questionsApi;
