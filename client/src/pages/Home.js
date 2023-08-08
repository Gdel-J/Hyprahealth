import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaSearch, FaHeart, FaGlobeAmericas } from 'react-icons/fa';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #add8e6; // light blue
`;
const BannerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background: #f7f7f7;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  border-radius: 8px;

  h2 {
    margin-top: 20px;
  }
  p {
    margin-bottom: 20px;
  }
`;

const StyledButton = styled.button`
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  margin: 10px 0;
  transition: background 0.2s ease;

  &:hover {
    background: #0056b3;
  }

  a {
    color: white;
    text-decoration: none;
  }
`;

const DescriptionContainer = styled.div`
  text-align: center;
  width: 100%;
  margin-top: 40px;

  h3 {
    margin-bottom: 30px;
  }
`;

const DescriptionRow = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

const DescriptionItem = styled.div`
  flex: 1;
  margin: 20px;
  max-width: 300px;

  h4 {
    margin-bottom: 20px;
  }
`;

const Main = () => {
  return (
    <MainContainer>
      <BannerContainer>
        <h2>Find a Healthy Recipe to Try!</h2>
        <p>Access to different recipes</p>
        
        <StyledButton>
          <Link to="/search">Find a Recipe</Link>
        </StyledButton>
      </BannerContainer>
      <DescriptionContainer>
        <h3>What you can do...</h3>
        <DescriptionRow>
          <DescriptionItem>
            <h4>Search for Recipes</h4>
            <FaSearch style={{ width: '80px', height: '120px', color: 'grey', marginBottom: '20px' }} />
            <p>Enter an ingredient or dish name to find recipes.</p>
          </DescriptionItem>
          <DescriptionItem>
            <h4>Save recipes</h4>
            <FaHeart style={{ width: '80px', height: '120px', color: '#C05A5A', marginBottom: '20px' }} />
            <p>
              Once you are logged in, you can bookmark recipes to your profile.
            </p>
          </DescriptionItem>
          <DescriptionItem>
            <h4>Explore!</h4>
            <FaGlobeAmericas style={{ width: '80px', height: '120px', color: '#578D3E', marginBottom: '20px' }} />
            <p>Enjoy recipes from different countries!</p>
          </DescriptionItem>
        </DescriptionRow>
      </DescriptionContainer>
    </MainContainer>
  );
};

export default Main;
