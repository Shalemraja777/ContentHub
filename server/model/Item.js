import mongoose from 'mongoose';

// Define the schema for the Item model
const itemSchema =  mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: false
  },
  username: {
    type: String,
    required: true
  },
  categories: {
    type: [String], // Assuming categories is an array of strings
    required: false
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0 // Default value for likes is 0
}
});

// Create the Item model using the schema
const Item = mongoose.model('Item', itemSchema);

export default Item;
