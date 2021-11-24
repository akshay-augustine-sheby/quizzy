import axios from "axios";

const showQuizName = slug =>
  axios.get(`/public/quizzes/${slug}/show_quiz_name`);
const show = slug => axios.get(`/public/quizzes/${slug}`);

const publicQuizzesApi = {
  showQuizName,
  show,
};
export default publicQuizzesApi;
