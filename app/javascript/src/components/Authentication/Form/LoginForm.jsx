import React from "react";

const LoginForm = ({ handleSubmit, setEmail, setPassword }) => {
  return (
    <div>
      <div>Login</div>
      <form onSubmit={handleSubmit}>
        <input
          label="Email"
          type="email"
          placeholder="sam@example.com"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          label="Password"
          type="password"
          placeholder="********"
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
export default LoginForm;
