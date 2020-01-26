const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostCommentSchema = new Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    likes: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: [true, '본문을 입력해주세요. '],
      maxlength: [500, '500자 이상은 불가능합니다.'],
    },
  },
  {
    timestamps: true,
  },
);

PostCommentSchema.statics.addLike = async function(id) {
  try {
    let comment = await this.findById(id);
    ++comment.likes;
    return comment.save();
  } catch (e) {
    console.error(e);
  }
};

PostCommentSchema.statics.unLike = async function(id) {
  try {
    let comment = await this.findById(id);
    --comment.likes;
    return comment.save();
  } catch (e) {
    console.error(e);
  }
};

module.exports = mongoose.model('PostComment', PostCommentSchema);
