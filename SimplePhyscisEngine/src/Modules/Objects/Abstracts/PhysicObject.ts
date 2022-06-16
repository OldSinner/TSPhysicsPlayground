import { Vector } from "p5";
import P5 from "p5";
import Context from "../../Context/Context";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import IRigidbody from "../../Interfaces/IRigidbody";
import DragForceSystem from "../../PhysicsSystems/DragForceSystem";
import FrictionSystem from "../../PhysicsSystems/FrictionSystem";
import GravitySystem from "../../PhysicsSystems/GravitySystem";
import { RigidBodyTypes } from "../../Enums/Forces/RigidBodyTypes";

export default abstract class PhysicObject
  implements IPhysicsObject, IRigidbody
{
  _id: number;
  _position: Vector;
  _context: Context;
  _mass: number;
  _velocity: Vector;
  _acceleration: Vector;
  _velocityLimit: number;
  _frictionSystem: FrictionSystem;
  _gravitySystem: GravitySystem;
  _dragForceSystem: DragForceSystem;
  _rigidType: RigidBodyTypes;
  constructor(public _p5: P5, x: number, y: number) {
    this._position = new P5.Vector(x, y);
    this._acceleration = new P5.Vector(0, 0);
    this._velocity = new P5.Vector(0, 0);
    this._frictionSystem = new FrictionSystem(this);
    this._gravitySystem = new GravitySystem(this);
    this._dragForceSystem = new DragForceSystem(this);
    this._rigidType = RigidBodyTypes.Active;
  }

  update() {
    this.applyPhyscis();
    this.move();
    this.draw();
  }
  applyPhyscis() {
    //Gravity
    if (this._gravitySystem.getState()) {
      this._gravitySystem.applyGravity();
    }
    //Friction
    if (this._frictionSystem.getState()) {
      const p5 = this._p5;
      let diff = p5.height - this._position.y;
      if (diff < 1) {
        this._frictionSystem.applyFriction();
      }
    }
    //Drag
    if (this._dragForceSystem.getstate()) {
      this._dragForceSystem.applyDrag();
    }
  }
  move() {
    this._velocity.limit(this._velocityLimit);
    this._velocity.add(this._acceleration);
    this._position.add(this._velocity);
    this._acceleration.set(0, 0);
  }
  draw() {}
  // RigidBody
  applyForce(force: Vector) {
    let fc = P5.Vector.div(force, this._mass)! as Vector;
    this._acceleration.add(fc);
  }
  //set get
  setContext(context: Context): PhysicObject {
    this._context = context;
    return this;
  }
  setMass(mass: number): PhysicObject {
    this._mass = mass;
    return this;
  }
  setVelocityLimit(limit: number) {
    this._velocityLimit = limit;
    return this;
  }
}
