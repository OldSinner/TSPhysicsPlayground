import Rigidbody from "../Components/Rigidbody/Rigidbody";
import ICompontent from "../Interfaces/ICompontent";
import IPhysicsObject from "../Interfaces/IPhysicsObject";
/**
 * Description placeholder
 *
 * @export
 * @class TypeCheck
 * @typedef {TypeCheck}
 */
export default class TypeCheck {
  /**
   * Description placeholder
   *
   * @static
   * @param {*} obj
   * @returns {obj is Rigidbody}
   */
  static isRigidBody(obj: any): obj is Rigidbody {
    return "applyForce" in obj;
  }
  /**
   * Description placeholder
   *
   * @static
   * @param {*} obj
   * @returns {obj is IPhysicsObject}
   */
  static isPhysicObject(obj: any): obj is IPhysicsObject {
    return "update" in obj;
  }
  /**
   * Description placeholder
   *
   * @static
   * @template ICompontent
   * @param {*} obj
   * @returns {obj is ICompontent}
   */
  static isComponent<ICompontent>(obj: any): obj is ICompontent {
    return "update" in obj;
  }
}
