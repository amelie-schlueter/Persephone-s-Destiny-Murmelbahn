function createLuftblase() {
    const radius = Math.random() * (25 - 10) + 10;
    luftblasen.push(
      new Ball(world,
        { x: 1500, y: 5700, r: radius + 10, color: "lightblue" },
        { density: 0.00005, restitution: 0, frictionAir: 0.09, isStatic: false }
      )
    );
  }
  
  function getRandomForceForArrows() {
    let randomY = Math.random() * (-0.0005 - (-0.0010)) + (-0.001);
    let randomX = Math.random() * (0.0005 - (-0.0005)) + (-0.0005);
  
    return { x: randomX, y: randomY };
  }
  
  function moveLuftblasen() {
    for (let i = 0; i < luftblasen.length; i++) {
      let force = getRandomForceForArrows();
      Matter.Body.applyForce(luftblasen[i].body, luftblasen[i].body.position, force);
  
      if (luftblasen[i].body.position.y < luftblasen[i].attributes.y - 500) {
        removeLuftblase(i);
      }
    }
  }
  
  function startLuftblasen() {
    console.log("Luftblaseninterval == true");
    luftblasen = []; // Leeres Array für Luftblasen erstellen
  
    luftblasenInterval = setInterval(function() {
      createLuftblase();
    }, 800);
  
    setInterval(moveLuftblasen,75);
  }
  
  function removeLuftblase(index) {
    let removedLuftblase = luftblasen.splice(index, 1)[0];
    Matter.Composite.remove(world, [removedLuftblase.body]);
    console.log("Luftblase gelöscht");
  }
  