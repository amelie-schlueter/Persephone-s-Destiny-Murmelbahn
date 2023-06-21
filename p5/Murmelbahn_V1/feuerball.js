

function createfeuerball() {
    feuerballBack = new Ball(world, 
      {x: 3200, y: 1800, s: 6, r: 20 }, 
      {frictionAir: 0.1 , isStatic: true});
  
    feuerballFront = new Ball(world, 
      {x: 3100, y: 1700, s: 6, r: 20, 
      trigger: (ball, block) => {
        //Game Over
        console.log("Flash hat Murmel getroffen")
        // alert("Ups..Zeus Blitze haben dich getroffen. Beginne von vorn")
        // location.reload();  
      }}, 
      {density: 0.015, isStatic: true});
  
    feuerball = flashBack.constrainTo(flashFront, { length: 130, stiffness: 1, draw: true, image: flashImg});
  
    flashes.push({ back: feuerballBack, front: feuerballFront, constraint: feuerball });
    return flashes[flashes.length - 1];
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
    let removedfeuerball = flashes.shift(); // Entferne das erste Element aus dem Array
    Matter.Composite.remove(world, [removedfeuerball.back.body, removedFlash.front.body]);
    console.log("Letztes Flash gelöscht");
  }
}


function shootFlash() {

    console.log("shootflash")
    let flash = createFlash()
    Matter.Body.setStatic(flash.front.body, false);
    Matter.Body.setStatic(flash.back.body, false);
    let force = getRandomForceForFlashes();
    Matter.Body.applyForce(flash.front.body, flash.front.body.position, force);
    setTimeout(removeFlash, 1200); // Entferne den Flash nach 1 Sekunden

}


// Starte den Schuss von Blitzen
function startFlashes() {
  if (flashesInterval == null) {
    console.log("flashesInterval == true")
    flashesInterval = setInterval(shootFlash, 1000)
    
  }
}
