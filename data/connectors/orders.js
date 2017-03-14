require('../../mongodb/models/db');
var mongoose = require('mongoose');

var Order = mongoose.model('Order');

var getOrders = function getOrders() {

    return Order.find()
                .sort([['cart.name', 'ascending']])
                .select("id total cart sessionId date")
                .exec();
};

var createOrder = function createOrder(args) {

  return Order.create({ total: args.total,
                 cart: args.cart,
                 sessionId: args.sessionId,
                 date: args.date }, function(err, post) {
    if(err){
      return(err);
    } else {
      return post.id;
    }
  });
};

module.exports = { getOrders,
                   createOrder };
