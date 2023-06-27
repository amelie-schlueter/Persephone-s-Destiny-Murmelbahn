function createLuftblase(x,y) {
  const radius = Math.random() * (25 - 10) + 10;
  let image = mediumLuftblasenImg
  if (radius < 12) {
    image = smallLuftblasenImg
  } else if (radius < 17) {
    image = mediumLuftblasenImg
  } else if (radius < 20) {
    image = largeLuftblasenImg
  } else if (radius < 25) {
    image = xLargeLuftblasenImg
  }
  luftblasen.push(
    new Ball(world,
      { x: x, y: y, r: radius + 10, image: image },
      { density: 0.0005, restitution: 0, frictionAir: 0.09, isStatic: false }
    )
  );
}

function getRandomForceForLuftblasen() {
  let randomY = random(-0.005, -0.008)
  let randomX = random(0.003, -0.003)

  return { x: randomX, y: randomY };
}

function moveLuftblasen() {
  for (let i = 0; i < luftblasen.length; i++) {
    let force = getRandomForceForLuftblasen();
    Matter.Body.applyForce(luftblasen[i].body, luftblasen[i].body.position, force);

    if (luftblasen[0].body.position.y < luftblasen[0].attributes.y - 500) {
      removeLuftblase(0);
    }
  }
}

let luftblasenInterval2

function startLuftblasen() {
  console.log("Luftblaseninterval == true");
  luftblasen = []; // Leeres Array für Luftblasen erstellen

  luftblasenInterval = setInterval(function () {
    createLuftblase(1700,4975);
    createLuftblase(3000,5700);
    
  
  }, 300);
  luftblasenInterval2 = setInterval(function() {
    createLuftblase(1375,5700);
  } , 100);

    setInterval(moveLuftblasen, 75);
}

function removeLuftblase(index) {
  let removedLuftblase = luftblasen.splice(index, 1)[0];
  Matter.Composite.remove(world, [removedLuftblase.body]);
  console.log("Luftblase gelöscht");
}
