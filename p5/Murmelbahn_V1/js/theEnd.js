function createEndBlock(x, y, svg, image) {
  endBlock = new PolygonFromSVG(
    world, {
    x: x,
    y: y,
    fromFile: svg,
    scale: 1,
    image: image,
    trigger: (ball, block) => {
      Matter.Composite.remove(world, [granatapfel.body]);
      granatapfel.attributes.image = null;
      granatapfelCrack.play()
      var granatapfelkaputt1 = new Ball(world,
        { x: granatapfel.body.position.x, y: granatapfel.body.position.y, r: 25, image: granatapfelKaputtImg1 },
        { isStatic: false }
      );
      var granatapfelkaputt2 = new Ball(world,
        { x: granatapfel.body.position.x, y: granatapfel.body.position.y, r: 25, image: granatapfelKaputtImg2 },
        { isStatic: false }
      );
      var granatapfelkaputt3 = new Ball(world,
        { x: granatapfel.body.position.x, y: granatapfel.body.position.y, r: 25, image: granatapfelKaputtImg3 },
        { isStatic: false }
      );
      Matter.Body.applyForce(granatapfelkaputt1.body, granatapfelkaputt1.body.position, { x: 0, y: -0.02 })
      Matter.Body.applyForce(granatapfelkaputt2.body, granatapfelkaputt2.body.position, { x: -0.01, y: -0.02 })
      Matter.Body.applyForce(granatapfelkaputt3.body, granatapfelkaputt3.body.position, { x: 0.01, y: -0.02 })
      blocks.push(granatapfelkaputt1, granatapfelkaputt2, granatapfelkaputt3);
      for (var i = 0; i < 25; i++) {
        var ball = new Ball(world,
          { x: granatapfel.body.position.x, y: granatapfel.body.position.y, r: random(5, 10), color: "#F7931E" },
          { isStatic: false }
        );
        Matter.Body.applyForce(ball.body, ball.body.position, { x: 0, y: -0.003 })
        blocks.push(ball);

      }

      setTimeout(theEndSound.play(), 100);
      setTimeout(() => {
        Matter.Composite.remove(world, [endBlock.body]);
        endBlock.attributes.image = null;
      }, 2000);
    }
  }, { isStatic: true, friction: 0.0 }
  );
  blocks.push(endBlock)
}
