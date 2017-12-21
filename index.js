var express     = require('express');
var app         = express();
var data        = require('./src/scripts/data');
var http        = require('http');
var request     = require('request');
var bodyParser  = require('body-parser');

// Configure our Stripe secret key and object
var stripe = require('stripe')('');


app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

// Route used when loggin in
app.post('/book', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    // Parse the username and password
    var bookingDetails = JSON.parse(Object.keys(req.body)[0]);

    // Check with database for user credentials
    data.insertBooking(bookingDetails, function (result) {
        res.send(result);
    });
});

// STRIPE - Route used to charge credit card after receiving token
// from Stripe API
app.post('/charge', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    // Get token generate by Stripe
    var token = JSON.parse(Object.keys(req.body)[0]);
    token = token.id;
    console.log(token);

    // Create the charge object with data from the Vue.js client
    var newCharge = {
        amount: 4500,
        currency: "eur",
        source: token,
        description: 'Pitch Booking',
    };
    // Call the stripe objects helper functions to trigger a new charge
    stripe.charges.create(newCharge, function(err, charge) {
        // send response
        if (err){
            console.error(err);
            res.json({ error: err, charge: false });
        } else {
            // send response with charge data
            res.json({ error: false, charge: charge });
        }
    });
});

// Route used when deleting a booking
app.post('/delete', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    // Parse the request body
    var id = JSON.parse(Object.keys(req.body)[0]);

    data.deleteBooking(id, function (result) {
        res.send(result);
    });
});

app.get('/bookings', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    data.getUserBookings(function (result) {
        res.send(result);
    });
});

app.get('/allbookings', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    data.getAllBookings(function (result) {
        res.send(result);
    });
});


app.get('/grass', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    data.getGrassBookings(function (result) {
        res.send(result);
    });
});

app.get('/astro', function (req, res) {
    res.header("Access-Control-Allow-Origin", "*");

    data.getAstroBookings(function (result) {
        res.send(result);
    });
});

app.listen(8082, function () {
  console.log('Bookings service is running on port 8082!');
});
