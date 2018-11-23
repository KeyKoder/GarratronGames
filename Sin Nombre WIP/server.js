var express = require('express');

var app = express();
var server = app.listen(4500,"localhost");

app.use(express.static('public'));

console.log("Test Game started!");

var socket = require("socket.io");
var io = socket(server);

var pos=[];
var names={};

io.sockets.on('connection', newConn);

function newConn(socket){
	console.log("new connection: "+socket.id);
}
