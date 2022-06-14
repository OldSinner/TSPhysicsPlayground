import P5 from "p5";
import Walker from "./Modules/Objects/Walker";
import IDrawableObject from "./Modules/Interfaces/IDrawableObject";
import Context from "./Modules/Context/Context";
import Mouse from "./Modules/Objects/Mouse";
const sketch = (p5: P5) => {
  const drawObject: IDrawableObject[] = [];
  const context = new Context();
  const mouse = new Mouse(p5, p5.mouseX, p5.mouseY);
  p5.setup = () => {
    p5.createCanvas(800, 800);
    context.addObject(mouse);
  };
  p5.draw = () => {
    p5.background(0);
    p5.mouseClicked = () => {
      context.addObject(
        new Walker(p5, p5.mouseX, p5.mouseY)
          .setTarget(mouse)
          .setAttractionForce(5)
          .setVelocityLimit(1)
      );
    };

    context.update();
  };
};

new P5(sketch);
