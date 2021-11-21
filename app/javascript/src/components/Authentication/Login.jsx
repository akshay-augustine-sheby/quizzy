import React, { useState } from "react";

import authApi from "apis/auth";
import { setAuthHeaders } from "apis/axios";
import LoginForm from "components/Authentication/Form/LoginForm";
import Toastr from "components/Common/Toastr";
import { setToLocalStorage } from "helpers/storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await authApi.login({ login: { email, password } });
      //console.log(response)
      setToLocalStorage({
        authToken: response.data.authentication_token,
        authEmail: email,
        userId: response.data.id,
        userFirstName: response.data.first_name,
        userLastName: response.data.last_name,
      });
      setAuthHeaders();
      Toastr.success("User logged in successfully");
      setLoading(false);
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <LoginForm
        setEmail={setEmail}
        setPassword={setPassword}
        loading={loading}
        disabled={loading}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Login;
