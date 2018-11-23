function Inventory(){
	this.items = [null,null,null,null,null];
	this.itemCount = [null,null,null,null,null];
	this.resources = {
		"wood":10,
		"stone":0,
		"iron":0
	}
	this.selectedSlot=0;
	this.sizeX=tileSize*3-4;
	this.sizeY=tileSize*2;
	this.craftingSlot=[0,0];
	this.craftingInventory=[[0,0,0],
							[0,0,0],
							[0,0,0]];

	this.craftingCounts=[[0,0,0],
						 [0,0,0],
						 [0,0,0]];
	this.image=loadImage('assets/inventory.png');
	this.recipes=[];
	this.recipeResults=[];

	this.show = function(){
		fill(186,153,87);
		noStroke();
		rect(0, height-this.sizeY, width, height);
		push();
		tint(255,203,0);
		image(this.image,0,height-this.sizeY/2,this.sizeX,this.sizeY/2,0,0,96,32);
		image(this.image,this.sizeX+4,height-this.sizeY/2,this.sizeX-(tileSize-2),this.sizeY/2,0,0,64,32);
		tint(0,203,255);
		image(this.image,this.sizeX*2-tileSize/2-8,height-this.sizeY/2,this.sizeX,this.sizeY/2,0,0,96,32);
		pop();
		var h=player.health/2;
		for(var i=0;i<5;i++){
			// fill(0)
			// text(player.health/2,0,height-this.sizeY)
			image(this.image,i*32,height-this.sizeY,32,32,64,64,32,32);
		}
		for(var i=round(h);i>0;i--){
			if(i<h){
				i=-1;
			}
			if(h%1!=0){
				image(this.image,(i-1)*32,height-this.sizeY,32,32,32,64,32,32);
				h-=0.5;
			}else{
				image(this.image,(i-1)*32,height-this.sizeY,32,32,0,64,32,32);
				h-=1;
			}
		}

		h=player.hunger/2;
		for(var i=0;i<3;i++){
			// fill(0)
			// text(player.health/2,0,height-this.sizeY)
			image(this.image,i*32+(width-3*32),height-this.sizeY,32,32,64,96,32,32);
		}
		for(var i=round(h);i>0;i--){
			if(i<h){
				i=-1;
			}
			if(h%1!=0){
				image(this.image,(i-1)*32+(width-3*32),height-this.sizeY,32,32,32,96,32,32);
				h-=0.5;
			}else{
				image(this.image,(i-1)*32+(width-3*32),height-this.sizeY,32,32,0,96,32,32);
				h-=1;
			}
		}
		push();
		this.selectedSlot<=4 ? tint(255,203,0) : tint(0,203,255);
		//if(this.selectedSlot<=2)
			image(this.image,this.selectedSlot*tileSize, height-this.sizeY/2,32,32,0,32,32,32)
		/*else if(this.selectedSlot<=4)
			image(this.image,this.selectedSlot*tileSize, height-this.sizeY,32,32,0,32,32,32);
		else
			image(this.image,this.selectedSlot*tileSize+8, height-this.sizeY,32,32,0,32,32,32);*/
		pop();

		for(var r in this.resources){
			if(this.resources[r]>0){
				if(r=="stone"){
					image(terrain,6*tileSize+6, height-this.sizeY/2+8,16,16,32,32,32,32);
					if(this.resources[r]>1){
						fill(255);
						text(this.resources[r],6*tileSize+15, height-this.sizeY/2+25);
					}
				}else if(r=="wood"){
					image(terrain,5*tileSize+6, height-this.sizeY/2+8,16,16,64+32,32,32,32);
					if(this.resources[r]>1){
						fill(255);
						text(this.resources[r],5*tileSize+15, height-this.sizeY/2+25);
					}
				}else if(r=="iron"){
					image(terrain,7*tileSize+6, height-this.sizeY/2+8,16,16,64*4,32,32,32);
					if(this.resources[r]>1){
						fill(255);
						text(this.resources[r],7*tileSize+15, height-this.sizeY/2+25);
					}
				}
			}
		}

		for(var i=0;i<this.items.length;i++){
			if(this.itemCount[i]>0){
				image(itemImg,i*tileSize+6, height-this.sizeY/2+8,16,16,this.items[i]*32,0,32,32);
			}else{
				this.items[i]=null;
				this.itemCount[i]=null;
			}
			if(this.itemCount[i]>1){
				fill(255);
				text(this.itemCount[i], i*tileSize+15, height-this.sizeY/2+25);
			}
		}
	}

	this.pickup = function(item) {
		if(item.id in this.resources){
			prev=this.resources[item.id];
			this.resources[item.id]+=item.count;
			if(this.resources[item.id]-prev>1){
				this.resources[item.id]=this.resources[item.id]-prev+1;
			}
		}else{
			this.items[abs(this.items.count(null)-(this.items.length-1))]=item.id;
			this.itemCount[abs(this.itemCount.count(null)-(this.itemCount.length-1))]+=item.count;
		}
	}

	this.showCrafting = function(){
		fill(150);
		noStroke();
		rect(0, 0, width, height-32);
		push();
		tint(255);
		fill(255);
		textSize(25);
		text("Crafting", width-tileSize*8, 32);
		image(this.image,width-tileSize*8,(height-tileSize*11),this.sizeX,this.sizeY/2,0,0,96,32);
		image(this.image,width-tileSize*8,(height-tileSize*10)+4,this.sizeX,this.sizeY/2,0,0,96,32);
		image(this.image,width-tileSize*8,(height-tileSize*9)+8,this.sizeX,this.sizeY/2,0,0,96,32);
		image(this.image,width-tileSize*10,(height-tileSize*10)+4,32,32,0,0,32,32);
		if(this.craftingSlot[0]==0 && this.craftingSlot[1]==0){
			image(this.image,width-tileSize*6,(height-tileSize*11),32,32,0,32,32,32)
		}else{
			image(this.image,width-(this.craftingSlot[0]+6)*tileSize,height-tileSize*(11-this.craftingSlot[1])+4*this.craftingSlot[1],32,32,0,32,32,32);
		}
		pop();
		for(var y=0;y<this.craftingInventory.length;y++){
			for(var x=0;x<this.craftingInventory[y].length;x++){
				if(this.craftingCounts[y][x]>=1){
						if(this.craftingInventory[y][x]==1){
							image(terrain, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,64+32,32,32,32);
						}else if(this.craftingInventory[y][x]==2){
							image(terrain, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,32,32,32,32);
						}else if(this.craftingInventory[y][x]==3){
							image(terrain, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,64*4,32,32,32);
						}else{
							image(itemImg, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,32*(this.craftingInventory[y][x]-4),0,32,32);
						}
						fill(255);
						if(this.craftingCounts[y][x]>1)
							text(this.craftingCounts[y][x],width+6-(x+6)*tileSize+12,height+8-tileSize*(11-y)+4*y+17);
				}else{
					this.craftingInventory[y][x]=0;
				}
			}
		}
		for(var i=0;i<this.recipes.length;i++){
			var x=4,y=1;
			if(this.recipes[i].equals2d(this.craftingInventory)){
				if(this.recipeResults[i].name in this.resources){
					if(this.recipeResults[i].id==1){
						image(terrain, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,64+32,32,32,32);
					}else if(this.recipeResults[i].id==2){
						image(terrain, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,32,32,32,32);
					}else if(this.recipeResults[i].id==3){
						image(terrain, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,64*4,32,32,32);
					}
				}else{
					image(itemImg, width+6-(x+6)*tileSize,height+8-tileSize*(11-y)+4*y,16,16,32*this.recipeResults[i].id,0,32,32);
				}
			}
		}
	}

	this.craft = function() {
		var crafted=false;
		for(var i=0;i<this.recipes.length;i++){
			//console.log(this.recipes[i]+"\n\n"+this.craftingInventory+"\n\n"+this.recipes[i].equals2d(this.craftingInventory));
			if(this.recipes[i].equals2d(this.craftingInventory)){
				if(this.recipeResults[i].name in this.resources){
					if(this.recipeResults[i].id==1){
						this.resources["wood"]+=this.recipeResults[i].count;
					}else if(this.recipeResults[i].id==2){
						this.resources["stone"]+=this.recipeResults[i].count;
					}else if(this.recipeResults[i].id==3){
						this.resources["iron"]+=this.recipeResults[i].count;
					}
				}else{
					if(this.items.indexOf(this.recipeResults[i].id)!=-1){
						this.itemCount[this.items.indexOf(this.recipeResults[i].id)]+=this.recipeResults[i].count;
					}else{
						this.items[abs((this.items.count(null)-1)-(this.items.length-1))]=this.recipeResults[i].id;
						this.itemCount[this.items.indexOf(this.recipeResults[i].id)]+=this.recipeResults[i].count;
					}
				}
				crafted=true;
				break;
			}
			crafted=false;
		}
		if(crafted)
			for(var y=0;y<this.craftingInventory.length;y++){
				for(var x=0;x<this.craftingInventory[y].length;x++){
					if(this.craftingCounts[y][x]>=1)
						this.craftingCounts[y][x]--;
					else
						this.craftingInventory[y][x]=0;
				}
			}
	}

	this.pushToCraftingGrid = function() {
		if(this.craftingSlot[0]!=4){
			if(this.selectedSlot<5){
				if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==0 || this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==this.items[this.selectedSlot]+4){
					this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]] = this.items[this.selectedSlot]+4;
					this.craftingCounts[this.craftingSlot[1]][this.craftingSlot[0]]++;
					this.itemCount[this.selectedSlot]--;
				}
			}
			if(this.selectedSlot==5){
				if(this.resources["wood"]>0){
					if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==0 || this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==1){
						this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]] = 1;
						this.craftingCounts[this.craftingSlot[1]][this.craftingSlot[0]]++;
						this.resources["wood"]--;
					}
				}
			}else if(this.selectedSlot==6){
				if(this.resources["stone"]>0){
					if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==0 || this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==2){
						this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]] = 2;
						this.craftingCounts[this.craftingSlot[1]][this.craftingSlot[0]]++;
						this.resources["stone"]--;
					}
				}
			}else if(this.selectedSlot==7){
				if(this.resources["iron"]>0){
					if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==0 || this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==3){
						this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]] = 3;
						this.craftingCounts[this.craftingSlot[1]][this.craftingSlot[0]]++;
						this.resources["iron"]--;
					}
				}
			}
		}
	}

	this.getAllFromCraftingGrid = function() {
		for(var y=0;y<this.craftingInventory.length;y++){
			for(var x=0;x<this.craftingInventory[y].length;x++){
				this.craftingSlot=[x,y];
				while(this.craftingCounts[y][x]>0){
					this.getFromCraftingGrid();
				}
			}
		}
	}

	this.getFromCraftingGrid = function() {
		if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==1){
			if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==0)
				this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]=0;
			else
				this.craftingCounts[this.craftingSlot[1]][this.craftingSlot[0]]--;
			this.resources["wood"]++;
		}else if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==2){
			if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==0)
				this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]=0;
			else
				this.craftingCounts[this.craftingSlot[1]][this.craftingSlot[0]]--;
			this.resources["stone"]++;
		}else if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==3){
			if(this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]==0)
				this.craftingInventory[this.craftingSlot[1]][this.craftingSlot[0]]=0;
			else
				this.craftingCounts[this.craftingSlot[1]][this.craftingSlot[0]]--;
			this.resources["iron"]++;
		}
	}

	this.addCraftingRecipe = function(r1,r2,r3,res) {
		this.recipes.push([r1,r2,r3]);
		this.recipeResults.push(res);
	}
	this.addCraftingRecipe([0,0,0],[0,1,0],[0,1,0],{
		"name": "stick",
		"id": 0,
		"count": 2
	});

	this.addCraftingRecipe([1,1,1],[0,4,0],[0,4,0],{
		"name": "wooden_pick",
		"id": 1,
		"count": 1
	});

	this.addCraftingRecipe([2,2,2],[0,4,0],[0,4,0],{
		"name": "stone_pick",
		"id": 2,
		"count": 1
	});
}