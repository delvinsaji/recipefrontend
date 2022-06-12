import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login a">
      <p>Username</p>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        placeholder="username"
      ></input>
      <p>Password</p>
      <input
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        placeholder="password"
      ></input>
      <input
        className="logbut"
        onClick={() => {
          axios
            .post("https://recipe1api.herokuapp.com/api/token/", {
              username: username,
              password: password,
            })
            .then((Response) => {
              navigate("/r", {
                state: {
                  username: username,
                },
              });
            })
            .catch((error) => {
              alert(error);
            });
        }}
        type="submit"
        value="Login"
      ></input>
    </div>
  );
}

export default Login;
