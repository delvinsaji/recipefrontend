import React from "react";
import { useState } from "react";
import "./LoginSignup.css";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";

function LoginSignup() {
  const [but1, setBut1] = useState("active");
  const [but2, setBut2] = useState("deactive");
  const [current, setCurrent] = useState(<Login></Login>);
  return (
    <div className="ls">
      <div className="lsbuttons">
        <button
          className={but1}
          onClick={() => {
            setBut1("active");
            setBut2("deactive");
            setCurrent(<Login></Login>);
          }}
        >
          Login
        </button>
        <button
          className={but2}
          onClick={() => {
            setBut1("deactive");
            setBut2("active");
            setCurrent(
              <Signup val={setCurrent} but1={setBut1} but2={setBut2}></Signup>
            );
          }}
        >
          Sign Up
        </button>
      </div>
      {current}
    </div>
  );
}

export default LoginSignup;
