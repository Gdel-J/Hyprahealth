import { useReducer } from 'react';
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

// Reducer for managing app state related to products, cart, and categories.
export const reducer = (state, action) => {
  switch (action.type) {
    // Update the products array in the state.
    case UPDATE_PRODUCTS:
      return {
        ...state,
        products: [...action.products],
      };

    // Add a product to the cart and open the cart.
    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.product]
      };

    // Add multiple products to the cart at once.
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.products],
      };

    // Adjust the quantity of a product in the cart.
    case UPDATE_CART_QUANTITY:
      return {
        ...state,
        cartOpen: true,
        cart: state.cart.map((product) => {
          if (action.item === product.item) {
            product.purchaseQuantity = action.purchaseQuantity;
          }
          return product;
        }),
      };

    // Remove a product from the cart.
    case REMOVE_FROM_CART:
      const filteredCart = state.cart.filter((product) => product.item !== action.item);
      return {
        ...state,
        cartOpen: filteredCart.length > 0,
        cart: filteredCart,
      };

    // Empty the cart.
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    // Toggle the cart's open/close state.
    case TOGGLE_CART:
      return {
        ...state,
        cartOpen: !state.cartOpen,
      };

    // Update the list of available categories.
    case UPDATE_CATEGORIES:
      return {
        ...state,
        categories: [...action.categories],
      };

    // Set the currently selected category.
    case UPDATE_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.currentCategory,
      };

    // Default case to handle unexpected action types.
    default:
      return state;
  }
};

// Custom hook to use the above reducer.
export function useRecipeReducer(initialState) {
  return useReducer(reducer, initialState);
}
