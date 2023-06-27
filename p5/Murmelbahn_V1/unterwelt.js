

    function felsenSvg(x,y,svg) {
    blocks.push(new PolygonFromSVG(
        world, {
        x: x,
        y: y,
        fromFile: svg,
        scale: 1,
      }, { isStatic: true, friction: 0.0 }
      ));
  }
  function createFelsbrocken(x, y, svg) {
    // Erstelle den ursprünglichen Felsbrocken
    var fallingFelsbrocken = new PolygonFromSVG(
        world, {
            x: x,
            y: y,
            fromFile: svg,
            scale: 1,
            image: fallingFelsbrockenImg,
            trigger: (ball, block) => {
                if (fallingFelsbrocken.triggered) {
                    return; // Wenn der Trigger bereits ausgeführt wurde, beende die Funktion
                }
                fallingFelsbrocken.triggered = true; // Markiere den Trigger als ausgeführt

                // Mache den Felsbrocken beweglich und wende eine Kraft an, um ihn herunterfallen zu lassen
                Matter.Body.setStatic(fallingFelsbrocken.body, false);
                Matter.Body.applyForce(fallingFelsbrocken.body, fallingFelsbrocken.body.position, { x: 0, y: 0.2 });

                // Timeout, um den Zerfall zu verzögern
                setTimeout(() => {
                    // Entferne den ursprünglichen Felsbrocken
                    Matter.Composite.remove(world, [fallingFelsbrocken.body]);
                    fallingFelsbrocken.attributes.image = null;
                    // Erzeuge kleine Bälle an der Position des ursprünglichen Felsbrockens
                    for (var i = 0; i < 10; i++) {
                        var ball = new Ball(world,
                            { x: fallingFelsbrocken.body.position.x, y: fallingFelsbrocken.body.position.y, r: random(10,15), color: "#3A1B1D" },
                            { isStatic: false }
                        );
                        blocks.push(ball);
                        document.getElementById("gif").style.display = "block"
                        gifSound.play();
                    }
                }, 350);
            }
        }, { isStatic: true, density: 0.01, isSensor: false }
    );

    blocks.push(fallingFelsbrocken);
}




