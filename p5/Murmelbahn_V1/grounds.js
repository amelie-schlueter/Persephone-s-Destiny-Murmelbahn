

function setupGround(level){
   
    if (level % 2 == 0) {
        grounds.push(new BlockCore(
            world,
            {
                x: dim.w / 2 - 200, y: 720 * (level +1) -40, w: dim.w - 300, h: 70 },
            { isStatic: true }
          ));
          groundSensors.push(new BlockCore (
            world, 
            { x: 175, y: 720 * (level  +1) - 760, w: 350, h: 70,
              trigger: (ball, block) => {
                forceBall = { x: 0.09, y: -0.0 };
                setPillarStatus(level, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
                  switch (level) {
                      case 2:
                          hitFlashSensor = true;
                          startFlashes();
                          console.log("Level 2 erreicht")
                          break;
                      case 4:
                          clearInterval(flashesInterval); // Beende das aktuelle Intervall, falls vorhanden
                          startArrows();
                          console.log("Level 4 erreicht")
                          break;
                    case 6: 
                    forceBall = {x: 0.08, y: -0.05 }
                    break; 
                      case 8:
                        engine.world.gravity.y = 1;
                        forceBall = { x: 0.05, y: -0.0 }
                        console.log("Gravity wurde geändert. Unterwasserwelt verlassen", engine.world.gravity.y)
                          console.log("Level 8 erreicht")
                          
                          break;
                      default:
                          console.log(level+ "1");
                  }
              }
            },
            {isStatic: true, isSensor: true}
          ));
} 
    else {
        grounds.push(new BlockCore(
            world,
            {
                x: dim.w / 2 + 200, y: 720 * (level +1) -40, w: dim.w - 300, h: 70,},
            { isStatic: true }
          ));

        groundSensors.push(new BlockCore(
            world,
            {
                x: dim.w - 175, y: 720 * (level + 1) - 760, w: 350, h: 70,
                trigger: (ball, block) => {
                    forceBall = { x: -0.09, y: -0.0 };
                    setPillarStatus(level, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
                    switch (level) {
                        case 5:
                            clearInterval(arrowInterval);
                            engine.world.gravity.y *= 0.2;
                            Matter.Body.applyForce(granatapfel.body, granatapfel.body.position, {x: 0, y: 0.1});
                            console.log(granatapfel.body.frictionAir)
                            granatapfel.body.frictionAir = 0.01
                            forceBall = {x: -0.08, y: -0.05 }
                            startFishes();
                            console.log("Gravity wurde geändert. Unterwasserwelt erreicht" , engine.world.gravity.y)
                            console.log("Level 5 erreicht")
                            break;
                        case 7: 
                            forceBall = {x: -0.08, y: -0.05 }
                            break; 
                        default:
                            console.log(level);
                    }
                }

            },
            { isStatic: true, isSensor: true }
        ));
    }
}



function startSensorFunc () {

    startSensor = (new BlockCore(
      world,
      {x: 0 + 175, y: 500, w: 350, h: 70,
      trigger: (block, ball) => {
        setPillarStatus(0, "movingDown")
      }},
      {  isStatic: true, isSensor: true }
    ));
    blocks.push(startSensor)
}
