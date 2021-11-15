import axios from "axios";

const show = slug => axios.get(`/public/quizzes/${slug}`);
const publicQuizzesApi = {
  show,
};
export default publicQuizzesApi;
