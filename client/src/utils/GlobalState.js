import React, { createContext, useState, useContext, useEffect } from "react";
import { useRecipeReducer } from './reducers'
//import { searchRecipes } from "./API";

const RecipeContext = createContext();
const { Provider } = RecipeContext;

const RecipeProvider = ({ value = [], ...props }) => {


    const initialState = {
        
        categories: [],
        // areas,
        
        products: [],
        cart: [],
        cartOpen: false,
        
        currentCategory: '',
        category: '',
        area: '',
        ingredient: '',
        mealName: '',

    };


    const [state, dispatch] = useRecipeReducer(initialState);

    return <Provider value={[state, dispatch]} {...props} />;
};

const useRecipeContext = () => {
    return useContext(RecipeContext);
};

export { RecipeProvider, useRecipeContext };