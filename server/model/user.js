const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // Unique identifier provided by Google authentication
    googleId: {
        type: String,
        unique: true,
        required: true,
    },
    // User's name
    name: {
        type: String,
        required: true,
    },
    // User's email address
    email: {
        type: String,
        required: true,
    },
    // URL of the user's profile picture
    picture: {
        type: String,
    },
    inventory: [{
        name: { type: String, required: true },
        loot: { type: Number, default: 0 }
      }],
    bank: {type: Number, default:0 },// default
    level: [{
        name: { type: String, required: true },
        level: { type: Number, default: 0 },
        experience: { type: Number, default: 0 },
      }],
    faction: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: 'Faction'
    }],
    location: {
        type: String 
        
    },

    // References to tokens associated with the user
    tokens: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Token',
        },
    ],
});

// Export the schema as a mongoose model
module.exports = mongoose.model('User', userSchema);
