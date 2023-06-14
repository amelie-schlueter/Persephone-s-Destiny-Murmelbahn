
    function createPot(world,x, y, w, h) {
      return new Block(
        world,
        {x: x, y: y, w: w, h: h, image: potImg},
        { label: "Murmel", isStatic: true }
      )
}