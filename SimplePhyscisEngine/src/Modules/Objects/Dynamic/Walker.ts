import PhysicObject from "../Abstracts/PhysicObject";
import P5 from "p5";
import Rigidbody from "../../Components/Rigidbody";
import { CircleCollider } from "../../Components/CircleCollider";

export default class Walker extends PhysicObject {
  _size: number = 3;
  _color = this._p5.color(255, 255, 255);
  constructor(public _p5: P5, x: number, y: number, size: number) {
    super(_p5, x, y);
    const p5 = this._p5;
    this._color = p5.color(
      p5.random(100, 255),
      p5.random(100, 255),
      p5.random(100, 255)
    );
    this._components.push(new Rigidbody(this));
    this._components.push(new CircleCollider(this));
    this._size = size;
  }
  setup(): void {}
  draw(): void {
    const p5 = this._p5;
    p5.stroke(p5.color(this._color));
    p5.strokeWeight(this._size);
    p5.point(this._position.x, this._position.y);
  }
  update(): void {
    super.update();
    // this.constraintCheck();
  }
  // constraintCheck(): void {
  //   const p5 = this._p5;

  //   if (this._position.y >= p5.height) {
  //     this._position.y = p5.height;
  //     this._velocity.y *= -1;
  //   }
  //   if (this._position.x >= p5.width) {
  //     this._position.x = p5.width;
  //     this._velocity.x *= -1;
  //   }
  //   if (this._position.x <= 0) {
  //     this._position.x = 0;
  //     this._velocity.x *= -1;
  //   }
  // }
}
