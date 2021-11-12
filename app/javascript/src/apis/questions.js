import axios from "axios";

const show = quizId => axios.get(`/questions/${quizId}`);
const list = questionId => axios.get(`/questions/${questionId}`);
const create = payload => axios.post("/questions/", payload);
const destroy = questionId => axios.delete(`/questions/${questionId}`);
const update = ({ question_id, payload }) =>
  axios.put(`/questions/${question_id}`, payload);

const questionsApi = {
  show,
  list,
  create,
  destroy,
  update,
};
export default questionsApi;
