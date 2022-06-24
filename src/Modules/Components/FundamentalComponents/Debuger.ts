import IPhysicsObject from "../../Interfaces/IPhysicsObject";
import Rigidbody from "../Rigidbody/Rigidbody";

export default class Debuger {
  _obj: IPhysicsObject;

  constructor(obj: IPhysicsObject) {
    this._obj = obj;
  }
}
