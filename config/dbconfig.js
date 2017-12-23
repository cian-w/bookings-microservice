var mysql = require('mysql');
var db = mysql.createConnection({
    host     : '172.17.0.2',
    user     : 'root',
    password : 'dbpass',
    database : 'booking_app',
});

db.connect(function(err) {
    if (err) throw err;
});

module.exports = db;
