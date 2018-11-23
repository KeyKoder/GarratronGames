function Zombie(x,y,speed){
	this.dir=32;
	this.facing="";
	this.x=x*32;
	this.y=y*32;
	this.image=loadImage('assets/zombie.png');
	this.nightImage=loadImage('assets/zombie_night.png');
	this.wetImage=loadImage('assets/zombie_wet.png');
	this.move=true;
	this.mapId=0;

	this.health=10;
	this.path=[];
	this.speed=speed;
	this.atkSpeed=2;
	this.atk=1;

	this.alwaysUpdate = function() {
		if(this.health>10)
			this.health=10;	
		/*if(frameCount%(30*60)==0){
			this.hunger++;
		}
		push();
		fill(255);
		text(this.hunger,10,20);
		pop();*/
	}

	this.gotoXY = function(pos) {
		if(this.x>pos[0]*32)
			this.dir=96;
		else if(this.x<pos[0]*32)
			this.dir=32;
		else if(this.y>pos[1]*32)
			this.dir=0;
		else if(this.y<pos[1]*32)
			this.dir=64;

		this.x=pos[0]*32;
		this.y=pos[1]*32;
	}

	this.changeMap = function(id) {
		this.mapId=id;
	}

	this.update = function() {
		if(this.move){
			if(frameCount%(9*this.speed)==0){
				if(player.mapId==this.mapId){
					this.path=findPath(layer2[this.mapId], [this.x/tileSize, this.y/tileSize], [player.x/tileSize, player.y/tileSize]);
					this.path.splice(this.path.length-1,1);
					if(this.path[1]!=undefined)
						this.gotoXY(this.path[1]);
				}else{
					for(var i=0;i<mapBorders.length;i++){
						for(var d in mapBorders[i]){
							if(mapBorders[i][d]==player.mapId){
								if(d=="up"){
									this.path=findPath(layer2[this.mapId], [this.x/tileSize, this.y/tileSize], [player.x/tileSize, 0]);
									if(this.path[1]!=undefined)
										this.gotoXY(this.path[1]);
									this.gotoXY(this.x/tileSize, -1/32);
								}else if(d=="down"){
									this.path=findPath(layer2[this.mapId], [this.x/tileSize, this.y/tileSize], [player.x/tileSize, (height-tileSize*2)/tileSize]);
									if(this.path[1]!=undefined)
										this.gotoXY(this.path[1]);
									this.gotoXY(this.x/tileSize, (height/tileSize-3)+1/32);
								}else if(d=="left"){
									this.path=findPath(layer2[this.mapId], [this.x/tileSize, this.y/tileSize], [0, player.y/tileSize]);
									if(this.path[1]!=undefined)
										this.gotoXY(this.path[1]);
									this.gotoXY(-1/32, this.y/tileSize);
								}else if(d=="right"){
									this.path=findPath(layer2[this.mapId], [this.x/tileSize, this.y/tileSize], [width/tileSize, player.y/tileSize]);
									if(this.path[1]!=undefined)
										this.gotoXY(this.path[1]);
									this.gotoXY(width/tileSize+1/32, this.y/tileSize);
								}
							}
						}
					}
				}
			}

			if(this.x<1){
				if(mapBorders[this.mapId]["left"]==null){
					this.x=0
				}else{
					this.changeMap(mapBorders[this.mapId]["left"]);
					this.x=width-tileSize;
				}
			}
			if(this.x>width-tileSize-1){
				if(mapBorders[this.mapId]["right"]==null){
					this.x=width-tileSize;
				}else{
					this.changeMap(mapBorders[this.mapId]["right"]);
					this.x=0;
				}
			}
			if(this.y>height-tileSize*3-1){
				if(mapBorders[this.mapId]["down"]==null){
					this.y=height-tileSize*3;
				}else{
					this.changeMap(mapBorders[this.mapId]["down"]);
					this.y=0;
				}
			}
			if(this.y<1){
				if(mapBorders[this.mapId]["down"]==null){
					this.y=0;
				}else{
					this.changeMap(mapBorders[this.mapId]["down"]);
					this.y=height-tileSize*3;
				}
			}
		}

		if(frameCount%(28*this.atkSpeed)==0 && dist(player.x, player.y, this.x, this.y)<33){
			if(player.mapId==this.mapId)
				player.hit(this.atk);		
		}
	}

	this.hit = function(damage) {
		this.health-=damage;
	}

	this.breakStone = function() {
		breakForce=0.5;
		for(var i=0;i<rocks.length;i++){
			if(this.dir==32){
				if(rocks[i].x==this.x+tileSize && rocks[i].y==this.y){
					rocks[i].hit(breakForce);
					return;
				}
			}else if(this.dir==96){
				if(rocks[i].x==this.x-tileSize && rocks[i].y==this.y){
					rocks[i].hit(breakForce);
					return;
				}
			}else if(this.dir==0){
				if(rocks[i].x==this.x && rocks[i].y==this.y-tileSize){
					rocks[i].hit(breakForce);
					return;
				}
			}else if(this.dir==64){
				if(rocks[i].x==this.x && rocks[i].y==this.y+tileSize){
					rocks[i].hit(breakForce);
					return;
				}
			}
		}

		for(var i=0;i<minerals.length;i++){
			if(this.dir==32){
				if(minerals[i].x==this.x+tileSize && minerals[i].y==this.y){
					minerals[i].hit(breakForce);
					return;
				}
			}else if(this.dir==96){
				if(minerals[i].x==this.x-tileSize && minerals[i].y==this.y){
					minerals[i].hit(breakForce);
					return;
				}
			}else if(this.dir==0){
				if(minerals[i].x==this.x && minerals[i].y==this.y-tileSize){
					minerals[i].hit(breakForce);
					return;
				}
			}else if(this.dir==64){
				if(minerals[i].x==this.x && minerals[i].y==this.y+tileSize){
					minerals[i].hit(breakForce);
					return;
				}
			}
		}

		breakForce=0.25;
		for(var i=0;i<logs.length;i++){
			if(this.dir==32){
				if(logs[i].x==this.x+tileSize && logs[i].y==this.y){
					logs[i].hit(breakForce);
					return;
				}
			}else if(this.dir==96){
				if(logs[i].x==this.x-tileSize && logs[i].y==this.y){
					logs[i].hit(breakForce);
					return;
				}
			}else if(this.dir==0){
				if(logs[i].x==this.x && logs[i].y==this.y-tileSize){
					logs[i].hit(breakForce);
					return;
				}
			}else if(this.dir==64){
				if(logs[i].x==this.x && logs[i].y==this.y+tileSize){
					logs[i].hit(breakForce);
					return;
				}
			}
		}
	}

	this.show = function(){
		if(player.mapId==this.mapId && this.health>0)
			image(dayTime ? raining ? this.wetImage : this.image : this.nightImage,this.x,this.y,32,32,this.dir,0,32,32);
	}
}