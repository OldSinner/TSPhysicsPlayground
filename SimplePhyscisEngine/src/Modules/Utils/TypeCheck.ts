import IPhysicsObject from "../Interfaces/IPhysicsObject";
import IRigidbody from "../Interfaces/IRigidbody";
import PhysicObject from "../Objects/Abstracts/PhysicObject";

export default class TypeCheck {
  static isRigidBody(obj: any): obj is IRigidbody {
    return "applyForce" in obj;
  }
  static isPhysicObject(obj: any): obj is IPhysicsObject {
    return "update" in obj;
  }
}
