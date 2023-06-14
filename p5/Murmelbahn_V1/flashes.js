let currentFlash = null;

function createFlash() {
  if (currentFlash === null) {
    flashBack = new Ball(world, 
      {x: 3200, y: 1800, s: 6, r: 20, color: 'white'}, 
      {frictionAir: 0.1 , isStatic: true});
  
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
  if (shootInterval && hitFlashSensor == true) {
    clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
  }
  
  if (hitFlashSensor == true) {
    createFlash();
    setTimeout(shootFlash, 500)
    setTimeout(startFlashes, 1000); // Rufe die Funktion startFlashes nach 1 Sekunde erneut auf
  }
}
