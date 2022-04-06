const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^https?:\/\/(www\.)?[-\w.-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-z0-9()]{2,}\b([-\w.-._~:/?#[\]@!$&'()*+,;=]*)?/i.test(v);
      },
    },
  },
  owner: {
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  likes: [{
    ref: 'user',
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
