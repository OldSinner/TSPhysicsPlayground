import ICompontent from "../Interfaces/ICompontent";
import P5, { TYPE, Vector } from "p5";
import Context from "../Context/Context";
import { RigidBodyTypes } from "../Enums/Forces/RigidBodyTypes";
import DragForceSystem from "../PhysicsSystems/DragForceSystem";
import FrictionSystem from "../PhysicsSystems/FrictionSystem";
import GravitySystem from "../PhysicsSystems/GravitySystem";
import IPhysicObject from "../Objects/Abstracts/PhysicObject";
export default class Rigidbody implements ICompontent {
  _id: number;
  _mass: number;
  _velocity: P5.Vector;
  _acceleration: P5.Vector;
  _frictionSystem: FrictionSystem;
  _gravitySystem: GravitySystem;
  _dragForceSystem: DragForceSystem;
  _rigidType: RigidBodyTypes;
  _object: IPhysicObject;

  constructor(obj: IPhysicObject) {
    this._acceleration = new P5.Vector(0, 0);
    this._velocity = new P5.Vector(0, 0);
    this._frictionSystem = new FrictionSystem(this);
    this._gravitySystem = new GravitySystem(this);
    this._dragForceSystem = new DragForceSystem(this);
    this._rigidType = RigidBodyTypes.Active;
    this._object = obj;
    this._mass = 10;
  }
  update() {
    this.applyPhyscis();
    this.move();
  }

  setMass(mass: number): Rigidbody {
    this._mass = mass;
    return this;
  }
  applyForce(force: Vector) {
    let fc = P5.Vector.div(force, this._mass)! as Vector;
    this._acceleration.add(fc);
  }
  move(): Rigidbody {
    this._velocity.limit(5);

    this._velocity.add(this._acceleration);
    this._object._position.add(this._velocity);
    this._acceleration.set(0, 0);
    return this;
  }
  applyPhyscis() {
    //Gravity
    if (this._gravitySystem.getState()) {
      this._gravitySystem.applyGravity();
    }
    //Friction
    if (this._frictionSystem.getState()) {
      const p5 = this._object._p5;
      let diff = p5.height - this._object._position.y;
      if (diff < 1) {
        this._frictionSystem.applyFriction();
      }
    }
    //Drag
    if (this._dragForceSystem.getstate()) {
      this._dragForceSystem.applyDrag();
    }
  }
}
