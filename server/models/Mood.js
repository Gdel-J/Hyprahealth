const { Schema, model } = require('mongoose');

const moodSchema = new Schema({
  
});

const Mood = model('Mood', moodSchema);

module.exports = Mood;
