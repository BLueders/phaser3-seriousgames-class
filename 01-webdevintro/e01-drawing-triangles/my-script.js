function drawTriangle(size){
	for(let row = 1; row <= size; row++){
		drawLine(row);
	}
	for(let row = size - 1; row > 0; row--){
		drawLine(row);
	}
}

function drawLine(length){
	let result = "";
	for(let i = 0; i < length; i++){
		result += "*";
	}
	console.log(result);
}

drawTriangle(2);
drawTriangle(5);
drawTriangle(10);
