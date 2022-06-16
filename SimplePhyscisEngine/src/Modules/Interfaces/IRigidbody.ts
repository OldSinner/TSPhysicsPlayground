import P5 from "p5";
import Context from "../Context/Context";
import { RigidBodyTypes } from "../Enums/Forces/RigidBodyTypes";
import DragForceSystem from "../PhysicsSystems/DragForceSystem";
import FrictionSystem from "../PhysicsSystems/FrictionSystem";
import GravitySystem from "../PhysicsSystems/GravitySystem";

export default interface IRigidbody {
  _id: number;
  _mass: number;
  _velocity: P5.Vector;
  _acceleration: P5.Vector;
  _frictionSystem: FrictionSystem;
  _gravitySystem: GravitySystem;
  _dragForceSystem: DragForceSystem;
  _context: Context;
  _rigidType: RigidBodyTypes;
  setMass(mass: number);
  applyForce(force: P5.Vector);
  move();
}
