import "./App.css";
import Main from "./Pages/Main/Main";
import LoginSignup from "./Pages/Login-Signup/LoginSignup";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <Routes>
        <Route exact path="/:recipe" element={<Main></Main>}></Route>
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
