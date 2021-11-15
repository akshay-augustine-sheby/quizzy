import axios from "axios";

const show = quizId => axios.get(`/public/questions/${quizId}`);
const publicQuestionsApi = {
  show,
};
export default publicQuestionsApi;
