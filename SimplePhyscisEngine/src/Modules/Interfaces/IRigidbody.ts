import P5 from "p5";
import Context from "../Context/Context";
import DragForceSystem from "../PhysicsSystems/DragForceSystem";
import FrictionSystem from "../PhysicsSystems/FrictionSystem";
import GravitySystem from "../PhysicsSystems/GravitySystem";

export default interface IRigidbody {
  _id: number;
  _mass: number;
  _velocity: P5.Vector;
  _acceleration: P5.Vector;
  _velocityLimit: number;
  _frictionSystem: FrictionSystem;
  _gravitySystem: GravitySystem;
  _dragForceSystem: DragForceSystem;
  _context: Context;
  setVelocityLimit(limit: number);
  setMass(mass: number);
  applyForce(force: P5.Vector);
  move();
}
