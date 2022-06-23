import ICompontent from "../../Interfaces/ICompontent";
import P5, { TYPE, Vector } from "p5";
import { RigidBodyTypes } from "../../Enums/Forces/RigidBodyTypes";
import DragForceSystem from "./RigidSystems/DragForceSystem";
import FrictionSystem from "./RigidSystems/FrictionSystem";
import GravitySystem from "./RigidSystems/GravitySystem";
import IPhysicObject from "../../Context/ContextObjects/PhysicObject";
/**
 * Description placeholder
 *
 * @export
 * @class Rigidbody
 * @typedef {Rigidbody}
 * @implements {ICompontent}
 */
export default class Rigidbody implements ICompontent {
  /**
   * Description placeholder
   *
   * @type {number}
   */
  _mass: number;
  /**
   * Description placeholder
   *
   * @type {P5.Vector}
   */
  _velocity: P5.Vector;
  /**
   * Description placeholder
   *
   * @type {P5.Vector}
   */
  _acceleration: P5.Vector;
  /**
   * Description placeholder
   *
   * @type {FrictionSystem}
   */
  _frictionSystem: FrictionSystem;
  /**
   * Description placeholder
   *
   * @type {GravitySystem}
   */
  _gravitySystem: GravitySystem;
  /**
   * Description placeholder
   *
   * @type {DragForceSystem}
   */
  _dragForceSystem: DragForceSystem;
  /**
   * Description placeholder
   *
   * @type {RigidBodyTypes}
   */
  _rigidType: RigidBodyTypes;
  /**
   * Description placeholder
   *
   * @type {IPhysicObject}
   */
  _object: IPhysicObject;

  /**
   * Creates an instance of Rigidbody.
   *
   * @constructor
   * @param {IPhysicObject} obj
   */
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
  /**
   * Description placeholder
   */
  update() {
    this.applyPhyscis();
    this.move();
  }

  /**
   * Description placeholder
   *
   * @param {number} mass
   * @returns {Rigidbody}
   */
  setMass(mass: number): Rigidbody {
    this._mass = mass;
    return this;
  }
  /**
   * Description placeholder
   *
   * @param {Vector} force
   */
  applyForce(force: Vector) {
    let fc = P5.Vector.div(force, this._mass)! as Vector;
    this._acceleration.add(fc);
  }
  /**
   * Description placeholder
   *
   * @returns {Rigidbody}
   */
  move(): Rigidbody {
    this._velocity.limit(5);

    this._velocity.add(this._acceleration);
    this._object._transform.move(this._velocity);
    this._acceleration.set(0, 0);
    return this;
  }
  /**
   * Description placeholder
   */
  applyPhyscis() {
    //Gravity
    if (this._gravitySystem.getState()) {
      this._gravitySystem.applyGravity();
    }
    //Friction
    if (this._frictionSystem.getState()) {
      const p5 = this._object._p5;
      let diff = p5.height - this._object._transform._position.y;
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
