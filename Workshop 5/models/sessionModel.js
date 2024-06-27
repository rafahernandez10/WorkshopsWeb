const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expire: { type: Date, default: Date.now, expires: 3600 } // 1 hora de expiración
});

module.exports = mongoose.model('Session', sessionSchema);
