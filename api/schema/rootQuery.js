const Post = require('../models/Post');
const PostType = require('./types/type_post');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;

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
    post: {
      type: PostType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      async resolve(parentValue, { id }) {
        return await Post.findById(id);
      },
    },
  }),
});

module.exports = RootQuery;
