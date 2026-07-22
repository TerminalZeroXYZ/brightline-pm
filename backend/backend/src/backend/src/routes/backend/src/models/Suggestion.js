import mongoose from 'mongoose'

const suggestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  isScalar: {
    type: Boolean,
    default: false
  },
  suggestedBy: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'live'],
    default: 'pending'
  },
  grokScore: {
    type: Number,
    default: 0
  },
  grokFeedback: {
    type: String,
    default: ''
  },
  endTime: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Suggestion', suggestionSchema)
