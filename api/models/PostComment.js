const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostComment = new Schema(
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

module.exports = mongoose.model('PostComment', PostComment);
