



function createVase(world,x, y, w, h) {
    return new Block(
      world,
      {x: x, y: y, w: w, h: h, image: vaseImg,
      trigger: (ball, block) => {
      }},
      { isStatic: true }
    )
}


function createSchaleSvg(x,y,svg, image) {
  return fallingSchale = new PolygonFromSVG(
      world, {
      x: x,
      y: y,
      fromFile: svg,
      scale: 1,
      image: image,
      trigger: (ball, block) => {
        Matter.Body.setStatic(fallingSchale.body, false);
        Matter.Body.applyForce(fallingSchale.body, fallingSchale.body.position, { x: 0.2, y: -0.1 })

          // Timeout, um den Verfall zu verzögern
          setTimeout(() => {
            Matter.Composite.remove(world, [fallingSchale.body]);
            fallingSchale.attributes.image = null;
  
            // Erzeuge kleine Bälle an der Position des verfallenen Vasen-Objekts
            for (var i = 0; i < 20; i++) {
              var ball = new Ball(
                world,
                {
                  x: fallingSchale.body.position.x,
                  y: fallingSchale.body.position.y,
                  r: random(10, 15),
                  color: "black"
                },
                { isStatic: false }
              );
              blocks.push(ball);
              potCrack.play()
            }
          }, 500);
        }
    }, { isStatic: true, friction: 0.0 }
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
