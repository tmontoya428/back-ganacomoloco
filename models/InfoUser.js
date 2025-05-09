const mongoose = require('mongoose');

const InfoUserSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    birthdate: String,
    idCard: String,
    phone: String,
    city: String
});

module.exports = mongoose.model('InfoUser', InfoUserSchema);
