

    function felsenSvg(x,y,svg) {
    blocks.push(new PolygonFromSVG(
        world, {
        x: x,
        y: y,
        fromFile: svg,
        scale: 1,
        color: "green"
      }, { isStatic: true, friction: 0.0 }
      ));
  }
    function createFelsbrocken(x,y,svg) {
    fallingFelsbrocken = new PolygonFromSVG(
        world, {
        x: x,
        y: y,
        fromFile: svg,
        scale: 1,
        image: fallingFelsbrockenImg,
        trigger: (ball, block) => {
            setTimeout(() => {
                Matter.Body.setStatic(fallingFelsbrocken.body, false) 
                Matter.Body.applyForce(fallingFelsbrocken.body, fallingFelsbrocken.body.position,{ x:0, y: 0.2 })
            }, 100);
            setTimeout(()=> {
              Matter.Composite.remove(world, [fallingFelsbrocken.body]);
              fallingFelsbrocken.attributes.image = 0 ; 
            }, 1000)
          }, 
        }, { isStatic: true, density: 0.01, isSensor: false }
      );
      blocks.push(fallingFelsbrocken)
  }


