import React, { useEffect } from 'react';
import styled from 'styled-components';
//import { useMutation } from '@apollo/client';
import { idbPromise } from '../utils/helpers';

const StyledJumbotron = styled.div`
    padding: 20px 30px;
    margin-bottom: 30px;
    background-color: #f7f7f7;
    border-radius: 8px;
    // You can add more styles or adjust the ones here as needed
`;

const SuccessMessage = styled.h1`
  color: #4CAF50; // Adjust styles as necessary
`;

const ThankYouMessage = styled.h2`
  color: #333; // Adjust styles as necessary
`;

const RedirectMessage = styled.h2`
  color: #666; // Adjust styles as necessary
`;

function Congratulations() {
  

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise('cart', 'get');
      console.log("cart: ", cart);

      cart.forEach((item) => {
        idbPromise('cart', 'delete', item);
      });

      setTimeout(() => {
        window.location.assign('/');
      }, 3000);
    }

    saveOrder();
  }, []);

  return (
    <StyledJumbotron>
      <SuccessMessage>Congratulations!</SuccessMessage>
      <ThankYouMessage>Thank you for your purchase!</ThankYouMessage>
      <RedirectMessage>You will now be redirected to the home page</RedirectMessage>
    </StyledJumbotron>
  );
}

export default Congratulations;
