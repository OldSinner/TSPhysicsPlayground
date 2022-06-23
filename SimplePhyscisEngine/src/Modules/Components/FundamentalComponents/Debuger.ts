import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import Rigidbody from "../Rigidbody/Rigidbody";

/**
 * Description placeholder
 *
 * @export
 * @class Debuger
 * @typedef {Debuger}
 */
export default class Debuger {
  /**
   * Description placeholder
   *
   * @type {IPhysicsObject}
   */
  _obj: IPhysicsObject;
  /**
   * Creates an instance of Debuger.
   *
   * @constructor
   * @param {IPhysicsObject} obj
   */
  constructor(obj: IPhysicsObject) {
    this._obj = obj;
  }
}
