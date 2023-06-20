

function createFishes() {
    fish = new Ball(world, 
      {x: 3000, y: 4600, s: 6, r: 20, image: tintenfischImg}, 
      {frictionAir: 0.1, density: 0.0003 , isStatic: false});

    fishes.push(fish);
    return fishes[fishes.length - 1];
}

// Generate Random Force for Arrows 
function getRandomForceForFish() {
  // Generiere zufällige Werte für die x- und y-Komponenten der Kraft
  let randomX = random(-0.02,  -0.025);
  let randomY = random(-0.006,-0.0062 ) ;
  console.log("randomForce generated")
  return { x: randomX, y: randomY };
}

function removeFishes() {
  if (fishes.length > 0) {
    let removedFish = fishes.shift(); // Entferne das erste Element aus dem Array
    Matter.Composite.remove(world, [removedFish.body]);
    console.log("Letztes Arrow gelöscht");
  }
}


function moveFishes() {
    let force = {x: -0.01, y: -0.0135}
    Matter.Body.applyForce(fish.body, fish.body.position, force);
    // Matter.Body.applyForce(fish.body, fish.body.position, {x: -0.02, y: -0.006});
    // force = force + 0.001
}


// Starte den Schuss von Blitzen
function startFishes() {
  if (fishInterval == null) {
    console.log("fishInterval == true")
    let fish = createFishes()
    fishInterval = setInterval(moveFishes, 700)
    // clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
  }
}
