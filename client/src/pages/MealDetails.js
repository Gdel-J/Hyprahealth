import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { searchRecipes } from "../utils/API";
import Auth from "../utils/auth";
import { saveMealIds, getSavedMealIds } from "../utils/localStorage";
import Cart from "../components/Cart";
import { useRecipeContext } from "../utils/GlobalState";
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from "../utils/actions";
import { useMutation } from "@apollo/client";
import { SAVE_MEAL } from "../utils/mutations";
import { idbPromise } from "../utils/helpers";

// Styled components

const RecipeContainer = styled.div`
    .recipe-details {
        h2, h4 {
            margin: 1rem 0;
        }
    }

    .recipe-screens {
        display: flex;
        justify-content: space-between;

        .recipe-img-vid img {
            height: 275px;
            width: 336px;
        }

        .recipe-img-vid iframe {
            width: 336px;
            height: 189px;
        }

        div {
            margin: 1% 2%;
        }

        ol {
            margin-top: 1rem;
            li {
                margin: 0.5rem 0;
            }
        }
    }
`;

const Button = styled.button`
    margin: 0.5rem;
    padding: 0.5rem 1rem;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const BackButton = styled(Button)`
    &:before {
        content: "\\2190";
        margin-right: 0.5rem;
    }
`;

// Main component

const MealDetails = () => {
  const [savedMealIds, setSavedMealIds] = useState(getSavedMealIds());
  const [savedMeals, setSavedMeals] = useState([]);
  const [shoppingList, setShoppingList] = useState([]);

  const [state, dispatch] = useRecipeContext();

  const location = useLocation();
  const navigate = useNavigate();

  const { idMeal } = useParams();
  const { products, cart } = state;

  const [currentProduct, setCurrentProduct] = useState({});

  const [mealDetails, setMealDetails] = useState([]);
  const [saveMeal, { error }] = useMutation(SAVE_MEAL);

  useEffect(() => {
    getMealDetails(`lookup.php?i=${idMeal}`);
     
  }, []);

  useEffect(() => {
    console.log("savedMealIds: ", savedMealIds);
    saveMealIds(savedMealIds);
  },[savedMealIds]);

  const getMealDetails = async (query) => {
    try {
      const response = await searchRecipes(query);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const { meals } = await response.json();

      const mealData = meals.map((meal) => ({
        idMeal: meal.idMeal,
        strMeal: meal.strMeal,
        strMealThumb: meal.strMealThumb,
        strYoutube: meal.strYoutube,
        strCategory: meal.strCategory,
        strArea: meal.strArea,
        strInstructions: meal.strInstructions,
        strTags: meal.strTags,
        strIngredients: [
          meal.strIngredient1,
          meal.strIngredient2,
          meal.strIngredient3,
          meal.strIngredient4,
          meal.strIngredient5,
          meal.strIngredient6,
          meal.strIngredient7,
          meal.strIngredient8,
          meal.strIngredient9,
          meal.strIngredient10,
          meal.strIngredient11,
          meal.strIngredient12,
          meal.strIngredient13,
          meal.strIngredient14,
          meal.strIngredient15,
          meal.strIngredient16,
          meal.strIngredient17,
          meal.strIngredient18,
          meal.strIngredient19,
          meal.strIngredient20,
        ],
        strMeasures: [
          meal.strMeasure1,
          meal.strMeasure2,
          meal.strMeasure3,
          meal.strMeasure4,
          meal.strMeasure5,
          meal.strMeasure6,
          meal.strMeasure7,
          meal.strMeasure8,
          meal.strMeasure9,
          meal.strMeasure10,
          meal.strMeasure11,
          meal.strMeasure12,
          meal.strMeasure13,
          meal.strMeasure14,
          meal.strMeasure15,
          meal.strMeasure16,
          meal.strMeasure17,
          meal.strMeasure18,
          meal.strMeasure19,
          meal.strMeasure20,
        ],
      }));

      setSavedMeals(mealData);
      setMealDetails(mealData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMeal = async (idMeal) => {
    const mealToSave = savedMeals.find((meal) => meal.idMeal === idMeal);

    console.log("mealToSave: ", mealToSave);
    try {
      const { data } = await saveMeal({
        variables: { mealData: mealToSave },
      });

      console.log("data: :", data);

      if (data) {
        setSavedMealIds([...savedMealIds, mealToSave.idMeal]);
        
      }
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  const addToCart = () => {
    console.log("!!!shoppingList: ", shoppingList);
    

    shoppingList.forEach((item) => {
      
      const itemInCart = cart.find((cartItem) => cartItem.item === item);
      if (itemInCart) {
        dispatch({
          type: UPDATE_CART_QUANTITY,
          item,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
        idbPromise('cart', 'put', {
          ...itemInCart,
          purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
        });
      } else {
        console.log("currentProduct: ", item);
        dispatch({
          type: ADD_TO_CART,
          product: { item: item, price: 0.99, purchaseQuantity: 1 },
        });
        idbPromise('cart', 'put', { item: item, price: 0.99, purchaseQuantity: 1 });
      }
    });

    console.log("cart: ", cart);
  };

  const removeFromCart = () => {
    shoppingList.forEach((item) => {
      dispatch({
        type: REMOVE_FROM_CART,
        item: item,
      });
      idbPromise('cart', 'delete', { item });
    });


  };

  const checkChangeController = () => {
    // Get all the checkboxes in the ordered list
    const checkboxes = document.querySelectorAll('ol input[type="checkbox"]');

    // Create an empty array to store the checked values
    const checkedValues = [];

    // Loop through all the checkboxes and check if they are checked
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        // If the checkbox is checked, add its value to the checkedValues array
        checkedValues.push(checkbox.value);
      }
    });

    // Log the array of checked values
    setShoppingList(checkedValues);
    console.log("edited checkedValues: ", checkedValues);
    console.log("shoppingList: ", shoppingList);
  };

  // checkChangeController();
  function selects() {
    var ele = document.getElementsByName('ingredient');
    console.log("ele: ", ele);
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == 'checkbox')
        ele[i].checked = true;
    }
    checkChangeController();
  }

  function deSelect() {
    var ele = document.getElementsByName('ingredient');
    console.log("ele: ", ele);
    for (var i = 0; i < ele.length; i++) {
      if (ele[i].type == 'checkbox')
        ele[i].checked = false;

    }
    checkChangeController();
  }

  return (
    <RecipeContainer>
      <div className="single-recipe-container">
        {location.pathname !== "/" && (
          <BackButton onClick={() => navigate(-1)}>
            Go Back
          </BackButton>
        )}
        {mealDetails.map((meal) => (
          <div key={meal.idMeal} className="recipe-details">
            <h2>{meal.strMeal}</h2>
            <h4>
              {meal.strArea} {meal.strCategory}
            </h4>
            <div className="recipe-screens">
              <div className="recipe-img-vid">
                <img
                  src={meal.strMealThumb}
                  height="275"
                  width="336"
                  alt={meal.strMeal}
                />
                {meal.strYoutube && (
                  <iframe
                    title={`${meal.strMeal} Video`}
                    width="336"
                    height="189"
                    src={`https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                  }}
                >
                  {Auth.loggedIn() && (
                    <Button
                      disabled={
                        savedMealIds && savedMealIds.some(
                          (savedMealId) => savedMealId === meal.idMeal
                        )
                      }
                      className="save-btn btn"
                      onClick={() => handleSaveMeal(meal.idMeal)}
                    >
                      {savedMealIds && savedMealIds.some(
                        (savedMealId) => savedMealId === meal.idMeal
                      )
                        ? "Recipe Saved"
                        : "Save Recipe"}
                    </Button>
                  )}
                  <Button
                    className="add-btn btn"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Cart />
      </div>
    </RecipeContainer>
  );
};  


export default MealDetails;
