import React from "react";
import styled from 'styled-components';

const FooterContainer = styled.div`
  background-color: #333;
  padding: 20px 0;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.p`
  font-size: 1.2em;
  margin-bottom: 10px;
`;

const StyledNavbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledNav = styled.nav`
  display: flex;
  gap: 15px; 
`;

const StyledLink = styled.a`
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>Made By</FooterText>
      <StyledNavbar>
        <StyledNav>
            <StyledLink target="_blank" href="#">Alvin</StyledLink>
            <StyledLink target="_blank" href="#">Richard</StyledLink>
            <StyledLink target="_blank" href="#">Jesse</StyledLink>
            <StyledLink target="_blank" href="#">Gerard</StyledLink>
        </StyledNav>
      </StyledNavbar>
    </FooterContainer>
  );
};

export default Footer;
