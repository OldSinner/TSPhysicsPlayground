import { GravityTypes } from "../../../Enums/Forces/RigidBodyTypes";
import PhysicObject from "../../../Context/ContextObjects/PhysicObject";
import P5 from "p5";
import { RigidBodyContext } from "../../../Context/RigidBodyContext";
import TypeCheck from "../../../Utils/TypeCheck";
import Rigidbody from "../Rigidbody";
/**
 * Description placeholder
 *
 * @export
 * @class GravitySystem
 * @typedef {GravitySystem}
 */
export default class GravitySystem {
  /**
   * Description placeholder
   *
   * @private
   * @type {Rigidbody}
   */
  private _rbody: Rigidbody;
  /**
   * Description placeholder
   *
   * @type {GravityTypes}
   */
  _gravityType: GravityTypes = GravityTypes.ObjectsLike;
  /**
   * Description placeholder
   *
   * @type {boolean}
   */
  _isGravity: boolean = true;
  /**
   * Creates an instance of GravitySystem.
   *
   * @constructor
   * @param {Rigidbody} rb
   */
  constructor(rb: Rigidbody) {
    this._rbody = rb;
  }
  /**
   * Description placeholder
   *
   * @param {boolean} _isGravity
   * @returns {GravitySystem}
   */
  setEnabled(_isGravity: boolean): GravitySystem {
    this._isGravity = _isGravity;
    return this;
  }
  /**
   * Description placeholder
   *
   * @returns {boolean}
   */
  getState(): boolean {
    return this._isGravity;
  }
  /**
   * Description placeholder
   *
   * @param {Rigidbody} other
   */
  attract(other: Rigidbody) {
    const p5 = this._rbody._object._p5;
    let force = P5.Vector.sub(
      this._rbody._object._transform._position,
      other._object._transform._position
    );
    let distancesq = p5.constrain(force.magSq(), 10, 100);
    let power =
      (this._rbody._object._context.getGravityAttraction() *
        (this._rbody._mass * other._mass)) /
      distancesq;
    force.setMag(power);
    other.applyForce(force);
  }
  /**
   * Description placeholder
   */
  applyGravity() {
    switch (this._gravityType) {
      case GravityTypes.EarthLike:
        let gravity = this._rbody._object._context.getGravityValue();
        gravity.mult(this._rbody._mass);
        this._rbody.applyForce(gravity);
        break;
      case GravityTypes.ObjectsLike:
        var objects = this._rbody._object._context.getOtherObjects(
          this._rbody._object._id
        );
        for (let i = 0; i < objects.length; i++) {
          if (TypeCheck.isPhysicObject(objects[i])) {
            let obj = objects[i] as PhysicObject;
            var rb = obj.TryGetComponent<Rigidbody>();
            if (rb != null) this.attract(rb as Rigidbody);
          }
        }
      case GravityTypes.None:
        break;
    }
  }
}