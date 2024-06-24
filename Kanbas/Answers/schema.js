import mongoose from "mongoose";

const AnswerSchema = new mongoose.Schema({
  quiz_id: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  answers: {
    type: Map,
    of: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
}, { collection: 'answers' });

module.exports = mongoose.model('Answer', AnswerSchema);
