var city = {
	name: "Copenhagen",
	foundingYear: 1167,
	isAwesome: true,
}

function printThis(){
	console.log(this);
}

city.printThis = printThis;

printThis();
city.printThis();
