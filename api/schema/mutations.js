const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString } = graphql;
const Post = require('../models/Post');
const PostType = require('./types/type_post');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve(parentValue, args) {
        return new Post(args).save();
      },
    },
  },
});

module.exports = mutation;
