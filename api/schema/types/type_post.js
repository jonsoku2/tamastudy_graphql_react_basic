const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const PostCommentType = require('./type_post_comment.js');
const Post = require('../../models/Post');

const PostType = new GraphQLObjectType({
  name: 'Post',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    comments: {
      type: new GraphQLList(PostCommentType),
      resolve(parentValue) {
        return Post.findPostComments(parentValue.id);
      },
    },
  }),
});

module.exports = PostType;
