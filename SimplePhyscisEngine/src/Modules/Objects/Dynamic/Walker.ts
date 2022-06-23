import PhysicObject from "../../Context/ContextObjects/PhysicObject";
import P5 from "p5";
import Rigidbody from "../../Components/Rigidbody/Rigidbody";
import { CircleCollider } from "../../Components/CircleCollider";

/**
 * Description placeholder
 * @date 23.06.2022 - 23:14:10
 *
 * @export
 * @class Walker
 * @typedef {Walker}
 * @extends {PhysicObject}
 */
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
  draw(): void {
    super.draw();
    const p5 = this._p5;
    p5.stroke(p5.color(this._color));
    p5.strokeWeight(this._size);
    p5.point(this._transform.getPosition());
  }

  update(): void {
    super.update();
  }
}
