import "./App.css";
import Main from "./Pages/Main/Main";
import LoginSignup from "./Pages/Login-Signup/LoginSignup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <h1 style={{ textAlign: "center" }}>The Recipe App</h1>
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
