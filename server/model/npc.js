const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const npcSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    health: {
        type: String,
    },
    location: {
        type: String
    },
    loot: {
        type: [ ]// random drop table
    },
    // // additional content to work on 
    // mechanics: {
    //     //information about how it works
    // },
    // attack: {
    //     type: Int32
    // },
    // defence: {
    //     type: Int32
    // },
    // attackspeed: {
    //     type: Int32
    // }

})

module.exports = mongoose.model('Npc', npcSchema);