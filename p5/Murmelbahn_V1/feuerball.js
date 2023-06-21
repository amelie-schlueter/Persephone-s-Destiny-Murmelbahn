

function createFireball() {
    fireball = new Block(world, 
      {x: 3000, y: 6100, w: 35, h: 35, image: fireballImg,
      trigger: (ball, block) => {
        //Game Over
        console.log("fireball hat Murmel getroffen")
        // alert("Ups..Zeus Blitze haben dich getroffen. Beginne von vorn")
        // location.reload();  
      }}, 
      {density: 0.03, frictionAir: 0.0,   isStatic: true});
  
  
    fireballs.push(fireball);
    return fireballs[fireballs.length - 1];
}

// Generate Random Force for fireballs 
function getRandomForceForFireballs() {
  // Generiere zufällige Werte für die x- und y-Komponenten der Kraft
  let randomX = random(-1, -2.9)
  let randomY = random(-0.5, -1.6)
  return { x: randomX, y: randomY };
}

function removeFireball() {
  if (fireballs.length > 0) {
    let removedfireball = fireballs.shift(); // Entferne das erste Element aus dem Array
    Matter.Composite.remove(world, [removedfireball.body, removedfireball.body]);
    console.log("Letztes fireball gelöscht");
  }
}

function shootFireball() {
    console.log("shootfireballs")
    let fireball = createFireball()
    Matter.Body.setStatic(fireball.body, false);
    let force = getRandomForceForFireballs();
    Matter.Body.applyForce(fireball.body, fireball.body.position, force);
    // setTimeout(removeFireball, 1200); // Entferne den fireball nach 1 Sekunden

}



  
// Starte den Schuss von Blitzen
function startFireballs() {
  if (fireballInterval == null) {
    console.log("fireballInterval == true")
    fireballInterval = setInterval(shootFireball, 1000)
  }
}


