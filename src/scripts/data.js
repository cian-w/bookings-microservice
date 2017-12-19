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
  }

};
