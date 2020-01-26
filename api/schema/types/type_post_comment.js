const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList } = graphql;
const PostComment = require('../../models/PostComment');

const PostCommentType = new GraphQLObjectType({
  name: 'PostComment',
  fields: () => ({
    id: {
      type: GraphQLID,
    },
    likes: {
      type: GraphQLString,
    },
    content: {
      type: GraphQLString,
    },
    post: {
      type: require('./type_post'),
      resolve: async function(parentValue) {
        try {
          console.log(parentValue, 'parentValue');
          const comment = await PostComment.findById(parentValue.id).populate('post');
          return comment.post;
        } catch (e) {
          console.error(e);
        }
      },
    },
  }),
});

module.exports = PostCommentType;
