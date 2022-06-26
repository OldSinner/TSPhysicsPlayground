import ICompontent from "../../Interfaces/ICompontent";
import P5, { TYPE, Vector } from "p5";
import { RigidBodyTypes } from "../../Enums/Forces/RigidBodyTypes";
import DragForceSystem from "./RigidSystems/DragForceSystem";
import GravitySystem from "./RigidSystems/GravitySystem";
import IPhysicObject from "../../Context/ContextObjects/PhysicObject";

export default class Rigidbody implements ICompontent {
  _mass: number;

  _velocity: P5.Vector;

  _acceleration: P5.Vector;

  _gravitySystem: GravitySystem;

  _dragForceSystem: DragForceSystem;

  _rigidType: RigidBodyTypes;

  _object: IPhysicObject;

  constructor(obj: IPhysicObject) {
    this._acceleration = new P5.Vector(0, 0);
    this._velocity = new P5.Vector(0, 0);
    this._gravitySystem = new GravitySystem(this);
    this._dragForceSystem = new DragForceSystem(this);
    this._rigidType = RigidBodyTypes.Active;
    this._object = obj;
    this._mass = 10;
  }
  postUpdate() {
    throw new Error("Method not implemented.");
  }

  update() {
    this.applyPhyscis();
    this.move();
  }

  applyForce(force: Vector) {
    let fc = P5.Vector.div(force, this._mass)! as Vector;
    this._acceleration.add(fc);
  }

  move(): Rigidbody {
    this._velocity.limit(5);

    this._velocity.add(this._acceleration);
    this._object._transform.translate(this._velocity);
    this._acceleration.set(0, 0);
    return this;
  }

  setMass(mass: number): Rigidbody {
    this._mass = mass;
    return this;
  }

  private applyPhyscis(): void {
    //Gravity
    if (this._gravitySystem.getState()) {
      this._gravitySystem.applyGravity();
    }
    //Drag
    if (this._dragForceSystem.getstate()) {
      this._dragForceSystem.applyDrag();
    }
  }
}
