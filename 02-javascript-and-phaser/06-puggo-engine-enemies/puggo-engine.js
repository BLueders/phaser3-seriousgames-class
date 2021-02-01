let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

window.addEventListener('keydown', keydownFunction);

function keydownFunction(event){
    if(event.key == "ArrowDown"){
        hero.y += hero.speed;
    }
    if(event.key == "ArrowUp"){
        hero.y -= hero.speed;
    }
    if(event.key == "ArrowLeft"){
        hero.x -= hero.speed;
    }
    if(event.key == "ArrowRight"){
        hero.x += hero.speed;
    }
}

var hero = {};
hero.image = new Image();
hero.image.src = 'puggo.jpg';
hero.x = 100;
hero.y = 100;
hero.speed = 10;

hero.draw = function(){
    if(this.imageLoaded){
        ctx.drawImage(this.image, this.x, this.y);
    }
}

hero.image.onload = function () {
    hero.imageLoaded = true;
}

hero.image.onerror = function () {
    console.error ("image could not be loaded");
}

hero.onCollision = function(other){
    console.log("puggo died");
}

var enemy = {};
enemy.image = new Image();
enemy.image.src = 'falco.jpg';
enemy.x = 500;
enemy.y = 400;
enemy.speed = 10;

enemy.draw = function(){
    if(this.imageLoaded){
        ctx.drawImage(this.image, this.x, this.y);
    }
}

enemy.onCollision = function(other){
}

enemy.image.onload = function () {
    enemy.imageLoaded = true;
}

enemy.image.onerror = function () {
    console.error ("image could not be loaded");
}

function gameLoop() {
    physics();
    update();
    draw();
    window.requestAnimationFrame(gameLoop);
}

function physics(){
    checkOverlap(hero, enemy);
}

function update(){

}

function draw() {
    // draw background
    ctx.fillStyle = "#339933";
    ctx.fillRect(0, 0, width, height);
    hero.draw();
    enemy.draw();
}

function checkOverlap(object1, object2){
    let distX = Math.abs((object1.x + object1.image.width/2) -
                          (object2.x + object2.image.width/2));
    let distY = Math.abs((object1.y + object1.image.height/2) -
                          (object2.y + object2.image.height/2));

    if(distX < (object1.image.width/2 + object2.image.width/2)){
        if(distY < (object1.image.height/2 + object2.image.height/2)){
            object1.onCollision(object2);
            object2.onCollision(object1);
        }
    }
}

gameLoop();
