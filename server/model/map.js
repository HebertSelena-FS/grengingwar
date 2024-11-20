const mongoose = require('mongoose');

const mapSchema = mongoose.Schema({
    _id: mongoose.Schema.Type.ObjectId,
    sector: {
        //add all sectors here i belive is steps to take
    },
    npc: {
        // need to refernce npc data collection
    },
    resources: {
        // need to reference resource collection 
    },
    items: {
        // reference items 
    },


    //future insertations
    // invasions: {
    //     //npc data and resource data 
    // },
    // rules: {
    //     // build rules for each map and there functions
    // }

})

module.exports = mongoose.model('Map', mapSchema);