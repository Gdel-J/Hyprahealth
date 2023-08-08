import React, { useEffect } from 'react';
//import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import Auth from '../utils/auth';
import { useRecipeContext } from '../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../utils/actions';
import styled from 'styled-components';

const CartContainer = styled.div`
  position: relative;
  padding: 20px;
  background-color: #f7f7f7;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const FlexRowSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledButton = styled.button`
  padding: 8px 12px;
  margin: 4px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const CartIcon = styled.div`
  cursor: pointer;
  font-size: 1.5em;
`;

const CartTitle = styled.h2`
  margin-top: 0;
  font-size: 1.5em;
  text-align: center;
`;

const CartEmptyMessage = styled.p`
  text-align: center;
  font-style: italic;
`;

//const stripePromise = loadStripe;

const Cart = () => {
  const [state, dispatch] = useRecipeContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  //useEffect(() => {
    //if (data) {
      //stripePromise.then((res) => {
       // res.redirectToCheckout({ sessionId: data.checkout.session });
      //});
    //}
  //}, [data]);

  const shoppingList = state.cart.map((item) => {
    return item.item;
  });

  const emailBody = shoppingList.join("%0D%0A");

  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    const orderedProducts = [];

    state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
        orderedProducts.push(item.item);
      }
    });

    getCheckout({
      variables: { products: orderedProducts },
    });
  }

  if (!state.cartOpen) {
    return (
      <CartIcon onClick={toggleCart}>
        <span role="img" aria-label="trash">🛒</span>
      </CartIcon>
    );
  }

  return (
    <CartContainer>
      <CloseButton onClick={toggleCart}>[close]</CloseButton>
      <CartTitle>Shopping Cart</CartTitle>

      {state.cart.length ? (
        <div>
          <FlexRowSpaceBetween>
            <strong>Total: ${calculateTotal()}</strong>
            {Auth.loggedIn() ? (
              <div>
                <StyledButton onClick={submitCheckout}>Checkout</StyledButton>
                <StyledButton href={`mailto:?subject=My Shopping List&body=${emailBody}`}>Email</StyledButton>
              </div>
            ) : (
              <span>(log in to check out)</span>
            )}
          </FlexRowSpaceBetween>
        </div>
      ) : (
        <CartEmptyMessage>Your cart is empty.</CartEmptyMessage>
      )}
    </CartContainer>
  );
};

export default Cart;
