import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
  },
  content: { 
    type: String, 
    required: true,
    unique: true,
    trim: true,
  },
  tags: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Tag',
  }],
  author:  {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model('Blog', blogSchema);