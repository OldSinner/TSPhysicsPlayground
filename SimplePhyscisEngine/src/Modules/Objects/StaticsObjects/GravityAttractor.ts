import StaticObject from "../Abstracts/StaticObject";
import P5 from "p5";

export default class GravityAttractor extends StaticObject {
  _size: number = 3;
  constructor(public _p5: P5, x: number, y: number) {
    super(_p5, x, y);
  }
  update(): void {
    this.draw();
  }
  draw(): void {
    const p5 = this._p5;
    p5.stroke(p5.color(255, 255, 255));
    p5.strokeWeight(this._size * this._mass);
    p5.point(this._position.x, this._position.y);
  }
}
