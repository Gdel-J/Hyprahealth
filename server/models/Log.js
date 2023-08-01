const { Schema, model } = require('mongoose');
const mealSchema = require("./Meal");
const exerciseSchema = require("./Exercise");
const moodSchema = require("./Mood")

const logSchema = new Schema({
  meals: [mealSchema],
  exercises: [exerciseSchema],
  moods: [moodSchema]
});

module.exports = logSchema;
