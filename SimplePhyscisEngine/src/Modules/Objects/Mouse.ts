import Context from "../Context/Context";
import P5 from "p5";
import IPhysicsObject from "../Interfaces/IPhysicsObject";

export default class Mouse implements IPhysicsObject {
  _id: number;
  _position: P5.Vector;
  _context: Context;
  /**
   *
   */
  constructor(public _p5: P5) {
    this._position = new P5.Vector(_p5.mouseX, _p5.mouseY);
  }

  update(): void {
    const p5 = this._p5;

    this._position = new P5.Vector(p5.mouseX, p5.mouseY);
  }
  setContext(context: Context): void {
    this._context = context;
  }
}
