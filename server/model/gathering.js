const mongoose = require('mongoose');

const gatheringSchema = new mongoose.Schema({
    item: String,
    quantity: { type: Number, default: 0 }
});

module.exports = mongoose.model('Gathering', gatheringSchema);
