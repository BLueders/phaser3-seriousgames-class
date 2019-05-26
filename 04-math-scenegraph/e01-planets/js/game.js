// create a new scene
let gameScene = new Phaser.Scene('Game');

// set the configuration of the game
let config = {
    type: Phaser.AUTO, // Phaser will use WebGL if available, if not it will use Canvas
    width: 800,
    height: 480,
    scene: gameScene
};

let planetSystemDef = {
    center: {x: 400, y: 240},
    planets: [{
        scale: 0.5,
        offset: {x: 0, y: 0},
        name: 'sun',
        sprite: 'planetA00',
        rotationSpeed: 60,
        orbitSpeed: 0,
        satellites: [
            {
                scale: 0.3,
                offset: {x: 100, y: 0},
                name: 'planet1',
                sprite: 'planetD00',
                rotationSpeed: 60,
                orbitSpeed: 60,
                satellites: [
                    {
                        scale: 0.2,
                        offset: {x: 25, y: 0},
                        name: 'moon1',
                        sprite: 'planetC00',
                        rotationSpeed: 360,
                        orbitSpeed: 100,
                        satellites: []
                    }
                ]
            },
            {
                scale: 0.2,
                offset: {x: 160, y: 0},
                name: 'planet2',
                sprite: 'planetG00',
                rotationSpeed: -120,
                orbitSpeed: -90,
                satellites: []
            },
            {
                scale: 0.3,
                offset: {x: 250, y: 0},
                name: 'planet3',
                sprite: 'planetH00',
                rotationSpeed: 150,
                orbitSpeed: 50,
                satellites: [
                    {
                        scale: 0.1,
                        offset: {x: 40, y: 0},
                        name: 'moon1',
                        sprite: 'planetI00',
                        rotationSpeed: 360,
                        orbitSpeed: 120,
                        satellites: [
                            {
                                scale: 0.05,
                                offset: {x: 15, y: 0},
                                name: 'moonmoon1',
                                sprite: 'planetJ00',
                                rotationSpeed: 360,
                                orbitSpeed: -400,
                                satellites: []
                            }
                        ]
                    }
                ]
            }
        ]
    }]
};

// create a new game, pass the configuration
let game = new Phaser.Game(config);

// initiate scene parameters
gameScene.init = function () {

};

// load assets
gameScene.preload = function () {
    this.load.image('planetA00', 'assets/A00.png');
    this.load.image('planetC00', 'assets/C00.png');
    this.load.image('planetD00', 'assets/D00.png');
    this.load.image('planetG00', 'assets/G00.png');
    this.load.image('planetH00', 'assets/H00.png');
    this.load.image('planetI00', 'assets/I00.png');
    this.load.image('planetJ00', 'assets/J00.png');
};

// called once after the preload ends
gameScene.create = function () {
    this.planetSystem = gameScene.add.container(planetSystemDef.center.x, planetSystemDef.center.y);
    makePlanetsFromDef(planetSystemDef.planets, this.planetSystem);
    printSystem(this.planetSystem);
};

// this is called up to 60 times per second
gameScene.update = function (time, delta) {
    for(let i = 0; i < this.planetSystem.list.length; i++){
        updatePlanetContainer(this.planetSystem.list[i], delta);
    }
};

function printSystem(system){
    let prefix = '-';
    console.log('The planet System:');
    for(let i = 0; i < system.list.length; i++){
        printPlanetElement(system.list[i], prefix);
    }
}

function printPlanetElement(element, prefix){
    console.log(prefix + " " + element._name + " pos: " + element.x + ", " + element.y);
    prefix += "-";
    if(element.hasOwnProperty('list')){
        for(let i = 0; i < element.list.length; i++){
            printPlanetElement(element.list[i], prefix);
        }
    }
}

function updatePlanetContainer(container, delta){
    container.angle += container.planet.orbitSpeed * delta / 1000;
    container.planet.angle += container.planet.rotationSpeed * delta / 1000;
    for(let i = 1; i < container.list.length; i++){
        updatePlanetContainer(container.list[i], delta);
    }
}

function makePlanetsFromDef(planetDefArray, parent){
    for(let i = 0; i < planetDefArray.length; i++){
        let x = 0;
        let y = 0;
        if(parent.planet){ // unless we are the root, we need to spawn the new container at the same location as the parents planet
           x = parent.planet.x;
           y = parent.planet.y;
        }
        let planetContainer = makePlanetInContainer(planetDefArray[i], x, y);
        parent.add(planetContainer);
        makePlanetsFromDef(planetDefArray[i].satellites, planetContainer);
    }
}

function makePlanetInContainer(planetDef, containerX, containerY){
    let newPlanetContainer = gameScene.add.container(containerX, containerY);
    newPlanetContainer._name = planetDef.name + "-container";
    newPlanetContainer.planet = gameScene.add.sprite(planetDef.offset.x, planetDef.offset.y, planetDef.sprite);
    newPlanetContainer.planet.setScale(planetDef.scale);
    newPlanetContainer.planet._name = planetDef.name;
    newPlanetContainer.planet.rotationSpeed = planetDef.rotationSpeed;
    newPlanetContainer.planet.orbitSpeed = planetDef.orbitSpeed;
    newPlanetContainer.add(newPlanetContainer.planet);
    return newPlanetContainer;
}