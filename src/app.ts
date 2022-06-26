import P5, { Vector } from "p5";
import Walker from "./Modules/Objects/Dynamic/Walker";
import Context from "./Modules/Context/Context";
import { GravityTypes } from "./Modules/Enums/Forces/RigidBodyTypes";
import Rigidbody from "./Modules/Components/Rigidbody/Rigidbody";
import Square from "./Modules/Objects/Dynamic/Square";
import Debuger from "./Modules/Components/Debuger";
import { CircleCollider } from "./Modules/Components/CircleCollider";
window.onload = () => {
  const sketch = (p5: P5) => {
    const context = new Context();
    p5.setup = () => {
      p5.createCanvas(800, 800);
      for (let i = 0; i < 5; i++) {
        var circle = new Walker(p5, p5.random(0, 800), p5.random(0, 800), 40);
        let debuger = new Debuger(circle);
        debuger.showOrgin = true;
        debuger.showRotate = true;
        debuger.showRigidbody = true;
        debuger.isShowText = true;
        circle.AddComponent(debuger);
        circle.AddComponent(new Rigidbody(circle));
        circle.AddComponent(new CircleCollider(circle));
        context.addObject(circle);
      }

      context.setGravityAttraction(0.001);

      context.start();
      p5.background(0);
    };
    p5.draw = () => {
      p5.background(0);

      context.update();
    };
  };

  new P5(sketch);
};
