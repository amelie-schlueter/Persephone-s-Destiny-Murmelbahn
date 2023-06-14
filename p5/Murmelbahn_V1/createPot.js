
        function createPot(world,x, y, w, h) { 
    return new Block(
        world,
        {
          x: x, y: y, w: w, h: h, color: 'white',
          trigger: (ball, block) => { // console.log("Trigger ", ball, block);
            Matter.Body.setStatic(fallingLance[0].body, true);
          }
        },
        { label: "Murmel", isStatic: true }
      )
}