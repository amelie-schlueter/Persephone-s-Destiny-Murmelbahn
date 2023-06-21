
function createFallingLance(x,y, force) {
fallingLance.push(new Block(
    world,
    {x: x, y: y, w: 30, h: 450, image: fallingLanceImg,
      trigger: (ball, block) => {
        isTriggered = true
        if (isTriggered = true) {
          Matter.Body.setStatic(block.body, false);
          Matter.Body.applyForce(block.body, block.body.position, force);
        }
          isTriggered = false
      }
    },
    {  isStatic: true }
  ));
}


//{ x: -0.2, y: 0.0 }
  //   x: dim.w -500, y: 1200, w: 20, h: 450, image: fallingLanceImg,

