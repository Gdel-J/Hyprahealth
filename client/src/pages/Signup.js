import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const SignupContainer = styled.main`
    background-color: #F5FFF0;
    height: 80vh;
`;

const SignupFormContainer = styled.div`
    .card {
        border: none;
    }

    .card-header {
        background-color: #1565C0;
    }

    .card-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        padding: 9px 25px 25px 25px;
        background-color: #1565C0;
    }

    form {
        text-align: center;
        background-color: white;
        padding: 4%;
        border-radius: 4px;
    }

    .form-input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px 0;
        box-sizing: border-box;
        border: 2px solid #ccc;
        border-radius: 4px;
    }

    .signup-btn {
        cursor: pointer;
        background-color: #ABD69D;
        align-items: center;
        margin-top: 5%;
        width: 150px;
        height: 30px;
        border-radius: 3px;
        border: none;
    }

    .error-message {
        margin: 3rem 0;
        padding: 3rem;
        background-color: #f44336; 
        color: white;
    }
`;

const Signup = () => {
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
      const [addUser, { error, data }] = useMutation(ADD_USER);
    
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
    
      const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
    
        try {
            const { data } = await addUser({
                variables: { ...formState },
            });
    
            Auth.login(data.addUser.token);

            // Clear form state after successful signup
            setFormState({
                username: '',
                email: '',
                password: '',
            });
        } catch (e) {
            console.error(e);
        }
    };
  return (
    <SignupContainer>
      <SignupFormContainer>
        <div className="card">
          <h4 className="card-header">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>Success! You may now head <Link to="/">back to the homepage.</Link></p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.username}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="signup-btn" type="submit">Submit</button>
              </form>
            )}

            {error && (
              <div className="error-message">{error.message}</div>
            )}
          </div>
        </div>
      </SignupFormContainer>
    </SignupContainer>
  );
};

export default Signup;
