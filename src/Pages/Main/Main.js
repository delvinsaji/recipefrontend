import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main() {
  const [all_recipe, setAll_recipe] = useState();
  const [recipe1, setRecipe1] = useState();
  const { recipe } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://recipe1api.herokuapp.com/api/all_recipe")
      .then((Response) => {
        setAll_recipe(Response.data);
      })
      .catch((error) => {
        alert(error.data);
      });

    axios
      .get(`https://recipe1api.herokuapp.com/api/recipe/${recipe}`)
      .then((Response) => {
        setRecipe1(Response.data);
      })
      .catch((error) => {
        alert(error.data);
      });
  }, [recipe]);

  console.log(all_recipe);
  console.log(recipe1);
  return (
    <div className="recipe">
      <div className="list">
        <h3>Recipe List</h3>
        {all_recipe
          ? all_recipe.map((obj) => (
              <div>
                <p
                  onClick={() => {
                    navigate(`/${obj.name}`);
                    navigate.go(`/${obj.name}`);
                  }}
                >
                  {obj.name}
                </p>
              </div>
            ))
          : "null"}
        <p>+ Add Recipe</p>
      </div>
      <div className="desc">
        <div className="desc1">
          <h2>{recipe}</h2>
          <p className="e">Update Recipe</p>
        </div>

        <ul>
          {recipe1
            ? recipe1.ingredients.map((obj) => <li>{obj.ingredient}</li>)
            : "null"}
        </ul>
        <p>{recipe1 ? recipe1.prep : "null"}</p>
        <div className="reviews">
          <h4>Reviews</h4>
          {recipe1
            ? recipe1.reviews.map((obj) => (
                <div className="review">
                  <p>Rating - {obj.Rating}/5</p>
                  <p>{obj.desc}</p>
                </div>
              ))
            : "null"}
          <p className="e">+ Add Review</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
