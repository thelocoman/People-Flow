'use client'

import { useState } from "react";
import styles from "./auth.module.css";
import SignInForm from "./SignIn";
import SignUpForm from "./SignUp";
import HexagonCanvas from "./HexagonCanvas";

export default function App() {
  const [type, setType] = useState("signIn");

  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      console.log(type)
      return;
    }
  };

  const containerClass = `${styles.container} ${
    type === "signUp" ? styles.rightPanelActive : ""
  }`;

  return (
    <div className={styles.app}>
        <h1 className={styles.info}>This is beta version of the website. Some of the website's functionality might be disabled for security reasons!</h1>
      <HexagonCanvas />
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div
              className={`${styles.overlayPanel} ${styles.overlayLeft}`}
            >
              <h1 className={styles.title}>Hello, Friend!</h1>
              <p className={styles.subtitle}>
                Enter your personal details and start journey with us
              </p>
              <button
                className={`${styles.button} ${styles.ghost}`}
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
                Sign In
              </button>
            </div>
            <div
              className={`${styles.overlayPanel} ${styles.overlayRight}`}
            > 
              <h1 className={styles.title}>Welcome Back!</h1>
              <p className={styles.subtitle}>
                To keep connected with us please login with your personal info
              </p>
              <button
                className={`${styles.button} ${styles.ghost}`}
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}