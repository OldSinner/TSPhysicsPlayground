import P5 from "p5";
import Context from "../Context/Context";
import IDrawableObject from "../Interfaces/IDrawableObject";
import IUpdatableObject from "../Interfaces/IUpdatableObject";
import Mouse from "./Mouse";

export default class Walker implements IDrawableObject {
  _position: P5.Vector;
  _acceleration: P5.Vector;
  _velocity: P5.Vector;
  _target: Mouse;
  _attractionForce: number;
  _velocityLimit: number = 2;
  id: number;
  private _context: Context;

  _color: number = 255;
  constructor(public _p5: P5, x: number, y: number) {
    this._position = new P5.Vector(x, y);
    this._velocity = P5.Vector.random2D();
  }
  update() {
    this.move();
  }
  move() {
    const p5 = this._p5;

    if (this._target) {
      this._acceleration = P5.Vector.sub(
        this._target._position,
        this._position
      );
    }
    this._acceleration.setMag(this._attractionForce);
    console.log(this._target._position);

    this._velocity.limit(this._velocityLimit);
    this._velocity.add(this._acceleration);

    this._position.add(this._velocity);
  }

  draw(): void {
    const p5 = this._p5;
    p5.stroke(p5.color(255, this._color, 255));
    p5.strokeWeight(5);
    p5.point(this._position.x, this._position.y);
  }

  changeContext(context: Context): void {
    this._context = context;
  }
  setTarget(mouse: Mouse): Walker {
    this._target = mouse;
    return this;
  }
  setAttractionForce(force: number): Walker {
    this._attractionForce = force;
    return this;
  }
  setVelocityLimit(limit: number): Walker {
    this._velocityLimit = limit;
    return this;
  }
}
