import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Auth from '../utils/auth';

const HeaderContainer = styled.header`
  background-color: #2e2e2e;
  padding: 15px 0;
`;

const NavbarContainer = styled.div`
  width: 90%;
  margin: 0 auto;
`;

const TitleLinksRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PageTitle = styled(Link)`
  text-decoration: none;
  color: #fff;

  h1 {
    margin: 0;
    font-size: 1.5em;
  }
`;

const NavbarNav = styled.div`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  padding: 5px 15px;
  border-radius: 5px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <HeaderContainer>
      <NavbarContainer>
        <TitleLinksRow>
          <PageTitle to="/">
            <h1>Hyprahealthy</h1>
          </PageTitle>
          <NavbarNav>
            {Auth.loggedIn() ? (
              <>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/me">{Auth.getProfile().data.username}'s profile</NavLink>
                <NavLink onClick={logout}>Logout</NavLink>
              </>
            ) : (
              <>
                <NavLink to="/search">Search</NavLink>
                <NavLink to="/login">Login</NavLink>
                <NavLink to="/signup">Signup</NavLink>
              </>
            )}
          </NavbarNav>
        </TitleLinksRow>
      </NavbarContainer>
    </HeaderContainer>
  );
};

export default Header;
