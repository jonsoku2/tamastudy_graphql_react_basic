const Post = require('../models/Post');
const PostType = require('./types/type_post');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList } = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    posts: {
      type: new GraphQLList(PostType),
      resolve() {
        return Post.find({});
      },
    },
  }),
});

module.exports = RootQuery;
