import p5 from "p5";
import P5, { Vector } from "p5";
import Context from "../Context/Context";
import IPhysicsObject from "../Interfaces/IPhysicsObject";
import IRigidbody from "../Interfaces/IRigidbody";
import FrictionSystem from "../PhysicsSystems/FrictionSystem";
import Mouse from "./Mouse";

export default class Walker implements IPhysicsObject, IRigidbody {
  _id: number;
  _position: P5.Vector;
  _velocity: P5.Vector;
  _acceleration: P5.Vector;
  _mass: number = 10;
  _context: Context;
  _velocityLimit: number;
  _isGravity: boolean = true;
  _size: number = 2;
  //----------
  _frictionSystem: FrictionSystem;
  //----------

  constructor(public _p5: P5, x: number, y: number) {
    this._position = new P5.Vector(x, y);
    this._acceleration = new P5.Vector(0, 0);
    this._velocity = new P5.Vector(0, 0);
    this._frictionSystem = new FrictionSystem(this);
  }

  update() {
    this.applyPhyscis();
    this.move();
    this.draw();
    this.constraintCheck();
  }
  applyPhyscis() {
    //Gravity
    if (this._isGravity) this.applyGravity();
    //Friction
    if (this._frictionSystem.getState()) {
      const p5 = this._p5;
      let diff = p5.height - this._position.y;
      if (diff < 1) {
        this._frictionSystem.applyFriction();
      }
    }
  }

  move() {
    this._velocity.limit(this._velocityLimit);
    this._velocity.add(this._acceleration);
    this._position.add(this._velocity);

    this._acceleration.set(0, 0);
  }

  draw(): void {
    const p5 = this._p5;
    p5.stroke(p5.color(255, 255, 255));
    p5.strokeWeight(this._size * this._mass);
    p5.point(this._position.x, this._position.y);
  }

  setContext(context: Context): void {
    this._context = context;
  }

  setVelocityLimit(limit: number): Walker {
    this._velocityLimit = limit;
    return this;
  }
  setMass(mass: number): Walker {
    this._mass = mass;
    return this;
  }

  applyForce(force: P5.Vector) {
    let fc = p5.Vector.div(force, this._mass)! as Vector;
    this._acceleration.add(fc);
  }
  applyGravity() {
    let gravity = this._context.getGravityValue();
    gravity.mult(this._mass);
    this.applyForce(gravity);
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
