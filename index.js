var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);


var icy = require('icy');
var devnull = require('dev-null');
// URL to a known ICY stream
var url = 'http://radio-parasite.tetaneutral.net:8000/terre_blanque_mp3';


var Metadata = ''
// connect to the remote stream
icy.get(url, function (res) {

  // log the HTTP response headers
  console.error(res.headers);

  // log any "metadata" events that happen
  res.on('metadata', function (metadata) {
    var p = icy.parse(metadata);
    console.log(p.StreamTitle)
    if (typeof p.StreamTitle !== 'undefined'){
            io.emit('IceMeta', p.StreamTitle)
            console.log(p.StreamTitle)
    }

  });

  res.pipe(devnull())
})

app.get('/', function(req, res){
          res.sendfile('index.html');
});


io.on('connection', function(socket){
          console.log('a user connected');
});

http.listen(3000, function(){
          console.log('listening on *:3000');
});



