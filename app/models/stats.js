var mongoose = require('mongoose');

var Schema =  mongoose.Schema;

var statSchema = new Schema({
  biggest_ride_distance: Number
});

var Stats = mongoose.model('Stats', statSchema);

module.exports = Stats;