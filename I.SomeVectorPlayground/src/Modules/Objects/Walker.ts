import P5 from "p5";
import Context from "../Context/Context";
import IDrawableObject from "../Interfaces/IDrawableObject";

export default class Walker implements IDrawableObject {
  _position: P5.Vector;
  id: number;
  steps: number = 0;
  _context: Context;
  constructor(public _p5: P5, x: number, y: number) {
    this._position = new P5.Vector(x, y);
  }
  update() {
    const p5 = this._p5;
    this._position.x = this._position.x + p5.random(-1, 1);
    this._position.y = this._position.y + p5.random(-1, 1);
    this.steps++;
    if (this.steps > 1000) {
      this.steps = 0;
      this._context.addObject(
        new Walker(p5, this._position.x, this._position.y)
      );
    }
  }
  draw(): void {
    const p5 = this._p5;
    p5.stroke(255);
    p5.strokeWeight(2);
    p5.point(this._position.x, this._position.y);
  }

  changeContext(context: Context): void {
    this._context = context;
  }
}
