const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostComment = require('./PostComment');

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, '제목을 입력해주세요. '],
      trim: true,
      maxlength: [50, '50자 이상은 불가능합니다.'],
    },
    description: {
      type: String,
      required: [true, '본문을 입력해주세요. '],
      maxlength: [500, '500자 이상은 불가능합니다.'],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'PostComment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

PostSchema.statics.addComment = async function(id, content) {
  try {
    const post = await this.findById(id);
    const newPostComment = await PostComment.create({ content, post });
    post.comments.push(newPostComment);
    await post.save();
    return newPostComment;
  } catch (e) {
    console.error(e);
  }
};

PostSchema.statics.findPostComments = async function(id) {
  try {
    const res = await this.findById(id).populate({
      path: 'comments',
      select: 'id likes content',
    });
    const comments = res.comments;
    return comments;
  } catch (e) {
    console.error(e);
  }
};

module.exports = mongoose.model('Post', PostSchema);
