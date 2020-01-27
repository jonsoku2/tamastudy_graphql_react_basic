import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

const FETCH_POSTS = gql`
  {
    posts {
      id
      title
      description
    }
  }
`;

const Posts = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  const renderPosts = () => data.posts.map(post => <div key={post.id}>{post.title}</div>);

  return <div>{renderPosts()}</div>;
};

export default Posts;
