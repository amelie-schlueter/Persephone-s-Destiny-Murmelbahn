const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let grounds = [];
let groundSensors = [];
let world;
let mouse;
let arrowBack;
let arrowFront;
let arrow;
let flashImg; 
let flashBack;
let flashFront;
let flash;
let flashes = [];
let hitFlashSensor = false; 
let examplePot = [];
let fallingLanceImg; 
let currentGround = null;
let shootInterval = null; // Referenz auf das Intervall
let granatapfelImg;
let saeuleImg;
let fallingLance = [];
let mensch1;
// let pillarDirection = 3; 
let movingPillars = [];
let forceBall = { x: 0.09, y: -0.0 };
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];
let granatapfel;

let canvasElem;
let off = { x: 0, y: 0 };

let active = -1;

const dim = { w: 3840, h: 8640, sw: 1280, sh: 720, d: 100 };

function preload() {
  granatapfelImg = loadImage('granatapfel_small.png');
  saeuleImg = loadImage('saeule_moving.png');
  fallingLanceImg = loadImage('faling-lance.png');
  flashImg = loadImage('flashImg.png');
  
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');

  // Das ist nötig für den 'Endless Canvas'
  canvasElem = document.getElementById('thecanvas');

  engine = Engine.create();
  world = engine.world;

  // create outer frame
  // left
  blocks.push(new BlockCore(world, { x: -dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));
  // right
  blocks.push(new BlockCore(world, { x: dim.w + dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));
  // top
  blocks.push(new BlockCore(world, { x: dim.w / 2, y: -dim.d / 2, w: dim.w, h: dim.d, color: 'black' }, { isStatic: true }));
  // bottom
  // blocks.push(new BlockCore(world, { x: dim.w / 2, y: dim.h + dim.d / 2, w: dim.w, h: dim.d, color: 'black' }, { isStatic: true }));



  // Pot Example
  examplePot.push(createPot(world,2750, 550, 230, 230));


  for (let i = 0; i < 11; i++)
    setupGround(i);
 

  // create moving Pillar 
  movingPillars.push(new Block(
    world,
    {
      x: dim.w /3 , y: 250, w: 60, h: 500, image: saeuleImg, initialPosition: { x: dim.w / 6, y: 250 }, status: "stopped", direction: 3,
      trigger: (ball, block) => {
        // Game Over
        // alert("Ups..Der Granatapfel wurde von einer Säule getroffen. Versuche es nochmal!"), 
        // location.reload();  

      }
    },
    { isStatic: true, }
  ));

  movingPillars.push(new Block(
    world,
    {
      x: dim.w / 2, y: 925, w: 450, h: 60, color: "blue", initialPosition: { x: dim.w / 2, y: 950 }, status: "stopped", direction: 3,
      trigger: (ball, block) => {
        // Game Over
        // alert("Ups..Der Granatapfel wurde von einer Säule getroffen. Versuche es nochmal!"), 
        // location.reload();  
      }
    },
    { isStatic: true, angle: PI / 2 },
  ));




  // create falling lance 
  fallingLance.push(new Block(
    world,
    {
      x: dim.w / 2 + 305, y: 500, w: 20, h: 450, image: fallingLanceImg,
      isTriggered: false,

      trigger: (ball, block) => {
        if (!block.isTriggered) {

          Matter.Body.setStatic(block.body, false);
          Matter.Body.applyForce(block.body, block.body.position, { x: 0.2, y: 0.0 });

          block.isTriggered = true;
        }
      }
    },
    {  isStatic: true }
  ));




  // create arrows 

  arrowBack = new Ball(world, 
    {x: 2200, y: 400, s: 6, r: 20, color: 'white'},
    {frictionAir: 0.1 , isStatic: true});
  arrowFront = new Ball(world, 
    {x: 2100, y: 350, s: 6, r: 20, color: 'blue'}, 
    {density: 0.015, isStatic: true});
  arrow = arrowBack.constrainTo(arrowFront, { length: 100, stiffness: 1, draw: true});



  // the ball has a label and can react on collisions
  granatapfel = new Ball(world,
    { x: 100, y: 450, r: 35, image: granatapfelImg },
    { label: "Murmel", density: 0.001, restitution: 0.4, frictionAir: 0.0, isStatic: true }
  );
  blocks.push(granatapfel);

  // add a mouse so that we can manipulate Matter objects
  mouse = new Mouse(engine, canvas, { stroke: 'blue', strokeWeight: 3 });


  // process collisions - check whether block "Murmel" hits another Block
  Events.on(engine, 'collisionStart', function (event) {
    var pairs = event.pairs;
    pairs.forEach((pair, i) => {
      if (pair.bodyA.label == 'Murmel') {
        pair.bodyA.plugin.block.collideWith(pair.bodyB.plugin.block)
      }
      if (pair.bodyB.label == 'Murmel') {
        pair.bodyB.plugin.block.collideWith(pair.bodyA.plugin.block)
      }
    })
  })

  // run the engine
  Runner.run(engine);



}
 // Setze den Status der Pillars / Sollen sich nur bewegen wenn die Murmel auf der Ebene ist. 

 function setPillarStatus(selectedIndex, status) {
  for (let i = 0; i < movingPillars.length; i++) {
    if (i === selectedIndex) {
      movingPillars[i].attributes.status = status;
    } else {
      movingPillars[i].attributes.status = "stopped";
    }
  }
}
function scrollEndless(point) {
  // wohin muss verschoben werden damit point wenn möglich in der Mitte bleibt
  off = { x: Math.min(Math.max(0, point.x - windowWidth / 2), dim.w - windowWidth), y: Math.min(Math.max(0, point.y - windowHeight / 2 - 300), dim.h - windowHeight) };
  // plaziert den Canvas im aktuellen Viewport
  canvasElem.style.left = Math.round(off.x) + 'px';
  canvasElem.style.top = Math.round(off.y) + 'px';
  // korrigiert die Koordinaten
  translate(-off.x, -off.y);
  // verschiebt den ganzen Viewport
  window.scrollTo(off.x, off.y);
  // Matter mouse needs the offset as well
  mouse.setOffset(off);
}


function keyPressed(event) {
  switch (keyCode) {
    case 32:
      if (active == -1) {
        active = 0;
      } else {

      }

      console.log("Space");
      Matter.Body.setStatic(granatapfel.body, false)
      event.preventDefault();
      Matter.Body.applyForce(granatapfel.body, granatapfel.body.position, forceBall);
      // Matter. Body.scale(murmel.body, 1.5, 1.5);
      break;
    case 65: 

    break; 
    case 70:
      console.log("f")
      // createFlash();
      // shootFlash();
      break;
    default:
      console.log(keyCode);
  }
}

function draw() {
  //background(0,1)

  if (active < -1) {

  }
  clear();

  // position canvas and translate coordinates
  scrollEndless(granatapfel.body.position);

  // animate attracted blocks
  grounds.forEach(block => block.draw());
  groundSensors.forEach(block => block.draw());
  blocks.forEach(block => block.draw());
  movingPillars.forEach(block => block.draw());
  fallingLance.forEach(block => block.draw());
  examplePot.forEach(block => block.draw());



  movingPillars.forEach((block) => {
    if (block.attributes.status === 'movingDown') {
      if (block.body.position.y >= block.attributes.initialPosition.y + 175) {
        block.attributes.status = 'movingUp';
      } else {
        Matter.Body.setPosition(block.body, { x: block.body.position.x, y: block.body.position.y + block.attributes.direction });
      }
    } else if (block.attributes.status === 'movingUp') {
      if (block.body.position.y <= block.attributes.initialPosition.y) {
        block.attributes.status = 'movingDown';
      } else {
        Matter.Body.setPosition(block.body, { x: block.body.position.x, y: block.body.position.y - block.attributes.direction });
      }
    }
  });

  mouse.draw();
  arrowBack.draw();
  arrowFront.draw();
  arrowBack.drawConstraints();

  flashes.forEach(flash => {
    flash.back.draw();
    flash.front.draw();
    flash.back.drawConstraints();
  });
  
 

}







