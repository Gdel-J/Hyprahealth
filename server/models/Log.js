const mongoose = require('mongoose');

const { Schema } = mongoose;
const Meal = require("./Meal");
const Exercise = require("./Exercise");
const Mood = require("./Mood")

const logSchema = new Schema({
  meals: [Meal],
  exercises: [Exercise],
  moods: [Mood]
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
