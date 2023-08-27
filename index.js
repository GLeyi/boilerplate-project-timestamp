// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get("/api/:date?", function (req, res) {
  const weekday = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  let date;

  if (req.params.date == null) {
    // console.log("Empty date");
    date = new Date();
  } else if (/^\d+$/.test(req.params.date)) {
    date = new Date(req.params.date * 1);
  } else {
    date = new Date(req.params.date);
  }

  // console.log(date);
  // console.log(date.toUTCString());

  if (date.toString() === 'Invalid Date') {
    res.json({'error': 'Invalid date'});
  } else {
    // let dateString = weekday[date.getDay()] + ', ' + [date.getDate(), month[date.getMonth()], date.getFullYear()].join(' ') + ' 00:00:00 GMT';
    let dateString = weekday[date.getDay()] + ', ' + [date.getDate(), month[date.getMonth()], date.getFullYear()].join(' ') + ' ' + date.toUTCString().slice(17, 29);
    // let dateString = weekday[date.getDay()] + ', ' + [date.getDate(), month[date.getMonth()], date.getFullYear()].join(' ') + ' ' + [date.getUTCHours(), date.getMinutes(), date.getSeconds()].join(':');
    res.json({'unix': date.getTime(), 'utc': date.toUTCString()});
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
