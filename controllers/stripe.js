var express = require('express');
var app = express();
var router = express.Router();
var Promise = require("bluebird");
var stripeKey = app.get('env') === 'development' ? 'sk_test_CPnhgK5G4Oeyev1Uf2NzANsN' : 'sk_live_VM7haftBTdfcSka3JJ7CNayK';
var stripe = require('stripe')(stripeKey);

router.get('/charge/kalabox-pro-year', function(req, res) {
  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var stripeToken = req.query.id;

  stripe.charges.create({
    amount: 89.00 * 100,
    currency: "usd",
    source: stripeToken,
    description: "Kalabox Pro Year Pre-sale"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log(err);
      return 'An error occurred when attempting to charge your card. Please try again.'
    } else {
      res.redirect('/kalabox-pro?msg=Thanks for your purchase!');
      console.log(charge);
      return charge;
    }
  });
});

router.get('/charge/kalabox-pro-month', function(req, res) {
  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var stripeToken = req.query.id;
  stripe.charges.create({
    amount: 9 * 100,
    currency: "usd",
    source: stripeToken,
    description: "Kalabox Pro Month Pre-sale"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      console.log('error', err);
      return 'An error occurred when attempting to charge your card. Please try again.'
    } else {
      console.log('charge', charge);
      res.redirect('/kalabox-pro?msg=Thanks for your purchase!');
      return charge;
    }
  });
});

module.exports = router;