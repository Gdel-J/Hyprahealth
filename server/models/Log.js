const { Schema, model } = require('mongoose');

const logSchema = new Schema({
  
});

const Log = model('Log', logSchema);

module.exports = Log;
