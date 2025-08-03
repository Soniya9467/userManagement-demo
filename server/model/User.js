const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  mobile: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Mobile number must be exactly 10 digits'],
  },
  email: { type: String },
  password: String,
  role: { type: String, enum: ['admin', 'manager', 'user',"developer"], default: 'developer' },
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', userSchema);
