import React from 'react';
import styled from 'styled-components';

// Import hooks and utilities
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_THOUGHT } from '../utils/queries';

import CommentList from '../components/CommentList.js';
import CommentForm from '../components/CommentForm';

// Styled-components definitions
const ThoughtContainer = styled.div`
  margin: 1rem 0;
`;

const ThoughtHeader = styled.h3`
  background-color: #343a40;
  color: white;
  padding: 1rem 0;
  margin: 0;
  text-align: center;
`;

const ThoughtTimestamp = styled.span`
  font-size: 1rem;
`;

const ThoughtText = styled.blockquote`
  font-size: 1.5rem;
  font-style: italic;
  border: 2px dotted #1a1a1a;
  line-height: 1.5;
  padding: 1rem;
  background-color: #f8f9fa;
`;

const CommentsContainer = styled.div`
  margin: 2.5rem 0;
`;

const CommentFormContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border: 1px dotted #1a1a1a;
`;

const SingleThought = () => {
  // Using `useParams()` to retrieve the route parameter `:thoughtId`
  const { thoughtId } = useParams();

  // Query to fetch data for a single thought
  const { loading, data } = useQuery(QUERY_SINGLE_THOUGHT, {
    variables: { thoughtId },
  });

  const thought = data && data.thought ? data.thought : {};


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ThoughtContainer>
      <ThoughtHeader>
        {thought.thoughtAuthor}
        <ThoughtTimestamp>
          had this thought on {thought.createdAt}
        </ThoughtTimestamp>
      </ThoughtHeader>

      <ThoughtText>
        {thought.thoughtText}
      </ThoughtText>

      <CommentsContainer>
        <CommentList comments={thought.comments} />
      </CommentsContainer>

      <CommentFormContainer>
        <CommentForm thoughtId={thought._id} />
      </CommentFormContainer>
    </ThoughtContainer>
  );
};

export default SingleThought;
