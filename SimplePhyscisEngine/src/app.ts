import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Dynamic/Walker";
import Context from "./Modules/Context/Context";
import Mouse from "./Modules/Objects/Dynamic/Mouse";
import TargetObj from "./Modules/Objects/Dynamic/TargetObj";
import { GravityTypes } from "./Modules/Enums/Forces/RigidBodyTypes";
import GravityAttractor from "./Modules/Objects/StaticsObjects/GravityAttractor";
const sketch = (p5: P5) => {
  const context = new Context();
  const mouse = new Mouse(p5);
  const attractor = new GravityAttractor(p5, 300, 300).setMass(2);
  context.addObject(mouse);
  context.addObject(attractor);
  p5.setup = () => {
    p5.createCanvas(800, 800);
  };
  p5.draw = () => {
    p5.background(0);
    p5.mouseClicked = () => {
      const walker = new Walker(p5, p5.mouseX, p5.mouseY);
      walker._gravitySystem._gravityType = GravityTypes.ObjectsLike;
      walker.setVelocityLimit(5).setMass(p5.random(1, 10));
      walker.applyForce(new Vector(p5.random(1, 10), p5.random(1, 10)));
      walker._dragForceSystem.setEnabled(false);
      context.addObject(walker);
    };
    if (p5.keyIsDown(p5.UP_ARROW)) {
      context.setWind(new Vector(1, 0));
    } else {
      context.setWind(new Vector(0, 0));
    }

    context.update();
  };
};

new P5(sketch);
