let swingStiff;
let swingStreched;
let propeller;
let arrowBack;
let arrowFront;
let arrowImage; 


let ball;
let ground;
let arrow;
const Events = Matter.Events;
let mouse;

function preload() {
  arrowImage = loadImage('arrowtest.png');
}

function setup() {
  const canvas = createCanvas(800, 600);

  // create an engine
  let engine = Matter.Engine.create();
  let world = engine.world;


  // add stiff multi-body constraint
  arrowBack = new Ball(world, 
    {x: 600, y: 400, s: 6, r: 20, color: 'white'},
    {frictionAir: 0.1 , isStatic: true});
  arrowFront = new Ball(world, 
    {x: 500, y: 350, s: 6, r: 20, color: 'blue', }, 
    {density: 0.015, isStatic: true});
  // arrowBack.constrainTo(arrowFront, { length: 100, stiffness: 1,});
  arrow = arrowBack.constrainTo(arrowFront, { length: 100, stiffness: 1, draw: true});

// // Ermitteln Sie den Winkel zwischen den beiden Polygonen
// let angle = Math.atan2(arrowFront.body.position.y - arrowBack.body.position.y, arrowFront.body.position.x - arrowBack.body.position.x);

// // Konvertieren Sie den Winkel von Radiant in Grad
// angle = angle * (180 / Math.PI);

// // Rotieren Sie das Bild um den berechneten Winkel
// image(arrowImage, arrowFront.body.position.x, arrowFront.body.position.x, arrowFront.attributes.w, arrowFront.attributes.h);


  // ground
  ground = new Block(world, {x:400, y: height-10, w: 810, h: 30, color: 'white'}, {isStatic: true});

  // setup mouse
  mouse = new Mouse(engine, canvas);

  // run the engine
  Matter.Runner.run(engine)
}

function keyPressed(event) {
  switch (keyCode) {
    case 32:
      console.log("SPACE");
      Matter.Body.setStatic(arrowFront.body, false)
      Matter.Body.setStatic(arrowBack.body, false)
      Matter.Body.applyForce(arrowFront.body, arrowFront.body.position, {x: -1, y: -0.8} )
      break;
    default:
      console.log(keyCode);
  }
}



function draw() {
  background('gray');
  arrowBack.draw();
  arrowFront.draw();
  arrowBack.drawConstraints();
  ground.draw();
  mouse.draw();
}