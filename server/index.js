var express = require('express');
var app = express();
var http = require('http');
var insecureServer = http.createServer(app);
var router = express.Router();

app.use('/', express.static('../dist/act-parking'));

var bodyParser = require('body-parser')
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
var port = process.env.PORT || 4400;
insecureServer.listen(port, function() {
  console.log('Insecure Server listening on port ' + port);
});

const existingBookings = [{
  name: 'Tyler',
  date: '2018-09-28T00:00:00Z'
}];


router.get('/bookings', function(req, res) {
  console.log('Something called the API')
  var weeklyBookings = getBookingsInNextSevenDays();
  res.status(200).send({
    bookings: weeklyBookings
  });
});

router.post('/bookings', function(req, res) {
  console.log(req.body);
  var booking = req.body;
  existingBookings.push(booking);
  var weeklyBookings = getBookingsInNextSevenDays();
  res.status(201).send({
    bookings: weeklyBookings
  });
});

app.use('/api', router);

function getBookingsInNextSevenDays(){
  var today = new Date();
  var weeklyBookings = [];

  for(var i = 0; i < existingBookings.length; i++){
    var existingBooking = existingBookings[i];
    var bookingDate = new Date(existingBooking.date);
    var timeDiff = Math.abs(bookingDate.getTime() - today.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24)); 

    if(diffDays <= 7){
      weeklyBookings.push(existingBooking);
    }
  }

  return weeklyBookings;
}
// router.route('/api/bookings').get(function(req, res) {
//   res.status(200).send({
//     bookings: existingBookings
//   });
// });

// router.route('/api/bookings').get(function(req, res) {
//   var booking = JSON.parse(req.body);
//   existingBookings.push(booking);
// });
