import React from "react";

function CreateUserForm({ signUpUser }) {
  return (
    <div>
      <h2>Create User Form</h2>
      <div className="Form">
        <form onSubmit={(e) => signUpUser(e)}>
          <label htmlFor="email">Email</label>
          <input type="email" name="email" placeholder="Enter Email" />

          <label htmlFor="password">Password</label>
          <input type="password" name="password" placeholder="*****" />

          <button type="sumbit">Create User</button>
        </form>
      </div>
    </div>
  );
}

export default CreateUserForm;
