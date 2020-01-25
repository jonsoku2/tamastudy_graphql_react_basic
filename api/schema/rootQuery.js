const Post = require('../models/Post');
const PostType = require('./types/type_post');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      async resolve() {
        // controller 에 따로 빼볼까?
        return await Post.find({});
      },
    },
  }),
});

module.exports = RootQuery;
