var socket, rslider, gslider, bslider, sizeslider;
var rlabel, glabel, blabel, sizelabel, clientListDiv;
var clearMineBtn;
function setup(){
	createCanvas(400,400);
	background(0)
	// color sliders
	sliderX=450;
	rslider = createSlider(0,255,255);
	rslider.position(sliderX,0);
	rslider.style('width','255px');
	rlabel = createSpan('Red: ');
	rlabel.position(sliderX+265,0);

	gslider = createSlider(0,255,255);
	gslider.position(sliderX,40);
	gslider.style('width','255px');
	glabel = createSpan('Green: ');
	glabel.position(sliderX+265,40);

	bslider = createSlider(0,255,255);
	bslider.position(sliderX,80);
	bslider.style('width','255px');
	blabel = createSpan('Blue: ');
	blabel.position(sliderX+265,80);

	sizeslider = createSlider(0,30,20);
	sizeslider.position(sliderX,120);
	sizeslider.style('width','255px');
	sizelabel = createSpan('Size: ');
	sizelabel.position(sliderX+265,120);

	nameinput = createInput("User "+floor(random()*1000));
	nameinput.input(showNames);
	nameinput.position(sliderX, 160);
	nameinput.attribute("placeholder","Username");

	clearMineBtn = createButton("Clear my drawing");
	clearMineBtn.position(sliderX, 200);
	clearMineBtn.mousePressed(clearMine);


	clientListDiv = createDiv('User List: ');
	clientListDiv.position(sliderX+400, 0);


	socket = io.connect('http://localhost:3000');

	socket.on('mouse', newDrawing);
	socket.on('clientList', setClientList);
	socket.on('keepFromClear', clearFromId);

	socket.emit("nameChanged", {"name":nameinput.value()});
}

function clearFromId(data){
	background(0);
	for(var i=0;i<data.list.length;i++){
		newDrawing(data.list[i]);
	}
}

function clearMine(){
	socket.emit('clear', {});
}

function showNames(){
	socket.emit("nameChanged", {"name":this.value()});
}

function setClientList(data){
	clientListDiv.html("User List: ")
	for(var i=0;i<data.clientList.length;i++){
		clientListDiv.html("<br>"+data.clientList[i],true)
	}
}

function newDrawing(data){
	noStroke();
	fill(data.r,data.g,data.b);
	ellipse(data.x,data.y,data.size);
}

function draw(){
	rlabel.html("Red: "+rslider.value());
	glabel.html("Green: "+gslider.value());
	blabel.html("Blue: "+bslider.value());
	sizelabel.html("Size: "+sizeslider.value());
}

function mouseDragged(){
	var data = {
		"x":mouseX,
		"y":mouseY,
		"r":rslider.value(),
		"g":gslider.value(),
		"b":bslider.value(),
		"size":sizeslider.value()
	}
	socket.emit('mouse',data);

	noStroke();
	fill(rslider.value(),gslider.value(),bslider.value());
	ellipse(mouseX,mouseY,sizeslider.value());
}
