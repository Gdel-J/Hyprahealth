const { Schema, model } = require('mongoose');

const mealSchema = new Schema({
    item: {
        type: String,
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
      },
    time: {
        type: Date,
        default: Date.now
    }
});

module.exports = mealSchema;
