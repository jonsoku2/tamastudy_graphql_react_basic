const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQuery = require('./rootQuery');

module.exports = new GraphQLSchema({
  query: RootQuery,
});
