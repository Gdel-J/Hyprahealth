import React from 'react';
import styled from 'styled-components';
import { useRecipeContext } from "../utils/GlobalState";
import { REMOVE_FROM_CART, UPDATE_CART_QUANTITY } from "../utils/actions";
import { idbPromise } from "../utils/helpers";

const CartItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ImageContainer = styled.div`
  flex: 1;
  img {
    max-width: 50px;
    max-height: 50px;
  }
`;

const InfoContainer = styled.div`
  flex: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
`;

const QuantityInput = styled.input`
  width: 50px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid #ddd;
  margin-left: 10px;
`;

const TrashIcon = styled.span`
  cursor: pointer;
  margin-left: 15px;
  font-size: 1.5rem;
`;
const CartItem = ({ item }) => {
  const [, dispatch] = useRecipeContext();

  const removeFromCart = item => {
    dispatch({
      type: REMOVE_FROM_CART,
      item: item.item
    });
    idbPromise('cart', 'delete', { ...item });

  };

  const onChange = (e) => {
    const value = e.target.value;
    if (value === '0') {
      dispatch({
        type: REMOVE_FROM_CART,
        item: item.item
      });
      idbPromise('cart', 'delete', { ...item });

    } else {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        item: item.item,
        purchaseQuantity: parseInt(value)
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: parseInt(value) });

    }
  }


  return (
    <CartItemContainer>
      <ImageContainer>
        {/* Uncomment and use this if needed */}
        {/* <img src={`/images/${item.image}`} alt="item-image" /> */}
      </ImageContainer>
      <InfoContainer>
        <div>{item.item}, ${item.price}</div>
        <div>
          <span>Qty:</span>
          <QuantityInput
            type="number"
            placeholder="1"
            value={item.purchaseQuantity}
            onChange={onChange}            
          />
          <TrashIcon role="img" aria-label="trash" onClick={() => removeFromCart(item)}>
            🗑️
          </TrashIcon>
        </div>
      </InfoContainer>
    </CartItemContainer>
  );
}

export default CartItem;
