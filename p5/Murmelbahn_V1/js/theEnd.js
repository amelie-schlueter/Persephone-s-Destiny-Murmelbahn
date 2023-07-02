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
      granatapfel.attributes.image = granatapfelKaputtImg;
      granatapfelCrack.play()
      setTimeout(theEndSound.play(), 100);
      for (var i = 0; i < 25; i++) {
        var ball = new Ball(world,
          { x: granatapfel.body.position.x, y: granatapfel.body.position.y, r: random(5, 15), color: "#F7931E" },
          { isStatic: false }
        );
        blocks.push(ball);
        setTimeout(() => {
          
          Matter.Composite.remove(world, [endBlock.body]);   
          endBlock.attributes.image = null;
        }, 600);
      }
    }
  }, { isStatic: true, friction: 0.0 }
  );
  blocks.push(endBlock)
}
