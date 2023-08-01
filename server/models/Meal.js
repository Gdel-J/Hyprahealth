const { Schema, model } = require('mongoose');

const mealSchema = new Schema({
  
});

const Meal = model('Meal', mealSchema);

module.exports = Meal;
