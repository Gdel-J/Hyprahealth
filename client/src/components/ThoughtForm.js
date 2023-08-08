import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { ADD_THOUGHT } from '../utils/mutations';
import { QUERY_THOUGHTS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Textarea = styled.textarea`
  width: 100%;
  line-height: 1.5;
  resize: vertical;
`;

const Button = styled.button`
  padding: 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorBox = styled.div`
  width: 100%;
  margin-top: 20px;
  background-color: #ff0000;
  color: white;
  padding: 10px;
`;

const ThoughtForm = () => {
  const [thoughtText, setThoughtText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    update(cache, { data: { addThought } }) {
      try {
        const { thoughts } = cache.readQuery({ query: QUERY_THOUGHTS });

        cache.writeQuery({
          query: QUERY_THOUGHTS,
          data: { thoughts: [addThought, ...thoughts] },
        });
      } catch (e) {
        console.error(e);
      }

      // update me object's cache
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, thoughts: [...me.thoughts, addThought] } },
      });
    },
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });

      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's on your techy mind?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <StyledForm onSubmit={handleFormSubmit}>
            <Textarea
              name="thoughtText"
              placeholder="Here's a new thought..."
              value={thoughtText}
              onChange={handleChange}
            ></Textarea>

            <Button type="submit">Add Thought</Button>
            {error && <ErrorBox>{error.message}</ErrorBox>}
          </StyledForm>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default ThoughtForm;
