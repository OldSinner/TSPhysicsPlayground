import Context from "../Context/Context";
import IUpdatableObject from "../Interfaces/IUpdatableObject";
import P5 from "p5";

export default class Mouse implements IUpdatableObject {
  _position: P5.Vector;
  _context: Context;
  id: number;
  /**
   *
   */
  constructor(public _p5: P5, x: number, y: number) {
    this._position = new P5.Vector(x, y);
  }
  update(): void {
    const p5 = this._p5;

    this._position = new P5.Vector(p5.mouseX, p5.mouseY);
  }
  changeContext(context: Context): void {
    this._context = context;
  }
}
