import p5 from "p5";
import ICompontent from "../Interfaces/ICompontent";
import IPhysicsObject from "../Interfaces/IPhysicsObject";
import Rigidbody from "./Rigidbody/Rigidbody";

export default class Debuger implements ICompontent {
  _obj: IPhysicsObject;

  constructor(obj: IPhysicsObject) {
    this._obj = obj;
  }
  postUpdate() {
    this.drawDebug();
  }
  update() {}
  drawDebug() {
    const p5 = this._obj._p5;
    p5.push();
    this.drawOrgin(p5);
    p5.pop();
  }

  drawOrgin(p5: p5) {
    const pos = this._obj._transform.getPosition();
    const debuginfo =
      "Obj:" + this._obj._id + " " + pos.x.toFixed(2) + "," + pos.y.toFixed(2);
    p5.stroke(0, 100, 0);
    p5.fill(0, 100, 0);
    p5.strokeWeight(2);
    p5.text(debuginfo, pos.x + 10, pos.y + 10);
    p5.strokeWeight(5);
    p5.point(pos);
  }
}
