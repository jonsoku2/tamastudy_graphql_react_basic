const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLID } = graphql;
const UserType = require('./types/type_user');
const AuthService = require('../services/auth');
const Post = require('../models/Post');
const PostType = require('./types/type_post');
const PostComment = require('../models/PostComment');
const PostCommentType = require('./types/type_post_comment');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { username, email, password }, req) {
        return AuthService.signup({ username, email, password, req });
      },
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      },
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString },
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({ email, password, req });
      },
    },
    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: async function(parentValue, args) {
        return await new Post(args).save();
      },
    },
    updatePost: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
        title: { type: GraphQLString },
        description: { type: GraphQLString },
      },
      resolve: async function(parentValue, { id, title, description }) {
        return await Post.findByIdAndUpdate(
          id,
          { title, description },
          {
            new: true,
            upsert: true,
          },
        );
      },
    },
    deletePost: {
      type: PostType,
      args: { id: { type: GraphQLID } },
      resolve: async function(parentValue, { id }) {
        return await Post.findByIdAndDelete(id);
      },
    },
    addCommentToPost: {
      type: PostType,
      args: {
        postId: { type: GraphQLID },
        content: { type: GraphQLString },
      },
      resolve: async function(parentValue, { postId, content }) {
        return await Post.addComment(postId, content);
      },
    },
    // 이부분..
    addLikeToPost: {
      type: PostCommentType,
      args: { postCommentId: { type: GraphQLID } },
      resolve(parentValue, { postCommentId }) {
        return PostComment.addLike(postCommentId);
      },
    },
    unLikeToPost: {
      type: PostCommentType,
      args: { postCommentId: { type: GraphQLID } },
      resolve(parentValue, { postCommentId }) {
        return PostComment.unLike(postCommentId);
      },
    },
  },
});

module.exports = mutation;
