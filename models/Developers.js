const mongoose = require('mongoose');

let developerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,

    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },

    level: {
        type: String,
        required: true,
        validate: {
            validator: function (level) {
                return level.toString() === "BEGINNER" || level.toString() === "EXPERT";
            },
            message: 'Level is a String that can be either ‘BEGINNER or EXPERT’'
        }
    },

    address: {
        state: String,
        suburb: String,
        street: String,
        unit: Number,
    },

    // title: {
    //     type: String,
    //     required: true
    // },
    // isbn: String,
    // author: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Author'
    // },
    // created: {
    //     type: Date,
    //     default: Date.now
    // }
});

module.exports = mongoose.model('Developer', developerSchema);