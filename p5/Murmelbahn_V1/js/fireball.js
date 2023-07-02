function createFireball() {
  const fireballBack = new Ball(
    world,
    { x: 650, y: 6650, s: 6, r: 20},
    { frictionAir: 0.06, isStatic: true }
  );

  const fireballFront = new Ball(
    world,
    {
      x: 650,
      y: 6650,
      s: 6,
      r: 20,
      trigger: (ball, block) => {
        // Game Over
        console.log("Fireball hat Murmel getroffen");
        // alert("Ups..Du wurdest von einem Fireball getroffen. Beginne von vorn");
        // location.reload();
      },
    },
    { density: 0.003, isStatic: true }
  );

  const fireball = fireballBack.constrainTo(fireballFront, {
    length: 130,
    stiffness: 1,
    draw: true,
    image: fireballImg,
  });

  fireballs.push({ back: fireballBack, front: fireballFront, constraint: fireball });
  return fireballs[fireballs.length - 1];
}

// Generate Random Force for Fireballs
function getRandomForceForFireballs() {
  // Generiere zufällige Werte für die x- und y-Komponenten der Kraft
  const randomX = random(0.5, 1.5);
  const randomY = random(-0.2, -0.4);
  return { x: randomX, y: randomY };
}

function removeFireball() {
  if (fireballs.length > 0) {
    const removedFireball = fireballs.shift(); // Entferne das erste Element aus dem Array
    Matter.Composite.remove(world, [removedFireball.back.body, removedFireball.front.body]);
    console.log("Letzten Fireball gelöscht");
  }
}

function shootFireball() {
  console.log("shootFireball");
  const fireball = createFireball();
  Matter.Body.setStatic(fireball.front.body, false);
  Matter.Body.setStatic(fireball.back.body, false);
  const force = getRandomForceForFireballs();
  soundFireball.play();
  Matter.Body.applyForce(fireball.front.body, fireball.front.body.position, force);
  setTimeout(removeFireball, 1200); // Entferne den Fireball nach 1 Sekunden
}

// Starte den Schuss von Fireballs
function startFireballs() {
  if (fireballInterval == null) {
    console.log("fireballInterval == true");
    fireballInterval = setInterval(shootFireball, 1000);
    // clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
  }
}
