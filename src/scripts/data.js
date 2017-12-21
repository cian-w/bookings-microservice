var db = require('../../config/dbconfig.js');



module.exports = {

  // Insert booking
  insertBooking: function (bookingDetails, callback) {

      var title = bookingDetails.title;
      var desc = bookingDetails.description;
      var pitch = bookingDetails.pitch;
      var date = bookingDetails.date;
      var time = bookingDetails.time;
      var userid = bookingDetails.userid;

      var query = 'INSERT INTO Bookings (Title, Description, Pitch, DateAt, TimeAt, UserId) VALUES ("' + title + '", "' + desc +'", "' + pitch + '", "' + date +'", "' + time +'", "' + userid +'");';

      db.query(query, function (err,result){
          if(err) throw err;
          callback(result);
      });
  },

  // Get user's list of bookings
  getUserBookings: function (callback){
      var query = 'SELECT * FROM Bookings WHERE UserId = 2';

      db.query(query, function (err,result){
          if(err) throw err;
          callback(result);
      });
  },

  // Get all bookings in DB
  getAllBookings: function (callback){
      var query = 'SELECT * FROM Bookings';

      db.query(query, function (err,result){
          if(err) throw err;
          callback(result);
      });
  },

  // Search table for a given string
  searchData: function (searchTerm, callback) {
     var query = 'SELECT * FROM Bookings WHERE Title LIKE "' + searchTerm + '%" LIMIT 100;';

     db.query(query, function (err,result){
         if(err) throw err;
         callback(result);
     });
  },

  // Delete a booking
  deleteBooking: function (booking, callback){
      var id = booking.id;

      var query = 'DELETE FROM Bookings WHERE ID = "' + id + '"';

      db.query(query, function (err,result){
          if(err) throw err;
          callback(result);
      });
  },

  // Get bookings for astroturf Pitch
  getAstroBookings: function (callback){
      var query = 'SELECT * FROM Bookings WHERE Pitch = "Astro"';

      db.query(query, function (err,result){
          if(err) throw err;
          callback(result);
      });
  },

  // Get bookings for grass Pitch
  getGrassBookings: function (callback){
      var query = 'SELECT * FROM Bookings WHERE Pitch = "Grass"';

      db.query(query, function (err,result){
          if(err) throw err;
          callback(result);
      });
  },

};
