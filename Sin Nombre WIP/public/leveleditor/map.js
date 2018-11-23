function Map(x,y){
	this.image = loadImage("assets/map.png");
	this.size=13;
	this.x=x;
	this.y=y;

	this.show = function() {
		rect(this.x,this.y,(16+8)+8*this.size,16+8*this.size);
		for(var i=0;i<this.size;i++){
			for(var j=0;j<this.size;j++){
				console.log(i,j);
				image(this.image,(this.x+8)+i*8,(this.y+8)+j*8,8,8,(layer1[player.mapId][j][i]-1)*4,0,4,4);
			}
		}
	}
}