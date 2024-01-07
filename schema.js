const mongoose = require('mongoose');

// Create a Mongoose schema
const DrugIssueSchema = new mongoose.Schema({
  selectedProduct: {
    type: String,
    required: true
  },
  selectedManufacturer: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  age: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  sex: {
    type: String,
    enum: ['male', 'female', 'other'],
    required: true
  },
  onsetDate: {
    type: Date,
    required: true
  },
  symptoms: {
    type: String,
    required: true
  },
  drugIssues: {
    type: String,
    required: true
  }
});

// Create a Mongoose model
const DrugIssue = mongoose.model('DrugIssue', DrugIssueSchema);

module.exports = DrugIssue;
