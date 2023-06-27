

function createFishes(max, minY, maxY, minX, maxX) {
  for (let i = 0; i < max; i++) {
    const fishType = Math.floor(Math.random() * 2);
    const fish = new Block(
      world,
      {
        x: random(minX, maxX),
        y: random(minY, maxY),
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




function startFirstFishes() {
  console.log("FishInterval == true");

  // Erzeuge Fische im ersten Bereich (4400-4800)
  createFishes(3, 4400, 4800, 1500, 3900);

  fishes.forEach(fish => {
    let interval;
    if (fish.attributes.fishType === 0) {
      interval = random(35, 25); // Zufälliges Intervall zwischen 25 und 35 Millisekunden
    } else if (fish.attributes.fishType === 1) {
      interval = random(700, 900); // Zufälliges Intervall zwischen 700 und 900 Millisekunden
    }

    const moveFish = () => {
      moveFishes(fish);
      setTimeout(moveFish, interval); // Rufe die moveFish-Funktion erneut nach dem zufälligen Intervall auf
    };

    moveFish(); // Starte die Bewegung des Fisches
  });
}

function startSecondFishes() {
  console.log("FishInterval == true");

  // Erzeuge Fische im zweiten Bereich (5200-5600)
  createFishes(3, 5200, 5600, 3000, 3900);

  fishes.forEach(fish => {
    let interval;
    if (fish.attributes.fishType === 0) {
      interval = random(35, 25); // Zufälliges Intervall zwischen 25 und 35 Millisekunden
    } else if (fish.attributes.fishType === 1) {
      interval = random(700, 900); // Zufälliges Intervall zwischen 700 und 900 Millisekunden
    }

    const moveFish = () => {
      moveFishes(fish);
      setTimeout(moveFish, interval); // Rufe die moveFish-Funktion erneut nach dem zufälligen Intervall auf
    };

    moveFish(); // Starte die Bewegung des Fisches
  });
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


// function startFishes() {
//   console.log("fishInterval == true");
//   let fish = createFishes(4);

//   fishes.forEach(fish => {
//     let interval;
//     if (fish.attributes.fishType === 0) {
//       interval = random(35, 25) // Zufälliges Intervall zwischen 1000 und 2000 Millisekunden (1 bis 2 Sekunden)
//     } else if (fish.attributes.fishType === 1) {
//       interval = random(900, 700) // Zufälliges Intervall zwischen 200 und 500 Millisekunden
//     }

//     const moveFish = () => {
//       moveFishes(fish);
//       setTimeout(moveFish, interval); // Rufe die moveFish-Funktion erneut nach dem zufälligen Intervall auf
//     };

//     moveFish(); // Starte die Bewegung des Fisches
//   });
// }

