import React from "react";

import { Input, Button } from "@bigbinary/neetoui/v2";

const LoginForm = ({ handleSubmit, setEmail, setPassword }) => {
  return (
    <div>
      <div className="text-5xl font-bold border-b-2 px-12">Quizzy</div>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit} className="space-y-4 py-40">
          <div className="text-2xl font-bold">Login</div>
          <Input
            label="Email"
            placeholder="sam@example.com"
            required
            size="small"
            type="email"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            label="Password"
            placeholder="********"
            required
            size="small"
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button label="Submit" size="default" style="primary" type="submit" />
        </form>
      </div>
    </div>
  );
};
export default LoginForm;
