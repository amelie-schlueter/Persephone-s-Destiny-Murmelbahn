



function createFishes(max) {
  for (let i = 0; i < max; i++) {
    const fishType = Math.floor(Math.random() * 2);
    const fish = new Block(
      world,
      {
        x: random(1500, 3900),
        y: random(4400, 4800),
        w: 25,
        h: 25,
        image: fishType ? tintenfischImg : fishImg,
        fishType: fishType
      },
      { frictionAir: 0.1, density: 0.01, isStatic: false }
    );
    fishes.push(fish);
  }
}




function moveFishes(fish) {
  let force;
  if (fish.attributes.fishType === 0) {
    force = { x: random(-0.02, -0.01), y: -0.0045  };
  } else if (fish.attributes.fishType === 1) {
    force = { x: random(-0.6, -0.1), y: random(-0.16, -0.03) };
  }
  Matter.Body.applyForce(fish.body, fish.body.position, force);

  if (fish.body.position.x < 100) {
    Matter.Composite.remove(world, [fish.body]);
    const index = fishes.indexOf(fish);
    if (index !== -1) {
      fishes.splice(index, 1); // Entferne den Fisch aus dem Array
      console.log("Fish entfernt: ", fish);
    }
  }
}


function startFishes() {
  console.log("fishInterval == true");
  let fish = createFishes(3);

  fishes.forEach(fish => {
    let interval;
    if (fish.attributes.fishType === 0) {
      interval = random(35, 25) // Zufälliges Intervall zwischen 1000 und 2000 Millisekunden (1 bis 2 Sekunden)
    } else if (fish.attributes.fishType === 1) {
      interval = random(900, 700) // Zufälliges Intervall zwischen 200 und 500 Millisekunden
    }

    const moveFish = () => {
      moveFishes(fish);
      setTimeout(moveFish, interval); // Rufe die moveFish-Funktion erneut nach dem zufälligen Intervall auf
    };

    moveFish(); // Starte die Bewegung des Fisches
  });
}

