var express = require('express')
var app = express()
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var bodyParser = require('body-parser');
var sanitizeHtml = require('sanitize-html');
var compression = require('compression')
var template = require('./lib/template.js');
var mysql = require('mysql');
 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.get('*', function(request, response, next){
  fs.readdir('./data', function(error, filelist){
    request.list = filelist;
    next();
  });
});

/*
var db = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'5933',
  database:'42_oasis'
});
db.connect();

pathList = [];

db.query(`select * from beverage`, function(error, topics){
  if (error) console.log(error);
  for (var i = 0; i < topics.length; i++)
    pathList.push(topics[i]);
}); 
*/

app.get('/', function(request, response) { 
  var cssPath = "/stylesheets/info_style.css";
  var body = template.info(cssPath, "/images/info.png");
  //var html = template.html("", body, "");
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
});

function insertDB(category, intraId, message) {
  if (category == 1) {
    db.query(`insert into beverage(intra_id, register_time, alarm_time) values(` + db.escape(intraId) + `, now(), now())`, function(error){
      if (error) console.log(error);
    });
  }
  else if (category == 2) {
    db.query(`insert into snack(intra_id, register_time, message, alarm_check) values(` + db.escape(intraId) + `, now(), `+ db.escape(message) + `, 1)`, function(error){
      if (error) console.log(error);
    });
  }
  else if (category == 3) {
    db.query(`insert into needs(intra_id, register_time, message, alarm_check) values(` + db.escape(intraId) + `, now(), `+ db.escape(message) + `, 1)`, function(error){
      if (error) console.log(error);
    });
  }
}

app.post('/register_process', function(request, response){
  var category = request.body.category;
  var intraId = request.body.intraId;
  var message = request.body.message;
  console.log(category, intraId, message);
  insertDB(category, intraId, message);
 
  response.redirect(`/register`);
  response.end();
});

app.get('/beverage', function(request, response) {
  var cssPath = "/stylesheets/album_style.css";
  var body = template.album(pathList.length, pathList, cssPath);
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
});

function getAlarmTime(date) {
  var ret = [];
  var hour = date.getHours();
  var minutes = date.getMinutes();
  console.log(hour, minutes);
  if (minutes >= 30 && minutes < 60)
    minutes = 30;
  else
    minutes = 0;
  hour += 2 + Math.floor((minutes + 30) / 60);
  hour = (hour) % 24;
  minutes = (minutes + 30) % 60;
  for (var i = 0; i < 8; ++i) {
    tmpHour = hour >= 0 && hour <= 9 ? "0" + hour : hour;
    tmpMinutes = minutes == 0 ? "0" + minutes : minutes;
    ret.push({hour:`${tmpHour}`, minutes:`${tmpMinutes}`});
    minutes += 30
    if ((minutes = minutes % 60) == 0) {
      hour += 1;
    }
    hour %= 24;
  }
  return (ret);
}

app.get('/register', function(request, response) {
  var date = new Date();
  alarmArr = getAlarmTime(date);
  var cssPath = "/stylesheets/register_beverage_style.css";
  var body = template.register_beverage(cssPath, alarmArr);
  
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
})

app.get('/register/snack', function(request, response) {
  var cssPath = "/stylesheets/register_snack_style.css";
  var body = template.register_snack(cssPath);
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
})

app.get('/register/etc', function(request, response) {
  var cssPath = "/stylesheets/register_etc_style.css";
  var body = template.register_etc(cssPath);
  var html = template.html(
    "",
    body,
    ""
  );
  response.send(html);
})

app.post('/register_beverage_post', function(request, response){
  var intraId = request.body.intraId;
  var alarmNum = request.body.alarm;
  console.log(intraId, alarmArr[alarmNum - 1]);
  response.redirect(`/register`);
  response.end();
});

app.post('/register_snack_post', function(request, response){
  var intraId = request.body.intraId;
  var message = request.body.message;
  var notification = request.body.notification;
  console.log(intraId, message, notification);
  response.redirect(`/register/snack`);
  response.end();
});

app.post('/register_etc_post', function(request, response){
  var intraId = request.body.intraId;
  var message = request.body.message;
  var notification = request.body.notification;
  console.log(intraId, message, notification);
  response.redirect(`/register/etc`);
  response.end();
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
});