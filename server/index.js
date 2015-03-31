var 
	express = require('express')
  , exphbs  = require('express-handlebars')
  , app = express()
  , config = require('config')
  , routes = require('./routes/index')
  , mongoose = require('mongoose')
  , Socket_IO = require('socket.io')
  , Twitter = require('node-tweet-stream')
  , tweetStream = require("./utils/tweetStream")
  , path = require("path")
  ;

//require('node-jsx').install();

// Set view path
app.set('views', path.join(__dirname , '../server/views'));
//Set templating engine to handlebars
//app.set('view engine', 'hbs');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Disable etag headers on responses
app.disable('etag');

//Server static files
app.use(express.static( path.join(__dirname, '../server/public') ));

/*
var blocks = {};

hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});

hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});

*/
app.get('/',routes.index);

var port = process.env["PORT"] || config.port;
var host = config.bind_host || "127.0.0.1";
var server = app.listen(port, host, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});


var io = Socket_IO(server);

io.on('connection', function(socket){
  socket.on('event', function(data){
  	console.log("Event triggered", data);
  });
  socket.on('disconnect', function(){
  	console.log("socketio disconnected");
  });
});
 
mongoose.connect('mongodb://localhost/track_tweets');

// Start twitter streaming 
tweetStream( new Twitter(config.twitter) );