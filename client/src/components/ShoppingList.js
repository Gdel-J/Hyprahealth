import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
//Make sure you have imported Icon from the respective library
import { REMOVE_MEAL } from "../utils/mutations";
import * as Icon from 'react-icons/fa';

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 15px; 
`;

const StyledButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Card = styled.div`
  margin: 20px 0;
  border: 1px solid #f0f0f0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CardBody = styled.div`
  padding: 15px;
`;

const CardTitle = styled.h4`
  margin: 0;
  font-weight: bold;
`;

const RemoveIngredientBtn = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 10px;
`;

const ShoppingList = ({ shoppingList, setShoppingList }) => {
  const emailBody = shoppingList.join("%0D%0A");

  const handleDelete = (index) => {
    setShoppingList((prevList) =>
      prevList.filter((_, itemIndex) => itemIndex !== index)
    );
  };

  const handleFilter = () => {
    const filteredList = shoppingList.filter((item) => item !== null);
    const uniqueList = [...new Set(filteredList)];
    setShoppingList(uniqueList);
  };

  return (
    <Container>
      <Row>
        <StyledButton onClick={handleFilter}>
          Add to Shopping List
        </StyledButton>
        <StyledButton
          as="a"
          href={`mailto:?subject=My Shopping List&body=${emailBody}`}
        >
          Email Your List!
        </StyledButton>
      </Row>
      <Row>
        {shoppingList.length === 0 ? (
          <p>Your shopping list is currently empty</p>
        ) : (
          shoppingList.map((ingredient, index) => (
            <Card key={index}>
              <CardBody>
                <CardTitle>{ingredient}</CardTitle>
              </CardBody>
              <RemoveIngredientBtn onClick={() => handleDelete(index)}>
                <Icon.FaTrash style={{ width: "25px", height: "25px" }} />
              </RemoveIngredientBtn>
            </Card>
          ))
        )}
      </Row>
    </Container>
  );
};

export default ShoppingList;
