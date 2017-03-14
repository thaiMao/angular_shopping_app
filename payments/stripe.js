// See your keys here: https://dashboard.stripe.com/account/apikeys
var stripe = require("stripe")(process.env.STRIPE_KEY);

var chargeCard = function(req, res){

    var token = req.body.stripeToken;
    var total = req.body.total;

    // Charge the user's card:

    try {
      var charge = stripe.charges.create({
        amount: total,
        currency: "gbp",
        description: "Example charge",
        source: token,
      }, function(err, charge) {
        // asynchronously called
        if(err) {
          console.log(err);
        } else {
          console.log(charge);
          res.json(charge);
        }

      });

    } catch(err) {
      console.log(err);
    }
}

module.exports = chargeCard;


