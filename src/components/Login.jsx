import React, { useState } from "react";
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

const provider = new GoogleAuthProvider();

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // You can redirect or show success here
    } catch (err) {
      setError(err.message);
    }
  };

  const loginWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // You can redirect or show success here
        // setLoggedIn(true);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="auth-container" >
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </label>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button type="submit" className="auth-btn">
          Sign In
        </button>
      </form>
      <hr />
      <button onClick={loginWithGoogle} className="google-btn">
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
