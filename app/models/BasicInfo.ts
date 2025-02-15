import mongoose from 'mongoose';

const BasicInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  yearsOfExperience: {
    type: String,
    required: true,
  },
  profilePicture: {
    relativePath: String,
    original: String,
    thumbnail: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  collection: 'basic_info', // explicitly set collection name
  timestamps: true, // automatically handle createdAt and updatedAt
});

// Check if the model exists before creating a new one
const BasicInfo = mongoose.models.BasicInfo || mongoose.model('BasicInfo', BasicInfoSchema);

export default BasicInfo; 