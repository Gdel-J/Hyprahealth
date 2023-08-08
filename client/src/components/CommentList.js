import React from 'react';
import styled from 'styled-components';

const CommentHeader = styled.h3`
  padding: 5px;
  display: inline-block;
  border-bottom: 1px dotted #1a1a1a;
`;

const CommentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 16px;
`;

const CommentContainer = styled.div`
  display: block;
  margin-bottom: 16px;
  padding-bottom: 16px;
`;

const CommentBox = styled.div`
  padding: 16px;
  background-color: #343a40; 
  color: #f8f9fa; 
`;

const CommentDate = styled.span`
  font-size: 0.825rem;
`;

const CommentList = ({ comments = [] }) => {
  if (!comments.length) {
    return <h3>No Comments Yet</h3>;
  }

  return (
    <>
      <CommentHeader>Comments</CommentHeader>
      <CommentWrapper>
        {comments.map((comment) => (
          <CommentContainer key={comment._id}>
            <CommentBox>
              <h5>
                {comment.commentAuthor} commented{' '}
                <CommentDate>on {comment.createdAt}</CommentDate>
              </h5>
              <p>{comment.commentText}</p>
            </CommentBox>
          </CommentContainer>
        ))}
      </CommentWrapper>
    </>
  );
};

export default CommentList;
