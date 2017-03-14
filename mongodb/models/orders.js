var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: [String],
  quantity: Number
});

var orderSchema = new mongoose.Schema({
  id: Number,
  total: Number,
  cart: [productSchema],
  sessionId: Number,
  date: Date
});

orderSchema.plugin(autoIncrement.plugin, {model: 'Order', field: 'id', startAt: 100});

var Order = mongoose.model('Order', orderSchema);
