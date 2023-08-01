const { Schema, model } = require('mongoose');

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

module.exports = exerciseSchema;
