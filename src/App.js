import "./App.css";
import Main from "./Pages/Main/Main";
import LoginSignup from "./Pages/Login-Signup/LoginSignup";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const navigate = useNavigate();
  const [all_recipe1, setAll_recipe1] = useState();
  return (
    <div className="main">
      <div className="header">
        <h1 className="headermain" style={{ textAlign: "center" }}>
          The Recipe App
        </h1>
        <div className="header1">
          <button
            onClick={() => {
              axios
                .get("https://recipe1api.herokuapp.com/api/all_recipe")
                .then((Response) => {
                  setAll_recipe1(Response.data);
                })
                .catch((error) => {
                  alert(error.data);
                });
              navigate("/authentication", {
                state: {
                  rec: all_recipe1[0].name,
                },
              });
            }}
          >
            Login/Signup
          </button>
          <button
            onClick={() => {
              axios
                .get("https://recipe1api.herokuapp.com/api/all_recipe")
                .then((Response) => {
                  setAll_recipe1(Response.data);
                })
                .catch((error) => {
                  alert(error.data);
                });
              navigate(`/${all_recipe1[0].name}`);
            }}
          >
            Recipes
          </button>
        </div>
      </div>
      <Routes>
        <Route path="/:recipe" element={<Main></Main>}></Route>
        <Route
          exact
          path="/authentication"
          element={<LoginSignup></LoginSignup>}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
