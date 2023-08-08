import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import styled from 'styled-components';

import { ADD_COMMENT } from '../utils/mutations';
import Auth from '../utils/auth';

const CommentContainer = styled.div`
  border: 1px solid #d1d1d1;
  padding: 15px;
  background-color: #f7f7f7;
  border-radius: 5px;
  margin-bottom: 15px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eaeaea;
  }
`;

const CharacterCount = styled.p`
  margin: 0;
  color: ${props => (props.isDanger ? 'red' : 'initial')};
`;

const CommentFormLayout = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 992px) { /* This media query replaces col-lg-* classes */
    flex-direction: row;
  }
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  line-height: 1.5;
  resize: vertical;
  margin-bottom: 1rem;
  @media (min-width: 992px) {
    margin-bottom: 0;
    margin-right: 1rem;
    flex: 1; /* This allows the textarea to grow */
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1.5rem 0;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
  @media (min-width: 992px) {
    width: auto;
  }
`;

const CommentForm = ({ thoughtId }) => {
  const [commentText, setCommentText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addComment, { error }] = useMutation(ADD_COMMENT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addComment({
        variables: {
          thoughtId,
          commentText,
          commentAuthor: Auth.getProfile().data.username,
        },
      });

      setCommentText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'commentText' && value.length <= 280) {
      setCommentText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <CommentContainer>
      <h4>What are your thoughts on this thought?</h4>

      {Auth.loggedIn() ? (
        <>
          <CharacterCount isDanger={characterCount === 280 || error}>
            Character Count: {characterCount}/280
            {error && <span>{error.message}</span>}
          </CharacterCount>
          <CommentFormLayout onSubmit={handleFormSubmit}>
            <CommentTextarea
                name="commentText"
                placeholder="Add your comment..."
                value={commentText}
                onChange={handleChange}
            ></CommentTextarea>
            <SubmitButton type="submit">Add Comment</SubmitButton>
          </CommentFormLayout>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </CommentContainer>
  );
};

export default CommentForm;
