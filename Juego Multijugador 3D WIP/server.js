var express = require('express');

var app = express();
var server = app.listen(3000,"localhost");

app.use(express.static('public'));

console.log("Drawing App started!");

var socket = require("socket.io");
var io = socket(server);

var pos=[];
var names={};

io.sockets.on('connection', newConn);

function newConn(socket){
	console.log("new connection: "+socket.id);
	for(var i=0;i<pos.length;i++){
		socket.emit('mouse', pos[i]);
	}
	changeName({"name":null});

	socket.on('mouse', mouseMsg);
	socket.on('nameChanged', changeName);
	socket.on('disconnect', disconnect);
	socket.on('clear', clearFromId);

	function clearFromId(){
		keepList=[]
		for(var i=pos.length-1;i>=0;i--){
			if(pos[i].id != socket.id){
				keepList.push(pos[i]);
			}else{
				pos.splice(i,1)
			}
		}
		io.sockets.emit('keepFromClear', {"list":keepList});
	}

	function disconnect(){
		delete names[socket.id];
		changeName({"name":null});
		clearFromId();
	}

	function changeName(data){
		if(data.name!=null){
			names[socket.id]=data.name;
		}
		var data = {
			"clientList":[]
		}

		for(var key in names){
			if(names.hasOwnProperty(key)){
				data.clientList.push(names[key]);
			}
		}

		io.sockets.emit('clientList', data);
	}

	function mouseMsg(data){
		var newData = {
			"x":data.x,
			"y":data.y,
			"r":data.r,
			"g":data.g,
			"b":data.b,
			"size":data.size,
			"id":socket.id
		}
		pos.push(newData);
		socket.broadcast.emit('mouse', data);
	}
}