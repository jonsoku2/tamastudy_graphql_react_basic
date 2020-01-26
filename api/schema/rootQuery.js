const Post = require('../models/Post');
const PostComment = require('../models/PostComment');
const PostType = require('./types/type_post');
const PostCommentType = require('./types/type_post_comment');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve: async function() {
        // controller 에 따로 빼볼까?
        return Post.find({});
      },
    },
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async function(parentValue, { id }) {
        return await Post.findById(id);
      },
    },
    postComments: {
      type: PostCommentType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: async function(parnetValue, { id }) {
        return PostComment.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
