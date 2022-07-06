import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

// const emailReducer = (prevState, action) => {
//   if (action.type === "USER_INPUT") {
//     return { value: action.val, isValid: action.val.includes("@") };
//   }
//   if (action.type === "INPUT_BLUR") {
//     return { value: prevState.value, isValid: prevState.value.includes("@") };
//   }
//   return { value: "", isValid: false };
// };

// const passwordReducer = (prevState, action) => {
//   if (action.type === "PASS_INPUT") {
//     return { value: action.val, isValid: action.val.trim().length > 6 };
//   }
//   if (action.type === "PASS_BLUR") {
//     return {
//       value: prevState.value,
//       isValid: prevState.value.trim().length > 6,
//     };
//   }
//   return { value: "", isValid: true };
// };
const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  // const [emailState, emailDispatch] = useReducer(emailReducer, {
  //   value: "",
  //   isValid: null,
  // });

  // const [passwordState, passwordDispatch] = useReducer(passwordReducer, {
  //   value: "",
  //   isValid: null,
  // });
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking");
      setFormIsValid(
        enteredEmail.includes("@") && enteredPassword.trim().length > 6
      );
    }, 500);
    return () => {
      console.log("Cleanup Call");
      clearTimeout(identifier);
    };
  }, [enteredEmail, enteredPassword]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    // emailDispatch({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    // passwordDispatch({ type: "PASS_INPUT", val: event.target.value });

    setFormIsValid(
      enteredPassword.trim().length > 6 && enteredEmail.includes("@")
    );
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes("@"));
    // emailDispatch({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // passwordDispatch({ type: "PASS_BLUR" });
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };
  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
