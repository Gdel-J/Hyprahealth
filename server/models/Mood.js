const { Schema, model } = require('mongoose');

const moodSchema = new Schema({
    type: {
        type: String
    },
    severity: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    },
    other: {
        type: String
    }
});

module.exports = moodSchema;
