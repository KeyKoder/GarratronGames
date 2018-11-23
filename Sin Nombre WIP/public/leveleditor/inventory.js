function Inventory(){
	this.resources = {
		"grass":1,
		"sand":1,
		"dirt":1,
		"stone":1,
		"log":1,
		"iron":1
	}
	this.selectedSlot=0;
	this.sizeX=tileSize*3-4;
	this.sizeY=(tileSize*3)/3;
	this.craftingSlot=[0,0];
	this.image=loadImage('assets/inventory.png');

	this.show = function(){
		fill(186,153,87);
		noStroke();
		rect(0, height-this.sizeY, width, height);
		push();
		tint(255,203,0);
		image(this.image,0,height-this.sizeY,this.sizeX,this.sizeY,0,0,96,32);
		image(this.image,this.sizeX+8,height-this.sizeY,this.sizeX,this.sizeY,0,0,96,32);
		image(this.image,(this.sizeX+8)*2,height-this.sizeY,this.sizeX,this.sizeY,0,0,96,32);
		image(this.image,(this.sizeX+8)*3,height-this.sizeY,this.sizeX-32,this.sizeY,0,0,64,32);
		pop();
		push();
		this.selectedSlot<=2 ? tint(255,203,0) : tint(0,203,255);
		this.selectedSlot<=2 ? image(this.image,this.selectedSlot*tileSize, height-this.sizeY,32,32,0,32,32,32) : image(this.image,this.selectedSlot*tileSize+4, height-this.sizeY,32,32,0,32,32,32);
		pop();

		for(var r in this.resources){
			if(this.resources[r]>0){
				if(r=="stone"){
					image(terrain,4*tileSize+4+6, height-this.sizeY+8,16,16,32,32,32,32);
					if(this.resources[r]>1){
						fill(255);
						text(this.resources[r],4*tileSize+4+15, height-this.sizeY+25);
					}
				}else if(r=="log"){
					image(terrain,3*tileSize+4+6, height-this.sizeY+8,16,16,64+32,32,32,32);
					if(this.resources[r]>1){
						fill(255);
						text(this.resources[r],3*tileSize+4+15, height-this.sizeY+25);
					}
				}else if(r=="iron"){
					image(terrain,5*tileSize+4+6, height-this.sizeY+8,16,16,64*4,32,32,32);
					if(this.resources[r]>1){
						fill(255);
						text(this.resources[r],5*tileSize+4+15, height-this.sizeY+25);
					}
				}
			}
		}
	}

	this.pickup = function(item) {
		if(item in this.resources){
			prev=this.resources[item];
			this.resources[item]++;
			if(this.resources[item]-prev>1){
				this.resources[item]=this.resources[item]-prev+1;
			}
		}
	}
}