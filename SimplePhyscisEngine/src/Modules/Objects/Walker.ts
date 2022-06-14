import P5 from "p5";
import Context from "../Context/Context";
import IPhysicsObject from "../Interfaces/IPhysicsObject";
import IRigidbody from "../Interfaces/IRigidbody";
import Mouse from "./Mouse";

export default class Walker implements IPhysicsObject, IRigidbody {
  _id: number;
  _position: P5.Vector;
  _velocity: P5.Vector;
  _acceleration: P5.Vector;
  _mass: number;
  _context: Context;
  _velocityLimit: number;
  //----------
  _target: IPhysicsObject;
  _attractionForce: number;

  constructor(public _p5: P5, x: number, y: number) {
    this._position = new P5.Vector(x, y);
    this._acceleration = new P5.Vector(0, 0);
    this._velocity = new P5.Vector(0, 0);
  }

  update() {
    this.move();

    this.draw();
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

    this._velocity.limit(this._velocityLimit);
    this._velocity.add(this._acceleration);

    this._position.add(this._velocity);
  }

  draw(): void {
    const p5 = this._p5;
    p5.stroke(p5.color(255, 255, 255));
    p5.strokeWeight(5);
    p5.point(this._position.x, this._position.y);
  }

  changeContext(context: Context): void {
    this._context = context;
  }
  setTarget(obj: IPhysicsObject): Walker {
    this._target = obj;
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
