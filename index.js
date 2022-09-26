const express = require('express');
const requestIp = require('request-ip');
const app = express();

app.set('port', (process.env.PORT || 5000));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/public');

app.use(requestIp.mw())
app.use(function(req, res, next) {
  const ip = req.clientIp;
  try{
    console.log("Client IP-1:", req.socket.remoteAddress);
  } catch(err){}
  console.log("Client IP-2:", ip);
  next();
});

app.get('/', function(request, response) {
  response.render('index.html');
});

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});

module.exports = app
