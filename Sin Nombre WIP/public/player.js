function Player(x,y){
	this.dir=32;
	this.facing="";
	this.x=x*32;
	this.y=y*32;
	this.image="";
	this.nightImage="";
	this.wetImage="";
	this.move=false;
	this.canBreakStones=false;
	this.breakingStone=false;
	this.newX=x;
	this.newY=y;
	this.crafting=false;
	this.mapId=0;
	this.viewMap=false;

	this.health=10;
	this.hunger=6;

	this.inventory = new Inventory();

	this.preload= function(){
		//this.image = loadImage('assets/player'+floor(random(0,4))+'.png');
		this.image = loadImage('assets/player.png');
		this.nightImage = loadImage('assets/player_night.png');
		this.wetImage = loadImage('assets/player_wet.png');
	}

	this.hit = function(damage) {
		this.health-=damage;
	}

	this.changeMap = function(id) {
		this.mapId=id;
		resetEnvironment();
	}

	this.alwaysUpdate = function() {
		if(this.crafting){
			this.inventory.showCrafting();
		}

		if(this.viewMap){
			map.show();
		}

		if(this.health>10)
			this.health=10;

		if(this.hunger>6)
			this.hunger=6;		
		/*if(frameCount%(30*60)==0){
			this.hunger++;
		}
		push();
		fill(255);
		text(this.hunger,10,20);
		pop();*/
	}

	this.update = function() {
		if(this.move){
			this.newX=this.x;
			this.newY=this.y;
			if(this.dir==96){
				if(layer2[this.mapId][this.y/tileSize][(this.x/tileSize)-1]==0/* || (layer3[this.mapId][this.y/tileSize][this.x/tileSize]==2 && this.x==0 && layer2[this.mapId][this.y/tileSize][(width-tileSize)/tileSize]==0)*/){
					this.x-=tileSize;
				}else{
					if(this.x<1){
						if(mapBorders[this.mapId]["left"]==null){
							this.x=0
						}else{
							this.changeMap(mapBorders[this.mapId]["left"]);
							this.x=width-tileSize;
						}
					}
				}
			}else if(this.dir==32){
				if(layer2[this.mapId][this.y/tileSize][(this.x/tileSize)+1]==0/* || (layer3[this.mapId][this.y/tileSize][this.x/tileSize]==1 && this.x==width-tileSize && layer2[this.mapId][this.y/tileSize][0]==0)*/){
					this.x+=tileSize;
				}else{
					if(this.x>width-tileSize-1){
						if(mapBorders[this.mapId]["right"]==null){
							this.x=width-tileSize;
						}else{
							this.changeMap(mapBorders[this.mapId]["right"]);
							this.x=0;
						}
					}
				}
			}else if(this.dir==64){
				if(this.y<height-tileSize*3){
					if(layer2[this.mapId][(this.y/tileSize)+1][this.x/tileSize]==0){
						this.y+=tileSize;
					}
				}else{
					if(this.y>height-tileSize*3-1){
						if(mapBorders[this.mapId]["down"]==null){
							this.y=height-tileSize*3;
						}else{
							this.changeMap(mapBorders[this.mapId]["down"]);
							this.y=0;
						}
					}
				}
				/*}else{
					if(layer3[this.mapId][this.y/tileSize][this.x/tileSize]==4 && layer2[this.mapId][0][this.x/tileSize]==0){
						this.y+=tileSize;
						if(this.y>height-tileSize*2){
							if(mapBorders[this.mapId]["down"]==null){
								this.y=heigt-tileSize*2;
							}else{
								this.changeMap(mapBorders[this.mapId]["down"]);
								this.y=0;
							}
						}
					}
				}*/
			}else if (this.dir==0){
				if(this.y>0){
					if(layer2[this.mapId][(this.y/tileSize)-1][this.x/tileSize]==0){
						this.y-=tileSize;
					}
				}else{
					if(this.y<1){
						if(mapBorders[this.mapId]["down"]==null){
							this.y=0;
						}else{
							this.changeMap(mapBorders[this.mapId]["down"]);
							this.y=height-tileSize*3;
						}
					}
				}/*else{
					if(layer3[this.mapId][this.y/tileSize][this.x/tileSize]==3 && layer2[this.mapId][(height-tileSize*2)/tileSize][this.x/tileSize]==0){
						this.y-=tileSize;
						if(this.y<0){
							if(mapBorders[this.mapId]["up"]==null){
								this.y=0;
							}else{
								this.changeMap(mapBorders[this.mapId]["up"]);
								this.y=height-tileSize*2;
							}
						}
					}
				}*/
			}
		}
	}

	this.keyPress = function(key, keyCode) {
		if(!this.crafting){
			if (key == 'a' || keyCode == LEFT_ARROW){
				this.move=true;
				this.dir=96;
			}else if (key == 'd' || keyCode == RIGHT_ARROW){
				this.move=true;
				this.dir=32;
			}else if (key == 's' || keyCode == DOWN_ARROW){
				this.move=true;
				this.dir=64;
			}else if (key == 'w' || keyCode == UP_ARROW){
				this.move=true;
				this.dir=0;
			}else if (key == 'q'){
				this.breakStone();
				this.hitNearby();
			}/*else if (key == 'i'){
				this.inventory.open();
			}*//*else if(key == 'e'){
				if(this.dir==32){
					if(this.inventory.selectedSlot==4 && this.inventory.resources["stone"]>0){
						rocks.push(new Rock(this.x+1, this.y, false));
						layer2[this.y/tileSize][(this.x+1)/tileSize]=1;
					}
				}else if(this.dir==96){
					if(this.inventory.selectedSlot==4 && this.inventory.resources["stone"]>0){
						rocks.push(new Rock(this.x-1, this.y, false));
						layer2[this.y/tileSize][(this.x-1)/tileSize]=1;
					}
				}else if(this.dir==0){
					if(this.inventory.selectedSlot==4 && this.inventory.resources["stone"]>0){
						rocks.push(new Rock(this.x, this.y-1, false));
						layer2[(this.y-1)/tileSize][this.x/tileSize]=1;
					}
				}else if(this.dir==64){
					if(this.inventory.selectedSlot==4 && this.inventory.resources["stone"]>0){
						rocks.push(new Rock(this.x, this.y+1, false));
						layer2[(this.y+1)/tileSize][this.x/tileSize]=1;
					}
				}
			}*/
		}

		if(this.crafting){
			if(keyCode == LEFT_ARROW){
				if(this.inventory.craftingSlot[1]==1){
					if(this.inventory.craftingSlot[0]<4){
						if(this.inventory.craftingSlot[0]==2)
							this.inventory.craftingSlot[0]=4;
						else
							this.inventory.craftingSlot[0]++;
					}
				}else{
					if(this.inventory.craftingSlot[0]<2)
						this.inventory.craftingSlot[0]++;
				}
			}else if(keyCode == RIGHT_ARROW){
				if(this.inventory.craftingSlot[0]>0){
					if(this.inventory.craftingSlot[1]==1){
						if(this.inventory.craftingSlot[0]==4)
							this.inventory.craftingSlot[0]=2;
						else
							this.inventory.craftingSlot[0]--;
					}else{
						if(this.inventory.craftingSlot[0]>0)
							this.inventory.craftingSlot[0]--;
					}
				}
			}else if(keyCode == UP_ARROW){
				if(this.inventory.craftingSlot[1]>0)
					if(this.inventory.craftingSlot[0]<=2)
						this.inventory.craftingSlot[1]--;
			}else if(keyCode == DOWN_ARROW){
				if(this.inventory.craftingSlot[1]<2)
					if(this.inventory.craftingSlot[0]<=2)
						this.inventory.craftingSlot[1]++;
			}else if(key == 'z'){
				this.inventory.pushToCraftingGrid();
			}else if(key == 'x'){
				this.inventory.getFromCraftingGrid();
			}else if(keyCode == ENTER){
				this.inventory.craft();
			}
		}
		if (key == '1'){
			this.inventory.selectedSlot=0;
		}else if (key == '2'){
			this.inventory.selectedSlot=1;
		}else if (key == '3'){
			this.inventory.selectedSlot=2;
		}else if (key == '4'){
			this.inventory.selectedSlot=3;
		}else if (key == '5'){
			this.inventory.selectedSlot=4;
		}else if (key == '6'){
			this.inventory.selectedSlot=5;
		}else if (key == '7'){
			this.inventory.selectedSlot=6;
		}else if (key == '8'){
			this.inventory.selectedSlot=7;
		}

		if(key == 'r'){
			if(this.crafting)
				this.inventory.getAllFromCraftingGrid();
			this.crafting=!this.crafting;
			this.craftingInventory();
		}/*else if(key == 'm'){
			this.viewMap=!this.viewMap;
		}*/
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

	this.hitNearby = function() {
		hitForce=2;
		for(var i=0;i<monsters.length;i++){
			if(this.dir==32){
				if((monsters[i].x==this.x+tileSize || monsters[i].x==this.x+tileSize*2) && monsters[i].y==this.y){
					monsters[i].hit(hitForce);
					return;
				}
			}else if(this.dir==96){
				if((monsters[i].x==this.x-tileSize || monsters[i].x==this.x-tileSize*2) && monsters[i].y==this.y){
					monsters[i].hit(hitForce);
					return;
				}
			}else if(this.dir==0){
				if(monsters[i].x==this.x && (monsters[i].y==this.y-tileSize || monsters[i].y==this.y-tileSize*2)){
					monsters[i].hit(hitForce);
					return;
				}
			}else if(this.dir==64){
				if(monsters[i].x==this.x && (monsters[i].y==this.y+tileSize || monsters[i].y==this.y+tileSize*2)){
					monsters[i].hit(hitForce);
					return;
				}
			}
		}
	}

	this.keyRelease = function() {
		this.move=false;
	}

	this.craftingInventory = function() {
		this.inventory.showCrafting();
		this.move=false;
	}

	this.show = function(){
		image(dayTime ? raining ? this.wetImage : this.image : this.nightImage,this.x,this.y,32,32,this.dir,0,32,32);
	}
}