var city = {
	name: "Copenhagen",
	foundingYear: 1167,
	isAwesome: true
}

city.print = function (){
	console.log(this.name + ", " + this.foundingYear);
}
