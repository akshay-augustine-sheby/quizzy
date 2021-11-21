import React, { useEffect, useState } from "react";

import { either, isEmpty, isNil } from "ramda";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { registerIntercepts, setAuthHeaders } from "apis/axios";
import { initializeLogger } from "common/logger";
import Login from "components/Authentication/Login";
import PrivateRoute from "components/Common/PrivateRoute";

import ErrorBoundary from "./components/ErrorBoundary";
import PageLoader from "./components/PageLoader";
import LoginUser from "./components/Publish/LoginUser";
import QuestionCreate from "./components/Questions/CreateQuestion";
import EditQuestion from "./components/Questions/EditQuestion";
import Quizzes from "./components/Quizzes";
import CreateQuiz from "./components/Quizzes/CreateQuiz";
import EditQuiz from "./components/Quizzes/EditQuiz";
import ShowQuiz from "./components/Quizzes/ShowQuiz";
import Reports from "./components/Reports";
import { getFromLocalStorage } from "./helpers/storage";

const App = () => {
  const [loading, setLoading] = useState(true);
  const authToken = getFromLocalStorage("authToken");
  const isLoggedIn = !either(isNil, isEmpty)(authToken) && authToken !== "null";

  useEffect(() => {
    initializeLogger();
    registerIntercepts();
    setAuthHeaders(setLoading);
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/public/:slug" component={LoginUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/reports" component={Reports} />
        <Route exact path="/quizzes/create" component={CreateQuiz} />
        <Route exact path="/quizzes/:slug/edit" component={EditQuiz} />
        <Route exact path="/quizzes/:slug/show" component={ShowQuiz} />
        <Route
          exact
          path="/questions/:question_id/edit"
          component={EditQuestion}
        />

        <Route
          exact
          path="/quizzes/:slug/question/create"
          component={QuestionCreate}
        />
        <PrivateRoute
          exact
          path="/"
          redirectRoute="/login"
          condition={isLoggedIn}
          component={Quizzes}
        />
        <Route component={ErrorBoundary} />
      </Switch>
    </Router>
  );
};

export default App;
