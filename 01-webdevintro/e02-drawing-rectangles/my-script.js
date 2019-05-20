Rectangle = class {
	width;
	height;
	innerCharacter;
	outerCharacter;
	constructor(width, height, innerCharacter, outerCharacter){
		this.width = width;
		this.height = height;
		this.innerCharacter = innerCharacter;
		this.outerCharacter = outerCharacter;
	}

	draw(){
		for(let line = 0; line < this.height; line++){
			this.drawLine(line);
		}
	}

	drawLine(line){
		let result = "";
		for(let row = 0; row < this.width; row++){
			if(line === 0 || line === this.height - 1){
				result += this.outerCharacter;
			}else if(row === 0 || row === this.width - 1){
				result += this.outerCharacter;
			}else {
				result += this.innerCharacter;
			}
		}
	}
};

let rect2x2 = new Rectangle(2, 2, "-", "+");
rect2x2.draw();

let rect5x5 = new Rectangle(5, 5, "-", "+");
rect5x5.draw();

let rect10x4 = new Rectangle(10, 4, "-", "+");
rect10x4.draw();