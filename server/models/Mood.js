const mongoose = require('mongoose');

const { Schema } = mongoose;

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

const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;
