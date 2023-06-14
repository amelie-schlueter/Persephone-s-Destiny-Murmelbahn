

function setupGround(level){
    grounds.push(new BlockCore(
        world,
        {
            x: dim.w / 2, y: 720 * (level +1) -40, w: dim.w - 700, h: 70,         },
        { isStatic: true }
      ));
    if (level % 2 == 0) {
          groundSensors.push(new BlockCore (
            world, 
            { x: 175, y: 720 * (level +1) - 40, w: 350, h: 70, 
              trigger: (ball, block) => {
                forceBall = { x: 0.09, y: -0.0 };
                setPillarStatus(level, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
                if (level == 2) {
                hitFlashSensor = true;
                startFlashes();
                console.log("Level 2 erreicht")
                }
                if (level == 4) {
                  clearInterval(flashesInterval); // Beende das aktuelle Intervall, falls vorhanden
                  startArrows();
                  console.log("Level 4 erreicht")
                  }
              }
            },
            {isStatic: true}
          ));
} 
    else {

        groundSensors.push(new BlockCore(
            world,
            {
                x: dim.w - 175, y: 720 * (level + 1) - 40, w: 350, h: 70, 
                trigger: (ball, block) => {
                    forceBall = { x: -0.09, y: -0.0 };
                    setPillarStatus(level, "movingDown"); // Setze Pillar mit Index 0 auf "movingDown"
                    if (level == 2) {
                        startFlashes();

                        console.log("Level 2 erreicht")
                    }
                }

            },
            { isStatic: true }
        ));
    }
}
