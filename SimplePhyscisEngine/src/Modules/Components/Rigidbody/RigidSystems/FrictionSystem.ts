import Rigidbody from "../Rigidbody";
import { FrictionTypes } from "../../../Enums/Forces/RigidBodyTypes";
import IPhysicsObject from "../../../Interfaces/IPhysicsObject";

/**
 * Description placeholder
 * @date 23.06.2022 - 23:13:26
 *
 * @export
 * @class FrictionSystem
 * @typedef {FrictionSystem}
 */
export default class FrictionSystem {
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
   * @private
   * @type {boolean}
   */
  private _isFriction: boolean = true;
  /**
   * Description placeholder
   *
   * @private
   * @type {number}
   */
  private _fritionMU: number = 0.1;
  /**
   * Description placeholder
   *
   * @private
   * @type {number}
   */
  private _staticFrictionForce: number = 5;
  /**
   * Description placeholder
   *
   * @private
   * @type {FrictionTypes}
   */
  private _frictionType: FrictionTypes = FrictionTypes.Static;
  /**
   * Creates an instance of FrictionSystem.
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
   * @param {FrictionTypes} type
   * @returns {FrictionSystem}
   */
  setFrictionType(type: FrictionTypes): FrictionSystem {
    this._frictionType = type;
    return this;
  }
  /**
   * Description placeholder
   *
   * @param {boolean} isFriction
   * @returns {FrictionSystem}
   */
  setEnabled(isFriction: boolean): FrictionSystem {
    this._isFriction = isFriction;
    return this;
  }
  /**
   * Description placeholder
   *
   * @returns {boolean}
   */
  getState(): boolean {
    return this._isFriction;
  }
  /**
   * Description placeholder
   *
   * @param {number} mu
   * @returns {FrictionSystem}
   */
  setFrictionMU(mu: number): FrictionSystem {
    this._fritionMU = mu;
    return this;
  }
  /**
   * Description placeholder
   *
   * @param {number} force
   * @returns {FrictionSystem}
   */
  setStaticFrictionForce(force: number): FrictionSystem {
    this._staticFrictionForce = force;
    return this;
  }
  /**
   * Description placeholder
   */
  applyFriction(): void {
    switch (this._frictionType) {
      case FrictionTypes.Static:
        this._rbody._velocity.mult((100 - this._staticFrictionForce) / 100);
        break;
      case FrictionTypes.Kinetic:
        let friction = this._rbody._velocity.copy();
        friction.normalize();
        friction.mult(-1);
        friction.setMag(this._fritionMU * this._rbody._mass);
        this._rbody.applyForce(friction);

        break;
    }
  }
}
