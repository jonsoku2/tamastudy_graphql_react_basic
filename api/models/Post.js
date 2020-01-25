const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Post', PostSchema);
