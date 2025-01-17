import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  videoId: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  }
}, { timestamps: true })

const Comment = mongoose.models.comment || mongoose.model('Comment', CommentSchema)
export default Comment
