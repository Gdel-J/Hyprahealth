import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { saveMealIds } from '../utils/localStorage';
import Auth from '../utils/auth';
import styled from 'styled-components';

const MainContainer = styled.main`
  background-color: #F5FFF0;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 300px; 
`;

const Card = styled.div`
  border: none;
`;

const CardHeader = styled.h4`
  background-color: #1565C0;
  text-align: center;
  padding: 15px;
`;

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 9px 25px 25px 25px;
  background-color: #1565C0;
`;

const StyledForm = styled.form`
  text-align: center;
  background-color: white;
  padding: 4%;
  border-radius: 4px;
  width: 90%;
`;

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  cursor: pointer;
  background-color: #ABD69D;
  align-items: center;
  margin-top: 5%;
  width: 150px;
  height: 30px;
  border-radius: 3px;
  border: none;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const ErrorMessage = styled.div`
  margin: 15px 0;
  padding: 10px;
  background-color: #f44336;
  color: white;
  text-align: center;
  border-radius: 4px;
`;

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);

      const idMeals = data.login.user.savedRecipes.map((recipe) => {
        return recipe.idMeal;
      });

      saveMealIds(idMeals);

    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <MainContainer>
      <LoginForm>
        <Card>
          <CardHeader>Login</CardHeader>
          <CardBody>
            {data ? (
              <p>
                Success! You may now head <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <StyledForm onSubmit={handleFormSubmit}>
                <Input
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <Input
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <Button>Submit</Button>
              </StyledForm>
            )}

            {error && <ErrorMessage>{error.message}</ErrorMessage>}
          </CardBody>
        </Card>
      </LoginForm>
    </MainContainer>
  );
};

export default Login;
