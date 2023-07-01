


    function createEndBlock(world,x, y, w, h) {
        return new Block(
          world,
          {x: x, y: y, w: w, h: h, color: "white",
          trigger: (ball, block) => {
            Matter.Composite.remove(world, [granatapfel.body]);
            granatapfel.attributes.image = null;
            granatapfelCrack.play()
            setTimeout(  theEndSound.play(), 100);
            for (var i = 0; i < 25; i++) {
                var ball = new Ball(world,
                    { x: granatapfel.body.position.x, y: granatapfel.body.position.y, r: random(5,15), color: "#F7931E" },
                    { isStatic: false }
                );
                blocks.push(ball);
            }
          }},
          { isStatic: true }
        )
  }
  