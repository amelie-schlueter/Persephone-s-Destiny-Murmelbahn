function createSoundSensor(world,x, y, w, h, trigger) {
    return new Block(
      world,
      {x: x, y: y, w: w, h: h, color: "white",
      trigger: (ball, block) => {
        trigger();
      }},
      { isStatic: true, isSensor: true }
    )
}