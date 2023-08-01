const mongoose = require('mongoose');

const { Schema } = mongoose;

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

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;
