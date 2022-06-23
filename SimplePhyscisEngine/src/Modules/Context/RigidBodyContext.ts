import { Vector } from "p5";
import Rigidbody from "../Components/Rigidbody/Rigidbody";

/**
 * Description placeholder
 *
 * @export
 * @class RigidBodyContext
 * @typedef {RigidBodyContext}
 */
export class RigidBodyContext {
  /**
   * Description placeholder
   *
   * @public
   * @type {Vector}
   */
  public _gravity: Vector = new Vector(0, 0.1);
  /**
   * Description placeholder
   *
   * @public
   * @type {Vector}
   */
  public _windVector: Vector;
  /**
   * Description placeholder
   *
   * @public
   * @type {number}
   */
  public _gravityAttraction: number = 0.01;

  /**
   * Description placeholder
   *
   * @public
   * @param {Rigidbody} obj
   * @returns {RigidBodyContext}
   */
  public applyWindToObj(obj: Rigidbody): RigidBodyContext {
    obj.applyForce(this._windVector);
    return this;
  }

  /**
   * Description placeholder
   *
   * @param {Vector} gravity
   * @returns {RigidBodyContext}
   */
  setGravity(gravity: Vector): RigidBodyContext {
    this._gravity = gravity;
    return this;
  }
}
