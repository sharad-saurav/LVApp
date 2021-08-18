const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  position: { type: String },
  location: { type: String },
  company: { type: String },
  logo: { type: String },
  type: { type: String },
  experience: { type: String },
  skills: { type: [String] },
});


schema.index({
  position: 'text',
  location: 'text',
  company: 'text',
  type: 'text',
  experience: 'text',
  skills: 'text'
});

const Job = mongoose.model('Job', schema);

module.exports = Job;
