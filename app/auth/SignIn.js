import React from "react";
import styles from "./auth.module.css";

function SignInForm() {
  const [state, setState] = React.useState({ email: "", password: "" });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    const { email, password } = state;
    alert(`You are login with email: ${email} and password: ${password}`);
    setState({ email: "", password: "" });
  };

  return (
    <div className={`${styles.signInContainer} ${styles.formContainer}`}>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        <h1 className={styles.title}>Sign in</h1>
        <div className={styles.socialContainer}>
        </div>
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" className={styles.input} />
        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" className={styles.input} />
        <a href="#" className={styles.link}>Forgot your password?</a>
        <button className={styles.button}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
