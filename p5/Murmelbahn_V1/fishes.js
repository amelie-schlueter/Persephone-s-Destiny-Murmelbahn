

function createFishes(max) {
  for (i =0; i<max ; i++) {
    const fishType = Math.floor(random(0,2))
    console.log(fishType) 
    fish = new Block(world, 
      {x: random(2000,3700), y: random(4400, 4600), w: 25, h: 25, image: fishType? tintenfischImg:fishImg, fishType: fishType }, 

      {frictionAir: 0.1, density: 0.0003 , isStatic: false});

    fishes.push(fish);
  }
}

// Generate Random Force for Arrows 
function getRandomForceForFish(fishType) {
  // Generiere zufällige Werte für die x- und y-Komponenten der Kraft
  let randomX, randomY;
  if (fishType == 1) {
    randomX = random(-0.025, -0.015);
    randomY = random(-0.006, -0.004);
  } else {
    randomX = random(-0.015, -0.02);
    randomY = 0; 
  }
  console.log("randomForce generated")
  return { x: randomX, y: randomY };
}

function removeFishes() {
  if (fishes.length > 0) {
    let removedFish = fishes.shift(); // Entferne das erste Element aus dem Array
    Matter.Composite.remove(world, [removedFish.body]);
    console.log("Letztes Fish gelöscht");
  }
}


function moveFishes() {
    // let force = {x: -0.01, y: -0.0135}
    fishes.forEach(fish => {
      let force = getRandomForceForFish(fish.attributes.fishType)
      Matter.Body.applyForce(fish.body, fish.body.position, force);
    })
    // Matter.Body.applyForce(fish.body, fish.body.position, {x: -0.02, y: -0.006});
    // force = force + 0.001
}


// Starte den Schuss von Fishes
function startFishes() {
    console.log("fishInterval == true")
    let fish = createFishes(3)
    setInterval(moveFishes, 16)
    // clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
}

