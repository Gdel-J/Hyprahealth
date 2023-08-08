import React from "react";
import styled from "styled-components";

const StyledJumbotron = styled.div`
  height: 560px;
  clear: both;
  padding-top: 120px;
  text-align: center;
`;

function Jumbotron({ children }) {
  return <StyledJumbotron>{children}</StyledJumbotron>;
}

export default Jumbotron;
