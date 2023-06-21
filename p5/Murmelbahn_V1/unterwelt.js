

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
