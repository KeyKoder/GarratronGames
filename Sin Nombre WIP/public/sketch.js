var socket;
var terrain, nightTerrain, wetterrain, itemImg, player, map;
var tileSize=32;
var dayTime=true;
var framesUntilRain=null;
var rainTime=64*90;
var raining=false;
function preload() {
	terrain = loadImage('assets/terrain.png');
	nightTerrain = loadImage('assets/terrain_night.png');
	wetterrain = loadImage('assets/terrain_wet.png');
	itemImg = loadImage('assets/items.png');
	player = new Player(0,0);
	player.preload();
	zombie = new Zombie(10,11,2);
	monsters.push(zombie);
	//map = new Map(tileSize*8,tileSize*8+8);
}

var items = [];

var layer0 = [
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4],
	[4,4,4,4,4,4,4,4,4,4,4,4]
];

var layer1 = [[
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,3,3,3,3,3,3,3,3],
	[1,1,1,1,3,3,3,3,3,3,3,3],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
],[
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[3,3,3,3,3,3,3,3,1,1,1,1],
	[3,3,3,3,3,3,3,3,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
]];

var layer2 = [[
	[0,2,0,0,0,0,0,0,0,0,0,0],
	[2,2,3,0,0,1,0,0,3,0,0,0],
	[0,0,0,0,0,2,0,0,0,0,0,0],
	[0,0,0,0,0,1,0,0,0,0,0,0],
	[0,0,0,0,0,3,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,3,0,0,0,0,0,0,3,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,1,1,1,1],
	[0,0,0,0,0,0,0,0,0,0,0,0]
],[
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,1,1,1,1,1,1,1,1,1,1,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0]
]];

var layer3 = [[
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0]
],[
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0]
]];

/*var resourceLayer = [
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0],
	[0,0,0,0,0,0,0,0,0,0,0,0]
];*/

var mapBorders = [{
	"up": null,
	"down": null,
	"left": null,
	"right": 1
}, {
	"up": null,
	"down": null,
	"left": 0,
	"right": null
}];

var rocks=[], logs=[], minerals=[], portals=[], monsters=[];
function setup(){
	createCanvas(tileSize*12,tileSize*12+player.inventory.sizeY);
	background(0);
	//frameRate(64);
	angleMode(DEGREES);
	framesUntilRain=random(64*60*5,64*60*10);

	//socket = io.connect('http://10.0.0.7:4500');

	/*for(var x=0;x<=terrain.width-tileSize;x+=tileSize){
		for(var y=0;y<=terrain.height-tileSize;y+=tileSize){
			image(terrain,x,y,tileSize,tileSize,x,y,tileSize,tileSize);
		}
	}*/

	/*for(var r=0;r<layer3.length;r++){
		for(var t=0;t<layer3[r].length;t++){
			if(layer3[r][t]!=0){
				portals.push({
					"x":t*32,
					"y":r*32,
					"type":layer3[r][t]
				});
			}
		}
	}*/
}
function draw(){
	if(frameCount%(64*1200)==0){
		dayTime=!dayTime;
		raining=false;
		player.hunger--;
	}

	/*if(!dayTime){
		if(frameCount%framesUntilRain==0){
			raining=true;
		}

		if(raining && frameCount%rainTime==0){
			raining=false;
			framesUntilRain=random(64*60*5,64*60*10);
		}
	}*/

	for(var r=0;r<layer0.length;r++){
		for(var t=0;t<layer0[r].length;t++){
			image(dayTime ? raining ? wetterrain : terrain : nightTerrain,t*tileSize,r*tileSize,tileSize,tileSize,layer0[r][t]*tileSize,0,tileSize,tileSize);
		}
	}

	for(var r=0;r<layer1[player.mapId].length;r++){
		for(var t=0;t<layer1[player.mapId][r].length;t++){
			image(dayTime ? raining ? wetterrain : terrain : nightTerrain,t*tileSize,r*tileSize,tileSize,tileSize,layer1[player.mapId][r][t]*tileSize,0,tileSize,tileSize);
		}
	}

	for(var r=0;r<layer2[player.mapId].length;r++){
		for(var t=0;t<layer2[player.mapId][r].length;t++){
			if(layer2[player.mapId][r][t]>0 && layer2[player.mapId][r][t]<3 && rocks.length<layer2[player.mapId].count2d(1)+layer2[player.mapId].count2d(2))
				rocks.push(new Rock(t, r, layer2[player.mapId][r][t]==2 ? true : false));
		}
	}

	for(var r=0;r<layer2[player.mapId].length;r++){
		for(var t=0;t<layer2[player.mapId][r].length;t++){
			if(layer2[player.mapId][r][t]>2 && layer2[player.mapId][r][t]<7 && logs.length<layer2[player.mapId].count2d(3)+layer2[player.mapId].count2d(4)+layer2[player.mapId].count2d(5)+layer2[player.mapId].count2d(6))
				logs.push(new Log(t, r, layer2[player.mapId][r][t]-3));
		}
	}

	for(var r=0;r<layer2[player.mapId].length;r++){
		for(var t=0;t<layer2[player.mapId][r].length;t++){
			if(layer2[player.mapId][r][t]==7 && minerals.length<layer2[player.mapId].count2d(7))
				minerals.push(new Iron(t, r, true));
		}
	}

	for(var r=0;r<rocks.length;r++){
		rocks[r].update();
		rocks[r].show();
	}

	for(var l=0;l<logs.length;l++){
		logs[l].update();
		logs[l].show();
	}

	for(var m=0;m<minerals.length;m++){
		minerals[m].update();
		minerals[m].show();
	}

	for(var i=0;i<items.length;i++){
		items[i].show();
		items[i].update();
	}

	zombie.show();
	zombie.update();

	player.show();
	player.alwaysUpdate();
	if(frameCount%7==0){
		player.update();
	}

	for(var r=0;r<layer3[player.mapId].length;r++){
		for(var t=0;t<layer3[player.mapId][r].length;t++){
			// Uncomment commented for "Portal" like portals 
			//frameCount%2==0 ? tint(0,255,255) : tint(255,200,0)
			image(dayTime ? raining ? wetterrain : terrain : nightTerrain,t*tileSize,r*tileSize,tileSize,tileSize,layer3[player.mapId][r][t]*tileSize,64,tileSize,tileSize);
			//tint(255);
		}
	}

	/*var portalCount=[0,0,0,0];
	var prevPortalCount=[0,0,0,0];
	for(var r=0;r<layer3.length;r++){
		for(var t=0;t<layer3[r].length;t++){
			portalCount[layer3[r][t]-1]++;
			if(layer3[r][t]==1){
				portalCount[0]==0 ? tint(1/portalCount[0]*255,128,0) : tint(1/prevPortalCount[0]*255,128,0);
			}else if(layer3[r][t]==2){
				portalCount[1]==0 ? tint(0,1/portalCount[1]*255,0) : tint(0,1/prevPortalCount[1]*255,0);
			}
			image(terrain,t*tileSize,r*tileSize,tileSize,tileSize,layer3[r][t]*tileSize,64,tileSize,tileSize);
			tint(255);
			prevPortalCount[layer3[r][t]-1]++;
		}
	}*/

	/*for (var l=0;l<layers.length;l++){
		for(var r=0;r<layers[l].length;r++){
			for(var t=0;t<layers[l][r].length;t++){
				image(terrain,t*tileSize,r*tileSize,tileSize,tileSize,layers[l][r][t]*tileSize,tileSize,tileSize,tileSize);
			}
		}
	}*/
	player.inventory.show();
}

function keyPressed(){
	player.keyPress(key, keyCode);
}

function keyReleased(){
	player.keyRelease();
}

function resetEnvironment(){
	rocks=[];
	logs=[];
	minerals=[];
	portals=[];
}

/* Default Modifications */
Array.prototype.insert=function(index, element) {
	this.splice(index, 0, element);
}

Array.prototype.end=function(){
	return this[this.length];
}

Array.prototype.columnShift2d = function(x,dir){
	var tmpArr=[];
	for(var r=0;r<this.length;r++){
		tmpArr.push(this[r][x]);
	}
	if(dir==-1){
		tmpArr.push(tmpArr.shift());
	}else if(dir==1){
		tmpArr.insert(0,tmpArr.pop(tmpArr.end()));
	}
	for(var i=0;i<tmpArr.length;i++){
		this[i][x]=tmpArr[i];
	}

	return tmpArr;
}

Array.prototype.rowShift2d = function(y,dir){
	if(dir==-1){
		this[y].push(this[y].shift());
	}else if (dir==1){
		this[y].insert(0,this[y].pop(this.end()));
	}
}

Array.prototype.count = function(elem){
	count=0;
	if(typeof(elem)==undefined){
		throw "Array.count() needs something to count!";
	}else{
		for(var i=0;i<this.length;i++){
			if(this[i]==elem){
				count++;
			}
		}
		return count;
	}
}

Array.prototype.count2d = function(elem){
	count=0;
	if(typeof(elem)==undefined){
		throw "Array.count2d() needs something to count!";
	}else{
		for(var i=0;i<this.length;i++){
			for(var j=0;j<this[i].length;j++){
				if(this[i][j]==elem){
					count++;
				}
			}
		}
		return count;
	}
}

Array.prototype.equals = function(array){
	bool=true;
	if(typeof(array)==undefined){
		throw "Array.equals() needs something to compare to!";
	}else{
		for(var i=0;i<this.length;i++){
			for(var j=0;j<array.length;j++){
				if(j==i)
					bool=bool && this[i]==array[j];
			}
		}
		return bool;
	}
}

Array.prototype.equals2d = function(array){
	bool=true;
	if(typeof(array)==undefined){
		throw "Array.equals2d() needs something to compare to!";
	}else{
		for(var i=0;i<this.length;i++){
			for(var j=0;j<array.length;j++){
				if(i == j)
					bool = bool && this[i].equals(array[j]);
			}
		}
		return bool;
	}
}