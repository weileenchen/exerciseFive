import React, { useCallback } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import CreateUserForm from "../components/CreateUserForm";

function CreateUser({ setLoggedIn, setUserInformation }) {
  const signUpUser = useCallback((e) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    console.log({ email, password });
    const auth = getAuth();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setLoggedIn(true);
        setUserInformation({
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          accessToke: user.accessToken,
        });
        console.log({ user });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ error });
      });
  }, []);

  return (
    <div className="PageWrapper">
      <h1>Create User</h1>
      <CreateUserForm signUpUser={signUpUser} />
    </div>
  );
}

export default CreateUser;
