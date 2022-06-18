import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Dynamic/Walker";
import Context from "./Modules/Context/Context";
import Mouse from "./Modules/Objects/Dynamic/Mouse";
import { GravityTypes } from "./Modules/Enums/Forces/RigidBodyTypes";
import GravityAttractor from "./Modules/Objects/StaticsObjects/GravityAttractor";
const sketch = (p5: P5) => {
  const context = new Context();

  p5.setup = () => {
    p5.createCanvas(800, 800);
    for (let i = 0; i < 5; i++) {
      const walker = new Walker(
        p5,
        p5.random(100, 200),
        p5.random(100, 300)
      ).setMass(p5.random(1, 10));
      walker._dragForceSystem.setEnabled(false);
      context.addObject(walker);
    }

    p5.background(0);
  };
  p5.draw = () => {
    p5.background(0, 122);

    p5.mouseClicked = () => {};
    //
    if (p5.keyIsDown(p5.UP_ARROW)) {
      context.setWind(new Vector(1, 0));
    } else {
      context.setWind(new Vector(0, 0));
    }

    context.update();
  };
};

new P5(sketch);
