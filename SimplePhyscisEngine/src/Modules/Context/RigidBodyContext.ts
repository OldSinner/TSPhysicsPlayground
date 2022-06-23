import { Vector } from "p5";
import Rigidbody from "../Components/Rigidbody/Rigidbody";

export class RigidBodyContext {
  public _gravity: Vector = new Vector(0, 0.1);
  public _windVector: Vector;
  public _gravityAttraction: number = 0.01;

  public applyWindToObj(obj: Rigidbody): RigidBodyContext {
    obj.applyForce(this._windVector);
    return this;
  }

  setGravity(gravity: Vector): RigidBodyContext {
    this._gravity = gravity;
    return this;
  }
}
