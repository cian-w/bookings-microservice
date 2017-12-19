var express     = require('express');
var app         = express();
var data        = require('./src/scripts/data');
var http        = require('http');
var request     = require('request');
var bodyParser  = require('body-parser');

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
