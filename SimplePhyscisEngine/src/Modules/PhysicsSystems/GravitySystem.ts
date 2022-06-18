import { GravityTypes } from "../Enums/Forces/RigidBodyTypes";
import IRigidbody from "../Interfaces/IRigidbody";
import PhysicObject from "../Objects/Abstracts/PhysicObject";
import P5 from "p5";
import { RigidBodyContext } from "../Context/RigidBodyContext";
import TypeCheck from "../Utils/TypeCheck";
export default class GravitySystem {
  private _object: PhysicObject;
  _gravityType: GravityTypes = GravityTypes.ObjectsLike;
  _gravityAttraction: number = 0.01;
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
  attract(other: PhysicObject) {
    const p5 = this._object._p5;
    let force = P5.Vector.sub(this._object._position, other._position);
    let distancesq = p5.constrain(force.magSq(), 10, 100);
    let power = this._gravityAttraction * (this._object._mass * other._mass);
    force.setMag(power);
    other.applyForce(force);
  }
  applyGravity() {
    switch (this._gravityType) {
      case GravityTypes.EarthLike:
        let gravity = this._object._context.getGravityValue();
        gravity.mult(this._object._mass);
        this._object.applyForce(gravity);
        break;
      case GravityTypes.ObjectsLike:
        var objects = this._object._context.getOtherObjects(this._object._id);
        for (let i = 0; i < objects.length; i++) {
          if (TypeCheck.isPhysicObject(objects[i])) {
            let obj = objects[i] as PhysicObject;
            this.attract(obj);
          }
        }
      case GravityTypes.None:
        break;
    }
  }
}
