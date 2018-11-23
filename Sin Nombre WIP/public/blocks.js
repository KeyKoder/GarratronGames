function Item(img, x, y, ix, iy, id, count){
	this.img=img;
	this.x=x*tileSize+8;
	this.y=y*tileSize+8;
	this.ix=ix;
	this.iy=iy;
	this.size=16;
	this.isize=32;
	this.angle=0;
	this.id=id;
	this.count=count;

	this.show = function() {
		//imageMode(CENTER);
		/*fill(0);
		rect(this.x, this.y, this.size, this.size);
		stroke(255);
		point(this.x, this.y);*/
		push();
		translate(this.x+8, this.y+8);
		rotate(this.angle);
		translate(-this.x-8, -this.y-8);
		image(this.img, this.x, this.y, this.size, this.size, this.ix, this.iy, this.isize, this.isize);
		pop();
		this.angle+=2;
		if(this.angle>360)
			this.angle=0;

		//imageMode(CORNER);
	}

	this.update = function() {
		// push();
		// translate(this.x+8, this.y+8);
		// rotate(this.angle);
		// rect(this.x, this.y, 16, 16);
		// translate(-this.x-8, -this.y-8);
		// pop();
		if((player.x>this.x-10 && player.x<this.x+10) && (player.y>this.y-10 && player.y<this.y+10)){
			items.pop(items.indexOf(this));
			player.inventory.pickup(this);
		}
	}
}

function Rock(x,y,semibroke){
	semibroke ? this.brokenPercent=2.5 : this.brokenPercent=0; // Up to 5. Increments from 0.1 to 0.5.
	this.x=x*tileSize;
	this.y=y*tileSize;
	this.broken=false;
	this.droppedItem=false;

	this.show = function(){
		if(!this.broken)
			this.brokenPercent>=2.5 ? image(dayTime ? raining ? wetterrain : terrain : nightTerrain,this.x,this.y,32,32,64,32,32,32) : image(dayTime ? raining ? wetterrain : terrain : nightTerrain,this.x,this.y,32,32,32,32,32,32);
		else{
			if(!this.droppedItem){
				items.push(new Item(dayTime ? raining ? wetterrain : terrain : nightTerrain, x, y, 32, 32, "stone", 1));
				this.droppedItem=true;
			}
		}
	}

	this.hit = function(force){
		this.brokenPercent+=force;
	}

	this.update = function(){
		if(this.brokenPercent>=5){
			layer2[player.mapId][this.y/tileSize][this.x/tileSize]=0;
			this.broken=true;
		}
	}
}

function Log(x,y,outerLayers){
	this.brokenPercent=outerLayers/2;
	this.x=x*tileSize;
	this.y=y*tileSize;
	this.broken=false;
	this.droppedItem=false;

	this.show = function(){
		if(!this.broken){
			if(this.brokenPercent>-0.1 && this.brokenPercent<0.5){
				image(dayTime ? raining ? wetterrain : terrain : nightTerrain,this.x,this.y,32,32,64+32,32,32,32);
			}else if(this.brokenPercent>0.4 && this.brokenPercent<1){
				image(dayTime ? raining ? wetterrain : terrain : nightTerrain,this.x,this.y,32,32,64+64,32,32,32);
			}else if(this.brokenPercent>0.9 && this.brokenPercent<1.5){
				image(dayTime ? raining ? wetterrain : terrain : nightTerrain,this.x,this.y,32,32,64+64+32,32,32,32);
			}else if(this.brokenPercent>1.4 && this.brokenPercent<2){
				image(dayTime ? raining ? wetterrain : terrain : nightTerrain,this.x,this.y,32,32,64+64+64,32,32,32);
			}
		}else{
			if(!this.droppedItem){
				items.push(new Item(dayTime ? raining ? wetterrain : terrain : nightTerrain, x, y, 64+32, 32, "wood", 1));
				this.droppedItem=true;
			}
		}
	}

	this.hit = function(force){
		this.brokenPercent+=force;
	}

	this.update = function(){
		if(this.brokenPercent>=2){
			layer2[player.mapId][this.y/tileSize][this.x/tileSize]=0;
			this.broken=true;
		}
	}
}

function Iron(x,y,hasMineral){
	this.brokenPercent=0;
	this.hasMineral=hasMineral;
	this.x=x*tileSize;
	this.y=y*tileSize;
	this.broken=false;
	this.droppedItem=false;

	this.show = function(){
		if(!this.broken){
			image(dayTime ? raining ? wetterrain : terrain : nightTerrain,this.x,this.y,32,32,64*4,32,32,32);
		}else{
			if(!this.droppedItem){
				items.push(new Item(dayTime ? raining ? wetterrain : terrain : nightTerrain, x, y, 64*4, 32, "iron", 1));
				this.droppedItem=true;
			}
		}
	}

	this.hit = function(force){
		this.brokenPercent+=force;
	}

	this.update = function(){
		if(this.brokenPercent>=6){
			layer2[player.mapId][this.y/tileSize][this.x/tileSize]=0;
			this.broken=true;
		}
	}
}