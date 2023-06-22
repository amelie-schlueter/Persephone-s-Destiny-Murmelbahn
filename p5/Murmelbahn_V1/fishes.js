

// function createFishes(max) {
//   for (i =0; i<max ; i++) {
//     const fishType = Math.floor(random(0,2))
//     console.log(fishType) 
//     fish = new Block(world, 
//       {x: random(2000,3700), y: random(4400, 4600), w: 25, h: 25, image: fishType? tintenfischImg:fishImg, fishType: fishType }, 

//       {frictionAir: 0.1, density: 0.013 , isStatic: false});

//     fishes.push(fish);
//   }
// }

// // Generate Random Force for Arrows 
// // function getRandomForceForFish(fishType) {
// //   // Generiere zufällige Werte für die x- und y-Komponenten der Kraft
// //   let randomX, randomY;
// //   if (fishType == 1) {
// //     randomX = random(-0.025, -0.015);
// //     randomY = random(-0.006, -0.004);
// //   } else {
// //     randomX = random(-0.015, -0.02);
// //     randomY = 0; 
// //   }
// //   console.log("randomForce generated")
// //   return { x: randomX, y: randomY };
// // }

// function removeFishes() {
//   if (fishes.length > 0) {
//     let removedFish = fishes.shift(); // Entferne das erste Element aus dem Array
//     Matter.Composite.remove(world, [removedFish.body]);
//     console.log("Letztes Fish gelöscht");
//   }
// }


// function moveFishes() {
//     // let force = {x: -0.01, y: -0.0135}
//     fishes.forEach(fish => {
//       // let force = getRandomForceForFish(fish.attributes.fishType)
//       Matter.Body.applyForce(fish.body, fish.body.position, {x: -0.025, y: -0.015});
//     })
//     // Matter.Body.applyForce(fish.body, fish.body.position, {x: -0.02, y: -0.006});
//     // force = force + 0.001
// }


// // // Starte den Schuss von Fishes
// // function startFishes() {
// //     console.log("fishInterval == true")
// //     let fish = createFishes(3)
// //     if (fish.attributes.fishType == 0) {
// //       setInterval(moveFishes, 1000)
// //     } else {
// //       setInterval(moveFishes, 16)
// //     }
// //     // clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
// // }

// function startFishes() {
//   console.log("fishInterval == true");
//   let fish = createFishes(3);

//   fishes.forEach(fish => {
//     if (fish.attributes.fishType === 0) {
//       setInterval(() => {
//         moveFishes(fish);
//       }, 700); // Für Fish mit fishType 0, alle 0,7 Sekunden
//     } else if (fish.attributes.fishType === 1) {
//       setInterval(() => {
//         moveFishes(fish);
//       }, 100); // Für Fish mit fishType 1, alle 0,1 Sekunden
//     }
//   });

//   // clearInterval(shootInterval); // Beende das aktuelle Intervall, falls vorhanden
// }



function createFishes(max) {
  for (let i = 0; i < max; i++) {
    const fishType = Math.floor(Math.random() * 2);
    const fish = new Block(
      world,
      {
        x: random(2000, 3700),
        y: random(4400, 4600),
        w: 25,
        h: 25,
        image: fishType ? tintenfischImg : fishImg,
        fishType: fishType
      },
      { frictionAir: 0.1, density: 0.005, isStatic: false }
    );
    fishes.push(fish);
  }
}

// function removeFishes() {
//   fishes.forEach((fish, index) => {
//     if (fish.body.position.x < 100) {
//       Matter.Composite.remove(world, [fish.body]);
//       fishes.splice(index, 1); // Entferne den Fisch aus dem Array
//       console.log("Fish entfernt: ", fish);
//     }
//   });
// }


function moveFishes(fish) {
  let force;
  if (fish.attributes.fishType === 0) {
    force = { x: random(-0.009, -0.007), y: -0.011 };
  } else if (fish.attributes.fishType === 1) {
    force = { x: random(-0.4, -0.1), y: random(-0.35, -0.2) };
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

