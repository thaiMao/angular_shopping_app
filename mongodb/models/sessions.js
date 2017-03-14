var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: [String],
  quantity: Number
});

var sessionSchema = new mongoose.Schema({
  id: Number,
  searchedTerms: [String],
  addedToCart: [productSchema],
  sessionId: Number,
  date: Date
});

sessionSchema.plugin(autoIncrement.plugin, {model: 'Session', field: 'id', startAt: 100});

var Order = mongoose.model('Session', sessionSchema);
