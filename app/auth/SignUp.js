import React from "react";
import styles from "./pagetwo.module.css";

function SignUpForm() {
  const [state, setState] = React.useState({ name: "", email: "", password: "" });

  const handleChange = evt => {
    const value = evt.target.value;
    setState({ ...state, [evt.target.name]: value });
  };

  const handleOnSubmit = evt => {
    evt.preventDefault();
    const { name, email, password } = state;
    alert(`You are sign up with name: ${name} email: ${email} and password: ${password}`);
    setState({ name: "", email: "", password: "" });
  };

  return (
    <div className={styles.signUpContainer}>
      <form onSubmit={handleOnSubmit} className={styles.form}>
        <h1 className={styles.title}>Create Account</h1>
        <div className={styles.socialContainer}>
          <a href="#" className={styles.social}><i className="fab fa-facebook-f" /></a>
          <a href="#" className={styles.social}><i className="fab fa-google-plus-g" /></a>
          <a href="#" className={styles.social}><i className="fab fa-linkedin-in" /></a>
        </div>
        <span className={styles.subtitle}>or use your email for registration</span>
        <input type="text" name="name" value={state.name} onChange={handleChange} placeholder="Name" className={styles.input} />
        <input type="email" name="email" value={state.email} onChange={handleChange} placeholder="Email" className={styles.input} />
        <input type="password" name="password" value={state.password} onChange={handleChange} placeholder="Password" className={styles.input} />
        <button className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;
