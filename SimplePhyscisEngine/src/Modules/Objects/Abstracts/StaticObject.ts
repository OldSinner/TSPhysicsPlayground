import { Vector } from "p5";
import Context from "../../Context/Context";
import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import IRigidbody from "../../Interfaces/IRigidbody";
import DragForceSystem from "../../PhysicsSystems/DragForceSystem";
import FrictionSystem from "../../PhysicsSystems/FrictionSystem";
import GravitySystem from "../../PhysicsSystems/GravitySystem";
import P5 from "p5";
import { RigidBodyTypes } from "../../Enums/Forces/RigidBodyTypes";
export default class StaticObject implements IRigidbody, IPhysicsObject {
  _position: Vector;
  _id: number;
  _mass: number;
  _velocity: Vector;
  _acceleration: Vector;
  _frictionSystem: FrictionSystem;
  _gravitySystem: GravitySystem;
  _dragForceSystem: DragForceSystem;
  _context: Context;
  _rigidType: RigidBodyTypes;

  /**
   *
   */
  constructor(public p5: P5, x: number, y: number) {
    this._position = new Vector(x, y);
    this._rigidType = RigidBodyTypes.Static;
  }

  applyForce(force: Vector) {}
  move() {}
  update(): void {}
  setContext(context: Context): StaticObject {
    this._context = context;
    return this;
  }
  setMass(mass: number): StaticObject {
    this._mass = mass;
    return this;
  }
}
