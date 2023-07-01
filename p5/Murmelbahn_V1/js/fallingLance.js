function createFallingLance(x, y, force) {
    fallingLance.push(new Block(
      world,
      {
        x: x,
        y: y,
        w: 30,
        h: 450,
        image: fallingLanceImg,
        isTriggered: false,  // Neue Eigenschaft für den Trigger-Status hinzufügen
        trigger: (fallingLance, block) => {
          if (!block.isTriggered) {  // Überprüfen, ob der Trigger bereits ausgelöst wurde
            block.isTriggered = true;  // Trigger-Status auf "true" setzen, um Mehrfachauslösung zu verhindern
            Matter.Body.setStatic(block.body, false);
            Matter.Body.applyForce(block.body, block.body.position, force);
          }
        }
      },
      { isStatic: true, label: "Lance"}
    ));
  }