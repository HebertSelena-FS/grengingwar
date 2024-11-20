const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String
    },
    type: {
        type: String
    },
    description: {
        type: String
    },

    //future content work
    

})

module.exports = mongoose.model('Item', itemSchema);