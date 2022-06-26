import p5 from "p5";
import ICompontent from "../Interfaces/ICompontent";
import IPhysicsObject from "../Interfaces/IPhysicsObject";
import Rigidbody from "./Rigidbody/Rigidbody";

export default class Debuger implements ICompontent {
  _obj: IPhysicsObject;
  showOrgin: boolean = false;
  showRotate: boolean = false;
  showRigidbody: boolean = false;
  isShowText: boolean = false;
  cursor: number = 1;

  constructor(obj: IPhysicsObject) {
    this._obj = obj;
  }
  postUpdate() {
    this.drawDebug();
  }
  update() {}
  drawDebug() {
    this.cursor = 1;
    const p5 = this._obj._p5;
    p5.push();
    if (this.showOrgin) {
      this.drawOrgin(p5);
      this.cursor++;
    }
    if (this.showRotate) {
      this.drawRotation(p5);
      this.cursor++;
    }
    if (this.showRigidbody) {
      if (this._obj.TryGetComponent<Rigidbody>()) {
        this.drawVelocity(p5);
      }
    }
    p5.pop();
  }
  private drawRotation(p5: p5) {
    const pos = this._obj._transform.getPosition();
    const rot = this._obj._transform.getRotation();

    const debuginfo = "Rot: " + ((360 * rot) / (2 * Math.PI)).toFixed(1);
    this.showText(debuginfo, 0, 0, 150);

    p5.stroke(0, 0, 150);
    p5.strokeWeight(5);
    p5.point(pos);
  }

  private drawOrgin(p5: p5) {
    const pos = this._obj._transform.getPosition();

    const debuginfo =
      "Id: " +
      this._obj._id +
      ", Pos: {" +
      pos.x.toFixed(2) +
      "," +
      pos.y.toFixed(2) +
      "}";
    this.showText(debuginfo, 0, 150, 0);

    p5.stroke(0, 150, 0);
    p5.strokeWeight(5);
    p5.point(pos);
  }
  private drawVelocity(p5: p5) {
    const pos = this._obj._transform.getPosition();
    const rb = this._obj.GetComponent<Rigidbody>();
    const vel = rb._velocity.copy();

    p5.stroke(255, 0, 0);
    p5.strokeWeight(2);
    p5.line(pos.x, pos.y, pos.x + vel.x * 400, pos.y + vel.y * 400);

    const debuginfo =
      "Vel: {" + vel.x.toFixed(5) + "," + vel.y.toFixed(5) + "}";
    this.showText(debuginfo, 255, 0, 0);

    p5.strokeWeight(5);
    p5.point(pos);
  }
  private showText(mess: string, r: number, g: number, b: number) {
    if (this.isShowText) {
      const pos = this._obj._transform.getPosition();

      const p5 = this._obj._p5;
      p5.fill(r, g, b);
      p5.strokeWeight(2);
      p5.text(mess, pos.x + 10, pos.y + 15 * this.cursor);
    }
  }
}
