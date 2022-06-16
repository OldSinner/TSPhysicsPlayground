import PhysicObject from "../Abstracts/PhysicObject";

export default class Walker extends PhysicObject {
  _size: number = 3;
  draw(): void {
    const p5 = this._p5;
    p5.stroke(p5.color(255, 255, 255));
    p5.strokeWeight(this._size * this._mass);
    p5.point(this._position.x, this._position.y);
  }
  update(): void {
    super.update();
    this.constraintCheck();
  }
  constraintCheck(): void {
    const p5 = this._p5;

    if (this._position.y >= p5.height) {
      this._position.y = p5.height;
      this._velocity.y *= -1;
    }
    if (this._position.x >= p5.width) {
      this._position.x = p5.width;
      this._velocity.x *= -1;
    }
    if (this._position.x <= 0) {
      this._position.x = 0;
      this._velocity.x *= -1;
    }
  }
}
