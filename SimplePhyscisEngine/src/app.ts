import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Dynamic/Walker";
import Context from "./Modules/Context/Context";
import { GravityTypes } from "./Modules/Enums/Forces/RigidBodyTypes";
import Rigidbody from "./Modules/Components/Rigidbody";
const sketch = (p5: P5) => {
  const context = new Context();

  p5.setup = () => {
    p5.createCanvas(800, 800);

    context.setGravityAttraction(0.001);
    const walker = new Walker(p5, 400, 400, 40);
    let walkerRB = walker.GetComponent<Rigidbody>();
    walkerRB._dragForceSystem.setEnabled(false);
    walkerRB.setMass(50000);
    context.addObject(walker);

    context.start();
    p5.background(0);
  };
  p5.draw = () => {
    p5.background(0, 10);

    p5.mouseClicked = () => {
      const walker = new Walker(p5, p5.mouseX, p5.mouseY, 15);
      let walkerRB = walker.GetComponent<Rigidbody>();
      walkerRB._dragForceSystem.setEnabled(false);
      walkerRB.setMass(500);
      context.addObject(walker);
    };
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
