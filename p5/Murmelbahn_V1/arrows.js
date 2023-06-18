

function createArrow() {
    arrowBack = new Ball(world, 
      {x: 3000, y: 3300, s: 6, r: 20, color: "white"}, 
      {frictionAir: 0.05 , isStatic: true});
  
    arrowFront = new Ball(world, 
      {x: 2900, y: 3200, s: 6, r: 20, color: "blue" ,
      trigger: (ball, block) => {
        //Game Over
        // console.log("Arrow hat Murmel getroffen")
        // alert("Ups..Du wurdest von einem Pfeil getroffen. Beginne von vorn")
        // location.reload();  
      }}, 
      {density: 0.005, isStatic: true});
  
    arrow = arrowBack.constrainTo(arrowFront, { length: 130, stiffness: 1, draw: true, image: arrowImg});
  
    arrows.push({ back: arrowBack, front: arrowFront, constraint: arrow });
    return arrows[arrows.length - 1];
}

// Generate Random Force for Arrows 
function getRandomForceForArrows() {
  // Generiere zufällige Werte für die x- und y-Komponenten der Kraft
  let randomX = Math.random() * (-0.5 - (-1.5)) + (-1.5);
  let randomY = Math.random() * (-0.01 - (-0.03)) + (-0.5);
  return { x: randomX, y: randomY };
}

function removeArrow() {
  if (arrows.length > 0) {
    let removedArrow = arrows.shift(); // Entferne das erste Element aus dem Array
    Matter.Composite.remove(world, [removedArrow.back.body, removedArrow.front.body]);
    console.log("Letztes Arrow gelöscht");
  }
}


function shootArrow() {

    console.log("shootflash")
    let arrow = createArrow()
    Matter.Body.setStatic(arrow.front.body, false);
    Matter.Body.setStatic(arrow.back.body, false);
    let force = getRandomForceForArrows();
    Matter.Body.applyForce(arrow.front.body, arrow.front.body.position, force);
    setTimeout(removeArrow, 1200); // Entferne den Arrow nach 1 Sekunden

}


// Starte den Schuss von Blitzen
function startArrows() {
  if (arrowInterval == null) {
    console.log("arrowInterval == true")
    arrowInterval = setInterval(shootArrow, 1000)
    clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
  }
}
