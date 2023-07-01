const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;
Matter.use('matter-wrap'); // setup wrap coordinates plugin

// the Matter engine to animate the world
let engine;
let grounds = [];
let groundSensors = [];
let world;
let mouse;
let brunnenImg;
let portalExit; 
let fireballs = [] 
let fireballImg; 
let fish; 
let tintenfischImg; 
let fishImg; 
let fishes = [];
let arrowBack;
let arrowFront;
let arrow;
let startSensor; 
let arrows = []; 
let underwaterSensor = []; 
let luftblasen = []; 
let smallLuftblasenImg; 
let mediumLuftblasenImg; 
let largeLuftblasenImgLuftblasenImg; 
let xLargeLuftblasenImg; 
let arrowImg; 
let flashImg; 
let flashBack;
let flashFront;
let flash;
let flashes = [];
let pots = [];
let potImg; 
let baumstamm1; 
let fallingLanceImg; 
let currentGround = null;
let flashesInterval = null; // Referenz auf das Intervall
let fishInterval = null; // Referenz auf das Intervall
let arrowInterval = null; // Referenz auf das Intervall
let luftblasenInterval = null; // Referenz auf das Intervall
let fireballInterval = null; // Referenz auf das Intervall
let granatapfelImg;
let granatapfelImgNeg;
let saeuleImg;
let fallingLance = [];
let lanceSoldatImg;
let mensch1;
// let pillarDirection = 3; 
let movingPillars = [];
let forceBall = { x: 0.25, y: -0.0 };
let isDrag = false;
// an array to contain all the blocks created
let blocks = [];
let granatapfel;
let fallingFelsbrocken; 
let fallingFelsbrockenImg; 
let bgMusic; 
let soundFireball; 
let unterweltSound;
let soundBlitz; 
let gifSound;
let vaseImg;
let vasen = [];
let fallingLanceSound; 
let theEndSound;

let canvasElem;
let off = { x: 0, y: 0 };

let active = -1;

const dim = { w: 3840, h: 8640, sw: 1280, sh: 720, d: 100 };

function preload() {
  granatapfelImg = loadImage('granatapfel_small.png');
  granatapfelImgNeg = loadImage('granatapfelImgNeg.png');
  saeuleImg = loadImage('pillarDown.png');
  fallingLanceImg = loadImage('falling-lance.png');
  lanceSoldatImg = loadImage('lanceSoldat.png');
  flashImg = loadImage('flashImg.png');
  potImg = loadImage('potImg.png');
  vaseImg = loadImage('VaseImg.png');
  arrowImg = loadImage('arrowImgSmall.png');
  tintenfischImg = loadImage('tintenfischImg.png');
  fishImg = loadImage('fishImg.png');
  smallLuftblasenImg = loadImage('smallLuftblasenImg.png');
  mediumLuftblasenImg = loadImage('mediumLuftblasenImg.png');
  largeLuftblasenImg = loadImage('largeLuftblasenImg.png');
  xLargeLuftblasenImg = loadImage('xLargeLuftblasenImg.png');
  brunnenImg = loadImage('brunnenImg.png');
  fireballImg = loadImage('fireballImg.png');
  fallingFelsbrockenImg = loadImage('fallingFelsbrockenImg.png');
  

    // load sound
    birdSinging = loadSound('./Sounds/bird-singing.mp3');
    birdSinging.playMode('sustain');
    bubbleSound = loadSound('./Sounds/bubbles.mp3');
    bubbleSound.playMode('sustain');
    waterSplash = loadSound('./Sounds/water-splash.mp3');
    waterSplash.playMode('sustain');
    underwaterSound = loadSound('./Sounds/underwater.mp3');
    underwaterSound.playMode('sustain');
    arrowSound = loadSound('./Sounds/arrow.mp3');
    arrowSound.playMode('sustain');
    bgMusic = loadSound('./Sounds/bg-music.mp3');
    bgMusic.playMode('sustain');
    soundFireball = loadSound('./Sounds/soundFireball.mp3');
    soundFireball.playMode('sustain');
    unterweltSound = loadSound('./Sounds/UnterweltSound.mp3');
    unterweltSound.playMode('sustain');
    soundBlitz = loadSound('./Sounds/SoundFlash.mp3');
    soundBlitz.playMode('sustain');
    gifSound = loadSound('./Sounds/gifSound.mp3');
    gifSound.playMode('sustain');
    fallingLanceSound = loadSound('./Sounds/fallingLanceSound.mp3');
    fallingLanceSound.playMode('sustain');
    theEndSound = loadSound('./Sounds/theEndSound.mp3');
    theEndSound.playMode('sustain');
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('thecanvas');

  // Das ist nötig für den 'Endless Canvas'
  canvasElem = document.getElementById('thecanvas');

  engine = Engine.create();
  world = engine.world;

    // setup hit sound
    Matter.Events.on(engine, 'collisionStart', function(event) {
      const pairs = event.pairs[0];
      const bodyA = pairs.bodyA;
      const bodyB = pairs.bodyB;
      if (bodyA.label === "Murmel" || bodyB.label === "propeller") {

      }
    });

  // create outer frame
  // left
  blocks.push(new BlockCore(world, { x: -dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));
  // right
  blocks.push(new BlockCore(world, { x: dim.w + dim.d / 2, y: dim.h / 2, w: dim.d, h: dim.h, color: 'black' }, { isStatic: true }));
  // top
  blocks.push(new BlockCore(world, { x: dim.w / 2, y: -dim.d / 2, w: dim.w, h: dim.d, color: 'black' }, { isStatic: true }));
  // bottom
  // blocks.push(new BlockCore(world, { x: dim.w / 2, y: dim.h + dim.d / 2, w: dim.w, h: dim.d, color: 'black' }, { isStatic: true }));
  blocks.push(new BlockCore(world, { x: dim.w - 1350, y: 1275, w: 1000, h: 30}, { isStatic: true }));

  
// Wasserruine Platform
blocks.push(new BlockCore(world, { x: dim.w - 1200, y: 5640, w: 500, h: 30}, { isStatic: true }));


  // Baumstamm 
  baumstamm1 = new PolygonFromSVG(
    world, {
    x: dim.w -210,
    y: 2375,
    fromFile: 'Baumstamm1.svg',
    scale: 1,
  }, { isStatic: true, friction: 0.0 }
  )
  baumstamm2 = new PolygonFromSVG(
    world, {
    x: 200,
    y: 3100,
    fromFile: 'Baumstamm2.svg',
    scale: 1,
  }, { isStatic: true, friction: 0.0 }
  )

  blocks.push(baumstamm1,baumstamm2),


  // Brunnen Stütze
  blocks.push(new Block(world, { x: dim.w - 350, y: 3460, w: 20, h: 115 }, { isStatic: true }));



  // Pot Example
  pots.push(createPot(world,2675, 525, 150, 230));
  pots.push(fallingPotSensor(world,790, 1240, 150, 230));
  vasen.push(createVase(world,790, 1040, 150, 230));

  startSensorFunc();

  felsenSvg(200, 6150, "FelsenSvg01.svg")
  felsenSvg(1400 , 6275, "FelsenSvg02.svg")
  felsenSvg(2900 , 6275, "FelsenSvg03.svg")
  felsenSvg(3550 , 7020, "FelsenSvg04.svg")
  felsenSvg(2400 , 7000, "FelsenSvg05.svg")
  felsenSvg(1050 , 7000, "FelsenSvg06.svg")

  unterwasserFelsenSvg(950, 4900, "UnterwasserFelsenBig.svg")
  unterwasserFelsenSvg(1100, 5625, "UnterwasserFelsenBig.svg")
  unterwasserFelsenSvg(1575, 5625, "UnterwasserFelsenBig.svg")
  unterwasserFelsenSvg(2800, 4920, "UnterwasserFelsenSmall.svg")
  unterwasserFelsenSvg(2300, 5625, "UnterwasserFelsenSmall.svg")

  for (let i = 0; i < 11; i++)
    setupGround(i);

 

  bgMusic.play()
  
  // create moving Pillar 
  movingPillars.push(new Block(
    world,
    {
      x: dim.w /3 - 14, y: 500, w: 60, h: 230, image: saeuleImg, initialPosition: { x: dim.w / 6, y: 350 }, status: "stopped", direction: 3,
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
      x: dim.w / 2 - 656, y: 1055, w: 60, h: 300, image: saeuleImg, initialPosition: { x: dim.w / 6, y: 1055 }, status: "stopped", direction: 3,
      trigger: (ball, block) => {
        // Game Over
        // alert("Ups..Der Granatapfel wurde von einer Säule getroffen. Versuche es nochmal!"), 
        // location.reload();  
      }
    },
    { isStatic: true},
  ));



  // create falling lance 
createFallingLance(dim.w / 2 + 305,500, { x: 0.2, y: 0.0 })
createFallingLance(dim.w -500,1200, { x: -0.2, y: 0.0 })
createFallingLance(dim.w -750,3350, { x: 0.2, y: 0.0 })

// Lance des Soldaten 
blocks.push (new Block(world, {x: 1160, y: 2635, w: 15, h: 470,  image: lanceSoldatImg},
  {isStatic: true, angle:  130 * (Math.PI / 180)}))
 


createFelsbrocken(3150, 6000, "FallingFelsen.svg");

// Stütze für die erste Lance 
// blocks.push(new Block(
//   world,
//   {x: dim.w / 2 + 505, y: 520, w: 20, h: 400, color: "white",
//   trigger: (ball,block) => {
//     Matter.Body.setStatic(fallingLance[0].body, true)
//   }},
//   {  isStatic: true , angle: PI /3}
// ));


 


  // the ball has a label and can react on collisions
  granatapfel = new Ball(world,
    { x: 100, y: 6000, r: 60, image: granatapfelImg },
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
  off = { x: Math.min(Math.max(0, point.x - windowWidth / 2), dim.w - windowWidth), y: Math.min(Math.max(0, point.y - windowHeight / 2 - 200), dim.h - windowHeight) };
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
      // setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
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
  pots.forEach(block => block.draw());
  underwaterSensor.forEach(block => block.draw());
  fishes.forEach(block => block.draw());
  luftblasen.forEach(block => block.draw());
  vasen.forEach(block => block.draw());





  movingPillars.forEach((block) => {
    if (block.attributes.status === 'movingDown') {
      if (block.body.position.y >= block.attributes.initialPosition.y + 175) {
        block.attributes.status = 'movingUp';
      } else {
        Matter.Body.setPosition(block.body, { x: block.body.position.x, y: block.body.position.y + block.attributes.direction });
      }
    } else if (block.attributes.status === 'movingUp') {
      if (block.body.position.y <= block.attributes.initialPosition.y + 25) {
        block.attributes.status = 'movingDown';
      } else {
        Matter.Body.setPosition(block.body, { x: block.body.position.x, y: block.body.position.y - block.attributes.direction });
      }
    }
  });

  mouse.draw();


  arrows.forEach(arrow => {
    arrow.back.draw();
    arrow.front.draw();
    arrow.back.drawConstraints();
  }); 

  fireballs.forEach(fireball => {
    fireball.back.draw();
    fireball.front.draw();
    fireball.back.drawConstraints();
  }); 

  flashes.forEach(flash => {
    flash.back.draw();
    flash.front.draw();
    flash.back.drawConstraints();
  });
  


}







