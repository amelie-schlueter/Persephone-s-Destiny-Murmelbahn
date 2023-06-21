
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