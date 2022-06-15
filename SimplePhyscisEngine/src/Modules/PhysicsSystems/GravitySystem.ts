import { GravityTypes } from "../Enums/Forces/RigidBodyTypes";
import IRigidbody from "../Interfaces/IRigidbody";
import PhysicObject from "../Objects/Abstracts/PhysicObject";
import P5 from "p5";
import { RigidBodyContext } from "../Context/RigidBodyContext";
import TypeCheck from "../Utils/TypeCheck";
export default class GravitySystem {
  private _object: PhysicObject;
  _gravityType: GravityTypes = GravityTypes.EarthLike;
  _gravityAttraction: number = 50;
  _isGravity: boolean = true;
  constructor(object: PhysicObject) {
    this._object = object;
  }
  setEnabled(_isGravity: boolean): GravitySystem {
    this._isGravity = _isGravity;
    return this;
  }
  getState(): boolean {
    return this._isGravity;
  }
  applyGravity() {
    switch (this._gravityType) {
      case GravityTypes.EarthLike:
        let gravity = this._object._context.getGravityValue();
        gravity.mult(this._object._mass);
        this._object.applyForce(gravity);
        break;
      case GravityTypes.ObjectsLike:
        let objects = this._object._context.getOtherObjects(this._object._id);
        for (let i = 0; i < objects.length; i++) {
          //
          if (
            !TypeCheck.isRigidBody(objects[i]) ||
            !TypeCheck.isPhysicObject(objects[i])
          ) {
            continue;
          }
          let obj = objects[i] as PhysicObject;
          //
          let force = P5.Vector.sub(obj._position, this._object._position);
          let distSq = this._object._p5.constrain(force.magSq(), 25, 2500);
          let forcePower =
            (this._gravityAttraction * (this._object._mass * obj._mass)) /
            distSq;
          force.setMag(forcePower);
          this._object.applyForce(force);
        }
        break;
      case GravityTypes.None:
        break;
    }
  }
}
