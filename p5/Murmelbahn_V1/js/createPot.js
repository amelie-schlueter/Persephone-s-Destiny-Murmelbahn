
  function createPot(world,x, y, w, h) {
      return new Block(
        world,
        {x: x, 
        y: y, 
        w: w, 
        h: h, 
        image: potImg, 
        isTriggered: false,
        trigger: (ball, block) => {
          if (!block.isTriggered) {  // Überprüfen, ob der Trigger bereits ausgelöst wurde
            block.isTriggered = true; 
            Matter.Body.setStatic(fallingLance[0].body, true);
            fallingLanceSound.play(); 
          }}},
        { isStatic: true }
      )
}





function fallingPotSensor(world, x, y, w, h) {
  return new Block(
    world,
    {
      x: x,
      y: y,
      w: w,
      h: h,
      image: potImg,
      trigger: (ball, block) => {
        Matter.Body.setStatic(vasen[0].body, false);
        Matter.Body.applyForce(vasen[0].body, vasen[0].body.position, { x: -1, y: -0.4 });

        // Timeout, um den Verfall zu verzögern
        setTimeout(() => {
          Matter.Composite.remove(world, [vasen[0].body]);
          vasen[0].attributes.image = null;

          // Erzeuge kleine Bälle an der Position des verfallenen Vasen-Objekts
          for (var i = 0; i < 4; i++) {
            var ballImage;
            if (i === 0) {
              ballImage = vaseKaputtImg1;
            } else if (i === 1) {
              ballImage = vaseKaputtImg2;
            } else if (i === 2) {
              ballImage = vaseKaputtImg3;
            } else {
              ballImage = vaseKaputtImg4;
            }

            var forceMagnitude;
            if (i === 0) {
              forceMagnitude = {x: 0, y: -0.005};
            } else if (i === 1) {
              forceMagnitude = {x: -0.0015, y: -0.003};
            } else if (i === 2) {
              forceMagnitude = {x: -0.003, y: 0};
            } else {
              forceMagnitude = {x: 0.002, y: -0.007};
            }

            var ball = new Ball(
              world,
              {
                x: vasen[0].body.position.x,
                y: vasen[0].body.position.y,
                r: random(10, 15),
                image: ballImage
              },
              { isStatic: false }
            );
            blocks.push(ball);
            potCrack.play();

            // Apply force to each ball
            Matter.Body.applyForce(ball.body, ball.body.position, forceMagnitude);
          }
        }, 450);
      }
    },
    { isStatic: true, isSensor: true }
  );
}
