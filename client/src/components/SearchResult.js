import React, { useState, useEffect } from 'react';
import { searchRecipes } from '../utils/API';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const RecipeResultsContainer = styled.div`
  padding: 1rem;
  background-color: #add8e6; // light blue;
  min-height: 100vh;
`;

const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 1rem;
`;

const RecipeCard = styled.div`
  flex: 0 0 calc(50% - 1rem);
  margin-bottom: 2rem;
  background-color: #fff;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

  @media (min-width: 992px) {
    flex: 0 0 calc(20% - 1rem);
  }
`;

const RecipeTitle = styled.div`
  padding: 0.5rem;
  background-color: #2e2e2e;
  color: #fff;
  text-align: center;

  h4 {
    margin: 0;
  }
`;

const RecipeImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const SearchResult = ({ category, area, ingredient, mealName }) => {
  const [recipeList, setRecipeList] = useState([]);
    const [result, setResult] = useState('random');

    useEffect(() => {
        const getRecipe = async (query) => {
            try {
                const response = await searchRecipes(query);

                if (!response.ok) {
                    throw new Error('something went wrong!');
                }

                const { meals } = await response.json();
                console.log(meals);
                
                if(meals !== null)
                    setRecipeList(meals);
                else
                    setRecipeList([]);

            } catch (err) {
                console.error(JSON.parse(JSON.stringify(err)));
            }
        };

        
        if(category === '' && area === '' && ingredient === '' && mealName === '') {
            getRecipe(`randomselection.php`);
        } else if (area !== '') {
            getRecipe(`filter.php?a=${area}`);
            setResult(area);
        } else if (category !== '') {
            getRecipe(`filter.php?c=${category}`);
            setResult(category);
        } else if (ingredient !== '') {
            getRecipe(`filter.php?i=${ingredient}`);
            setResult(ingredient);
        } else if (mealName !== '') {
            getRecipe(`search.php?s=${mealName}`);
            setResult(mealName);
        }

    }, [category, area, ingredient, mealName]);

  return (
    <RecipeResultsContainer>
      <RecipeContainer>
        <p id="search-req">Showing results for "{result}"</p>
        {recipeList.map((recipe) => (
          <RecipeCard key={recipe.idMeal}>
            <Link to={`/recipe/${recipe.idMeal}`}>
              <RecipeTitle>
                <h4>{recipe.strMeal}</h4>
              </RecipeTitle>
              <RecipeImage src={recipe.strMealThumb} alt={recipe.strMeal} />
            </Link>
          </RecipeCard>
        ))}
      </RecipeContainer>
    </RecipeResultsContainer>
  );
};

export default SearchResult;
