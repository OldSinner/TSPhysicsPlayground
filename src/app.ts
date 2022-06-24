import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Dynamic/Walker";
import Context from "./Modules/Context/Context";
import { GravityTypes } from "./Modules/Enums/Forces/RigidBodyTypes";
import Rigidbody from "./Modules/Components/Rigidbody/Rigidbody";
import Square from "./Modules/Objects/Dynamic/Square";
window.onload = () => {
  const sketch = (p5: P5) => {
    const context = new Context();
    const sq = new Square(p5, 400, 400, 790, 100);
    p5.setup = () => {
      p5.createCanvas(800, 800);

      context.setGravityAttraction(0.001);
      context.addObject(new Square(p5, 400, 400, 100, 790));
      context.addObject(sq);

      context.start();
      p5.background(0);
    };
    p5.draw = () => {
      p5.background(0, 10);
      sq._transform.rotate(p5.radians(1));
      sq._transform.translate(new Vector(0, 0.1));

      context.update();
    };
  };

  new P5(sketch);
};
