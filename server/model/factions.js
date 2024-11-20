const mongoose = require('mongoose');

const factionSchema = new mongoose.Schema({
  factionname: {
    type: String,
    required: true,
},
  picture: {
    type: String,
},
  inventory: [{
    type: String,
    items: [ ]
}],
    // other faction properties
});

module.exports = mongoose.model('Faction', factionSchema);
