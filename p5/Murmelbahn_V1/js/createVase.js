



function createVase(world,x, y, w, h) {
    return new Block(
      world,
      {x: x, y: y, w: w, h: h, image: vaseImg,
      trigger: (ball, block) => {
      }},
      { isStatic: true }
    )
}


function createSchaleSvg(x, y, svg, image) {
  return fallingSchale = new PolygonFromSVG(
    world,
    {
      x: x,
      y: y,
      fromFile: svg,
      scale: 1,
      image: image,
      trigger: (ball, block) => {
        Matter.Body.setStatic(fallingSchale.body, false);
        Matter.Body.applyForce(fallingSchale.body, fallingSchale.body.position, { x: 0.2, y: -0.1 });
        
       

        // Timeout to delay the decay
        setTimeout(() => {
          Matter.Composite.remove(world, [fallingSchale.body]);
          fallingSchale.attributes.image = null;

          // Create small balls at the position of the decayed schale object
          for (var i = 0; i < 3; i++) {
            var ballImage;
            if (i === 0) {
              ballImage = schaleKaputtImg1;
            } else if (i === 1) {
              ballImage = schaleKaputtImg2;
            } else if (i === 2) {
              ballImage = schaleKaputtImg3;
            }

            var forceMagnitude;
            if (i === 0) {
              forceMagnitude = {x: 0, y: -0.01};
            } else if (i === 1) {
              forceMagnitude = {x: 0.002, y: -0.012};
            } else if (i === 2) {
              forceMagnitude = {x: 0.008, y: 0};
            }
            var ball = new Ball(
              world,
              {
                x: fallingSchale.body.position.x,
                y: fallingSchale.body.position.y,
                r: 20,
                image: ballImage
              },
              { isStatic: false }
            );
            blocks.push(ball);
            potCrack.play();
            Matter.Body.applyForce(ball.body, ball.body.position, forceMagnitude);
          }
          
        }, 450);
      }
    },
    { isStatic: true, friction: 0.0 }
  );
}



function createGranatapfel() {
  for (var i = 0; i < 10; i++) {
    var ball = new Ball(world,
        { x: 2676, y: 325, r: random(5,15), color: "#F7931E",
      trigger: (ball,block) => {
       
      }},
        { isStatic: false }
    );
    blocks.push(ball);
  }
}


