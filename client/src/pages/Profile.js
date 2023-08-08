import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { REMOVE_MEAL } from "../utils/mutations";
import Cart from "../components/Cart";
import { QUERY_USER, QUERY_ME } from "../utils/queries";
import { removeMealId } from "../utils/localStorage";
import Auth from "../utils/auth";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa"; // importing Trash icon from Font Awesome in react-icons

// Styled components
const RecipeResultsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const RecipeContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const RecipeCard = styled.div`
  width: calc(50% - 10px); // Roughly for 2 cards per row with some space
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
  transition: 0.3s;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const RecipeTitle = styled.h4`
  margin: 10px 0;
  text-align: center;
  color: #333;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const UnsaveButton = styled.div`
  cursor: pointer;
  text-align: center;
  padding: 5px;
  color: red;
  transition: 0.3s;

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
  }
`;
const TrashIcon = styled(FaTrash)`
  width: 25px;
  height: 25px;
`;

const Profile = () => {
  const { username: userParam } = useParams();
  const [shoppingList, setShoppingList] = useState([]);
  // shopping list will look like this: ["celery", "onion", "carrot", "orange"]

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const [removeMeal, { error }] = useMutation(REMOVE_MEAL);

  const userData = data?.me || data?.user || {};
  // navigate to personal profile page if username is yours

  const getIngredients = (recipe) => {
    const ingredients = [];

    ingredients.push(recipe.strIngredients);
    console.log(ingredients);
    return ingredients;
  };

  const handleDeleteMeal = async (idMeal) => {
    try {
      const { data } = await removeMeal({
        variables: { idMeal },
      });

      if (!data) {
        throw new Error("Something went wrong!");
      }

      // upon success, remove meal's id from localStorage
      removeMealId(idMeal);
    } catch (err) {
      console.error(JSON.parse(JSON.stringify(err)));
    }
  };

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Navigate to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userData?.username) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to
        sign up or log in!
      </h4>
    );
  }

  return (
    <RecipeResultsContainer>
      <RecipeContainer>
        <RecipeTitle>
          {userData.savedRecipes.length
            ? `Viewing ${userData.savedRecipes.length} saved ${
                userData.savedRecipes.length === 1 ? "recipe" : "recipes"
              }:`
            : "You have no saved Recipes!"}
        </RecipeTitle>
        {userData.savedRecipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal}>
            <Link to={`/recipe/${recipe.idMeal}`}>
              <div>
                <RecipeTitle>{recipe.strMeal}</RecipeTitle>
                <Image src={recipe.strMealThumb} alt={recipe.strMeal} />
              </div>
            </Link>
            <div>
              <UnsaveButton onClick={() => handleDeleteMeal(recipe.idMeal)}>
                <TrashIcon />
                Unsave Recipe
              </UnsaveButton>
            </div>
          </RecipeCard>
        ))}
      </RecipeContainer>
      <Cart />
    </RecipeResultsContainer>
  );
};

export default Profile;
