import React, { useCallback } from "react";
import LoginForm from "../components/LoginForm";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function Login({ setLoggedIn, setUserInformation }) {
  const loginUser = useCallback((e) => {
    e.preventDefault();

    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
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
      <h1>Login</h1>
      <LoginForm loginUser={loginUser} />
    </div>
  );
}

export default Login;
