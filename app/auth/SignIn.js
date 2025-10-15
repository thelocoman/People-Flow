import React from "react";
import styles from "./pagetwo.module.css";

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
    <div className={styles.signInContainer}>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        <h1 className={styles.title}>Sign in</h1>
        <div className={styles.socialContainer}>
          <a href="#" className={styles.social}><i className="fab fa-facebook-f" /></a>
          <a href="#" className={styles.social}><i className="fab fa-google-plus-g" /></a>
          <a href="#" className={styles.social}><i className="fab fa-linkedin-in" /></a>
        </div>
        <span className={styles.subtitle}>or use your account</span>
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" className={styles.input} />
        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" className={styles.input} />
        <a href="#" className={styles.link}>Forgot your password?</a>
        <button className={styles.button}>Sign In</button>
      </form>
    </div>
  );
}

export default SignInForm;
