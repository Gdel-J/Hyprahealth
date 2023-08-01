const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
    type: {
        type: String,
    },
    duration: {
        type: Number,
    },
    intensity: {
        type: String
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
