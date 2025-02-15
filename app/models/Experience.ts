import mongoose from 'mongoose';

const ExperienceSchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false,
  },
  isPresent: {
    type: Boolean,
    default: false,
  },
  description: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  companyLogo: {
    relativePath: String,
    original: String,
    thumbnail: String,
  },
  logo: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
}, {
  collection: 'workexperiences', // explicitly set collection name
  timestamps: true, // automatically handle createdAt and updatedAt
});

// Check if the model exists before creating a new one
const Experience = mongoose.models.Experience || mongoose.model('Experience', ExperienceSchema, 'workexperiences');

export default Experience; 