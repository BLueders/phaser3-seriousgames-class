Car = class {
	name;
	fuel;
	speed;
	distance;
	constructor(name, fuel, speed){
		this.name = name;
		this.fuel = fuel;
		this.speed = speed;
		this.distance = 0;
	}
	refuel(fuel){
		this.fuel += fuel;
	}
	drive(distance){
		// use up 6 liters per 100km
		this.fuel -= distance/100 * 6;
		this.distance += distance;
	}
	print(){
		console.log(
			this.name +
			", fuel: " + this.fuel +
			", speed: " + this.speed +
		    ", distance: " + this.distance);
	}
};

let myCar = new Car("VW", 100, 180);
myCar.print();
myCar.drive(558); // drive from Copenhagen to Osnabrück
myCar.print();
myCar.refuel(40);
myCar.print();

