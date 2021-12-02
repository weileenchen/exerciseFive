import React from "react";

function LoginForm({ loginUser }) {
  return (
    <div>
      <h2>Login Form</h2>
      <div className="Form">
        <form onSubmit={(e) => loginUser(e)}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="*****" />

          <button type="sumbit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
