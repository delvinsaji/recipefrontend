import React from "react";
import { useParams } from "react-router-dom";
import "./Main.css";

function Main() {
  const { recipe } = useParams();
  return (
    <div className="recipe">
      <div className="list"></div>
      <div className="desc"></div>
    </div>
  );
}

export default Main;
