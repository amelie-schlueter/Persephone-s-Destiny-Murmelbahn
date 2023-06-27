



function createVase(world,x, y, w, h) {
    return new Block(
      world,
      {x: x, y: y, w: w, h: h, image: vaseImg,
      trigger: (ball, block) => {
      }},
      { isStatic: true }
    )
}