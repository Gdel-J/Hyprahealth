
const theMealDbApiKey=process.env.REACT_APP_THE_MEAL_DB_API_KEY;

console.log("theMealDbApiKey:", process.env.REACT_APP_THE_MEAL_DB_API_KEY);


export const searchRecipes = (query) => {
  

  return fetch(`https://www.themealdb.com/api/json/v2/9973533/${query}`);
};

