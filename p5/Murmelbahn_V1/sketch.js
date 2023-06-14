const Engine = Matter.Engine;
const Runner = Matter.Runner;
const Bodies = Matter.Bodies;
const Events = Matter.Events;
const World = Matter.World;

// the Matter engine to animate the world
let engine;
let groundsRight = [];
let groundsLeft = [];
let world;
let mouse;
let arrowBack;
let arrowFront;
let arrow;
let flashBack;
let flashFront;
let flash;
let flashes = [];
let groundSensors = [];
let hitFlashSensor = false; 
let examplePot = [];
let currentGround = null;
let shootInterval = null; // Referenz auf das Intervall
let granatapfelImg;
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

  setupGround1();


  // Pot Example

  examplePot.push(createPot(world,2750, 550, 230, 230));

  // blocks.push(examplePot);

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
  // Create Grounds 
  groundsRight.push(new BlockCore(
    world,
    {
      x: dim.w / 2 - 100, y: 730, w: dim.w - 100, h: 70,
      // trigger: (ball, block) => {
      //   forceBall = { x: 0.09, y: -0.0 };
      //   setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
      // }
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: 100, y: 730, w: 800, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: 0.09, y: -0.0 };
        setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  

  groundsLeft.push(new BlockCore(
    world,
    {
      x: dim.w / 2 + 100, y: 1400, w: dim.w - 100, h: 70
    },
    { isStatic: true }
  ));
  
  groundSensors.push(new BlockCore (
    world, 
    { x: dim.w -150, y: 1400, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: -0.09, y: -0.0 };
        setPillarStatus(1, "movingDown"); // Setze Pillar mit Index 1 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  groundsRight.push(new BlockCore(
    world,
    {
      x: dim.w / 2 - 100, y: 2100, w: dim.w - 100, h: 70,
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: 100, y: 2100, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: 0.09, y: -0.0 };
        setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
        hitFlashSensor = true;
        startFlashes(); 

      }
    },
    {isStatic: true, isSensor: true}
  ));


  groundsLeft.push(new BlockCore(world,
    {
      x: dim.w / 2 + 100, y: 2800, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: -0.09, y: -0.0 };
        hitFlashSensor = false; 
        startFlashes();
      }
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: dim.w -150, y: 2800, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: -0.09, y: -0.0 };
        setPillarStatus(1, "movingDown"); // Setze Pillar mit Index 1 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  

  groundsRight.push(new BlockCore(world,
    {
      x: dim.w / 2 - 100, y: 3475, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: 0.09, y: -0.0 };
      }
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: 100, y: 3475, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: 0.09, y: -0.0 };
        setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));


  groundsLeft.push(new BlockCore(world,
    {
      x: dim.w / 2 + 100, y: 4180, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: -0.09, y: -0.0 };
      }
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: dim.w -150, y: 4180, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: -0.09, y: -0.0 };
        setPillarStatus(1, "movingDown"); // Setze Pillar mit Index 1 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));


  groundsRight.push(new BlockCore(world,
    {
      x: dim.w / 2 - 100, y: 4880, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: 0.09, y: -0.0 };
      }
    },
    { isStatic: true }
  ));
  groundSensors.push(new BlockCore (
    world, 
    { x: 100, y: 4880, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: 0.09, y: -0.0 };
        setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  groundsLeft.push(new BlockCore(world,
    {
      x: dim.w / 2 + 100, y: 5565, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: -0.09, y: -0.0 };
      }
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: dim.w -150, y: 5565, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: -0.09, y: -0.0 };
        setPillarStatus(1, "movingDown"); // Setze Pillar mit Index 1 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  groundsRight.push(new BlockCore(world,
    {
      x: dim.w / 2 - 100, y: 6275, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: 0.09, y: -0.0 };
      }
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: 100, y: 6275, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: 0.09, y: -0.0 };
        setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  groundsLeft.push(new BlockCore(world,
    {
      x: dim.w / 2 + 100, y: 6990, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: -0.09, y: -0.0 };
      }
    },
    { isStatic: true }
  ));
  
  groundSensors.push(new BlockCore (
    world, 
    { x: dim.w -150, y: 6990, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: -0.09, y: -0.0 };
        setPillarStatus(1, "movingDown"); // Setze Pillar mit Index 1 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  groundsRight.push(new BlockCore(world,
    {
      x: dim.w / 2 - 100, y: 7650, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: 0.09, y: -0.0 };

      }
    },
    { isStatic: true }
  ));

  groundSensors.push(new BlockCore (
    world, 
    { x: 100, y: 6275, w: 7650, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: 0.09, y: -0.0 };
        setPillarStatus(0, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));

  groundsLeft.push(new BlockCore(world,
    {
      x: dim.w / 2 + 100, y: 8345, w: dim.w - 100, h: 70,
      trigger: (ball, block) => { // console.log("Trigger ", ball, block);
        forceBall = { x: -0.09, y: -0.0 };
      }
    },
    { isStatic: true }
  ));

   
  groundSensors.push(new BlockCore (
    world, 
    { x: dim.w -150, y: 8345, w: 600, h: 70, color: "green",
      trigger: (ball, block) => {
        forceBall = { x: -0.09, y: -0.0 };
        setPillarStatus(1, "movingDown"); // Setze Pillar mit Index 1 auf "movingDown"
      }
    },
    {isStatic: true, isSensor: true}
  ));



  // create moving Pillar 
  movingPillars.push(new Block(
    world,
    {
      x: dim.w /3 , y: 250, w: 500, h: 60, color: "blue", initialPosition: { x: dim.w / 6, y: 250 }, status: "stopped", direction: 3,
      trigger: (ball, block) => {
        // Game Over
        // alert("Ups..Der Granatapfel wurde von einer Säule getroffen. Versuche es nochmal!"), 
        // location.reload();  

      }
    },
    { label: "Murmel", isStatic: true, angle: PI / 2 }
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
    { label: "Murmel", isStatic: true, angle: PI / 2 },
  ));




  // create falling lance 
  fallingLance.push(new Block(
    world,
    {
      x: dim.w / 2 + 305, y: 500, w: 20, h: 450, color: 'green',
      isTriggered: false,

      trigger: (ball, block) => {
        if (!block.isTriggered) {
          // const targetPosition = { x: block.body.position.x, y: block.body.position.y + block.attributes.h }; // Zielposition (Unterkante der Lanze)

          Matter.Body.setStatic(block.body, false);
          Matter.Body.applyForce(block.body, block.body.position, { x: 0.2, y: 0.0 });
          // Matter.Body.setPosition(block.body, targetPosition); // Setze den Körper auf die Zielposition

          block.isTriggered = true;
        }
      }
    },
    { label: "Murmel", isStatic: true }
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
    { x: 175, y: 450, r: 35, image: granatapfelImg },
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


let currentFlash = null;

function createFlash() {
  if (currentFlash === null) {
    flashBack = new Ball(world, 
      {x: 3200, y: 1800, s: 6, r: 20, color: 'white'}, 
      {label: "Murmel", frictionAir: 0.1 , isStatic: true});
  
    flashFront = new Ball(world, 
      {x: 3100, y: 1700, s: 6, r: 20, color: 'blue', 
      trigger: (ball, block) => {
        //Game Over
        console.log("Flash hat Murmel getroffen")
        alert("Ups..Zeus Blitze haben dich getroffen. Beginne von vorn")
        location.reload();  
      }}, 
      {density: 0.015, isStatic: true});
  
    flash = flashBack.constrainTo(flashFront, { length: 100, stiffness: 1, draw: true});
  
    flashes.push({ back: flashBack, front: flashFront, constraint: flash });
    currentFlash = flashes[flashes.length - 1];
  }
}

// Generate Random Force for Flashes 
function getRandomForceForFlashes() {
  // Generiere zufällige Werte für die x- und y-Komponenten der Kraft
  let randomX = Math.random() * (-1.5 - (-3)) + (-3);
  let randomY = Math.random() * (-1 - (-1.5)) + (-1.5);
  return { x: randomX, y: randomY };
}

function removeFlash() {
  if (flashes.length > 0) {
    let removedFlash = flashes.shift(); // Entferne das erste Element aus dem Array
    Matter.Composite.remove(world, [removedFlash.back.body, removedFlash.front.body]);
    console.log("Letztes Flash gelöscht");
  }
}


function shootFlash() {
  if (currentFlash !== null) {
    let flash = currentFlash;
    Matter.Body.setStatic(flash.front.body, false);
    Matter.Body.setStatic(flash.back.body, false);
    let force = getRandomForceForFlashes();
    Matter.Body.applyForce(flash.front.body, flash.front.body.position, force);
    currentFlash = null;
    setTimeout(removeFlash, 1000); // Entferne den Flash nach 2 Sekunden
  }

}


// Starte den Schuss von Blitzen
function startFlashes() {
  if (shootInterval && hitFlashSensor) {
    clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
  }
  
  if (hitFlashSensor) {
    createFlash();
    setTimeout(shootFlash, 500)
    setTimeout(startFlashes, 1000); // Rufe die Funktion startFlashes nach 1 Sekunde erneut auf
  }
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
  groundsRight.forEach(block => block.draw());
  groundsLeft.forEach(block => block.draw());
  blocks.forEach(block => block.draw());
  movingPillars.forEach(block => block.draw());
  fallingLance.forEach(block => block.draw());
  examplePot.forEach(block => block.draw());
  groundSensors.forEach(block => block.draw());



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







