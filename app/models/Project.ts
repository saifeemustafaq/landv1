import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  image: {
    original: String,
    thumbnail: String,
  },
  link: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  skills: [{
    type: String,
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model if it doesn't exist, otherwise use the existing one
const Project = mongoose.models.Project || mongoose.model('Project', projectSchema);

export default Project; 