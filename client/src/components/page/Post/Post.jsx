import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const FETCH_POST = gql`
  query PostQuery($id: ID!) {
    post(id: $id) {
      id
      title
      description
      comments {
        id
        content
      }
    }
  }
`;

const Post = ({ match }) => {
  const postId = match.params.id;
  const { loading, error, data } = useQuery(FETCH_POST, {
    variables: { id: postId },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const renderPost = () => {
    const { title, description, comments } = data.post;
    return (
      <div>
        <div>{title}</div>
        <div>{description}</div>
        <div>
          {comments.map(comment => (
            <div key={comment.id}>{comment.content}</div>
          ))}
        </div>
      </div>
    );
  };

  return <div>{renderPost()}</div>;
};

export default Post;
