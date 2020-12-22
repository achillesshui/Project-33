const Engine = Matter.Engine;
const World = Matter.World;
const Events = Matter.Events;
const Bodies = Matter.Bodies;

var divisions = [];
// var particles = [];
var plinkos = [];

var divisionHeight=300;
var score = 0;
var particle;
var turn = 0;
var gameState = "START";

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


  for(var k = 0; k <=width; k = k + 80) {
   divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  for(var j = 75; j <=width; j=j+50) {
    plinkos.push(new Plinko(j,75));
  }

  for(var j = 50; j <=width-10; j=j+50)  {
    plinkos.push(new Plinko(j,175));
  }

  for(var j = 75; j <=width; j=j+50) {
   plinkos.push(new Plinko(j,275));
  }

  for(var j = 50; j <=width-10; j=j+50)  {
   plinkos.push(new Plinko(j,375));
  } 
}
 


function draw() {
  background("black");
  textSize(30)
  fill("white");
  text("Score : "+score,630,40);

  text("500", 15,750);
  text("500", 95,750);
  text("500", 175,750);
  text("500", 255,750);
  text("100", 335,750);
  text("100", 415,750);
  text("100", 495,750);
  text("200", 575,750);
  text("200", 655,750);
  text("200", 735,750);

  Engine.update(engine);
  
  for (var i = 0; i < plinkos.length; i++) { 
    plinkos[i].display();
  }

  for(var k = 0; k < divisions.length; k++) {  
    divisions[k].display();
  }

  if(particle!=null) {
    particle.display();
    if(particle.body.position.y>770) {

      if(particle.body.position.x<325) {
        score+=500;
        particle = null;
        if(turn>=5) gameState = "END";
        console.log(turn);
      }
      else if(particle.body.position.x>301&&particle.body.position.x<600) {
        score+=100;
        particle = null;
        if(turn>=5) gameState = "END";
        console.log(turn)
      }
      else if(particle.body.position.x>601&&particle.body.position.x<800) {
        score+=200;
        particle = null;
        if(turn>=5) gameState = "END";
        console.log(turn)
      }
      else {
        gameState = "END";
      }
    }
  }

  if(gameState === "END") {
    textSize(90);
    text("GAME OVER", 150,400);
  }
  console.log(score);
}

function mousePressed() {
  console.log("hi")
  if(gameState !== "END") {
    turn ++;
    particle = new Particle(mouseX, 10, 10 , 10);
  }
}