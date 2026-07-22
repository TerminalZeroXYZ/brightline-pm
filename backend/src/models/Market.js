import mongoose from 'mongoose'

const marketSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  isScalar: {
    type: Boolean,
    default: false
  },
  contractAddress: {
    type: String // Address of the deployed Market contract on Polygon
  },
  status: {
    type: String,
    enum: ['draft', 'open', 'resolved', 'cancelled'],
    default: 'draft'
  },
  endTime: {
    type: Date,
    required: true
  },
  resolvedOutcome: {
    type: Number // 0 or 1 for binary, or the number for scalar
  },
  totalVolume: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: String
  },
  suggestionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Suggestion'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

export default mongoose.model('Market', marketSchema)
