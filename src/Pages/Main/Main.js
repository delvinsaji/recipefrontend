import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Main.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Main() {
  const [all_recipe, setAll_recipe] = useState();
  const [recipe1, setRecipe1] = useState();
  const [add, setAdd] = useState("addrecipe");
  const { recipe } = useParams();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState();
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
  console.log(ingredients);
  console.log(ingredient);

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
        <p
          onClick={() => {
            setAdd("addrecipe1");
          }}
        >
          + Add Recipe
        </p>
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
      <div className={add}>
        <div className="mainform">
          <p>Add Recipe</p>
          <input type="text" placeholder="Name"></input>
          {ingredients.map((obj) => (
            <div className="ing">
              <p>{obj}</p>
              <img
                src="https://cdn-icons.flaticon.com/png/128/1620/premium/1620739.png?token=exp=1654797391~hmac=477594fad0825da151a766ae15ed4bee"
                width={10}
              />
            </div>
          ))}
          <input
            type="text"
            value={ingredient}
            onChange={(e) => {
              setIngredient(e.target.value);
            }}
            placeholder="Ingredients"
            onKeyDown={(event) => {
              if (event.key == "Enter") {
                setIngredients([...ingredients, ingredient]);
                setIngredient("");
              }
            }}
          ></input>
          <textarea placeholder="Preparation" rows={10} cols={60}></textarea>
          <button>Add Recipe</button>
        </div>
      </div>
    </div>
  );
}

export default Main;
