import Rigidbody from "../Components/Rigidbody/Rigidbody";
import ICompontent from "../Interfaces/ICompontent";
import IPhysicsObject from "../Interfaces/IPhysicsObject";

export default class TypeCheck {
  static isRigidBody(obj: any): obj is Rigidbody {
    return "applyForce" in obj;
  }
  static isPhysicObject(obj: any): obj is IPhysicsObject {
    return "update" in obj;
  }
  static isComponent<ICompontent>(obj: any): obj is ICompontent {
    return "update" in obj;
  }
}
