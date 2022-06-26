import Rigidbody from "../Components/Rigidbody/Rigidbody";
import { Constructor } from "../Enums/Types/Constructor";
import ICompontent from "../Interfaces/ICompontent";
import IPhysicsObject from "../Interfaces/IPhysicsObject";

export default class TypeCheck {
  static isRigidBody(obj: any): obj is Rigidbody {
    return "applyForce" in obj;
  }

  static isPhysicObject(obj: any): obj is IPhysicsObject {
    return "update" in obj;
  }

  static isComponent<T>(obj: T, componentName: Constructor<T>): boolean {
    if (obj instanceof componentName) {
      return true;
    }
    return false;
  }
}
