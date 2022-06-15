import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Walker";
import Context from "./Modules/Context/Context";
import Mouse from "./Modules/Objects/Mouse";
import TargetObj from "./Modules/Objects/TargetObj";
const sketch = (p5: P5) => {
  const context = new Context();
  const mouse = new Mouse(p5);
  context.addObject(mouse);
  p5.setup = () => {
    p5.createCanvas(800, 800);
  };
  p5.draw = () => {
    p5.background(0);
    p5.mouseClicked = () => {
      const walker = new TargetObj(p5, p5.mouseX, p5.mouseY);
      walker.setVelocityLimit(5).setMass(p5.random(1, 10)).setTarget(mouse);

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
