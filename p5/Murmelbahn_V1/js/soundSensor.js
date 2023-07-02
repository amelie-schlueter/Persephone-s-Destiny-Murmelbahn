function createSoundSensor(world,x, y, w, h, trigger) {
    return new Block(
      world,
      {x: x, y: y, w: w, h: h,
      trigger: (ball, block) => {
        womanTalking.play();
      }},
      { isStatic: true, isSensor: true }
    )
}