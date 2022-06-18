import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Dynamic/Walker";
import Context from "./Modules/Context/Context";
import { GravityTypes } from "./Modules/Enums/Forces/RigidBodyTypes";
import Rigidbody from "./Modules/Components/Rigidbody";
const sketch = (p5: P5) => {
  const context = new Context();

  p5.setup = () => {
    p5.createCanvas(800, 800);

    for (let i = 0; i < 10; i++) {
      const walker = new Walker(
        p5,
        p5.random(100, 700),
        p5.random(100, 700),
        15
      );
      let walkerRB = walker.GetComponent<Rigidbody>();
      walkerRB._dragForceSystem.setEnabled(false);
      walkerRB.setMass(500);
      context.addObject(walker);
    }
    context.setGravityAttraction(0.001);

    context.start();
    p5.background(0);
  };
  p5.draw = () => {
    p5.background(0, 10);

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
