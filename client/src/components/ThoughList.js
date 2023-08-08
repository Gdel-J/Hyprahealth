import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledDiv = styled.div`
  margin-bottom: 20px;
`;

const Card = styled.div`
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
`;

const CardHeader = styled.div`
  background-color: #007bff;
  padding: 15px;
  margin: 0;
`;

const CardBody = styled.div`
  background-color: #f8f9fa;
  padding: 15px;
`;

const StyledLink = styled(Link)`
  display: block;
  color: white;
  text-decoration: none;

  &:hover {
    text-decoration: none;
    color: white;
  }

  span {
    font-size: 1rem;
  }
`;

const DiscussionLink = styled(Link)`
  display: block;
  width: 100%;
  background-color: #007bff;
  color: white;
  text-align: center;
  padding: 10px 0;
  text-decoration: none;

  &:hover {
    background-color: #0056b3;
  }
`;

const ThoughtList = ({ thoughts, title, showTitle = true, showUsername = true }) => {
  if (!thoughts.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <StyledDiv>
      {showTitle && <h3>{title}</h3>}
      {thoughts &&
        thoughts.map((thought) => (
          <Card key={thought._id}>
            <CardHeader>
              {showUsername ? (
                <StyledLink to={`/profiles/${thought.thoughtAuthor}`}>
                  {thought.thoughtAuthor} <br />
                  <span>had this thought on {thought.createdAt}</span>
                </StyledLink>
              ) : (
                <span>You had this thought on {thought.createdAt}</span>
              )}
            </CardHeader>
            <CardBody>
              <p>{thought.thoughtText}</p>
            </CardBody>
            <DiscussionLink to={`/thoughts/${thought._id}`}>
              Join the discussion on this thought.
            </DiscussionLink>
          </Card>
        ))}
    </StyledDiv>
  );
};

export default ThoughtList;
