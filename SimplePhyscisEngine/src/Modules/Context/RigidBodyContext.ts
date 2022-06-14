import { Vector } from "p5";
import IRigidbody from "../Interfaces/IRigidbody";

export class RigidBodyContext {
  public _gravity: Vector = new Vector(0, 0.1);
  public _windVector: Vector;

  public applyWindToObj(obj: IRigidbody): RigidBodyContext {
    obj.applyForce(this._windVector);
    return this;
  }
  isRigidBody(obj: any): obj is IRigidbody {
    return "applyForce" in obj;
  }

  setGravity(gravity: Vector): RigidBodyContext {
    this._gravity = gravity;
    return this;
  }
}
