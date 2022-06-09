import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import Login from "../Login/Login";

function Signup(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="login b">
      <div className="xx">
        <p>Username</p>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        ></input>
        <p>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Name"
        ></input>
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        ></input>
        <button
          className="logbut"
          onClick={() => {
            axios
              .post("http://127.0.0.1:8000/api/postuser/", {
                username: username,
                password: password,
                name: name,
              })
              .then((Response) => {
                props.val(<Login></Login>);
                props.but1("active");
                props.but2("deactive");
              });
          }}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}

export default Signup;
