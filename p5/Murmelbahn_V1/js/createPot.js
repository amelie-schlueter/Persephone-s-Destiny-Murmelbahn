
    function createPot(world,x, y, w, h) {
      return new Block(
        world,
        {x: x, y: y, w: w, h: h, image: potImg,
        trigger: (ball, block) => {
        Matter.Body.setStatic(fallingLance[0].body, true);
        }},
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
        Matter.Body.applyForce(vasen[0].body, vasen[0].body.position, { x: -1, y: 0 });

        // Timeout, um den Verfall zu verzögern
        setTimeout(() => {
          Matter.Composite.remove(world, [vasen[0].body]);
          vasen[0].attributes.image = null;

          // Erzeuge kleine Bälle an der Position des verfallenen Vasen-Objekts
          for (var i = 0; i < 20; i++) {
            var ball = new Ball(
              world,
              {
                x: vasen[0].body.position.x,
                y: vasen[0].body.position.y,
                r: random(10, 15),
                color: "black"
              },
              { isStatic: false }
            );
            blocks.push(ball);
          }
        }, 350);
      }
    },
    { isStatic: true, isSensor: true }
  );
}
