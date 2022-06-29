import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Dynamic/Walker";
import Context from "./Modules/Context/Context";
import { GravityTypes } from "./Modules/Enums/Forces/RigidBodyTypes";
import Rigidbody from "./Modules/Components/Rigidbody/Rigidbody";
import Debuger from "./Modules/Components/Debuger";
import { CircleCollider } from "./Modules/Components/CircleCollider";
import Square from "./Modules/Objects/Dynamic/Square";
window.onload = () => {
  const sketch = (p5: P5) => {
    const square = new Square(p5, 400, 400, 200, 100);
    const context = new Context();
    p5.setup = () => {
      p5.createCanvas(800, 800);
      context.addObject(square);
      context.setGravityAttraction(0.1);
      square._transform.rotate(180);

      context.start();
      p5.background(0);
    };
    p5.draw = () => {
      p5.background(0, 10);
      square._transform.translate(square._transform.forward().mult(0.4));
      square._transform.rotate(1);
      context.update();
    };
  };

  new P5(sketch);
};
