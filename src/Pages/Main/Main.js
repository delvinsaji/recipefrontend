import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Main.css";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function Main() {
  const location = useLocation();
  const [all_recipe, setAll_recipe] = useState();
  const [recipe1, setRecipe1] = useState();
  const [add, setAdd] = useState("addrecipe");
  const { recipe } = useParams();
  const navigate = useNavigate();
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState();
  const [prep, setPrep] = useState();
  const [name, setName] = useState();
  const [deleteing, setDeleteing] = useState([]);
  const [adding, setAdding] = useState([]);
  const [change, setChange] = useState(0);
  const [addreview, setAddreview] = useState("addreview");
  const [rating, setRating] = useState();
  const [desc, setDesc] = useState();
  const [search, setSearch] = useState();
  const [searchbox, setSearchbox] = useState("addsearch");
  const [searchdata, setSearchdata] = useState([]);

  useEffect(() => {
    axios
      .get("https://recipe1api.herokuapp.com/api/all_recipe")
      .then((Response) => {
        setAll_recipe(Response.data);
      })
      .catch((error) => {
        alert(error.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get("https://recipe1api.herokuapp.com/api/all_recipe")
      .then((Response) => {
        setAll_recipe(Response.data);
      })
      .catch((error) => {
        alert(error.data);
      });
  }, [change]);

  useEffect(() => {
    axios
      .get(`https://recipe1api.herokuapp.com/api/recipe/${recipe}`)
      .then((Response) => {
        setRecipe1(Response.data);
      })
      .catch((error) => {
        alert(error.data);
      });
  }, [recipe]);

  const [adup, setAdup] = useState(1);
  return (
    <div className="recipe">
      <div className="list">
        {location.state ? <p>Hello {location.state.username}</p> : ""}
        <h3>Recipe List</h3>
        <input
          className="search"
          type="text"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              setSearchbox("addsearch1");
              axios
                .get(`https://recipe1api.herokuapp.com/api/search/${search}`)
                .then((Response) => {
                  setSearchdata(Response.data);
                })
                .catch((error) => {
                  alert(error.data);
                });
            }
          }}
          placeholder="Search Recipe"
        ></input>
        <p id="ok" style={{ fontSize: "10px", textAlign: "center" }}>
          Hit Enter to show the search results{" "}
        </p>
        {all_recipe
          ? all_recipe.map((obj) => (
              <div>
                <p
                  onClick={() => {
                    navigate(`/${obj.name}`, {
                      state: {
                        username: location.state ? location.state.username : "",
                      },
                    });
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
            setAdup(1);
            setPrep("");
            setName("");
            setIngredients([]);
          }}
        >
          + Add Recipe
        </p>
      </div>
      <div className="desc">
        <div className="desc1">
          <h2>{recipe}</h2>
          <div className="editbuttons">
            <p
              onClick={() => {
                axios
                  .get(`https://recipe1api.herokuapp.com/api/delete/${recipe}/`)
                  .then((Response) => {
                    alert(Response.data);
                  });
                setChange(change + 1);
              }}
              className="e"
            >
              Delete Recipe
            </p>
            <p
              className="e"
              onClick={() => {
                setAdd("addrecipe1");
                setAdup(2);
                setName(recipe1.name);
                setPrep(recipe1.prep);
                recipe1.ingredients.map((obj) => {
                  ingredients.push(obj.ingredient);
                });
              }}
            >
              Update Recipe
            </p>
          </div>
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
          <p
            onClick={() => {
              setAddreview("addreview1");
            }}
            className="e"
          >
            + Add Review
          </p>
        </div>
      </div>
      <div className={add}>
        <div className="mainform">
          <p>Add Recipe</p>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Name"
          ></input>
          {ingredients
            ? ingredients.map((obj) => (
                <div className="ing">
                  <p>{obj}</p>
                  <img
                    onClick={() => {
                      if (adup === 1) {
                        setIngredients(
                          ingredients.filter(function (value) {
                            return value !== obj;
                          })
                        );
                      } else {
                        setDeleteing([...deleteing, obj]);
                        setIngredients(
                          ingredients.filter(function (value) {
                            return value !== obj;
                          })
                        );
                      }
                    }}
                    src="https://cdn-icons.flaticon.com/png/128/1620/premium/1620739.png?token=exp=1654797391~hmac=477594fad0825da151a766ae15ed4bee"
                    width={10}
                  />
                </div>
              ))
            : "null"}
          <p style={{ fontSize: "10px" }}>
            Hit enter after typing each ingredient to add further ingredints
          </p>
          <input
            type="text"
            value={ingredient}
            onChange={(e) => {
              setIngredient(e.target.value);
            }}
            placeholder="Ingredients"
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                if (adup === 1) {
                  setIngredients([...ingredients, ingredient]);
                  setIngredient("");
                } else {
                  setAdding([...adding, ingredient]);
                  setIngredients([...ingredients, ingredient]);
                  setIngredient("");
                }
              }
            }}
          ></input>
          <textarea
            value={prep}
            onChange={(e) => {
              setPrep(e.target.value);
            }}
            placeholder="Preparation"
            rows={10}
            cols={60}
          ></textarea>
          <button
            onClick={() => {
              if (adup === 1) {
                axios.post(
                  "https://recipe1api.herokuapp.com/api/create_recipe",
                  {
                    name: name,
                    prep: prep,
                    ingredients: ingredients,
                  }
                );
                setChange(change + 1);
              } else {
                console.log(deleteing);
                console.log(adding);
                axios
                  .post(
                    `https://recipe1api.herokuapp.com/api/update/${recipe}/`,
                    {
                      name: name,
                      prep: prep,
                      delete_ingredient: deleteing,
                      create_ingredient: adding,
                    }
                  )
                  .then((Response) => {
                    alert(Response.data);
                  })
                  .catch((error) => {
                    alert(error.data);
                  });
                setChange(change + 1);
              }
              setAdd("addrecipe");
            }}
          >
            {adup === 1 ? "Add Recipe" : "Update Recipe"}
          </button>
        </div>
      </div>
      <div className={addreview}>
        <div className="inside">
          <p>
            Rating:{" "}
            <input
              className="ooh"
              type="number"
              value={rating}
              onChange={(e) => {
                setRating(e.target.value);
              }}
            ></input>
            /5
          </p>
          <input
            type="text"
            placeholder="Review"
            value={desc}
            onChange={(e) => {
              setDesc(e.target.value);
            }}
          ></input>
          <button
            onClick={() => {
              try {
                let a = location.state.username === "";
              } catch {
                navigate("/authentication");
              } finally {
                axios
                  .post(
                    `https://recipe1api.herokuapp.com/api/add_review/${recipe}/`,
                    {
                      username: location.state.username,
                      desc: desc,
                      rating: rating,
                    }
                  )
                  .then((Response) => {
                    alert(Response.data);
                  })
                  .catch((error) => {
                    alert(error.data);
                  });
              }
              setAddreview("addreview");
            }}
          >
            Add Review
          </button>
        </div>
      </div>
      <div className={searchbox}>
        {searchdata.map((obj) => (
          <p
            className="r"
            onClick={() => {
              navigate(`/${obj.name}`, {
                state: {
                  username: location.state ? location.state.username : "",
                },
              });
              setSearchbox("addsearch");
              setSearch("");
              setSearchdata([]);
            }}
          >
            {obj.name}
          </p>
        ))}
      </div>
    </div>
  );
}

export default Main;
